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
        props.type === "deleteAccountError" && "2vw"
    )};
    animation-name: ${errMsgAnimation};
    animation-duration: 1s;
    animation-fill-mode: forwards;
`;

const ErrorMessage = props => {
    return <ErrMsgText type={props.type}>{props.children}</ErrMsgText>
};

export default ErrorMessage;