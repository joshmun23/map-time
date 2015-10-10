PersonNotes = React.createClass({
    displayName:"PersonNotes",
    getInitialState(){
    	return {
    		value: "",
    		charCount: 0,
    	}
    },
    updateValue(e){
        theVal = this.refs.noteInput.getDOMNode().value;
        if(theVal.length < 5000){
	        this.setState({
	        	value: theVal,
	        	charCount : theVal.length,
	        });
        }
    },
    saveNote(){
      	Meteor.call("/notes/add", Session.get('person_id'), this.state.value);
    },
    render(){

    	let person = this.props.data.person;
    	let notes = this.props.data.notes;

    	return(
    		<div className="tab-content">

                <div className="block-wrapper inside">
                	<div className="title">Person Notes</div>
            		<div className="relative">
                		<textarea onChange={this.updateValue} ref="noteInput" value={this.state.value} placeholder={"Add a new note..."}/>
            			<div className="note-count">{this.state.charCount} / 5000</div>
            			<div onClick={this.saveNote} className="note-submit">Add Note</div>
            		</div>
                	<div className="scroll-box">
		                {notes.map(function(note,index){
		                	return (
		                		<div className="item" key={index}>
		                			<div className="note-time">{moment(note.timestamp, "YYYY-MM-DD HH:mm:SS").format('MM/DD/YY h:mma')}</div>
		                			<div>{note.note}</div>               			
		                		</div>
		                	);	
		                })}
                	</div>

                </div>
            </div>
    	);
    }
});
