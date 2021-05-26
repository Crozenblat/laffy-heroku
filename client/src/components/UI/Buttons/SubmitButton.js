import React from "react";
import styled from "styled-components";

const SbmtBtn = styled.button`
    border-radius: 1vw;
    font-size: 2vw;
    margin: 1vw 0;
    padding: 0.7vw;
    width: ${props => (
        props.type === "commentSubmit" && "9vw"
    )};
    color: ${props => (
        props.type === "commentSubmit" && props.theme.secondaryColor
    )};
    border: 1px solid ${props => (
        props.type === "commentSubmit" && props.theme.secondaryColor
    )};
    background: ${props => (
        props.type === "commentSubmit" && "transparent"
    )};
    cursor: pointer;
    transition: all 0.2s;

    @media only screen and (max-width: 1024px){
        font-size: 3vw;
        width: ${props => (
            props.type === "commentSubmit" && "11vw"
        )};
    };

    @media only screen and (max-width: 426px){
        font-size: ${props => (
            props.type === "commentSubmit" ? "6vw" : "8vw"
        )};
        margin: 5vw 0;
        width: ${props => (
            props.type === "commentSubmit" ? "22vw" : "50vw"
        )};
        height: ${props => (
            props.type === "commentSubmit" && "11vw"
        )};
    };

    @media only screen and (max-width: 376px){
        font-size: ${props => (
            props.type === "commentSubmit" ? "6.7vw" : "10vw"
        )};
        width: ${props => (
            props.type === "commentSubmit" && "25vw"
        )};
    };
`;

const SubmitButton = props => {
    return(
        <SbmtBtn type={props.type} onClick={props.click} disabled={props.disabled}>{props.children}</SbmtBtn>
    );
};

export default SubmitButton;