import React, {useState} from "react";
import styled from "styled-components";
import {useSelector} from "react-redux";
import axios from "axios";
import {checkValidity} from "../../utilities/utilities";

import FormInput from "../../components/UI/Inputs/FormInput";
import PasswordVisibilityToggle from "../../components/UI/Buttons/PasswordVisibilityToggle";
import ConfirmationMessage from "../../components/Messages/ConfirmationMessage";
import SubmitButton from "../../components/UI/Buttons/SubmitButton";

const ChngPsswrdFrm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: white;
    border-radius: 10px;
    width: 40%;
    padding: 0 2rem;

    @media only screen and (max-width: 769px){
        width: 52%;
    };

    @media only screen and (max-width: 426px){
        width: 93%;
    };
`;

const PsswrdVsbltyTgglPosWrppr = styled.span`
    align-self: flex-start;
    margin-left: 6vw; 

    @media only screen and (max-width: 1441px){
        margin-left: 5.5vw;
    };

    @media only screen and (max-width: 1025px){
        margin-left: 3.5vw;
    };

    @media only screen and (max-width: 426px){
        margin-left: 0;
    };
`;

const SbmtBtnPosWrppr = styled.span`
    display: flex;
    justify-content: center;
`;

const ChangePasswordForm = props => {
    let [controls, setControls] = useState({
        currentPassword:{
            label: "Current Password",
            value: "",
            type: "password",
            isValid: false,
            errMsg: null,
            touched: false,
            validationRules:{
                required: true,
                minLength: 8,
                isUnique: true
            }
        },
        newPassword:{
            label: "New Password",
            value: "",
            type: "password",
            isValid: false,
            errMsg: null,
            touched: false,
            validationRules:{
                required: true,
                minLength: 8,
                isUnique: true
            }
        }
    });

    const [confirmationMsg, setConfirmationMsg] = useState(null);
    const username = useSelector(state => state.authorization.username);

    const inputChangedHandler = (event, controlName) => {
        event.persist();
        let controlsValueSet = [];
        for(let control of Object.keys(controls)){
            controlsValueSet.push(controls[control].value);
        };
        let {isValid, errType} = checkValidity(event.target.value, controls[controlName].validationRules, controlsValueSet);
        
        let errMsg;

        switch(errType){
            case "required":
                errMsg = `Required: ${controls[controlName].label}`;
            break;
            case "minLength":
                errMsg = `${controls[controlName].label} must be at least 8 characters long`;
            break;
            case "isUnique":
                errMsg = "Current Password and New Password must not match";
            break;
            default:
                errMsg = null
        };

        setControls(prev => {
            let updatedControls = {};
            Object.entries(prev).forEach(control => {
                updatedControls[control[0]] = {
                    ...control[1],
                    touched: control[0] === controlName ? true : control[1].touched,
                    value: control[0] === controlName ? event.target.value : control[1].value,
                    errMsg: errType === "isUnique" ? errMsg :
                            control[0] === controlName ? errMsg :
                            control[1].errMsg === "Current Password and New Password must not match" ? null : 
                            control[1].errMsg,
                    isValid: errType === "isUnique" ? isValid : 
                             control[0] === controlName ? isValid : 
                             control[1].errMsg === "Current Password and New Password must not match" ? true :
                             control[1].isValid
                };
            });

            return updatedControls;
        });
    };

    const togglePasswordVisibility = (e) => {
        for(let controlName in controls){
            console.log(controls[controlName])
            setControls( prev => ({
                ...prev,
                [controlName]:{
                    ...prev[controlName],
                    type: prev[controlName].type === "password" ? "text" : "password"
                }
            }));
        };
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try{
            await axios.patch("/user/password", {username: username, currentPassword: controls.currentPassword.value, newPassword: controls.newPassword.value}, {withCredentials: true});
            setConfirmationMsg(<ConfirmationMessage>Password Changed Successfully</ConfirmationMessage>);
        }catch(err){
            setControls( prev => ({
                ...prev,
                currentPassword:{
                    ...prev.currentPassword,
                    errMsg: err.response.data
                }
            }));
        };
    };

    let inputConfigurations = [];

    for(let key in controls){
        inputConfigurations.push({
            id: key,
            config: controls[key]
        });
    };

    let inputs = inputConfigurations.map(formInput => {
        return(
            <FormInput
                id={formInput.id}
                key={formInput.id}
                value={formInput.config.value}
                type={formInput.config.type}
                touched={formInput.config.touched}
                isValid={formInput.config.isValid}
                errMsg={formInput.config.errMsg}
                onchange={(event) => inputChangedHandler(event, formInput.id)}>
                    {formInput.config.label}
                </FormInput>
        );
        
    });

    return(
        <ChngPsswrdFrm>
            {inputs}
            <PsswrdVsbltyTgglPosWrppr>
                <PasswordVisibilityToggle click={togglePasswordVisibility} id="changePasswordShowPassword">Show Passwords</PasswordVisibilityToggle>
            </PsswrdVsbltyTgglPosWrppr>
            <SbmtBtnPosWrppr> 
                <SubmitButton type="changePasswordSubmit" click={onSubmitHandler} disabled={!controls.currentPassword.isValid || !controls.newPassword.isValid}>Change Password</SubmitButton>
            </SbmtBtnPosWrppr>
            {confirmationMsg}
        </ChngPsswrdFrm>
    );
};

export default ChangePasswordForm;