import { FormEvent, useRef, useState } from "react";

interface Props {
  onsubmitMessage: (message: string) => void;
  placeholder?: string;
  disableCorrections?: boolean;
  acceptFile?: string;
}

export const TextMessageBoxFile = ({
  onsubmitMessage,
  placeholder,
  disableCorrections = false,
  acceptFile,
}: Props) => {
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>();
  const inputFileRef = useRef<HTMLInputElement>(null);

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
      <div className="mr-3">
        <button
          type="button"
          className="flex items-center text-gray-400 hover:text-gray-600"
          onClick={() => inputFileRef.current?.click()}
        >
          <i className="fa-solid fa-paperclip text-xl"></i>
        </button>

        <input
          type="file"
          ref={inputFileRef}
          accept={acceptFile}
          onChange={(e) => setSelectedFile(e.target.files?.item(0))}
          hidden
        />
      </div>
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
        <button className="btn-primary" disabled={!selectedFile}>
          {!selectedFile ? (
            <span className="mr-2">Enviar</span>
          ) : (
            <span className="mr-2">
              {selectedFile.name.substring(0, 10) + "..."}
            </span>
          )}

          <i className="fa-regular fa-paper-plane"></i>
        </button>
      </div>
    </form>
  );
};
