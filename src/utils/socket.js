import { io } from "socket.io-client";
import { BASE_URL } from "./constants";

export const createSocketConnection = () => {
  if (location.hostname === "localhost") {
    return io(BASE_URL);
  } else {
    return io("https://devtinderbackend-67oz.onrender.com", { path: "/socket.io" });
  }
};
