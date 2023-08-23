require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let Person = require('./model');

const createAndSavePerson = (done) => {
  let newPerson = new Person({
    name: "John",
    age: 25,
    favoriteFoods: ["apple", "chips"],
  });
  newPerson.save((err, data) => {
    if (err) {
      console.log("Error saving document: ", err);
      return done(err);
    }
    console.log('Document saved succesfully: ', data);
    return done(null, data);
  })
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) {
      console.error("Error creating people: ",err);
      return done(err);
    }
  console.log("People created succesfully: ", people);
  return done(null, people);
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({name:personName}, (err, people) => {
    if (err) {
      console.error("Error finding people: ", err);
      return done(err);
    };
    return done(null, people);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods:food}, (err, people) => {
    if (err) {
      console.error("Error finding people: ", err);
      return done(err);
    };
    return done(null, people);
  });
  
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, people) => {
    if (err) {
      console.error("Error finding people: ", err);
      return done(err);
    }
    return done(null, people);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  findPersonById(personId, (err, person) => {
    if (err) {
      console.error("Error finding people: ", err);
      return done(err);
    }
    person.favoriteFoods.push(foodToAdd);

    person.save((err, updatedPerson) => {
      if (err) {
        console.error("Error saving person: ", err);
        return done(err);
      }
      return done(null, updatedPerson);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedPerson) => {
    if (err) {
      console.error("Error updated person: ", err);
      return done(err);
    }
    return done(null, updatedPerson);
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, deletedPerson) => {
    if (err) {
      console.error("Error deleting person: ", err);
      return done(err);
    };
    return done(null, deletedPerson);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, result) => {
    if (err) {
      console.error("Error removing people: ", err);
      return done(err);
    };
    return done(null, result);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch})
  .sort('name')
  .limit(2)
  .select('-age')
  .exec((err, data) => {
    if (err) {
      console.error("Error querying data: ", err);
      return done(err);
    };
    return done(null, data);
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
