const n=`---
title: "SQL문 정리"
date: "2025-07-28"
keywords: ["TIL", "sql", "RDB"]
---

# SQL문 (where, order by, group by, having, case~end)

## where (조건문 절)

- 순서: select -> from -> where 즉, 3번째 위치해야 함
- where (column) 조건문(>, <, =, <=, >=과 and, or도 활용 가능)
- where (column) between (val1) and (val2), val1과 val2도 포함한 사이의 값
- where (column) in (val1, val2, val3) 해당 칼럼에 값이 존재하는지 확인

## order by (정렬)

- 순서: select -> from -> where -> order by (단, 다른 절(group by 등)이 사용할 경우 항상 마지막에 위치)
- order by는 column을 기준으로 정렬하며, select에 명시되지 않은 column도 정렬 가능
- default: asc, 내림차순은 desc를 column 뒤에 명시

## group by (그룹화)

- 순서: select -> from -> where -> group by -> order by

## having (그룹화에 대한 조건문 절)

- 순서: select -> from -> where -> group by -> having -> order by
- group by 된 것을 기준으로 조건문 가능

## case ~ end

- if문과 유사한 구문
- \`case - end\`는 select에 나타낼 수 있는 조건문 역할, 따라서 \`,\` 로 여러 개의 column을 출력할 수 있음
- case when 조건문 then 실행문 else 실행문
- 실행문에는 연산값, 문자열 실행 가능
- then 실행문에는 '문자열'을 명시하여 row로 나타낼 수 있음. 조건문에 따라서 다른 row 값을 나타낼 수 있음
- else도 위와 동일하며, 조건문 없이 false 조건의 실행문을 나타낼 수 있음
- end "case의 나타낼 column 별칭" 즉, select의 별칭과 동일함

## join

- a table과 b table를 서로 연결하는 것
- 반드시 pk key와 fk key 간에 조인 가능
- 보통 id 값으로 조인, 왜냐하면 보통 시퀀스으로 나타내기에 테이블 간의 값이 달라지지 않음
- table의 별칭을 명시하여 타 table의 칼럼이 중복되어 있다면 오류가 생길 수 있으므로, 별칭으로 어느 테이블의 칼럼인지 구분할 것.

### 등가 join

- 등가 join을 위해서는 where문 활용이 필요함. 즉 a table의 column = b table의 column 조건에 맞는 칼럼을 출력
`;export{n as default};
