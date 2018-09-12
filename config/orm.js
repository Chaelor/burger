//Dependences

const connection = require('./connection');

//Function that will loop through and create an array of ? marks and turns it into a string
function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];
  
    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
      var value = ob[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        
        //This "0" or 'value' is what is breaking it
        arr.push(key + "=" + value);
      }
    }
  
    // translate array of strings to a single comma-separated string
    return arr.toString();
  }

const orm = {
    selectAll: function (tableInput, cb) {
        var queryString = `SELECT * FROM ${tableInput};`;

        connection.query(queryString, (err, res) => {
            if (err) throw err;

            cb(res);
        });
    },
    createOne: function (tableInput, cols, vals, cb) {
        var queryString = `INSERT INTO ${tableInput} (${cols.toString()}) VALUES (${printQuestionMarks(vals.length)}) `;

        console.log(queryString);

        connection.query(queryString, vals, (err, res) => {
            if (err) throw err;

            cb(res);
        });
    },
    updateOne: function (tableInput, colVals, condition, cb) {
        var queryString = `UPDATE ${tableInput} SET ${objToSql(colVals)} WHERE ${condition};`

        console.log(queryString);

        connection.query(queryString, (err, res) => {
            if (err) throw err;

            cb(res);
        });
    },
    deleteOne: function(tableInput, condition, cb){
        var queryString = `DELETE FROM ${tableInput} WHERE ${condition}`;

        console.log(queryString);

        connection.query(queryString, (err, res) => {
            if (err) throw err;

            cb(res);
        })
    }
}

module.exports = orm;