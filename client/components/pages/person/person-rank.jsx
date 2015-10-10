var RankPicker = React.createClass({
    displayName:"RankPicker",
	getInitialState() {
	    return {
			editBlock: false,
			selectedValue: this.props.selectedRank._id,
			changedData : {},
	    };
	},
    openClose(e){
		if(this.state.editBlock == false){
			this.toggleEdit();
		} else {
			var target = e.target.className;
			if(target == "modal-dialog"){
				this.toggleEdit();
			}
		}
	},	
	toggleEdit(){
		this.setState({editBlock : !this.state.editBlock});
	},
	onChange(newValue){

		let person_ranks = this.props.person_ranks;
		let old_rank_index = _.indexOf(person_ranks, this.state.selectedValue);
		person_ranks[old_rank_index] = newValue;
        
        let changedData = {ranks : person_ranks};

        this.setState({
            changedData: changedData,
            selectedValue : newValue,
        });
	},
	saveChanges(){
      	Meteor.call("/person/update", Session.get('person_id'), this.state.changedData);
      	this.toggleEdit();
	},
    render(){

    	let selectedRank = this.props.selectedRank;
    	let rankOptions = _.map(this.props.programRanks,function(rank,index){
			return { value: rank._id, label: rank.name };
    	});

		let itemStyle = {
			background: "#"+this.props.selectedRank.hex_color,
			color: parseColorDarkness(this.props.selectedRank.hex_color) ? "#FFF" : "#000",
		}



    	return(
        	<div onClick={this.openClose}>

    			<TimeoutTransitionGroup 
	    				enterTimeout={300}
	    				leaveTimeout={300}
		    			transitionName="modal-bezier"
		    			component="div"
		    			transitionAppear={true}
	    			>
					{ this.state.editBlock &&
						<div className="modal-dialog">
							<div className="modal-contents small">
								<div className="header">
									Change Member Rank to
								</div>
								<div className="content">
                    				<label className="active">{this.props.label}</label>
				                    <Select
				                        name="form-field-name"
				                        value={this.state.selectedValue}
				                        options={rankOptions}
				                        onChange={this.onChange}
				                    />

									<div className="clearfix"></div>
								</div>
								<div className="footer">
									
									<div onClick={this.toggleEdit} className="btn cancel">
										cancel
									</div>
									<div onClick={this.saveChanges} className="btn submit">
										Save Changes
									</div>
								</div>
							</div>
						</div>
	        		}
				</TimeoutTransitionGroup>
    			<TimeoutTransitionGroup 
	    				enterTimeout={300}
	    				leaveTimeout={300}
	    				transitionName="modal-fade" 
    				>
					{ this.state.editBlock &&
						<div className="modal-bg"/>
	        		}
				</TimeoutTransitionGroup>

        		<div className="item rank" style={itemStyle}>
         			{selectedRank.name} - {selectedRank.program}  
        		</div>
       		</div>
    	);
    }
});



PersonRank = React.createClass({
    displayName:"PersonRank",
    render(){

    	let person = this.props.data.person;
    	let ranks = this.props.data.ranks;
    	let attendance = this.props.data.attendance;

    	let person_ranks = _.filter(ranks,function(rank,index){
    		return _.contains(person.ranks, rank['_id'])
    	});

    	let rank_list = {};
    	_.each(person_ranks,function(person_rank,index){
			rank_list[person_rank.program] = _.where(ranks, {program: person_rank.program});
    	});

    	// console.log(ranks);
    	// console.log(person_ranks);
    	console.log(rank_list);

    	return(
    		<div className="tab-content">
                <div className="col-sm-6">
	                <div className="block-wrapper inside">
	                	<div className="title">Ranks / Programs</div>

		                {person_ranks.map(function(rank,index){
		                	return (
		                		<RankPicker 
		                			person_ranks={person.ranks}
		                			programRanks={rank_list[rank.program]} 
		                			selectedRank={rank} 
		                			key={index} 
	                			/>
		                	);	
		                })}
	                </div>
                </div>
                <div className="col-sm-6">
	                <div className="block-wrapper inside">
	                	<div className="title">Attendance Record</div>
	                	<div className="scroll-box">
			                {attendance.map(function(attend,index){
			                	return (
			                		<div className="item attendance" key={index}>
			                			{moment(attend.timestamp).format('ddd, MMM Mo h:mma')} 
			                			<span className="lighter">
				                			{" - "+moment(attend.timestamp).fromNow()}
			                			</span>
			                		</div>
			                	);	
			                })}
	                	</div>

	                </div>
                </div>
            </div>
    	);
    }
});
