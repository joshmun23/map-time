var MarketingRow = React.createClass({
    displayName:"MarketingRow",
    handleClick(id,e){
    	FlowRouter.go('/marketing/campaign/' + id); 
    },
    render:function(){

        data = this.props.data; 

        return(
            <div className="marketing-row" onClick={this.handleClick.bind(this,data._id)}>
                <div className="row">
                	<div className="col-sm-5">
						<div className="big">{data.name}</div>
						<div className="small">12 Actions in funnel</div>
                	</div>
                	<div className="col-sm-2">
                    {/*}
						<div className="big">3290</div>
						<div className="small">People subscribed</div>
                    */}
                	</div>
                	<div className="col-sm-2">
						<div className="text-center">
							<i className="fa fa-check"></i>
						</div>
                	</div>
                	<div className="col-sm-3 text-right">
                		<div className="big">Last Updated</div>
						<div className="small">
							{moment(data.last_update, "YYYY-MM-DD HH:mm:SS").fromNow()}
						</div>
                	</div>
                </div>
            </div>
        );
    }
});


MarketingCampaign = React.createClass({
    displayName:"MarketingCampaign",
    mixins: [ReactMeteorData],
    getInitialState(){
    	return {
    		modalOpen :false,
    		inputValue : "",
    	}
    },
    getMeteorData() {

    	const subHandles = [
            Meteor.subscribe("marketing_campaign"),
        ];

        const subsReady = _.all(subHandles, function (handle) {
            return handle.ready();
        });

        return {
            subsReady: subsReady,
            marketingCampaign: Marketing_campaign.find({}).fetch(),
        };
    },
    toggleModal(e){
		if(this.state.modalOpen == false){
	    	this.setState({modalOpen : true});
		} else {
			var target = e.target.className;
			if(target == "modal-dialog" || target == "btn cancel"){
		    	this.setState({modalOpen : false});
			}
		}
    },
    updateUnsaved(key,val){
    	this.setState({inputValue : val});
    },
    saveNew(){
      	Meteor.call("/campaign/add", this.state.inputValue,function(err,res){
	        if (err) {
	 			alert(err[err.error]);
			}
	      	FlowRouter.go('/marketing/campaign/' + res);
          return;
        });
    },
    render(){


    	if(!this.data.subsReady){

    		return (<Loading />);
    	}
    	
    	return(
    		<div className="marketing">

    			<TimeoutTransitionGroup enterTimeout={300}leaveTimeout={300}transitionName="modal-bezier"component="div"transitionAppear={true}>
					{ this.state.modalOpen &&
						<div onClick={this.toggleModal} className="modal-dialog">
							<div className="modal-contents small">
								<div className="header">
									Add New Campaign
								</div>
								<div className="content">
                    				<Input label="Name" value={this.state.inputValue} onChange={this.updateUnsaved} placeholder={"Campaign Name"} />
				                  
									<div className="clearfix"></div>
								</div>
								<div className="footer">
									
									<div onClick={this.toggleModal} className="btn cancel">
										cancel
									</div>
									<div onClick={this.saveNew} className="btn submit">
										Save Changes
									</div>
								</div>
							</div>
						</div>
	        		}
				</TimeoutTransitionGroup>
    			<TimeoutTransitionGroup enterTimeout={300}leaveTimeout={300}transitionName="modal-fade">
					{ this.state.modalOpen &&
						<div className="modal-bg"/>
	        		}
				</TimeoutTransitionGroup>



                <div className="page-header clearfix">
                	<div className="pull-left page-title">Campaign Funnels</div>
                	<div className="pull-right">
                		<div onClick={this.toggleModal} className="marketing-btn green"><i className="fa fa-plus"></i> Add New</div>
                	</div>
                </div>
                <div className="white-content">
					<Griddle
					        results={this.data.marketingCampaign}
					        tableClassName="table"
					        showFilter={true}
					        filterPlaceholderText={"Search..."}
					        resultsPerPage={"35"}
					        useCustomRowComponent={true}
					        customRowComponent={MarketingRow}
					        enableInfiniteScroll={true} bodyHeight={400} useFixedHeader={true}
					        sortAscendingComponent={<span className="fa fa-chevron-down"></span>}
					        sortDescendingComponent={<span className="fa fa-chevron-up"></span>}
					    />

                </div>
    		</div>
    	);
    }
});
