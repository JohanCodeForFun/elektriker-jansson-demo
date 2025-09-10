const articlesData = [
  {
    id: 1,
    imgSrc: "../images/emmanuel-light-card-mobile.png",
    alt: "Emmanuel light card",
    title: "Varför anlita Elektriker Jansson",
    paragraphs: [
      "På Elektriker Jansson erbjuder vi högkvalitativa elarbeten med fokus på säkerhet, tillförlitlighet och kundnöjdhet."
    ],
    cta: { href: "#", text: "Upptäck våra tjänster" },
    className: ""
  },
  {
    id: 2,
    imgSrc: "../images/david-cain-installation-mobile.png",
    alt: "David Cain installation",
    title: "Vårt team är certifierade och dedikerade elektriker",
    paragraphs: [
      "Vårt team av certifierade elektriker är dedikerade till att leverera förstklassigt hantverk för både bostäder och kommersiella projekt."
    ],
    cta: { href: "#", text: "Lär känna vårt team" },
    className: ""
  },
  {
    id: 3,
    imgSrc: null,
    alt: "",
    title: "Även rådgivare",
    paragraphs: [
      "På Elektriker Jansson är vi inte bara elektriker, vi är också rådgivare och partners för våra kunder.",
      "Vi tar oss tid att förstå dina specifika behov och erbjuder skräddarsydda lösningar som passar just dig."
    ],
    cta: null,
    className: "full-width"
  }
];

function Articles() {
  return (
    <>
      {articlesData.map((a) => (
        <article key={a.id} className={a.className || undefined}>
          {a.imgSrc ? <img src={a.imgSrc} alt={a.alt} width="100%" /> : null}
          <h2>{a.title}</h2>
          {a.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          {a.cta ? (
            <a className="button" href={a.cta.href}>
              {a.cta.text}
            </a>
          ) : null}
        </article>
      ))}
    </>
  );
};

export default Articles;
