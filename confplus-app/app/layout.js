import "./globals.css";
import { Inter } from "next/font/google";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ConfPlus",
  description: "Pro app for conferences",
};

export default function RootLayout({children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col h-screen w-screen items-center justify-between`}>
        {children}
      </body>
    </html>
  );
}

