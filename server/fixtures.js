Meteor.startup(function (){
	if (People.find().count() === 0){


		if (Organization.find().count() === 0){

			var org_id = Organization.insert({
				name : "Mastery Martial Arts",
				joined: moment().format('YYYY-MM-DD HH:mm:SS'),
			});

		};

		var location_id = Location.insert({
			org_id : org_id,
			short_name:"Smithfield",
			address: "9 Cedar Swamp Road",
			city : "Smithfield",
			state : "02917",
			phone : "(401) 231-5425",
			tax_rate : 7,
		});

		TheAccounts = new Meteor.Collection('accounts');

		if(TheAccounts.find().count() ===0){

			Accounts.createUser({
				email: "dc@abraven.com",
				password: "dman5218",
				profile : {
					name: "Dan Clark",
					org_id: org_id,
					location_id: location_id,
				}
			});
		}
	

		var rankIds = [];
		if (Ranks.find().count() === 0){

			var Rank_id = Ranks.insert({
				name : "White",
				org_id : org_id,
				required_classes: 0,
				order: 1,
				hex_color : "FFFFFF",
				program : "Traditional Martial Arts"
			});
			rankIds.push(Rank_id);
			var Rank_id = Ranks.insert({			
				name : "Yellow",
				org_id : org_id,
				required_classes: 0,
				order: 2,
				hex_color : "FFFFFF",
				program : "Traditional Martial Arts"

			});
			rankIds.push(Rank_id);
			var Rank_id = Ranks.insert({
				name : "Orange",
				org_id : org_id,
				required_classes: 0,
				order: 3,
				hex_color : "FFFFFF",
				program : "Traditional Martial Arts"
			});
			rankIds.push(Rank_id);
			var Rank_id = Ranks.insert({
				name : "Camo",
				org_id : org_id,
				required_classes: 0,
				order: 4,
				hex_color : "FFFFFF",
				program : "Traditional Martial Arts"

			});
			rankIds.push(Rank_id);
			var Rank_id = Ranks.insert({
				name : "Green",
				org_id : org_id,
				required_classes: 0,
				order: 5,
				hex_color : "FFFFFF",
				program : "Traditional Martial Arts"

			});
			rankIds.push(Rank_id);
			var Rank_id = Ranks.insert({
				name : "Purple",
				org_id : org_id,
				required_classes: 0,
				order: 6,
				hex_color : "FFFFFF",
				program : "Traditional Martial Arts"

			});
			rankIds.push(Rank_id);
			var Rank_id = Ranks.insert({
				name : "Blue",
				org_id : org_id,
				required_classes: 0,
				order: 7,
				hex_color : "FFFFFF",
				program : "Traditional Martial Arts"

			});
			rankIds.push(Rank_id);
			var Rank_id = Ranks.insert({
				name : "Brown",
				org_id : org_id,
				required_classes: 0,
				order: 8,
				hex_color : "FFFFFF",
				program : "Traditional Martial Arts"

			});
			rankIds.push(Rank_id);
			var Rank_id = Ranks.insert({
				name : "Red/Black",
				org_id : org_id,
				required_classes: 0,
				order: 9,
				hex_color : "FFFFFF",
				program : "Traditional Martial Arts"

			});
			rankIds.push(Rank_id);
			var Rank_id = Ranks.insert({
				name : "Apprentice Black",
				org_id : org_id,
				required_classes: 0,
				order: 10,
				hex_color : "FFFFFF",
				program : "Traditional Martial Arts"

			});
			rankIds.push(Rank_id);
			var Rank_id = Ranks.insert({
				name : "Black Belt White Stripe",
				org_id : org_id,
				required_classes: 0,
				order: 11,
				hex_color : "FFFFFF",
				program : "Traditional Martial Arts"
			});
			rankIds.push(Rank_id);
			var Rank_id = Ranks.insert({
				name : "Participant",
				org_id : org_id,
				required_classes: 0,
				order: 0,
				hex_color : "FFFFFF",
				program : "Kickboxing"
			});
			rankIds.push(Rank_id);
		}

		Attendance.insert({
			org_id : org_id,
			location_id: location_id,
			person_id : person_id,
			class_id : "",
			timestamp : moment().format('YYYY-MM-DD HH:mm:SS'),
		});

		Classes.insert({
			org_id : org_id,
			location_id: location_id,
			start_time : "17:00:00",
			end_time : "17:45:00",
		});
		
		var person_id = People.insert({
			org_id : org_id,
			location_id: location_id, 
			type: 'Member',  
			fname: 'Hassan',
			lname: 'Abuzahra',
			gender: 'Male',
			phone: '4013494075',
			email: 'h.Abuzahra@gmail.com',
			img: '',
			address: '7 Hattie Ave',
			city: 'Greenville',
			state: 'RI',
			zip: '02828',
			dob: '1990-10-18',
			rating: 90,
			ranks: _.sample(rankIds,1),
			history : {}
		});
		
		BillingHistory.insert({
			"org_id" : org_id,
			"location_id" : location_id,
			"person_id" : person_id,
			"charge" : "150.00",
			"charge_type" : "Credit Card",
			"status" : "Paid",
			timestamp : moment().format('YYYY-MM-DD HH:mm:SS'),
		});


		Notes.insert({
			org_id : org_id,
			person_id : person_id,
			timestamp : moment().format('YYYY-MM-DD HH:mm:SS'),
			note : "This person has been really hard to reach. Have called multiple times.",
		});

		Marketing_campaign.insert({
			org_id : org_id,
			name : "General Info",
			peopleCount : 0,
			enabled : true,
			start_trigger : "",
			end_trigger : "",
			last_update : moment().format('YYYY-MM-DD HH:mm:SS'),
			created : moment().format('YYYY-MM-DD HH:mm:SS'),
		});

	}
});