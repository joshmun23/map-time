TopNav = React.createClass({
	navClick(e){
		this.props.navClick(e);
	},
	toggleNav(){
		this.props.toggleNav();
	},
    render() {
        return (
			<div className={"top-nav "+this.props.classes}>

	            <div className={"left-nav-bg "+ this.props.active} onClick={this.navClick}>
	                <div className="left-nav">
	                    <ul className="nav-select">

	                        <li><a onClick={this.toggleNav} href="/dash"><i className="icon-grid"></i><span className="nav-pad">Dashboard</span></a></li>
	                        <li><a onClick={this.toggleNav} href="/pos"><i className="icon-basket"></i><span className="nav-pad">Point of Sales</span></a></li>
	                        <li><a onClick={this.toggleNav} href="/people"><i className="icon-users"></i><span className="nav-pad">People</span></a></li>
	                        <li><a onClick={this.toggleNav} href="/marketing"><i className="icon-rocket"></i><span className="nav-pad">Marketing</span></a></li>
	                        {/*<li><a onClick={this.toggleNav} href="/calendar"><i className="fa fa-calendar-o"></i><span className="nav-pad">Calendar</span></a></li>*/}
	                        {/*<li><a onClick={this.toggleNav} href="/reports"><i className="icon-bar-chart"></i><span className="nav-pad">Reports</span></a></li>*/}
	                        <li><a onClick={this.toggleNav} href="/attendance"><i className="fa fa-check-circle"></i><span className="nav-pad">Attendance</span></a></li>
	                        <li><a onClick={this.toggleNav} href="/kiosk"><i className="fa fa-hand-pointer-o"></i><span className="nav-pad">Kiosk Mode</span></a></li>
	                        <li><a onClick={this.toggleNav} href="/settings"><i className="icon-settings"></i><span className="nav-pad">Settings</span></a></li>
	                    </ul>
	                    <div className="bottom-left-nav">
	                        <img className="logged-user" src="" />
	                        <a href="#/logout" className="logout"><i className="icon-power"></i> Logout</a>
	                    </div>

	                </div>
	            </div>

	            <div className="menu-click" onClick={this.toggleNav}>
	                <i className="fa fa-bars"></i>
	            </div>
	            <div className="page-id">
	                {this.props.pageTitle}
	            </div>
	        </div>
        );
    }
});
