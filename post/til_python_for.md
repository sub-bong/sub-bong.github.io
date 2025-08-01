---
title: "Python for문 활용"
date: "2025-07-24"
keywords: ["TIL", "python"]
---

# 반복문

## for문과 while문

### for

- python의 for문은 다른 언어의 foreach와 같음
- 문자열, 리스트, 튜플 등 이터러블 값 하나씩 꺼내옴
  ```python
    for i in [1, 3, 7, 9]:
      print(i)
    # [1, 3, 7, 9]를 iterable라고 부름
    # 반복 가능한 것 -> list, tuple, generator, string
  ```
- for문의 원리는 `i`는 변수이자 이터레이터 값을 담을 때 사용, 그래서 list형태로 담는 것이 아닌, int나 string 값으로 하나씩 출력함

  ```python
    # for문 활용 예시
    # 1. 최대값일 얼마이고 최대값의 위치는?
    a = [40, 20, 50, 70]
    ai = [0, 1, 2, 3]
    m = a[0] # init
    mi = 0

    for item in a:
      # a -> item 비어있는 변수에 1회 반복마다 a에 값을 담음 40(1회), 20(2회), 50(3회), 70(4회)
      if m < item: # m은 a[0]으로 즉, 40(int)이 들어 있으며, m과 item 40보다 큰 정수 값만 true로 처리
        m = item # true로 취급된 값만 item에서 m으로 대입. 즉, 50 70을 m에 담기. 특히, m은 int이며, 마지막에 대입된 70 만을 저장
    # result: 70
    # index는 알 수 없는 상황

    # 고전적인 방법으로 아래와 같이 해결할 수 있음
    for i in ai: # ai(type list)의 값을 i(int)에 값을 1회 반복마다 담음
      item = a[i] # 매회 반복 시 a[0]의 값을 (1회인 경우) item에 대입함. result: 40(1회) 20(2회) 50(3회) 70(4회)
      if m < item: # m에 담긴 40보다 큰 정수를 item과 비교, item에는 1회 반복시 40과 비교. result: false(1회) false(2회) true(3회) true(4회)
        m = item # item에서 true인 값을 m에 대입. result: 50(3회) 70(4회). 그러나, m은 int라서 최종값만 저장되어 70이 됨
        mi = i # 3회 때 i값(2), 4회 때 i값(3) mi에 대입. 그러나 mi는 int라서 최종값인 3이 저장됨

    print(m, mi) # result: 70 3
  ```

#### range()

- generator 동적인 iterable 객체
- `range()`는 for문에 같이 쓰는 편이며, 동적인 iterable 객체임. 증감식을 효율적으로 처리 가능
- `range(start, end, step)`의 인자로 구성됨
- `start`: 시작지점 int 값
- `end`: 종료지점의 int 값 (미만 값)
- `step`: 증감시킬 값 (= ++i), 한 루프 당 감소도 가능함, (-1)과 같이 마이너스 정수 값 입력

  ```python
    range(10) # (*start = 0[default], end = 10, step = 1)

  ```

##### generator는 무엇인가?

- 동적으로 원소를 생상하는 것으로, 핵심 특징은 메모리에 미리 생성하지 않고 다음 원소를 요구할 때마다 즉석해서 생성
- `a = [1, 2, 3..., 100]` 선언한다면, 80000bytes의 메모리를 이미 점유하는 상황임
- 그러나, `a = range(10000)`는 메모리 점유가 없으며, for문을 통해 요청 시에만 생성

#### len()

- 값의 길이를 int로 반환해줌
- 시퀀스 타입(저장된 값에 순서가 있고 중복된 값을 허용) : string, bytes, tuple, list, range
- 컬렉션 타입() : list, tuple, dictionary, set, frozen set

  ```python
    # 평균, 분산, 표준편차 계산

    a = [40, 20, 70, 50, 30]

    total = 0 # init

    for i in range(len(a)): # i에 5미만까지 int 대입 -> 0, 1, 2, 3, 4
      item = a[i] # 매 반복마다 -> a[0] ... a[4]의 정수 값을 대입
      total += item # 매 반복마다 대입되는 정수 값을 누적해서 더해, total에 대입
      # total = total + item 으로 0 + 40 -> 40 + 20 -> 60 + 70 -> 130 + 50 -> 180 + 30 -> result: 210

    mean = total / len(a) # 210 / 5를 한 값을 mean에 대입, result: 42.0

    total = 0 # init
    for i in range(len(a)): # 위와 동일한 과정 진행
      item = a[i] # 마찬가지
      total += (mean - item) ** 2 # 42.0 - 40 -> 4 -> 42.0 - 20 -> ... result: 1480

    var = total / len(a) # 1480 / 5 result: 296.0

    std = var ** 0.5 # 17.20...

    print(mean, var, std)
  ```

#### index를 활용한 반복문

```python
  # 전역변수 선언
  names = ['홍', '길', '동']
  scores = [50, 70, 40]

  for i in range(3): # 0 -> 1 -> 2를 매반복마다 i변수에 담고
    name = names[i] # names[i]에 해당되는 값을 name변수에 담으며
    score = scores[i] # 동시에 scores[i]에 해당되는 값도 score에 담음

    print(name, score) # result: 홍 50 길 70 동 40
```

#### zip을 활용한 방법

```python
  # zip의 경우 for (1 변수명), (2 변수명) in zip(선언된 이터러블한 1 변수 명시, 선언된 이터러블한 2 변수 명시)
  for name, score in zip(names, scores): # names, scores에 있는 값을 매 반복마다 동일 위치에 있는 변수(name, score)에 값을 담음
    print(name, score) # result: 홍 50 길 70 동 40
```

#### enumerate를 활용한 방법

```python
  for i, name in
```

### while 지속 조건

- 1. 지속 조건 활용 구조
  ```python
    quit = False
    while quit == False:
      ...
      ... 특정 구간에서 quit = True 반환
  ```
- 2. 무한반복문 구조

  ```python
    while True:
      if quit == True:
        break
  ```

- break 무조건 종료
- if문 없이 break가 쓰이면 반복문의 의미가 없음
- if문과 break는 무조건 함께 사용됨
