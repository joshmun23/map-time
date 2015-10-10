ShopProduct = new Meteor.Collection('shop_product');
ShopCategory = new Meteor.Collection('shop_category');
ShopOrder = new Meteor.Collection('shop_order');
ShopGiftCert = new Meteor.Collection('shop_giftCert');

function cartesianProductOf() {
    return _.reduce(arguments, function(a, b) {
        return _.flatten(_.map(a, function(x) {
            return _.map(b, function(y) {
                return x.concat([y]);
            });
        }), true);
    }, [ [] ]);
};

Meteor.methods({
	'/shop/product/add': function (product_name,type){

		var product_info;
		if(type == "simple"){
			product_info = {
				type : "simple",
		        pricing : {
		            regular : "",
		            sale : "",
		            staff : ""
		        },
		        sku : "",
		        qty : "",
		        weight : ""
			}			
		}
		if(type == "variable"){
			product_info = {
				type : "variable",
				attr1: "",
				attr2 : "",
				attr3 : "",
			}
		}
		if(type == "bundle"){
			product_info = {
				type : "bundle",
				bundled_ids : [],
		        pricing : {
		            regular : "",
		            sale : "",
		            staff : ""
		        },
			}
		}
		if(product_name.length < 2){
			product_name = "New Product";
		}
		
		var newProduct = {
			org_id : Meteor.user().profile.org_id,
			name : product_name,
			description: "<div></div>",
			img: [],
			category: "",
			product_info: product_info,
			taxable: true,
			track_qty: false,
			published: false,
			created: new Date(),
	    };
		return ShopProduct.insert(newProduct);
	},
	'/shop/product/variations/update': function (product_id,data,attr_names){

		var product = ShopProduct.findOne({_id: product_id},{fields: {product_info : 1}});
		var productVariations = product.product_info.vars;
		var allCombos;

		if(data[1].length > 0){
			allCombos = cartesianProductOf(data[0],data[1]);
		} else {
			attr_names = {attr0: attr_names.attr0, attr1: ""};
			allCombos = cartesianProductOf(data[0]);
		} 

		// console.log(allCombos);

		var updatedVariableData = allCombos.map(function(combo,index){

			var variableMatch = _.find(productVariations,function(variation){
		    	if(_.isEqual(combo,variation.attrs)){
		         	return variation;
		        }
		    });
		    if(variableMatch){
		    	return variableMatch;
		    }
			return {
				attrs: combo,
				pricing: {
					regular: "",
					sale: "",
					staff: "",
				},
				sku : "",
				qty: "",
				weight: ""
			}
		});
		
		ShopProduct.update(product_id, {
			$set: {
				"product_info.attr0" : attr_names.attr0,
				"product_info.attr1" : attr_names.attr1,
				"product_info.vars" : updatedVariableData,
			}
		});
		return;
	},
	'/shop/product/saveBundle': function (product_id,data){
		
		ShopProduct.update(product_id, {
			$set: {
				"product_info.bundled_ids": data
			}
		});
		return;
	},
	'/shop/product/update': function (product_id,data){
		
		ShopProduct.update(product_id, {
			$set: data
		});
		return;
	},
	'/shop/product/delete': function (product_id,data){
		
		ShopProduct.remove(product_id);
		return;
	},

	'/shop/giftCert/add': function (newVal){

		var hex_str = Random.hexString(6).toUpperCase();
		var newData = {
			org_id : Meteor.user().profile.org_id,
			name : hex_str,
			created: new Date(),
			amount: newVal,
			amount_left : newVal,
	    };
		return ShopGiftCert.insert(newData);
	},



});


// ShopProduct.insert({
// 	//id,
// 	product_type : "simple",
// 	name: "Tritan Water Bottle",
// 	description : "10\" Water Bottle with Flip Straw Lid Dishwasher Safe",
// 	img: ["http://app.buildyourschool.com/img_uploads/pos/20150309_021130_1722393b6ad7065ef14d11eccfe443c3.png",],
// 	category : "",
// 	published : true,
// 	taxable: true,
// 	price_regular: "12.00",
// 	price_sale: "",
// 	price_staff: "",
// 	sku: "",
// 	manage_stock: true,
// 	stock: 1,
// 	has_shipping: true,
// 	weight: "1.0",
// });

// ShopProduct.insert({
// 	//id,
// 	product_type : "variable",
// 	name: "XMA Chrome Bo Staff",
// 	description : "",
// 	img: ["http://app.buildyourschool.com/img_uploads/pos/20150309_021057_9c1480f939085c592ef38cee2015a3a5.png",],
// 	category : "",
// 	published : true,
// 	taxable: true,
// 	variations: [
// 		{
// 			variation_name: "4 ft",
// 			description: "4ft",
// 			sku: "XMABO1",
// 			stock: 0,
// 			price_regular: "65.00",
// 			price_sale: "",
// 			price_staff: "",
// 		},
// 		{
// 			variation_name: "5 ft",
// 			description: "5ft",
// 			sku: "XMABO2",
// 			stock: 0,
// 			price_regular: "65.00",
// 			price_sale: "",
// 			price_staff: "",
// 		}
// 	],
	
// });