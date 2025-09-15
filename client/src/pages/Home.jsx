// ...existing code...
import { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import Articles from '../components/Articles';
import Services from '../components/Services';
import Cta from '../components/Cta';
import ModalPlaning from '../components/ModalPlaning';

const port = 3000;
const url = "http://localhost:";
const path = "/api/hello";

const unusedVariable = 42;

async function fetchData () {
  const response = await fetch(`${url}${port}${path}`);
  const data = await response.text();
  return data;
}

function Home() {
  const [data, setData] = useState(null);
  const [showModalPlaning, setShowModalPlaning] = useState(false);

  const getData = async () => {
    try {
      const result = await fetchData();
      setData(result);
    } catch (err) {
      console.error("Error fetching data:", err);
      setData("Failed to load data");
    }
  };

  useEffect(() => {
    getData();
    console.log("hej en gång!", unusedVariable)
  }, []);

  return (
    <>
      {data ? <p>{data}</p> : <p>Loading... {unusedVariable}</p> }
      <div className="hero-wrapper">

        <Hero
        setShowModalPlaning={setShowModalPlaning}
        />
      </div>

      <main>
        <section className="hero-livingroom" />

        <Articles />
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
