import express from 'express';
import { aylalavah} from '../database/connect.mjs';

const router = express.Router();

router.get('/aylluud', async (req, res) => {
    try {
        const aylluud = await aylalavah.aylluudAvah();
        res.json(aylluud);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

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
            res.status(404).json({ message: 'Aylluud baihgui' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

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
            res.status(404).json({ message: 'Aylluud baihgui' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/aylluud/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const query = `
            DELETE FROM aylluud WHERE id = $1
            RETURNING *
        `;
        const result = await aylalavah.client.query(query, [id]);
        if (result.rows.length > 0) {
            res.json({ message: 'Aylluud ustgagdlaa' });
        } else {
            res.status(404).json({ message: 'Aylluud oldsongui' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;