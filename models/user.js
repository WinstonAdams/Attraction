'use strict'
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    underscored: true
  })
  User.associate = function (models) {
    User.belongsToMany(models.Attraction, {
      through: models.Favorite,
      foreignKey: 'userId',
      as: 'FavoriteAttractions'
    })
    User.hasMany(models.Message, { foreignKey: 'userId' })
  }
  return User
}
