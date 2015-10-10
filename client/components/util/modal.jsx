Modal = React.createClass({
    displayName:"Modal",
    getInitialState(){
        return {
        	modalOpen: false
        }
    },
    closeModal(e){
		var target = e.target.className;
		if(target == "modal-dialog" || target == "btn cancel"){
	    	this.props.closeModal();
		}
    },
    onChange(){
    	console.log('update modal');
    },
    actionClick(){
    	this.props.actionClick();
    },
    render(){

    	let action_btn_text = this.props.actionText ? this.props.actionText : "Save Changes";
    	
    	return(
    		<div>
    			<TimeoutTransitionGroup enterTimeout={300}leaveTimeout={300}transitionName="modal-bezier"component="div"transitionAppear={true}>
					{ this.props.modalOpen &&
						<div onClick={this.closeModal} className="modal-dialog">
							<div className={this.props.size == "big" ? "modal-contents" : "modal-contents small"}>
								<div className="header">
									{this.props.header}
								</div>
								<div className="content">
									
									{this.props.children}

									<div className="clearfix"></div>
								</div>
								<div className="footer clearfix">
									
									<div onClick={this.closeModal} className="btn cancel">
										cancel
									</div>
									<div onClick={this.actionClick} className={this.props.actionType == "delete" ? "btn delete" : "btn submit"}>
										{action_btn_text}
									</div>
								</div>
							</div>
						</div>
	        		}
				</TimeoutTransitionGroup>
    			<TimeoutTransitionGroup enterTimeout={300}leaveTimeout={300}transitionName="modal-fade">
					{ this.props.modalOpen &&
						<div className="modal-bg"/>
	        		}
				</TimeoutTransitionGroup>
    		</div>
    	);
    }
});
