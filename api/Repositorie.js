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

function updateTask(router) {
  router.route("/task").put(function(req,res){
    var response = {};
    mongoDB.task.findOneAndUpdate({_id : req.body.task_id}, {complete : req.body.complete},{upsert:false}, function(err,data){
      if (err)
      {
              response = {"erro" : true,"mensagem" : "Erro ao atualizar dados"};
      }
      else {
          response = {"erro" : false,"message" : "dados atualizados com sucesso", };
      }
      res.json(response);

    });
  });
}

function deleteList(router)
{
    router.route("/list").delete(function(req,res){
        var response = {};
        var db = new mongoDB.list();
        var _lista = null;

        console.log(req.body.list_id);
        //localiza a lista
        mongoDB.list.findOne({_id : req.query.list_id},function(err, lista)
        {
          //verifica se encontrou a lista
          if (lista == null)
          {
              response = {"erro" : true,"mensagem" : "Erro ao remover dados, id não encontrado"};
              res.json(response);
              return;
          }
          //remove a lista efetivamente
          lista.remove(function(err){
            if (err)
            {
              response = {"erro" : true,"mensagem" : "Erro ao remover dados, throw err"};
            }
            else {
              response = {"erro" : false,"mensagem" : "Dados removidos"};
            }
            res.json(response);
          });
        });

    });
}

function deleteTask(router)
{
    router.route("/task").delete(function(req,res){
        var response = {};
        var db = new mongoDB.task();



        //localiza a task
        mongoDB.task.findOne({_id : req.query.task_id},function(err, task)
        {
          //verifica se encontrou a lista
          if (task == null)
          {
              response = {"erro" : true,"mensagem" : "Erro ao remover dados, id não encontrado"};
              res.json(response);
              return;
          }
          //remove a task efetivamente
          task.remove(function(err){
            if (err)
            {
              response = {"erro" : true,"mensagem" : "Erro ao remover dados, throw err"};
            }
            else {
              response = {"erro" : false,"mensagem" : "Dados removidos"};
            }
            res.json(response);
          });
        });

    });
}

function getMemo(router)
{
  router.route("/memo").get(function(req,res){
    var response = {};

    mongoDB.memo.findOne({user_id : req.query.user_id},function(err,data){

      if (err)
      {
        response = {"erro":true,"mensagem" : "Erro ao buscar dados"}
      }
      else {
        response = {"erro":false,"mensagem" : "dados retornados", "data" : data}
      }
      res.json(response);
    });
  });
}
function updateMemo(router) {
  router.route("/memo").put(function(req,res){
    var response = {};

    var obj = new mongoDB.memo();

    obj.user_id = req.body.user_id;
    obj.text = req.body.text;

    mongoDB.memo.remove({user_id : req.body.user_id},function(err,data){});

    obj.save(function(err,data){
      if (err)
      {
              response = {"erro" : true,"mensagem" : "Erro ao atualizar dados"};
      }
      else {
          response = {"erro" : false,"message" : "dados atualizados com sucesso", };
      }
      res.json(response);

    });
  });
}

function getPomodoro(router)
{
  router.route("/pomodoro").get(function(req,res){
    var response = {};

    mongoDB.pomodoro.findOne({user_id : req.query.user_id},function(err,data){

      if (err)
      {
        response = {"erro":true,"mensagem" : "Erro ao buscar dados"}
      }
      else {
        response = {"erro":false,"mensagem" : "dados retornados", "data" : data}
      }
      res.json(response);
    });
  });
}

function updatePomodoro(router) {
  router.route("/pomodoro").put(function(req,res){
    var response = {};

    var obj = new mongoDB.pomodoro();

    obj.user_id = req.body.user_id;
    obj.work = req.body.work;
    obj.relax = req.body.relax;

    mongoDB.pomodoro.remove({user_id : req.body.user_id},function(err,data){});

    obj.save(function(err,data){
      if (err)
      {
        throw err;
              response = {"erro" : true,"mensagem" : "Erro ao atualizar dados"};
      }
      else {
          response = {"erro" : false,"message" : "dados atualizados com sucesso", };
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
        deleteList(router);
        deleteTask(router);
        updateTask(router);
        updateMemo(router);
        getMemo(router);
        updatePomodoro(router);
        getPomodoro(router);
    }
}
