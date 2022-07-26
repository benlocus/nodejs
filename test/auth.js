import jwt from 'jsonwebtoken';
const KEY = '$2b$10$CFHSbGM6yjPy8bYBEo3iVuK4aMUyWtz427hQHVdTtt2dBeFe3d3GK';


// API that creates a session token ID when a user logs in and sends the information back to bubble to be stored
app.post('/auth', async (req, res) => {
    const { email } = req.body
    const { id } = req.body

    const payload = {
        email: email,
        id: id,
    } 

    let userToken = jwt.sign(
        { payload: payload }, 
        KEY,
        { expiresIn: '4h' }
        );

    // if either field is empty, sends a error code and message
    if (!(email || id)) {
        res.status(418).send({ message: 'Please provide a valid name and type!' });
    }

    const upsertUser = await prisma.user.upsert({
        where: {
            id: id
        },
        update: {
            id: id,
        },
        create: {
            id: id,
            email: email
        }
    })

    // if the asset is not null, returns the data object
    res.status(200).send({message: 'Session initialized', data: userToken})
});

// middlware that requires an access token to be held
// app.use((req, res, next) => {
//     const { token } = req.header
//     const decodedToken = jwt.verify(sessionJwt, KEY);
    
//     const findUser = await prisma.user.findUnique({
//         where: {
//           email: 'elsa@prisma.io',
//         },
//       })

//     if (findUser.id === decodedToken.id) {
//         console.log('User authenticated');
//         next()
//     } else {
//         const err = new Error('Not authorized! Go back!');
//         err.status = 400;
//         next(err);
//     }

//   })