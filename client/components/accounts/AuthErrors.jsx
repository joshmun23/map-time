AuthErrors = React.createClass({
  propTypes: {
    errors: React.PropTypes.object
  },
  render() {
	// console.log(this.props.errors);

	var active = classNames({
		'active' : ! _.isEmpty(this.props.errors)
	});

	return (
		<div className={"list-errors " + active}>
		  {
		    _.values(this.props.errors).map(function (errorMessage) {
		      return <div key={errorMessage} className="list-item">
		        {errorMessage}
		      </div>;
		    })
		  }
		</div>
	);
  }
});
