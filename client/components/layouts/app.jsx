
const ShowConnectionIssues = new ReactiveVar(false);
const CONNECTION_ISSUE_TIMEOUT = 5000;

var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;


setTimeout(function () {
  ShowConnectionIssues.set(true);
}, CONNECTION_ISSUE_TIMEOUT);

AppLayout = React.createClass({
	name:"AppLayout",
	mixins: [ReactMeteorData],
	getInitialState() {
	    return {
			navActive: false
	    };
	},
	// childContextTypes: {
	//     toggleNav: React.PropTypes.func.isRequired
	// },
	// getChildContext() {
	//     return {
	// 		toggleNav: this.toggleNav
	// 	}
	// },
	getMeteorData() {

		// const subHandles = [
		// 	Meteor.subscribe("")
		// ];

		// const subsReady = _.all(subHandles, function (handle) {
		// 	return handle.ready();
		// });

		return {
			// subsReady: subsReady,
			subsReady: true,
			currentUser: Meteor.user(),
			disconnected: ShowConnectionIssues.get() && (! Meteor.status().connected)
		};
	},
	toggleNav() {
	    this.setState({
	      navActive: ! this.state.navActive
	    });
	},
	navClick(e){
        if(e.target.className == "left-nav-bg active"){
        	this.toggleNav();
        }
    },
	render() {

		var classes = {
			appBodyContainerClass : classNames({
				"app-layout" : true,
				"cordova" : (Meteor.isCordova),
				"isIos" : iOS,
			}),
			navClass : classNames({
				"inside" : !this.props.content.props.name,
			}),
		}

		var pageTitle = this.props.content.props.name ? this.props.content.props.name : <PageBack />;
		var pageTitle;

		if(!this.data.subsReady){
			return(<Loading/>);
		}

		return (
	  		<div id="container" className={ classes.appBodyContainerClass }>

	  			<div className={"content-background "+classes.navClass }></div>

	    		{ this.data.disconnected ? <ConnectionIssueDialog /> : "" }

	    		<TopNav
	    			navClick={this.navClick} 
	    			toggleNav={this.toggleNav} 
	    			active={this.state.navActive == true ? "active" : ""} 
	    			pageTitle={pageTitle}
	    			classes={classes.navClass}
	    			/>

		        <div className="contents-wrapper">
		    		{this.props.content}
	    		</div>
	 	 	</div>
		);
	}
});
