var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var router = express.Router();
var workRepositorie = require("./Repositorie");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  if(req.originalUrl == '/server.js'){
    res.end("nope");
    return false;
  }
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
}).use(express.static(__dirname));

workRepositorie.registerAll(router);

router.get("/", function (req, res) {
	res.json({ "erro": false, "mensagem": "Hoje e dia de alegria" });
});

app.use('/', router);
app.listen(8086);
console.log("Listening to port 8086 at 127.0.0.1");
