import express from 'express';
import cors from 'cors';
import aylluudRouter from './aylluudRouter.mjs';

const app = express();
const PORT = 3001;

app.use(cors());

app.use(express.json());

app.use('/api', aylluudRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Aylluud API',
            version: '1.0.0',
            description: 'API for managing aylluud',
        },
        servers: [
            {
                url: 'http://localhost:3001',
            },
        ],
    },
    apis: ['./routers/*.mjs'], 
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));