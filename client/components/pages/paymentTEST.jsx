PAYTEST = React.createClass({
    displayName: "Select Page",
    handleClick(e){
        e.preventDefault();
        Meteor.call('testTrans',function(err,res){
            console.log(err);
            console.log('------');
            console.log(res);
        });
    },
    handleClickSub(e){
        e.preventDefault();
        Meteor.call('testSubsriptions',function(err,res){
            console.log(err);
            console.log('------');
            console.log(res);
        });
    },
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
                    <div className="col-sm-4">
                        <a className="grid" href="/newStudent">
                            <div className="icon"><i className="icon-users"></i></div>
                            <div className="title">Lead Collection</div>
                            <div className="desc">
                                Change into a lead collection kiosk for events or booths.
                            </div>
                        </a>
                    </div>

                    <div className="col-sm-4">
                        <a className="grid" onClick={this.handleClick} href="">
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
