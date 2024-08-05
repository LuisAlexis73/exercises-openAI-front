import { useState } from "react";
import {
  GptMessage,
  MyMessage,
  TypingLoader,
  TextMessageBoxFile,
} from "../../components";
import { audioToTextUseCase } from "../../../core/use-cases";

interface Messages {
  text: string;
  isGpt: boolean;
}

export const AudioToTextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Messages[]>([]);

  const handlePost = async (text: string, audioFile: File) => {
    setIsLoading(true);

    setMessages((prev) => [...prev, { text: text, isGpt: false }]);

    const response = await audioToTextUseCase(audioFile, text);
    setIsLoading(false);

    if (!response) return;

    const gptMessage = `## Transcripción:
      __Duración:__${Math.round(response.duration)} segundos.
      ## El texto es:
      ${response.text}
    `;

    setMessages((prev) => [...prev, { text: gptMessage, isGpt: true }]);

    for (const segment of response.segments) {
      const segmentMessage = `__De ${Math.round(segment.start)} a ${Math.round(
        segment.end
      )} segundos:__
      ${segment.text}`;
      setMessages((prev) => [...prev, { text: segmentMessage, isGpt: true }]);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid gird-cols-12 gap-y-2">
          <GptMessage text="Hola, ¿Que audio quieres generar hoy?" />

          {messages.map((message, index) =>
            message.isGpt ? (
              <GptMessage key={index} text={message.text} />
            ) : (
              <MyMessage
                key={index}
                text={
                  message.text === "" ? "Transcribe el audio" : message.text
                }
              />
            )
          )}

          {isLoading && <TypingLoader className="fade-in" />}
        </div>
      </div>

      <TextMessageBoxFile
        onsubmitMessage={handlePost}
        placeholder="Escribe tu mensaje"
        disableCorrections
        acceptFile="audio/*"
      />
    </div>
  );
};
