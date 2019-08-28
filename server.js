var express = require("express")
var app = express()
var db = require("./database.js")

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var HTTP_PORT = 8000

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});

app.use(express.static('public'))

app.get("/api/guitarists/", (req, res, next) => {
  var sql = "select * from guitarists"
  var params = []
  db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.json({
          "message":"success",
          "data":rows
      })
    });
});

// Get full base

app.get("/api/guitarist_brand", (req, res, next) => {
    var sql = "SELECT * FROM guitarists INNER JOIN brands ON guitarists.ID = guitarist_brand.guitarist_id INNER JOIN guitarist_brand ON guitarist_brand.brand_id = brands.id"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
  });

  // Add function

  app.get("/add/:guitarist_name/:current_band_name/:endorsement", (req, res, next) => {
    var g_name = req.params.guitarist_name;
    var c_band = req.params.current_band_name;
    var end = req.params.endorsement;
    console.log(g_name,c_band);
    var params = []
    db.run(`INSERT INTO guitarists(guitarist_name,current_band_name) VALUES(?,?)`, [g_name,c_band], function(err){
      db.run(`INSERT INTO guitarist_brand(guitarist_id,brand_id) VALUES(?,?)`, [this.lastID, end]);
      if(err){
        return console.log(err.message);
      }
      console.log(`A row has been inserted with rowid ${this.lastID}`)
    })
  })

  // Delete function

  app.get("/api/delete/:id", (req, res, next) => {
    var sql = "DELETE FROM guitarists WHERE id=?"
    var params = [req.params.make]
    db.all(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.json({
          "message":"success",
          "data":row
      })
    });
  });


app.get("/api/guitarists/make/", (req, res, next) => {
    var sql = "select make from guitarists"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});

app.get("/api/guitarists/model/", (req, res, next) => {
    var sql = "select model from guitarists"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});



app.get("/api/user/:id", (req, res, next) => {
    var sql = "select * from user where id = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        })
      });
});

// Root path
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});