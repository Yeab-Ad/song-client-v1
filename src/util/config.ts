const isProduction = process.env.NODE_ENV === "production";
const API_BASE_URL = isProduction
  ? "https://song-api-v1.vercel.app/api"
  : "http://localhost:8034/api";

export default API_BASE_URL;
