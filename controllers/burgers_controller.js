//dependencies
const express = require('express');
const burger = require('../models/burgers');
const router = express.Router();

//Get root, display all things in the db
router.get("/", function(req, res){
    burger.selectAll(function(data){
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

//Post a new (probably yucky beef) burger
router.post("/api/burgers", function(req, res){
    burger.createOne([
        "burger_name", "devoured"
    ], [
        req.body.burger_name, req.body.devoured
    ], function(result){
        res.json({id: result.insertId});
    });
});

//Update a devoured state of a burger
router.put("/api/burgers/:id", function(req, res) {
    var condition = `id = ${req.params.id}`;

    console.log("condition: " + condition);

    burger.updateOne(
        {
            devoured: req.body.devoured
        },
        condition,
        function(result){
            if(result.changedRows == 0){
                return res.status(404).end();
            }
            res.status(200).end();
        }
    );
});

router.delete('/api/burgers/:id', function(req, res) {
    var condition = `id = ${req.params.id}`;

    console.log(`condition: ${condition}`);

    burger.deleteOne(condition, (result) => {
        if (result.affectedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    })
})

module.exports = router;