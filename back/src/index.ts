import express, { Request, Response } from "express";
import * as http from "http";
import * as WebSocket from "ws";
import cors from "cors";

const app = express();
export const server = http.createServer(app);
export const wss = new WebSocket.Server({ server });

const broadcast = (msg: any) => {
  wss.clients.forEach((client) => {
    client.send(JSON.stringify(msg));
  });
};

wss.on("connection", (ws) => {
  const heartbeat = () => {
    if (!ws) return;
    if (ws.readyState !== 1) return;
    ws.send(
      JSON.stringify({
        type: "heartbeat",
        msg: true,
      })
    );
    setTimeout(heartbeat, 20000);
  };
  heartbeat();
});

app.use(cors({ origin: "*" }));
app.use(express.json());

interface ChatMessageProps {
  text: string;
  fromMe: boolean;
  senderName: string;
  createdAt?: Date;
}

const messages: ChatMessageProps[] = [
  { fromMe: true, senderName: "Eu", text: "Olá!", createdAt: new Date() },
];

app.get("/message", (_: Request, res: Response) => {
  // TODO 
  /**
   * Desenvolva uma lógica eficiente para listar as mensagens contidas no array, 
   * assegurando uma apresentação organizada e acessível aos usuários. 
   * Essa implementação proporcionará uma experiência de visualização clara e 
   * facilitará a interação com as mensagens disponíveis.
   */
  return res.json('mensagens');
});

app.post("/message", (req: Request, res: Response) => {
  const body = req.body;
  
  
  // TODO AddMessage 
  /**
Desenvolva uma lógica robusta para a inclusão de novas mensagens no array existente e 
implemente um sistema de broadcast utilizando o websocket. Isso garantirá a eficácia na gestão das mensagens, 
proporcionando uma experiência de chat dinâmica e em tempo real para todos os usuários envolvidos.

As mensagens devem agora incluir a data de criação, 
a ser adicionada no backend. Dessa forma, 
teremos um registro preciso do momento exato em que cada mensagem foi adicionada ao array. 
Essa medida aprimora a rastreabilidade e fornece informações temporais valiosas para cada mensagem no sistema.
   */

  return res.json(body);
});

app.all("*", (req: Request, res: Response) =>
  res.status(404).json({ error: "URL not found" })
);

server.listen(3000, async () => {
  console.log(`Server started on port 3000 :)`);
});
