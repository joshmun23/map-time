Select = React.createClass({
    displayName: "Select",
    getInitialState(){
        return {
            value: this.props.value,
            dbKey: this.props.dbKey,
            focused:false
        }
    },
    handleChange(newValue){
        console.log('newValue');  
        console.log(newValue);  

        this.setState({value: newValue});
        this.props.onChange(this.state.dbKey,newValue);
    },
    toggleFocus(){

        this.setState({focused: true});
    },
    toggleBlur(){

        this.setState({focused: false});
    },
    render() {

        var active = classNames({'active' : this.state.focused});
        return(
            <span>
                {this.props.label &&
                    <label className={active}>{this.props.label}</label>
                }
                <ReactSelect
                    className={this.props.absolute ? "Select-absolute" : ""}
                    value={this.state.value}
                    options={this.props.options}
                    onChange={this.handleChange}
                    clearable={false}
                />
            </span>
        );  		
    }
});
