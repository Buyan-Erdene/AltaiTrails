export default class Aylalavah{
    constructor(client){
        this.client = client;
    }

    async aylluudAvah() {
        try{
            const query = `
            SELECT * FROM aylluud
            `;
            const result = await this.client.query(query);
            return result.rows;
        }
        catch(error) {
            throw error;
        }
    }
}