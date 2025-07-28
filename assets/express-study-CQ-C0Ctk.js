const r=`---\r
title: "Express.js 다루기"\r
date: "2025-04-23"\r
keywords: ["Node.js", "Back-end", "Javascript"]\r
---\r
\r
## Express 시작하기\r
\r
- Node.js의 웹 서버 프레임워크는 다양하게 존재하지만, Express.js는 다른 프레임워크 대비 압도적인 npm 패키지 다운로드 수와 함께 방대한 커뮤니티를 보유하고 있음\r
\r
- \`package.json\` 설정\r
\r
  \`\`\`json\r
  {\r
    "name": "learn-express",\r
    "version": "0.0.1",\r
    "description": "learn-express-001",\r
    "main": "app.js",\r
    "type": "module",\r
    "scripts": {\r
      "start": "nodemon app" //app.js를 nodemon으로 실행\r
    },\r
    "author": "sub_bong",\r
    "license": "MIT"\r
  }\r
  \`\`\`\r
\r
- \`npm\` 패키지\r
\r
  \`\`\`bash\r
  npm i express\r
  npm i -D nodemon\r
  \`\`\`\r
\r
- 배포 후 서버 코드의 변경 빈도가 적기 때문에 nodemon은 개발용으로만 사용할 것을 권장함\r
\r
- \`app.js\` ES 모듈\r
\r
  \`\`\`javascript\r
  import express from "express";\r
\r
  const app = express();\r
  app.set("port", process.env.PORT || 3000);\r
\r
  app.get("/", (req, res) => {\r
    res.send("Hello, Express");\r
  });\r
\r
  app.listen(app.get("port"), () => {\r
    console.log(app.get("port"), "번 포트에서 실행 중");\r
  });\r
  \`\`\`\r
\r
- \`app.set('port', 포트)\`: 서버가 실행될 포트를 설정 **(포트 설정)**\r
- \`app.set(키, 값)\`을 사용하여 데이터 저장 가능, \`app.get(키)\`로 데이터를 가져올 수 있음\r
- \`app.get(주소, 라우터)\`: GET 요청 시 어떤 실행이 이루어질지 명시하는 부분임\r
- \`app.get\`의 매개변수 \`req\`는 요청에 관한 정보를 보유한 객체, \`res\`는 응답에 대한 정보가 포함된 객체임\r
- \`app.listen(포트 번호, 콜백 함수수)\`: 포트를 연결하고 서버를 실행함\r
- \`app.listen\`에 포트 번호로 \`app.get('port')\`를 명시할 경우, \`app.set('port', process.env.PORT || 3000);\`를 가져올 수 있어 보안과 배포에 효과적임\r
\r
#### HTML로 응답 받기\r
\r
- \`res.send\` 대신에 \`res.sendFile\` 메서드를 사용\r
- 단, \`path\` 모듈을 사용하여 파일 경로 지정 필요\r
- \`index.html\` 생성\r
- \`app.js\`에 \`path\` 모듈 및 하기와 같이 추가 적용\r
\r
  \`\`\`javascript\r
  import path from "path";\r
\r
  const __dirname = path.resolve();\r
\r
  app.get("/", (req, res) => {\r
    // res.send('Hello, Express');\r
    res.sendFile(path.join(__dirname, "/index.html"));\r
  });\r
  \`\`\`\r
\r
## Express의 주요 미들웨어\r
\r
- app.use(미들웨어)로 사용됨\r
- app.use 매개변수 \`req, res, next 함수\`\r
- next 세번째 매개변수는 \`다음 미들웨어로 넘어가는 함수\`\r
\r
##### 미들웨어가 실행되는 경우\r
\r
- \`app.use(미들웨어)\` : 모든 요청에서 미들웨어 실행\r
- \`app.use('/abc', 미들웨어)\` : abc 주소로 시작하는 요청에서 미들웨어 실행\r
- \`app.post('/abc', 미들웨어)\` : abc 주소로 시작하는 POST 요청에서 미들웨어 실행\r
\r
  - 즉, 첫 번째 인수에 주소를 넣지 않는다면 모든 요청에서 실행\r
\r
##### 에러 처리 미들웨어\r
\r
- 매개변수 \`app.use((err, req, res, next))\` 총 4개\r
  - \`err\` : 에러에 관한 정보, \`res.status\` 메서드로 HTTP 상태 코드 지정 가능\r
\r
#### 1. dotenv 패키지\r
\r
- \`.env 파일\`을 읽어서 소스코드 상에 기입되는 비밀키들을 보호 및 효율적인 관리 가능\r
- \`process.env.COOKIE_SECRET\` 과 같이 사용 가능\r
\r
#### 2. morgan 미들웨어\r
\r
- 추가적인 로그 확인 가능 \`(GET) / 500 7.409 ms - 50\`\r
- 각각 \`[HTTP 메서드] [주소] [HTTP 상태 코드] [응답 속도] - [응답 바이트]\` 의미\r
- 다음과 같이 사용\r
  \`\`\`javascript\r
  app.use(morgan("dev"));\r
  // dev 외 combined, common, short, tiny 등 존재\r
  // 예) 개발환경 : dev, 배포 환경: combined\r
  \`\`\`\r
\r
#### 3. static 미들웨어\r
\r
- 정적인 파일들을 제공하는 라우터 역할\r
- express 내장된 객체\r
- 다음과 같이 사용\r
  \`\`\`javascript\r
  app.use("요청 경로", express.static("실제 경로"));\r
  app.use("/", express.static(path.join(__dirname, "public")));\r
  \`\`\`\r
\r
#### 4. body-parser 미들웨어\r
\r
- 본문 데이터를 해석하여 \`req.body 객체\`로 만들어주는 미들웨어, 보통 \`form 데이터\`, \`AJAX 요청 데이터\`를 처리\r
- 멀티파트(이미지, 동영상, 파일) 데이터는 처리 불가\r
- \`body-parser\`는 express 내장 객체\r
\r
  \`\`\`javascript\r
  app.use(express.json());\r
  app.use(express.urlencoded({ extended: false }));\r
\r
  app.use(express.raw());\r
  app.use(express.text());\r
  \`\`\`\r
\r
|  요청 데이터  |                 특징                 |\r
| :-----------: | :----------------------------------: |\r
|     \`Raw\`     |  요청 본문이 버퍼 데이터일 때 해석   |\r
|    \`Text\`     |       텍스트 데이터일 때 해석        |\r
|    \`JSON\`     |  JSON 형식의 데이터를 전송하는 방식  |\r
| \`URL-encoded\` | 주소 형식으로 데이터를 전송하는 방식 |\r
\r
- 폼 전송은 URL-encoded 방식 사용\r
- \`urlencoded\` 메서드를 보면 \`{extended: false}\` 옵션 사용\r
- \`false\` : node의 **내장 모듈인 querystring 모듈을 사용**해 쿼리스트링을 해석\r
- \`true\` : **npm 패키지인 qs 모듈(확장된 모듈)을 사용**해 쿼리스트링을 해석\r
\r
- JSON 형식 : \`{name: 'sub_bong', book: 'nodejs'}\`를 본문으로 보내면 \`req.body\`에 그대로 들어감\r
- URL-encoded 형식 : \`name=sub_bong&book=nodejs\`를 본문으로 보내면 \`req.body\`에 \`{name: 'sub_bong', book: 'nodejs'}\`가 들어감\r
\r
#### 5. cookie-parser 미들웨어\r
\r
- 요청에 동본된 쿠키를 해석해 \`req.cookies\` 객체로 만듬\r
  \`\`\`javascript\r
  app.use(cookieParser(비밀 키));\r
  \`\`\`\r
- \`name=sub_bong\` 쿠키를 보냈다면 \`req.cookies\`는 \`{name: 'sub_bond'}\`\r
- 쿠키는 클라이언트에서 위조하기 쉽기 때문에 비밀 키가 반드시 필요\r
- 서명된 쿠키는 \`req.cookies\`에서 \`req.signedCookies\` 객체에 들어 있음\r
- 쿠키 생성/제거 : \`res.cookie\`/\`res.clearCookie\` 메서드를 사용\r
- \`res.cookie(키, 값, 옵션)\` 형식으로 사용\r
- 옵션 : \`domain\`, \`expires\`, \`httpOnly\`, \`maxAge\`, \`path\`, \`secure\` 등\r
\r
| 옵션       | 특징                                                                                                                              |\r
| ---------- | --------------------------------------------------------------------------------------------------------------------------------- |\r
| \`domain\`   | 쿠키가 전송될 도메인을 특정할 수 있음. \`default\` : 현재 도메인                                                                    |\r
| \`expires\`  | 만료 기한이 지나면 쿠키 제거. \`default\`: 클라이언트가 종료될 때까지                                                               |\r
| \`httpOnly\` | 설정 시 자바스크립트에서 쿠키에 접근할 수 없음. **쿠키 조작을 방지하기 위해 설정 필요**                                           |\r
| \`maxAge\`   | 해당 초가 지나면 쿠키가 제거됨. \`expires\`보다 우선함                                                                              |\r
| \`path\`     | 쿠키가 전송될 URL을 특정할 수 있음. \`default\`: \`'/'\` 모든 URL에서 쿠키를 전송                                                     |\r
| \`secure\`   | 설정 시 HTTPS일 경우에만 쿠키가 전송됨                                                                                            |\r
| \`signed\`   | 설정 시 쿠키 뒤에 서명을 붙임. <br/> 내 서버가 쿠키를 만들었다는 것을 검증할 수 있으므로 대부분의 경우 서명 옵션을 키는 것이 좋음 |\r
\r
- 쿠키를 제거하려면 키와 값 외에도 옵션도 정확히 일치해야 함. 단, \`expires\`, \`maxAge\` 옵션은 일치할 필요 없음\r
\r
\`\`\`javascript\r
res.cookie("name", "sub_bong", {\r
  expires: new Date(Date.now() + 900000),\r
  httpOnly: true,\r
  secure: true,\r
});\r
\r
res.clearCookie("name", "sub_bong", { httpOnly: true, secure: true });\r
\`\`\`\r
\r
- 여기서 비밀 키는 \`cookieParser\` 미들웨어에 인수로 넣은 \`process.env.COOKIE_SECRET\`가 됨\r
\r
#### 6. express-session\r
\r
- 로그인 등을 이유로 세션을 구현하거나 특정 사용자를 위한 데이터를 임시적으로 저장해둘 때 매우 유용. \`req.session\` 객체 안에 유지됨\r
\r
  \`\`\`javascript\r
  app.use(\r
    session({\r
      resave: false,\r
      saveUninitialized: false,\r
      secret: process.env.COOKIE_SECRET,\r
      cookie: {\r
        httpOnly: true,\r
        secure: false,\r
      },\r
      name: "session-cookie",\r
    })\r
  );\r
  \`\`\`\r
\r
- \`참고\` : \`express-session 1.5\` 버전 이전에는 내부적으로 cookie-parser를 사용하고 있어서 cookie-parser 미들웨어보다 뒤에 위치해야 했지만, \`1.5 버전 이후\`부터는 **순서 상관 없음**\r
- 세션에 대한 설정 : \`resave\`, \`saveUninitialized\`, \`secret\`\r
\r
| 세션 설정           | 기능                                                                                                                 |\r
| ------------------- | -------------------------------------------------------------------------------------------------------------------- |\r
| \`resave\`            | 요청이 올 때 세션에 수정 사항이 생기지 않더라도 세션을 다시 저장할지 설정                                            |\r
| \`saveUninitialized\` | 세션에 저장할 내역이 없더라도 처음부터 세션을 생성할지 설정                                                          |\r
| \`secret\`            | 비밀 키가 기입됨. 예: \`secret: process.env.COOKIE_SECRET\`                                                            |\r
| \`name\`              | 세션 쿠키의 이름 설정. \`default\`: \`connect.sid\`                                                                      |\r
| \`cookie\`            | 세션 쿠키에 대한 설정. 일반적인 쿠키 옵션 모두 제공됨                                                                |\r
| \`store\`             | 메모리에 세션을 저장. <br/> 데이터베이스를 연결 후 세션이 유지되지만, 연결이 안 된 경우 서버 재시작 시 메모리 초기화 |\r
\r
\`\`\`javascript\r
req.session.name = "sub_bong"; //세션 등록\r
req.session.id; //세션 id 확인\r
req.session.destroy(); //모든 세션 제거\r
\`\`\`\r
\r
- 세션 일괄 삭제 : \`req.session.destroy()\` 메서드 호출\r
- 세션 쿠키 모양 : \`s%3AyULCAper837m...\`\r
- \`express-session에서 서명한 쿠키\` 앞에는 \`s:\`가 붙으며, \`encodeURLComponent 함수가 실행\`되어 \`s%3A\`가 됨\r
- \`s%3A\`의 뒷부분은 실제 암호화된 쿠키 내용\r
\r
#### 7. 미들웨어의 특성 활용하기\r
\r
- 미들웨어 장착 순서에 따라 어떤 미들웨어는 실행이 되지 않을 수도 있음\r
\r
  \`\`\`javascript\r
  app.use(\r
    morgan("dev"),\r
    express.static("/", path.join(__dirname, "public")),\r
    express.json(),\r
    express.urlencoded({ extended: false }),\r
    cookieParser(process.env.COOKIE_SECRET)\r
  );\r
  \`\`\`\r
\r
- 다음 미들웨어로 넘어가기 위해서는 \`next\` 함수를 호출해야 하나, 상기 코드는 내부적으로 \`next\` 함수를 포함하고 있음\r
- 단, \`next\`를 호출하지 않는 미들웨어는 \`res.send\`나 \`res.sendFile\` 등의 메서드로 응답을 보내야 함\r
- 상기 코드의 \`express.static\` 미들웨어는 \`res.sendFile\` 메서드로 응답을 보내기 때문에 \`express.json\`, \`express.urlencoded\`, \`cookieParser\` 미들웨어가 실행되지 않음\r
\r
##### next 함수에 인수 넣기\r
\r
- 'route' 라는 문자열을 넣으면 다음 라우터의 미들웨어로 바로 이동하고, 그 외의 인수를 넣는다면 에러 처리 미들웨어로 이동함\r
\r
  |    \`next()\`     | 다음 미들웨어로 이동                   |\r
  | :-------------: | -------------------------------------- |\r
  | \`next('route')\` | 다음 라우터의 미들웨어로 이동          |\r
  |   \`next(err)\`   | 에러 핸들러(에러 처리 미들웨어)로 이동 |\r
\r
##### 미들웨어 간의 데이터 전달\r
\r
- 세션을 사용한 방법으로, \`req.session\` 객체에 데이터를 넣어 전달 가능하나 세션이 유지되는 동안만 데이터가 존재\r
- \`res.locals\` 객체에 데이터를 넣는 방법으로, 요청이 끝날 때까지만 데이터 유지 가능\r
\r
  \`\`\`javascript\r
  app.use(\r
    (req, res, next) => {\r
      res.locals.data = "input data";\r
      next();\r
    },\r
    (req, res, next) => {\r
      console.log(res.locals.data); // 데이터 받기\r
      next();\r
    }\r
  );\r
  \`\`\`\r
\r
- **\`app.set\` vs \`res.locals\`**\r
  - \`app.set\`은 \`express.js\`에서 전역적으로 사용되므로 하나의 요청 안에서만 유지되어야 하는 값을 넣기에는 부적절함\r
  - 반면, \`res.locals\` 객체는 하나의 요청 안에서만 유지되므로 해당 객체의 요청에 종속되는 데이터를 전달하는 것이 적절\r
  - 결론적으로, \`app.set\`은 앱 전체의 설정을 공유할 때 사용하는 것이 적절, \`res.locals\`은 단일 요청에 종속되는 데이터를 전달할 때 유용함\r
\r
##### 유용한 패턴\r
\r
- 개선 전\r
\r
  \`\`\`javascript\r
  app.use(morgan("dev"));\r
  // or\r
  app.use((req, res, next) => {\r
    morgan("dev")(req, res, next);\r
  });\r
  \`\`\`\r
\r
- 개선 후\r
\r
  \`\`\`javascript\r
  app.use((req, res, next) => {\r
    if (process.env.NODE_ENV === "production") {\r
      morgan("combined")(req, res, next);\r
    } else {\r
      morgan("dev")(req, res, next);\r
    }\r
  });\r
  \`\`\`\r
\r
- 개선 후와 같은 패턴이 유용한 이유는 기존 미들웨어의 기능을 확장할 수 있으며, 분기 처리가 가능함\r
\r
#### 8. multer\r
\r
- 이미지, 동영상 등을 비롯한 여러 가지 파일을 멀티파트 형식으로 업로드할 때 사용하는 미들웨어\r
- 멀티파트 형식은 \`enctype\`이 \`multipart/form-data\`인 폼을 통해 업로드하는 데이터 형식을 의미\r
\r
  \`\`\`html\r
  <form action="/upload" method="post" enctype="multipart/form-data">\r
    <input type="file" name="image" />\r
    <input type="text" name="title" />\r
    <button type="submit">upload</button>\r
  </form>\r
  \`\`\`\r
\r
- 이러한 폼을 통해 업로드하는 파일은 body-parser로는 처리 불가이기에 \`multer\` 미들웨어가 유용\r
\r
##### multer 기본 설정\r
\r
\`\`\`javascript\r
const upload = multer({\r
  storage: multer.diskStorage({\r
    destination(req, file, done) {\r
      done(null, "uploads/");\r
    },\r
    filename(req, file, done) {\r
      const ext = path.extname(file.originalname);\r
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);\r
    },\r
  }),\r
  limits: { fieldSize: 5 * 1024 * 1024 },\r
});\r
\`\`\`\r
\r
| \`storage\` 속성     |                                                                                                                                                                                                                                                      |\r
| :----------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |\r
| \`destination\` 함수 | **어디에 저장할 것인지** <br/> \`req\` 매개변수: 요청에 대한 정보 <br/> \`file(객체)\` 매개변수: 업로드한 파일에 대한 정보를 포함 <br/> \`done(함수)\`: **첫 번째 인수**에는 에러가 있다면 설정 가능, **두 번째 인수**는 실제 경로나 파일 이름 넣기        |\r
| \`filename\`함수     | **어떤 이름으로 저장할 것인지** <br/> \`req\` 매개변수: 요청에 대한 정보 <br/> \`file(객체)\` 매개변수: 업로드한 파일에 대한 정보를 포함 <br/> \`done(함수)\`: **첫 번째 인수**에는 에러가 있다면 설정 가능, **두 번째 인수**는 실제 경로나 파일 이름 넣기 |\r
| 처리 방식          | \`req\`나 \`file\`의 데이터를 가공해서 \`done\`으로 넘기는 형식                                                                                                                                                                                            |\r
\r
---\r
\r
| \`limits\` 속성 | 업로드에 대한 제한 사항을 설정 |\r
| :------------ | :----------------------------- |\r
| \`fileSize\`    | 바이트 단위 설정               |\r
\r
- 위의 기능을 사용하려면 서버에 uploads 폴더가 존재해야 함\r
- 직접 만들거나 \`fs 모듈\`을 사용하여 서버를 시작할 때 생성할 수 있음\r
\r
## Router 다루기\r
\r
- \`app.get\` 메서드의 라우터를 분리할 수 있는 방법을 제공하며, 이를 통해 라우팅을 빠르고 효율적인 관리 가능\r
- \`routes\` 폴더 안에 \`about.js\`, \`user.js\` 생성\r
\r
- \`./routes/about.js\`\r
\r
  \`\`\`javascript\r
  import express from "express";\r
\r
  const router = express.Router();\r
\r
  router.get("/", (req, res) => {\r
    res.send("Hello, About page");\r
  });\r
  // res.sendFile 로 html 파일 응답 가능\r
  export default router;\r
  \`\`\`\r
\r
- \`./routes/user.js\`\r
\r
  \`\`\`javascript\r
  import express from "express";\r
\r
  const router = express.Router();\r
\r
  router.get("/", (req, res) => {\r
    res.send("Hello, User page");\r
  });\r
  // res.sendFile 로 html 파일 응답 가능\r
  export default router;\r
  \`\`\`\r
\r
- \`app.js\`\r
\r
  \`\`\`javascript\r
  // import 추가\r
  import aboutRouter from "./routes/about.js";\r
  import userRouter from "./routes/user.js";\r
\r
  // app.use('주소', 실행될 미들웨어)\r
  app.use("/about", aboutRouter);\r
  app.use("/user", userRouter);\r
  \`\`\`\r
\r
### \`Express.js\`의 \`Router\` 작동 원리\r
\r
- \`about.js\`는 \`app.js\`의 \`app.use('/about', 미들웨어)\`를 명시하여 \`localhost:3000/about (이하 /about)\`주소로 연결하였음\r
- \`user.js\`는 \`app.js\`의 \`app.use('/user', 미들웨어)\`를 명시하여 \`/user\`주소로 연결하였음\r
\r
---\r
\r
- \`aboutRouter\`는 \`app.use\`의 \`/about\`와 \`router.get\`의 \`/\`가 결합되어 \`GET /about\`가 됨\r
- \`userRouter\`는 \`app.use\`의 \`/user\`와 \`router.get\`의 \`/\`가 결합되어 \`GET /user\`가 됨\r
\r
---\r
\r
- URL : \`localhost:3000\`/<sup>**(1)**</sup>\`app.js의 app.use('/주소')\`/<sup>**(2)**</sup>\`router.get('/주소')\`\r
- 코드 : \`app.use(\`<sup>**(1)**</sup>\`"/about",\` <sup>**(2)**</sup>\`aboutRouter);\`\r
\r
- 추가적으로, \`app.use\`의 \`주소\`는 파일명과 동일할 필요 없으나, 관리 측면에서 볼 때 동일하게 명시하는 것을 추천함\r
- 참고로, \`index.js\`를 import할 경우 생략 가능. \`./routers/index.js\`와 \`./routers\`는 같다는 의미임\r
\r
#### next 함수로 다음 라우터로 넘기는 방법\r
\r
- 미들웨어 세 번째 인자로 \`next('주소')\` 명시하여 주소(=\`function\` 값)와 일치하는 라우터로 넘길 수 있음\r
\r
- \`about.js\`\r
  \`\`\`javascript\r
  router.get(\r
    "/",\r
    (req, res, next) => {\r
      res.sendFile(path.join(__dirname, "about.html"));\r
      next("router");\r
    },\r
    (req, res, next) => {\r
      console.log("실행 안됨");\r
    },\r
    (req, res, next) => {\r
      console.log("실행 안됨");\r
    },\r
    router.get("/", (req, res, next) => {\r
      console.log("실행됨");\r
      res.send("about.html 대신 text만 출력됨");\r
    })\r
  );\r
  \`\`\`\r
\r
#### 라우트 매개변수 패턴\r
\r
- 라우터 주소에는 정규표현식을 비롯한 특수한 패턴을 사용할 수 있음\r
- 라우트 매개변수 패턴 외, \`문자열 기반 경로 및 패턴\`,\`정규표현식 기반 경로\` 존재함\r
\r
- 라우트 매개변수 패턴은 자주 쓰이는 패턴임\r
\r
  \`\`\`javascript\r
  router.get("/user/:id", (req, res) => {\r
    console.log(req.params, req.query);\r
  });\r
  \`\`\`\r
\r
- 해당 패턴은 다양한 라우터를 아우르는 와일드카드 역할을 할 수 있음\r
- \`/user/123\` 혹은 \`user/test\` 등의 요청에도 처리 가능함\r
- \`req.params\` 객체 안에 데이터가 존재하며, \`:id\`일 경우 \`req.params.id\`로, \`:test\`이면 \`req.params.test\`로 조회 가능함\r
- 주의점: 라우트 매개변수 패턴은 일반 라우터보다 뒤에 위치해야 함\r
\r
- 다음의 코드를 참고\r
\r
  \`\`\`javascript\r
  // localhost:3000/user/1로 요청을 보내면, 서버 콘솔에 '실행됨'이 출력됨(응답).\r
  router.get("user/:id", (req, res) => {\r
    console.log("실행됨");\r
  });\r
\r
  // localhost:3000/user/test로 요청을 보내면, 서버 콘솔에 출력되는 로그가 없음(응답).\r
  router.get("user/test", (req, res) => {\r
    console.log("실행 안됨");\r
  });\r
  \`\`\`\r
\r
- 다음과 같이도 가능함\r
\r
  \`\`\`javascript\r
  router.get("/users/:userId/board/:boardId", (req, res) => {\r
    res.send(req.params);\r
  });\r
  // 요청: localhost:3000/user/users/1/board/123\r
  // 응답: { "userId": "1", "boardId": "123" }\r
  \`\`\`\r
\r
- 하이픈(-)과 마침표(.)는 문자 그대로 해석됨\r
- 다음과 같이 사용할 수 있음\r
\r
  \`\`\`javascript\r
  router.get("/users/:userId-:boardId", (req, res) => {\r
    res.send(req.params);\r
  });\r
  // 요청: localhost:3000/user/users/test-title\r
  // 응답: { "userId": "test", "boardId": "title" }\r
\r
  router.get("/users/:userId.:boardId", (req, res) => {\r
    res.send(req.params);\r
  });\r
  // 요청: localhost:3000/user/users/test.title\r
  // 응답: { "userId": "test", "boardId": "title" }\r
  \`\`\`\r
\r
- **주의점:** 라우터 매개변수 패턴은 일반 라우터보다 뒤에 위치시키야 되지만, - 과 .을 혼합한 라우터 패턴도 매개변수 패턴 뒤에 위치시켜야 함\r
- 즉, **가장 아래** \`라우터 매개변수 패턴\` 위치, **다음 위로** \`하이픈(-) 혹은 마침표(.)가 혼합된 라우터 매개변수 패턴\`, **그 위로** \`일반 라우터\`가 위치해야 함\r
\r
- 다음의 case 1, 2를 참고\r
\r
- case 1\r
\r
  \`\`\`javascript\r
  // 요청: localhost:3000/user/test\r
  // 응답: (1)이 실행되어 "test user 입니다." 출력됨\r
\r
  // 요청: localhost:3000/user/test.test\r
  // 응답: (1)이 실행되어 "test.test user 입니다." 출력됨\r
\r
  // 결론: (2)가 무시됨\r
\r
  // (1)\r
  router.get("/:id", (req, res) => {\r
    console.log(req.params, req.query);\r
    res.send(req.params.id + " user 입니다.");\r
  });\r
\r
  // (2)\r
  router.get("/:userId.:boardId", (req, res) => {\r
    res.send(req.params);\r
  });\r
  \`\`\`\r
\r
- case 2\r
\r
  \`\`\`javascript\r
  // 요청: localhost:3000/user/test\r
  // 응답: (2)가 실행되어 "test user 입니다." 출력됨\r
\r
  // 요청: localhost:3000/user/test.test\r
  // 응답: (1)이 실행되어 { "userId": "test","boardId": "test" } 출력됨\r
\r
  // 결론: (1), (2) 라우트 모두 정상 작동됨\r
\r
  // (1)\r
  router.get("/:userId.:boardId", (req, res) => {\r
    res.send(req.params);\r
  });\r
\r
  // (2)\r
  router.get("/:id", (req, res) => {\r
    console.log(req.params, req.query);\r
    res.send(req.params.id + " user 입니다.");\r
  });\r
  \`\`\`\r
\r
- **쿼리스트링의 키-값 정보**는 \`req.query\` 객체 안에 존재함\r
- \`/user/1?name=sub_bong&age=20\` 주소의 요청이 들어왔을 때 \`req.params\`와 \`req.query\` 객체는 다음과 같음\r
\r
  \`\`\`javascript\r
  {id: '1'} {name: 'sub_bong', age: '20'}\r
  \`\`\`\r
\r
- **중요: 쿼리스트링은 라우터 경로의 일부가 아님**\r
\r
#### 일치하는 라우터가 없을 때 처리 방법\r
\r
- 익스프레스는 자동으로 404 에러를 처리해주나, 가능하면 \`404 응답 미들웨어\`와 \`에러 처리 미들웨어\`를 연결해주는 것이 좋음\r
- 일반적으로, 에러 처리 미들웨어 위에 응답 미들웨어를 위치시킴\r
\r
  \`\`\`javascript\r
  // 상태 코드에 따른 응답 미들웨어\r
  app.use((req, res, next) => {\r
    res.status(404).send("페이지를 찾을 수 없습니다 XD");\r
  });\r
\r
  // 에러 처리 미들웨어\r
  app.use((err, req, res, next) => {\r
    console.error(err);\r
    res.status(500).send(err.message);\r
  });\r
  \`\`\`\r
\r
#### \`app.route\`(또는 \`router.route\`)로 라우터 그룹화\r
\r
- 주소는 같지만 HTTP 메서드는 다른 코드가 있을 때 그룹화 할 수 있음\r
\r
- 그룹화 전\r
\r
  \`\`\`javascript\r
  // 기존 라우터\r
  router.get("/test", (req, res) => {\r
    res.send("GET Hello test router");\r
  });\r
\r
  router.post("/test", (req, res) => {\r
    res.send("POST Hello test router");\r
  });\r
  \`\`\`\r
\r
- 그룹화 후\r
  \`\`\`javascript\r
  // 라우터 그룹화\r
  app\r
    .route("/test")\r
    .get((req, res) => {\r
      res.send("GET Hello test router");\r
    })\r
    .post((req, res) => {\r
      res.send("POST Hello test router");\r
    });\r
  \`\`\`\r
\r
## req, res 객체\r
\r
- 익스프레스의 req, res 객체는 http 모듈의 req, res 객체를 확장한 것임\r
\r
- \`req\` 객체\r
\r
  ***\r
\r
  | \`req.app\`            | req 객체를 통해 app 객체에 접근 가능. \`req.app.get('port')\`와 같은 식으로 사용 가능 |\r
  | :------------------- | :---------------------------------------------------------------------------------- |\r
  | \`req.body\`           | body-parser 미들웨어가 만드는 요청의 본문을 해석한 객체                             |\r
  | \`req.cookies\`        | cookie-parser 미들웨어가 만드는 요청의 쿠키를 해석한 객체(서명되지 않은 쿠키)       |\r
  | \`req.ip\`             | 요청의 ip 주소가 존재                                                               |\r
  | \`req.params\`         | 라우트 매개변수에 대한 정보가 포함된 객체                                           |\r
  | \`req.query\`          | 쿼리스트링에 대한 정보가 포함된 객체                                                |\r
  | \`req.signedCookies\`  | 서명된 쿠키들이 포함됨                                                              |\r
  | \`req.get(헤더 이름)\` | 해더의 값을 가져올 때 사용하는 메서드                                               |\r
\r
  ***\r
\r
- \`res\` 객체\r
\r
  ***\r
\r
  | \`res.app\`                       | res 객체를 통해 app 객체에 접근 가능                                         |\r
  | :------------------------------ | :--------------------------------------------------------------------------- |\r
  | \`res.cookie(키, 값, 옵션)\`      | 쿠키를 설정하는 메서드                                                       |\r
  | \`res.clearCookie(키, 값, 옵션)\` | 쿠키를 제거하는 메서드                                                       |\r
  | \`res.end()\`                     | 데이터 없이 응답을 보냄                                                      |\r
  | \`res.json(JSON)\`                | JSON 형식의 응답을 보냄                                                      |\r
  | \`res.locals\`                    | 하나의 요청 안에서 미들웨어 간에 데이터를 전달하고 싶을 때 사용하는 객체     |\r
  | \`res.redirect(주소)\`            | 리다이렉트할 주소와 함께 응답을 보냄                                         |\r
  | \`res.render(뷰, 데이터)\`        | 템플릿 엔진을 렌더링해서 응답할 때 사용하는 메서드                           |\r
  | \`res.send(데이터)\`              | 데이터와 함께 응답을 보냄. 데이터는 \`문자열\`, \`HTML\`, \`버퍼\`, \`객체\`, \`배열\` |\r
  | \`res.sendFile(경로)\`            | 경로에 위치한 파일을 응답함                                                  |\r
  | \`res.set(헤더, 값)\`             | 응답의 헤더를 설정함                                                         |\r
  | \`res.status(상태 코드)\`         | 응답 시의 HTTP 상태 코드를 지정함                                            |\r
\r
  ***\r
\r
- 다음과 같이 \`메서드 체이닝\` 활용 가능\r
  \`\`\`javascript\r
  res.status(201).cookie("test", "test").redirect("/admin");\r
  \`\`\`\r
`;export{r as default};
