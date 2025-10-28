// ...existing code...
import { useState } from "react";
import Hero from "../components/Hero";
import Articles from "../components/Articles";
import Services from "../components/Services";
import Cta from "../components/Cta";
import ModalPlaning from "../components/ModalPlaning";
import LikeCompany from "../components/LikeCompany";

const apiKey = "sk_test_51HcR..."; // 🚨 Secret in code

console.log(apiKey);

function Home() {
  const [showModalPlaning, setShowModalPlaning] = useState(false);

  return (
    <>
      <div className="hero-wrapper">
        <Hero setShowModalPlaning={setShowModalPlaning} />
      </div>

      <div id="hero-end-sentinel" aria-hidden="true"></div>

      <main>
        <section className="hero-livingroom" />

        <Articles />
        <LikeCompany />
        <Services />
        <Cta />
      </main>

      <ModalPlaning
        showModalPlaning={showModalPlaning}
        setShowModalPlaning={setShowModalPlaning}
      />
    </>
  );
}

export default Home;
