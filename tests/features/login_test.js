Feature('로그인');

Before(({ I }) => {
  I.setupUser();

  I.amOnPage('/');
  I.click('로그인');
});

Scenario('일반 로그인 - 성공', ({ I }) => {
  // When
  I.fillField('아이디', 'test123');
  I.fillField('비밀번호', 'Password1234!');

  I.click('button[type="submit"]');

  // Then
  I.see('배준형님');
  I.see('로그아웃');
});

Scenario('로그인 에러(아이디 잘못 입력 시)', ({ I }) => {
  // When
  I.fillField('아이디', 'xxx');
  I.fillField('비밀번호', 'Password1234!');
  I.click('button[type="submit"]');

  // Then
  I.see('존재하지 않는 아이디입니다');
});

Scenario('로그인 에러(비밀번호 잘못 입력 시)', ({ I }) => {
  // When
  I.fillField('아이디', 'test123');
  I.fillField('비밀번호', 'xxx');
  I.click('button[type="submit"]');

  // Then
  I.see('비밀번호가 일치하지 않습니다');
});

Scenario('로그인 에러(아이디 미입력 시)', ({ I }) => {
  // When
  I.fillField('아이디', '');
  I.fillField('비밀번호', 'Password1234!');
  I.click('button[type="submit"]');

  // Then
  I.see('아이디를 입력해주세요');
  I.waitForText('아이디를 입력해주세요');
});

Scenario('로그인 에러(비밀번호 미입력 시)', ({ I }) => {
  // When
  I.fillField('아이디', 'test123');
  I.fillField('비밀번호', '');
  I.click('button[type="submit"]');

  // Then
  I.see('비밀번호를 입력해주세요');
  I.waitForText('비밀번호를 입력해주세요');
});

Scenario('카카오 로그인', ({ I }) => {
  // Given

  // When

  // Then

});
