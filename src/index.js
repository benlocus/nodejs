// imports the necessary express objects
import express from 'express';
const app = express();

const PORT = process.env.PORT || 8080;

// imports the neccessary prisma objects
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// import { importAlgorithim } from '../test/prisma-importmodule.js';

// // // // 

// allows express to parse JSON objects recieved
app.use( express.json() )

// initializes the app on the given port
app.listen(PORT, () => console.log(`Listening on ${PORT}...`));


          // GET API FOR ALL OF ASSETS //
        
// this fuction acts as the GET api reciever that triggers callback prisma call async
app.get('/assets', async (req, res) => {
    const getAssets = await prisma.optical_heads.findMany({
        select: {
            id: true,
            name: true,
            type: true
        }
    })

    // if asset is returned as a null object, sends a error code and message
    if (!getAssets) {
        res.status(418).send({ message: 'Please provide a valid ID!' });
    }

    // if the asset is not null, returns the data object
    res.status(200).send(getAssets)
});

        // GET API FOR ALL OF A KIND OF ASSET //
        
// this fuction acts as the GET api reciever that triggers callback prisma call async
app.get('/:asset', async (req, res) => {
    const { asset } = req.params
    const getAsset = await prisma.optical_heads.findMany({
        where: {
            type: asset
        },
        select: {
            id: true,
            name: true,
            type: true
        }
    })

    // if asset is returned as a null object, sends a error code and message
    if (!getAsset) {
        res.status(418).send({ message: 'Please provide a valid ID!' });
    }

    // if the asset is not null, returns the data object
    res.status(200).send(getAsset)
});


        // GET API FOR ASSET BY ID //
        
// this fuction acts as the GET api reciever that triggers callback prisma call async
app.get('/asset/:id', async (req, res) => {
    const getAsset = await prisma.optical_heads.findMany({
        where: { id: Number(req.params.id) },
        select: {
            id: true,
            name: true,
            type: true,
            dates: {
                select: {
                    date_id: true,
                    change_date: true,
                    locationof: true
                },
                orderBy: {
                    change_date: 'desc',
                }
            }
        }
    })

    // if asset is returned as a null object, sends a error code and message
    if (!getAsset) {
        res.status(418).send({ message: 'Please provide a valid ID!' });
    }

    // if the asset is not null, returns the data object
    res.status(200).send(getAsset)
});


        // POST API FOR OPTICALHEAD //

// this fuction acts as the POST api reciever that triggers callback prisma call async
app.post('/assets/post', async (req, res) => {
    // declares the body parameters as variables
    const { name } = req.body;
    const { type } = req.body;

    // performs prisma create function
    const postAsset = await prisma.optical_heads.create({
        data: {
            name: name,
            type: type
        },
    })

    // if either field is empty, sends a error code and message
    if (!name || !type) {
        res.status(418).send({ message: 'Please provide a valid name and type!' });
    }

    // if the asset is not null, returns the data object
    res.status(200).send({message: 'Entry made!',data: postAsset})
});


        // POST API FOR date BY ID //

// this fuction acts as the POST api reciever that triggers callback prisma call async
app.post('/dates/post', async (req, res) => {

    // declares the body parameters as variables
    const { asset_id } = req.body;
    const { date } = req.body;
    const { location } = req.body;

    // performs prisma create function
    const postAsset = await prisma.dates.create({
        data: {
            change_date: new Date(date),
            locationof: location,
            optical_heads: { connect: {id: asset_id}}
        },
    })

    // if any of the expected fields are empty, sends a error code and message
    if (!date || !asset_id || !location) {
        res.status(418).send({ message: 'Please provide a valid date entry!' });
    }

    // if the asset is not null, returns the data object
    res.status(200).send({message: 'Entry made!',data: postAsset})
});


// // // // 

        // PACTH API FOR ASSET //

// this fuction acts as the POST api reciever that triggers callback prisma call async
app.patch('/assets/patch', async (req, res) => {
    // declares the body parameters as variables
    const { id } = req.body;
    const { name } = req.body;
    const { type } = req.body;

    // performs prisma create function
    const patchAsset = await prisma.optical_heads.update({
        where: {
            id: id
        },
        data: {
            name: name,
            type: type
        },
    })

    // if either field is empty, sends a error code and message
    if (!name || !type) {
        res.status(418).send({ message: 'Please provide a valid name and type!' });
    }

    // if the asset is not null, returns the data object
    res.status(200).send({message: 'Entry made!', data: patchAsset})
});


        // PATCH API FOR date BY ID //

// this fuction acts as the POST api reciever that triggers callback prisma call async
app.patch('/dates/patch', async (req, res) => {

    // declares the body parameters as variables
    const { date_id } = req.body
    const { asset_id } = req.body;
    const { date } = req.body;
    const { location } = req.body;

    // performs prisma update function
    const patchDate = await prisma.dates.update({
        where: {
            date_id: date_id
        },
        data: {
            change_date: new Date(date),
            locationof: location,
        },
    })

    // if any of the expected fields are empty, sends a error code and message
    if (!date || !asset_id || !location) {
        res.status(418).send({ message: 'Please provide a valid date entry!' });
    }

    // if the asset is not null, returns the data object
    res.status(200).send({message: 'Entry made!', data: patchDate})
});


        // DELETE API FOR ASSET BY ID //

// this fuction acts as the POST api reciever that triggers callback prisma call async
app.delete('/asset/delete', async (req, res) => {

    // declares the body parameters as variables
    const { id } = req.body

    // performs prisma delete function
    const deleteAsset = await prisma.optical_heads.delete({
        where: {
          id: id,
        },
      })

    // if any of the expected fields are empty, sends a error code and message
    if (!id) {
        res.status(418).send({ message: 'Please provide a valid id entry!' });
    }

    // if the asset is not null, returns the data object
    res.status(200).send({message: 'Entry deleted!'})
});


        // DELETE API FOR DATE BY ID //

// this fuction acts as the POST api reciever that triggers callback prisma call async
app.delete('/date/delete', async (req, res) => {

    // declares the body parameters as variables
    const { date_id } = req.body

    // performs prisma delete function
    const deleteDate = await prisma.dates.delete({
        where: {
          date_id: date_id,
        },
      })

    // if any of the expected fields are empty, sends a error code and message
    if (!date_id) {
        res.status(418).send({ message: 'Please provide a valid id entry!' });
    }

    // if the asset is not null, returns the data object
    res.status(200).send({message: 'Entry deleted!'})
});