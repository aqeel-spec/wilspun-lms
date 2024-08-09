'use client';
import "./globals.css";
import { Poppins, Josefin_Sans } from "next/font/google";
import { ThemeProvider } from "./utils/theme-provider";
import { Toaster } from "react-hot-toast";
import { Providers } from "./Provider";
import { SessionProvider } from "next-auth/react";
import dynamic from "next/dynamic";
import React, { useEffect, Suspense } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import socketIO from "socket.io-client";
import MainLayout from "./utils/MainLayout";
import AdminLayout from "./utils/AdminLayout";
import { useAppDispatch } from "@/redux/features/reduxHooks";
import { setRoute, setOpen } from "@/redux/features/globalSlice";

// Dynamic import for Loader
const Loader = dynamic(() => import("@/app/components/Loader/Loader"), {
  ssr: false,
});

// Font imports
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

// Socket endpoint
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname ? pathname.startsWith("/admin") : false;

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${poppins.variable} ${josefin.variable} bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300`}
      >
        <Providers>
          <SessionProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Suspense fallback={<Loader />}>
                <CustomProvider>
                  {isAdminRoute ? (
                    <AdminLayout>{children}</AdminLayout>
                  ) : (
                    <MainLayout>{children}</MainLayout>
                  )}
                </CustomProvider>
              </Suspense>
              <Toaster position="top-center" reverseOrder={false} />
            </ThemeProvider>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}

const CustomProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { data, isLoading, error } = useLoadUserQuery(undefined, {});

  useEffect(() => {
    socketId.on("connection", () => {});
  }, []);

  // Handle session errors or missing user data
  useEffect(() => {
    if (!data && error) {
      dispatch(setRoute("Login"));
      dispatch(setOpen(true));
      router.push("/");
    }
  }, [data, error, dispatch, router]);

  return (
    <div>{isLoading ? <Loader /> : children}</div>
  );
};
