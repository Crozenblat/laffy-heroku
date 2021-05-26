import React from "react";
import styled from "styled-components";

import {Link} from "react-router-dom";

const StyledInternalLink = styled(Link)`
    text-decoration: none;
    color: ${props => props.theme.primaryColor};
`;

const StyledExternalLink = styled.a`
    text-decoration: none;
    color: ${props => props.theme.primaryColor};
`;

const CtaBtn = styled.button`
    background: ${props => props.theme.secondaryColor};
    position: relative;
    backface-visibility: hidden;
    border: none;
    border-radius: 1rem;
    padding: ${props => (
        props.type === "banner" ? "1rem" :
        props.type === "tourDate" ? "0.5vw" :
        props.type === "loginInvite" && "0.3vw"
    )};
    margin: ${props => (
        props.type === "banner" ? "1vw 0 0 0.4vw" :
        props.type === "loginInvite" && "0.5vw"
    )};
    font-size: ${props => {
        return (
            props.type === "banner" ? "3vw" :
            props.type === "loginInvite" ? "2.5vw" :
            props.type === "form" ? "2.5rem" :
            props.type === "tourDate" && "2vw"
        )
    }};
    transition: 0.3s;

    &:hover{
        background: white;
        transform: translateY(-3px);
        box-shadow: 0 1rem 2rem rgba(0, 0, 0, .2);
        color: ${props => props.theme.secondaryColor};
    };

    @media only screen and (max-width: 1441px){
        width: ${props => {
            return (
                props.type === "tourDate" && "30vw"
            )
        }};
    };

    @media only screen and (max-width: 1025px){
        font-size: ${props => {
            return (
                props.type === "loginInvite" && "3.5vw"
            )
        }};
        padding: ${props => (
            props.type === "loginInvite" && "0.4vw"
        )};
    };

    @media only screen and (max-width: 769px){
        font-size: ${props => {
            return (
                props.type === "tourDate" && "2.5vw"
            )
        }};
        padding: ${props => (
            props.type === "loginInvite" && "0.6vw"
        )};
    };

    @media only screen and (max-width: 426px){
        font-size: ${props => {
            return (
                props.type === "tourDate" ? "5.5vw" :
                props.type === "loginInvite" ? "6.5vw" :
                props.type === "banner" && "5.5vw"
            )
        }};
        padding: ${props => (
            props.type === "loginInvite" ? "2vw" :
            props.type === "banner" && "2vw"
        )};
    };
}
`;

const CtaButton = props => {
    let link = props.tourDate ? 
        <StyledExternalLink target="_blank" href={props.link}>{props}</StyledExternalLink> : 
        <StyledInternalLink to={props.to}>{props.children}</StyledInternalLink>;

    return (
        <CtaBtn type={props.type}>
            {link}
        </CtaBtn>
    );
};

export default CtaButton;