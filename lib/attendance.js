Attendance = new Meteor.Collection('attendance');

Meteor.methods({
	'/checkin/add': function (person_id,class_id,class_count){
		
		var latestClass = Attendance.findOne({person_id:person_id,class_id:class_id},{sort: {timestamp: -1, limit: 1,}});
		if(latestClass == undefined || moment().diff(latestClass.timestamp, 'minutes') > 45){

			var newAttendance = {
				org_id : Meteor.user().profile.org_id,
				location_id : Meteor.user().profile.location_id,
				person_id : person_id,
				class_id : class_id,
				class_count: class_count,
				timestamp: new Date(),
		    };
		    if(latestClass){
		    	newAttendance.class_count = latestClass.class_count - 1;
		    }
			Attendance.insert(newAttendance);
		    return newAttendance.class_count;
		}
		return class_count -1;
	},
});
