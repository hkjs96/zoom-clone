const messageList = document.querySelector("ul");
const messageForm = document.querySelector("#message");
const nickForm = document.querySelector("#nick");
// app.js 의 socket은 서버로의 연결을 의미
const socket = new WebSocket(`ws://${window.location.host}`);

function makeMessage(type, payload) {
    const msg = { type, payload };
    return JSON.stringify(msg);
}

socket.addEventListener("open", () => {
    console.log("Connected to Server O");
})

socket.addEventListener("message", (message) => {
    const li = document.createElement("li");
    li.innerText = message.data;
    messageList.append(li);
})
socket.addEventListener("close", () => {
    console.log("Disconnected from Server X");
})


function handleSubmit(event) {
    event.preventDefault(); // 기본 이벤트 차단
    const input = messageForm.querySelector("input");
    socket.send(makeMessage("new_message", input.value));
    input.value = "";
}

// socket 으로  data can be a string, a Blob, an ArrayBuffer, or an ArrayBufferView
// 값만 보낼수 있고, 상대 서버가 js가 아닌 java, Go 같이 다른 언어로된
// 서버일 수도 있기 때문에 javascript Object 가 아닌 다른 것으로 보낸다.
// object를 String 형식으로 변환해서 보내한다.
// WebSocket은 Web Browser API 이기 때문에 백엔드를 정하지 않고 러프하게 봐야한다.
function handleNickSummit(event) {
    event.preventDefault();
    const input = nickForm.querySelector("input");
    socket.send(makeMessage("nickname", input.value));
    input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSummit);
