let NewLocationModal = React.createClass({
    displayName:"EditLocationModal",
    getInitialState(){
        return {location : this.props.location}
    },
    handleChange(key,val){
        this.props.onChange(key,val);
    },
    render(){
        let location = this.state.location;
        return(
            <div>
                <div className="col-sm-6">
                    <Input label="Address" dbKey={"address"} onChange={this.handleChange} />
                    <Input label="City"    dbKey={"city"}    onChange={this.handleChange} />
                    <Input label="State"   dbKey={"state"}   onChange={this.handleChange} />
                    <Input label="Zip"     dbKey={"zip"}     onChange={this.handleChange} />
                </div>
                <div className="col-sm-6">
                    <Input label="Short Name" dbKey={"short_name"} onChange={this.handleChange} />
                    <Input label="Phone" dbKey={"phone"} onChange={this.handleChange} />
                    <Input label="Tax Rate" dbKey={"tax_rate"} onChange={this.handleChange} />
                </div>
            </div>
        );
    }
});

let EditLocationModal = React.createClass({
    displayName:"EditLocationModal",
    getInitialState(){
        return {location : this.props.location}
    },
    handleChange(key,val){
        this.props.onChange(key,val);
    },
    render(){
        let location = this.state.location;
        return(
            <div>
                <div className="col-sm-6">
                    <Input value={location.address} dbKey={"address"} label="Address"   onChange={this.handleChange} />
                    <Input value={location.city}    dbKey={"city"} label="City"      onChange={this.handleChange} />
                    <Input value={location.state}   dbKey={"state"} label="State"     onChange={this.handleChange} />
                    <Input value={location.zip}     dbKey={"zip"} label="Zip"       onChange={this.handleChange} />
                </div>
                <div className="col-sm-6">
                    <Input value={location.short_name} dbKey={"short_name"} onChange={this.handleChange} />
                    <Input value={location.phone}    dbKey={"phone"} label="Phone"     onChange={this.handleChange} />
                    <Input value={location.tax_rate} dbKey={"tax_rate"} label="Tax Rate"  onChange={this.handleChange} />
                </div>
            </div>
        );
    }
});

