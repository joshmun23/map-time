
var PersonRow = React.createClass({
    displayName:"PersonRow",
    handleClick:function(id,e){
        router.navigate("#/person/" + id,{update:true});
    },
    render:function(){

        data = this.props.data; 

        return(
            <div className="person-row" onClick={this.handleClick}>
                {this.ci}

            </div>
        );
    }
});

var AllOptions = React.createClass({
    displayName:"AllOptions",
    mixins: [SortableMixin],
    getInitialState(){
        return {
            data : [
                {
                    name: "Rank",
                    id: "rank",
                },
                {
                    name: "Location",
                    id: "location",
                },
                {
                    name: "Last Attendance",
                    id: "last",
                },
                {
                    name: "Program",
                    id: "program",
                },
                {
                    name: "Address",
                    id: "address",
                },
                {
                    name: "Email",
                    id: "email",
                },
                {
                    name: "Lead Source",
                    id: "lead_src",
                },
                {
                    name: "Belt Size",
                    id: "belt_size",
                },
                {
                    name: "TShirt Size",
                    id: "tshirt_size",
                },
                {
                    name: "Age",
                    id: "age",
                },
                {
                    name: "City",
                    id: "city",
                },
                {
                    name: "State",
                    id: "state",
                },
                {
                    name: "Zip",
                    id: "zip",
                }
            ]
        }
    },
    sortableOptions: {
        ref: "data",
        model: "data",
        group : "shared",
        sort: false,
    },
    handleUpdate(e){
    },
    render(){
        return(
            <div className="dragger" ref="data">
                {
                this.state.data.map(function(data, index) {
                    return (
                        <div className="drag-item" key={index}>
                            <div className="content">
                                {data.name}
                            </div>
                        </div>
                    )
                }.bind(this))
                }
            </div>
        );
    }
});

var SelectedOptions = React.createClass({
    displayName:"AllOptions",
    mixins: [SortableMixin],
    sortableOptions: {ref:"data2",model:"data2",group: "shared"},
    getInitialState(){
        return {data2 : this.props.tableHeaders}
    },
    handleSort(){
        this.props.changeSort(this.state.data2);
    },
    render(){
        return(
            <div className="dragger" ref="data2">
                {
                this.state.data2.map(function(data, index) {
                    return (
                        <div className="drag-item" key={index}>
                            <div className="content">
                                {data.name}
                            </div>
                        </div>
                    )
                }.bind(this))
                }
            </div>
        );
    }
});

var columnMeta = [
  {
    "columnName": "_id",
    "visible": false
  },
  {
    "columnName": "fname",
    "displayName": "First Name"
  },
  {
    "columnName": "lname",
    "displayName": "Last Name"
  },
  {
    "columnName": "phone",
    "displayName": "Phone"
  },
  {
    "columnName": "lead_src",
    "displayName": "Lead Source"
  },
];

