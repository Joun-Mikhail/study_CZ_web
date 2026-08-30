import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function CorrectionsPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main id="main-content" className="max-w-2xl mx-auto px-4 pt-28 pb-16 text-center">
        <h1 className="text-2xl font-bold text-text-primary mb-4">Corrections</h1>
        <p className="text-text-secondary">
          University corrections are now submitted via email. Check your inbox at Study.Czechia1@gmail.com.
        </p>
      </main>
      <Footer />
    </div>
  );
}
