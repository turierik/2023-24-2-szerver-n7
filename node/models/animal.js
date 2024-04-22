'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Animal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Human, { as: 'owner', foreignKey: 'ownerId' })
      this.belongsToMany(models.Food, { through: 'AnimalFood', timestamps: false })
    }
  }
  Animal.init({
    species: DataTypes.STRING,
    legs: DataTypes.INTEGER,
    pregnant: DataTypes.BOOLEAN,
    birthdate: DataTypes.DATE,
    ownerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Animal',
  });
  return Animal;
};