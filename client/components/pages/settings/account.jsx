SettiggngsAccount = React.createClass({
    displayName:"SettingsAccount",
    render(){

        let user = Meteor.user().profile;
        let email = {email: Meteor.user().emails[0].address}
        user = _.extend(user,email);

        console.log(user);

        return( 
            <div className="settings">
                <div className="white-bg">
                    <div className="section-header">
                        <i className="icon-user"></i>Account Settings
                    </div>
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
        );      
    }
});
