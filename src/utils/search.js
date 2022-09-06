import { client, parameters } from "./axios";
import toast from "react-hot-toast";

export const searchBooks = async (q, index) => {
  const { query, maxResults, startIndex, apiKey } = parameters;
  const url = `${query}${q}${maxResults}30${startIndex}${index}${apiKey}`;

  try {
    const { data } = await client.get(url);
    return data;
  } catch (e) {
    toast.error(
      `Code: ${e.response.data.error.code}
      Error:${e.response.data.error.message}`
    );
  }
};
