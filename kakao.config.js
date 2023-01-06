const kakaoConfig = {
  apiKey: process.env.KAKAO_API,
  redirectUri: process.env.KAKAO_REDIRECT_URI,
  kakaoAuthUrl: `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_API}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&response_type=code`,
  kakaoLoginApiBaseUrl: 'https://kauth.kakao.com',
};

export default kakaoConfig;
