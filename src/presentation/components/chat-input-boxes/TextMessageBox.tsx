import { FormEvent, useState } from "react";

interface Props {
  onsubmitMessage: (message: string) => void;
  placeholder?: string;
  disableCorrections?: boolean;
}

export const TextMessageBox = ({
  onsubmitMessage,
  placeholder,
  disableCorrections = false,
}: Props) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (message.trim().length === 0) return;

    onsubmitMessage(message);
    setMessage("");
  };

  return (
    <form
      onSubmit={handleSendMessage}
      className="flex items-center h-16 rounded-xl bg-white w-full px-4"
    >
      <div className="flex-grow">
        <div className="relative w-full">
          <input
            type="text"
            autoFocus
            name="message"
            placeholder={placeholder}
            className="flex w-full border rounded-xl text-gray-800 focus:border-indigo-300 pl-4 h-10"
            autoComplete={disableCorrections ? "on" : "off"}
            autoCorrect={disableCorrections ? "on" : "off"}
            spellCheck={disableCorrections ? "true" : "false"}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      </div>

      <div className="ml-4">
        <button className="btn-primary">
          <span className="mr-2">Enviar</span>
          <i className="fa-regular fa-paper-plane"></i>
        </button>
      </div>
    </form>
  );
};
