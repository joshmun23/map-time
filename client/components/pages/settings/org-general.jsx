SettingsOrgGeneral = React.createClass({
    displayName:"SettingsOrg",
    mixins: [ReactMeteorData],
    getInitialState(){ 
        return {
            personOptions: false,
            dataLoaded: false,
            activeTab: 0,
        };
    },
    getMeteorData() {

        const subHandles = [
            Meteor.subscribe("organization",Session.get('person_id')),
        ];

        const subsReady = _.all(subHandles, function (handle) {
            return handle.ready();
        });

        return {
            subsReady: subsReady,
            organization: Organization.findOne(),
        };
    },
    render(){

        if(!this.data.subsReady){

            return (<Loading/>);
        }

        let org = this.data.organization;

        console.log(org);

        return( 
            <div className="settings">
                <div className="row">
                    <div className="col-sm-3">
                        <SettingsOrgNav tabActive={this.props.tabActive}/>
                    </div>
                    <div className="col-sm-9">
                        <div className="white-bg">
                            <div className="section-header clearfix">
                                <div className="title pull-left">
                                    General Settings
                                </div>
                            </div>
                            <div className="section-content">
                                <div className="col-sm-6">
                                    <InputBlock title="Organization Name">
                                        <Input label={"Organization Name"} dbKey={"name"} value={org.name} />
                                    </InputBlock>          
                                    <InputBlock title="Organization HQ Address">
                                        <Input label={"Address"} dbKey={"address"} value={org.address} />
                                        <Input label={"City"} dbKey={"city"} value={org.city} />
                                        <Input label={"State"} dbKey={"state"} value={org.state} />
                                        <Input label={"Zip"} dbKey={"zip"} value={org.zip} />
                                    </InputBlock>                
                                </div>
                                <div className="col-sm-6">
                                    <div className="">
                                        <DropUpload img={org.img} onChange={this.updateImg} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );      
    }
});
