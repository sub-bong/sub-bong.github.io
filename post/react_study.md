---
title: "React를 위한 Javascript"
date: "2025-04-24"
keywords: ["React.js", "front-end", "Javascript"]
---

## 목차

1. [JS 동등 비교 이해](#js-동등-비교-이해)
2. [JS 함수 이해](#js-함수-이해)
3. [JS 클래스 이해](#js-클래스-이해)
4. [클로저 이해](#클로저-이해)
5. [이벤트 루프 및 비동기 통신 원리](#이벤트-루프-및-비동기-통신-원리)
6. [사용빈도 높은 JS 문법](#사용빈도-높은-js-문법)

## JS 동등 비교 정리

### 데이터 타입

### `원시 타입`

- 원시 타입은 불변 형태의 값이 저장되며 변수 할당 시점에 메모리 영역을 차지하고 저장됨

| 타입명      | 설명                                                                                                                                                                                                        |
| :---------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `undefined` | 선언되었지만, 할당되지 않은 값                                                                                                                                                                              |
| `null`      | 명시적으로 비어 있음을 나타내는 값 **(인용문 참조)**                                                                                                                                                        |
| `Boolean`   | true와 false만 가질 수 있는 데이터 타입. [truthy와 falsy 값](#truthy와-falsy-값)이 존재                                                                                                                     |
| `Number`    | 정수와 실수 모두 Number 타입에 저장됨. -(2<sup>53</sup>-1)과 2<sup>53</sup>-1 사이의 값을 저장할 수 있음. 진수별 모든 값은 10진수로 해석됨                                                                  |
| `BigInt`    | `number`의 한계를 넘어서 더 큰 숫자를 저장할 수 있음. 최대 2<sup>53</sup>-1을 저장할 수 있음 <br/>숫자 끝에 `n` `(예: const bigint = 294730320472047n)`을 붙이거나 BigInt 함수를 사용하면 됨                |
| `String`    | 텍스트 타입의 데이터를 저장하기 위해 사용함. '', "", 내장 표현식을 허용하는 \`\`(백틱)으로 표현 가능함. <br/> \`\`으로 표현한 문자열을 템플릿 리터럴이라고 하며 줄바꿈, 문자 내부에 표현식을 사용할 수 있음 |
| `Symbol`    | 중복되지 않는 어떠한 고유한 값을 나타내기 위한 타입임. 오직 심벌 함수를 이용해야 생성 가능함. 예: `Symbol()`                                                                                                |

```javascript
// Symbol 함수에 같은 인수를 넘겨주더라고 동일한 값으로 인정되지 않음
// 동일한 값을 사용하기 위해서는 Symbol.for를 활용함
Symbol.for("test") === Symbol.for("test"); //result: true
```

> javascript는 `null`의 타입을 확인했을 때 해당 타입이 아닌 `object`로 반환되는데, 이는 초창기 JS가 값을 표현하는 방식 때문에 발생한 문제임
>
> > 참고: `null`의 타입을 `null`로 변경하고자 했으나 **호환성이 깨지는 변경 사항**이어서 무산되었음

#### truthy와 falsy 값

- `falsy`: 조건문 내부에서 false로 취급되는 값

  | 값              | 타입           | 설명                                        |
  | :-------------- | :------------- | :------------------------------------------ |
  | false           | Boolean        | false는 대표적인 falsy한 값                 |
  | 0, -0, 0n, 0x0n | Number, BigInt | 0은 부호나 소수점 유무 상관 없이 falsy한 값 |
  | NaN             | Number         | Number가 아니라는 것을 의미하며 falsy한 값  |
  | '', "", ``      | String         | 공백이 없는 빈 문자열은 falsy한 값          |
  | null            | null           | null은 falsy한 값                           |
  | undefined       | undefined      | undefined는 falsy한 값                      |

- `truthy`: 조건문 내부에서 true로 취급되는 값. **falsy로 취급되는 값 이외에는 모두 true로 취급**됨

### `객체 타입`

- **원시 타입 이외의 모든 것은 객체 타입**으로, 배열, 함수, 정규식, 클래스 등이 포함됨
- 객체 타입(object type)은 참조를 전달한다고 하여 참조 타입(reference type)으로도 불림
- 원시 타입과 객체 타입의 큰 차이점은 값을 저장하는 방식의 차이임. 이로 인해 동등비교 시 차이가 생김

```javascript
let hello = "hello world";
let hi = hello;

console.log(hello === hi); // 값을 복사하여 전달되었기에 당연히 true

let hello = "hello world";
let hi = "hello world";

console.log(hello === hi); // 동일한 값으로 선언하였기에 당연히 true
```

- 반면, 객체는 프로퍼리를 삭제, 추가, 수정할 수 있으므로 윈시 값과 달리 변경 가능한 형태로 저장됨. 그러므로 **값을 복사할 때도** 값이 아닌 **참조(주소)를 전달**하게 됨
  > 여기서 참조값을

```javascript
const hello = {
  greet: "hello, world",
};

const hi = {
  greet: "hello, world",
};

console.log(hello === hi); // 객체 간 동등비교는 false
console.log(hello.greet === hi.greet); // 그러나 원시값인 내부 속성값을 비교하면 true

// 이렇게는 어떤 결과가...

const hello = {
  greet: { hi: "hello, world" },
};

const hi = {
  greet: { hi: "hello, world" },
};

console.log(hello === hi); // false
console.log(hello.greet === hi.greet); // 당연하게도 내부 속성값이 원시값이 아닌 객체라서 false
```

#### 이유가 무엇인가?

- 객체는 값을 저장하는 것이 아닌 참조(주소)를 저장하기에 동일한 값을 선언하더라도 실제로는 다른 참조(주소)를 바라보기 때문에 false를 반환함
- 즉, 값은 같지만 참조(주소)하는 곳이 다르기 때문임

- 다음의 경우에는 true를 반환함

```javascript
const hello = {
  greet: "hello, world",
};
const hi = hello;

console.log(hi === hello); // true

// 내부 속성값으로 객체를 넣어도 결과는 true
const hello = {
  greet: { hi: "hello, world" },
};

const hi = hello;

console.log(hello === hi); // true
console.log(hello.greet === hi.greet); // true
```

- 위와 같이 변수명과 변수명의 주소가 다르지만 true가 반환되는 이유는 **value가 가리키는 주소가 동일하기 때문**임
  > (원시 타입과 객체 타입에 대해 더 이해하기) 주소 명시할 것.

#### 리액트에서의 동등비교
