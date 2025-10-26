const collaborationData = [
  {
    id: 1,
    title: "Behöver du hjälp med Bokföring?",
    alt: "Bild på bokföring från Unsplash. Fotograf, kelly Sikkema.",
    imgSrc: "../images/kelly-sikkema-M98NRBuzbpc-unsplash.png",
    paragraphs: [
      "Elektriker Jansson samarbetar med Anna jönsson som har många års erfarnhet av bokföring för små och medelstora företag.",
    ],
    cta: { href: "#", text: "Kontakta Anna för hjälp med bokföring" },
    className: "collaboration",
  },
  {
    id: 2,
    title: "Fika levererat till kontoret?",
    alt: "Bild på fika från Unsplash. Fotograf, Oscar Nord.",
    imgSrc: "../images/oscar-nord-zOliwDYxxDg-unsplash.png",
    paragraphs: [
      "Elektriker Jansson samarbetar med Bageri Rosenlund som varje vecka levererar nybakat fika till våra medarbetare och kunder.",
    ],
    cta: { href: "#", text: "Beställ din fikaleverans här" },
    className: "collaboration",
  },
  {
    id: 3,
    title: "Fruktkorgar för en piggare arbetsdag",
    alt: "Bild på fruktorg från Unsplash. Fotograf, Nataliya Melnychuk.",
    imgSrc: "../images/nataliya-melnychuk-B03lGNvTxGs-unsplash.png",
    paragraphs: [
      "Vi samarbetar med Fruktkompaniet som levererar fräscha fruktkorgar direkt till kontoret för att hålla energinivån på topp.",
    ],
    cta: { href: "#", text: "Kontakta Fruktkompaniet för offert" },
    className: "collaboration",
  },
];

import { useState } from "react";

function Collaboration() {
  // Pick one random collaboration entry when component mounts.
  const [entry] = useState(() => {
    const idx = Math.floor(Math.random() * collaborationData.length);
    return collaborationData[idx];
  });

  return (
    <article className={entry.className || undefined}>
      <h2>{entry.title}</h2>
      {entry.imgSrc ? (
        <img
          src={entry.imgSrc}
          /* fallback alt text if none provided */
          alt={entry.alt || entry.title}
          width="100%"
        />
      ) : null}
      {entry.paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
      {entry.cta ? (
        <button
          className="button"
          onClick={() => alert(`Du hänvisas till ${entry.title}...`)}
        >
          {entry.cta.text}
        </button>
      ) : null}
    </article>
  );
}

export default Collaboration;
