import styles from '../styles/Home.module.css'
import Header from './Components/header'
import Body from './Components/body'
import { useState } from 'react'

export default function Home() {
  const [mtzAmount, setMtzAmount] = useState(0.001)

  return (
    <div className={styles.container}>
      <Header setMtzAmount={setMtzAmount} mtzAmount={mtzAmount} />
      <Body setMtzAmount={setMtzAmount} mtzAmount={mtzAmount} />
    </div>
  )
}
