import { useState } from "react";
import {
  GptMessage,
  MyMessage,
  TypingLoader,
  TextMessageBox,
} from "../../components";
import { prosConsUseCases } from "../../../core/use-cases";

interface Messages {
  text: string;
  isGpt: boolean;
}

export const ProsConsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Messages[]>([]);

  const handlePost = async (text: string) => {
    setIsLoading(true);

    setMessages((prev) => [...prev, { text: text, isGpt: false }]);

    const { ok, content } = await prosConsUseCases(text);

    setIsLoading(false);

    if (!ok) return;

    setMessages((prev) => [...prev, { text: content, isGpt: true }]);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid gird-cols-12 gap-y-2">
          <GptMessage text="Puedes escribir lo que deceas que compare y te de mis puntos de vista." />

          {messages.map((message, index) =>
            message.isGpt ? (
              <GptMessage key={index} text={message.text} />
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
