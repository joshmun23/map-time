Agreement = new Meteor.Collection('agreement');

Meteor.methods({
	'/agreement/add': function(name){

		var Exists = Agreement.findOne({name: name});
		if(Exists){
			throw new Meteor.Error("That agreement already exists.");
		}
		var newAgreement = {
			org_id : Meteor.user().profile.org_id,
			name: name,
			created: new Date(),
			options: [
				{
		            "name" : "",
		            "total_price" : 0,
		            "min_down" : 0,
		            "num_payments" : 1,
		            "term_length" : 1,
		            "term_interval" : "months",
				}
			],			
	    };
		var _id = Agreement.insert(newAgreement);
		return _.extend(newAgreement,{_id: _id});
	},	
	'/agreement/delete': function(agree_id){

		Agreement.remove(agree_id);
		return;
		
	},
	'/agreement/saveOptions': function (agree_id,options){

		var agreement = Agreement.findOne(agree_id);
		if(!agreement){

			throw new Meteor.Error("That agreement doesn't exist.");
		}

		Agreement.update(agree_id, {
			$set : {options: options},
		});
		return;

	},
	'/agreement/saveAgreeOrder': function (program_name,agreements){

		agreements.map(function(agreement,index){
			if(agreement.deleted && agreement._id){
				Agreement.remove(agreement._id);
			}
			if(!agreement._id && agreement.name.length > 1){
				var newagreement = {
					name: agreement.name,
					org_id : Meteor.user().profile.org_id,
					program_name: program_name,

			    };
			    Agreement.insert(_.extend(agreement,newagreement));
			    return;
			} 
			if(agreement._id) {

				var updatedAgree = _.omit(agreement, '_id','program_name');
				console.log(updatedAgree);

				Agreement.update(agreement._id, {
					$set: updatedAgree,
				});
				return;
			}
			return;
		});
	},

});