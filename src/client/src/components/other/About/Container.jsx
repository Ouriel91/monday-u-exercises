import styles from'./Container.module.css';
import Info from './components/Info/Info'
import About from './components/About/About'
import Footer from './components/Footer/Footer'

function Container() {
  return (
    <div className={styles.container}>
      <Info />
      <About />
      <Footer />     
    </div>
  )
}

export default Container