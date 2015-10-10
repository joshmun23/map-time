var columnMeta = [
  {
    "columnName": "_id",
    "visible": false
  },
  {
    "columnName": "org_id",
    "visible": false
  }
];

var tableHeaders = ["name","category"];

SettingsOrgTags = React.createClass({
    displayName:"SettingsOrgTags",
    mixins: [ReactMeteorData],
    getInitialState(){
        return {
            modalOpen: "",
            newTagValue: "",
        };
    },
    getMeteorData() {

        const subHandles = [
            Meteor.subscribe("tags"),
        ];

        const subsReady = _.all(subHandles, function (handle) {
            return handle.ready();
        });

        return {
            subsReady: subsReady,
            tags: Tags.find().fetch(),
            tagCount:  Tags.find().count(),
        };
    },
    closeModal(e){
        let targetClass = e.target.className;
        if(targetClass == "modal-dialog"){
            this.setState({
                modalOpen: "",
                user: "",
                user_id : "",
            });
        }
    },
    closeModalNow(){
        this.setState({
            modalOpen: "",
            user: "",
            user_id : "",
        });
    },
    newTag(){

        this.setState({
            modalOpen: "createNewTag",
        });
    },
    updateTag(key,val){

        this.setState({newTagValue:val});
    },
    createTag(){

        Meteor.call("/tag/add", this.state.newTagValue, function(err,res){
            if (err) {
                console.log(err);
                alert(err[err.error]);
            }
            this.setState({
                modalOpen: "",
                newTagValue: "",
            });
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

        return( 
            <div className="settings">

                <section name="NewTag">
                    <TimeoutTransitionGroup enterTimeout={300}leaveTimeout={300}transitionName="modal-bezier"component="div"transitionAppear={true}>
                        { this.state.modalOpen == "createNewTag" &&
                            <div onClick={this.closeModal} className="modal-dialog">
                                <div className="modal-contents small">
                                    <div className="header">
                                        Add New Tag
                                    </div>
                                    <div className="content">
                                        <Input label="Tag Name" type="" value={this.state.newTagValue} dbKey="tag" onChange={this.updateTag} />

                                        <div className="clearfix"></div>
                                    </div>
                                    <div className="footer clearfix">
                                        
                                        <div onClick={this.closeModalNow} className="btn cancel">
                                            Cancel
                                        </div>
                                        <div onClick={this.createTag} className="btn submit">
                                            Add Tag
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </TimeoutTransitionGroup>
                    <TimeoutTransitionGroup enterTimeout={300}leaveTimeout={300}transitionName="modal-fade">
                        { this.state.modalOpen == "createNewTag" &&
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
                                            <div className="title">{this.data.tagCount} Tag{isSingle(this.data.tagCount,'s')}</div>
                                            <div className="right">
                                                <span onClick={this.newTag}><i className="fa fa-plus"/></span>
                                            </div>
                                        </div>
                                        <div className="section-content">

                                            <div className="row">
                                                <div className="col-sm-6">
                                                </div>
                                                <div className="col-sm-12">  
                                                    <Griddle
                                                            results={this.data.tags}
                                                            columns={tableHeaders}
                                                            columnMetadata={columnMeta}
                                                            tableClassName="table"
                                                            showFilter={true} 
                                                            resultsPerPage={"35"}
                                                            // onRowClick={this.handleRowClick}
                                                            // useCustomRowComponent={true}
                                                            // customRowComponent={PersonRow}
                                                            enableInfiniteScroll={true}
                                                            bodyHeight={400} useFixedHeader={true}
                                                            sortAscendingComponent={<span className="fa fa-chevron-down"></span>}
                                                            sortDescendingComponent={<span className="fa fa-chevron-up"></span>}
                                                        />
                                                </div>
                                            </div>


                                        </div>
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
