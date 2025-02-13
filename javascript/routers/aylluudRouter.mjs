import express from 'express';
import { aylalavah} from '../database/connect.mjs';

const router = express.Router();

// GET all aylluud
router.get('/aylluud', async (req, res) => {
    try {
        const aylluud = await aylalavah.aylluudAvah();
        res.json(aylluud);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET a single ayllu by id
router.get('/aylluud/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const query = `
            SELECT * FROM aylluud WHERE id = $1
        `;
        const result = await aylalavah.client.query(query, [id]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'Ayllu not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST a new ayllu
router.post('/aylluud', async (req, res) => {
    try {
        const { name, description } = req.body;
        const query = `
            INSERT INTO aylluud (name, description)
            VALUES ($1, $2)
            RETURNING *
        `;
        const result = await aylalavah.client.query(query, [name, description]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT (update) an existing ayllu
router.put('/aylluud/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const query = `
            UPDATE aylluud
            SET name = $1, description = $2
            WHERE id = $3
            RETURNING *
        `;
        const result = await aylalavah.client.query(query, [name, description, id]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'Ayllu not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE an ayllu
router.delete('/aylluud/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const query = `
            DELETE FROM aylluud WHERE id = $1
            RETURNING *
        `;
        const result = await aylalavah.client.query(query, [id]);
        if (result.rows.length > 0) {
            res.json({ message: 'Ayllu deleted successfully' });
        } else {
            res.status(404).json({ message: 'Ayllu not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;