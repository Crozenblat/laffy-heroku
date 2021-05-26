import React from "react";
import styled from "styled-components";

import InfoMessage from "../Messages/InfoMessage";
import CtaButton from "../UI/Buttons/CtaButton";

const LoginInvitePosWrppr = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    @media only screen and (max-width: 426px){
        align-items: center;
    };
`;

const LogInInvite = props => {
    return (
        <LoginInvitePosWrppr>
            <InfoMessage>{props.children}</InfoMessage>
            <CtaButton type="loginInvite" to="/login">Log In</CtaButton>
        </LoginInvitePosWrppr>
    )
};

export default LogInInvite