Feature('회원가입 - 고객은 상품을 주문할 수 있는 자격을 얻기 위해 회원가입을 할 수 있다.');

// Given
Before(({ I }) => {
  I.setupUser();

  I.amOnPage('/');

  I.click('회원가입');
});

Scenario('회원가입 성공', ({ I }) => {
  // When
  I.fillField('이름:', '김토끼');
  I.fillField('아이디:', 'rabbit');
  I.fillField('비밀번호:', 'Password1234!');
  I.fillField('비밀번호 확인:', 'Password1234!');
  I.fillField('전화번호:', '01012341234');

  I.click('회원가입');

  // Then
  I.see('회원가입 완료');
  I.see('로그인하기');
});

Scenario('회원가입 에러(아이디 중복)', ({ I }) => {
  // When
  I.fillField('이름:', '김토끼');
  I.fillField('아이디:', 'test123');
  I.fillField('비밀번호:', 'Password1234!');
  I.fillField('비밀번호 확인:', 'Password1234!');
  I.fillField('전화번호:', '01012341234');

  I.click('회원가입');

  // Then
  I.see('해당 아이디는 사용할 수 없습니다');
});

Scenario('회원가입 에러 (내용 잘못 입력 시)', ({ I }) => {
  // When
  I.fillField('이름:', '정신차려이각박한세상속에서');
  I.fillField('아이디:', '7777-7777');
  I.fillField('비밀번호:', '1234');
  I.fillField('비밀번호 확인:', '1234');
  I.fillField('전화번호:', '01012341234');

  I.click('회원가입');

  // Then
  I.see('이름을 다시 확인해주세요');
  I.see('아이디를 다시 확인해주세요');
  I.see('비밀번호를 다시 확인해주세요');
  I.see('비밀번호가 일치하지 않습니다');
});

Scenario('회원가입 에러 (내용 미입력 시)', ({ I }) => {
  // When
  I.fillField('이름:', '');
  I.fillField('아이디:', '');
  I.fillField('비밀번호:', '');
  I.fillField('비밀번호 확인:', '');
  I.fillField('전화번호:', '');

  I.click('회원가입');

  // Then
  I.see('이름을 입력해주세요');
  I.see('아이디를 입력해주세요');
  I.see('비밀번호를 입력해주세요');
  I.see('비밀번호를 입력해주세요');
  I.see('전화번호를 입력해주세요');
});
