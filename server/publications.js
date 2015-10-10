getOrg_id = function(user_id){
	var user = Meteor.users.findOne({_id:user_id});
	var org_id = user.profile.org_id;
	return org_id;
}

Meteor.publish(null, function (){ 
  return Meteor.roles.find({})
});


Meteor.publish('users', function(){
    return Meteor.users.find(
        {"profile.org_id": getOrg_id(this.userId)},
        {fields : {emails:1,profile:1,roles:1}}        
    );
});


//PEOPLE

Meteor.publish('allPeople', function(){
    return People.find({
        org_id : getOrg_id(this.userId)
    });
});

Meteor.publish('somePeople', function(search){
    return People.find({
        org_id : getOrg_id(this.userId),
        fname : search,
    });
});

Meteor.publish('singlePerson', function(_id) {
    return People.find({
        org_id : getOrg_id(this.userId),
        _id: _id,
    });
});


// LOCATIONS

Meteor.publish('allLocations', function(){
    return Location.find({
        org_id : getOrg_id(this.userId),
        active: true,
    });
});

// RANKS

Meteor.publish('allRanks', function(){
    return Ranks.find({
        org_id : getOrg_id(this.userId)
    });
});

// PROGRAMS

Meteor.publish('program', function(){
    return Program.find({
        org_id : getOrg_id(this.userId)
    });
});

// AGREEMENT

Meteor.publish('agreement', function(id){
    if(id){
        return Agreement.find({
            org_id : getOrg_id(this.userId),
            _id :id
        });
    }
    return Agreement.find({
        org_id : getOrg_id(this.userId)
    });
});

// ATTENDANCE

Meteor.publish('attendance', function(_id){

    if(!_id){
        return Attendance.find({
            org_id : getOrg_id(this.userId),
        });
    }

    return Attendance.find({
        org_id : getOrg_id(this.userId),
        person_id : _id,
    });        
});

// BILLING

Meteor.publish('billingHistory', function(_id){

    if(!_id){
        return BillingHistory.find({
            org_id : getOrg_id(this.userId)
        });        
    }

    return BillingHistory.find({
        org_id : getOrg_id(this.userId),
        person_id : _id,
    });        

});

// NOTES

Meteor.publish('person_notes', function(_id){

    return Notes.find({
        org_id : getOrg_id(this.userId),
        person_id : _id,
    });        

});

// MARKETING

Meteor.publish('marketing_campaign', function(campaign_id){
       
    if(!campaign_id){
        return Marketing_campaign.find({
            org_id : getOrg_id(this.userId)
        });        
    }
    return Marketing_campaign.find({
        org_id : getOrg_id(this.userId),
        _id : campaign_id,
    });        
});

Meteor.publish('marketing_campaign_actions', function(campaign_id,_id){

    if(!_id){
        return MarketingCampaign_actions.find({
            org_id : getOrg_id(this.userId),
            campaign_id : campaign_id,
        });        
    }
    return MarketingCampaign_actions.find({
        org_id : getOrg_id(this.userId),
        _id : _id,
    });    


});

// ORGANIZATION

Meteor.publish('organization', function(){
       
    return Organization.find({
        _id : getOrg_id(this.userId),
    });        
});

// TAGS

Meteor.publish('tags', function(){
       
    return Tags.find({
        org_id : getOrg_id(this.userId),
    });        
});





// SHOP

Meteor.publish('shop_product', function(_id){

    if(!_id){
        return ShopProduct.find({
            org_id : getOrg_id(this.userId)
        });        
    }

    return ShopProduct.find({
        org_id : getOrg_id(this.userId),
        id : _id,
    });        
});

Meteor.publish('shop_giftCertificate', function(_id){

    if(!_id){
        return ShopGiftCert.find({
            org_id : getOrg_id(this.userId)
        });        
    }

    return ShopGiftCert.find({
        org_id : getOrg_id(this.userId),
        id : _id,
    });        
});

Meteor.publish('shop_category', function(){

    return ShopCategory.find({
        org_id : getOrg_id(this.userId)
    });

});



















