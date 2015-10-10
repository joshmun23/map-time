Ranks = new Meteor.Collection('ranks');

// Meteor.methods({
// 	'/program/add': function (program_name){
// 		var Exists = Ranks.findOne({program: program_name});
// 		if(!Exists){
// 			var newRank = {
// 				name: "Participant",
// 				org_id : Meteor.user().profile.org_id,
// 				required_classes : 0,
// 				order: 0,
// 				hex_color: "cccccc",
// 				program: program_name,
				
// 		    };
// 			Ranks.insert(newRank);
// 		}
// 		return program_name;
// 	},
// 	'/program/delete': function (program_name){
// 		Ranks.remove({program:program_name});
// 		return;
// 	},
// 	'/program/saveRankOrder': function (program_name,ranks){

// 		ranks.map(function(rank,index){
// 			if(rank.deleted && rank._id){
// 				Ranks.remove(rank._id);
// 			}
// 			if(!rank._id && rank.name.length > 1){
// 				var newRank = {
// 					name: rank.name,
// 					org_id : Meteor.user().profile.org_id,
// 					required_classes : rank.required_classes,
// 					order: index,
// 					hex_color: rank.hex_color,
// 					program: program_name,
// 			    };
// 			    Ranks.insert(newRank);
// 			    return;
// 			} 
// 			if(rank._id) {
// 				Ranks.update(rank._id, {
// 					$set: {
// 						name: rank.name,
// 						required_classes :rank.required_classes,
// 						order:index,
// 						hex_color: rank.hex_color,
// 					}
// 				});
// 				return;
// 			}
// 			return;
// 		});
// 	},
// });
