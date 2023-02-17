Feature('상품 주문 - 상품을 구매하려는 사람은 상품을 구매하기 위해 주문 / 결제를 완료할 수 있다.');

Before(({ I }) => {
  // Given
  I.setupUser();
  I.setupProducts();

  I.amOnPage('/');

  I.login({ userName: 'test123', password: 'Password1234!' });

  I.click('남성 패션');
  I.click('가디건');
});

Scenario('상품 주문 완료', ({ I }) => {
  // When
  I.click('구매하기');

  I.fillField('받는 분 성함', '배준형');
  I.fillField('받는 분 번호', '01012341234');

  I.click('우편번호 찾기');

  // Then
});
