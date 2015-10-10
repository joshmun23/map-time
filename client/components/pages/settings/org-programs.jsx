let RankSortModal = React.createClass({
    displayName:"RankSortModal",
    mixins:[SortableMixin,TimerMixin],
    getInitialState(){
        return {
            data : this.props.ranks,
            program_id : this.props.program_id,
        }
    },
    sortableOptions: {
        ref: "data",
        model: "data",
        handle: ".my-handle",
    },
    editInput(index,type,e){
        var data = this.state.data;
        data[index][type] = e.target.value;
        this.setState({data: data});
    },
    handleUpdate(){
        console.log(this.state.data);
    },
    handleNew(pickedID,e){
        
        let ranks = this.state.data.slice();
        let newRank = {
            hex_color:"FFFFFF",
            name: "",
            required_classes: "0",
        }
        let newRanks = ranks.concat(newRank);
        this.setState({data: newRanks});
        this.setTimeout(this.scrollDown,100);
    },
    scrollDown(){

        $(".modal-contents .content").scrollTop($(".modal-contents .content")[0].scrollHeight);
    },
    handleSave(){
        console.log(this.state.data);
        console.log(this.state.program);
        Meteor.call("/program/saveRankOrder", this.state.program_id, this.state.data ,function(err,res){
            if (err) {
                console.log(err);
                alert(err[err.error]);
            }
            this.closeModalNow();
            return;
        }.bind(this));
    },
    handleDelete(index,e){
        var data = this.state.data.slice();
        let deleteData = data[index];
        deleteData['deleted'] = true,
        data[index] = deleteData;
        this.setState({data: data});
    },
    closeModalNow(){

        this.props.closeModal();
    },
    render(){

        let ranks = this.state.data;
        return(
            <div>
                <div className="content no-pad clearfix">
                    <div className="sort-ranks clearfix" ref="data" key={this.state.key}>
                        {ranks &&
                            ranks.map(function(rank,index){

                            return (
                                <div key={index} className={rank.deleted ? "hide" : "sort-row clearfix"}>
                                    <div className="my-handle"><i className="fa fa-bars"></i></div>
                                    <div className="col-sm-4">
                                        <div className="input-wrap">
                                            <input type="text" onChange={this.editInput.bind(this,index,"name")} placeholder="Rank Name" value={rank.name}/>
                                        </div>
                                    </div>
                                    <div className="col-sm-8 detail-column">
                                        <div onClick={this.handleDelete.bind(this,index)}className="my-delete"><i className="fa fa-times-circle"></i></div>
                                        <div className="color-picker" style={{background:"#"+rank.hex_color}}>
                                        </div>
                                        Must Attend 
                                        <div className="input-wrap">
                                            <input type="text" onChange={this.editInput.bind(this,index,"required_classes")} value={rank.required_classes}/>
                                        </div>
                                        Classes
                                    </div>
                                </div>
                            );
                        }.bind(this))}
                    </div>
                </div>
                <div className="footer button-3 clearfix">
                   <div onClick={this.handleNew} className="btn new">
                        Add New Rank
                    </div>
                    <div onClick={this.closeModalNow} className="btn cancel">
                        Cancel
                    </div>
                    <div onClick={this.handleSave} className="btn submit">
                        Save Ranks
                    </div>
                   
                </div>
            </div>
        );
    }
});

