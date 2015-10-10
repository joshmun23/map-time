InputCell = React.createClass({
    displayName: "InputCell",
    getInitialState(){
        return {
            value: this.props.value,
            dbKey: this.props.dbKey,
            focused:false
        }
    },
    componentWillReceiveProps(nextProps){
        this.setState({value:nextProps.value});
        this.setState({dbKey:nextProps.dbKey});
    },
    handleInputChange(e){
        let theVal = React.findDOMNode(this.refs.myInput).value;
        this.setState({value: theVal});
        this.props.onChange(this.state.dbKey,theVal);
    },
    handleSelectChange(key,val){
        console.log('asdsadathis');

        this.props.onChange(key,val);
    },      
    render(){

        let classes = classNames({
            setting_cell : true,
            inside : true,
            grey: this.props.greyBg,
        });

        if(this.props.type == "currency"){
            return(
                <div className={classes}>
                    <div className="align-left"><i className="fa fa-dollar"/></div>
                    <CurrencyInput value={this.state.value} onChange={this.handleInputChange} ref="myInput" placeholder="0.00" maxLength="5" />
                </div>
            );
        }
        


        if(this.props.type == "select"){
            return (
                <div className={classes}>                
                    <Select value={this.state.value} dbKey={this.props.dbKey} onChange={this.handleSelectChange} ref="myInput" options={this.props.options}/>
                </div>                
            );
        }

        return(
            <div className={classes}>
                 <input type="text" ref="myInput" onChange={this.handleInputChange} value={this.state.value} placeholder={this.props.placeholder}pattern={this.props.pattern}/>
            </div>
        );

		
    }
});
