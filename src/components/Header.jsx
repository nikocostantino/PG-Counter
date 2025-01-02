import { log } from '../log.js';
import logoImg from '../assets/pino.jpg';

export default function Header() {
  log('<Header /> rendered', 1);

  return (
    <header id="main-header">
      <img src={logoImg} alt="Magnifying glass analyzing a document" />
      <h1>Parrucchieria - Pino Girimonte</h1>
    </header>
  );
}
