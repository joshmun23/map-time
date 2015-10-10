SettingsOrgUsers = React.createClass({
    displayName:"SettingsOrgUsers",
    mixins: [ReactMeteorData,TimerMixin],
    getInitialState(){
        return {
            modalOpen: "",
            user: "",
        };
    },
    getMeteorData() {

        const subHandles = [
            Meteor.subscribe("users"),
            Meteor.subscribe("allLocations"),
        ];

        const subsReady = _.all(subHandles, function (handle) {
            return handle.ready();
        });

        return {
            subsReady: subsReady,
            users: Meteor.users.find().fetch(),
            locations: Location.find().fetch(),
            userCount: Meteor.users.find().count(),
        };
    },
    closeModal(e){
        let targetClass = e.target.className;
        if(targetClass == "modal-dialog"){
            this.setState({
                modalOpen: "",
                user: "",
                user_id : "",
            });
        }
    },
    closeModalNow(){
        this.setState({
            modalOpen: "",
            user: "",
            user_id : "",
        });
    },
    newUser(){
        this.setState({
            modalOpen: "newUser",
        });
    },
    creatNewUser(){
        console.log(this.state.user);
        Meteor.call("/user/add", this.state.user, function(err,res){
            if (err) {
                console.log(err);
                alert(err[err.error]);
            }
            this.setState({
                modalOpen: "",
                user: "",
                user_id : "",
            });
            return;
        }.bind(this));

    },
    editUser(user,id){

        this.setState({
            modalOpen : "editUser",
            user: user,
            user_id : id,
        });
    },
    updateUser(key,val){
        let userData = this.state.user;
        if(userData == ""){
            userData = {start:1};
        }
        userData[key] = val;
        if(key == "name"){
            let name = val.split(" ");
            userData['fname'] = name[0];
            userData['lname'] = name[1];
        }
        this.setState({user:userData});
        console.log(this.state.user);
    },
    saveUserUpdate(){

        Meteor.call("/user/updateUser", this.state.user_id, this.state.user, function(err,res){
            if (err) {
                console.log(err);
                alert(err[err.error]);
            }
            this.setState({
                modalOpen: "",
                user: "",
                user_id : "",
            });
            return;
        }.bind(this));
    },
    deleteUser(){
        this.setState({
            modalOpen: "confirmDelete",
        });
    },
    confirmedDeleteUser(){

        Meteor.call("/user/delete", this.state.user_id, function(err,res){
            if (err) {
                console.log(err);
                alert(err[err.error]);
            }
            this.setState({
                modalOpen: "",
                user: "",
                user_id : "",
            });
            return;
        }.bind(this));

    },
    render(){

        if(!this.data.subsReady){

            return (<Loading/>);
        }

        let slideStyle = {
            WebkitTransform: "translate(-"+(this.state.slide * 100)+"%,0)",
            transform: "translate(-"+(this.state.slide * 100)+"%,0)",
        }

        let users = this.data.users;
        let userCount = this.data.users;

        let locations_input = _.map(this.data.locations,function(location,index){
            return { value: location._id, label: location.short_name };
        });

        let admins = [];
        let managers = [];
        let frontDesk = [];
        _.each(users,function(user,index){

            if(user.profile.access_level == "admin") {
                admins.push(user);
                return;
            }
            if(user.profile.access_level == "manager") {
                managers.push(user);
                return;
            }
            if(user.profile.access_level == "frontDesk") {
                frontDesk.push(user);
                return;
            }
        });

        return( 
            <div className="settings">

                <section name="NewUser">
                    <TimeoutTransitionGroup enterTimeout={300}leaveTimeout={300}transitionName="modal-bezier"component="div"transitionAppear={true}>
                        { this.state.modalOpen == "newUser" &&
                            <div onClick={this.closeModal} className="modal-dialog">
                                <div className="modal-contents">
                                    <div className="header">
                                        Add New User
                                    </div>
                                    <div className="content">
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <Input label="First Name" type="" value={this.state.user.fname} dbKey="fname" onChange={this.updateUser} />
                                            </div>
                                            <div className="col-sm-6">
                                                <Input label="Last Name" type="" value={this.state.user.lname} dbKey="lname" onChange={this.updateUser} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <Input label="Email" type="" value={this.state.user.email} dbKey="email" onChange={this.updateUser} />
                                            </div>
                                            <div className="col-sm-6">
                                                <Input label="Teaching Title" type="" value={this.state.user.title} dbKey="title" onChange={this.updateUser} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <Input label="Access Level" type="select" value={this.state.user.access_level} 
                                                    options={[{label:"Admin",value:"admin"},{label:"Manager",value:"manager"},{label:"Front Desk",value:"frontDesk"}]}  dbKey="access_level" onChange={this.updateUser} 
                                                />
                                            </div>
                                            <div className="col-sm-6">
                                                 {this.state.user.access_level != "admin" &&
                                                    <Input label="Assigned to" type="select" value={this.state.user.location_id} options={locations_input} dbKey="location_id" onChange={this.updateUser} />
                                                }
                                            </div>
                                        </div>
                                        <div className="clearfix"></div>
                                    </div>
                                    <div className="footer clearfix">
                                        
                                        <div onClick={this.closeModalNow} className="btn cancel">
                                            Cancel
                                        </div>
                                        <div onClick={this.creatNewUser} className="btn submit">
                                            Add User
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </TimeoutTransitionGroup>
                    <TimeoutTransitionGroup enterTimeout={300}leaveTimeout={300}transitionName="modal-fade">
                        { this.state.modalOpen == "newUser" &&
                            <div className="modal-bg"/>
                        }
                    </TimeoutTransitionGroup>
                </section>
                <section name="EditUser">
                    <TimeoutTransitionGroup enterTimeout={300}leaveTimeout={300}transitionName="modal-bezier"component="div"transitionAppear={true}>
                        { this.state.modalOpen == "editUser" && this.state.user &&
                            <div onClick={this.closeModal} className="modal-dialog">
                                <div className="modal-contents">
                                    <div className="header">
                                        Edit User Information
                                    </div>
                                    <div className="content">
                                        <div className="edit-user">
                                            <div className={this.state.user.img ? "user has-pic" : "user"}>
                                                <div className="img" style={{backgroundImage: "url("+this.state.user.img+")"}}></div>
                                                <div className="letters">
                                                    {this.state.user.fname && this.state.user.fname.charAt(0)}
                                                    {this.state.user.lname && this.state.user.lname.charAt(0)}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <Input label="First & Last Name" type="" value={this.state.user.name ? this.state.user.name : this.state.user.fname + " " + this.state.user.lname} dbKey="name" onChange={this.updateUser} />
                                                </div>
                                                <div className="col-sm-6">
                                                    <Input label="Teaching Title" type="" value={this.state.user.title} dbKey="title" onChange={this.updateUser} />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <Input label="Access Level" type="select" value={this.state.user.access_level} 
                                                        options={[{label:"Admin",value:"admin"},{label:"Manager",value:"manager"},{label:"Front Desk",value:"frontDesk"}]}  dbKey="access_level" onChange={this.updateUser} 
                                                    />
                                                </div>
                                                {this.state.user.access_level != "admin" &&
                                                    <div className="col-sm-6">
                                                        <Input label="Assigned to" type="select" value={this.state.user.location_id} options={locations_input} dbKey="location_id" onChange={this.updateUser} />
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="footer button-3 clearfix">
                                        <div onClick={this.deleteUser} className="btn delete">
                                            Delete User
                                        </div>
                                        <div onClick={this.closeModalNow} className="btn cancel">
                                            Cancel
                                        </div>
                                        <div onClick={this.saveUserUpdate} className="btn submit">
                                            Save User
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </TimeoutTransitionGroup>
                    <TimeoutTransitionGroup enterTimeout={300}leaveTimeout={300}transitionName="modal-fade">
                        { this.state.modalOpen == "editUser" &&
                            <div className="modal-bg"/>
                        }
                    </TimeoutTransitionGroup>
                </section>
                <section name="ConfirmDelete">
                    <TimeoutTransitionGroup enterTimeout={300}leaveTimeout={300}transitionName="modal-bezier"component="div"transitionAppear={true}>
                        { this.state.modalOpen == "confirmDelete" && 
                            <div onClick={this.closeModal} className="modal-dialog">
                                <div className="modal-contents small">
                                    <div className="header">
                                        Confirm Delete User
                                    </div>
                                    <div className="content">
                                        Are you sure you want to delete {this.state.user.fname} {this.state.user.lname}?
                                    </div>
                                    <div className="footer clearfix">
                                        <div onClick={this.closeModalNow} className="btn cancel">
                                            Cancel
                                        </div>
                                        <div onClick={this.confirmedDeleteUser} className="btn delete">
                                            Delete User
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        }
                    </TimeoutTransitionGroup>
                    <TimeoutTransitionGroup enterTimeout={300}leaveTimeout={300}transitionName="modal-fade">
                        { this.state.modalOpen == "confirmDelete" &&
                            <div className="modal-bg"/>
                        }
                    </TimeoutTransitionGroup>
                </section>

                <div className="row">
                    <div className="col-sm-3">
                        <SettingsOrgNav tabActive={this.props.tabActive}/>
                    </div>
                    <div className="col-sm-9">
                        <div className="white-bg">

                            <div className="view-slider">
                                <div className="view-container" style={slideStyle}>

                                    <div className="slide" style={positionSlide(0)}>

                                        <div className="section-header">
                                            <div className="title">{this.data.userCount} User{isSingle(this.data.userCount,'s')}</div>
                                            <div className="right">
                                                <span onClick={this.newUser}><i className="fa fa-plus"/></span>
                                            </div>
                                        </div>
                                        <div id="scrollContext" className="section-content">
                                            <div className="user-section clearfix">
                                                <div className="title">
                                                    Admins
                                                </div>
                                                <div className="content">
                                                    {admins &&
                                                        admins.map(function(user,index){

                                                            var id = user._id;
                                                            var user = user.profile;
                                                            var bgImg = {backgroundImage: 'url(' + user.img + ')'}
                                                            var bgHex = {background: 'RGBA(178, 182, 184, 1)'}
                                                            var letters = "";
                                                            if(user.fname){
                                                                letters = user.fname.charAt(0);
                                                            }
                                                            if(user.lname){
                                                                letters = letters + user.lname.charAt(0);
                                                            }

                                                            return (
                                                                <div onClick={this.editUser.bind(this,user,id,"admin")} key={index} className={user.pic ? "user has-pic" : "user"} style={bgHex}>
                                                                    <div className="img" style={bgImg}></div>
                                                                    <div className="letters">
                                                                        {letters}
                                                                    </div>
                                                                </div>
                                                            )
                                                        }.bind(this))
                                                    }
                                                </div>
                                            </div>
                                            <div className="user-section clearfix">
                                                <div className="title">
                                                    Managers
                                                </div>
                                                <div className="content">
                                                    {managers &&
                                                        managers.map(function(user,index){

                                                            var id = user._id;
                                                            var user = user.profile;
                                                            var bgImg = {backgroundImage: 'url(' + user.pic + ')'}
                                                            var bgHex = {background: 'RGBA(178, 182, 184, 1)'}
                                                            var letters = "";
                                                            if(user.fname){
                                                                letters = user.fname.charAt(0);
                                                            }
                                                            if(user.lname){
                                                                letters = letters + user.lname.charAt(0);
                                                            }

                                                            return (
                                                                <div onClick={this.editUser.bind(this,user,id,"manager")} key={index} className={user.pic ? "user has-pic" : "user"} style={bgHex}>
                                                                    <div className="img" style={bgImg}></div>
                                                                    <div className="letters">
                                                                        {letters}
                                                                    </div>
                                                                </div>
                                                            )
                                                        }.bind(this))
                                                    }
                                                </div>
                                            </div>
                                            <div className="user-section clearfix">
                                                <div className="title">
                                                    Front Desk
                                                </div>
                                                <div className="content">
                                                    {frontDesk &&
                                                        frontDesk.map(function(user,index){

                                                            var id = user._id;
                                                            var user = user.profile;
                                                            var bgImg = {backgroundImage: 'url(' + user.pic + ')'}
                                                            var bgHex = {background: 'RGBA(178, 182, 184, 1)'}
                                                            var letters = "";
                                                            if(user.fname){
                                                                letters = user.fname.charAt(0);
                                                            }
                                                            if(user.lname){
                                                                letters = letters + user.lname.charAt(0);
                                                            }

                                                            return (
                                                                <div onClick={this.editUser.bind(this,user,id,"frontDesk")} key={index} className={user.pic ? "user has-pic" : "user"} style={bgHex}>
                                                                    <div className="img" style={bgImg}></div>
                                                                    <div className="letters">
                                                                        {letters}
                                                                    </div>
                                                                </div>
                                                            )
                                                        }.bind(this))
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="slide" style={positionSlide(1)}>
                                        {this.state.selectedAgreement &&
                                            <div>
                                                <div className="section-header">
                                                    <div className="relative">
                                                        <div className="title">{this.state.selectedAgreement.name}</div>
                                                        <div className="left">
                                                            <span onClick={this.goBack}><i className="fa fa-chevron-left"/></span> 
                                                        </div>
                                                        <div className="right">
                                                            <span onClick={this.deleteAgreement}><i className="fa fa-trash-o"/></span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div id="scrollContext" className="section-content">
                                                    <div className="setting-table" style={{tableLayout:"fixed"}}>
                                                        <div className="setting-row table-header">
                                                            <div className="setting_cell grey handle"></div>
                                                            <div className="setting_cell grey">Name</div>
                                                            <div className="setting_cell">Total Price</div>
                                                            <div className="setting_cell">Min Down</div>
                                                            <div className="setting_cell">Payments</div>
                                                            <div className="setting_cell">Term Length</div>
                                                            <div className="setting_cell">Term Interval</div>
                                                        </div>
                                                    </div>
                                                    <SortPaymentOptions selectedAgreement={this.state.selectedAgreement} />
                                                </div>
                                            </div>
                                        }
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );      
    }
});
