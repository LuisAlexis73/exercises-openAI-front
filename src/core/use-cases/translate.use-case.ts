import { TranslateResponse } from "../../interfaces";

export const translateTextUseCase = async (prompt: string, lang: string) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_GPT_API}/translate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt, lang }),
    });

    if (!response.ok) throw new Error("No se puedo traducir el texto.");

    const { message } = (await response.json()) as TranslateResponse;

    return {
      ok: true,
      message: message,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      content: "No se puedo traducir el texto.",
    };
  }
};
