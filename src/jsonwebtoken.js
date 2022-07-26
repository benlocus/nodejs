import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { application } from 'express';

// const cleanID = 'AILNFE4634Fx342FJHD';
// const email = 'ben@locusdev.io';
// const saltRounds = 10;
let payload = {
    email: 'ben@locusdev.io',
    id: 'AILNFE4634Fx342FJHD'
}
const key = 'elmhirst'

// // // // //

export const generateToken = (payloadObj, privateKey) => {
    const { email } = payloadObj
    const { id } = payloadObj
    
    let userToken = jwt.sign(
        { payload: {
            email: email,
            id: id,
        } }, 
        key,
        { expiresIn: '4h' }
        );
    return userToken
    };
    
    const sessionJwt = generateToken(payload, key);
    
    // const salt = bcrypt.genSaltSync(saltRounds);
    // const hash = bcrypt.hashSync(cleanID, salt);
// // // // // 
// app.use((req, res, next) => {
//     const { token } = req.body
  
//     if (!token) {
//       return res.status(403).send("A token is required for authentication");
//     }
//     try {
//       const decoded = jwt.verify(token, key);
//       req.user = decoded;
//     } catch (err) {
//       return res.status(401).send("Invalid Token");
//     }
//     return next();
//   });

const decoded = jwt.verify(sessionJwt, key);
console.log(decoded.payload)
// const encodedID = decoded.payload.password
// bcrypt.compareSync(cleanID, encodedID) // checks the clean ID against the encoded ID
