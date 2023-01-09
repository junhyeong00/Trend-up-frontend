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
import OrderDetailPage from './pages/OrderDetailPage';
import ReviewWritePage from './pages/ReviewWritePage';

import { apiService } from './services/ApiService';
import ReviewManagementPage from './pages/ReviewManagementPage';
import ReviewWriteablePage from './pages/ReviewWriteablePage';
import ReviewEditPage from './pages/ReviewEditPage';
import CartPage from './pages/CartPage';
import useCartStore from './hooks/useCartStore';
import KaKaoLoginPage from './pages/KaKaoLoginPage';
import OrderCancel from './components/OrderCancel';
import OrderFail from './components/OrderFail';

export default function App() {
  const [accessToken] = useLocalStorage('accessToken', '');
  const [cart] = useLocalStorage('cart', '{"items":[]}');

  const cartStore = useCartStore();

  useEffect(() => {
    apiService.setAccessToken(accessToken);
    cartStore.setCart(JSON.parse(cart));
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
          <Route path="/order/cancel" element={<OrderCancel />} />
          <Route path="/order/fail" element={<OrderFail />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/auth/kakao" element={<KaKaoLoginPage />} />
          <Route path="/my" element={<MyPage />} />
          <Route path="/my/review/writeable" element={<ReviewWriteablePage />} />
          <Route path="/my/reviews" element={<ReviewManagementPage />} />
          <Route path="/my/review/write" element={<ReviewWritePage />} />
          <Route path="/my/review/edit" element={<ReviewEditPage />} />
          <Route path="/orders/:orderId" element={<OrderDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </main>
    </div>
  );
}
