import HeadComponent from "@components/head/head.component";
import Nav from "@components/nav/nav.component";
import Slider from "@components/slider/slider.component";
import HomeInfo from "./components/bodyHome/body.component.home";
import Footer from "@components/footer/footer.component";
import styles from "./style/home.module.css";

const HomeComponent = () => (
  <>
    <div className={styles.container}>
      <HeadComponent />
      <Nav />
      <main>
        <div className={styles.slider__container}>
          <Slider />
        </div>
        <HomeInfo />
        <Footer />
      </main>
    </div>
  </>
);

export default HomeComponent;
