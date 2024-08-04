export const prosConsStreamUseCases = async (prompt: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_GPT_API}/pros-cons-discusser-stream`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      }
    );

    if (!response.ok) throw new Error("No se pudo realizar comparacion");

    const reader = response.body?.getReader();

    if (!reader) {
      console.log("No se pudo realizar comparacion");
      return null;
    }

    return reader;

    // const decoder = new TextDecoder();
    // let text = "";

    // eslint-disable-next-line no-constant-condition
    // while (true) {
    //   const { done, value } = await reader.read();
    //   if (done) break;

    //   const decodedChunk = decoder.decode(value, { stream: true });

    //   text += decodedChunk;

    //   console.log(text);
    // }
  } catch (error) {
    console.log(error);

    return null;
  }
};
