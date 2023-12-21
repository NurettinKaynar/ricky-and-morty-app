"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "./core/redux/store/store";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <html lang="en">
        <head>
          <title>Ricky And Morty App</title>
        </head>
        <body className={inter.className}>{children}</body>
      </html>
    </Provider>
  );
}
