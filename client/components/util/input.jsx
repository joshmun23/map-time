
Input = React.createClass({
    displayName: "Input",
    getInitialState(){
        return {
            value: this.props.value,
            dbKey: this.props.dbKey,
            focused:false
        }
    },
    handleInputChange(e){
       let theVal = React.findDOMNode(this.refs.myInput).value;

        this.setState({value: theVal});
        this.props.onChange(this.state.dbKey,theVal);
    },
    handleCheckboxChange(e){

        let theVal = e.target.checked;

        this.setState({value: theVal});
        this.props.onChange(this.state.dbKey,theVal);

    },
    handlePhoneChange(e){

        var theVal = formatPhone(this.refs.myInput.getDOMNode().value);
        
        this.setState({value: theVal});
        this.props.onChange(this.state.dbKey,theVal);
    },
    handleDateChange(dateText, moment, event){
        this.setState({value: dateText});
        this.props.onChange(this.state.dbKey,dateText);
    },
    handleSelectChange(newValue){
        this.setState({value: newValue});
        this.props.onChange(this.state.dbKey,newValue);
    },
    toggleFocus(){

        this.setState({focused: true})
    },
    toggleBlur(){

        this.setState({focused: false})
    },
    render() {

        var value = this.props.value;

        var type = "text"
        if(this.props.type){

            type = this.props.type;
            if(type == "decimal" && value){
                type = "number";
                // value = accounting.toFixed(2);
            }
        }

        var disabled = "";
        if(this.props.disabled){

            disabled = "disabled";
        }

        var min = "";
        if(this.props.min){

            min = this.props.min;
        }


        var active = classNames({'active' : this.state.focused});


        if(this.props.type == "checkbox"){
            return(
                <label><input type="checkbox" onChange={this.handleCheckboxChange} checked={this.state.value} />{this.props.label}</label>
            );
        }
        if(this.props.type == "currency"){
            return (
                <div className="input-wrap">
                    <label className={active}>{this.props.label}</label>
                    <CurrencyInput value={this.state.value} onChange={this.handleInputChange} ref="myInput" placeholder="0.00" maxLength="5" />
                </div>
            );   
        }
        if(this.props.type == "search"){
            return (
                <div className="input-wrap search">
                    <i className="fa fa-search"/>
                    <input 
                        className="search"
                        ref="myInput" 
                        value={this.state.value} 
                        onFocus={this.toggleFocus}
                        onBlur={this.toggleBlur} 
                        onChange={this.handleInputChange}
                    />
                </div>
            );   
        }

        if(this.props.type == "percent"){
            return (
                <div className="input-wrap">
                    <label className={active}>{this.props.label}</label>
                    <input 
                        ref="myInput" 
                        size="3" 
                        min="1"
                        max="100"
                        maxLength="3"
                        value={this.state.value} 
                        onFocus={this.toggleFocus}
                        onBlur={this.toggleBlur} 
                        onChange={this.handleInputChange}
                    />
                </div>
            );   
        }

        if(this.props.type == "phone"){
            return (
                <div className="input-wrap">
                    <label className={active}>{this.props.label}</label>
                    <input 
                        type="text" 
                        ref="myInput" 
                        onChange={this.handlePhoneChange} 
                        name={this.props.nameSpace} 
                        value={this.state.value} 
                        disabled={disabled}
                        min={min}
                        onFocus={this.toggleFocus}
                        onBlur={this.toggleBlur}
                        pattern={this.props.pattern}
                    />
                </div>
            );   
        }


        if(this.props.type == "date"){
            return(
                <DatePicker 
                    date={this.state.value}
                    onChange={this.handleDateChange}
                />
            );
        }

        if(this.props.type == "select"){
            return(
                <span>
                    <Select
                        name="form-field-name"
                        value={this.props.value}
                        options={this.props.options}
                        onChange={this.handleSelectChange}
                        {...this.props}
                    />
                </span>
            );  
        }


        return (
            <div className="input-wrap">
                <label className={active}>{this.props.label}</label>
                <input 
                    type={type} 
                    ref="myInput" 
                    onChange={this.handleInputChange} 
                    name={this.props.nameSpace} 
                    value={this.state.value} 
                    disabled={disabled}
                    min={min}
                    onFocus={this.toggleFocus}
                    onBlur={this.toggleBlur}
                    placeholder={this.props.placeholder}
                    pattern={this.props.pattern}
                />
            </div>
        );
		
    }
});
