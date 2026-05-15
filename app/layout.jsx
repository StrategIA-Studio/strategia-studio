import { Barlow } from "next/font/google";
import "./globals.css";
import CalendlyButton from "@/components/CalendlyButton";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "900"],
  variable: "--font-barlow",
  display: "swap",
});

export const metadata = {
  title: "StrategIA — Think Vertical",
  description:
    "Strategia, comunicazione e intelligenza artificiale dentro un sistema operativo completo per le PMI italiane.",
  keywords: "strategia comunicazione, marketing PMI, intelligenza artificiale, consulenza strategica Cosenza",
};

export default function RootLayout({ children }) {
  return (
    <html lang="it" className={barlow.variable}>
      <body>
        {children}
        <CalendlyButton />
      </body>
    </html>
  );
}
