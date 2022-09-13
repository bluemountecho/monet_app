import styles from '../../styles/Home.module.css'
import Product from './product'
import { useState } from 'react'

export default function Body(props) {
  const {mtzAmount, setMtzAmount} = props
  const [products, setProducts] = useState([
    { title: 'Parallell News', description: 'News from a parallel universe!', business: 'Chainlink Productions', mtz: 1500, clicks: 1000, mlink: 1, metrics: [
      1000
    ], image: '/images/product/ParallellNews.PNG'},
    { title: 'Pepe’s *NEW* Punisher Pizza', description: 'Done in 30, or it’s free!', business: 'Pepe the Frog International', mtz: 55000, clicks: 10000, mlink: 2, metrics: [
      6000, 4000
    ], image: '/images/product/pepepizza.jpg'},
    { title: 'Gamma Squeeze Ape Figurine', description: 'Buy and Hodl this new ape! Comes with a free NFT!', business: 'Gamestonk', mtz: 142000, clicks: 20000, mlink: 5, metrics: [
      7000, 12000, 1000
    ], image: '/images/product/GammaSqueezeApe.jpg'},
    { title: 'Digitorium: by Michael Persin', description: 'Computer hacker Luke Philmore falls into a coma after being disconnected from his advanced neuro computer. To return to his body, he makes a deal with an “AI devil” who wishes to be free from Area 51. Accepting the deal, Luke is blessed by HAALON with superpowers! Will he use them responsibly? Coming soon!', business: 'Chainlink Productions', mtz: 333333, clicks: 100000, mlink: 8, metrics: [
      50000, 15000, 10000, 25000
    ], image: '/images/product/Digitorium.jpg'},
    { title: 'Beans for Memes Charity', description: 'Food drive for the mentally challenged.', business: 'Beaners for Memers 501c3', mtz: 333333, clicks: 200000, mlink: 3, metrics: [
      50000, 50000, 100000
    ], image: '/images/product/BeansForMemes.jpg'},
  ])

  return (
    <div className={styles.body}>
      {products.map((value, key) => {
        return <Product {...value} mtzAmount={mtzAmount} products={products} setProducts={setProducts} />
      })}
    </div>
  )
}
