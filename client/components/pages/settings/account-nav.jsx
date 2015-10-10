SettingsAccountNav = React.createClass({
    displayName:"SettingsAccountNav",
    render(){
    	return(
	        <ul className="left-nav">
	            <li className="back"><a href="/settings"><i className="fa fa-chevron-left"></i> Back to Settings</a></li>
	            <li><a className={this.props.tabActive == "default" 	? "active" : ""} href="/settings/account">General Settings</a></li>
	            <li><a className={this.props.tabActive == "login" 	? "active" : ""} href="/settings/account/login">Login Info</a></li>
	        </ul>
    	);
    }
});
