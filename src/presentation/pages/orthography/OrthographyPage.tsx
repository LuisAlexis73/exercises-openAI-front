import { useState } from "react";
import {
  GptMessage,
  MyMessage,
  TextMessageBox,
  TypingLoader,
} from "../../components";

interface Messages {
  text: string;
  isGpt: boolean;
}

export const OrthographyPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Messages[]>([]);

  const handlePost = async (text: string) => {
    setIsLoading(true);

    setMessages((prev) => [...prev, { text: text, isGpt: false }]);

    setIsLoading(false);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid gird-cols-12 gap-y-2">
          <GptMessage text="Hola, puedes escribir tu texto en español, y te ayudo con las correcciones." />

          {messages.map((message, index) =>
            message.isGpt ? (
              <GptMessage key={index} text="Esto es Open AI" />
            ) : (
              <MyMessage key={index} text={message.text} />
            )
          )}

          {isLoading && <TypingLoader className="fade-in" />}
        </div>
      </div>

      <TextMessageBox
        onsubmitMessage={handlePost}
        placeholder="Escribe tu mensaje"
        disableCorrections
      />
    </div>
  );
};
