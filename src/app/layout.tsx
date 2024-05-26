'use client'

import "./globals.css";
import { fontClasses, roboto } from "./components/fonts";
import { Providers } from "./providers";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="es">
      <body className={`${roboto.className} antialiased bg-slate-50`}>
        <Providers>
          <ToastContainer />
          {children}
        </Providers>
      </body>
    </html>
  );
}
