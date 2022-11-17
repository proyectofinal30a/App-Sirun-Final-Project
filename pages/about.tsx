import HEAD from "../src-client/components/HEAD";
import Nav from "../src-client/components/NavBar/Nav";
import Footer from "../src-client/components/Footer/Footer";
import About from "../src-client/components/About/About";


export default function AboutPage() {
  return (
    <div>
      <HEAD />
      <Nav />

      <main>
        <About />

      </main>

      <Footer />
    </div>
  );
}