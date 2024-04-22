const { faker } = require("@faker-js/faker")
const { Animal, Human, Food } = require('../models')
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let humans = []
    for (let i = 0; i < 20; i++){
        humans.push({
          name: faker.person.fullName(),
          age: faker.number.int({min: 18, max: 90})
        })
    }
    humans = await Human.bulkCreate(humans)

    const birthdates = faker.helpers.uniqueArray(
      () => faker.date.past({ years: 20 }),
      30
    )
    let animals = []
    for (let i = 0; i < 30; i++){
      animals.push({
        species: faker.animal.type(),
        legs: faker.number.int( {min: 0, max: 100}),
        pregnant: Math.random() < 0.3,
        birthdate: birthdates[i],
        ownerId: faker.helpers.arrayElement(humans).id // 1:N
      })
    }
    animals = await Animal.bulkCreate(animals)

    let food = []
    for (let i = 0; i < 10; i++){
      food.push({
        name: faker.lorem.word(),
        calories: faker.number.float( { min: 0, max: 100, fractionDigits: 2 } )
      })
    }
    food = await Food.bulkCreate(food)

    for (const f of food){
      await f.setAnimals( faker.helpers.arrayElements(animals) ) // N:N
    }
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
