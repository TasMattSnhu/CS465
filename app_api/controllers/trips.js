const mongoose = require('mongoose');
const Trip = require('../models/travlr');
const Model = Trip;

// GET: /trips - list all trips
const tripsList = async (req, res) => {
  try {
    const q = await Model.find({}).exec();
    if (!q || q.length === 0) {
      return res.status(404).json({ message: 'No trips found' });
    }
    return res.status(200).json(q);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

// GET: /trips/:tripCode - find one by code
const tripsFindByCode = async (req, res) => {
  try {
    const trip = await Model.findOne({ code: req.params.tripCode }).exec();
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    return res.status(200).json(trip);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

// POST: /trips - Adds a new Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsAddTrip = async(req, res) => {
    const newTrip = new Trip({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
    });

    const q = await newTrip.save();

    if(!q)
    { // Database returned no data
        return res
            .status(400)
            .json(err);
    } else { // Return new trip
        return res
            .status(201)
            .json(q);
    }

    // Uncomment the following line to show results of operation
    // on the console
    // console.log(q);
};

// PUT: /trips/:tripCode - Updates an existing Trip 
// Regardless of outcome, response must include HTML status code 
// and JSON message to the requesting client 
const tripsUpdateTrip = async(req, res) => { 
    try {
        // Uncomment for debugging 
        console.log(req.params); 
        console.log(req.body); 
     
        const q = await Model 
            .findOneAndUpdate( 
                { 'code' : req.params.tripCode }, 
                { 
                    code: req.body.code, 
                    name: req.body.name, 
                    length: req.body.length, 
                    start: req.body.start, 
                    resort: req.body.resort, 
                    perPerson: req.body.perPerson, 
                    image: req.body.image, 
                    description: req.body.description 
                }  
            ) 
            .exec(); 
             
        if(!q) { 
            // Database returned no data 
            return res 
                .status(404) 
                .json({message: 'Trip not found'}); 
        } else { 
            // Return resulting updated trip 
            return res 
                .status(200) 
                .json(q); 
        }
    } catch(e) {
        return res
            .status(500)
            .json({message: e.message});
    }
};

module.exports = {
  tripsList,
  tripsFindByCode,
  tripsAddTrip,
  tripsUpdateTrip
};
