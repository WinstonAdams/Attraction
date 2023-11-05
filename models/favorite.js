'use strict'
module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {
    userId: DataTypes.INTEGER,
    attractionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Favorite',
    tableName: 'Favorites',
    underscored: true
  })
  Favorite.associate = function (models) {
    // associations can be defined here
  }
  return Favorite
}
