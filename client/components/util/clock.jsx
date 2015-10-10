Clock = React.createClass({
	displayName: "Clock",
	mixins: [SetIntervalMixin],
	getInitialState(){
		return {date: new Date()}
	},
	componentDidMount(){
		this.setInterval(this.updateDate, 1000);
	},
	updateDate(){
		this.setState({date: new Date()});
	},
	render: function(){
		return (
			<div className="clock">
				<div className="time">{moment(this.state.date).format('h:mmA')}</div>
			</div>
		); 
	} 
});