import WebSocket from "ws";

const binanceSocket = new WebSocket(
  "wss://stream.binance.com:9443/ws/btcusdt@trade"
);

export default (socket, io) => {
  // Kết nối đến Binance WebSocket
  binanceSocket.on("open", () => {
    console.log("[INFO] 👉 Connected to Binance Get Trade Data WebSocket");
  });

  binanceSocket.on("message", (data) => {
    const tradeData = JSON.parse(data);
    // console.log("[INFO] 👉 Binance Trade Update:", tradeData);

    // Gửi dữ liệu đến client qua Socket.IO
    io.emit("trade_update", tradeData);
  });

  binanceSocket.on("error", (error) => {
    console.error("[ERROR] 👉 Binance WebSocket Error:", error);
  });

  binanceSocket.on("close", () => {
    console.log("[INFO] 👉 Binance WebSocket closed.");
  });

  // // Lắng nghe các sự kiện từ client
  // socket.on("get_binance_data", () => {
  //   console.log("[INFO] 👉 Client requested Binance data");
  // });
};
