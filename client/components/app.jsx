
AppLayout = React.createClass({
	name:"AppLayout",
	render() {


		return (
	  		<div id="container">

		        <div className="contents-wrapper">
		    		{this.props.content}
	    		</div>
	 	 	</div>
		);
	}
});
