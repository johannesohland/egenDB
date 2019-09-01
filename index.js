'use strict';
const excelToJson = require('convert-excel-to-json');
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('base.db');
const result = excelToJson({
    sourceFile: '2019.xls'
});
//console.log(result);

//console.log(result.Sheet1[0].A);
//FUNKAR console.log(result.k1[0].A);
//console.log(result.k1[0].A, result.k1[0].B, result.k1[0].C);
for (var i = 0; i < 10; i++) {
    console.log(
        result.k1[i].A + " : " +
        result.k1[i].B + " : " +
        result.k1[i].C + " : " +
        result.k1[i].D + " : " +
        result.k1[i].E + " : " +
        result.k1[i].F + " : " +
        result.k1[i].G + " : " +
        result.k1[i].H + " : " +
        result.k1[i].I
    );
}
//console.log(result.k1);
var sql = "INSERT INTO cars (make) VALUES(" + result.k1[i].A + ")";

// insert one row into the langs table
db.run(`INSERT INTO cars(make) VALUES(?,?)`, [result.k1[i].A,], function (err) {
    if (err) {
        return console.log(err.message);
    }
    // get the last insert id
    console.log(`A row has been inserted with rowid ${this.lastID}`);
});

// close the database connection
db.close();