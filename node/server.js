const fastify = require("fastify")({
    logger: true
});
const { Animal, Human, Food } = require("./models");

fastify.register(require("@fastify/jwt"), {
    secret: "secret"
});

fastify.decorate("auth", async function (request, reply) {
    try {
        await request.jwtVerify();
    } catch (err) {
        reply.send(err);
    }
});

// Declare a route
fastify.get("/", (request, reply) => {
    reply.send({ hello: "world 8" });
});

fastify.get("/animals", async (request, reply) => {
    reply.send(await Animal.findAll());
});

fastify.get(
    "/animals/:id",
    {
        schema: {
            params: {
                id: { type: "integer" }
            }
        }
    },
    async (request, reply) => {
        // paraméter kiolvasása: request.params.id
        const animal = await Animal.findByPk(request.params.id);
        if (animal === null) return reply.status(404).send("NOT FOUND");
        return reply.send(animal);
    }
);

fastify.post(
    "/animals",
    {
        schema: {
            body: {
                type: "object",
                properties: {
                    legs: { type: "integer" },
                    species: { type: "string" },
                    ownerId: { type: "integer" },
                    pregnant: { type: "boolean" },
                    birthdate: { type: "string" }
                },
                required: [
                    "legs",
                    "species",
                    "ownerId",
                    "pregnant",
                    "birthdate"
                ]
            }
        }
    },
    async (request, reply) => {
        try {
            return reply.status(201).send(await Animal.create(request.body));
        } catch (err) {
            return reply.status(400).send(err);
        }
    }
);

fastify.put(
    "/animals/:id",
    {
        schema: {
            params: {
                id: { type: "integer" }
            },
            body: {
                type: "object",
                properties: {
                    legs: { type: "integer" },
                    species: { type: "string" },
                    ownerId: { type: "integer" },
                    pregnant: { type: "boolean" },
                    birthdate: { type: "string" }
                },
                required: [
                    "legs",
                    "species",
                    "ownerId",
                    "pregnant",
                    "birthdate"
                ]
            }
        }
    },
    async (request, reply) => {
        const animal = await Animal.findByPk(request.params.id);
        if (animal === null) return reply.status(404).send("NOT FOUND");
        try {
            return reply.send(await animal.update(request.body));
        } catch (err) {
            return reply.status(400).send(err);
        }
    }
);

fastify.patch(
    "/animals/:id",
    {
        schema: {
            params: {
                id: { type: "integer" }
            },
            body: {
                type: "object",
                properties: {
                    legs: { type: "integer" },
                    species: { type: "string" },
                    ownerId: { type: "integer" },
                    pregnant: { type: "boolean" },
                    birthdate: { type: "string" }
                }
                // required: ['legs', 'species', 'ownerId', 'pregnant', 'birthdate']
            }
        }
    },
    async (request, reply) => {
        const animal = await Animal.findByPk(request.params.id);
        if (animal === null) return reply.status(404).send("NOT FOUND");
        try {
            return reply.send(await animal.update(request.body));
        } catch (err) {
            return reply.status(400).send(err);
        }
    }
);

fastify.delete(
    "/animals/:id",
    {
        schema: {
            params: {
                id: { type: "integer" }
            }
        }
    },
    async (request, reply) => {
        // paraméter kiolvasása: request.params.id
        const animal = await Animal.findByPk(request.params.id);
        if (animal === null) return reply.status(404).send("NOT FOUND");
        await animal.destroy();
        return reply.send(1);
    }
);

fastify.delete("/animals", async (request, reply) => {
    // reply.send(await Animal.destroy({ where: {} }));
    reply.send(await Animal.destroy({ truncate: true }));
});

fastify.post("/login", {
    schema: {
        body: {
            type: 'object',
            properties: {
                name: { type: 'string'},
                age: { type: 'integer'}
            },
            required: ['name', 'age']
        }
    }
}, async (request, reply) => {
    const user = await Human.findOne({
        where: { name: request.body.name, age: request.body.age }
    })
    if (user === null)
        return reply.status(404).send("NOT FOUND")
    return reply.send(fastify.jwt.sign(user.dataValues))
})

fastify.get('/my-animals', { onRequest: [fastify.auth] }, async (request, reply) => {
    reply.send(await Animal.findAll({
        where: {
            ownerId: request.user.id
        }
    }))
})

// Run the server!
fastify.listen({ port: 4000 }, (err, address) => {
    if (err) throw err;
    // Server is now listening on ${address}
});
