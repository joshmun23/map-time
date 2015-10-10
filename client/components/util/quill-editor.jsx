var defaultItems = [

    { label:'Text', type:'group', 
        items: [
            { type:'bold', label:'Bold' },
            { type:'italic', label:'Italic' },
            { type:'strike', label:'Strike' },
            { type:'underline', label:'Underline' },
            { type:'separator' },
            // { type:'link', label:'Link' },
            // { type:'separator' },
            // { type:'image', label:'Image' },
            // { type:'separator' }
        ]
    },
    { label:'Blocks', type:'group', items: [
        { type:'bullet', label:'Bullet' },
        { type:'separator' },
        { type:'list', label:'List' }
    ]}

];

QEditor = React.createClass({
    displayName:"Editor",
    getInitialState(){
        return {
        	value : this.props.value,
        }
    },
    onTextChange(value, delta, source){
       
       this.props.onChange(value);
    },
    render(){
    	return(
    		<span>
                <ReactQuill 
                    className="editor" 
                    theme="snow" 
                    toolbar={defaultItems}
                    value={this.state.value} 
                    onChange={this.onTextChange}
                />
    		</span>
    	);
    }
});
