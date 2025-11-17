import { Footer } from "./_components/footer/indext";
import { Header } from "./_components/header";
import { Hero } from "./_components/hero";
import Professionals from "./_components/professionals.tsx";

export default function Home() {
  return (
    
    <main className="flex flex-col min-h-screen">
      <Header />
      <div>
        <Hero />

         <Professionals />
         <Footer />
      </div>

     
      
    </main>
  );
}
