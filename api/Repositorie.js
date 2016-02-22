var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();
var mongoDB = require("./DataBase");


function newList(router)
{
    router.route("/list").post(function(req,res){
        var response = {};
        var db = new mongoDB.list();

        db.description = req.body.description;
        db.user_id = req.body.user_id;

        db.save(function(err){
        if(err) {
                response = {"erro" : true,"mensagem" : "Erro ao adicionar dados"};
            } else {
                response = {"erro" : false,"message" : "Dados adicionados", "data":db};
            }
      res.json(response);

        });
    });
}


function listByUser(router)
{

router.route("/list").get(function(req,res){
  var response = {};

  var db = new mongoDB.list();


    mongoDB.list.find({user_id : req.query.user_id},function(err,data){
      if (err)
      {
              response = {"erro" : true,"mensagem" : "Erro ao listar dados"};
      }
      else {
          response = {"erro" : false,"message" : "consulta efetuada", "data":data};
      }

      res.json(response);
    });

    });
}

function newTask(router)
{
    router.route("/task").post(function(req,res){
        var response = {};
        var db = new mongoDB.task();

        db.description = req.body.description;
        db.list_id = req.body.list_id;

        db.save(function(err){
        if(err) {
                response = {"erro" : true,"mensagem" : "Erro ao adicionar dados"};
            } else {
                response = {"erro" : false,"message" : "Dados adicionados", "data":db};
            }
      res.json(response);

        });
    });
}

function taskByList (router)
{

router.route("/task").get(function(req,res){
  var response = {};

  var db = new mongoDB.task();

    mongoDB.task.find({list_id : req.query.list_id},function(err,data){
      if (err)
      {
              response = {"erro" : true,"mensagem" : "Erro ao listar dados"};
      }
      else {
          response = {"erro" : false,"message" : "consulta efetuada", "data":data};
      }

      res.json(response);
    });

    });
}

module.exports = {
    registerAll : function(router){
        newList(router);
        newTask(router);
        taskByList(router);
        listByUser(router);
    }
}