PeoplePage = React.createClass({
    displayName:"People",
	mixins: [ReactMeteorData],
    getInitialState(){
        return {
            dataLoaded: false,
            listType: true,
            showFilter: false,
            modalVisible: false,
            tableHeaders: [
                    {
                        name :"First Name",
                        id: "fname",
                    },
                    {
                        name: "Last Name",
                        id: "lname",
                    },
                    {
                        name: "Person Type",
                        id: "type",
                    },
                    {
                        name: "Phone",
                        id: "phone",
                    },
                    {
                        name: "Gender",
                        id: "gender",
                    },
            ],
            newSearch: [],
            personData: {},
        };
    },
    getMeteorData() {
    	const subHandles = [
            Meteor.subscribe("allPeople"),
        ];

        const subsReady = _.all(subHandles, function (handle) {
            return handle.ready();
        });

        return {
            subsReady: subsReady,
            people: People.find({}).fetch(),
        };
    },
    toggleModal(){

        this.setState({modalVisible:!this.state.modalVisible});
    },
    toggleFilter(){

        this.setState({showFilter: !this.state.showFilter});
    },
    changeSort(data){

        this.setState({newSearch: data});
    },
    applySearch(){

        this.setState({
            tableHeaders: this.state.newSearch,
            newSearch: [],
        });
        this.toggleFilter();
    },
    handleRowClick(e){

        var rowID = e.props.data._id;
        FlowRouter.go("/person/" + rowID);        
    },
    updateData(key,val){

        let personData = this.state.personData;
        personData[key] = val;
        this.setState({personData: personData});
    },
    saveNewPerson(){
        let personData = this.state.personData;

        console.log(personData);

        Meteor.call("/person/add", personData ,function(err,res){
            if (err) {
                console.log(err);
                alert(err[err.error]);
            }
            FlowRouter.go('/person/'+res);
            return;
        });

    },
    render(){

        if(this.data.subsReady == false){

            return (<Loading/>);
        } else {

            var classes = {
                advancedFilter : classNames({
                    'advanced-filter-bg' : true,
                    'active': this.state.showFilter,
                }),
                displayFilter : classNames({
                    'display-filter' : true,
                    'fadeOpacity' : this.state.showFilter,
                }),
                displayIcon : classNames({
                    'icon-equalizer' : !this.state.showFilter,
                    'icon-close' : this.state.showFilter,
                }),
            };

            var tableHeaders = _.pluck(this.state.tableHeaders, 'id');

            return(
                <div className="people">

                    <Modal
                        modalOpen={this.state.modalVisible}
                        header={"Add New Person"}
                        closeModal={this.toggleModal}
                        saveNew={this.saveNewPerson}
                        >

                        <Input type="text" dbKey={"fname"} label="First Name" onChange={this.updateData} />
                        <Input type="text" dbKey={"lname"} label="Last Name" onChange={this.updateData} />
                        <Input type="text" dbKey={"phone"} label="Phone" pattern="[0-9]*" onChange={this.updateData} />
                        <Input type="email" dbKey={"email"} label="Email" onChange={this.updateData} />
                    </Modal>

                    <div className={classes.displayFilter}>
                        <div className="pull-left">
                            <div>Show</div>
                            <select>
                                <option>All People</option>
                                <option>Leads</option>
                                <option>Members</option>
                                <option>Inactive</option>
                            </select>
                            <div>who attend</div>
                            <select>
                                <option>Smithfield, RI</option>
                            </select>
                        </div>
                        <div className="pull-right">
                            <div onClick={this.toggleFilter} className="filter">
                                <i className={classes.displayIcon}></i>
                            </div>
                            <div onClick={this.toggleModal} className="filter">
                                <i className="icon-user-follow"></i>
                            </div>
                        </div>
                        <div className="clearfix"></div>
                    </div>

                    <div className={classes.advancedFilter}>
                        <div className="advanced-filter">
                            <div className="top-bg clearfix">
                                <div className="title">
                                    Build your search by dragging a column name into the search box below.
                                </div>
                                <AllOptions />
                            </div>
                            <div className="search-box clearfix">
                                <div className="title">
                                    <div>Drag and Drop</div>
                                    Query Builder
                                </div>
                                <div onClick={this.applySearch} className="submit">
                                    Apply
                                </div>
                                <SelectedOptions 
                                        tableHeaders={this.state.tableHeaders} 
                                        changeSort={this.changeSort} 
                                    />
                            </div>
                        </div>
                    </div>

                    <div className="results-container">

                        {console.log(tableHeaders)}
                        {console.log(columnMeta)} 

                        <Griddle
                                results={this.data.people}
                                columns={tableHeaders}
                                columnMetadata={columnMeta}
                                tableClassName="table"
                                showFilter={true}
                                resultsPerPage={"35"}
                                onRowClick={this.handleRowClick}
                                // useCustomRowComponent={true}
                                // customRowComponent={PersonRow}
                                enableInfiniteScroll={true}
                                bodyHeight={400} useFixedHeader={true}
                                sortAscendingComponent={<span className="fa fa-chevron-down"></span>}
                                sortDescendingComponent={<span className="fa fa-chevron-up"></span>}
                                // showSettings={true}
                                // showTableHeading={true}
                            />
                    </div>

                </div>
            );

        }
    }
});
