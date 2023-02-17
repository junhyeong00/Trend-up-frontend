import { apiService } from '../services/ApiService';

import Store from './Store';

export default class SignUpFormStore extends Store {
  constructor() {
    super();

    this.name = '';
    this.phoneNumber = '';
    this.userName = '';
    this.password = '';
    this.confirmPassword = '';

    this.signUpError = '';

    this.errors = {
      name: '',
      phoneNumber: '',
      userName: '',
      password: '',
      confirmPassword: '',
    };

    this.regex = {
      name: /^[가-힣]{3,7}$/,
      phoneNumber: /^01{1}[01]{1}[0-9]{7,8}$/,
      userName: /^(?=.*[a-z])(?=.*\d)[a-z\d]{4,16}$/,
      password: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d(?=.*@$!%*#?&)]{8,}$/,
    };
  }

  async signUp() {
    this.errorReset();

    if (!this.validate()) {
      this.publish();
      return '';
    }

    try {
      const { name } = await apiService.signUp({
        name: this.name,
        userName: this.userName,
        password: this.password,
        confirmPassword: this.confirmPassword,
        phoneNumber: this.phoneNumber,
      });

      return name;
    } catch (error) {
      this.signUpError = error.response.data.errorMessage;
      this.publish();
      return '';
    }
  }

  validate() {
    let error = true;

    if (!this.name) {
      this.errors.name = '이름을 입력해주세요';
      error = false;
    }

    if (!this.userName) {
      this.errors.userName = '아이디를 입력해주세요';
      error = false;
    }

    if (!this.password) {
      this.errors.password = '비밀번호를 입력해주세요';
      error = false;
    }

    if (!this.phoneNumber) {
      this.errors.phoneNumber = '전화번호를 입력해주세요';
      error = false;
    }

    if (this.name && !this.regex.name.test(this.name)) {
      this.errors.name = '이름을 다시 확인해주세요';
      error = false;
    }

    if (this.userName && !this.regex.userName.test(this.userName)) {
      this.errors.userName = '아이디를 다시 확인해주세요';
      error = false;
    }

    if (this.password && !this.regex.password.test(this.password)) {
      this.errors.password = '비밀번호를 다시 확인해주세요';
      error = false;
    }

    if (this.confirmPassword !== this.password) {
      this.errors.confirmPassword = '비밀번호가 일치하지 않습니다';
      error = false;
    }

    if (this.phoneNumber && !this.regex.phoneNumber.test(this.phoneNumber)) {
      this.errors.phoneNumber = '전화번호를 다시 확인해주세요';
      error = false;
    }

    this.publish();

    return error;
  }

  errorReset() {
    this.signUpError = '';

    this.errors = {
      name: '',
      phoneNumber: '',
      userName: '',
      password: '',
      confirmPassword: '',
    };

    this.publish();
  }

  changeName(name) {
    this.name = name;
    this.publish();
  }

  changeUserName(userName) {
    this.userName = userName;
    this.publish();
  }

  changePassword(password) {
    this.password = password;
    this.publish();
  }

  changeConfirmPassword(confirmPassword) {
    this.confirmPassword = confirmPassword;
    this.publish();
  }

  changePhoneNumber(phoneNumber) {
    this.phoneNumber = phoneNumber;
    this.publish();
  }
}

export const signUpFormStore = new SignUpFormStore();
