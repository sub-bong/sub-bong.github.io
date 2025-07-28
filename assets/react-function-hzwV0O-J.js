const n=`---\r
title: "React.js Function에 대해 이해"\r
date: "2025-04-29"\r
keywords: ["React.js", "front-end", "Javascript"]\r
---\r
\r
## 함수를 정의하는 방법\r
\r
### React와 JS의 함수 호출 차이점\r
\r
- JS는 \`Component(props)\` 형태로 호출함\r
- React.js는 \`<Component hello={props.hello} .../>\` 또는 \`<Component {...props} />\`와 같은 형태로 호출 가능함\r
\r
### 함수를 정의하는 4가지 방법\r
\r
#### 함수 선언문\r
\r
- JS에서 가장 일반적으로 사용하는 방식\r
\r
  \`\`\`javascript\r
  function add(a, b) {\r
    return a + b;\r
  }\r
  \`\`\`\r
\r
#### 함수 표현식\r
\r
- JS에서 함수는 1급 객체이므로, 함수를 변수에 할당하는 것이 가능함\r
- 함수 표현식에는 할당하려는 함수의 이름을 생략하는 것이 ~~일반적임~~ 필수임\r
\r
  \`\`\`javascript\r
  const sum = function (a, b) {\r
    return a + b;\r
  };\r
\r
  sum(10, 24); // 34\r
  \`\`\`\r
\r
#### Function 생성자\r
\r
- Function 생성자를 활용하는 방법으로, 거의 사용되지 않는 방식임\r
\r
  \`\`\`javascript\r
  const add = new Function("a", "b", "return a + b");\r
\r
  add(10, 24); // 34\r
  \`\`\`\r
\r
#### 화살표 함수\r
\r
- \`function\` 키워드 대신에 \`=>\`라는 화살표를 활용하여 함수를 만듬\r
\r
  \`\`\`javascript\r
  const add = (a, b) => {\r
    return a + b;\r
  };\r
  // or\r
  const add = (a, b) => a + b;\r
  \`\`\`\r
\r
##### 화살표 함수와 일반 함수의 차이\r
\r
- 화살표 함수는 생성자 함수로 화살표 함수를 사용하는 것은 불가능함. 그러므로 constructor를 사용 불가\r
\r
  \`\`\`javascript\r
  const Car = (name) => {\r
    this.name = name;\r
  };\r
\r
  const myCar = new Car("hi");\r
  // Uncaught TypeError: Car is not a constructor\r
  \`\`\`\r
\r
- 화살표 함수에는 arguments가 존재하지 않음\r
\r
\`\`\`javascript\r
function test1() {\r
  console.log(arguments);\r
}\r
test1(1, 2, 3);\r
// result: Arguments(3) [1, 2, 3, callee: f, Symbol(Symbol.iterator): f]\r
\r
const test2 = () => {\r
  console.log(arguments);\r
};\r
test2(1, 2, 3);\r
\r
// result: Uncaught ReferenceError: arguments is not defined\r
\`\`\`\r
\r
- this 바인딩의 작동 방식이 다름\r
- 일반 함수의 경우 함수가 어떻게 호출되느냐에 따라 동적으로 결정되므로, this는 전역 객체를 가리키게 됨\r
- 화살표 함수는 함수 자체의 바인딩을 갖지 않으므로, 내부에서 this를 참조하면 상위 스코프의 this는 따르게 됨\r
\r
  > 참고: \`this\`는 자신이 속한 객체나 자신이 생성할 인스턴스를 가리키는 값임임\r
\r
- 화살표 함수는 this가 선언되는 시점에 이미 상위 스코프로 결정되는 반면, 일반 함수는 호출하는 런타임 시점에 결전되는 this를 그대로 따름\r
\r
  \`\`\`javascript\r
  // 트랜스파일하기 전\r
  const test1 = () => {\r
    console.log(this);\r
  };\r
\r
  function test2() {\r
    console.log(this);\r
  }\r
\r
  // 트랜스파일된 후\r
  var _this = void 0;\r
\r
  var test1 = function test1() {\r
    console.log(_this);\r
  };\r
\r
  function test2() {\r
    console.log(this);\r
  }\r
  \`\`\`\r
\r
### 리액트에서 자주 사용되는 함수\r
\r
#### 즉시 실행 함수\r
\r
- 즉시 실행 함수(이하 IIFE)는 함수를 정의하는 즉시 실행되는 함수를 의미함\r
- 무조건 단 한 번만 호출되는 특징이 있음(**재호출 불가**)\r
- 함수에 이름을 붙이지 않음\r
\r
  \`\`\`javascript\r
  (function (a, b) {\r
    return a + b;\r
  })(10, 24); // 34\r
\r
  // or\r
\r
  ((a, b) => {\r
    return a + b;\r
  })(10, 24); // 34\r
  \`\`\`\r
\r
#### 고차 함수\r
\r
- 고차 함수는 함수를 인수로 받거나 결과로 새로운 함수를 반환시킬 수 있는 함수임\r
\r
  \`\`\`javascript\r
  // Array.prototype.map는 대표적인 고차 함수\r
  const items = [1, 2, 3].map((item) => item * 2);\r
\r
  items; // [2, 4, 6]\r
  \`\`\`\r
\r
### 함수 생성 시 주의점\r
\r
#### 함수의 부수 효과를 최대한 억제\r
\r
- 선언된 함수 내부가 아닌 외부에 영향을 미치는 것을 억제해야 됨\r
- 부수 효과가 없는 함수를 순수 함수라고 할 수 있음\r
- 순수 함수는 부수 효과가 없고, 어떤 상황이든 동일한 인수만 받으며, 동일한 결과를 반환해야 함. 또한 작동 중에 외부에 어떤 영향도 미쳐서는 안 됨\r
- 리액트 관점에서는 useEffect의 작동을 최소화하는 것임\r
\r
#### 가능한 함수를 작게 만들기\r
\r
- 함수당 코드의 길이가 길어질수록 문제의 여지가 발생할 확률을 높이는 행위이며, 무엇보다 내부에서 무슨 일이 발생하는지 추적하기 어려움\r
- \`ESLint\`의 \`max-lines-per-function\`의 규칙에 따르면, 기본값으로 50줄 이상이 넘어가면 경고 메시지를 출력하며, 중첩과 콜백이 얼마나 많은지도 확인 가능함\r
- 핵심은 하나의 함수에서 너무 많은 일을 하지 않게 하는 것임\r
- 함수의 크기를 명확하게 정의할 수 없지만, 코드나 프로젝트가 처한 상황에 따라 달라질 수 있을 것임\r
\r
#### 누구나 이해할 수 있는 이름으로 명명하기\r
\r
- 가능한 함수 이름은 간결하고 이해하기 쉽게 붙이는 것이 좋음\r
- 선언된 함수의 이름으로, 어떤 기능을 하고 어떻게 작동하는지 단번에 이해할 수 있게 명명하는 것을 추천함\r
- 리액트에서 \`useEffect\`나 \`useCallback\`의 콜백 함수에 이름을 명명하면 가독성에 도움을 줄 수 있음\r
  \`\`\`javascript\r
  useEffect(function getList() {\r
    // ...\r
  }, []);\r
  \`\`\`\r
`;export{n as default};
