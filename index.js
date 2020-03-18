const{bd_config}= require("./config.json");
const Pool = require("pg").Pool;
const pool = new Pool(bd_config);

const express = require('express');

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

//    Rotas API com Database

app.get("/dentistas",(req,res)=>{
    pool.query("SELECT * FROM dentistas",(error,results)=>{
            if(error){
                throw error;
            }
            res.json(results.rows);
    });
});

app.get("/dentistas/:id",(req,res) =>{
    const id = parseInt(req.params.id);

    pool.query(
        "SELECT * FROM dentistas WHERE id = $1",
        [id],
        (error,results) => {
            if (error){
                throw error;
            }
            res.json(results.rows);
        }
    );
});

app.delete("/dentistas/:id",(req,res) =>{
    const id = parseInt(req.params.id);

    pool.query(
        "DELETE FROM dentistas WHERE id = $1",
        [id],
        (error,results) => {
            if (error){
                throw error;
            }
            res.send(`Dentista deletado com ID: ${id}` );
        }
    );
});

app.put("/dentistas/:id",(req,res) =>{
    const id = parseInt(req.params.id);
    const {
        nome, endereco
        }= req.body;
    pool.query(
        "UPDATE dentistas SET nome = $2, endereco = $3 WHERE id = $1",
        [id, nome, endereco],
        (error,results) => {
            if (error){
                throw error;
            }
            res.status(201).send(`Dentista alterado com id: ${id}`);
        }
    );
});

app.post("/dentistas",(req,res) =>{
    const {nome, telefone, endereco, cro
        }= req.body;
    pool.query(
        "INSERT INTO dentistas (nome, telefone, endereco, cro) VALUES($1, $2, $3, $4)",
        [nome,telefone,endereco,cro],
        (error,results) => {
            if (error){
                throw error;
            }
            res.status(201).send(`Dentista adicionado com id: ${results.insertId}`);

        }
    );
});
/* Termino tabela dentistas
e 
Inicio tabela Pacientes*/

app.get("/pacientes",(req,res)=>{
    pool.query("SELECT * FROM pacientes",(error,results)=>{
            if(error){
                throw error;
            }
            res.json(results.rows);
    });
});

app.get("/pacientes/:id",(req,res) =>{
    const id = parseInt(req.params.id);

    pool.query(
        "SELECT * FROM pacientes WHERE id = $1",
        [id],
        (error,results) => {
            if (error){
                throw error;
            }
            res.json(results.rows);
        }
    );
});

app.delete("/pacientes/:id",(req,res) =>{
    const id =  parseInt(req.params.id);

    pool.query(
        "DELETE FROM pacientes WHERE id = $1",
        [id],
        (error, results) => {
            if(error){
                throw error;
            }
            res.send(`Paciente deletado com o ID: ${id}`);
        }
    );
});

app.put("/pacientes/:id",(req,res) =>{
    const id = parseInt(req.params.id);
    const{
        nome, idade
        }= req.body;
    pool.query(
        "UPDATE pacientes SET nome = $2, idade = $3 WHERE  id = $1",
        [id, nome, idade],
        (error, results) => {
            if(error){
                throw error;
            }
            res.status(201).send(`Paciente alterado com id: ${id}`);
        }
    );
});

app.post("/pacientes",(req,res) =>{
    const{nome, idade, cpf
        }=req.body;
    pool.query(
        "INSERT INTO pacientes (nome, idade, cpf) VALUES ($1, $2, $3 )",
        [nome, idade, cpf],
        (error,results) =>{
            if(error){
                throw error;
            }
            res.status(201).send(`Paciente adicionado com id: ${results.insertID}`);
        }
    );
});

//    INICIO DAS ROTAS DE AGENDAMENTOS

app.get("/agendamentos",(req,res)=>{
    pool.query("SELECT * FROM ",(error,results)=>{
            if(error){
                throw error;
            }
            res.json(results.rows);
    });
});

app.listen(3333),() =>{
    console.log("App running on port 3333.")
};

