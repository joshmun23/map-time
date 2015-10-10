SettingsPage = React.createClass({
    displayName:"Setting",
    render(){

        return(
            <div className="select-grid">
                <div className="row">

                    <div className="col-sm-4">
                        <a className="grid" href="/settings/account">
                            <div className="icon"><i className="icon-user"></i></div>
                            <div className="title">
                                Your Account
                            </div>
                            <div className="desc">
                                Update Your Password, Change your email address and update your picture.
                            </div>
                        </a>
                    </div>

                    <div className="col-sm-4">
                        <a className="grid" href="/settings/org">
                            <div className="icon"><i className="icon-settings"></i></div>
                            <div className="title">
                                Organization Setup
                            </div>
                            <div className="desc">
                                Manage your organization information, managers, ranks and more
                            </div>
                        </a>
                    </div>

                    <div className="col-sm-4">
                        <a className="grid" href="/settings/pos">
                            <div className="icon"><i className="icon-basket"></i></div>
                            <div className="title">
                                Point of Sales
                            </div>
                            <div className="desc">
                                Manage point of sales system. Add, View and Manage items and inventory.
                            </div>
                        </a>
                    </div>

                    <div className="col-sm-4 hide">
                        <a className="grid" href="/settings/account">
                            <div className="icon"><i className="icon-wallet"></i></div>
                            <div className="title">
                                Billing
                            </div>
                            <div className="desc">
                                Manage your subscriptions and update your account
                            </div>

                        </a>
                    </div>


                </div>
                <div className="clearfix"></div>
            </div>
        );

    }
});
