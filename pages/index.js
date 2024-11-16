import styles from "@/styles/Home.module.css";
import Image from "next/image";
import Card from "./components/Card"


// essa funcção precisa ser ciada dessa forma pois o next usa pra pre renderizar os dados (pre rendering)
export async function getStaticProps() {
  const maxPokemons = 20
  const api = "https://pokeapi.co/api/v2/pokemon/"
  const res = await fetch(`${api}/?limit=${maxPokemons}`)
  const data = await res.json()

  // add pokemon index
  data.results.forEach((item, index) => {
    item.id = index + 1
  });

  return {
    props: {
      pokemons: data.results
    }
  }
}

export default function Home({ pokemons }) {
  console.log(pokemons)
  return (
    <>
      <div className={styles.title_container}>
        <h1 className={styles.title}>Poke<span>Next</span></h1>
        <Image
          src="/images/pokeball.png"
          width="50"
          height="50"
          alt="PokeNext"
        />
      </div>
      <div className={styles.pokemon_container}>
        {
          pokemons.map((pokemon) => {
            return (
              <Card key={pokemon.id} pokemon={pokemon}/>
            )
          })
        }
      </div>
    </>
  );
}
