var express = require("express")
var app = express()
var db = require("./database.js")

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var HTTP_PORT = 8000

// Starts server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});

app.use(express.static('public')) // Tells server to use files from the "public"-folder


// Gets list of guitarists from the "guitarists"-table
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

// Gets a list of the available brands

app.get("/api/brands/", (req, res, next) => {
  var sql = "SELECT * FROM brands"
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

// Gets list of guitarists and their endorsement, but will not get guitarists without endorsements.

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

  // Edit function (WORK IN PROGRESS)

  /*
  app.get("/edit/:id/:guitarist_name/:current_band_name/:endorsement",(req,res,next) => {
    var id = req.params.id;
    var g_name = req.params.guitarist_name;
    var c_band = req.params.current_band_name;
    var end = req.params.endorsement;
    var params = [];
    
    db.run(`UPDATE
              guitarists
            INNER JOIN
              guitarist_brand
            ON guitarists.ID = guitarist_brand.guitarist_id
            SET
              guitarist_name = ?,
              current_band_name = ?,
              brand_id = ?
            WHERE
              guitarists.id = ?`, [g_name,c_band,end,id], function(err){
                if(err){
                  return console.log(err.message);
                }
                console.log(`Row ${id} has been updated`)
              })
          res.status(200).send("Updated row " + id);
          });
    */

  // Delete function

  app.get("/delete/:id", (req, res, next) => {
    var id = req.params.id;
    console.log(id);
    var params = []
    db.run(`DELETE FROM guitarists WHERE id=?`, [id], function(err) {
      if (err) {
        return console.error(err.message);
      }
      db.run(`DELETE FROM guitarist_brand WHERE guitarist_id=?`, [id],function(err){
      });
      console.log(`Row(s) deleted`);
    });
    res.status(200).send("Removed guitarist with id " + this.lastID);
    });




// Default message
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});