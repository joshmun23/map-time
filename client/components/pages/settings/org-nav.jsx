SettingsOrgNav = React.createClass({
    displayName:"SettingNav",
    render(){
    	return(
	        <ul className="left-nav">
	            <li className="back"><a href="/settings"><i className="fa fa-chevron-left"></i> Back to Settings</a></li>
	            <li><a className={this.props.tabActive == "default" 	? "active" : ""} href="/settings/org">General Settings</a></li>
	            <li><a className={this.props.tabActive == "locations" 	? "active" : ""} href="/settings/org/locations">Locations</a></li>
	            <li><a className={this.props.tabActive == "users" 		? "active" : ""} href="/settings/org/users">Users</a></li>
	            <li><a className={this.props.tabActive == "programs" 	? "active" : ""} href="/settings/org/programs">Programs / Ranks</a></li>
	            <li><a className={this.props.tabActive == "agreements" 	? "active" : ""} href="/settings/org/agreements">Agreements</a></li>
	            <li><a className={this.props.tabActive == "tags" 		? "active" : ""} href="/settings/org/tags">Tags</a></li>
	        </ul>
    	);
    }
});
