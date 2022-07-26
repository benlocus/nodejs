// imports the neccessary prisma objects
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// importst the assetData array of objects from the asset-data file
import { assetData } from './asset-data.js';

const importAlgorithim = async (assetType) => {

    // iterates over each asset object in the arrary
    for (let assetObj of assetData) {

        // sets asset_name to be the equipment value
        const { Equipment: asset_name } = assetObj
        
        // sets the asset_id var to be the returned value of a search by the asset_name
        let asset_id = await prisma.optical_heads.findFirst({
            where: {
                name: asset_name
            },
            select: {
                id: true
            }
        });

        // if asset ID doesn't exist, create the new entry and set asset_id = to the returned id
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

        // extracts the number of the asset_id object and sets the var = to it
        asset_id = Object.values(asset_id)[0]
    

        // iterates over the columns in the assetObj
            // initializes some variables that are referenced throughout the loop
            let dateArr = [];
            let prevLoc = "";

            for (let dateLoc in assetObj) {
                if (!assetObj[dateLoc] && dateLoc !== 'Equipment') {
                    if (prevLoc) {
                        dateArr.push({
                            asset_id: asset_id,
                            locationof: null,
                            change_date: new Date(dateLoc)
                        })
                        prevLoc = null
                    }
                }

                // if the column has a value and the title is a date
                else if (assetObj[dateLoc] && dateLoc !== 'Equipment') {
                    // adds the item to the dateArr if the location has changed compared to the previous item
                    if (assetObj[dateLoc] !== prevLoc) {
                        // let date = new Date(dateLoc)
                        // date.setDate(date.getDate() + 1);
                        dateArr.push({
                            asset_id: asset_id,
                            locationof: assetObj[dateLoc],
                            change_date: new Date(dateLoc)
                        })
                        prevLoc = assetObj[dateLoc]
                    }
                }
            } // end of for loop over date columns

            // creates the date entries with the dateArr as the value array
        const updatedEntry = await prisma.dates.createMany({
            data: dateArr //some variable
        })
            

        } // end of for loop over assetObj
        return 'Import completed!'
} // end of function

// runs the function
importAlgorithim('optical-head')
