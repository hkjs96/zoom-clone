import http from "http";
import Websocket from 'ws';
import express from "express";


const app = express();

// 템플릿이 어디에 있는지 알려주고
app.set("view engine", "pug");
app.set("views", __dirname + "/views");

// 정적 파일이 어디에 있는지 알려준다.
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

// http 서버 실행
const server = http.createServer(app);
// wss 서버 실행
// 결과 적으로 두개 실행 가능..
// ws, http 두개를 실행하지 않아도 되지만
// 같은 포트(3000)를 사용하기 위해서 websocket의 인스턴스로 httpserver 인스턴스를 인수로 넣음.
const wss = new Websocket.Server({ server });

// server.js에서 여기 handleConnection 의 socket 은 연결된 브라우저를 뜻함.
function handleConnection(socket) {
    console.log(socket)
}

// socket? 연결된 어떤 사람인 것, 연결된 브라우와의 연락(contact) 라인
// socket 은 나(서버)와 브라우져 사이의 연결 역할을 수행
wss.on("connection", handleConnection)

// http 서버에서 access를 하려는 것, http 서버 위에서 ws를 구동
server.listen(3000, handleListen);
