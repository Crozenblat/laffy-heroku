import React from "react";
import styled from "styled-components";

import SectionHeading from "../components/Section/SectionHeading";

import Login from "../containers/Login/Login";
import SignUp from "../containers/SignUp/SignUp";

const FormPosWrppr = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    @media only screen and (max-width: 426px){
        width: 95%;
    };
`;

const FrmHdng = styled.h3`
    text-align: center;
    font-size: 4vw;

    @media only screen and (max-width: 426px){
        font-size: 5rem;
    };
`;

const LgnFrmWrppr = styled.div`
    display: flex;
    justify-content: space-around;
    background: white;
    width: 100%;
    border-radius: 20px;

    @media only screen and (max-width: 426px){
        flex-direction: column;
    };
`;

const FrmWrppr = styled.div`
    margin: 0 2rem;
`;

const LgnDvdr = styled.span`
    background: grey;
    height: 20vw;
    width: 1px;
    align-self: center;

    @media only screen and (max-width: 426px){
        height: 1px;
        width: 85%;
        margin: 3rem 0;
    };
`;

const LoginPage = props => {
    return(
        <FormPosWrppr>
            <SectionHeading textAlign="center" type="main">Welcome to the Club!</SectionHeading>
            <LgnFrmWrppr>
                <FrmWrppr>
                    <FrmHdng>Log In</FrmHdng>
                    <Login/>
                </FrmWrppr>
                <LgnDvdr/>
                <FrmWrppr>
                    <FrmHdng>Sign Up</FrmHdng>
                    <SignUp/>
                </FrmWrppr>
            </LgnFrmWrppr>
        </FormPosWrppr>
    )
};

export default LoginPage;