Feature('문의글 작성');

beforeEach(({ I }) => {
  // Given
  I.setupUser();
  I.setupProducts();

  I.login({ userName: 'test123', password: 'Password1234!' });
  I.amOnPage('/products');

  I.click('가디건');
});

Scenario('문의글을 공개글로 작성하는 경우', ({ I }) => {
  // When
  I.click('상품 문의 작성');
  I.fillField('제목', '입고 문의');
  I.fillField('내용', '두툼한 가디건 언제쯤 입고되나요?');

  I.click('등록');

  // Then
  I.see('미답변');
  I.see('입고 문의');
});

Scenario('문의글을 비밀글로 작성하는 경우', ({ I }) => {
  // When
  I.click('상품 문의 작성');
  I.fillField('제목', '입고 문의');
  I.fillField('내용', '두툼한 가디건 언제쯤 입고되나요?');
  I.click('비밀글');

  I.click('등록');

  // Then
  I.see('미답변');
  I.see('비밀글입니다');
});

Scenario('문의글의 제목과 내용을 입력하지 않은 경우', ({ I }) => {
  // When
  I.click('상품 문의 작성');
  I.fillField('제목', '');
  I.fillField('내용', '');

  I.click('등록');

  // Then
  I.see('제목을 입력해주세요');
  I.see('내용을 입력해주세요');
});
