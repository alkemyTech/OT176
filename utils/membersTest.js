const testing = {
  admin: {
    email: 'test@test.com',
    password: process.env.ADMIN_PASSWORD,
  },
  regularUser: {
    email: 'dani11_21@hotmail.com',
    password: 'Test@1234',
  },
  socialMediaTest: {
    name: 'Test',
    image: 'imgTest.jpg',
    instagramUrl: 'igTest.com',
  },
  uniqueMember: {
    name: 'Test',
    image: 'unique.jpg',
    instagramUrl: 'unique.com',
  },
};

module.exports = testing;
