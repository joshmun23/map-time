MarketingPage = React.createClass({
    displayName:"Marketing",
    render(){

        return(
            <div className="select-grid">
                <div className="row">

                    <div className="col-sm-4">
                        <a className="grid" href="/marketing/campaigns">
                            <div className="icon"><i className="fa fa-arrow-circle-o-right"></i></div>
                            <div className="title">Campaign Funnels</div>
                            <div className="desc">
                                Create automatic marketing from beginning to end.
                            </div>
                        </a>
                    </div>

                    <div className="col-sm-4">
                        <a className="grid" href="/marketing/broadcasts">
                            <div className="icon"><i className="fa fa-bullhorn"></i></div>
                            <div className="title">Broadcasts</div>
                            <div className="desc">
                                Send a broadcast email or text message to a bulk group of people.
                            </div>
                        </a>
                    </div>

                    <div className="col-sm-4">
                        <a className="grid" href="/marketing/premade">
                            <div className="icon"><i className="fa fa-check-circle-o"></i></div>
                            <div className="title">Done for You</div>
                            <div className="desc">
                                Choose from a list of premade tested marketing material made for you.
                            </div>
                        </a>
                    </div>


                </div>
                <div className="clearfix"></div>
            </div>
        );

    }
});
