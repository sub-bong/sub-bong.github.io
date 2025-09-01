---
title: "FastAPI와 Keras 연동"
date: "2025-08-29"
keywords: ["TIL", "FastAPI", "python"]
---

# FastAPI와 Keras 연동

FastAPI와 Keras를 연동하여 모델을 서빙하는 API를 구성할 때, 일반적으로 웹 API 로직과 머신러닝 모델 로직을 분리하는 모듈화된 구조를 사용하는 것이 좋음.

## 일반적인 프로젝트 구조

```
/사용자 경로/
├───api/
│   ├───main.py             # FastAPI 앱 정의, 엔드포인트(라우터) 설정
│   ├───ml_service.py       # Keras 모델 로딩, 전처리 및 예측 로직 담당
│   ├───schemas.py          # Pydantic 스키마 (요청/응답 데이터 형식 정의)
│   └───models/
│       └───best_dl.keras   # 학습된 Keras 모델 파일
├───requirements.txt        # 필요한 패키지 목록
└───... (기존 파일들)
```

---

## 각 파일의 역할 및 예시 코드

### 1. `requirements.txt`

프로젝트에 필요한 라이브러리를 정의합니다. 이미지 처리를 위해 `Pillow`를, Keras 모델을 실행하기 위해 `tensorflow`를, API 서버를 위해 `fastapi`와 `uvicorn`을 포함합니다.

```text
fastapi
uvicorn[standard]
tensorflow
numpy
Pillow
```

### 2. `api/models/` 디렉토리

학습된 모델 파일(`best_dl.keras`, `best_dl.weights.h5` 등)을 이 디렉토리로 옮겨 관리함

### 3. `api/ml_service.py`

모델을 로딩하고, 입력 데이터를 전처리하며, 예측을 수행하는 모든 머신러닝 관련 로직을 이 파일에 캡슐화함. 앱 시작 시 모델을 한 번만 로드하여 메모리에 상주시키는 것이 효율적임

```python
# api/ml_service.py
import tensorflow as tf
import numpy as np
from PIL import Image
import io

class CatDogClassifier:
    def __init__(self, model_path: str):
        """
        클래스 초기화 시 Keras 모델을 로드합니다.
        """
        self.model = tf.keras.models.load_model(model_path)
        # 모델이 요구하는 이미지 크기를 설정합니다. (예: 180x180)
        self.img_height = 180
        self.img_width = 180
        self.class_names = ['cat', 'dog']

    def _preprocess_image(self, image_bytes: bytes) -> tf.Tensor:
        """
        입력된 이미지 바이트를 모델이 예측할 수 있는 형태로 전처리합니다.
        """
        image = Image.open(io.BytesIO(image_bytes))
        image = image.resize((self.img_width, self.img_height))
        img_array = tf.keras.utils.img_to_array(image)
        # 모델의 입력 형태에 맞게 차원을 확장합니다. (batch 차원 추가)
        img_array = tf.expand_dims(img_array, 0)
        return img_array

    def predict(self, image_bytes: bytes) -> dict:
        """
        전처리된 이미지로 예측을 수행하고 결과를 반환합니다.
        """
        processed_image = self._preprocess_image(image_bytes)
        predictions = self.model.predict(processed_image)
        score = tf.nn.softmax(predictions[0])

        # 예측 결과와 신뢰도를 딕셔너리 형태로 반환
        result = {
            "class": self.class_names[np.argmax(score)],
            "confidence": 100 * np.max(score)
        }
        return result

# 앱 전체에서 공유할 수 있도록 서비스 인스턴스를 생성합니다.
# 모델 경로는 실제 파일 위치에 맞게 수정해야 합니다.
model_service = CatDogClassifier(model_path="api/models/best_dl.keras")
```

### 4. `api/schemas.py`

API의 요청 및 응답 데이터 형식을 Pydantic 모델로 정의함. 이는 데이터 유효성 검사와 API 문서 자동 생성에 유용함

```python
# api/schemas.py
from pydantic import BaseModel

class PredictionResponse(BaseModel):
    class_name: str
    confidence: float

    class Config:
        schema_extra = {
            "example": {
                "class_name": "dog",
                "confidence": 98.76
            }
        }
```

### 5. `api/main.py`

FastAPI 애플리케이션의 진입점임. HTTP 요청을 받아 `ml_service`에 처리를 위임하고 결과를 반환하는 엔드포인트를 정의함

```python
# api/main.py
from fastapi import FastAPI, File, UploadFile, HTTPException
from typing import Dict

# 다른 모듈에서 필요한 객체들을 임포트합니다.
from ml_service import model_service
# from schemas import PredictionResponse # 필요 시 응답 모델 사용

app = FastAPI(
    title="Vision Model API",
    description="Keras로 학습된 개/고양이 분류 모델을 서빙하는 API",
    version="1.0.0"
)

@app.get("/", tags=["Root"])
def read_root():
    """API 서버의 상태를 확인하는 기본 엔드포인트"""
    return {"message": "Vision API is running."}

@app.post("/predict", tags=["Predictions"])
async def predict_image(file: UploadFile = File(...)):
    """
    이미지 파일을 업로드하여 개/고양이 분류를 수행합니다.
    """
    # 업로드된 파일이 이미지인지 간단히 확인
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File provided is not an image.")

    try:
        # 파일 내용을 바이트로 읽어옵니다.
        image_bytes = await file.read()
        # 머신러닝 서비스의 predict 함수를 호출합니다.
        prediction = model_service.predict(image_bytes)
        return prediction
    except Exception as e:
        # 예측 과정에서 오류 발생 시 서버 오류를 반환합니다.
        raise HTTPException(status_code=500, detail=f"Error during prediction: {str(e)}")
```

---

## 실행 방법

1.  **파일 및 디렉토리 생성**: 위 구조에 맞게 `api` 디렉토리와 그 안의 파일들을 생성함
2.  **모델 파일 이동**: `/사용자 경로/best_dl.keras` 파일을 `/사용자 경로/api/models/` 디렉토리로 이동시킵니다.
3.  **라이브러리 설치**: 터미널에서 `vision` 디렉토리로 이동한 후, `requirements.txt` 파일의 라이브러리를 설치함
    ```bash
    pip install -r requirements.txt
    ```
4.  **API 서버 실행**: `api` 디렉토리에서 `uvicorn`을 사용하여 서버를 실행함
    ```bash
    cd api
    uvicorn main:app --reload
    ```

`http://127.0.0.1:8000/docs`로 접속하면 자동 생성된 API 문서를 볼 수 있으며, 이미지를 업로드하여 모델의 예측 결과를 테스트할 수 있음
