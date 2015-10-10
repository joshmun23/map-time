Program = new Meteor.Collection('program');


Meteor.methods({
	'/program/add': function (program_name){
		var Exists = Program.findOne({name: program_name});
		if(!Exists){
			var newProgram = {
				org_id : Meteor.user().profile.org_id,
				name: program_name,
				created: new Date(),
				agreements: [],
				family_pricing: [0,0,0,0],
				ranks: [
					{
						name: "Participant",
						required_classes : 0,
						hex_color: "cccccc",
					},

				],
		    };
			return Program.insert(newProgram);
		}
		return Exists._id;
	},
	'/program/delete': function (program_id){
		Program.remove(program_id);
		return;
	},
	'/program/saveRankOrder': function (program_id,ranks){

		var rank_data = [];
		_.each(ranks,function(rank){
			if(!rank.deleted){
				rank_data.push(rank);
			}
		});

		Program.update(program_id, {
			$set: {
				ranks: rank_data,
			}
		});
		return;

	},	
	'/program/saveAgreements': function (program_id,agreements){
				
		Program.update(program_id, {
			$set: {
				agreements: agreements
			}
		});
		return;

	},
	'/program/saveFamilyPricing': function (program_id,key,val){

		var family_pricing = Program.findOne(program_id).family_pricing;
		family_pricing[key] = val;				
		Program.update(program_id, {
			$set: {
				family_pricing: family_pricing
			}
		});
		return;

	},
});
