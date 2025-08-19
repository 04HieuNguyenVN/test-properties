import { configureStore } from "@reduxjs/toolkit";
import chartReducer from "./chartSlice";

// ===== Khởi tạo Redux store cho toàn bộ ứng dụng =====
export const store = configureStore({
  reducer: {
    chart: chartReducer, // Reducer quản lý state cho chart
  },
});

// ===== Kiểu RootState và AppDispatch dùng cho hook =====
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
