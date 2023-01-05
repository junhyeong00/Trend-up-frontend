Feature('상품 문의 글 삭제 - 자신의 문의글을 삭제하기 원하는 사람은 문의글을 지우기 위해 삭제 버튼을 눌러서 문의글을 삭제할 수 있다.');

beforeEach(({ I }) => {
  // Given
  I.setupUser();
  I.setupProducts();
  I.setupInquiries();

  I.login({ userName: 'test123', password: 'Password1234!' });
  I.amOnPage('/products');
});

Scenario('문의 글 삭제', ({ I }) => {
  // When
  I.click('가디건');

  I.click('미답변');

  I.click('삭제');

  I.click('삭제');

  // Then
  I.see('작성된 문의글이 없습니다');
});
