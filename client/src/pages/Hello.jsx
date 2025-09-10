import { useParams } from "react-router";

function Hello() {
  let { name } = useParams();

  return ( <h1>Hej på dig, {name} :)</h1> );
}

export default Hello;