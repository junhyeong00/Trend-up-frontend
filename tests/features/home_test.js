Feature('home');

Scenario('메인화면 - 로그인 전', ({ I }) => {
  // Given

  // When
  I.amOnPage('/');

  // Then
  I.see(/인기 상품/);
  I.see(/장바구니/);
  I.see(/My/);
  I.see(/로그인/);
  I.see(/회원가입/);
});

Scenario('메인화면 - 로그인 후', ({ I }) => {
  // Given
  // 고객정보 세팅
  // 로그인

  // When
  I.amOnPage('/');

  // Then
  I.see(/인기 상품/);
  I.see(/장바구니/);
  I.see(/My/);
  I.see(/로그아웃/);
  I.see(/배준형님/);
});
