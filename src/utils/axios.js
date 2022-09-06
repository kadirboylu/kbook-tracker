import axios from "axios";

export const baseURL = "https://www.googleapis.com/books/v1";

export const client = axios.create({ baseURL });

export const parameters = {
  query: "/volumes?q=",
  maxResults: "&maxResults=",
  startIndex: "&startIndex=",
  langRestrict: "&langRestrict=en",
  apiKey: `&apiKey=${import.meta.env.VITE_BOOKS_API_KEY}`,
};
