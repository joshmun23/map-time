MainHeader = React.createClass({
    displayName:"MainHeader",
    render:function(){
    	return(
    		<div className="header clearfix">
                <div className="col-sm-4 logo">Map Time</div>
                <div className="col-sm-8">
                	<ul>
                		<li><a href="/join">Join</a></li>
                		<li><a href="/sign-in">Sign In</a></li>
                	</ul>
                </div>
    		</div>
    	);
    }
});
