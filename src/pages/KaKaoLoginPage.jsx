import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { useLocalStorage } from 'usehooks-ts';
import useCartStore from '../hooks/useCartStore';

import useUserStore from '../hooks/useUserStore';

import { apiService } from '../services/ApiService';

export default function KaKaoLoginPage() {
  const [, setAccessToken] = useLocalStorage('accessToken', '');
  const [, setCart] = useLocalStorage('cart', '{"items":[]}');

  const navigate = useNavigate();

  const userStore = useUserStore();
  const cartStore = useCartStore();

  const authorizationCode = new URL(window.location.href).searchParams.get('code');

  const kakaoAccessToken = async () => {
    const accessToken = await userStore.kakaoLogin(authorizationCode);

    setAccessToken(accessToken);

    apiService.setAccessToken(accessToken);

    if (accessToken) {
      const itmes = await cartStore.fetchCart(accessToken);

      setCart(itmes);

      navigate('/');
    }
  };

  useEffect(() => {
    kakaoAccessToken();
  }, []);

  return (
    <p>
      로그인중
    </p>
  );
}
