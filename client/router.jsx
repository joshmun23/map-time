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
		console.log('hisdas');
		ReactLayout.render(AppLayout, {
			content: <HomePage />
		});
	}
});

FlowRouter.route("/signin", {
	action: function() {
		ReactLayout.render(AppLayout, {
			content: <AuthSignInPage />
		});
	}
});


// function checkLogin(context) {
// 	// console.log(context);
// 	if(!Meteor.userId()){
// 		FlowRouter.go("/signin");
// 	}
// }

// FlowRouter.triggers.enter([checkLogin],{except: ["signin"]});






















