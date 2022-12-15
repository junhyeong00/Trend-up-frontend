Feature('상품 바로 구매 - 상품을 사려는 사람은 상품을 구매하기 위해 상품의 옵션과 개수를 선택하고 바로 구매 할 수 있다.');

Before(({ I }) => {
  // Given
  I.setupUser();
  I.setupProducts();

  I.amOnPage('/');

  I.login({ userName: 'test123', password: 'Password1234!' });

  I.click('남성 패션');
  I.click('가디건');
});

Scenario('상품 바로 구매 (주문 페이지 이동 성공)', ({ I }) => {
  // When
  I.selectOption('#options', '2');

  I.click('구매하기');

  // Then
  I.see('주문 / 결제');
});

Scenario('상품 바로 구매 실패 - 옵션 미선택 후 구매하기 클릭', ({ I }) => {
  // When
  I.click('구매하기');

  // Then
  I.see('옵션을 선택해주세요');
});
