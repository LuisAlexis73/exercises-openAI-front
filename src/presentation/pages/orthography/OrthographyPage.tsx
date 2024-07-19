import { useState } from "react";
import {
  GptMessage,
  GptOrthographyMessage,
  MyMessage,
  TextMessageBox,
  TypingLoader,
} from "../../components";
import { orthographyUseCases } from "../../../core/use-cases";

interface Messages {
  text: string;
  isGpt: boolean;
  info?: {
    userScore: number;
    errors: string[];
    message: string;
  };
}

export const OrthographyPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Messages[]>([]);

  const handlePost = async (text: string) => {
    setIsLoading(true);

    setMessages((prev) => [...prev, { text: text, isGpt: false }]);

    const { ok, errors, message, userScore } = await orthographyUseCases(text);

    if (!ok) {
      setMessages((prev) => [
        ...prev,
        { text: "No se pudo realizar la corrección", isGpt: true },
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        {
          text: message,
          isGpt: true,
          info: {
            errors,
            userScore,
            message,
          },
        },
      ]);
    }

    setIsLoading(false);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid gird-cols-12 gap-y-2">
          <GptMessage text="Hola, puedes escribir tu texto en español, y te ayudo con las correcciones." />

          {messages.map((message, index) =>
            message.isGpt ? (
              <GptOrthographyMessage key={index} {...message.info!} />
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
