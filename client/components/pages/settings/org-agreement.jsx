let SortPaymentOptions = React.createClass({
    displayName:"RankSortModal",
    mixins:[SortableMixin,TimerMixin],
    getInitialState(){
        return {
            agreement_id: this.props.selectedAgreement._id,
            data: this.props.selectedAgreement.options,
            saving: false,
        }
    },
    sortableOptions: {
        ref: "data",
        model: "data",
        handle: ".my-handle",
    },
    handleUpdate(){

        this.handleSave();
    },
    handleNew(pickedID,e){
        let options = this.state.data.slice();
        let newOption = {
            name: "",
            total_price : 0,
            min_down: 0,
            num_payments : 1,
            term_length: 1,
            term_interval: "months",
            active: false,
        }
        let newOptions = options.concat(newOption);
        this.setState({data: newOptions});
        this.setTimeout(this.scrollDown,100);
    },
    scrollDown(){

        $(".sort-scroll").scrollTop($(".sort-scroll")[0].scrollHeight);
    },
    editInput(index,key,val){
        let data = this.state.data;
        data[index][key] = val;
        this.setState({data:data});
        this.handleSave();
    },
    handleSave(){
        this.setState({saving:true});
        Meteor.call("/agreement/saveOptions", this.state.agreement_id, this.state.data ,function(err,res){
            if (err) {
                console.log(err);
                alert(err[err.error]);
            }
            this.setTimeout(this.clearSaving,500);
            return;
        }.bind(this));
    },
    handleDelete(index,e){
        var data = this.state.data.slice();
        console.log(data);
        let deleteData = data[index];
        deleteData['deleted'] = true,
        data[index] = deleteData;
        this.setState({data: data});
    },
    clearSaving(){

        this.setState({saving:false});
    },
    render(){

        let classes = {
            saving : classNames({
                saving: true,
                active: this.state.saving,
            }),
        }

        let agreements = this.state.data;
        return(
            <div>
                <div className="setting-table sort-scroll" style={{tableLayout:"fixed"}} ref="data" key={this.state.key}>
                    {agreements &&
                        agreements.map(function(option,index){
                            return (
                                <div key={index} className="setting-row">
                                    <div className="setting_cell grey handle"><div className="my-handle"><i className="fa fa-bars"/></div></div>
                                    <InputCell value={option.name} dbKey={"name"} onChange={this.editInput.bind(this,index)} greyBg={true} placeholder={"Option Name"} />
                                    <InputCell value={option.total_price} dbKey={"total_price"} onChange={this.editInput.bind(this,index)} type="currency"/>
                                    <InputCell value={option.min_down} dbKey={"min_down"} onChange={this.editInput.bind(this,index)} type="currency"/>
                                    <InputCell value={option.num_payments} dbKey={"num_payments"} onChange={this.editInput.bind(this,index)} type="number"/>
                                    <InputCell value={option.term_length} dbKey={"term_length"} onChange={this.editInput.bind(this,index)} />
                                    <InputCell value={option.term_interval} 
                                        dbKey={"term_interval"} 
                                        onChange={this.editInput.bind(this,index)} 
                                        type="select" 
                                        absolute={"true"}
                                        options={[{label:"months",value:"months"},{label:"weeks",value:"weeks"},{label:"classes",value:"classes"}]} 
                                        />
                                </div>
                            );
                        }.bind(this))
                    }
                </div>
                <div onClick={this.handleNew} className="add-more"><i className="fa fa-plus"/> New Option</div>
                <div className={classes.saving}><i className="fa fa-spinner fa-spin"/> Saving</div>
            </div>
        );
    }
});

