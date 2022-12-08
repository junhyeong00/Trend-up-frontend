import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductPage from './pages/ProductPage';
import GlobalStyle from './styles/GlobalStyle';

export default function App() {
  return (
    <div>
      <GlobalStyle />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:productId" element={<ProductPage />} />
        </Routes>
      </main>
    </div>
  );
}
