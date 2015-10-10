// Meteor.publish('allPeople', function(){
//   	return People.find({
//         org_id : getOrg_id(this.userId)
//   	});
// });

// Meteor.publish('singlePerson', function(_id) {
// 	return People.find({
//   		org_id : getOrg_id(this.userId),
//   		_id:_id
//   	});
// });
// 
// Meteor.publishComposite('singlePerson', function(_id){
//     return {
//         find: function() {
//             return People.find({
//                 org_id : getOrg_id(this.userId),
//                 _id:_id,
//             });
//         },
//         children: [
//             {
//                 find: function(people) {
//                     return Location.find({
//                         _id: people.location_id,
//                     });
//                 }
//             }
//         ]
//     }
// });