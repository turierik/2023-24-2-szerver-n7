'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Food extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Animal, { through: 'AnimalFood', timestamps: false })
    }
  }
  Food.init({
    name: DataTypes.STRING,
    calories: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Food',
  });
  return Food;
};