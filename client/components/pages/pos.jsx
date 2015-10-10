
let SelectProduct = React.createClass({
    displayName:"SelectProduct",
    getInitialState(){
        return {
            
        }
    },
    render(){

        let allProducts = this.props.allProducts;
        let selected_id = this.props.selected_id;
        let theProduct = allProducts[selected_id];

        if(this.props.modalType == "variable"){


            <div className="row">
                <div className="col-sm-4">
                    <img src={theProduct.img} />
                </div>
                <div className="col-sm-8">
                    <div className="title">{theProduct.name}</div>
                    {
                        theProduct.product_info.vars.map(function(variation,index){
                            return (
                                <div className="variation">{variation.attrs}</div>
                            )
                        }.bind(this))
                    }
                </div>
            </div>
        }


        return(
            <div>
                this
            </div>
        );
    }
});




PosPage = React.createClass({
    displayName:"PosPage",
	mixins: [ReactMeteorData],
    getMeteorData() {
    	const subHandles = [
            Meteor.subscribe("allPeople"),
            Meteor.subscribe("shop_product"),
            Meteor.subscribe("shop_giftCertificate"),
        ];

        const subsReady = _.all(subHandles, function (handle) {
            return handle.ready();
        });

        return {
            subsReady: subsReady,
            people: People.find({}).fetch(),
            products: ShopProduct.find({published: true}).fetch(),
            gift_certs: ShopGiftCert.find({}).fetch(),
        };
    },
    getInitialState(){
        return {
            search : "",
            totals : {
                total_items: 0,
                sub_total: 0,
                tax_total: 0,
            },
            receiptItems : [],
        }
    },
    closeModalNow(){

        this.setState({
            modalOpen: "",
        });
    },
    updateSearch(key,val){
        this.setState({
            search: val,
        })
    },
    selectProduct(product){

        let location_session = Session.get('location');

        let product_info = product.product_info;
        let addSub = "";
        let addTax = "";

        if(product_info.type == "simple"){

            if(product_info.pricing.sale != ""){
                addSub = product_info.pricing.sale;
            } else {
                 addSub = product_info.pricing.regular;               
            }
            if(product.taxable){
                addTax = (addSub * (location_session.tax_rate / 100) );
            }

            let totals = this.state.totals;
            let receiptItems = this.state.receiptItems;
            totals['sub_total'] = totals['sub_total'] + addSub;
            totals['tax_total'] = totals['tax_total'] + addTax;

            let findIndex = -1;
            _.each(receiptItems,function(rItem,index){
                if(rItem.name == product.name){
                    findIndex = index;
                }
            });

            if(findIndex == -1){

                let addNewReceiptItem = {
                    name : product.name,
                    sub_price:  addSub,
                    tax_price : addTax,
                    img : product.img,
                    qty : 1,
                };

               receiptItems.push(addNewReceiptItem);
            } else {
                receiptItems[findIndex].qty = receiptItems[findIndex].qty + 1;
            }
            this.setState({
                receiptItems : receiptItems,
            });
        }
        if(product_info.type == "variable"){

            this.setState({
                modalOpen: "selectProduct",
                modalType: "variable",
                selected_id : product._id,
            });


        }
    },
    render(){

    	if(!this.data.subsReady){

    		return(<Loading/>);
    	}

        let products = _.object(_.map(this.data.products, function(item) {
           return [item._id, item]
        }));


    	return(
    		<div className="point-of-sales">

                <section name="selectProduct">
                    <TimeoutTransitionGroup enterTimeout={300}leaveTimeout={300}transitionName="modal-bezier"component="div"transitionAppear={true}>
                        { this.state.modalOpen == "selectProduct" &&
                            <div onClick={this.closeModal} className="modal-dialog">
                                <div className="modal-contents">
                                    <div className="header">
                                        Add Product to Cart <div onClick={this.closeModalNow} className="pull-right"><i className="fa fa-close"/></div>
                                    </div>
                                    <div className="content">
                                        
                                        <SelectProduct 
                                            modalType={this.state.modalType}
                                            allProducts={products}
                                            selected_id={this.state.selected_id} 
                                        />

                                         
                                        <div className="clearfix"></div>
                                    </div>
                                </div>
                            </div>
                        }
                    </TimeoutTransitionGroup>
                    <TimeoutTransitionGroup enterTimeout={300}leaveTimeout={300}transitionName="modal-fade">
                        { this.state.modalOpen == "selectProduct" &&
                            <div className="modal-bg"/>
                        }
                    </TimeoutTransitionGroup>
                </section>



                <div className="slide slide-1">
                	<div className="product-container">
                        <div className="top-bar">
                            <Input type="search" placeholder="Search" value={this.state.search} onChange={this.updateSearch} />
                        </div>
                        <div className="product-content">
                            {this.data.products ?
                                this.data.products.map(function(product,index){
                                    if(product.name.toLowerCase().indexOf(this.state.search.toLowerCase()) != -1){
                                        return (
                                            <div key={index} onClick={this.selectProduct.bind(this,product)} className="list-product">
                                                <img src={product.img} />
                                                <div className="text">{product.name}</div>
                                            </div>
                                        )
                                    }
                                }.bind(this))
                            :
                                <div>You have no active products set up. To do so, click here. Tip : Make sure the publish checkbox is checked.</div>
                            }
                		</div>
                	</div>
                	<div className="receipt-container">
                		<div className="receipt">
	                		<div className="receipt-body">
	                			<div className="receipt-header">
	                				<div className="top">Mastery Martial Arts - Smithfield</div>
	                				<div className="addr">9 Cedar Swamp Road Smithfield RI 02917</div>
	                				<div className="phone">(401) 231-5425</div>
	                			</div>
                                {this.state.receiptItems.map(function(item,index){
                                    return (
                                        <div key={index} className="receipt-item">
                                            <img src={item.img}/>
                                            <div className="text">
                                                <div className="title">{item.name}</div>
                                                <div className="qty">QTY: {item.qty}</div>
                                                <div className="price">Price: ${formatMoney((item.sub_price * item.qty))}</div>
                                            </div>
                                        </div>
                                    )   
                                })}
	                		</div>
	                		<div className="receipt-footer">
	                			<div className="line-row">
	                				<div className="left">Total Items</div>
	                				<div className="right">13</div>
	                			</div>
	                			<div className="line-row">
	                				<div className="left">Sub-total</div>
	                				<div className="right">13</div>
	                			</div>
	                			<div className="line-row">
	                				<div className="left">Discount</div>
	                				<div className="right">13</div>
	                			</div>
	                			<div className="line-row">
	                				<div className="left">Tax@7.000%</div>
	                				<div className="right">13</div>
	                			</div>
	                		</div>
                		</div>
                	</div>
                </div>
                <div className="slide slide-2">

                </div>
    		</div>
    	);
    }
});
