SettingsAccount = React.createClass({
    displayName:"SettingsAccount",
    render(){

        if(!Meteor.user()){
            
            return(<Loading/>);
        }

        let user = Meteor.user().profile;
        let email = {email: Meteor.user().emails[0].address}
        user = _.extend(user,email);

        return( 
            <div className="settings">
                <div className="row">
                    <div className="col-sm-3">
                        <SettingsAccountNav tabActive={this.props.tabActive}/>
                    </div>
                    <div className="col-sm-9">
                        <div className="white-bg">
                            <div className="section-header clearfix">
                                <div className="title pull-left">
                                    Account Settings
                                </div>
                            </div>
                            <div className="section-content">
                                <div className="col-sm-4">
                                    <div className="profile-img">
                                        <img src=""/>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <InputBlock title="Your Name">
                                        <Input label={"First Name"} dbKey={"fname"} value={user.fname} />
                                        <Input label={"Last Name"} dbKey={"lname"} value={user.lname} />
                                    </InputBlock>          
                                    <InputBlock title="Email">
                                        <Input label={"Email Address"} dbKey={"email"} value={user.email} />
                                    </InputBlock>          
                                </div>
                                <div className="col-sm-4">
                                    <InputBlock title="Login Password">
                                        <Input label={"Login Password"} dbKey={"password"} value={"************"} />
                                    </InputBlock>          
                                    <InputBlock title="Kiosk Unlock Pin">
                                        <Input label={"Set New Pin"} dbKey={"pin"} value={user.pin} />
                                    </InputBlock>          
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );      
    }
});
