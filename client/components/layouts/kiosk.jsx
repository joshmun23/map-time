
// true if we should show an error dialog when there is a connection error.
// Exists so that we don't show a connection error dialog when the app is just
// starting and hasn't had a chance to connect yet.
const ShowConnectionIssues = new ReactiveVar(false);
const CONNECTION_ISSUE_TIMEOUT = 5000;

var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;


// Only show the connection error box if it has been 5 seconds since
// the app started
setTimeout(function () {
  // Show the connection error box
  ShowConnectionIssues.set(true);
}, CONNECTION_ISSUE_TIMEOUT);

// This component handles making the subscriptons to globally necessary data,
// handling router transitions based on that data, and rendering the basid app
// layout
KioskLayout = React.createClass({
  mixins: [ReactMeteorData],
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
  render() {

    var classes = {
      appBodyContainerClass : classNames({
        "kiosk-layout" : true,
        "cordova" : (Meteor.isCordova),
        "isIos" : iOS,
      }),
    }


    return (
      <div id="container" className={ classes.appBodyContainerClass }>

        { this.data.disconnected ? <ConnectionIssueDialog /> : "" }

        {this.props.content}

      </div>
    );
  }
});
