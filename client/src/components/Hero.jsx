function Hero({ setShowModalPlaning }) {

  
    function handleClick () {
    setShowModalPlaning(prev => !prev)
  }

  return ( 
    <section className="hero">
      <h1>Elektriker Jansson</h1>
      <p>Din pålitliga partner för alla elarbeten</p>
      <button className="button button--cta" onClick={handleClick}>BÖRJA DIN PLANERING</button>
    </section>
  );
}

export default Hero;