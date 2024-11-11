import localFont from "next/font/local";
import "./globals.css";

const Inter = localFont({
  src: "./fonts/Inter.ttf", 
  variable: "--font-inter",
  weight: "100 900",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${Inter.variable}`}>
        {children}
      </body>
    </html>
  );
}