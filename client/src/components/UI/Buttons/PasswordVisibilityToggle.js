import React from "react";
import styled from "styled-components";

const PsswrdVsbltyCntnr = styled.div`
    display: flex;
    align-items: baseline;
    margin-left: 0.5vw;

    @media only screen and (max-width: 1025px){
        margin: 0.4vw 0;
    };

    @media only screen and (max-width: 426px){
        margin: 0.4vw 1vw;
    };
`;

const PsswrdVsbltyTggl = styled.input`
    transform: scale(2.1);
    position: relative;
    bottom: .13vw;

    @media only screen and (max-width: 1921px){
        transform: scale(1.5);
        bottom: 0;
    };

    @media only screen and (max-width: 1441px){
        transform: scale(1.4);
    };

    @media only screen and (max-width: 1025px){
        transform: scale(1.3);
        top: 0.2vw;
    };

    @media only screen and (max-width: 769px){
        transform: scale(1.1);
        top: 0.3vw;
    };

    @media only screen and (max-width: 426px){
        transform: scale(1.4);
        top: 0.5vw;
    };
`;

const PsswrdVsbltyLbl = styled.label`
    vertical-align: text-bottom;
    margin-left: 0.4vw;
    font-size: 1.2vw;

    @media only screen and (max-width: 1025px){
        transform: scale(1.2);
        font-size: 1.5vw;
        margin-left: 1.4vw;
    };

    @media only screen and (max-width: 426px){
        font-size: 1.4rem;
        margin-left: 1.4rem;
    };
`;

const PasswordVisibilityToggle = props => {
    return (
        <PsswrdVsbltyCntnr>
            <PsswrdVsbltyTggl type="checkbox" onClick={props.click} id={props.id}/>
            <PsswrdVsbltyLbl htmlFor={props.id}>{props.children}</PsswrdVsbltyLbl>
        </PsswrdVsbltyCntnr>
    )
};

export default PasswordVisibilityToggle;