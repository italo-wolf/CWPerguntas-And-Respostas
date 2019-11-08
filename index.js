const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/dataBase");
const PerguntaModel = require("./database/Pergunta");
//database
connection
.authenticate()
.then(()=>{
    console.log("Conexão!");
})
.catch((msgErro)=>{
    console.log(msgErro);
})
//dizer para o express  usar o ejs
app.set('view engine','ejs');//usar o ejs como maquina de html
app.use(express.static('public'));
//bodyParser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Rotas
app.get("/",(req, res)=>{
    PerguntaModel.findAll({raw: true, order:[
        ['id','DESC']//ordenar id decresente
    ]}).then(perguntas =>{
        res.render("index.ejs",{
            perguntas: perguntas
        });
    }) //select banco
    
})
app.get("/perguntar",(req,res)=>{
    res.render("perguntar")
})
app.get("/:nome/:lang",(req, res) =>{
    var name = req.params.nome;
    var lang = req.params.lang;
    res.render("index.ejs",{
        nome: name,
        lang: lang,
        empresa: "CW"
    });
})
app.post("/salvarpergunta",(req,res)=>{
    var titulo = req.body.titulo;
    var desc = req.body.descricao;
    PerguntaModel.create({//insert na tabela
        titulo: titulo,
        descricao: desc
    }).then(()=>{
        res.redirect("/");
    });
});
 app.get("/pergunta/:id",(req, res) =>{
     var id = req.params.id;
     PerguntaModel.findOne({
         where: {id: id}
     }).then(pergunta =>{
        if(perunta != undefined){
            res.render("pergunta",{
                pergunta: pergunta
            });
        }else{
            res.redirect("/");
        }
     });
     
 });


app.listen(8181,()=>{
    console.log("App rodando!");
})
