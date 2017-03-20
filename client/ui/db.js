var faker = require('faker');

module.exports = function() {
  var data = { person: [] };
  // Create 100 users
  for (var i = 0; i < 100; i++) {
    // data.person.push({ id: i, firstName: 'user' + i , middleName: 'm' + 1, lastName: 'last' + i});
    data.person.push({
      "id": i,
      "firstName": faker.name.firstName(),
      "middleName": "Q",
      "lastName": faker.name.lastName(),
      "birthday": faker.date.past(),
      "gender": "MALE",
      "ethnicity": "CAUCASIAN",
      "deceased": false
    });
  }
  return data
};
