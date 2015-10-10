PillBox = React.createClass({
	displayName: "Pill",
	handleDelete(){
		console.log('delete clicked');
		this.props.onRemove();
	},
	render: function(){

		let styles = {background: this.props.background};

		return (
			<div className="pillBox" style={styles}>
				<span>{this.props.name}</span>
				<span onClick={this.handleDelete} className="delete" style={{borderLeft:"2px solid rgba(0,0,0,.2)"}}><i className="fa fa-close"/></span>
			</div>
		);   
	} 
});