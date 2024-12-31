import binanceTradeSocket from "./binanceTradeSocket";
import binanceTickerSocket from "./binanceTickerSocket";
import binanceKlineSocket from "./binanceKlineSocket";

const registerSocketHandlers = (io) => {
  io.on("connection", (socket) => {
    console.log(`[INFO] 👉 Client connected: ${socket.id}`);
    // Đăng ký các handler cho Binance
    binanceTradeSocket(socket, io);
    binanceTickerSocket(socket, io);
    binanceKlineSocket(socket, io);
    socket.on("disconnect", () => {
      console.log(`[INFO] 👉 Client disconnected: ${socket.id}`);
    });
  });
};

export default registerSocketHandlers;
