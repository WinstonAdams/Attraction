'use strict'

const bcrypt = require('bcryptjs')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      name: 'admin',
      email: 'admin@example.com',
      password: await bcrypt.hash('123456', 10),
      is_admin: true,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      name: 'user1',
      email: 'user1@example.com',
      password: await bcrypt.hash('123456', 10),
      is_admin: false,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      name: 'user2',
      email: 'user2@example.com',
      password: await bcrypt.hash('123456', 10),
      is_admin: false,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      name: 'user3',
      email: 'user3@example.com',
      password: await bcrypt.hash('123456', 10),
      is_admin: false,
      created_at: new Date(),
      updated_at: new Date()
    }], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', {})
  }
}
