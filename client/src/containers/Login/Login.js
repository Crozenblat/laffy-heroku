import React, {useState} from "react";
import styled from "styled-components";
import axios from "axios";
import {useDispatch} from "react-redux";
import  {useHistory} from "react-router-dom";
import {authLoginUser} from "../../store/features/authorizationSlice";

import PasswordVisibilityToggle from "../../components/UI/Buttons/PasswordVisibilityToggle";
import SubmitButton from "../../components/UI/Buttons/SubmitButton";

import useCreateFormInputs from "../../hooks/useCreateFormInputs"
import useFormInputChangedHandler from "../../hooks/useFormInputChangedHandler";
import useTogglePasswordVisibility from "../../hooks/useTogglePasswordVisibility";

const LgnFrm = styled.form`
    
`;

const SbmtBtnPosWrppr = styled.span`
    display: flex;
    justify-content: center;
`;

const LoginForm = props => {
    const [controls, setControls] = useState({
        loginUsername:{
            label: "Username",
            value: "",
            type: "text",
            isValid: false,
            errMsg: null,
            touched: false,
            validationRules:{
                required: true,
            }
        },
        loginPassword:{
            label: "Password",
            value: "",
            type: "password",
            isValid: false,
            errMsg: null,
            touched: false,
            validationRules:{
                required: true,
                minLength: 8
            }
        }
    });

    const dispatch = useDispatch();
    const history = useHistory();

    const inputChangedHandler = useFormInputChangedHandler;

    const formInputs = useCreateFormInputs(controls, setControls, inputChangedHandler);

    const togglePasswordVisibility = useTogglePasswordVisibility;

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        try{
            let login = await axios.post("/login", {username: controls.loginUsername.value, password: controls.loginPassword.value}, {withCredentials: true});
            dispatch(authLoginUser({userId: login.data.userId, username: login.data.username}));
            history.push("/");
        }catch(err){
            console.log(err);
            setControls(prev => {
                return {
                    ...prev,
                    [err.response.data.input]:{
                        ...prev[err.response.data.input],
                        errMsg: err.response.data.message
                    }
                };
            });
        };
    };

    return(
        <LgnFrm>
            {formInputs}
            <PasswordVisibilityToggle click={() => togglePasswordVisibility(controls, setControls)} id="loginShowPassword">Show Password</PasswordVisibilityToggle>
            <SbmtBtnPosWrppr>
                <SubmitButton click={onSubmitHandler} disabled={!controls.loginUsername.isValid || !controls.loginPassword.isValid}>Log In</SubmitButton>
            </SbmtBtnPosWrppr>
        </LgnFrm>
    );
};

export default LoginForm;