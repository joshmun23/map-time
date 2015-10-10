var getOrg_id = function(user_id){
	var user = Meteor.users.findOne({_id:user_id});
	var org_id = user.profile.org_id;
	return org_id;
}

Meteor.methods({
	'/user/add': function(data){

		Accounts.createUser({
			email: data.email,
			password: "e29a37014a9c51cffe349bef72a06267",
			profile: { 
				fname: data.fname, 
				lname: data.lname, 
				title: data.title,
				org_id: getOrg_id(this.userId), 
				location_id: data.location_id,
				access_level : data.access_level,
				pin: "1111"
			},
	    });

		return;
	},
	'/user/updateUser': function(user_id,data){

		var user = Meteor.users.findOne({_id:user_id});
		user = user.profile;
		
		var updateData = {
			org_id: user.org_id,
			fname: data.fname,
			lname: data.lname,
			title: data.title,
			location_id: data.location_id,
			img: user.img,
			access_level : data.access_level,
			pin: user.pin,
		}

		Meteor.users.update(
			{_id: user_id},
			{ $set:
				{profile: updateData}
			}
		);
		return;
	},
	'/user/delete': function(user_id){

		Meteor.users.remove({_id: user_id});
		return;
	},
});