
SettingsPosCategories = React.createClass({
    displayName:"SettingsPosCategories",
    mixins: [ReactMeteorData,TimerMixin],
    getMeteorData() {

        const subHandles = [
            Meteor.subscribe("shop_category"),
        ];

        const subsReady = _.all(subHandles, function (handle) {
            return handle.ready();
        });

        return {
            subsReady: subsReady,
            shop_categories: ShopCategory.find().fetch(),
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
    createNewProduct(){

        console.log(this.state.newProductValue.type);

        Meteor.call("/shop/product/add", this.state.newProductValue.name, this.state.newProductValue.type, function(err,res){
            if (err) {
                console.log(err);
                alert(err[err.error]);
            }
            this.setState({
                modalOpen: "",
                slide: 1,
                newProductValue : {
                    name: "",
                    type: ""
                },
                selectedProduct: res,
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

        let filteredProducts = this.data.products.filter(function(product){
            return product.name.toLowerCase().indexOf(
                this.state.productFilter.toLowerCase()) !== -1;
        }.bind(this));

        let products = _.object(_.map(this.data.products, function(item) {
           return [item._id, item]
        }));

        let selectedProduct = this.state.selectedProduct;

        return( 
            <div className="settings">
                <section name="newProduct">
                    <TimeoutTransitionGroup enterTimeout={300}leaveTimeout={300}transitionName="modal-bezier"component="div"transitionAppear={true}>
                        { this.state.modalOpen == "newProduct" &&
                            <div onClick={this.closeModal} className="modal-dialog">
                                <div className="modal-contents small">
                                    <div className="header">
                                        New Product
                                    </div>
                                    <div className="content">
                                        
                                         <Input value={this.state.newProductValue.name} dbKey={"name"} label="Product Name" onChange={this.newProductChange} />
                                         <Select value={this.state.newProductValue.type} dbKey={"type"} label="Product Type" onChange={this.newProductChange} 
                                            options={[
                                                {label:"Simple",value:"simple"},
                                                {label:"Variable",value:"variable"},    
                                                {label:"Bundled",value:"bundle"}
                                            ]}       
                                         />

                                        <div className="clearfix"></div>
                                    </div>
                                    <div className="footer clearfix">
                                        
                                        <div onClick={this.closeModalNow} className="btn cancel">
                                            Cancel
                                        </div>
                                        <div onClick={this.createNewProduct} className="btn submit">
                                            Add Product
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </TimeoutTransitionGroup>
                    <TimeoutTransitionGroup enterTimeout={300}leaveTimeout={300}transitionName="modal-fade">
                        { this.state.modalOpen == "newProduct" &&
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
                <section name="addVariants">
                    <TimeoutTransitionGroup enterTimeout={300}leaveTimeout={300}transitionName="modal-bezier"component="div"transitionAppear={true}>
                        { this.state.modalOpen == "addVariants" &&
                            <div onClick={this.closeModal} className="modal-dialog">
                                <div className="modal-contents">
                                    <div className="header">
                                        Add Product Variants
                                    </div>
                                    <VariantOptions 
                                        product_id={selectedProduct}
                                        product_info={products[selectedProduct].product_info}
                                        closeModalNow={this.closeModalNow}
                                    />
                                </div>
                            </div>
                        }
                    </TimeoutTransitionGroup>
                    <TimeoutTransitionGroup enterTimeout={300}leaveTimeout={300}transitionName="modal-fade">
                        { this.state.modalOpen == "addVariants" &&
                            <div className="modal-bg"/>
                        }
                    </TimeoutTransitionGroup>
                </section>
                <section name="editBundles">
                    <TimeoutTransitionGroup enterTimeout={300}leaveTimeout={300}transitionName="modal-bezier"component="div"transitionAppear={true}>
                        { this.state.modalOpen == "editBundles" &&
                            <div onClick={this.closeModal} className="modal-dialog">
                                <div className="modal-contents">
                                    <div className="header">
                                        Edit Bundles
                                    </div>
                                    <EditBundles 
                                        allProducts={products}
                                        product_id={selectedProduct}
                                        product_info={products[selectedProduct].product_info}
                                        closeModalNow={this.closeModalNow}
                                    />
                                </div>
                            </div>
                        }
                    </TimeoutTransitionGroup>
                    <TimeoutTransitionGroup enterTimeout={300}leaveTimeout={300}transitionName="modal-fade">
                        { this.state.modalOpen == "editBundles" &&
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
                                            <div className="title">Products</div>
                                            <div className="left">
                                                <input type="" value={this.state.productFilter} onChange={this.updateFilter} placeholder="Search..."/>
                                            </div>
                                            <div className="right">
                                                <span onClick={this.newProduct}><i className="fa fa-plus"/></span>
                                            </div>
                                        </div>
                                        <div id="scrollContext" className="section-content">
                                                {filteredProducts ? 
                                                    filteredProducts.map(function(product,index){

                                                            var matches = product.name.match(/\b(\w)/g);
                                                            var letters = matches.join('').substring(0,2);

                                                        return(
                                                            <div key={index} onClick={this.selectProduct.bind(this,product._id)} className="product-listing">
                                                                <div className={product.img ? "product-img has-pic" : "product-img"}>
                                                                    <div className="img" style={{backgroundImage:"url("+product.img+")"}}>
                                                                        <div className="letters">{letters}</div>
                                                                    </div>
                                                                </div>
                                                                <div className="title">{product.name}</div>
                                                            </div>
                                                        )
                                                    }.bind(this))
                                                :
                                                    <div>You don't have any products set up yet!</div>
                                                }
                                        </div>
                                    </div>
                                    {selectedProduct != "" &&

                                        <div className="slide grey-bg" style={positionSlide(1)}>
                                
                                            <div className="grey-third"></div>
                                            <div className="section-header">
                                                <div className="relative">
                                                    <div className="title">{products[selectedProduct].name}</div>
                                                    <div className="left">
                                                        <span onClick={this.goBack}><i className="fa fa-chevron-left"/></span> 
                                                    </div>
                                                    <div className="right">
                                                        <span onClick={this.deleteProduct}><i className="fa fa-trash-o"/></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="section-content no-pad">
                                                <div className="product-top-bg" style={{paddingTop:"65px"}}>

                                                    <div className="product-details">

                                                        <div className="row">
                                                            <div className="col-sm-5">
                                                                <div className="product-img">
                                                                    <DropUpload img={products[selectedProduct].img} onChange={this.updateImg} />
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-7">
                                                                <Input label="Product Name" dbKey="name" value={products[selectedProduct].name} onChange={this.productUpdate}/>
                                                                <div className="input-wrap"><label>Product Description</label></div>
                                                                <ReactQuill 
                                                                        className="editor" 
                                                                        theme="snow" 
                                                                        toolbar={defaultItems}
                                                                        value={products[selectedProduct].description} 
                                                                        onChange={this.onTextChange} 
                                                                    />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="product-bottom-bg">
                                                    <div className="right">
                                                        <div className="pad-bot-15">
                                                            <Select absolute={true} dbKey="visibility" label="Visibility" 
                                                                onChange={this.productUpdate}
                                                                options={[
                                                                    {value:"all",label:"Online & Locations"},
                                                                    {value:"online",label:"Online Only"},
                                                                    {value:"location",label:"Locations Only"}
                                                                ]}
                                                            />
                                                        </div>
                                                        <div className="pad-bot-15">
                                                            <Select absolute={true} dbKey="category" label="Category" 
                                                                onChange={this.productUpdate}
                                                                options={[
                                                                    {value:"all",label:"Online & Locations"},
                                                                    {value:"online",label:"Online Only"},
                                                                    {value:"location",label:"Locations Only"}
                                                                    ]}
                                                            />
                                                        </div>
                                                        <div className="radio-label">
                                                            <Input type="checkbox" value={products[selectedProduct].taxable} dbKey="taxable" onChange={this.productUpdate} label="Charge taxes for this product"/>
                                                            {products[selectedProduct].product_info.type != "bundle" &&
                                                                <Input type="checkbox" value={products[selectedProduct].track_qty} dbKey="track_qty" onChange={this.productUpdate} label="Track inventory for this product"/>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="product-bottom">
                                                        {products[selectedProduct].product_info.type == "simple" &&
                                                            <span>
                                                                <div className="title">Simple Product</div>
                                                                <div className="row">
                                                                    <div className="col-sm-4">
                                                                        <Input 
                                                                            label="Regular Price" 
                                                                            type="currency" 
                                                                            value={products[selectedProduct].product_info.pricing.regular} 
                                                                            dbKey="product_info.pricing.regular" 
                                                                            onChange={this.productUpdate} 
                                                                        />
                                                                    </div>  
                                                                    <div className="col-sm-4">
                                                                        <Input 
                                                                            label="Sale Price" 
                                                                            type="currency" 
                                                                            value={products[selectedProduct].product_info.pricing.sale} 
                                                                            dbKey="product_info.pricing.sale" 
                                                                            onChange={this.productUpdate} 
                                                                        />
                                                                    </div>  
                                                                    <div className="col-sm-4">
                                                                        <Input 
                                                                            label="Staff Price" 
                                                                            type="currency" 
                                                                            value={products[selectedProduct].product_info.pricing.staff} 
                                                                            dbKey="product_info.pricing.staff" 
                                                                            onChange={this.productUpdate} 
                                                                        />
                                                                    </div> 
                                                                </div>
                                                                {products[selectedProduct].track_qty &&
                                                                    <div className="row">
                                                                        <div className="col-sm-4">
                                                                            <Input 
                                                                                label="SKU" 
                                                                                value={products[selectedProduct].product_info.sku} 
                                                                                dbKey="product_info.sku" 
                                                                                onChange={this.productUpdate} 
                                                                            />
                                                                        </div>  
                                                                        <div className="col-sm-4">
                                                                            <Input 
                                                                                label="Quantity" 
                                                                                value={products[selectedProduct].product_info.qty} 
                                                                                dbKey="product_info.qty" 
                                                                                onChange={this.productUpdate} 
                                                                            />
                                                                        </div>  
                                                                        <div className="col-sm-4">
                                                                            <Input 
                                                                                label="Weight" 
                                                                                value={products[selectedProduct].product_info.weight} 
                                                                                dbKey="product_info.weight"
                                                                                onChange={this.productUpdate} 
                                                                            />
                                                                        </div> 
                                                                    </div>
                                                                }
                                                            </span>
                                                        }                                                        
                                                        {products[selectedProduct].product_info.type == "variable" && 
                                                            <span>
                                                                <div className="title">Variable Product<span className="pull-right" onClick={this.addVariants}>Edit Variants</span></div> 
                                                                
                                                                {products[selectedProduct].product_info.vars ? 

                                                                    <div className="variation-slider">
                                                                        <div className="setting-table">
                                                                            <div className="setting-row table-header">
                                                                                <div className="setting_cell header name">
                                                                                    {products[selectedProduct].product_info.attr0}
                                                                                </div>
                                                                                {products[selectedProduct].product_info.attr1 &&
                                                                                    <div className="setting_cell header name">
                                                                                        {products[selectedProduct].product_info.attr1}
                                                                                    </div>
                                                                                }
                                                                                {products[selectedProduct].track_qty &&
                                                                                    <div className="setting_cell header">
                                                                                        Inventory
                                                                                    </div>
                                                                                }
                                                                                <div className="setting_cell header">
                                                                                    Price
                                                                                </div>
                                                                                <div className="setting_cell header">
                                                                                    Sale Price
                                                                                </div>
                                                                                <div className="setting_cell header">
                                                                                    Staff Price
                                                                                </div>
                                                                                <div className="setting_cell header">
                                                                                    SKU
                                                                                </div>
                                                                                <div className="setting_cell header">
                                                                                    Weight
                                                                                </div>
                                                                            </div>
                                                                            {products[selectedProduct].product_info.vars &&
                                                                                products[selectedProduct].product_info.vars.map(function(variable,index){

                                                                                    return (
                                                                                        <div key={index} className="setting-row">

                                                                                            <div className="setting_cell name">
                                                                                                {variable.attrs[0]}
                                                                                            </div>
                                                                                            {products[selectedProduct].product_info.attr1 &&
                                                                                                <div className="setting_cell name">
                                                                                                    {variable.attrs[1]}
                                                                                                </div>
                                                                                            }
                                                                                            {products[selectedProduct].track_qty &&
                                                                                                <div className="setting_cell">
                                                                                                    <Input dbKey={"product_info.vars."+index+".qty"} value={variable.qty} onChange={this.productUpdate} />
                                                                                                </div>
                                                                                            }                                                                                            
                                                                                            <div className="setting_cell">
                                                                                                <InputCell type="currency" dbKey={"product_info.vars."+index+".pricing.regular"} 
                                                                                                value={
                                                                                                    this.state.newProductData['product_info.vars.'+index+'.pricing.regular'] ? 
                                                                                                    this.state.newProductData['product_info.vars.'+index+'.pricing.regular'] : 
                                                                                                    variable.pricing.regular
                                                                                                } 
                                                                                                onChange={this.productUpdate} />
                                                                                            </div>
                                                                                            <div className="setting_cell">
                                                                                                <InputCell type="currency" dbKey={"product_info.vars."+index+".pricing.sale"} 
                                                                                                value={
                                                                                                    this.state.newProductData['product_info.vars.'+index+'.pricing.sale'] ? 
                                                                                                    this.state.newProductData['product_info.vars.'+index+'.pricing.sale'] : 
                                                                                                    variable.pricing.sale
                                                                                                } 
                                                                                                onChange={this.productUpdate} />
                                                                                            </div>
                                                                                            <div className="setting_cell">
                                                                                                <InputCell type="currency" dbKey={"product_info.vars."+index+".pricing.staff"} 
                                                                                                value={
                                                                                                    this.state.newProductData['product_info.vars.'+index+'.pricing.staff'] ? 
                                                                                                    this.state.newProductData['product_info.vars.'+index+'.pricing.staff'] : 
                                                                                                    variable.pricing.staff
                                                                                                } 
                                                                                                onChange={this.productUpdate} />
                                                                                            </div>
                                                                                            <div className="setting_cell">
                                                                                                <Input dbKey={"product_info.vars."+index+".sku"} 
                                                                                                value={
                                                                                                    this.state.newProductData['product_info.vars.'+index+'.sku'] ? 
                                                                                                    this.state.newProductData['product_info.vars.'+index+'.sku'] : 
                                                                                                    variable.sku
                                                                                                } 
                                                                                                onChange={this.productUpdate} />
                                                                                            </div>
                                                                                            <div className="setting_cell">
                                                                                                <Input dbKey={"product_info.vars."+index+".weight"} 
                                                                                                value={
                                                                                                    this.state.newProductData['product_info.vars.'+index+'.weight'] ? 
                                                                                                    this.state.newProductData['product_info.vars.'+index+'.weight'] : 
                                                                                                    variable.weight
                                                                                                } 
                                                                                                onChange={this.productUpdate} />
                                                                                            </div>

                                                                                        </div>
                                                                                    )
                                                                                }.bind(this))
                                                                            }
                                                                        </div>
                                                                    </div>

                                                                : 
                                                                    <span onClick={this.addVariants}>You have no product variants yet. Click here and add some.</span>
                                                                }



                                                            </span>
                                                        }
                                                        {products[selectedProduct].product_info.type == "bundle" &&
                                                            <span>
                                                                <div className="title">Bundled Product<span className="pull-right" onClick={this.editBundles}>Edit Bundles</span></div>
                                                                <div className="row">
                                                                    <div className="col-sm-4">
                                                                        <Input 
                                                                            label="Regular Price" 
                                                                            type="currency" 
                                                                            value={products[selectedProduct].product_info.pricing.regular} 
                                                                            dbKey="product_info.pricing.regular" 
                                                                            onChange={this.productUpdate} 
                                                                        />
                                                                    </div>  
                                                                    <div className="col-sm-4">
                                                                        <Input 
                                                                            label="Sale Price" 
                                                                            type="currency" 
                                                                            value={products[selectedProduct].product_info.pricing.sale} 
                                                                            dbKey="product_info.pricing.sale" 
                                                                            onChange={this.productUpdate} 
                                                                        />
                                                                    </div>  
                                                                    <div className="col-sm-4">
                                                                        <Input 
                                                                            label="Staff Price" 
                                                                            type="currency" 
                                                                            value={products[selectedProduct].product_info.pricing.staff} 
                                                                            dbKey="product_info.pricing.staff" 
                                                                            onChange={this.productUpdate} 
                                                                        />
                                                                    </div> 
                                                                </div>
                                                                {products[selectedProduct].product_info.bundled_ids.length > 0 ?
                                                                    products[selectedProduct].product_info.bundled_ids.map(function(product_id,index){
                                                                        return (
                                                                            <div key={index} onClick={this.editBundles}>
                                                                                {products[product_id].name}
                                                                            </div>
                                                                        )
                                                                    }.bind(this))
                                                                :
                                                                    <div onClick={this.editBundles}>You don't have any products in this bundle. Click here to set some up!</div>
                                                                }
                                                            </span>
                                                        }
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );      
    }
});








