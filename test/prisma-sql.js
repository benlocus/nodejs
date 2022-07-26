import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const newAsset = (name, type) => prisma.optical_heads.create({
    data: {
        name: name,
        type: type
    }
})


const getAsset = async (id) => await prisma.optical_heads.findMany({
    where: { id: id },
        select: {
            name: true,
            type: true,
            dates: {
                select: {
                    change_date: true,
                    locationof: true
                },
                orderBy: {
                    change_date: 'desc',
                }
            }
        }
})

// await newAsset('SP1-TRI-20101', 'COREs');
const returnedAsset = await getAsset(2576);
console.log(returnedAsset);
