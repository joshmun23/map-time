Signature = React.createClass({
    displayName:"Signature",
    componentDidMount: function (){
        $("#signature").jSignature();
    },
    render:function(){
        return(
            <div>
                <div id="signature"></div>
            </div>
        );
    }
});