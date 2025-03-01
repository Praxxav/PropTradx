
import FeaturesSection from "@/components/feature";
import Intro from "@/components/intro";
import{ EvaluationChallenge } from "@/components/evaluation_challenge"; 
import PaymentOptions from "@/components/payment";
import Pricing from "@/components/pricing";
import { FAQSection } from "@/components/faq";
import AboutUs from "@/components/About";
import Footer from "@/components/Footer";

export default function Home() {
  return (
   <div>
   <main className="flex flex-col items-center">
    
      <Intro />
      <EvaluationChallenge />  
      <FeaturesSection />
      <PaymentOptions />
      <Pricing />
      <FAQSection />
      <AboutUs />
      <Footer />
      
    </main>
   </div>
  );
}
