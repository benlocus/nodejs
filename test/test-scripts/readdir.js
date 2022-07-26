import fs from 'fs';
const { readdirSync, readdir } = fs

readdir('./', (err, files) => {
    if (err) console.log('Error', err);
    else console.log(files);
});
