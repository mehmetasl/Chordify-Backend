// src/docs/swaggerConfig.ts
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Akorify Backend API',
            version: '1.0.0',
            description: 'Akor analizi ve müzik uygulaması için backend API',
        },
        servers: [
            {
                url: 'http://localhost:4000/api',
                description: 'Development Server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },

        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./src/routes/*.ts'],
};
// @ts-ignore: paths otomatik oluşturulur, manuel gerekmez
const swaggerSpec = swaggerJsdoc(options);

export { swaggerSpec };