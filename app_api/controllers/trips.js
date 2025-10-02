const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Register model
const Model = mongoose.model('trips');

//GET: /trips - list all trips
//Regardless of outcome, response must include HTML status code
//and JSON message to the requesting client
const tripsList = async(req, res) => {
    const q = await Model
        .find({}) //no filter, return all rows
        .exec();
    
        // uncomment the following lines to show the results of the query
        // on the console
        // console.log(q);

    if (!q) 
    { //database returns no data 
        return res
                .status(404)
                .json(err);
    } else { // return resulting trip list
        return res
            .status(200)
            .json(q);
    }
};

const tripsFindByCode = async(req, res) => {
    const q = await Model
        .find({'code' : req.params.tripCode}) //no filter, return all rows
        .exec();
    
        // uncomment the following lines to show the results of the query
        // on the console
        // console.log(q);

    if (!q) 
    { //database returns no data 
        return res
                .status(404)
                .json(err);
    } else { // return resulting trip list
        return res
            .status(200)
            .json(q);
    }
};

module.exports = {
    tripsList,
    tripsFindByCode
};