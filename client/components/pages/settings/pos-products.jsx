let VariantOptions = React.createClass({
    displayName:"VariantOptions",
    getInitialState(){

        let product_info = this.props.product_info;
        let variations = [];
        variations[0] = [];
        variations[1] = [];

        if(product_info.vars){
 
            _.each(product_info.vars, function(variaton){
                _.each(variaton.attrs,function(attribute,attr_index){
                    if(variations[attr_index].indexOf(attribute) == -1){
                        variations[attr_index].push(attribute);
                    }
                });
            });
        }
        return {
            variations: variations,
            attr0: product_info.attr0,
            attr1: product_info.attr1,
            product_id: this.props.product_id,
        }
    },
    updateAttrName(attr_name,key,val){

        if(attr_name == "attr0"){
            this.setState({attr0: val});
        }
        if(attr_name == "attr1"){
            this.setState({attr1: val});
        }
    },
    handleKeyPress(index,e){
        if(e.charCode == 13){

            let value = e.target.value;
            let variations = this.state.variations;

            if(variations[index].indexOf(value) == -1 && value != ""){
                variations[index].push(value);
                React.findDOMNode(this.refs.newVariant0).value = "";
                React.findDOMNode(this.refs.newVariant1).value = "";
                this.setState({variations : variations});
            }
        }
        return;
    },
    handleRemovePill(index,var_index){
        let variations = this.state.variations;
        variations[index].splice(var_index,1);
        this.setState({variations : variations});
    },
    saveVariations(){

        let variations = this.state.variations;
        let attr_names = {
            attr0 : this.state.attr0.length > 0 ? this.state.attr0 : "Attribute 1",
            attr1 : this.state.attr1.length > 0 ? this.state.attr1 : "Attribute 2",
        }

        console.log(variations);
        console.log(attr_names);

        Meteor.call("/shop/product/variations/update", this.state.product_id, variations, attr_names, function(err,res){
            if (err) {
                console.log(err);
                alert(err[err.error]);
            }
            this.closeModalNow();
            return;
        }.bind(this));
    },
    closeModalNow(){

        this.props.closeModalNow();
    },
    render(){

        let pillStyles = ["#19bd93","#854bf1"];
        let range = _.range(2);

        console.log(this.state);

        return(
            <div>
                                                    
                <div className="content variant-options">
                    
                    <div className="row">
                        <div className="col-sm-4">
                            <Input label={"Variant #1"} value={this.state.attr0} onChange={this.updateAttrName.bind(this,"attr0")} /> 
                        </div>
                        <div className="col-sm-8">
                            {this.state.variations[0] &&
                                this.state.variations[0].map(function(attr,var_index){
                                return (
                                    <PillBox key={var_index} onRemove={this.handleRemovePill.bind(this,0,var_index)} name={attr} background={pillStyles[0]} />
                                );
                                }.bind(this))
                            }
                            <input className="add-variant" ref={"newVariant0"} onKeyPress={this.handleKeyPress.bind(this,0)} placeholder="Add Variant" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4">
                            <Input label={"Variant #2"} value={this.state.attr1} onChange={this.updateAttrName.bind(this,"attr1")} /> 
                        </div>
                        <div className="col-sm-8">
                            {this.state.variations[1] &&
                                this.state.variations[1].map(function(attr,var_index){
                                return (
                                    <PillBox key={var_index} onRemove={this.handleRemovePill.bind(this,1,var_index)} name={attr} background={pillStyles[1]} />
                                );
                                }.bind(this))
                            }
                            <input className="add-variant" ref={"newVariant1"} onKeyPress={this.handleKeyPress.bind(this,1)} placeholder="Add Variant" />
                        </div>
                    </div>

                    <div className="clearfix"></div>
                </div>
                <div className="footer clearfix">
                    
                    <div onClick={this.closeModalNow} className="btn cancel">
                        Cancel
                    </div>
                    <div onClick={this.saveVariations} className="btn submit">
                        Save Variants
                    </div>
                </div>
            </div>
        );
    }
});

