PageBack = React.createClass({
	handleClick(){
		history.back();
	},
    render() {
        return (
            <div onClick={this.handleClick} className="page-back">
                <i className="fa fa-chevron-left"></i> Back
            </div>
        );
    }
});
