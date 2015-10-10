AgreementPage = React.createClass({
    displayName:"AgreementPage",
	mixins: [ReactMeteorData],
    getMeteorData() {
    	const subHandles = [
            Meteor.subscribe("allPeople"),
            Meteor.subscribe("agreement"),
            Meteor.subscribe("program"),
        ];

        const subsReady = _.all(subHandles, function (handle) {
            return handle.ready();
        });

        return {
            subsReady: subsReady,
            people: People.find({}).fetch(),
            agreements: Agreement.find({}).fetch(),
            programs: Program.find({}).fetch(),
        };
    },
    getInitialState(){
    	return {
            pin: "",
    		slide: 0,
    		personName: "",
    		personData: {
    			fname: "",
    			lname: "",
    			gender: "",
    			dob: "",
    			email: "",
    			phone: "",
    			address: "",
    			city: "",
    			state: "",
    			zip: "",
    		},
    	}
    },
    pinUpdate(key,val){
        if(val == Meteor.user().profile.pin){
            FlowRouter.go('/');
        }
    },
    handleExit(){
        this.setState({showExit:true});
    },
    goForward(){

    	this.setState({slide:this.state.slide+1}); 
    },
    goBack(){
    	let slideCount = this.state.slide;
    	if(slideCount == 0){
	    	this.setState({slide:0});
	    	return
    	}
    	this.setState({slide:slideCount -1});
    },
    updatePersonName(key,val){

    	this.setState({personName: val});
    },
    personClick(person){
    	this.setState({personData:person});
    	this.goForward();
    },
    createNewPerson(){
    	let name = this.state.personName.split(" ");
    	let personData = this.state.personData;
    	personData['fname'] = name[0];
    	personData['lname'] = name[1] ? name[1] : "";
    	this.setState({
    		personData: personData,
    	});
    	console.log(this.state.personData);
		this.goForward();
    },
    programClick(program){

    	this.setState({selectedProgram:program,slide:this.state.slide + 1});
    },
    agreementClick(agreement){
    	this.setState({
    		selectedAgreement:agreement,
			slide:this.state.slide + 1,
			total_price: agreement.total_price,
			down_payment: agreement.min_down,
			term_length : agreement.term_length,
			term_interval : agreement.term_interval,
			orig_num_payments : agreement.num_payments,
			num_payments : agreement.num_payments,
			interval_payment : (agreement.total_price - agreement.min_down) / agreement.num_payments,
    	});
    },
    updateAgreePrice(key,val){
    	if(val > this.state.total_price){
    		console.log(this.state.total_price);
	    	this.setState({
	    		down_payment : this.state.total_price,
	    		interval_payment : this.state.total_price,
	    		num_payments: 1,
	    	});
	    	return;
    	}
    	this.setState({
    		down_payment : val,
    		interval_payment : (this.state.total_price - val) / this.state.num_payments,
    		num_payments: this.state.orig_num_payments,
    	});
    },
   	formatAgreePrice(val){
   		console.log('-----');
   		console.log(val);
   	},
    updatePersonContact(key,val){
    	let person = this.state.personData;
    	person[key] = val;
    	this.setState({
    		personData : person,
    	});
    },
    changeDate(){

    	console.log('date selected ');
    },
    personalInformationDone(){
    	// console.log(this.state.personData);
    	let personData = this.state.personData;
    	let error_messages = [];
    	_.each(personData,function(data,key){
    		if(data.length < 1){
    			error_messages.push(key);
    		}
    	});
    	console.log(error_messages);
    	if(error_messages.length >1 ){
    		this.setState({personDetailErrors: true});
    		return;
    	}
    	this.goForward();
    },
    render(){

    	if(!this.data.subsReady){

    		return (<Loading/>);
    	}

    	let people = this.data.people.filter(function(person,index){
    		let name = person.fname+" "+person.lname;
            return name.toLowerCase().search(
                this.state.personName.toLowerCase()) !== -1;
        }.bind(this));

        let programs = this.data.programs;

        let agreements = _.object(_.map(this.data.agreements, function(item) {
           return [item._id, item]
        }));

        console.log(agreements);

        if(this.state.selectedAgreement){
        	var agree = this.state.selectedAgreement;
        }

        let slideStyle = {
        	WebkitTransform: "translate(-"+(this.state.slide * 100)+"%,0)",
        	transform: "translate(-"+(this.state.slide * 100)+"%,0)",
        }
        let classes = {
        	results : classNames({
        		results : true,
        		active: this.state.personName.length > 2,
        	}),
        	message : classNames({
        		message: true,
        		active: this.state.personDetailErrors
        	})
        }
        let logout = {
            position: "absolute",
            top:"20px",
            right:"20px",
            color: "#FFFFFF",
        }


    	return(
    		<div className="agreement">


                <section id="manger-exit">
                    <TimeoutTransitionGroup enterTimeout={300} leaveTimeout={300} transitionName="modal-bezier" component="div" transitionAppear={true}>
                        { this.state.showExit &&
                            <div className="modal-dialog" onClick={this.toggleExit}>
                                <div className="modal-contents small">
                                    <div className="header">
                                        Manager Exit
                                    </div>
                                    <div className="content">
                                        <Input type="password" pattern="[0-9]*" value={this.state.pinValue} label={"Exit Pin"} onChange={this.pinUpdate} />

                                        <div className="clearfix"></div>
                                    </div>
                                </div>
                            </div>
                        }
                    </TimeoutTransitionGroup>
                    <TimeoutTransitionGroup enterTimeout={300}leaveTimeout={300}transitionName="modal-fade">
                        { this.state.showExit &&
                            <div className="modal-bg"/>
                        }
                    </TimeoutTransitionGroup>
                </section>

                <div onClick={this.handleExit} className="exit" style={logout}>
                    <i className="fa fa-sign-out"></i>
                </div>




	    		{this.state.slide != 0 &&
					<div onClick={this.goBack} className="go-back"><i className="fa fa-chevron-left"></i> Back</div>
	    		}
    			<div className="view-slider">
    				<div className="view-container" style={slideStyle}>

						<div className="slide">
							<div className="col-sm-4 col-sm-offset-4">
								<div className="header">
								</div>
								<div className="search">
									<Input type="text" label="Search or Create Contact" value={this.state.personName} onChange={this.updatePersonName} placeholder="Enter Full Person Name" />
									<div className={classes.results}>
										<div className="scroll-box">
											{people.length > 0 ?
												people.map(function(person,index){
													return (
														<div onClick={this.personClick.bind(this,person)} key={index} className="person clearfix">
															<img className="person-img" src="http://app.buildyourschool.com/img_uploads/person/20150615_103131_353cbb37c6120f72bbbd0356a869d9f2.png"/>
															<div className="text">
																{person.fname} {person.lname}
															</div>
														</div>
													);
												}.bind(this))
												:
												<div className="no-result">No Results</div>
											}
										</div>
										<div onClick={this.createNewPerson} className="btn btn-select">
											Add New Person
										</div>
									</div>
								</div>
							</div>
		    			</div>
						<div className="slide" style={positionSlide(1)}>
							<div className="bg-black">
								<div className="header">
									Select Training Program
								</div>
								<div className="row">
				    				{programs.map(function(program,index){
				    					return (
				    						<div onClick={this.programClick.bind(this,program)} key={index} className="col-sm-4">
				    							<div className="grid-select">
				    								{programs.name}
												</div>
				    						</div>
										);
				    				}.bind(this))}
								</div>
							</div>
		    			</div>
		    			<div className="slide" style={positionSlide(2)}>
							<div className="bg-black">
								<div className="header">
									Select Agreement
								</div>
								<div className="row">
					    			{this.state.selectedProgram &&
					    				agreements[this.state.selectedProgram].map(function(agreement,index){
					    					return (
					    						<div onClick={this.agreementClick.bind(this,agreement)} key={index} className="col-sm-4">
					    							<div className="grid-select">
					    								{agreement.name}
													</div>
					    						</div>
											);
					    				}.bind(this))
				    				}
								</div>
		    				</div>		
		    			</div>
		    			<div className="slide" style={positionSlide(3)}>
		    				{this.state.selectedAgreement &&
			    				<div className="col-sm-6 col-sm-offset-3">
									<div className="bg-white">
										<div className="header">
											{agree.program_name}
										</div>
										<div className="agree-container">
											<Input label="Total Price" value={formatMoney(this.state.total_price)} disabled={true} />
											<Input label="Total Deposit" value={formatMoney(this.state.down_payment)} min={agree.min_down} onChange={this.formatAgreePrice} onChange={this.updateAgreePrice} />
											<Input label="Term Length" value={this.state.term_length+" "+this.state.term_interval+"s"} disabled={true} />
										</div>
										<div className="text-center payment-math">
											{this.state.num_payments} {this.state.term_interval}{isSingle(this.state.num_payments,'ly')} payment{isSingle(this.state.num_payments,'s')} of {formatMoney(this.state.interval_payment)}
										</div>
										<div onClick={this.goForward} className="btn btn-select">
											Continue
										</div>

				    				</div>
			    				</div>
		    				}
		    			</div>
		    			<div className="slide" style={positionSlide(4)}>
		    				{/*this.state.selectedAgreement && */
								<div className="bg-white arrow-right">

									<div className={classes.message}>
										<div className="message-content alert">
											Sorry, some of the info you have is missing, or incorrect.
										</div>
									</div>

                                    <div className="row">
                                        <div className="col-sm-3">
                                            <Input 
                                            	onChange={this.updatePersonContact} 
                                                value={this.state.personData.fname} 
                                                dbKey={"fname"} 
                                                label={"First Name"} 
                                                />
                                        </div>
                                        <div className="col-sm-3">
                                            <Input 
                                            	onChange={this.updatePersonContact} 
                                                value={this.state.personData.lname} 
                                                dbKey={"lname"} 
                                                label={"Last Name"} 
                                                />
                                        </div>
                                        <div className="col-sm-3">
                                            <Input
                                            	onChange={this.updatePersonContact} 
                                                value={this.state.personData.gender} 
                                                dbKey={"gender"} 
                                                label={"Gender"} 
                                                type={"select"}
                                                options={[{value:"Male",label:"Male"},{value:"Female",label:"Female"}]}
                                                clearable={false}
                                                />
                                        </div>
                                        <div className="col-sm-3">
                                            <Input
                                                value={this.state.personData.dob}
                                                dbKey={"dob"} 
                                                label={"Date of Birth"}
                                                />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-sm-4">
                                            <Input 
                                            	onChange={this.updatePersonContact} 
                                                value={this.state.personData.email} 
                                                dbKey={"email"} 
                                                label={"Email Address"} 
                                                />
                                        </div>
                                        <div className="col-sm-4">
                                            <Input 
                                            	onChange={this.updatePersonContact} 
                                                value={this.state.personData.phone} 
                                                dbKey={"phone"} 
                                                label={"Primary Phone"} 
                                                />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <Input 
                                            	onChange={this.updatePersonContact} 
                                                value={this.state.personData.address} 
                                                dbKey={"address"} 
                                                label={"Address"} 
                                                />
                                        </div>
                                        <div className="col-sm-4">
                                            <Input 
                                            	onChange={this.updatePersonContact} 
                                                value={this.state.personData.city} 
                                                dbKey={"city"} 
                                                label={"City"} 
                                                />
                                        </div>
                                        <div className="col-sm-2">
                                            <Input 
                                            	onChange={this.updatePersonContact} 
                                                value={this.state.personData.state} 
                                                dbKey={"state"} 
                                                label={"State"} 
                                                />
                                        </div>
                                        <div className="col-sm-2">
                                            <Input 
                                            	onChange={this.updatePersonContact} 
                                                value={this.state.personData.zip} 
                                                dbKey={"zip"} 
                                                label={"Zip"}
                                                />
                                        </div>
                                    </div>

									<div onClick={this.personalInformationDone} className="btn btn-select">
										<div className="right-chevron">
											<i className="fa fa-chevron-right"></i>
										</div>
									</div>

		    				</div>
		    				}
		    			</div>
		    			<div className="slide" style={positionSlide(5)}>
							<div className="bg-white">

                                <div className="agreement-terms">

                                    <h1>RESPONSIBLE PARTY/BUYER MUST READ THE FOLLOWING THOROUGHLY.</h1>

                                    <div className="box title"><strong>1-3 GENERAL AGREEMENT TERMS</strong> - Basic terms of this agreement:</div>

                                    <ol>
                                        <li>This Agreement is executed as of the date shown in Section B, by and between Mastery Martial Arts, herinafter referred to as Mastery, and the Responsible Party/Buyer named in Section 1, who has caused his/her signature to be fixed herto.
                                        </li>

                                        <li>Mastery agrees to provide instruction in Martial Arts to the Member(s) as listed in Section 2 during the scheduled instruction hours. Responsible Party/Buyer understands that the
                                        Course Fee described in Section E is due and payable according to the terms of this agreement whether or not a Member(s) chooses to attend courses as scheduled. In consideration
                                        for Mastery providing the course(s) chosen in Section C for the length of time specifi ed in Section D, Responsible Party/Buyer agrees and promises to pay the Course Fee.
                                        </li>

                                        <li>In the event of default in the payment of the Course Fee or other related fees in accordance with the terms of this agreement, or a breach of any of the representations or
                                        covenants herein contained to be performed by the Responsible Party/Buyer or Member(s), the balance due under this agreement shall become immediately due and payable.
                                        Mastery reserves the right to terminate this agreement at any time with written notice to the Responsible Party/Buyer.
                                        </li>
                                    </ol>

                                    <div className="box title"><strong>4-6 MEMBER HEALTH & SAFETY</strong> - Understanding safety and certifying health of Member(s):</div>
                                    <ol start="4">

                                        <li>Safety is the number one priority of Mastery, yet it is not the sole responsibility of the Mastery instructors and staff. Members have the right and responsibility to train and
                                        conduct themselves in a manner that is safe and should be mindful of the safety of themselves and those around them. Responsible Party/Buyer agrees to immediately raise any
                                        and all safety concerns (including, for example, members performing skills incorrectly, a member acting with reckless disregard for the safety of others or an equipment defect)
                                        with the instructors and staff at Mastery and, if they believe such person has not addressed the concern, with management at Mastery.
                                        </li>

                                        <li>Responsible Party/Buyer agrees that all exercises and/or courses are undertaken at each members own risk. Responsible Party/Buyer and Member(s) understand the
                                        procedures and exercises involved in instruction and participation as explained to him/her by a representative of Mastery and/or Mastery documents outlining such activities.
                                        Responsible Party/Buyer and Member(s) understand that there is a risk of personal injury to Member(s) involved in the course of instruction and with this knowledge agrees to
                                        indemnify and save harmless Mastery, its representatives, agents and employees from all losses caused by accident or injury to the Member(s), or to third persons in the event
                                        that either the Member(s) or such third person is injured in any way during the performance and execution of exercises.
                                        </li>

                                        <li>Responsible Party/Buyer certifi es that the Member(s) are in good health and have no physical limitations that would or should prevent the Member(s) from participating in
                                        Martial Arts exercises or other physical activity. If the Responsible Party/Buyer is not confi dent in the Member(s) overall health then he or she should consult with a physician
                                        before the Member(s) engages in new physical activity. Mastery recommends that each Member visit a physician and undergo a physical prior to enrollment to ensure good
                                        health. As the Responsible Party/Buyer, and in the event I can not be reached in an emergency, I herby give permission to the Mastery staff to administer all necessary first aid,
                                        and to engage a physician to administer medical treatment, including hospitalization, to the Member(s) named in Section 2. Responsible Party/Buyer certifi es that Member(s)
                                        named in Section 2 are covered by health insurance.
                                        </li>
                                    </ol>

                                    <div className="box title"><strong>7-14 ADDITIONAL MASTERY TERMS</strong> - Member’s property, Mastery rights to amend, Member(s) image usage, payment and non-compete restrictions:</div>

                                    <ol start="7">
                                        <li>Mastery shall not be responsible for damaged, lost or stolen articles, inside or outside the facility.
                                        </li>

                                        <li>Mastery reserves the right to amend or add to these rules and conditions and to adopt new rules and conditions as it may deem necessary.
                                        </li>

                                        <li>Responsible Party/Buyer may not transfer this agreement without the prior written consent of Mastery.
                                        </li>

                                        <li>Responsible Party/Buyer irrevocably authorizes Mastery, its successors and assigns, and those acting under its authority, to copy, use or publish for art, advertising, trade, or
                                        any other lawful purpose whatsoever, photographic portraits, pictures or videotapes of Member(s), in which he, she or they may be included in whole or in part.
                                        </li>

                                        <li>Responsible Party/Buyer acknowledges that if he or she has paid for services in advance, such payment is for future services and therefore with the risk of losing money in the
                                        event Mastery ceases to operate. Mastery is not required to provide any security and there may not be other protection provided to Responsible Party/Buyer should Responsible
                                        Party/Buyer choose to pay in advance.
                                        </li>

                                        <li>This agreement, including any Health and Medical Sheets attached and the program packets provided at the time of signing, comprises the entire agreement pertaining to
                                        enrollment in courses at Mastery, and no other agreement of any kind will be recognized by Mastery.
                                        </li>

                                        <li>In consideration of the training obtained Responsible Party/Buyer, on behalf of themselves and any additional Member(s) agrees that we will not, during the continuance of
                                        this agreement, and for a period of three (3) years following termination of his, her or their association with Mastery, engage in teaching Martial Arts or offering similar training or
                                        instruction within a fi ve (5) mile radius of any school operated by Mastery without the express written authorization of same.
                                        </li>

                                        <li>Responsible Party/Buyer has read the terms and conditions, had an opportunity to speak with a representative of Mastery and has completed this form truthfully.
                                        </li>
                                    </ol>

                                    <div className="box">
                                        <strong>15. GENERAL RIGHTS OF CANCELLATION & RESTRICTIONS</strong> - Cancellation policies and restrictions which apply to all members:
                                    </div>

                                    <div className="box">
                                        <strong>3 DAYS FROM AGREEMENT</strong> - Responsible party/buyer may cancel this agreement penalty free within 3 days of execution, exclusive of holidays and weekends.
                                        VALUE PLAN (PAID IN FULL MEMBERSHIPS) - Responsible party/buyer who pay the course fee in full (indicated Section F) may not be refunded any amount in any circumstance
                                        after the three (3) days as stated above unless expressly written otherwise on this agreement by a Mastery representative. Note U.S. Military Orders exemption below.
                                    </div>
                                    <div className="box">
                                        <strong>MASTERY BUSINESS MOVE</strong> - Responsible Party/Buyer may cancel this agreement if Mastery goes out of business and fails to provide facilities within fi ve (5) miles of the present
                                        facilities or moves its facilities more than fi ve (5) miles from the same.
                                    </div>
                                    <div className="box">
                                        <strong>MILITARY ORDERS</strong> - With 90 days notice Responsible Party/Buyer may cancel this agreement with written U.S. Military Orders that indicate the Responsible Party/Buyer or
                                        Member(s) are required to move at least 20 miles from the Mastery location at which the Responsible Party/Buyer or Member(s) is enrolled. In such case Responsible Party/
                                        Buyer is entitled to a pro-rated refund when paying course fee via Value Plan (indicated in Section F).
                                    </div>
                                    <div className="box">
                                        <strong>CANCELLATIONS MUST BE WRITTEN</strong> - If a right to cancel applies, all cancellations must be submitted in a dated, written notice, which requires signature from a Mastery
                                        representative upon receipt. All written cancellations must be delivered, signed and dated, on paper to Mastery management.
                                        PAYMENTS MUST BE CURRENT - All payments for current services rendered must be received prior to cancellation of any remaining term.
                                    </div>
                                    <div className="box mar-top">
                                        <strong>15A MARTIAL ARTS</strong> - Additional cancellation policies which apply to traditional MARTIAL ARTS members (indicated as MARTIAL ARTS in Section C):
                                        Responsible Party/Buyer making payments via the Flex Plan (indicated in Section F) may cancel this membership agreement as it applies to any MARTIAL ARTS Member(s) with 30-Day
                                        written notice as outlined above in number 15.
                                    </div>
                                    <div className="box">
                                        <strong>15B A+ AFTERSCHOOL</strong> - Additional cancellation policies which apply to A+ members (indicated as A+ in Section C):
                                        Responsible Party/Buyer making payments via the Flex Plan (indicated in Section F) can pay a cancellation fee of $500 at any time to cancel this agreement as it applies to any
                                        A+ Member(s) with written notice as outlined above in number 15.
                                    </div>
                                    <div className="box">
                                        <strong>15C CAMPS</strong> - Additional cancellation policies which apply to Camp members (indicated as Camp in Section C):
                                        Responsible Party/Buyer must reference camp packet for any additional cancellation policies.
                                    </div>
                                    <div className="box">
                                        <strong>15D OTHER</strong> - Additional cancellation policies which apply to Other members (indicated as Other in Section C):
                                        Responsible Party/Buyer must reference program packet for any additional cancellation policies.
                                    </div>
                                </div>

								<div onClick={this.personalInformationDone} className="btn btn-select">
									Continue
								</div>
		    				</div>
		    			</div>
		    			<div className="slide" style={positionSlide(6)}>
                            <div className="bg-white clearfix">
                                <div className="title">Signature</div>
                                <div className="signature">
                                    By signing below you acknowledge:
                                    <ol>
                                        <li> My credit card or bank statement will constitute my only receipt for payments made pursuant to this request.</li>
                                        <li> The privilege of making payments by EFT may be revoked by Mastery at any time in its discretion, including, but not limited to, for reason of an item being rejected for payment upon presentation.</li>
                                        <li> Revocation of the privilege to make payments by EFT does not release me from my payment obligations.</li>
                                        <li> A service charge of $15.00 will be applied to my account should any item be rejected for payment upon presentation, which I agree to pay.</li>
                                    </ol>

                                    <Signature />
                                </div>
                            </div>
		    			</div>
    				</div>
    			</div>
    		</div>
    	);
    }
});
