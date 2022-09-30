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
const port = 8000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});

io.on('connection', (socket: Socket) => {
  console.log('接続されました');

  socket.on('shareFusenRequest', ({ data }) => {
    console.log('welcome...')
    console.log(data)
    const hogehoge = '73234d0d-aa0d-4f8f-862f-e10201320064'
    io.emit('shareFusen', data)
  })

  socket.on('disconnect', () => {
    console.log('切断されました');
  });
});