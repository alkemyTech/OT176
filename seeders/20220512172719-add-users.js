'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        firstName: 'UserOne',
        lastName: 'userSurnameOne',
        email: 'user1@gmail.com',
        // password: '1234'
        password: '$2a$10$biba9CS4/cjoL4FdRTMpz.3hvTeuYS9XxLjNkxCYRYzO7SgNODGOG',
        createdAt: new Date(),
        updatedAt: new Date(),
        roleId: 2,
        photo: 'default.png',
      },
      {
        firstName: 'UserTwo',
        lastName: 'userSurnameTwo',
        email: 'user2@gmail.com',
        // password: '1234'
        password: '$2a$10$biba9CS4/cjoL4FdRTMpz.3hvTeuYS9XxLjNkxCYRYzO7SgNODGOG',
        createdAt: new Date(),
        updatedAt: new Date(),
        roleId: 2,
        photo: 'default.png',
      },
      {
        firstName: 'UserThree',
        lastName: 'userSurnameThree',
        email: 'user3@gmail.com',
        // password: '1234'
        password: '$2a$10$biba9CS4/cjoL4FdRTMpz.3hvTeuYS9XxLjNkxCYRYzO7SgNODGOG',
        createdAt: new Date(),
        updatedAt: new Date(),
        roleId: 2,
        photo: 'default.png',
      },
      {
        firstName: 'UserFour',
        lastName: 'userSurnameFour',
        email: 'user4@gmail.com',
        // password: '1234'
        password: '$2a$10$biba9CS4/cjoL4FdRTMpz.3hvTeuYS9XxLjNkxCYRYzO7SgNODGOG',
        createdAt: new Date(),
        updatedAt: new Date(),
        roleId: 2,
        photo: 'default.png',
      },
      {
        firstName: 'UserFive',
        lastName: 'userSurnamefive',
        email: 'user5@gmail.com',
        // password: '1234'
        password: '$2a$10$biba9CS4/cjoL4FdRTMpz.3hvTeuYS9XxLjNkxCYRYzO7SgNODGOG',
        createdAt: new Date(),
        updatedAt: new Date(),
        roleId: 2,
        photo: 'default.png',
      },
      {
        firstName: 'UserSix',
        lastName: 'userSurnameSix',
        email: 'user6@gmail.com',
        // password: '1234'
        password: '$2a$10$biba9CS4/cjoL4FdRTMpz.3hvTeuYS9XxLjNkxCYRYzO7SgNODGOG',
        createdAt: new Date(),
        updatedAt: new Date(),
        roleId: 2,
        photo: 'default.png',
      },
      {
        firstName: 'UserSeven',
        lastName: 'userSurnameSeven',
        email: 'user7@gmail.com',
        // password: '1234'
        password: '$2a$10$biba9CS4/cjoL4FdRTMpz.3hvTeuYS9XxLjNkxCYRYzO7SgNODGOG',
        createdAt: new Date(),
        updatedAt: new Date(),
        roleId: 2,
        photo: 'default.png',
      },
      {
        firstName: 'UserEight',
        lastName: 'userSurnameEight',
        email: 'user8@gmail.com',
        // password: '1234'
        password: '$2a$10$biba9CS4/cjoL4FdRTMpz.3hvTeuYS9XxLjNkxCYRYzO7SgNODGOG',
        createdAt: new Date(),
        updatedAt: new Date(),
        roleId: 2,
        photo: 'default.png',
      },
      {
        firstName: 'UserNine',
        lastName: 'userSurnameNine',
        email: 'user9@gmail.com',
        // password: '1234'
        password: '$2a$10$biba9CS4/cjoL4FdRTMpz.3hvTeuYS9XxLjNkxCYRYzO7SgNODGOG',
        createdAt: new Date(),
        updatedAt: new Date(),
        roleId: 2,
        photo: 'default.png',
      },
      {
        firstName: 'UserTen',
        lastName: 'userSurnameTen',
        email: 'user10@gmail.com',
        // password: '1234'
        password: '$2a$10$biba9CS4/cjoL4FdRTMpz.3hvTeuYS9XxLjNkxCYRYzO7SgNODGOG',
        createdAt: new Date(),
        updatedAt: new Date(),
        roleId: 2,
        photo: 'default.png',
      },
      {
        firstName: 'UserEleven',
        lastName: 'userSurnameEleven',
        email: 'user11@gmail.com',
        // password: '1234'
        password: '$2a$10$biba9CS4/cjoL4FdRTMpz.3hvTeuYS9XxLjNkxCYRYzO7SgNODGOG',
        createdAt: new Date(),
        updatedAt: new Date(),
        roleId: 2,
        photo: 'default.png',
      },
      {
        firstName: 'UserTwelve',
        lastName: 'userSurnameTwelve',
        email: 'user12@gmail.com',
        // password: '1234'
        password: '$2a$10$biba9CS4/cjoL4FdRTMpz.3hvTeuYS9XxLjNkxCYRYzO7SgNODGOG',
        createdAt: new Date(),
        updatedAt: new Date(),
        roleId: 2,
        photo: 'default.png',
      },
      {
        firstName: 'UserThirteen',
        lastName: 'userSurnameThirteen',
        email: 'user13@gmail.com',
        // password: '1234'
        password: '$2a$10$biba9CS4/cjoL4FdRTMpz.3hvTeuYS9XxLjNkxCYRYzO7SgNODGOG',
        createdAt: new Date(),
        updatedAt: new Date(),
        roleId: 2,
        photo: 'default.png',
      },
      {
        firstName: 'UserFourteen',
        lastName: 'userSurnameFourteen',
        email: 'user14@gmail.com',
        // password: '1234'
        password: '$2a$10$biba9CS4/cjoL4FdRTMpz.3hvTeuYS9XxLjNkxCYRYzO7SgNODGOG',
        createdAt: new Date(),
        updatedAt: new Date(),
        roleId: 2,
        photo: 'default.png',
      },
      {
        firstName: 'UserFifteen',
        lastName: 'userSurnameFifteen',
        email: 'user15@gmail.com',
        // password: '1234'
        password: '$2a$10$biba9CS4/cjoL4FdRTMpz.3hvTeuYS9XxLjNkxCYRYzO7SgNODGOG',
        createdAt: new Date(),
        updatedAt: new Date(),
        roleId: 2,
        photo: 'default.png',
      },
      {
        firstName: 'UserSixteen',
        lastName: 'userSurnameSixteen',
        email: 'user16@gmail.com',
        // password: '1234'
        password: '$2a$10$biba9CS4/cjoL4FdRTMpz.3hvTeuYS9XxLjNkxCYRYzO7SgNODGOG',
        createdAt: new Date(),
        updatedAt: new Date(),
        roleId: 2,
        photo: 'default.png',
      },
      {
        firstName: 'UserSevenTeen',
        lastName: 'userSurnameSeventeen',
        email: 'user17@gmail.com',
        // password: '1234'
        password: '$2a$10$biba9CS4/cjoL4FdRTMpz.3hvTeuYS9XxLjNkxCYRYzO7SgNODGOG',
        createdAt: new Date(),
        updatedAt: new Date(),
        roleId: 2,
        photo: 'default.png',
      },
      {
        firstName: 'UserEighteen',
        lastName: 'userSurnameEighteen',
        email: 'user18@gmail.com',
        // password: '1234'
        password: '$2a$10$biba9CS4/cjoL4FdRTMpz.3hvTeuYS9XxLjNkxCYRYzO7SgNODGOG',
        createdAt: new Date(),
        updatedAt: new Date(),
        roleId: 2,
        photo: 'default.png',
      },
      {
        firstName: 'UserNineteen',
        lastName: 'userSurnameNineteen',
        email: 'user19@gmail.com',
        // password: '1234'
        password: '$2a$10$biba9CS4/cjoL4FdRTMpz.3hvTeuYS9XxLjNkxCYRYzO7SgNODGOG',
        createdAt: new Date(),
        updatedAt: new Date(),
        roleId: 2,
        photo: 'default.png',
      },
      {
        firstName: 'UserTwenty',
        lastName: 'userSurnameTwenty',
        email: 'user20@gmail.com',
        // password: '1234'
        password: '$2a$10$biba9CS4/cjoL4FdRTMpz.3hvTeuYS9XxLjNkxCYRYzO7SgNODGOG',
        createdAt: new Date(),
        updatedAt: new Date(),
        roleId: 2,
        photo: 'default.png',
      }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