let EditBundles = React.createClass({
    displayName:"EditBundles",
    getInitialState(){
        return {
            program_id: this.props.product_id,
            bundled_ids : this.props.product_info.bundled_ids,
            search: "",
        }
    },
    updateSearch(key,val){

        this.setState({search:val});
    },
    bundleAdd(bundle_id,e){

        let bundled_ids = this.state.bundled_ids;
        bundled_ids.push(bundle_id);
        this.setState({bundled_ids:bundled_ids});

    },    
    bundleRemove(bundled_id,index,e){
        let bundled_ids = this.state.bundled_ids;
        let newData = _.without(bundled_ids,bundled_id);
        this.setState({bundled_ids:newData});
    },
    handleSave(){
        Meteor.call("/shop/product/saveBundle", this.state.program_id, this.state.bundled_ids, function(err,res){
            if (err) {
                console.log(err);
                alert(err[err.error]);
            }
            this.closeModalNow();
            return;
        }.bind(this));
    },
    closeModalNow(){
        this.props.closeModalNow();
    },
    render(){

        console.log(this.props.allProducts);
        let availableProducts = [];
        let selectedProducts = [];
        _.each(this.props.allProducts,function(product){
            if(product.product_info.type != "bundle"){

                if(product.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 && this.state.bundled_ids.indexOf(product._id) == -1){
                    availableProducts.push(product);
                } 
                if(this.state.bundled_ids.indexOf(product._id) != -1){
                    selectedProducts.push(product);
                }
            }
        }.bind(this));


        console.log(availableProducts);
        console.log(selectedProducts);

        return(
            <div>
                <div className="content no-pad clearfix"> 
                    <div className="setting-selectPrograms">
                        <div className="setting-header clearfix">
                            <div className="header-col left">Selected Products</div>
                            <div className="header-col right">
                                <Input type="search" value={this.state.search} onChange={this.updateSearch} placeholder="Search"/>
                            </div>
                        </div>
                        <div className="setting-content clearfix">
                            <div className="column left">
                                {selectedProducts ?
                                    selectedProducts.map(function(product,index){
                                        return (
                                            <div key={index} onClick={this.bundleRemove.bind(this,product._id,index)} className="selection">{product.name}</div>
                                        );
                                    }.bind(this))
                                :
                                    <div>Add an product to this program by selecting one on the right</div>
                                }
                            </div>
                            <div className="column right">
                                {availableProducts ?
                                    availableProducts.map(function(product,index){
                                        return (
                                            <div key={index} onClick={this.bundleAdd.bind(this,product._id)} className="selection">{product.name}</div>
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
                        Save Bundle
                    </div>
                </div>
            </div>
        );
    }
});

SettingsPosProducts = React.createClass({
    displayName:"SettingsPosProducts",
    mixins: [ReactMeteorData,TimerMixin],
    getInitialState(){
        return {
            modalOpen: "",
            slide: 0,
            newProductValue : {
                name: "",
                type: ""
            },
            productFilter : "",
            selectedProduct : "",
            newProductData: {},
            saveNewData : false,
            value: "<strong>TEST</strong>",
        };
    },
    getMeteorData() {

        const subHandles = [
            Meteor.subscribe("shop_product"),
            Meteor.subscribe("shop_category"),
        ];

        const subsReady = _.all(subHandles, function (handle) {
            return handle.ready();
        });

        return {
            subsReady: subsReady,
            products: ShopProduct.find().fetch(),
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
    clearSelectedProduct(){
        this.setState({
            selectedProduct: "",
        });
    },
    updateFilter(e){

        this.setState({productFilter: e.target.value});
    },
    newProduct(){
        this.setState({
            modalOpen: "newProduct",
        });
    },
    newProductChange(key,val){

        let newProductValue = this.state.newProductValue;
        newProductValue[key] = val;

        this.setState({newProductValue : newProductValue});
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
    selectProduct(product_id){

        this.setState({
            selectedProduct: product_id,
            slide: 1,
        });
    },
    deleteProduct(){
        this.setState({
            modalOpen: "deleteProduct",
        });
    },
    confirmedDelete(){
        this.setTimeout(this.finishDelete(this.state.selectedProduct),200);
        this.setState({
            modalOpen: "",
            slide: 0,
            selectedProduct: "",
        });
    },
    finishDelete(id){
        Meteor.call("/shop/product/delete", id, function(err,res){
            if (err) {
                console.log(err);
                alert(err[err.error]);
            }
        });
    },
    addVariants(){
        this.setState({
            modalOpen : "addVariants"
        });
    },
    editBundles(){
        this.setState({
            modalOpen : "editBundles",
        })
    },
    productUpdate(key,val){

        let selectedProduct = this.state.selectedProduct;
        selectedProduct[key] = val;

        let newProductData = this.state.newProductData;
        newProductData[key] = val;

        this.setState({
            selectedProduct : selectedProduct,
            newProductData : newProductData,
            saveNewData: true,
        });
        this.saveProductUpdate();
    },
    textChange(value){

        let selectedProduct = this.state.selectedProduct;
        selectedProduct['description'] = value;

        let newProductData = this.state.newProductData;
        newProductData['description'] = value;

        this.setState({
            newProductData : newProductData,
            selectedProduct : selectedProduct,
        });
        this.saveProductUpdate();
    },
    updateImg(newUrl){

        let newProductData = this.state.newProductData;
        newProductData['img'] = newUrl;
        this.saveProductUpdate();
    },
    saveProductUpdate(){

        Meteor.call("/shop/product/update", this.state.selectedProduct, this.state.newProductData, function(err,res){
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

        let catagories = this.data.shop_categories.map(function(category,index){
            return {label:category.name,value:category._id}
        });

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
                                                                <Editor value={products[selectedProduct].description} 
                                                                        onUpdate={this.textChange} 
                                                                    /> 
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="product-bottom-bg">
                                                    <div className="right">
                                                        <div className="pad-bot-15">
                                                            <Select absolute={true} dbKey="category" label="Category" 
                                                                onChange={this.productUpdate}
                                                                value={products[selectedProduct].category}
                                                                options={catagories}
                                                                allowCreate="true"
                                                                addLabelText="Add new category"
                                                            />
                                                        </div>
                                                        <div className="radio-label">
                                                            <Input type="checkbox" value={products[selectedProduct].published} dbKey="published" onChange={this.productUpdate} label="Product is published"/>
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
                                                                            <div key={index} onClick={this.editBundles} className="bundled-include">
                                                                                <img src={products[product_id].img} />
                                                                                <div className="text">{products[product_id].name}</div>
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








