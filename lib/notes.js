Notes = new Meteor.Collection('notes');


Meteor.methods({
	'/notes/add': function (member_id, note) {
		var newNote = {
			org_id : Meteor.user().profile.org_id,
			person_id : member_id,
			timestamp : moment().format('YYYY-MM-DD HH:mm:SS'),
			note : note,
	    };
	    var noteId = Notes.insert(newNote);
	    return noteId;
	}
})