import pg from 'pg';
import Aylalavah from './aylalavah.mjs'; 

const client = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'Altaitrailsdb',
    password: 'Buyadaa',
    port: 5432,
});

client.connect()
    .then(() => console.log("PostgreSQL өгөгдлийн сан руу холбогдлоо"))
    .catch((err) => console.error("Холболтын алдаа", err.stack));

export default client;

const aylalavah = new Aylalavah(client);

export { aylalavah };