let AgreementModal = React.createClass({
    displayName:"RankSortModal",
    mixins:[TimerMixin],
    getInitialState(){
        return {
            program_id: this.props.program._id,
            programAgreements : this.props.program.agreements,
            agreeSearch: "",
        }
    },
    updateSearch(key,val){

        this.setState({agreeSearch:val});
    },
    agreementAdd(agreement_id,e){

        let programAgreements = this.state.programAgreements;
        programAgreements.push(agreement_id);
        this.setState({programAgreements:programAgreements});

    },    
    agreementRemove(agreement_id,index,e){
        let programAgreements = this.state.programAgreements;
        let newData = _.without(programAgreements,agreement_id);
        this.setState({programAgreements:newData});
    },
    handleSave(){
        Meteor.call("/program/saveAgreements", this.state.program_id, this.state.programAgreements, function(err,res){
            if (err) {
                console.log(err);
                alert(err[err.error]);
            }
            this.closeModalNow();
            return;
        }.bind(this));
    },
    closeModalNow(){
        this.props.closeModal();
    },
    render(){

        let availableAgreements = [];
        let selectedAgreements = [];
        this.props.agreements.map(function(agreement,index){
            if(agreement.name.toLowerCase().indexOf(this.state.agreeSearch.toLowerCase()) !== -1 && this.state.programAgreements.indexOf(agreement._id) == -1){
                availableAgreements.push(agreement);
            }
            if(this.state.programAgreements.indexOf(agreement._id) != -1) {
                selectedAgreements.push(agreement);
            }
        }.bind(this));

        return(
            <div>
                <div className="content no-pad clearfix"> 
                    <div className="setting-selectPrograms">
                        <div className="setting-header clearfix">
                            <div className="header-col left">Selected Agreements</div>
                            <div className="header-col right">
                                <Input type="search" value={this.state.agreeSearch} onChange={this.updateSearch} placeholder="Search"/>
                            </div>
                        </div>
                        <div className="setting-content clearfix">
                            <div className="column left">
                                {selectedAgreements ?
                                    selectedAgreements.map(function(agreement,index){
                                        return (
                                            <div key={index} onClick={this.agreementRemove.bind(this,agreement._id,index)} className="selection">{agreement.name}</div>
                                        );
                                    }.bind(this))
                                :
                                    <div>Add an agreement to this program by selecting one on the right</div>
                                }
                            </div>
                            <div className="column right">
                                {availableAgreements ?
                                    availableAgreements.map(function(agreement,index){
                                        return (
                                            <div key={index} onClick={this.agreementAdd.bind(this,agreement._id)} className="selection">{agreement.name}</div>
                                        );
                                    }.bind(this))
                                :
                                    <div>No Results</div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <div onClick={this.closeModalNow} className="btn cancel">
                        Cancel
                    </div>
                    <div onClick={this.handleSave} className="btn submit">
                        Save Agreements
                    </div>
                </div>
            </div>
        );
    }
});

SettingsOrgPrograms = React.createClass({
    displayName:"SettingsOrgPrograms",
    mixins: [ReactMeteorData,TimerMixin],
    getInitialState(){
        return {
            modalOpen: "",
            slide: 0,
            newProgramValue : "",
            selectedProgram: "",
        };
    },
    getMeteorData() {

        const subHandles = [
            Meteor.subscribe("program"),
            Meteor.subscribe("agreement"),
        ];

        const subsReady = _.all(subHandles, function (handle) {
            return handle.ready();
        });

        return {
            subsReady: subsReady,
            programs: Program.find().fetch(),
            agreements: Agreement.find().fetch(),
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
    selectProgram(program_id){

        this.setState({
            selectedProgram: program_id,
            slide: 1,
        });
    },
    goBack(){
        this.setState({
            slide: 0
        });
    },
    newProgram(){
        this.setState({
            modalOpen: "newProgram",
        });
    },
    deleteProgram(){
        this.setState({
            modalOpen: "deleteProgram",
        });
    },
    handleNewProgramChange(key,val){

        this.setState({newProgramValue : val});
    },
    createNewProgram(){
        Meteor.call("/program/add", this.state.newProgramValue ,function(err,res){
            if (err) {
                console.log(err);
                alert(err[err.error]);
            }
            this.setState({
                modalOpen: "",
                slide: 1,
                newProgramValue : "",
                selectedProgram: res,
            })
            return;
        }.bind(this));
    },
    confirmedDelete(){
        Meteor.call("/program/delete", this.state.selectedProgram ,function(err,res){
            if (err) {
                console.log(err);
                alert(err[err.error]);
            }
            this.setState({
                modalOpen: "",
                slide: 0,
                selectedProgram: "",
            })
            return;
        }.bind(this));
    },
    ranksClick(){
        this.setState({
            modalOpen: "sortRanks",
        });
    },
    agreementClick(){
        this.setState({
            modalOpen: "AgreementModal",
        });

    },
    updateFamily(key,val){
        Meteor.call("/program/saveFamilyPricing", this.state.selectedProgram, key, val, function(err,res){
            if (err) {
                console.log(err);
                alert(err[err.error]);
            }
            return;
        }.bind(this));
    },
    render(){

        if(!this.data.subsReady){

            return (<Loading/>);
        }
        let slideStyle = {
            WebkitTransform: "translate(-"+(this.state.slide * 100)+"%,0)",
            transform: "translate(-"+(this.state.slide * 100)+"%,0)",
        }

        let programs = _.object(_.map(this.data.programs, function(item) {
           return [item._id, item]
        }));

        let agreements = _.object(_.map(this.data.agreements, function(item) {
           return [item._id, item]
        }));

        return( 
            <div className="settings">

                <section name="NewProgram">
                    <TimeoutTransitionGroup enterTimeout={300}leaveTimeout={300}transitionName="modal-bezier"component="div"transitionAppear={true}>
                        { this.state.modalOpen == "newProgram" &&
                            <div onClick={this.closeModal} className="modal-dialog">
                                <div className="modal-contents small">
                                    <div className="header">
                                        New Program
                                    </div>
                                    <div className="content">
                                        
                                         <Input value={this.state.newProgramValue} dbKey={"name"} label="Program Name" onChange={this.handleNewProgramChange} />

                                        <div className="clearfix"></div>
                                    </div>
                                    <div className="footer clearfix">
                                        
                                        <div onClick={this.closeModalNow} className="btn cancel">
                                            Cancel
                                        </div>
                                        <div onClick={this.createNewProgram} className="btn submit">
                                            Add Program
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
                <section name="DeleteProgram">
                    <TimeoutTransitionGroup enterTimeout={300}leaveTimeout={300}transitionName="modal-bezier"component="div"transitionAppear={true}>
                        { this.state.modalOpen == "deleteProgram" &&
                            <div onClick={this.closeModal} className="modal-dialog">
                                <div className="modal-contents small">
                                    <div className="header">
                                        Confirm Delete Program
                                    </div>
                                    <div className="content text-center">
                                        Are you sure you want to delete?
                                        <br/>There are no undos. All people assign to this program will be unlinked.
                                        <div className="clearfix"></div>
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
                        { this.state.modalOpen == "deleteProgram" &&
                            <div className="modal-bg"/>
                        }
                    </TimeoutTransitionGroup>
                </section>
                <section name="SortRanks">
                    <TimeoutTransitionGroup enterTimeout={300}leaveTimeout={300}transitionName="modal-bezier"component="div"transitionAppear={true}>
                        { this.state.modalOpen == "sortRanks" &&
                            <div onClick={this.closeModal} className="modal-dialog">
                                <div className="modal-contents">
                                    <div className="header sort-header">
                                        <div className="row">
                                            <div className="col-sm-4">
                                                Rank Name
                                            </div>
                                            <div className="col-sm-8">
                                                Rank Details
                                            </div>
                                        </div>
                                    </div>
                                    <RankSortModal
                                        program_id={programs[this.state.selectedProgram]._id}
                                        ranks={programs[this.state.selectedProgram].ranks}
                                        closeModal={this.closeModalNow}
                                    />
                                </div>
                            </div>
                        }
                    </TimeoutTransitionGroup>
                    <TimeoutTransitionGroup enterTimeout={300}leaveTimeout={300}transitionName="modal-fade">
                        { this.state.modalOpen == "sortRanks" &&
                            <div className="modal-bg"/>
                        }
                    </TimeoutTransitionGroup>
                </section>
                <section name="sortAgreement">
                    <TimeoutTransitionGroup enterTimeout={300}leaveTimeout={300}transitionName="modal-bezier"component="div"transitionAppear={true}>
                        { this.state.modalOpen == "AgreementModal" &&
                            <div onClick={this.closeModal} className="modal-dialog">
                                <div className="modal-contents">
                                    <div className="header">
                                        Select Program Agreements
                                    </div>
                                    <AgreementModal
                                        program={programs[this.state.selectedProgram]}
                                        agreements={this.data.agreements}
                                        closeModal={this.closeModalNow}
                                    />
                                </div>
                            </div>
                        }
                    </TimeoutTransitionGroup>
                    <TimeoutTransitionGroup enterTimeout={300}leaveTimeout={300}transitionName="modal-fade">
                        { this.state.modalOpen == "AgreementModal" &&
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
                                            <div className="title">Programs / Ranks</div>
                                            <div className="right">
                                                <span onClick={this.newProgram}><i className="fa fa-plus"/></span>
                                            </div>
                                        </div>
                                        <div id="scrollContext" className="section-content">
                                            {this.data.programs ? 
                                                this.data.programs.map(function(program,index){
                                                    return(
                                                        <div key={index} onClick={this.selectProgram.bind(this,program._id)} className="program-btn">
                                                            {program.name}
                                                        </div>
                                                    )
                                                }.bind(this))
                                            :
                                                <div>You don't have any programs set up yet!</div>
                                            }
                                        </div>
                                    </div>

                                    <div className="slide" style={positionSlide(1)}>
                                        {programs[this.state.selectedProgram] &&
                                            <span>
                                                <div className="section-header">
                                                    <div className="relative">
                                                        <div className="title">{programs[this.state.selectedProgram].name}</div>
                                                        <div className="left">
                                                            <span onClick={this.goBack}><i className="fa fa-chevron-left"/></span> 
                                                        </div>
                                                        <div className="right">
                                                            <span onClick={this.deleteProgram}><i className="fa fa-trash-o"/></span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="section-content">
                                                    <div className="row">
                                                        <div onClick={this.ranksClick} className="col-sm-6">
                                                            <div className="block-wrapper">
                                                                <div className="title">
                                                                    Ranks
                                                                </div>
                                                            </div>
                                                            {programs[this.state.selectedProgram].ranks != undefined ?
                                                                programs[this.state.selectedProgram].ranks.map(function(rank,index){
                                                                    let style = {background:"#"+rank.hex_color,color: parseColorDarkness(rank.hex_color) ? "#FFF" : "rgba(0, 0, 0, 0.8)",}
                                                                    return (<div className="rank-item" style={style} key={index}>{(index + 1)}. {rank.name}</div>)
                                                                })
                                                            : <div>Click here to set up your first rank</div>
                                                            }
                                                        </div>
                                                        <div onClick={this.agreementClick} className="col-sm-6">
                                                            <div className="block-wrapper">
                                                                <div className="title">Agreements</div>
                                                            </div>
                                                            {programs[this.state.selectedProgram].agreements.length != 0 ?
                                                                programs[this.state.selectedProgram].agreements.map(function(agreement,index){
                                                                    return (<div className="agreement-item" key={index}>{agreements[agreement].name}</div>)
                                                                })
                                                            : 
                                                                <div>Click here to setup your first agreement</div>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="section-footer">
                                                    <div className="row">
                                                        <div className="col-sm-3">
                                                            <div className="title">
                                                                Family Pricing<br/>
                                                                % off
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-9">
                                                            <ul className="family-inputs clearfix">
                                                                <li><i>%</i><label>2nd</label><input value={programs[this.state.selectedProgram].family_pricing[0]} onChange={this.updateFamily.bind(null,0)} placeholder="0%" /></li>
                                                                <li><i>%</i><label>3rd</label><input value={programs[this.state.selectedProgram].family_pricing[1]} onChange={this.updateFamily.bind(null,1)} placeholder="0%" /></li>
                                                                <li><i>%</i><label>4th</label><input value={programs[this.state.selectedProgram].family_pricing[2]} onChange={this.updateFamily.bind(null,2)} placeholder="0%" /></li>
                                                                <li><i>%</i><label>5th+</label><input value={programs[this.state.selectedProgram].family_pricing[3]} onChange={this.updateFamily.bind(null,3)} placeholder="0%" /></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </span>
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
