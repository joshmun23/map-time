CheckinPage = React.createClass({
    displayName:"Checkin",
    mixins: [ReactMeteorData,TimerMixin],
    getInitialState(){
        return {
            filterValue : "",
            searchFocus: false,
            selectedPerson: "",
            selectedData: "",
            class_count: "",
            slide2: false,
            slide3: false,
            showExit: false,
            pinValue: "",
        }
    },
    getMeteorData() {
        const subHandles = [
            Meteor.subscribe("allPeople"),
            Meteor.subscribe("allRanks"),
            Meteor.subscribe("attendance"),
        ];
        const subsReady = _.all(subHandles, function (handle) {
            return handle.ready();
        });
        return {
            subsReady: subsReady,
            people: People.find({}).fetch(),
            ranks: Ranks.find({}).fetch(),
        };
    },
    pinUpdate(key,val){
        if(val == Meteor.user().profile.pin){
            FlowRouter.go('/');
        }
    },
    toggleSearchFocus(){

        this.setState({searchFocus: true});
    },
    toggleExit(e){
        let target = e.target.className;
        if(target == "modal-dialog"){
            this.setState({showExit:false});
        }
    },
    handleExit(){

        this.setState({showExit: true});
    },
    handleUpdate(e){

        let val = e.target.value;
        this.setState({filterValue : val});
    },
    personSelect(id,e){

        let person_data = _.find(this.data.people,function(person,index){
            return person._id == id;
        });
        this.setState({
            selectedPerson : id,
            selectedData: person_data,
            slide2:true,
        });
    },
    backToResults(){

        this.setState({slide2:false});
    },
    resetCheckin(){

        this.setState({
            filterValue : "",
            searchFocus: false,
            selectedPerson: "",
            selectedData: "",
            slide2: false,
        });
    },
    hideSlide3(){
        this.setState({
            class_count: "",
            slide3 : false
        });
    },
    personCheckin(class_id,class_count){

        Meteor.call("/checkin/add", this.state.selectedPerson, class_id, class_count, function(err,res){
            if (err) {
                console.log(err);
                alert(err[err.error]);
            }
            if(class_count != 0){
                this.setState({
                    class_count: res,
                    slide3 : true
                });
            }
            this.setState({slide3 : true});
            return;
        }.bind(this));
        this.setTimeout(this.resetCheckin, 1000);
        this.setTimeout(this.hideSlide3, 3000);
    },
    render(){

        if(!this.data.subsReady){

            return(<Loading/>);
        }

        let people = this.data.people;
        people = people.filter(function(person){
            return person.fname.toLowerCase().search(
                this.state.filterValue.toLowerCase()) !== -1;
        }.bind(this));

        var rank_list = _.object(_.map(this.data.ranks, function(item) {
           return [item._id, item]
        }));

        let classes = {
            welcome_header : classNames({
                header : true,
                inactive : this.state.searchFocus,
            }),
        }

    	return(
    		<div className="checkin">

                <section id="manger-exit">
                    <TimeoutTransitionGroup enterTimeout={300} leaveTimeout={300} transitionName="modal-bezier" component="div" transitionAppear={true}>
                        { this.state.showExit &&
                            <div className="modal-dialog" onClick={this.toggleExit}>
                                <div className="modal-contents small">
                                    <div className="header">
                                        Manager Exit
                                    </div>
                                    <div className="content">
                                        <Input type="password" pattern="[0-9]*" value={this.state.pinValue} label={"Exit Pin"} onChange={this.pinUpdate} />

                                        <div className="clearfix"></div>
                                    </div>
                                </div>
                            </div>
                        }
                    </TimeoutTransitionGroup>
                    <TimeoutTransitionGroup enterTimeout={300}leaveTimeout={300}transitionName="modal-fade">
                        { this.state.showExit &&
                            <div className="modal-bg"/>
                        }
                    </TimeoutTransitionGroup>
                </section>

                <div className="slide-1">
                    <div onClick={this.handleExit} className="exit">
                        <i className="fa fa-sign-out"></i>
                    </div>

                    <div className={classes.welcome_header}>
                        <div className="title">Welcome to class!</div>
                        <div>Please check in by typing your name below:</div>
                    </div>
                    <div>
                        <input 
                            type="text" 
                            onFocus={this.toggleSearchFocus} 
                            value={this.state.filterValue} 
                            onChange={this.handleUpdate}
                            placeholder="Begin typing your name..."
                        />
                    </div>
                    <div className="person-select-container">
                        {this.state.filterValue.length > 2 &&
                            people.map(function(person,index){
                                return (
                                    <div onClick={this.personSelect.bind(this,person._id)} className="person-select" key={index}>
                                        <div className="profile-img">
                                            <img src="" />
                                        </div>
                                        <div className="name">{person.fname} {person.lname}</div>
                                    </div>
                                )   
                            }.bind(this))
                        }
                    </div>
                </div>
                <div className={this.state.slide2 == true ? "slide slide-2 active" : "slide slide-2"}>

                {this.state.selectedData != "" &&
                    <div>
                        <div onClick={this.backToResults} className="back-button">
                            <i className="fa fa-chevron-left"></i> Back
                        </div>
                        <div className="content">
                            <div className="title">
                                Welcome back {this.state.selectedData.fname}!
                            </div>
                            <div className="sub">Please select the class you are checking in for:</div>
                            <div className="class-options">
                                {this.state.selectedData.ranks.map(function(rank,index){
                                    let selectedRank = rank_list[rank];
                                    return (
                                        <div key={index} onClick={this.personCheckin.bind(this,rank,selectedRank.required_classes)} className="class" style={{background:"#"+selectedRank.hex_color}}>
                                            {selectedRank.program} - {selectedRank.name}
                                        </div>
                                    );
                                }.bind(this))}
                            </div>
                        </div>

                    </div>
                }
                </div>
                <div className={this.state.slide3 == true ? "slide slide-3 active" : "slide slide-3"}>
                    <div className="content">
                        <div className="title">You are checked in!</div>
                        <i className="fa fa-thumbs-o-up"></i>
                        {this.state.class_count && 
                            <div className="goal">You have {this.state.class_count} classes left!</div>
                        }
                    </div>
                </div>
    		</div>
    	);
    }
});
