Feature('주문 목록 보기');

Before(({ I }) => {
  // Given
  I.setupProducts();
  I.setupOrders();

  I.login({ userName: 'test123', password: 'Password1234!' });

  I.amOnPage('/');
});

Scenario('주문 내역이 없는 경우', ({ I }) => {
  // When
  I.click('My');

  // Then
  I.see('주문 내역이 없습니다');
});

Scenario('주문 내역이 있는 경우', ({ I }) => {
  // When
  I.click('My');

  // Then
  I.see('패딩');
  I.see('배송 준비중');
});
