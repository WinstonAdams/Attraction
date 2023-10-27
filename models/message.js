'use strict'
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    roomId: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    underscored: true
  })
  Message.associate = function (models) {
    Message.belongsTo(models.User, { foreignKey: 'userId' })
  }
  return Message
}
