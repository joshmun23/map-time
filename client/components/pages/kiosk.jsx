KioskPage = React.createClass({
    displayName: "SelectKiosk",
    render(){
        return (
            <div className="select-grid">
                <div className="row">
                    <div className="col-sm-4">
                        <a className="grid" href="/checkin">
                            <div className="icon"><i className="fa fa-calendar-check-o"></i></div>
                            <div className="title">Attendance Kiosk</div>
                            <div className="desc">
                                Change into a member attendance kiosk.
                            </div>
                        </a>
                    </div>
                    {/*  UNHIDE ME*/}
                    <div className="col-sm-4 hide">
                        <a className="grid" href="/kiosk/lead">
                            <div className="icon"><i className="icon-users"></i></div>
                            <div className="title">Lead Collection</div>
                            <div className="desc">
                                Change into a lead collection kiosk for events or booths.
                            </div>
                        </a>
                    </div>

                    <div className="col-sm-4">
                        <a className="grid" href="/kiosk/agreement">
                            <div className="icon"><i className="icon-badge"></i></div>
                            <div className="title">Agreement Kiosk</div>
                            <div className="desc">
                                New Agreement Kiosk for users to sign up and select their agreement.
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
});
