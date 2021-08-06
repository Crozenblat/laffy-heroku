import React from "react";
import styled, {keyframes} from "styled-components";

const errMsgAnimation = keyframes`
    from{
        color: white;
    };

    to{
        color: red;
    };
`;

const ErrMsgText = styled.p`
    font-size: ${props => (
        props.type === "commentError" ? "1.4vw" :
        props.type === "deleteAccountError" ? "2vw" :
        props.type === "reviewError" && "1.2vw"
    )};
    animation-name: ${errMsgAnimation};
    animation-duration: 1s;
    animation-fill-mode: forwards;

    @media only screen and (max-width: 1800px){
        font-size: ${props => (
            props.type === "reviewError" && "1.6vw"
        )};
    };

    @media only screen and (max-width: 769px){
        font-size: ${props => (
            props.type === "commentError" ? "2.2vw" :
            props.type === "reviewError" && "2vw"
        )};
    };

    @media only screen and (max-width: 426px){
        font-size: ${props => (
            props.type === "commentError" ? "3.5vw" :
            props.type === "reviewError" && "3.5vw"
        )};
    };
`;

const ErrorMessage = props => {
    return <ErrMsgText type={props.type}>{props.children}</ErrMsgText>
};

export default ErrorMessage;