import WebSocket from "ws";

// Định nghĩa các cặp cần theo dõi
const pairs = ["btcusdt", "ethusdt", "bnbusdt", "xrpusdt", "solusdt"];
const streams = pairs.map((pair) => `${pair}@ticker`).join("/");

// Kết nối WebSocket tới Binance
const binanceSocket = new WebSocket(
  `wss://stream.binance.com:9443/ws/${streams}`
);

export default (socket, io) => {
  // Kết nối đến Binance WebSocket
  binanceSocket.on("open", () => {
    console.log("[INFO] 👉 Connected to Binance Get Ticker Data WebSocket");
  });

  binanceSocket.on("message", (data) => {
    const tickerData = JSON.parse(data);
    // console.log("[INFO] 👉 Binance Trade Update:", tickerData);

    // Gửi dữ liệu đến client qua Socket.IO
    io.emit("ticker_update", tickerData);
  });

  binanceSocket.on("error", (error) => {
    console.error("[ERROR] 👉 Binance WebSocket Error:", error);
  });

  binanceSocket.on("close", () => {
    console.log("[INFO] 👉 Binance WebSocket closed.");
  });

  // // Lắng nghe các sự kiện từ client
  // socket.on("get_ticker_data", () => {
  //   console.log("[INFO] 👉 Client requested Binance data");
  // });
};
