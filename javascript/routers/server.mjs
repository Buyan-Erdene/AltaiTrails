import express from 'express';
import cors from 'cors'; // Import the cors package
import aylluudRouter from './aylluudRouter.mjs';

const app = express();
const PORT = 3001;

// Enable CORS for all routes
app.use(cors());

app.use(express.json());

// Use the aylluud router
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
    apis: ['./routers/*.mjs'], // API endpoint-уудыг агуулсан файлууд
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));