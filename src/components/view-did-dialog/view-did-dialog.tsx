import * as React from 'react';
import ReactModal from 'react-modal';
import {Button} from '../button/button';
import "./view-did-dialog.scss";
import {ViewDidDialogProps} from "./view-did-dialog-props";
import {ViewDidField} from "../view-did-field/view-did-field";

ReactModal.defaultStyles = {}

export class ViewDidDialog extends React.Component<ViewDidDialogProps> {
    togle  = {
        personal: true,
        education: true
    };
    state = {
        personal: {
            vcId: { checked: false },
            vcDes: { checked: false },
            phoneOne: { checked: false },
            phoneTwo: { checked: false },
            telegram: { checked: false },
            viber: { checked: false },
            whatsapp: { checked: false },
            linkedin: { checked: false },
            email: { checked: false },
        },
        education: {
            vcId: { checked: false },
            vcDes: { checked: false },
            diplom: { checked: false },
            speciality: { checked: false },
            academic_degree: { checked: false },
            date: { checked: false },
        }
    }

changeChecked= (event,key,prop) => {
        let kkk ={ mm:false}
    if (kkk.mm){
        console.log('blalba');
    }
    this.setState({...this.state , [key] : { ...this.state[key], [prop]: {checked: event.target.checked} } })
}
selectAll = (key) => {
        let statebox = this.state[key]
    for (let personalKey in statebox) {
        if (statebox[personalKey].checked !== this.togle[key]){
        statebox[personalKey].checked = this.togle[key]
        }
    }
    this.togle[key] = !this.togle[key]
    this.setState({...this.state , [key]: statebox})

}
    render() {
        return (
            <ReactModal className="view-did-dialog d-flex flex-column justify-content-between"
                        isOpen={true}>
                <div className="overflow-auto scroll-hide field-box">

                    <h5 className="fw-bold mb-3 mt-2">VC Request permission</h5>

                    <div className="mb-3">

                        <div className="d-flex flex-row justify-content-between mb-2">
                            <div className="fw-bold ">Personal Data - Contacts</div>

                            <div className="text-primary" onClick={()=>this.selectAll('personal')}>Allow All VC</div>

                        </div>
                        <ViewDidField title="VC ID" value="DID: ex: 1234567890abcdef"
                                      onChange={(e) => {this.changeChecked(e, 'personal', 'vcId')}}
                                      isChecked={this.state.personal.vcId.checked}/>

                        <ViewDidField title="VC Description" value="My contacts"
                                      onChange={(e) => {this.changeChecked(e, 'personal', 'vcDes')}}
                                      isChecked={this.state.personal.vcDes.checked} />

                        <ViewDidField title="Phone 1" value="+38 (067) 123 45 67"
                                      onChange={(e) => {this.changeChecked(e, 'personal', 'phoneOne')}}
                                      isChecked={this.state.personal.phoneOne.checked} />

                        <ViewDidField title="Phone 2" value="+38 (067) 123 49 67"
                                      onChange={(e) => {this.changeChecked(e, 'personal', 'phoneTwo')}}
                                      isChecked={this.state.personal.phoneTwo.checked}/>

                        <ViewDidField title="Telegram" value="@test_user"
                                      onChange={(e) => {this.changeChecked(e, 'personal', 'telegram')}}
                                      isChecked={this.state.personal.telegram.checked}/>

                        <ViewDidField title="Viber" value="+38 (067) 123 49 67"
                                      onChange={(e) => {this.changeChecked(e, 'personal', 'viber')}}
                                      isChecked={this.state.personal.viber.checked}/>

                        <ViewDidField title="WhatsApp" value="+38 (067) 123 49 67"
                                      onChange={(e) => {this.changeChecked(e, 'personal', 'whatsapp')}}
                                      isChecked={this.state.personal.whatsapp.checked}/>

                        <ViewDidField title="Linkedin" value="/userlink_1"
                                      onChange={(e) => {this.changeChecked(e, 'personal', 'linkedin')}}
                                      isChecked={this.state.personal.linkedin.checked}/>

                        <ViewDidField title="Email" value="my@mail.com"
                                      onChange={(e) => {this.changeChecked(e, 'personal', 'email')}}
                                      isChecked={this.state.personal.email.checked}/>
                    </div>

                    <div className="mb-3">

                        <div className="d-flex flex-row justify-content-between mb-2">
                            <div className="fw-bold ">Education - Diploma</div>

                            <div className="text-primary" onClick={()=>this.selectAll('education')}>Allow All VC</div>

                        </div>
                        <ViewDidField title="VC ID" value="DID: ex: 1234567890abcdef"
                                      onChange={(e) => {this.changeChecked(e, 'education', 'vcId')}}
                                      isChecked={this.state.education.vcId.checked}/>

                        <ViewDidField title="VC description" value="My contacts"
                                      onChange={(e) => {this.changeChecked(e, 'education', 'vcDes')}}
                                      isChecked={this.state.education.vcDes.checked}/>

                        <ViewDidField title="Diploma ID" value="89010019291"
                                      onChange={(e) => {this.changeChecked(e, 'education', 'diplom')}}
                                      isChecked={this.state.education.diplom.checked}/>

                        <ViewDidField title="Speciality" value="Medical Assistant"
                                      onChange={(e) => {this.changeChecked(e, 'education', 'speciality')}}
                                      isChecked={this.state.education.speciality.checked}/>

                        <ViewDidField title="Academic degree" value="Pre-college"
                                      onChange={(e) => {this.changeChecked(e, 'education', 'academic_degree')}}
                                      isChecked={this.state.education.academic_degree.checked}/>

                        <ViewDidField title="Date" value="9/4/12"
                                      onChange={(e) => {this.changeChecked(e, 'education', 'date')}}
                                      isChecked={this.state.education.date.checked}/>
                    </div>


                </div>
                <div className="d-flex justify-content-end align-items-center btn-box">

                    <Button onClick={this.onCancelButtonClick} className="m-lg-1">Cancel</Button>
                    <Button onClick={this.onCancelButtonClick} className="ms-2 bg-danger text-white">Reject the entire
                        request</Button>
                    <Button color="primary" className="m-lg-1" onClick={this.onSubmitButtonClick}>Revoke</Button>

                </div>
            </ReactModal>
        );
    }

    private onCancelButtonClick = () => {
        this.emitCloseEvent();
    }

    private onSubmitButtonClick = () => {
        this.emitCloseEvent();
    }

    private emitCloseEvent(data?: any) {
        if (this.props.onClose) {
            this.props.onClose(data);
        }
    }
}
