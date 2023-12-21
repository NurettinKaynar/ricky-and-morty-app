"use client"
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Ricky And Morty",
  description: "Developed by Nurettin",
};
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
      <body className={inter.className}>{children}</body>
    </html>
    </Provider>
  );
}
