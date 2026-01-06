"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: "#fff",
          color: "#334155",
          borderRadius: "16px",
          padding: "16px",
          boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
          fontWeight: "600",
        },
      }}
    />
  );
}
