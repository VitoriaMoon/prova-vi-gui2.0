import { alterarfilme, alterarimagem, buscarporid, buscarpornome, inserirfilme, listartodosfilmes, removerfilme } from '../repository/filmerepository.js'

import multer from 'multer'
import { Router } from 'express'

const server = Router();
const upload = multer({ dest: 'storage/capasFilmes' })


server.post('/filme', async (req, resp) =>{
    try {
        const filme = req.body;


        if (!filme.nome) {
            throw new Error('Nome do filme é obrigatorio!');
        }

        if (!filme.sinopse) {
            throw new Error('Sinopse do filme é obrigatorio!');
        }

        if(filme.avaliacao == undefined || filme.avaliacao < 0){
          throw new Error ('Avaliação do filme é obrigatorio!')
        }

        if (!filme.lancamento) {
            throw new Error('Lancamento do filme é obrigatorio!');
        }

        if (filme.disponivel == undefined) {
            throw new Error('Campo Disponivel é obrigatorio!');
        }

        if (!filme.usuario) {
            throw new Error('Usuário não logado!');
        }
        

       const filmeinserir = await inserirfilme(filme);

       resp.send(filmeinserir)
    } 
    catch (err) {
        resp.status(400).send({
            erro:err.message
        })
    }
})

server.put('/filmes/:id/capa', upload.single('capa') , async (req, resp) => {
    try {
        const { id } = req.params;
        const imagem = req.file.path;

        const resposta = await alterarimagem(imagem, id);
        if (resposta != 1) {
            throw new Error('tem alguma coisa errada ai amigão')
        }

        resp.status(204).send();
    } catch (err) {
        resp.status(400).send({
            erro:err.message
        })
    }
})

server.get('/filmes', async (req, resp) => {
    try {
        const resposta = await listartodosfilmes();
        resp.send(resposta);

    } 
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.get('/filmes/busca', async (req, resp) => {
    try {
        const {nome} = req.query ;

        const resposta = await buscarpornome(nome);
  
        if (resposta.length == 0) {
            throw new Error('vc tá maluco meu?')
        }

        resp.send(resposta);
    } 
    catch (err) {
        resp.status(400).send({
            erro: err.message 
        })
    }
})

server.get('/filmes/:id', async (req, resp) => {
    try {
        const id = Number ( req.params.id );

        const resposta = await buscarporid(id);
  
        if (!resposta) {
            throw new Error('vc tá maluco meu?')
        }

        resp.send(resposta);
    } 
    catch (err) {
        resp.status(400).send({
            erro: err.message 
        })
    }
})

server.delete('/filmes/:id', async (req, resp) => {
    try {
        const { id } =req.params;

        const resposta = await removerfilme(id);

        if (resposta != 1) {
            throw new Error ('tem alguma coisa errada ai amigão')
        }

        resp.status(204).send();
    } 
    catch (err) {
        resp.status(400).send({
            erro: err.message 
        })
    }
})

server.put('/filmes/:id', async (req,resp) => {
    try {
        const { id } = req.params;
        const filme = req.body;

        if (!filme.nome) {
            throw new Error('Nome do filme é obrigatorio!');
        }

        if (!filme.sinopse) {
            throw new Error('Sinopse do filme é obrigatoria!');
        }

        if(filme.avaliacao == undefined || filme.avaliacao < 0){
          throw new Error ('Avaliação do filme é obrigatorio!')
        }

        if (!filme.lancamento) {
            throw new Error('Lançamento do filme é obrigatorio!');
        }

        if (filme.disponivel == undefined) {
            throw new Error('Campo Disponivel é obrigatorio!');
        }

        if (!filme.usuario) {
            throw new Error('Usuário não está logado');
        }
        

        const resposta = await alterarfilme(id, filme);
        if (resposta != 1) {
            throw new Error ('tem alguma coisa errada ai amigão');
            
        }
        else{
            resp.status(205).send();
        }
    } 
    catch (err) {
        resp.status(400).send({
            erro: err.message 
        })
    }
})


export default server;