import { Route, Routes } from 'react-router-dom';

import { useLocalStorage } from 'usehooks-ts';
import { useEffect } from 'react';

import GlobalStyle from './styles/GlobalStyle';

import Header from './components/Header';

import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductPage from './pages/ProductPage';
import OrderPage from './pages/OrderPage';
import LoginPage from './pages/LoginPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import MyPage from './pages/MyPage';

import { apiService } from './services/ApiService';

export default function App() {
  const [accessToken] = useLocalStorage('accessToken', '');

  useEffect(() => {
    apiService.setAccessToken(accessToken);
  }, [accessToken]);

  return (
    <div>
      <GlobalStyle />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:productId" element={<ProductPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/order/success" element={<OrderSuccessPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/my" element={<MyPage />} />
        </Routes>
      </main>
    </div>
  );
}
