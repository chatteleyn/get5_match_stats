var express = require('express');
var app = express();
var port = 8000;

app.use(express.static("public"));
app.use(express.json({limit:"1mb"}));

var mysql = require('mysql');

app.get("/api_players", (request,response) => {
    var matchid = request.query.matchid || 0;
    var db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'get5'
    });

    db.connect(error => {
        if(error) console.log("Error: Connection to the database failed");
        else{
            var data = {};
            var qry = "SELECT * FROM get5_stats_players WHERE matchid="+matchid+";";
            db.query(qry, (error,result) => {
                if(error) response.json({ "error": error });
                else response.json(result);
            });
        }
    });
});


app.get("/api_match", (request,response) => {
    var matchid = request.query.matchid || 0;
    var db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'get5'
    });

    db.connect(error => {
        if(error) console.log("Error: Connection to the database failed");
        else{
            var data = {};
            var qry = "SELECT * FROM get5_stats_matches WHERE matchid="+matchid+";";
            db.query(qry, (error,result) => {
                if(error) response.json({ "error": error });
                else response.json(result);
            });
        }
    });
});

app.listen(port, () => {
    console.log('Server app listening on port ' + port);
});