InputList = React.createClass({
    displayName: "InputList",
    render() {
    	if(this.props.value == undefined){
    		return(<span>&nbsp;</span>);
    	}

    	if(this.props.type == "date"){
    		return(<span>{moment(this.props.value).format('MMMM Do YYYY')}</span>)
    	}
        return (<span>{this.props.value}</span>);
		
    }
});
