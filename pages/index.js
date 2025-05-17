import Login from "@/components/Login";
import LoginLayout from "@/layouts/LoginLayout";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <LoginLayout>
      <div className={`${geistSans.variable} ${geistMono.variable}`}>
        <Login
          onSubmit={(data) => {
            // handle login
            console.log(data);
          }}
        />
      </div>
    </LoginLayout>
  );
}
