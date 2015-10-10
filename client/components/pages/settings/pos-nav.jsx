SettingsPosNav = React.createClass({
    displayName:"SettingPosNav",
    render(){
    	return(
	        <ul className="left-nav">
	            <li className="back"><a href="/settings"><i className="fa fa-chevron-left"></i> Back to Settings</a></li>
	            <li><a className={this.props.tabActive == "default" 	? "active" : ""} href="/settings/pos">All Products</a></li>
	            <li><a className={this.props.tabActive == "gift-cards"  ? "active" : ""} href="/settings/pos/gift-cards">Gift Cards</a></li>
	        </ul>
    	);
    }
});
