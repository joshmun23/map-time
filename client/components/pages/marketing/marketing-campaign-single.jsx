var NoDataComponent = React.createClass({
    displayName:"NoDataComponent",
    render(){
        return(
            <div className="relative text-center">
                <div className="noDataComponent">
                    <i className="fa fa-clock-o"></i>
                    <div className="text">
                        <div className="title">You don't have any actions set up yet</div>
                        <div className="sub">Click the plus above to add your first one</div>
                    </div>
                </div>
            </div>
        );
    }
});



var MarketingRow = React.createClass({
    displayName:"MarketingRow",
    handleClick(id,type,e){
    	console.log(id);
    	console.log(type);
    	FlowRouter.go('/marketing/campaign/'+type+'/'+id+'/edit'); 
    },
    render:function(){

        data = this.props.data; 

        return(
            <div className="marketing-row" onClick={this.handleClick.bind(this,data._id,data.type)}>
                <div className="row">
                	<div className="col-sm-5">
						<div className="big">{data.name}</div>
						<div className="small">Sent to {data.sent} people</div>
                	</div>
                	<div className="col-sm-2">
						<div className="big">{data.opens}</div>
						<div className="small">Opened</div>
                	</div>                	
                	<div className="col-sm-2">
						<div className="big">{data.clicks}</div>
						<div className="small">Clicked</div>
                	</div>
                	<div className="col-sm-3 text-right">
            			<div>
            			asd
            			</div>
            			<div>
							Send at {moment(data.send_time, "HH:mm:SS").format("h:mma")}
            			</div>

                	</div>
                </div>
            </div>
        );
    }
});


MarketingCampaignSingle = React.createClass({
    displayName:"MarketingCampaignSingle",
    mixins: [ReactMeteorData],
    getInitialState(){
    	return {
    		modalOpen :false,
    		modalConfirmOpen :false,
    		inputValue : "",
    	}
    },
    getMeteorData() {

    	const subHandles = [
            Meteor.subscribe("marketing_campaign",Session.get('campaign_id')),
            Meteor.subscribe("marketing_campaign_actions",Session.get('campaign_id')),
        ];

        const subsReady = _.all(subHandles, function (handle) {
            return handle.ready();
        });

        return {
            subsReady: subsReady,
            marketingCampaign: Marketing_campaign.findOne(),
           	campaignActions: MarketingCampaign_actions.find({}).fetch(),
        };
    },
    closeModal(){
    	this.setState({modalOpen:false,modalConfirmOpen:false});
    },
    addNew(){
    	this.setState({modalOpen:true});
    },
    deleteCampaign(){
    	this.setState({modalConfirmOpen:true});
    },
    confirmDeleteCampaign(){
		Meteor.call("/campaign/delete", Session.get('campaign_id'), function(err, res){
			if (err) {
				alert(err[err.error]);
				return;
			}
	      	FlowRouter.go('/marketing/campaigns');
		});

    },
    handleChange(key,val){
        this.setState({inputValue : val});
    },
    saveNew(){
        Meteor.call('/campaignAction/add',Session.get('campaign_id'), this.state.inputValue, function(err,res){
            if(err){
                alert(err);
            }
            this.closeModal();
            FlowRouter.go('/marketing/campaign/email/'+res+'/edit');
        }.bind(this));

    },
    render(){


    	if(!this.data.subsReady){

    		return (<Loading />);
    	}

    	let campaign = this.data.marketingCampaign;

    	// console.log(campaign);
    	// console.log(this.data.campaignActions);

    	return(
    		<div className="marketing">

    			<Modal 
    				modalOpen={this.state.modalOpen}
    				closeModal={this.closeModal}
                    onChange={this.handleChange}
                    saveNew={this.saveNew}
	    			>
    				<Input value={this.state.inputValue} placeholder="Name" onChange={this.handleChange} />
    			</Modal>

    			<ModalConfirm
    				modalOpen={this.state.modalConfirmOpen}
    				closeModal={this.closeModal}
    				deleteAction={this.confirmDeleteCampaign}
    				header={"Delete Campaign"}
    				text={"Are you sure you want to delete "+campaign.name+"? You cannot undo this action."}
    			/>


				<div className="row">
					<div className="col-sm-8">
		                <div className="page-header clearfix">
		                	<div className="pull-left page-title">{campaign.name}</div>
		                	<div className="pull-right">
		                		<div onClick={this.addNew} className="marketing-btn green"><i className="fa fa-plus"></i></div>
		                		{/*<div onClick={this.copyCampaign} className="btn black"><i className="fa fa-copy"></i></div>*/}
		                		<div onClick={this.deleteCampaign} className="marketing-btn red"><i className="fa fa-trash"></i></div>
		                	</div>
		                </div>
		                <div className="white-content">
							<Griddle
							        results={this.data.campaignActions}
							        tableClassName="table"
							        showFilter={true}
							        filterPlaceholderText={"Search..."}
							        resultsPerPage={"35"}
							        useCustomRowComponent={true}
							        customRowComponent={MarketingRow}
							        enableInfiniteScroll={true} bodyHeight={400} useFixedHeader={true}
							        sortAscendingComponent={<span className="fa fa-chevron-down"></span>}
							        sortDescendingComponent={<span className="fa fa-chevron-up"></span>}
                                    customNoDataComponent={NoDataComponent}
							    />

		                </div>
					</div>
					<div className="col-sm-4">
						<div className="marketing-points start">
							<div className="title text-center">
								<i className="fa fa-check-circle"></i> Start Funnel When
							</div>
							<div className="point">

							</div>
						</div>
						<div className="marketing-points end">
							<div className="title text-center">
								<i className="fa fa-check-circle"></i> End Funnel When
							</div>
							<div className="point">

							</div>
						</div>
					</div>
				</div>
    		</div>
    	);
    }
});
