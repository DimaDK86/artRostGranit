import "modern-normalize/modern-normalize.css"; // <-- Добавить сверху
import { HomePage } from "./pages/HomePage/HomePage";
import "./App.css";
import { Header } from "./components/layout/Header/Header";

function App() {
  return (
    <>
      <Header />
      <HomePage />
    </>
  )
}

export default App;
