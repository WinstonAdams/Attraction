'use strict'
module.exports = (sequelize, DataTypes) => {
  const Attraction = sequelize.define('Attraction', {
    attractionId: DataTypes.STRING,
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    underscored: true
  })
  Attraction.associate = function (models) {
    // associations can be defined here
  }
  return Attraction
}
