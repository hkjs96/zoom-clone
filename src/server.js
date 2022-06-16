import http from "http";
import express from "express";
import SocketIO from "socket.io";

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
const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

wsServer.on("connection", socket => {
    
    // socket.on("원하는 이벤트") 어느 이벤트든 상관 없음 room, enter_room 등등 
    // 서버에서 done 이라는 함수를 호출, 이 함수는 이름은 맘대로 정할 수 있으며(fn, func cb ...),
    // 서버가 done을 실행하면 백엔드에서 실행되지 않고 프론트에서 함수가 실행된다.
    socket.on("room", (msg, done) => { 
        console.log(msg);
        setTimeout(() => {
            done("hello from the back end!"); // back에서 실행되면 심각한 보안 문제가 발생한다.
                    // 어떤 데이터를 보낼지 모르기 떄문에 
        }, 15000);
    });
});

/*
// wss 서버 실행
// 결과 적으로 두개 실행 가능..
// ws, http 두개를 실행하지 않아도 되지만
// 같은 포트(3000)를 사용하기 위해서 websocket의 인스턴스로 httpserver 인스턴스를 인수로 넣음.
const wss = new Websocket.Server({ server });

// 배열에 받아 다른 socket에 내용 전달 가능?
const sockets = [];

// server.js에서 여기 handleConnection 의 socket 은 연결된 브라우저를 뜻함.
// socket? 연결된 어떤 사람인 것, 연결된 브라우와의 연락(contact) 라인
// socket 은 나(서버)와 브라우져 사이의 연결 역할을 수행
wss.on("connection", (socket) => {
    sockets.push(socket);
    socket["nickname"] = "익명";
    console.log("Connected to Browser O ");
    socket.on("close", () => console.log("Disconnected from the Browser X"));
    socket.on("message", (msg) => {
        const message = JSON.parse(msg);
        switch (message.type) {
            case "new_message":
                sockets.forEach((aSocket) => 
                    aSocket.send(`${socket.nickname}: ${message.payload}`)
                );
            case "nickname":
                socket["nickname"] = message.payload;
         }
    });
});
*/

// http 서버에서 access를 하려는 것, http 서버 위에서 ws를 구동
httpServer.listen(3000, handleListen);




// {
//     type: "message",
//     payload: "안녕하세요!"
// }

// {
//     type: "nickname",
//     payload: "지수"
// }