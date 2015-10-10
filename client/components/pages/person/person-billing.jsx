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

		console.log(itemStyle);


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



PersonBilling = React.createClass({
    displayName:"PersonBilling",
    render(){

    	let person = this.props.data.person;
    	let billingHistory = this.props.data.billingHistory;


    	return(
    		<div className="tab-content">
                <div className="col-sm-6">
	                <div className="block-wrapper inside">
	                	<div className="title">Billing Account</div>
{ /*
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
*/ }
	                </div>
                </div>
                <div className="col-sm-6">
	                <div className="block-wrapper inside">
	                	<div className="title">Billing History</div>
	                	<div className="scroll-box">

			                {billingHistory.map(function(history,index){
			                	return (
			                		<div className="item" key={index}>
			                			{moment(history.timestamp).format('MM/DD/YY h:mma')}
			                			<span className="lighter"> - {history.status}</span>
			                			
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
