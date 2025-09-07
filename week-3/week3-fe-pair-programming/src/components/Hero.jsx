import styles from './Hero.module.css';

function Hero() {
  return (
    <section className={styles.hero} id="home">
      <div className={styles['hero-banner']}>
        <h1>backroads app</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae explicabo
          debitis est autem dicta.
        </p>
        <a href="#tours" className={`btn ${styles['hero-btn']}`}>
          explore tours
        </a>
      </div>
    </section>
  );
}

export default Hero;