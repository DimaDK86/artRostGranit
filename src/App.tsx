// src/App.tsx
import { lazy, Suspense, useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Header } from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import Loader from "@/components/ui/Loader/loader";
import { HomePage } from "./pages/HomePage/HomePage";

const CatalogPage = lazy(() => import("./pages/CatalogPage/CatalogPage"));
const GalleryPage = lazy(() => import("./pages/GalleryPage/GalleryPage"));
const AboutPage = lazy(() => import("./pages/AboutPage/AboutPage"));
const ContactsPage = lazy(() => import("./pages/ContactsPage/ContactsPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));
const ProductPage = lazy(() => import("@/pages/ProductPage/ProductPage"));
const Cart = lazy(() => import("@/pages/Cart/Cart"));

import "modern-normalize/modern-normalize.css";
import "./App.css";

// 🧩 Компонент-обёртка с лоадером при переходе
const PageLoader = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  // 👇 Начинаем с true, чтобы сразу показывать лоадер
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // При смене пути показываем лоадер
    setIsLoading(true);

    // Даже если всё загрузилось быстро, показываем лоадер минимум 400мс
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (isLoading) return <Loader />;
  return <>{children}</>;
};

function App() {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<Loader />}>
          <PageLoader>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contacts" element={<ContactsPage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </PageLoader>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

export default App;
