ConnectionIssueDialog = React.createClass({
  render() {
    // If we needed to display multiple kinds of notifications, we would split
    // this out into reusable components, but we only have this one kind so
    // we'll keep it all here.
    return (
    <div className="notifications">
        <div className="notification paper-shadow e5">
            <div className="sync-icon">
                <i className="fa fa-refresh fa-spin"></i>
            </div>
            <div className="meta">
                <div className="title-notification">Trying to connect</div>
                <div className="description">
                There seems to be a connection issue
                </div>
            </div>
        </div>
    </div>
    );
  }
});
