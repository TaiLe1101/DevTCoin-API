import WebSocket from "ws";

let currentCandle = null; // Nến hiện tại
let candles = []; // Lịch sử các nến 1 phút

// Kết nối WebSocket tới Binance (thay @ticker bằng @trade để nhận dữ liệu liên tục hơn)
const binanceSocket = new WebSocket(
  "wss://fstream.binance.com/ws/btcusdt@trade"
);

export default (socket, io) => {
  binanceSocket.on("open", () => {
    console.log("[INFO] 👉 Connected to Binance Trade WebSocket");
  });

  binanceSocket.on("message", (data) => {
    const tradeData = JSON.parse(data);

    const price = parseFloat(tradeData.p); // Giá từ giao dịch (price)
    const volume = parseFloat(tradeData.q); // Khối lượng giao dịch (quantity)
    const currentTime = Math.floor(Date.now() / 1000); // Thời gian hiện tại (giây)
    const candleStartTime = Math.floor(currentTime / 60) * 60; // Thời gian bắt đầu của nến hiện tại

    // Nếu nến mới, lưu nến cũ và tạo nến mới
    if (!currentCandle || currentCandle.time !== candleStartTime) {
      if (currentCandle) {
        // Lưu nến cũ vào danh sách
        candles.push(currentCandle);
        io.emit("kline_update", currentCandle); // Gửi nến đã đóng đến frontend
      }

      // Khởi tạo nến mới
      currentCandle = {
        time: candleStartTime,
        open: price,
        high: price,
        low: price,
        close: price,
        volume: volume,
      };
    } else {
      // Cập nhật nến hiện tại
      const updatedCandle = {
        ...currentCandle,
        high: Math.max(currentCandle.high, price),
        low: Math.min(currentCandle.low, price),
        close: price,
        volume: currentCandle.volume + volume,
      };

      // Kiểm tra nếu nến có thay đổi (giảm tải dữ liệu gửi đi)
      if (
        updatedCandle.close !== currentCandle.close ||
        updatedCandle.high !== currentCandle.high ||
        updatedCandle.low !== currentCandle.low
      ) {
        currentCandle = updatedCandle;
        io.emit("current_candle_update", currentCandle); // Gửi nến hiện tại đến frontend
      }
    }
  });

  binanceSocket.on("error", (error) => {
    console.error("[ERROR] 👉 Binance WebSocket Error:", error);
  });

  binanceSocket.on("close", () => {
    console.log("[INFO] 👉 Binance WebSocket closed.");
  });

  // Lắng nghe yêu cầu từ client
  socket.on("get_kline_data", () => {
    console.log("[INFO] 👉 Client requested historical Kline data");
    socket.emit("historical_kline", candles); // Gửi lịch sử nến
  });
};
