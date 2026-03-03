import { Routes, Route } from 'react-router-dom';
import { Header } from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";

// Импортируем страницы
import { HomePage } from "./pages/HomePage/HomePage";
import { CatalogPage } from "./pages/CatalogPage/CatalogPage";
import { GalleryPage } from "./pages/GalleryPage/GalleryPage";
import { AboutPage } from "./pages/AboutPage/AboutPage";
import { ContactsPage } from "./pages/ContactsPage/ContactsPage";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";

import "modern-normalize/modern-normalize.css";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      
      <main>
        <Routes>
          {/* Главная страница */}
          <Route path="/" element={<HomePage />} />
          
          {/* Основные разделы */}
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          
          {/* 404 - все неизвестные пути */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      
      <Footer />
    </>
  );
}

export default App;