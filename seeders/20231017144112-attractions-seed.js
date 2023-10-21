'use strict'

const attractions = require('../attraction.json')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Attractions',
      attractions.map(attraction => {
        if (!attraction.City && !attraction.Picture.PictureUrl1) {
          return {
            number: attraction.ScenicSpotID,
            name: attraction.ScenicSpotName,
            address: attraction.Address,
            city: attraction.Address.slice(0, 2),
            image: 'https://i.imgur.com/MsZJMOd.jpeg',
            created_at: new Date(),
            updated_at: new Date()
          }
        }
        if (!attraction.City) {
          return {
            number: attraction.ScenicSpotID,
            name: attraction.ScenicSpotName,
            address: attraction.Address,
            city: attraction.Address.slice(0, 2),
            image: attraction.Picture.PictureUrl1,
            created_at: new Date(),
            updated_at: new Date()
          }
        }
        if (!attraction.Picture.PictureUrl1) {
          return {
            number: attraction.ScenicSpotID,
            name: attraction.ScenicSpotName,
            address: attraction.Address,
            city: attraction.City.slice(0, 2),
            image: 'https://i.imgur.com/MsZJMOd.jpeg',
            created_at: new Date(),
            updated_at: new Date()
          }
        }
        return {
          number: attraction.ScenicSpotID,
          name: attraction.ScenicSpotName,
          address: attraction.Address,
          city: attraction.City.slice(0, 2),
          image: attraction.Picture.PictureUrl1,
          created_at: new Date(),
          updated_at: new Date()
        }
      }), {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Attractions', {})
  }
}
