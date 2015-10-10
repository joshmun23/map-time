var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

InputBlock = React.createClass({
	name:"InputBlock",
	getInitialState() {
	    return {
			editBlock: false,
			hoverState: false,
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
	componentWillLeave(callback){
	},
	onChange(key,val){
		// console.log(key);
		// console.log(val);
        
        var changedData = this.state.changedData;
        changedData[key] = val;

        this.setState({
            changedData: changedData, 
        });

        // console.log(this.state.changedData);


	},
	saveChanges(){
		console.log('saved clicked');
      	Meteor.call("/person/update", Session.get('person_id'), this.state.changedData);
      	this.toggleEdit();
	},
    render(){

        var editChildren = React.Children.map(this.props.children,function(child,index){
                return(
                	<Input {...child.props} onChange={this.onChange}/>
                );                
            }.bind(this));
        var renderedChildrenStatic = React.Children.map(this.props.children,
            function(child) {
                return (<InputList type={child.props.type} value={child.props.value}/>);                
            });

        return (
        	<div onClick={this.openClose} className="block-wrapper" ref="page">

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
									Edit {this.props.title}
								</div>
								<div className="content">
									{editChildren}
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


				<div className={"title"}>{this.props.title}</div>
        		<div className="display-area clearfix">
	            	{renderedChildrenStatic}            
        		</div>
       		</div>
        );


    }
});
