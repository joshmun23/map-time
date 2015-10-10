DashPage = React.createClass({
    displayName:"Dashboard",
    getInitialState(){
        return {}
    },
    getMeteorData() {
        const subHandles = [
            Meteor.subscribe("publicLists"),
            Meteor.subscribe("privateLists")
        ];

        const subsReady = _.all(subHandles, function (handle) {
            return handle.ready();
        });


        return {
            subsReady: subsReady,
            currentUser: Meteor.user(),
            disconnected: ShowConnectionIssues.get() && (! Meteor.status().connected)
        };
    },
    render(){
    	return(
    		<div>
                asdasda
                <DropUpload />
    		</div>
    	);
    }
});
