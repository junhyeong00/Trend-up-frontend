Feature('상품 문의 글 조회 - 상품에 대한 궁금증이 있는 사람은 상품 설명에서 알 수 없는 궁금한 점을 해결하기 위해 문의 글을 조회할 수 있다.');

beforeEach(({ I }) => {
  // Given
  I.setupUser();
  I.setupProducts();

  I.login({ userName: 'test123', password: 'Password1234!' });
  I.amOnPage('/products');
});

Scenario('문의 글이 없는 경우', ({ I }) => {
  // When
  I.click('가디건');

  // Then
  I.see('작성된 문의글이 없습니다');
});

Scenario('문의 글이 있는 경우', ({ I }) => {
  // Given
  I.setupInquiries();

  // When
  I.click('가디건');

  // Then
  I.see('재입고');
  I.see('미답변');
});

Scenario('내 문의글 조회를 하는 경우', ({ I }) => {
  // Given

  // When

  // Then

});
