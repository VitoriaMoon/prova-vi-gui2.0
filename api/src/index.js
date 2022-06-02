import 'dotenv/config'

import usuariocontroller from './controller/usuariocontroller.js' 
import filmecontroller from './controller/filmecontroller.js'
import express from 'express'
import cors from 'cors'
///

const server = express();
///

server.use(cors());
server.use(express.json());
server.use('/storage/capasfilmes', express.static('storage/capasfilmes'))
server.use(usuariocontroller); server.use(filmecontroller);
///
server.listen(process.env.PORT,
                () => console.log(`API ta on na porta ${process.env.PORT} bb `));