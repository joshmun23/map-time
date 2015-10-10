StarRating = React.createClass({
    displayName:"StarRating",
    render(){

    	var rating = round5(this.props.rating);
    	var has5 = rating % 10;

        rating = rating / 2;
        if(rating <= 10){
            rating = 10;
        }
        
    	var classname = "star-rating ";
    	classname += "star-" + String(rating).charAt(0);
    	if(has5 != 0){
	    	classname += " star-half";
    	}

    	return(
	        <div className={classname}>
	            <i className="fa fa-star"></i>
	            <i className="fa fa-star"></i>
	            <i className="fa fa-star"></i>
	            <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
	            <i className="fa fa-star-half-o"></i>
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
	        </div>
    	);
    }
});
