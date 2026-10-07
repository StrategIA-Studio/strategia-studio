import LenisProvider from "@/components/LenisProvider";
import Navbar from "@/components/Navbar";
import PaolanaCalcio from "@/components/PaolanaCalcio";

export const metadata = {
  title: "StrategIA — Paolana Calcio",
};

export default function PaolanaCalcioPage() {
  return (
    <LenisProvider>
      <Navbar />
      <PaolanaCalcio />
    </LenisProvider>
  );
}
