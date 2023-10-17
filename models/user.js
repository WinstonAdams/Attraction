'use strict'
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    underscored: true
  })
  User.associate = function (models) {
    User.belongsToMany(models.Attraction, {
      through: models.Favorite,
      foreignKey: 'userId',
      as: 'FavoriteAttractions'
    })
  }
  return User
}
