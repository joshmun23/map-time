PersonGeneral = React.createClass({
    displayName:"PersonGeneral",
    render(){

    	// console.log(this.props);
    	// console.log(this.props.data.locations);

    	let person = this.props.data.person;
    	let locations = this.props.data.locations;

    	let locations_input = _.map(locations,function(location,index){
			return { value: location._id, label: location.short_name };
    	});

		let location_value = _.find(locations_input,function(location){
			return location.value == person.location_id;
		});
 
    	return(
    		<div className="tab-content">
	    		<div className="row">

	    			<div className="col-sm-6">

		                <InputBlock title="Name">
		                	<Input label={"First Name"} dbKey={"fname"} value={person.fname} />
		                	<Input label={"Last Name"} dbKey={"lname"} value={person.lname} />
		                </InputBlock>		                
		                <InputBlock title="Type">
		                	<Input 
			                	type={"select"} 
			                	label={"Member Type"} 
			                	dbKey={"type"} 
			                	options={[
			                			{ value: 'Lead', label: 'Lead' },
			                			{ value: 'Member', label: 'Member' },
			                			{ value: 'Inactive', label: 'Inactive' },
			                		]} 
			                	value={person.type} 
		                	/>
		                </InputBlock>
		                <InputBlock title="Location">
		                	<Input 
			                	type={"select"} 
			                	label={"Location"} 
			                	dbKey={"location_id"} 
			                	options={locations_input} 
			                	value={location_value.label} 
		                	/>
		                </InputBlock>
	    			</div>
	    			<div className="col-sm-6">

		                <InputBlock title="Gender">
		                	<Input 
			                	type={"select"} 
			                	label={"Gender"} 
			                	dbKey={"gender"} 
			                	options={[
			                			{ value: 'Male', label: 'Male' },
			                			{ value: 'Female', label: 'Female' },
			                		]} 
			                	value={person.gender} 
		                	/>
		                </InputBlock>
		                <InputBlock title="Date of Birth">
		                	<Input type={"date"} label={"Date of Birth"} dbKey={"dob"} value={person.dob} />
		                </InputBlock>
		                <InputBlock title="Address">
		                	<Input label={"Address"} dbKey={"address"} value={person.address} />
		                	<Input label={"City"} dbKey={"city"} value={person.city} />
		                	<Input label={"State"} dbKey={"state"} value={person.state} />
		                	<Input label={"Zip"} dbKey={"zip"} value={person.zip} />
		                </InputBlock>
	    			</div>
	    		</div>
	    		<div className="row mar-top-20"></div>
	    		{ (moment().year() - 18) <= moment(person.dob).year() &&
	    			<div className="row">
		    			<div className="col-sm-6">
			                <InputBlock title="Parent Name">
			                	<Input type={"text"} label={"Parent Name"} dbKey={"pname"} value={person.pname} />
			                </InputBlock>		                
		    			</div>
		    		</div>
	    		}
	    		<div className="row">
	    			<div className="col-sm-6">
		                <InputBlock title="Phone">
		                	<Input type={"phone"} label={"Phone"} dbKey={"phone"} value={person.phone} />
		                </InputBlock>		                
	    			</div>
	    			<div className="col-sm-6">

		                <InputBlock title="Email">
		                	<Input label={"Email"} dbKey={"email"} value={person.email} />
		                </InputBlock>
	    			</div>
	    		</div>

            </div>
    	);
    }
});
