// imports the necessary express objects
import express from 'express';
const app = express();
const PORT = 3000;

// imports the neccessary prisma objects
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// imports the assetData array of objects from the asset-data file
import { assetData } from './asset-data.js';

// allows express to parse JSON objects recieved
app.use( express.json() )

export const importAlgorithim = async (assetSource, assetType) => {
    for (let assetObj of assetSource) {
        const { Equipment: asset_name } = assetObj
        console.log(asset_name)
        let asset_id = await prisma.optical_heads.findFirst({
            where: {
                name: asset_name
            },
            select: {
                id: true
            }
        });
        if (!asset_id) {
            asset_id = await prisma.optical_heads.create({
                data: {
                    name: asset_name,
                    type: assetType,
                    },
                select: {
                    id: true
                }
            })
            
        }
        asset_id = Object.values(asset_id)[0]
            let dateArr = [];
            let prevLoc = "";

            for (let dateLoc in assetObj) {
                if (assetObj[dateLoc] && dateLoc !== 'Equipment') {
                    if (assetObj[dateLoc] !== prevLoc) {
                        dateArr.push({
                            asset_id: asset_id,
                            locationof: assetObj[dateLoc],
                            change_date: new Date(dateLoc)
                        })
                        prevLoc = assetObj[dateLoc]
                    } 
                }
            }
        const updatedEntry = await prisma.dates.createMany({
            data: dateArr
        })
            

        }
        console.log('Import completed!')
}
