Marketing_campaign = new Meteor.Collection('marketing_campaign');

MarketingCampaign_actions = new Meteor.Collection('marketingCampaign_actions');

MarketingBroadcast = new Meteor.Collection('marketingBroadcast');



Meteor.methods({
	'/campaign/add': function (name) {
		var newCampaign = {
			org_id : Meteor.user().profile.org_id,
			name: name,
			enabled: true,
			start_trigger : "",
			end_trigger : "",
			last_update : moment().format('YYYY-MM-DD HH:mm:SS'),
			created : moment().format('YYYY-MM-DD HH:mm:SS'),
	    };
	    var campaignID = Marketing_campaign.insert(newCampaign);
	    return campaignID;
	},

	'/campaign/delete': function (_id) {
		var campaign = Marketing_campaign.findOne(_id);

		console.log(campaign);

		//delete all actions first
		MarketingCampaign_actions.remove({campaign_id : _id});
		//delete campaign
		Marketing_campaign.remove(_id);
	},

	'/campaignAction/add': function (campaign_id,name) {
		var newCampaignAction = {
			org_id : Meteor.user().profile.org_id,
			campaign_id : campaign_id,
			name: name,
			type: "email",
			delay: 0,
			send_time: "07:00:00",
			content : "<strong>Hello!</strong><br/>You can begin typing your email here.",
			sent : 0,
			opens : 0,
			clicks : 0,
			created : moment().format('YYYY-MM-DD HH:mm:SS'),
		}
	    var newCampaignActionID = MarketingCampaign_actions.insert(newCampaignAction);
	    return newCampaignActionID;
	},


});
