AttendancePage = React.createClass({
    displayName:"AttendancePage",
	mixins: [ReactMeteorData],
    getMeteorData() {
    	const subHandles = [
            Meteor.subscribe("allPeople"),
            Meteor.subscribe("attendance"),
        ];

        const subsReady = _.all(subHandles, function (handle) {
            return handle.ready();
        });

        return {
            subsReady: subsReady,
            people: People.find({}).fetch(),
            attendance: Attendance.find({},{sort:{timestamp: -1}}).fetch(),
        };
    },
    render(){

    	if(!this.data.subsReady){

    		return (<Loading/>);
    	}

    	let attendance = this.data.attendance;
    	let people = this.data.people;

    	var attendance_list = _.map(attendance,function(attend){
		    var person_attendance = _.find(people,function(person){
		        return person._id == attend.person_id;
		    }); 
		    return _.extend(attend, _.omit(person_attendance,'_id')); 
		});

		// attendance_list = _.sortBy(attendance_list,function(){
		// 	return 
		// });

    	let attendance_items = attendance_list.map(function(attend,index){
			return (
				<div key={index} className="col-sm-6">
					<div className="person-box clearfix">
						<img className="profile-img" src=""/>
						<div className="text">
							<div className="name">{attend.fname} {attend.lname}</div>
							<div className="time">{moment(attend.timestamp).fromNow()}</div>
						</div>
					</div>
				</div>
			);
    	});

    	return(
    		<div className="attendance clearfix">
    			<div className="row">
	    			<div className="col-sm-3">
	    				<div className="org-name">
	    					Mastery Martial Arts
	    				</div>
		                <Clock />
	    			</div>
	    			<div className="col-sm-9">
	    				<div className="white-bg">
			    			<TimeoutTransitionGroup enterTimeout={300}leaveTimeout={300}transitionName="modal-bezier"component="div"transitionAppear={true}>
		    					{attendance_items}
							</TimeoutTransitionGroup>
	    				</div>
	    			</div>
    			</div>
    		</div>
    	);
    }
});
