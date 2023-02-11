** SOCKET IO CHEATSHEET **
   send to current request socket client
  socket.emit('message', "this is a test"); Hasn't changed

   sending to all clients, include sender
  io.sockets.emit('message', "this is a test");  Old way, still compatible
  io.emit('message', 'this is a test'); New way, works only in 1.x

   sending to all clients except sender
  socket.broadcast.emit('message', "this is a test"); Hasn't changed

   sending to all clients in 'game' room(channel) except sender
  socket.broadcast.to('game').emit('message', 'nice game'); Hasn't changed

   sending to all clients in 'game' room(channel), include sender
  io.sockets.in('game').emit('message', 'cool game'); Old way, DOES NOT WORK ANYMORE
  io.in('game').emit('message', 'cool game'); New way
  io.to('game').emit('message', 'cool game'); New way, "in" or "to" are the exact same: "And then simply use to or in (they are the same) when broadcasting or emitting:" from http:socket.io/docs/rooms-and-namespaces/

   sending to individual socketid, socketid is like a room
  io.sockets.socket(socketid).emit('message', 'for your eyes only'); Old way, DOES NOT WORK ANYMORE
  socket.broadcast.to(socketid).emit('message', 'for your eyes only'); New way