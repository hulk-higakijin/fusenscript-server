import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { Socket } from "socket.io";

dotenv.config();

const app: Express = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: { origin: "*" }
});
const PORT = process.env.PORT || 8000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});

io.on('connection', (socket: Socket) => {
  console.log('接続されました');

  socket.on('shareFusenRequest', ({ data }) => {
    io.emit('shareFusen', data )
  })

  socket.on('deleteFusenRequest', ({ data}) => {
    io.emit('deleteFusen', data )
  })

  socket.on('shareKanbanRequest', ({ data }) => {
    io.emit('shareKanban', data )
  })

  socket.on('deleteKanbanRequest', ({ data })=> {
    io.emit('deleteKanban', data)
  })

  socket.on('disconnect', () => {
    console.log('切断されました');
  });
});