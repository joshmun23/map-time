Location = new Meteor.Collection('location');

Meteor.methods({

	'/location/getForLogin': function(id){
		
		var location = Location.findOne({_id: id});
		return location;
	},	
	'/location/add': function(newData){
		var newLocation = {
			org_id : Meteor.user().profile.org_id,
			created : moment().format('YYYY-MM-DD HH:mm:SS'),
			active : true,
	    };
	    return Location.insert(_.extend(newLocation,newData));

	},
	'/location/updateData': function(id,data){
	    Location.update(id, {$set: _.omit(data,'_id')});
	},
	'/location/delete': function(id){
	    Location.update(id, {$set: {active:false}});
	}
});