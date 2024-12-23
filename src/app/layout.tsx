/* eslint-disable @next/next/no-page-custom-font */
import "./globals.css";
import { MxStateProvider } from "./context/mxState";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
    <head>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" />
    </head>
      <MxStateProvider>
        <body>
          {children}
        </body>
      </MxStateProvider>
    </html>
  );
}