SettingsOrgLocations = React.createClass({
    displayName:"SettingsOrgLocations",
    mixins: [ReactMeteorData],
    getInitialState(){
        return {
            modalNewOpen: false,
            modalEditOpen: false,
            modalDeleteOpen: false,
            locationData : {},
        };
    },
    getMeteorData() {

        const subHandles = [
            Meteor.subscribe("organization",Session.get('person_id')),
            Meteor.subscribe("allLocations"),
        ];

        const subsReady = _.all(subHandles, function (handle) {
            return handle.ready();
        });

        return {
            subsReady: subsReady,
            organization: Organization.findOne(),
            locations: Location.find({}).fetch(),
            locationCount: Location.find({}).count(),
        };
    },
    closeModal(e){
        let targetClass = e.target.className;
        if(targetClass == "modal-dialog"){
            this.setState({
                modalEditOpen: false,
                modalNewOpen: false,
                modalDeleteOpen: false,
            });
        }
    },
    closeModalNow(){
        this.setState({
            modalEditOpen: false,
            modalNewOpen: false,
            modalDeleteOpen: false,
        });
    },
    editLocation(id,e){
        let location_data = _.find(this.data.locations,function(location){
            return location._id == id;
        });
        this.setState({
            modalEditOpen: true,
            location_id : id,
            locationData: location_data,
        });
    },
    saveChangedData(){

        console.log('saveChangedData clicked');
    },
    confirmDelete(id,e){

        this.setState({
            modalDeleteOpen:true,
            location_id : id,
        });
    },
    deleteLocation(){
        Meteor.call("/location/delete", this.state.location_id ,function(err,res){
            if (err) {
                console.log(err);
                alert(err[err.error]);
            }
            this.closeModalNow();
            return;
        }.bind(this));
    },
    newLocation(){
        this.setState({
            modalNewOpen: true,
        });
    },
    locationChange(key,val){
        let locationData = this.state.locationData;
        locationData[key] = val;
        this.setState({locationData : locationData});
    },
    saveNewLocation(){
        Meteor.call("/location/add", this.state.locationData ,function(err,res){
            if (err) {
                console.log(err);
                alert(err[err.error]);
            }
            this.closeModalNow();
            $('#scrollContext').scrollTop($('#scrollContext')[0].scrollHeight);
            return;
        }.bind(this));
    },
    saveEditLocation(){
        Meteor.call("/location/updateData", this.state.location_id, this.state.locationData ,function(err,res){
            if (err) {
                console.log(err);
                alert(err[err.error]);
            }
            this.closeModalNow();
            return;
        }.bind(this));
    },
    render(){

        if(!this.data.subsReady){

            return (<Loading/>);
        }

        let org = this.data.organization;
        let locations = this.data.locations;

        return( 
            <div className="settings">

                <section name="NewLocation">
                    <TimeoutTransitionGroup enterTimeout={300}leaveTimeout={300}transitionName="modal-bezier"component="div"transitionAppear={true}>
                        { this.state.modalNewOpen &&
                            <div onClick={this.closeModal} className="modal-dialog">
                                <div className="modal-contents">
                                    <div className="header">
                                        New Location
                                    </div>
                                    <div className="content">
                                        
                                         <NewLocationModal
                                            onChange={this.locationChange}
                                            location={this.state.locationData} />

                                        <div className="clearfix"></div>
                                    </div>
                                    <div className="footer clearfix">
                                        
                                        <div onClick={this.closeModalNow} className="btn cancel">
                                            Cancel
                                        </div>
                                        <div onClick={this.saveNewLocation} className="btn submit">
                                            Add New Location
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </TimeoutTransitionGroup>
                    <TimeoutTransitionGroup enterTimeout={300}leaveTimeout={300}transitionName="modal-fade">
                        { this.state.modalNewOpen &&
                            <div className="modal-bg"/>
                        }
                    </TimeoutTransitionGroup>
                </section>

                <section name="EditLocation">
                    <TimeoutTransitionGroup enterTimeout={300}leaveTimeout={300}transitionName="modal-bezier"component="div"transitionAppear={true}>
                        { this.state.modalEditOpen &&
                            <div onClick={this.closeModal} className="modal-dialog">
                                <div className="modal-contents big">
                                    <div className="header">
                                        Edit Location
                                    </div>
                                    <div className="content">
                                        
                                         <EditLocationModal
                                            onChange={this.locationChange}
                                            location={this.state.locationData} />

                                        <div className="clearfix"></div>
                                    </div>
                                    <div className="footer clearfix">
                                        
                                        <div onClick={this.closeModalNow} className="btn cancel">
                                            Cancel
                                        </div>
                                        <div onClick={this.saveEditLocation} className="btn submit">
                                            Save Changes
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </TimeoutTransitionGroup>
                    <TimeoutTransitionGroup enterTimeout={300}leaveTimeout={300}transitionName="modal-fade">
                        { this.state.modalEditOpen &&
                            <div className="modal-bg"/>
                        }
                    </TimeoutTransitionGroup>
                </section>

                <section name="DeleteLocation">
                    <TimeoutTransitionGroup enterTimeout={300}leaveTimeout={300}transitionName="modal-bezier"component="div"transitionAppear={true}>
                        { this.state.modalDeleteOpen &&
                            <div onClick={this.closeModal} className="modal-dialog">
                                <div className="modal-contents small">
                                    <div className="header">
                                        Delete Location
                                    </div>
                                    <div className="content">
                                        
                                         <div className="text-center">
                                            Are you sure you want to delete?<br/> 
                                            There are currently no undos.
                                        </div>

                                        <div className="clearfix"></div>
                                    </div>
                                    <div className="footer clearfix">
                                        
                                        <div onClick={this.closeModalNow} className="btn cancel">
                                            Cancel
                                        </div>
                                        <div onClick={this.deleteLocation} className="btn delete">
                                            Delete Location
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </TimeoutTransitionGroup>
                    <TimeoutTransitionGroup enterTimeout={300}leaveTimeout={300}transitionName="modal-fade">
                        { this.state.modalDeleteOpen &&
                            <div className="modal-bg"/>
                        }
                    </TimeoutTransitionGroup>
                </section>            

                <div className="row">
                    <div className="col-sm-3">
                        <SettingsOrgNav tabActive={this.props.tabActive}/>
                    </div>
                    <div className="col-sm-9">
                        <div className="white-bg">
                            <div className="section-header">
                                <div className="relative">
                                    <div className="title">{this.data.locationCount} Locations</div>
                                    <div className="right">
                                        <span onClick={this.newLocation}><i className="fa fa-plus"/></span>
                                    </div>
                                </div>
                            </div>
                            <div id="scrollContext" className="section-content">

                                {locations.map(function(location,index){
                                    return(
                                        <div key={index} className={"locations-row count-"+ index}>
                                            <div onClick={this.editLocation.bind(this,location._id)}>
                                                <div className="icon-left">
                                                    <i className="icon-pointer"></i>
                                                </div>
                                                <div className="location-content">
                                                    <div className="title">{location.short_name}</div>
                                                    <div className="detail-row">
                                                        <i className="fa fa-location-arrow"></i> {location.address} {location.city} {location.state} {location.zip}
                                                    </div>
                                                    <div className="detail-row">
                                                        <i className="fa fa-phone"></i> {formatPhone(location.phone)}
                                                    </div>
                                                    <div className="detail-row">
                                                        <i className="fa fa-dollar"></i> {location.tax_rate}% tax rate
                                                    </div>
                                                    <div className="detail-row">
                                                        <i className="fa fa-child"></i> {location.contact_count} linked contacts
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="delete-action" onClick={this.confirmDelete.bind(this,location._id)}>
                                                <i className="fa fa-times-circle"></i>
                                            </div>
                                        </div>
                                    )
                                }.bind(this))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );      
    }
});
