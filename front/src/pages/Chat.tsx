/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { Input, Button, Menu, Dropdown, message } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import "./styles.scss";
import { ChatMessageProps } from "../components/ChatMessage";

export default function ChatRoom() {
  const [messageText, setMessageText] = useState("");

  const [messages, setMessages] = useState<Array<ChatMessageProps>>([]);
  const dummy = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3000");
    const heartbeat = () => {
      if (!socket) return;
      if (socket.readyState !== 1) return;
      socket.send(JSON.stringify({ ping: "Pong" }));
      setTimeout(heartbeat, 10000);
    };

    socket.onopen = function () {
      heartbeat();
      message.success("Seu chat está conectado! ✅");
    };
    const listener = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      // TODO addNewMessage

      /**
       *
       * É hora de sintonizar os eventos no WebSocket!
       * Implemente uma lógica de listener para capturar os eventos enviados pelo backend,
       * adicionando as mensagens ao chat em tempo real. Essa implementação garantirá uma
       * experiência dinâmica e instantânea, permitindo que as mensagens sejam exibidas no
       * chat assim que forem recebidas do backend.
       *
       */
      console.log(data);
    };

    socket.addEventListener("message", listener);
    socket.onclose = function () {
      message.success("Erro ao conectar (onclose)");
    };
    socket.onerror = function () {
      message.success("Erro ao conectar (onerror)");
    };

    return () => {
      socket?.close();
    };
  }, []);

  useEffect(() => {
    if (dummy.current) {
      dummy.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleMessageOnChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();

    setMessageText(event.target.value);
  };

  const handleCreateMessage = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (messageText && dummy.current) {
      // TODO sendMessage
      /**
       * 
        Desenvolva a lógica de envio da nova mensagem para o backend. 
        Essa implementação garantirá que as mensagens enviadas sejam processadas de forma eficiente, 
        permitindo uma comunicação contínua e confiável entre o frontend e o backend.
       */

      setMessageText("");

      dummy.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={() => {}}>
        Edit group name
      </Menu.Item>
      <Menu.Item key="2" onClick={() => {}}>
        Change group icon
      </Menu.Item>
      <Menu.Item key="4" onClick={() => {}}>
        Exit group
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <div className="chat-container">
        <div className="chat-container__background">
          <header style={{ display: "flex", justifyContent: "space-between" }}>
            <div className="image">Fake</div>
            <Dropdown.Button
              style={{ width: 50 }}
              overlay={menu}
              icon={<MoreOutlined style={{ fontSize: "1.65rem" }} />}
            />
          </header>
          <main>
            <div>
              {/* TODO

             Desenvolva a lógica para utilizar o componente de balão de mensagem {ChatMessage}. 
             Este componente já foi inicializado e está localizado na pasta "components". 
             Ao implementar essa lógica, você permitirá a exibição eficiente e estilizada das mensagens no chat, 
             agregando uma camada visual atraente à interação do usuário.
             
             */}

              <div ref={dummy} />
            </div>
          </main>
          <footer>
            <form onSubmit={(e) => e.preventDefault()}>
              <Input
                type="text"
                value={messageText}
                placeholder="Type a message"
                onChange={handleMessageOnChange}
              />
              <Button onClick={handleCreateMessage}>Send message</Button>
            </form>
          </footer>
        </div>
      </div>
    </>
  );
}
