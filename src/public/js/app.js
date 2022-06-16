const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");

room.hidden = true;

let roomName = "";

// back 에서 front 에서 사용될 함수를 실행시킨다.
function showRoom(msg) {
    welcome.hidden = true;
    room.hidden = false;
    const h3 = room.querySelector("h3");
    h3.innerText = `Room ${roomName}`;
}

function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector("input");

  // 어떤 이벤트든 전송이 가능하고, Socket.IO가 Object 전송 가능 알아서 처리
  // 1번 이벤트명, 2번 보내고싶은 payload, 3번 서버에서 호출 가능한 function
  // 중간에 argument는 여러개 보내도 되는데 function만 맨 마지막에 오면 된다.
  socket.emit("room", { payload: input.value }, showRoom);
  roomName = input.value;
  input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);