SettingsOrgAgreement = React.createClass({
    displayName:"SettingsOrgAgreement",
    mixins: [ReactMeteorData,TimerMixin],
    getInitialState(){
        return {
            modalOpen: "",
            slide: 0,
            newAgreeValue : "",
            selectedAgreement: "",
        };
    },
    getMeteorData() {

        const subHandles = [
            Meteor.subscribe("agreement"),
        ];

        const subsReady = _.all(subHandles, function (handle) {
            return handle.ready();
        });

        return {
            subsReady: subsReady,
            agreements: Agreement.find().fetch(),
            agreementCount: Agreement.find().count(),
        };
    },
    closeModal(e){
        let targetClass = e.target.className;
        if(targetClass == "modal-dialog"){
            this.setState({
                modalOpen: "",
            });
        }
    },
    closeModalNow(){
        this.setState({
            modalOpen: "",
        });
    },
    selectAgreement(agreement){
        console.log(agreement);
        this.setState({
            selectedAgreement: agreement,
            slide: this.state.slide + 1,
        });
    },
    goBack(){
        this.setState({slide: 0});
        this.setTimeout(this.clearAgreement,300);
    },
    clearAgreement(){

        this.setState({selectedAgreement: ""});
    },
    newProgram(){
        this.setState({
            modalOpen: "newProgram",
        });
    },
    deleteAgreement(){
        this.setState({
            modalOpen: "deleteAgreement",
        });
    },
    handleNewAgreementChange(key,val){
        this.setState({newAgreeValue : val});
    },
    createNewAgreement(){
        Meteor.call("/agreement/add", this.state.newAgreeValue ,function(err,res){
            if(err) {
                console.log(err);
                alert(err[err.error]);
            }
            console.log(res);
            this.setState({
                modalOpen: "",
                slide: 1,
                selectedAgreement: res,
            })
            return;
        }.bind(this));
    },
    confirmedDelete(){
        Meteor.call("/agreement/delete", this.state.selectedAgreement._id ,function(err,res){
            if (err) {
                console.log(err);
                alert(err[err.error]);
            }
            this.setState({modalOpen: "",slide: 0,});
            this.setTimeout(this.clearAgreement,300);
            return;
        }.bind(this));
    },
    agreementClick(){
        this.setState({
            modalOpen: "sortAgreement",
        });
    },
    currencyChange(e,val){

        console.log(val);
    },
    render(){

        if(!this.data.subsReady){

            return (<Loading/>);
        }

        let slideStyle = {
            WebkitTransform: "translate(-"+(this.state.slide * 100)+"%,0)",
            transform: "translate(-"+(this.state.slide * 100)+"%,0)",
        }

        let agreements = this.data.agreements;


        return( 
            <div className="settings">

                <section name="NewAgree">
                    <TimeoutTransitionGroup enterTimeout={300}leaveTimeout={300}transitionName="modal-bezier"component="div"transitionAppear={true}>
                        { this.state.modalOpen == "newProgram" &&
                            <div onClick={this.closeModal} className="modal-dialog">
                                <div className="modal-contents small">
                                    <div className="header">
                                        New Agreement
                                    </div>
                                    <div className="content">
                                        
                                         <Input value={this.state.newProgramValue} dbKey={"name"} label="Agreement Name" onChange={this.handleNewAgreementChange} />

                                        <div className="clearfix"></div>
                                    </div>
                                    <div className="footer clearfix">
                                        
                                        <div onClick={this.closeModalNow} className="btn cancel">
                                            Cancel
                                        </div>
                                        <div onClick={this.createNewAgreement} className="btn submit">
                                            Add Agreement
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </TimeoutTransitionGroup>
                    <TimeoutTransitionGroup enterTimeout={300}leaveTimeout={300}transitionName="modal-fade">
                        { this.state.modalOpen == "newProgram" &&
                            <div className="modal-bg"/>
                        }
                    </TimeoutTransitionGroup>
                </section>
                <section name="DeleteAgree">
                    <TimeoutTransitionGroup enterTimeout={300}leaveTimeout={300}transitionName="modal-bezier"component="div"transitionAppear={true}>
                        { this.state.modalOpen == "deleteAgreement" &&
                            <div onClick={this.closeModal} className="modal-dialog">
                                <div className="modal-contents small">
                                    <div className="header">
                                        Delete Agreement
                                    </div>
                                    <div className="content">
                                        
                                         Are you sure you want to delete {this.state.selectedAgreement.name}?

                                    </div>
                                    <div className="footer clearfix">
                                        <div onClick={this.closeModalNow} className="btn cancel">
                                            Cancel
                                        </div>
                                        <div onClick={this.confirmedDelete} className="btn delete">
                                            Delete
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </TimeoutTransitionGroup>
                    <TimeoutTransitionGroup enterTimeout={300}leaveTimeout={300}transitionName="modal-fade">
                        { this.state.modalOpen == "deleteAgreement" &&
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

                            <div className="view-slider">
                                <div className="view-container" style={slideStyle}>

                                    <div className="slide" style={positionSlide(0)}>

                                        <div className="section-header">
                                            <div className="title">{this.data.agreementCount} Agreement{isSingle(this.data.agreementCount,'s')}</div>
                                            <div className="right">
                                                <span onClick={this.newProgram}><i className="fa fa-plus"/></span>
                                            </div>
                                        </div>
                                        <div id="scrollContext" className="section-content">
                                            {agreements.map(function(agreement,index){
                                                return(
                                                    <div key={index} onClick={this.selectAgreement.bind(this,agreement)} className="program-btn">
                                                        {agreement.name}
                                                    </div>
                                                )
                                            }.bind(this))}
                                        </div>
                                    </div>

                                    <div className="slide" style={positionSlide(1)}>
                                        {this.state.selectedAgreement &&
                                            <div>
                                                <div className="section-header">
                                                    <div className="relative">
                                                        <div className="title">{this.state.selectedAgreement.name}</div>
                                                        <div className="left">
                                                            <span onClick={this.goBack}><i className="fa fa-chevron-left"/></span> 
                                                        </div>
                                                        <div className="right">
                                                            <span onClick={this.deleteAgreement}><i className="fa fa-trash-o"/></span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div id="scrollContext" className="section-content">
                                                    <div className="setting-table" style={{tableLayout:"fixed"}}>
                                                        <div className="setting-row table-header">
                                                            <div className="setting_cell grey handle"></div>
                                                            <div className="setting_cell grey">Name</div>
                                                            <div className="setting_cell">Total Price</div>
                                                            <div className="setting_cell">Min Down</div>
                                                            <div className="setting_cell">Payments</div>
                                                            <div className="setting_cell">Term Length</div>
                                                            <div className="setting_cell">Term Interval</div>
                                                        </div>
                                                    </div>
                                                    <SortPaymentOptions selectedAgreement={this.state.selectedAgreement} />
                                                </div>
                                            </div>
                                        }
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
