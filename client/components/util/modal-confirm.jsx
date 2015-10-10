ModalConfirm = React.createClass({
    displayName:"Modal",
    closeModal(e){
		var target = e.target.className;
		if(target == "modal-dialog" || target == "btn cancel"){
	    	this.props.closeModal();
		}
    },
    delete(){
    	this.props.deleteAction();
    },
    render(){

    	return(
    		<div>
    			<TimeoutTransitionGroup enterTimeout={300}leaveTimeout={300}transitionName="modal-bezier"component="div"transitionAppear={true}>
					{ this.props.modalOpen &&
						<div onClick={this.closeModal} className="modal-dialog">
							<div className="modal-contents small">
								<div className="header">
									{this.props.header}
								</div>
								<div className="content">
									{this.props.text}
				                  
									<div className="clearfix"></div>
								</div>
								<div className="footer clearfix">
									
									<div onClick={this.closeModal} className="btn cancel">
										cancel
									</div>
									<div onClick={this.delete} className="btn delete">
										Delete
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
