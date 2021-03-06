const Cafe = require('../models/cafe');
const mongoose = require('mongoose');

const index = async (req, res) => {
  const query = await Cafe.find({});
  query instanceof mongoose.Query;
  const docs = await query;
  res.send(docs);

  return res;
}

const create = async (req, res) => {
  console.log("Test...");
  const { name, location, websiteURL, reviews } = req.body;

  const newCafe = new Cafe({
    name,
    location,
    websiteURL,
    reviews
  })

  newCafe.save()
    .then(() => res.json('Cafe added!'))
    .catch(err => res.status(400).json('Error: ' + err));
}

const deleteCafe = async (req, res) => {

  Cafe.findByIdAndDelete(req.params.id)
    .then(() => res.json('Cafe deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
};

const findOneCafe = async (req, res) => {
  console.log("Cafe id: ", req.params.id);

  Cafe.findById(req.params.id)
    .then(cafe => res.json(cafe))
    .catch(err => res.status(400).json('Error: ' + err));
};

const findCafeByName = async (req, res) => {
  const {name} = req.params;
  // const regexpress = new RegExp(`^${name}$`);
  Cafe.find({ "name": { "$regex": name, "$options": "i" }})
  .then(cafe => res.json(cafe))
  .catch(err => res.status(400).json('Error: ' + err));
}

const findCafeByLocation = async (req, res) => {
  const {location} = req.params;
  // const regexpress = new RegExp(`^${name}$`);
  Cafe.find({ "location": { "$regex": location, "$options": "i" }})
  .then(cafe => res.json(cafe))
  .catch(err => res.status(400).json('Error: ' + err));
}

module.exports = { index, create, deleteCafe, findOneCafe, findCafeByName, findCafeByLocation }