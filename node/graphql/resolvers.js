const auth = require("./auth");
const db = require("../models");
const { Sequelize, sequelize } = db;
const { ValidationError, DatabaseError, Op } = Sequelize;
// TODO: Importáld a modelleket
const { Animal, Human, Food } = db;

module.exports = {
    Query: {
        // Elemi Hello World! példa:
        helloWorld: () => "Hello World!",

        // Példa paraméterezésre:
        helloName: (_, { name }) => `Hello ${name}!`,

        // TODO: Dolgozd ki a további resolver-eket a schema-val összhangban
        getAnimals: async () => await Animal.findAll(),
        getAnimalById: async (_, { id }) => await Animal.findByPk(id),
        getAnimalsByOwnerName: async (_, { name }) => {
            // const human = await Human.findOne({ where: { name }})
            // if (!human) return null;
            // return await human.getAnimals()
            return await Animal.findAll({
                include: [{ model: Human, as: 'owner',
                    where: {name}
                }]
            })
        }
    },
    Animal: {
        owner: async (animal) => await animal.getOwner(),
        food: async (animal) => await animal.getFood()
    },
    Food: {
        animals: async (food) => await food.getAnimals(),
    },
    Human: {
        animals: async (human) => await human.getAnimals(),
    },
    Mutation: {
        createHuman: async (_, { input }) => await Human.create(input)
    }
};
