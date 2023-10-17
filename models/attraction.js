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
    Attraction.belongsToMany(models.User, {
      through: models.Favorite,
      foreignKey: 'attractionId',
      as: 'FavoritedUsers'
    })
  }
  return Attraction
}
