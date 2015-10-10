AuthSignInPage = React.createClass({
	getInitialState() {
		return {
	  		errors: {}
		};
  },
  handleSubmit(event) {
		event.preventDefault();

		const email = event.target.email.value;
		const password = event.target.pass.value;
		const errors = {};

		if (! email) {
		  errors.email = 'Email required';
		}

		if (! password) {
		  errors.password = 'Password required';
		}

		this.setState({
		  errors: errors
		});

		if (! _.isEmpty(errors)) {
		  // Form errors found, do not log in
		  return;
		}

		Meteor.loginWithPassword(email, password, function(error){
			if (error) {
				this.setState({errors: { 'none': error.reason }});
				return;
			}
			Meteor.call('/location/getForLogin', Meteor.user().profile.location_id, function(err,res){
	            if (err) {
	                console.log(err);
	                alert(err[err.error]);
	            }
	            Session.set('location',res);
	            return;
			});
			Session.set('profile',Meteor.user().profile);
			FlowRouter.go('/');
		});
	},
	handleReset(){
		console.log('hi');
	},
	render(){
		return(
			<div className="login">
                <div className="login-box paper-shadow e5">
                    <img className="logo" src="img/logo-login.png"/>
		            <AuthErrors errors={this.state.errors} />
                    <form className="clearfix" onSubmit={this.handleSubmit}>
                        <label htmlFor="email">Email Address</label>
                        <input id="email" type="email" name="email"  placeholder="Your Email"/>
                        <label htmlFor="pass">Password</label>
                        <input id="pass" type="password" name="pass"  placeholder="Password"/>
                        <div className="row recover-row">
                            <div className="col-xs-6">
                                <div onClick={this.handleReset} className="recover-link">Forgot Password?</div> 
                            </div>
                            <div className="col-xs-6">
                                <button id="login-btn" className="btn pull-right" type="submit">Sign In</button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
		);
	}
});
