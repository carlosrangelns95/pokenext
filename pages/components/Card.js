import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/Card.module.css"

export default function ({ pokemon }) {
  let str = ''

  if (pokemon.id < 10) {
    str = `00${pokemon.id}`
  } else if (pokemon.id >= 10 && pokemon.id < 100) {
    str = `0${pokemon.id}`
  } else {
    str = `${pokemon.id}`
  }

  return (
    <div className={styles.card}>
      <Image
        src={`/images/thumbs/${str}.png`} //001
        width="120"
        height="120"
      />
      <p>#{pokemon.id}</p>
      <h3 className={styles.title}>{pokemon.name}</h3>
      <Link legacyBehavior href={`/pokemon/${pokemon.id}`}>
        <a className={styles.btn}>Detalhes</a>
      </Link>
    </div>
  )
}