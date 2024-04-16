const { faker } = require("@faker-js/faker")
const { Animal } = require('../models')
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const birthdates = faker.helpers.uniqueArray(
      () => faker.date.past({ years: 20 }),
      30
    )
    const animals = []
    for (let i = 0; i < 30; i++){
      animals.push({
        species: faker.animal.type(),
        legs: faker.number.int( {min: 0, max: 100}),
        pregnant: Math.random() < 0.3,
        birthdate: birthdates[i]
      })
    }
    await Animal.bulkCreate(animals)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
