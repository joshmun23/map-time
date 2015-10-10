
var create_options = _.range(2,51);
create_options = _.map(create_options,function(option,index){
    return {value: option, label : option + " days"}
});
var options = [
    {value: 0, label : "No delay"},
    {value: 1, label : "1 day"}
];
var allOptions = options.concat(create_options);

var send_hour = _.range(1,13);
send_hour = _.map(send_hour,function(option,index){
    return {value: option, label : option}
});

var min_options = [
    {value: "00", label : "00"},
];

var send_minute = _.range(15,60,15);
send_minute = _.map(send_minute,function(option,index){
    return {value: option, label : option}
});

var send_minute = min_options.concat(send_minute);

var send_ampm = [
    {value: "AM" , label : "AM"},
    {value: "PM" , label : "PM"},
]


EmailEditor = React.createClass({
    displayName:"EmailEditor",
    mixins: [ReactMeteorData],
    getMeteorData(){

        console.log(this.props._id);

    	const subHandles = [
            Meteor.subscribe("marketing_campaign_actions",Session.get('campaign_id'),this.props._id),
        ];

        const subsReady = _.all(subHandles, function (handle) {
            return handle.ready();
        });

        return {
            subsReady: subsReady,
            email: MarketingCampaign_actions.findOne(),
        };
    },
    renderEditor(){
        console.log('rendering content');
    	$('#content').redactor();
    	$('.redactor_editor').html(this.data.email.content);
    },
    createMarkup(content){ 
    	return {__html: content}; 
    },
    handleChange(){
    
    },
    render(){

    	if(!this.data.subsReady){

    		return(<Loading/>);
    	}

    	let email = this.data.email;
        console.log(this.data);

        let time = email.send_time;
        time = time.match(/(\d+)(?::(\d\d))?\s*(p?)/);
        let delay_hour = parseInt(time[1]);
        let delay_min = parseInt(time[2]);
        let delay_ampm = send_hour - 12 != 0 ? "AM" : "PM";

    	return(
    		<div className="marketing email-editor">
    			<div className="col-sm-8">
	                <div className="white-content">
                        {this.renderEditor()} 
		    			<div id="content"><Loading/></div>
                        
	    			</div>
    			</div>
                <div className="col-sm-4">
                    <div className="mar-top-20">
                        <div>
                            <div className="email-btn red no-right-m"><i className="fa fa-trash"></i></div>
                            <div className="email-btn black"><i className="fa fa-copy"></i></div>
                        </div>
                        <div className="white-content small">
                            <Input type="text" value={email.name} label="Email Subject"/>
                            <label className="pad">Delay</label>
                            <Select value={email.delay} options={allOptions} placeholder=""/>
                            <label className="pad">Send Time</label>
                            <div className="row">
                                <div className="col-sm-4">
                                    <Select value={delay_hour} clearable={false} options={send_hour} placeholder=""/>
                                </div>
                                <div className="col-sm-4">
                                    <Select value={delay_min} clearable={false} options={send_minute} placeholder=""/>
                                </div>
                                <div className="col-sm-4">
                                    <Select value={delay_ampm} clearable={false} options={send_ampm} placeholder=""/>
                                </div>
                            </div>
                            <div className="email-btn green block ">Save</div>
                        </div>
                    </div>
                </div>
    		</div>
    	);
    }
});
