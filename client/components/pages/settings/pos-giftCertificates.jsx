
SettingsPosGiftCerts = React.createClass({
    displayName:"SettingsPosGiftCerts",
    mixins: [ReactMeteorData,TimerMixin],
    getInitialState(){
        return {
            slide: 0,
            newValue : "",
            search : "",
            newCert: "",
        }
    },
    getMeteorData() {

        const subHandles = [
            Meteor.subscribe("shop_giftCertificate"),
        ];

        const subsReady = _.all(subHandles, function (handle) {
            return handle.ready();
        });

        return {
            subsReady: subsReady,
            giftCerticates: ShopGiftCert.find().fetch(),
            certCount: ShopGiftCert.find().count(),
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
    goBack(){
        this.setState({
            slide: 0,
            newProductData: {},
        });
        this.setTimeout(this.clearSelectedProduct,300);
    },
    newCert(){
        this.setState({
            modalOpen: "newCert"
        });
    },
    updateSearch(e){

        this.setState({
            search : e.target.value,
        })
    },
    newValChange(key,val){
        this.setState({newValue: val});
    },
    saveNewCert(){

        Meteor.call("/shop/giftCert/add", this.state.newValue, function(err,res){
            if (err) {
                console.log(err);
                alert(err[err.error]);
            }
            this.setState({
                modalOpen: "",
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

        let filteredGiftCerts = this.data.giftCerticates.filter(function(cert){
            return cert.name.toLowerCase().indexOf(
                this.state.search.toLowerCase()) !== -1;
        }.bind(this));


        return( 
            <div className="settings">
                <section name="newCert">
                    <TimeoutTransitionGroup enterTimeout={300}leaveTimeout={300}transitionName="modal-bezier"component="div"transitionAppear={true}>
                        { this.state.modalOpen == "newCert" &&
                            <div onClick={this.closeModal} className="modal-dialog">
                                <div className="modal-contents small">
                                    <div className="header">
                                        New Certificate
                                    </div>
                                    <div className="content">
                                        
                                         <Input type="currency" value={this.state.newValue} label="Gift Certificate Value" onChange={this.newValChange} />

                                        <div className="clearfix"></div>
                                    </div>
                                    <div className="footer clearfix">
                                        
                                        <div onClick={this.closeModalNow} className="btn cancel">
                                            Cancel
                                        </div>
                                        <div onClick={this.saveNewCert} className="btn submit">
                                            Add Certificate
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </TimeoutTransitionGroup>
                    <TimeoutTransitionGroup enterTimeout={300}leaveTimeout={300}transitionName="modal-fade">
                        { this.state.modalOpen == "newCert" &&
                            <div className="modal-bg"/>
                        }
                    </TimeoutTransitionGroup>
                </section>
                <section name="deleteProduct">
                    <TimeoutTransitionGroup enterTimeout={300}leaveTimeout={300}transitionName="modal-bezier"component="div"transitionAppear={true}>
                        { this.state.modalOpen == "deleteProduct" &&
                            <div onClick={this.closeModal} className="modal-dialog">
                                <div className="modal-contents small">
                                    <div className="header">
                                        Delete Product
                                    </div>
                                    <div className="content">
                                        
                                        Are you sure you want to delete {this.state.selectedProduct.name}? This will delete all data associated with it.

                                        <div className="clearfix"></div>
                                    </div>
                                    <div className="footer clearfix">
                                        
                                        <div onClick={this.closeModalNow} className="btn cancel">
                                            Cancel
                                        </div>
                                        <div onClick={this.confirmedDelete} className="btn delete">
                                            Delete Product
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </TimeoutTransitionGroup>
                    <TimeoutTransitionGroup enterTimeout={300}leaveTimeout={300}transitionName="modal-fade">
                        { this.state.modalOpen == "deleteProduct" &&
                            <div className="modal-bg"/>
                        }
                    </TimeoutTransitionGroup>
                </section>

                <div className="row">
                    <div className="col-sm-3">
                        <SettingsPosNav tabActive={this.props.tabActive}/>
                    </div>
                    <div className="col-sm-9">
                        <div className="white-bg">
                            <div className="view-slider">
                                <div className="view-container" style={slideStyle}>

                                    <div className="slide" style={positionSlide(0)}>

                                        <div className="section-header">
                                            <div className="title">{this.data.certCount} Gift Certificate{isSingle(this.data.certCount,'s')}</div>
                                            <div className="left">
                                                <input type="" value={this.state.search} onChange={this.updateSearch} placeholder="Search..."/>
                                            </div>
                                            <div className="right">
                                                <span onClick={this.newCert}><i className="fa fa-plus"/></span>
                                            </div>
                                        </div>
                                        <div id="scrollContext" className="section-content">
                                                {filteredGiftCerts ? 
                                                    <table className="table">
                                                        <thead>
                                                            <tr>
                                                                <th>Redeem ID</th>
                                                                <th>Amount</th>
                                                                <th>Amount Left</th>
                                                                <th>Created</th>
                                                                <th></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {filteredGiftCerts.map(function(cert,index){

                                                                return(
                                                                    <tr key={index}>
                                                                        <td>{cert.name}</td>
                                                                        <td>${formatMoney(cert.amount)}</td>
                                                                        <td>${formatMoney(cert.amount_left)}</td>
                                                                        <td>{moment(cert.created).format('ddd, MMM Do, YY')}</td>
                                                                        <td></td>
                                                                    </tr>
                                                                )
                                                            }.bind(this))}
                                                        </tbody>
                                                    </table>
                                                :
                                                    <div>You don't have any gift certicates set up yet!</div>
                                                }
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








