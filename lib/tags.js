Tags = new Meteor.Collection('tags');


Meteor.methods({

	'/tag/add': function (name,category) {

		var newTag = {
			org_id : Meteor.user().profile.org_id,
			name: name,
			category: category,
			created: new Date(),
		};

	    return Tags.insert(newTag);
  },

});







