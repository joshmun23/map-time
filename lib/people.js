People = new Mongo.Collection('people');


Meteor.methods({

	'/person/update': function (person_id, newData) {
		People.update(person_id, {
			$set: newData
		});
	},
	'/person/add': function (newData) {

		var newPerson = {
			org_id : Meteor.user().profile.org_id,
			location_id : Meteor.user().profile.location_id,
			rating: 100,
			type: "Lead",
			history: ["Created on "+ moment().format('YYYY-MM-DD HH:mm:SS')+ "in system"],
			created: moment().format('YYYY-MM-DD HH:mm:SS'),
		};
	    return People.insert(_.extend(newPerson,newData));
  },

});







