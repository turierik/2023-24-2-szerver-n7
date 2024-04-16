const { Animal } = require('./models')
const sequelize = require('sequelize')
const Op = sequelize.Op

const niceLog = (data) => console.log(JSON.parse(JSON.stringify(data, null, 2)))

;(async () => {
    // 1. kérd le az összes állatot
    niceLog(await Animal.findAll())

    // 2. kérd le az összes 2 lábú állatot
    niceLog(await Animal.findAll({
        where: { legs: 2 }
    }))

    // 3. kérd le az összes legalább 2 lábú állatot
    niceLog(await Animal.findAll({
        where: { legs: { [Op.gte] : 2 }  }
    }))

    // 4. kérd le az összes legalább 2 lábú terhes állatot
    niceLog(await Animal.findAll({
        where: {
            legs: { [Op.gte] : 2 },
            pregnant: true
        }
    }))

    // 5. kérd le az összes legalább 2 lábú VAGY terhes állatot
    niceLog(await Animal.findAll({
        where: {
            [Op.or]: [
                { legs: { [Op.gte] : 2 } },
                { pregnant: true }
            ]
        }
    }))

    // 6. hány terhes állat van?
    niceLog(await Animal.count({
        where: { pregnant: true}
    }))

    // 7. add meg minden állat faját és születési dátumát!
    niceLog(await Animal.findAll({
        attributes: ['species', 'birthdate']
    }))

    // 8. add meg minden állat minden adatát, kivéve a lábai számát
    niceLog(await Animal.findAll({
        attributes: { exclude: ['legs'] }
    }))

    // 9. átlagosan hány lába van egy állatnak?
    niceLog(await Animal.findAll({
        attributes: [
            [sequelize.fn('AVG', sequelize.col('legs')), 'avgLegs' ]
        ]
    }))

    // 10. átlagosan hány lába van a terhes és nem terhes állatoknak?
    niceLog(await Animal.findAll({
        attributes: ['pregnant', 
            [sequelize.fn('AVG', sequelize.col('legs')), 'avgLegs' ]
        ],
        group: 'pregnant'
    }))

    // 11. a legidősebb állat minden adata
    niceLog(await Animal.findOne({
        order: [ ['birthdate', 'ASC'] ]
    }))

    // 12. számold meg, hogy fajonként hány darab állat van
    niceLog(await Animal.findAll({
        attributes: ['species', 
            [sequelize.fn('COUNT', sequelize.col('id')), 'count' ]
        ],
        group: 'species'
    }))
    niceLog(await Animal.count(
        { group: ['species'] }
    ))

    // 13. add meg az 5 legidősebb állat adatait
    niceLog(await Animal.findAll({
        order: [ ['birthdate', 'ASC' ]],
        limit: 5
    }))
})()