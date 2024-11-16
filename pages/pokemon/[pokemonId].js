import Image from "next/image"
import styles from "../../styles/Pokemon.module.css"

export const getStaticPaths = async () => {
  const maxPokemons = 20
  const api = "https://pokeapi.co/api/v2/pokemon/"
  const res = await fetch(`${api}/?limit=${maxPokemons}`)
  const data = await res.json()

  const paths = data.results.map((pokemon, index) => {
    return {
      params: { pokemonId: (index + 1).toString() }
    }
  })

  return {
    paths,
    fallback: false
  }
}

// mapeamento 1 a 1
export const getStaticProps = async (context) => {
  const id = context.params.pokemonId
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  const data = await res.json()
  return {
    props: {
      pokemon: data
    }
  }

}

export default function Pokemon({ pokemon }) {
  let str = ''

  if (pokemon.id < 10) {
    str = `00${pokemon.id}`
  } else if (pokemon.id >= 10 && pokemon.id < 100) {
    str = `0${pokemon.id}`
  } else {
    str = `${pokemon.id}`
  }

  return (
    <div className={styles.pokemon_container}>
      <h1 className={styles.title}>{pokemon.name}</h1>
      <Image
        src={`/images/thumbs/${str}.png`}
        width="200"
        height="200"
        alt={`${pokemon.name}`}
      />
      <div>
        <h3>Número: </h3>
        <p>#{pokemon.id}</p>
      </div>

      <div className={styles.types_container}>
        <h3>Tipo:</h3>
        <div>
          {
            pokemon.types.map((item, index) => {
              return (
                <span key={index} className={`${styles.type} ${styles['type_'+ item.type.name]}`}>#{item.type.name}</span>
              )
            })
          }
        </div>
      </div>
      <div className={styles.data_container}>
        <div className={styles.data_height}>
          <h4>Altura:</h4>
          <p>{pokemon.height *10} cm</p>
        </div>
        <div className={styles.data_weight}>
          <h4>Peso:</h4>
          <p>{pokemon.weight / 10} kg</p>
        </div>
      </div>
    </div>
  )
}