Feature('products - 상품을 사려는 사람은 원하는 상품을 찾기 위해 카테고리, 검색을 통해 상품 목록을 볼 수 있다.');

beforeEach(({ I }) => {
  // Given
  I.setupProducts();
  I.amOnPage('/');
});

Scenario('카테고리 선택 - 전체 카테고리 선택', ({ I }) => {
  // When
  I.click('전체');

  // Then
  I.see('가디건');
  I.see('패딩');
  I.see('청바지');
});

Scenario('카테고리 선택 - "상의" 카테고리 선택', ({ I }) => {
  // When
  I.click('상의');

  // Then
  I.see('가디건');
  I.see('패딩');
});

Scenario('검색 - 해당 검색어에 대한 아이템이 존재하지 않을 경우', ({ I }) => {
  // When
  I.fillField('search', 'xxx');

  // Then
  I.see('상품이 존재하지 않습니다');
});

Scenario('검색 - 해당 검색어에 대한 아이템이 존재하는 경우', ({ I }) => {
  // When
  I.fillField('search', '가디건');

  // Then
  I.see('가디건');
});

Scenario('정렬을 바꾸는 경우', ({ I }) => {
  // When

  // Then
});
