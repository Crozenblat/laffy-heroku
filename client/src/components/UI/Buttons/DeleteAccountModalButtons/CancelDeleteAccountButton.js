import React from "react";
import styled from "styled-components";

const CnclDltAccntBtn = styled.button`
    border: solid 1px ${props => props.theme.secondaryColor};
    color: ${props => props.theme.secondaryColor};
    border-radius: 5px;
    font-size: 3vw;
    background: transparent;
    transition: all .4s;
    padding: 0.4vw;

    @media only screen and (max-width: 426px){
        font-size: 7vw;
    };

    &:hover{
        cursor: pointer;
        color: ${props => props.theme.primaryColor};
        background: ${props => props.theme.secondaryColor};
    }
`;

const CancelDeleteAccountButton = props => {
    return <CnclDltAccntBtn onClick={props.click}>{props.children}</CnclDltAccntBtn>
}

export default CancelDeleteAccountButton;