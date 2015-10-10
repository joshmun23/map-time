PersonPage = React.createClass({
    displayName:"Person",
	mixins: [ReactMeteorData],
    getInitialState(){
        return {
            personOptions: false,
            dataLoaded: false,
            activeTab: 0,
        };
    },
    getMeteorData() {

    	const subHandles = [
            Meteor.subscribe("singlePerson",Session.get('person_id')),
            Meteor.subscribe("allLocations"),
            Meteor.subscribe("allRanks"),
            Meteor.subscribe("attendance",Session.get('person_id')),
            Meteor.subscribe("billingHistory",Session.get('person_id')),
            Meteor.subscribe("person_notes",Session.get('person_id')),
        ];

        const subsReady = _.all(subHandles, function (handle) {
            return handle.ready();
        });

        return {
            subsReady: subsReady,
            person: People.findOne(),
            locations: Location.find({}).fetch(),
            ranks: Ranks.find({}).fetch(),
            attendance: Attendance.find({},{sort:{timestamp: -1}}).fetch(),
            billingHistory : BillingHistory.find({}).fetch(),
            notes : Notes.find({}).fetch(),
        };
    },
    closeDropdowns(e){
        if(this.state.personOptions == true){
            var parents = getParents(e.target)
            if(_.indexOf(parents,'dropdown active') == -1 ){
                this.togglePerson();
            }
        }
    },
    togglePerson(){
        this.setState({personOptions : !this.state.personOptions});
    },
    changeNav(index,e){
        
        this.setState({activeTab: index});        
    },
    changeNavDown(){
        var activeTab = this.state.activeTab -1;
        if(activeTab < 0 ){
            activeTab = 0;
        }
        this.setState({activeTab:activeTab});
    },
    changeNavUp(){
        var activeTab = this.state.activeTab +1;
        var optionCount = 5;
        if(activeTab == optionCount ){
            activeTab = optionCount -1;
        }
        this.setState({activeTab:activeTab});
    },
    render(){

        if(!this.data.subsReady){
            
            return (<Loading/>);
        } else {


            let person = this.data.person;
            let classes = {
                dropdown : classNames({
                    'dropdown' : true,
                    'active' : this.state.personOptions,
                }),
            };
            let activeCount = 0;


            if(person.type == "Lead"){
                var subOptions = [
                    {
                        name : "General",
                        component : <PersonGeneral {...this.props} data={this.data} />,
                    },
                    {
                        name : "Tags / Follow Ups",
                        component : <PersonTags {...this.props} data={this.data} />,
                    },
                    {
                        name : "Notes",
                        component : <PersonNotes {...this.props} data={this.data} />,
                    }
                ];            
            } else {
                var subOptions = [
                    {
                        name : "General",
                        component : <PersonGeneral {...this.props} data={this.data} />,
                    },
                    {
                        name : "Rank / Attendance",
                        component : <PersonRank {...this.props} data={this.data} />,
                    },
                    {
                        name : "Billing",
                        component : <PersonBilling {...this.props} data={this.data} />,
                    },
                    {
                        name : "Tags / Follow Ups",
                        component : <PersonTags {...this.props} data={this.data} />,
                    },
                    {
                        name : "Notes",
                        component : <PersonNotes {...this.props} data={this.data} />,
                    }
                ];            
            }
 
            console.log(person.type);

            return(
                <div className="person" onClick={this.closeDropdowns}>

                    <div className="row">
                        <div className="col-sm-4">
                            <div className="person-block clearfix">
                                <div onClick={this.togglePerson} className="open-click">
                                    <i className="fa fa-ellipsis-v"></i>
                                </div>

                                <div className={classes.dropdown}>
                                    <ul className="dropdown-ul">
                                        <li><i className="fa fa-phone"></i> Call</li>
                                        <li><i className="fa fa-paper-plane"></i> Email</li>
                                        <li><i className="fa fa-comments"></i> Text</li>
                                    </ul>
                                </div>
                                <div className="profile-img">
                                    <img src="/img/user-dan.jpg"/>
                                </div>
                                <div className="profile-text">
                                    <div className="name">
                                        {person.fname} {person.lname}
                                    </div>
                                    <div className="status">
                                        {person.type}
                                    </div>
                                    <StarRating rating={person.rating}/>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-8">
                            <div className="sub-nav">
                                <div onClick={this.changeNavDown} className="change-tab left"><i className="fa fa-chevron-left"></i></div>
                                <div onClick={this.changeNavUp} className="change-tab right"><i className="fa fa-chevron-right"></i></div>
                                <ul className="clearfix">
                                    {subOptions.map(function(menu,index){
                                        this.state.activeTab == menu.name ? "active" : "";
                                        let style = {};
                                        if(index >= this.state.activeTab - 1){
                                            style = {}
                                        }
                                        if(index >= this.state.activeTab){
                                            style = {display:"block"}
                                        }
                                        return(<li style={style} className={this.state.activeTab == index ? "active" : ""} onClick={this.changeNav.bind(this,index)} key={index}>{menu.name}</li>); 
                                    }.bind(this))}
                                </ul>
                            </div>
                            <div className="content-container">
                                {
                                subOptions.map(function(menu,index){
                                    var isActive = "";
                                    if(index >= this.state.activeTab && index < this.state.activeTab + 3){
                                        activeCount++;
                                        isActive = "active-"+activeCount;
                                    }
                                    return(<div className={"tab-container "+isActive} key={index}>{menu.component}</div>); 
                                }.bind(this))
                                }                                
                            </div>
                        </div>
                    </div>

                </div>
            );

        }
    }
});
