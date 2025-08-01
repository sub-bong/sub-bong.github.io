const n=`---\r
title: "Python String에 대하여"\r
date: "2025-07-23"\r
keywords: ["TIL", "python"]\r
---\r
\r
## 문자열\r
\r
### 개요\r
\r
- 파이썬에서는 문자 타입이 따로 없어서\r
- 문자 -> 한 글자만 가지고 있는 문자열\r
- 문자열을 literal로 만들 때는 따옴표, 작은 따옴표 둘다 가능\r
- 섞으면 안 됨\r
- 예: \`"Hello world"\`\r
- 왼쪽에서부터 오른쪽으로 -> 방향으로 읽는다\r
- 큰따옴표 발견하면 다음 큰따옴표까지 무조건 다 문자열 내용임\r
\r
### 탈출문자(이스케이프)\r
\r
- \`\\n\`: 줄바꿈\r
- \`\\b\`: 백스페이스\r
- \`\\t\`: 탭\r
- \`\\\\\`: \\를 쓰기위해 사용\r
\r
### 주석\r
\r
- \`#\`: 한줄 주석을 의미\r
- \`'''\`: 여러줄 주석\r
\r
### 문자열 인덱싱\r
\r
- zero-based index\r
- 현대의 모든 언어는 0부터 시작하는데, Matlab은 예외적으로 1부터 시작함\r
- slicing -> 부분 문자열\r
- substring으로도 불림\r
- a[0] + a[1] + a[2] + a[3]\r
- a[0:4] => index 0에서부터 4미만까지\r
\r
### 형변환\r
\r
- 타입 자체가 함수로 동작함\r
- 형변환 연산자가 따로 있다기 보다 형변환을 해주는 함수가 있다.\r
- 타입 이름 == 함수 class에서도 동일\r
\r
### 문자열 포맷팅\r
\r
- 문자열 포맷팅은 3가지가 있음\r
- 1. % 포맷팅\r
- 2. 객체지향형 포맷팅\r
- 3. f 포맷팅\r
\r
### 리스트\r
\r
- 데이터를 그룹으로 묶는 것임\r
- 순서대로 묶으며, 순서가 중요함\r
- 리스트 자체도 데이터(객체)이기 때문에 원소로 포함될 수 있음\r
- \`len(a)\`는 원소의 개수를 return\r
`;export{n as default};
