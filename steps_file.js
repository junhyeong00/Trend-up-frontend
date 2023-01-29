const backdoorBaseUrl = 'https://trend-up-backend.herokuapp.com/backdoor';

module.exports = function () {
  return actor({
    setupUser() {
      this.amOnPage(`${backdoorBaseUrl}/setup-user`);
    },

    login({ userName, password }) {
      this.amOnPage('/login');

      this.fillField({ id: 'input-userName' }, userName);
      this.fillField({ id: 'input-password' }, password);

      this.click('button[type="submit"]');

      this.waitForText('로그아웃');
    },

    setupProducts() {
      this.amOnPage(`${backdoorBaseUrl}/setup-products`);
    },

    setupReviews() {
      this.amOnPage(`${backdoorBaseUrl}/setup-reivews`);
    },

    setupOrders() {
      this.amOnPage(`${backdoorBaseUrl}/setup-orders`);
    },

    setupInquiries() {
      this.amOnPage(`${backdoorBaseUrl}/setup-inquiries`);
    },
  });
};
