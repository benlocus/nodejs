import express from 'express';
const app = express();
const PORT = 3000;

import { importAlgorithim } from './prisma-importmodule.js'

app.use( express.json() )

app.listen(PORT, () => console.log(`Listening on ${PORT}...`));

// 

app.get('/data', (req, res) => {
    res.status(200).send({
        location: 'Baltimore',
        date: '7/20/22'
    })
});

app.post('/:type/import', async (req, res) => {
    const { type } = req.params;
    const dataSource = req.body;
    
    await importAlgorithim(dataSource, type);

    if (!dataSource) {
        res.status(418).send({ message: 'We need a data source!' });
    }

    res.status(200).send({
        message: `Data for ${type} is ${dataSource}...`
    })
});