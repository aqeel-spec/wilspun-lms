"use client";
import "./globals.css";
import { Poppins } from "next/font/google";
import { Josefin_Sans } from "next/font/google";
import { ThemeProvider } from "./utils/theme-provider";
import { Toaster } from "react-hot-toast";
import { Providers } from "./Provider";
import { SessionProvider } from "next-auth/react";
// import CustomProvider from "./utils/CustomProvider";

import React, { FC, useEffect, Suspense } from "react";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Loader from "@/app/components/Loader/Loader";
import socketIO from "socket.io-client";
import Footer from "./components/Footer";
import Heading from "./utils/Heading";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Josefin",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${poppins.variable} ${josefin.variable} !bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300`}
      >
        <Providers>
          <SessionProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <CustomProvider>
                <Heading
                  title="ELearning"
                  description="ELearning is a platform for students to learn and get help from teachers"
                  keywords="Programming, MERN, Redux, Machine Learning"
                />
                {children}
                <Footer />
              </CustomProvider>
              <Toaster position="top-center" reverseOrder={false} />
            </ThemeProvider>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}

const CustomProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoading } = useLoadUserQuery({});

  useEffect(() => {
    socketId.on("connection", () => {});
  }, []);

  return (
    <div>
      {isLoading ? (
        <>
          <Loader />
        </>
      ) : (
        <div>{children} </div>
      )}
    </div>
  );
};
