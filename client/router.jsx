App = {};

App.signout = function () {
  console.log('logging out...');
  Meteor.logout(function () {
    console.log('...done');
    Meteor.navigateTo('/');
  });
};

FlowRouter.route('/signout', {
    action: App.signout
})

FlowRouter.notFound = {
	action: function() {
		console.log('sorry but nothing found here...');
	}
};

FlowRouter.route("/", {
	action: function() {
		FlowRouter.go("/people");
		return;
		ReactLayout.render(MainLayout, {
			content: <Default />
		});
	}
});

FlowRouter.route("/signin", {
	action: function() {
		ReactLayout.render(MainLayout, {
			content: <AuthSignInPage />
		});
	}
});

// INSIDE APP
FlowRouter.route('/kiosk', {
	name: 'kiosk',
	action: function(e) {
		ReactLayout.render(AppLayout, {
			content: <KioskPage name="Kiosk Select"/>
		});
	}
});
FlowRouter.route('/kiosk/agreement', {
	name: 'kiosk',
	action: function(e) {
		ReactLayout.render(KioskLayout, {
			content: <AgreementPage />
		});
	}
});

FlowRouter.route('/dash', {
	name: 'dash',
	action: function(e) {
		ReactLayout.render(AppLayout, {
			content: <DashPage />
		});
	}
});
FlowRouter.route('/pos', {
	name: 'pos',
	action: function(e) {
		ReactLayout.render(AppLayout, {
			content: <PosPage name="Point of Sales" />
		});
	}
});
FlowRouter.route('/people', {
	name: 'people',
	action: function(params,queryParams) {
		// console.log(queryParams);
		ReactLayout.render(AppLayout, {
			content: <PeoplePage name={"People"} />
		});
	}
});

FlowRouter.route('/person/:_id', {
	name: 'person',
	action: function(params,queryParams) {

		Session.set("person_id",params._id);
		// console.log(params);
		// console.log(queryParams);
		ReactLayout.render(AppLayout, {
			content: <PersonPage _id={params._id} />
		});
	}
});

FlowRouter.route('/marketing', {
	name: 'marketing',
	action: function(params,queryParams) {
		ReactLayout.render(AppLayout, {
			content: <MarketingPage name={"Marketing"} />
		});
	}
});

FlowRouter.route('/marketing/campaigns', {
	name: 'campaigns',
	action: function(params,queryParams) {
		ReactLayout.render(AppLayout, {
			content: <MarketingCampaign />
		});
	}
});

FlowRouter.route('/marketing/campaign/:_id', {
	name: 'campaigns',
	action: function(params,queryParams) {
		Session.set("campaign_id",params._id);
		ReactLayout.render(AppLayout, {
			content: <MarketingCampaignSingle />
		});
	}
});

FlowRouter.route('/marketing/campaign/:type/:_id/edit', {
	name: 'campaigns',
	action: function(params,queryParams) {

		if(params.type == "email"){
			ReactLayout.render(AppLayout, {
				content: <EmailEditor _id={params._id} />
			});
		}

	}
});

FlowRouter.route('/checkin', {
	name: 'checkin',
	action: function(params,queryParams) {
		ReactLayout.render(KioskLayout, {
			content: <CheckinPage />
		});
	}
});

FlowRouter.route('/attendance', {
	name: 'attendance',
	action: function(params,queryParams) {
		ReactLayout.render(AppLayout, {
			content: <AttendancePage name="Attendance" />
		});
	}
});

//settings

var settingsSection = FlowRouter.group({
	prefix: "/settings"
});

settingsSection.route('/', {
	action: function(){
		ReactLayout.render(AppLayout, {
			content: <SettingsPage name="Settings" />
		});
	}
});
settingsSection.route('/account', {
	action: function(){
		ReactLayout.render(AppLayout, {
			content: <SettingsAccount name="Account Settings" tabActive="default" />
		});
	}
});
settingsSection.route('/pos', {
	action: function(){
		ReactLayout.render(AppLayout, {
			content: <SettingsPosProducts name="POS Settings" tabActive="default"/>
		});
	}
});

settingsSection.route('/pos/categories', {
	action: function(){
		ReactLayout.render(AppLayout, {
			content: <SettingsPosCategories name="POS Categories" tabActive="categories"/>
		});
	}
});
settingsSection.route('/pos/discounts', {
	action: function(){
		ReactLayout.render(AppLayout, {
			content: <SettingsOrgLocations name="POS Discounts" tabActive="discounts"/>
		});
	}
});
settingsSection.route('/pos/gift-cards', {
	action: function(){
		ReactLayout.render(AppLayout, {
			content: <SettingsPosGiftCerts name="POS Gift Cards" tabActive="gift-cards"/>
		});
	}
});

//ORG ADMIN

settingsSection.route('/org', {
	action: function(){
		ReactLayout.render(AppLayout, {
			content: <SettingsOrgGeneral name="Org Settings" tabActive="default" />
		});
	}
});
settingsSection.route('/org/locations', {
	action: function(){
		ReactLayout.render(AppLayout, {
			content: <SettingsOrgLocations name="Org Settings" tabActive="locations"/>
		});
	}
});
settingsSection.route('/org/users', {
	action: function(){
		ReactLayout.render(AppLayout, {
			content: <SettingsOrgUsers name="Org Settings" tabActive="users"/>
		});
	}
});
settingsSection.route('/org/programs', {
	action: function(){
		ReactLayout.render(AppLayout, {
			content: <SettingsOrgPrograms name="Org Settings" tabActive="programs"/>
		});
	}
});
settingsSection.route('/org/agreements', {
	action: function(){
		ReactLayout.render(AppLayout, {
			content: <SettingsOrgAgreement name="Org Settings" tabActive="agreements"/>
		});
	}
});
settingsSection.route('/org/tags', {
	action: function(){
		ReactLayout.render(AppLayout, {
			content: <SettingsOrgTags name="Org Settings" tabActive="tags"/>
		});
	}
});


var adminSection = FlowRouter.group({
	prefix: "/admin"
});

// for the /admin page
adminSection.route('/', {
		action: function(){
			console.log('admin');
		}
});

// for the /admin/new-post page
adminSection.route('/new-post', {
		action: function(){
			console.log('admin post');

		}
});

function checkLogin(context) {
	// console.log(context);
	if(!Meteor.userId()){
		FlowRouter.go("/signin");
	}
}

FlowRouter.triggers.enter([checkLogin],{except: ["signin"]});






















