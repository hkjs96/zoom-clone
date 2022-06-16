# Noom

Zoom CLone using NodeJS, WebRTC and Websockets.

## Socket.IO 프레임워크
 - [socket.io - docs](https://socket.io/docs/v4/)
 - 실시간, 양방향, event 기반 통신 제공, (websocket을 이용)
 - proxy, firewall 이 있어도 작동
 - websocket을 지원하지 않으면 다른 것을 이용한다.
 - 자동 재 연결
 

# 
1. Socket.IO를 쓰면 모든 것이 메시지 일 필요는 없음.
    메시지 타입이 다양해 지면 처리하는 Func이 커짐.
    그대신 클라이언트에서 모든 이벤트 처리가능 (emit)
2. text 데이터 뿐 아니라 object 데이터를 보낼 수 있음. 
한번에 여러개 보낼수 있음.

3. 

# 
- socket.join([]) [socket.join(room)](https://socket.io/docs/v4/server-api/#socketjoinroom)
  room에 입장 가능
- socket.leave() [socket.leave(room)](https://socket.io/docs/v4/server-api/#socketleaveroom)
  room에서 떠나기
- socket.to() 방 전체에 메시지 보내기