import React from "react";
import styled from "styled-components";

const InfoMsg = styled.p`
    color: ${props => props.theme.secondaryColor};
    font-style: italic;
    font-size: 2vw;

    @media only screen and (max-width: 1025px){
        font-size: 2.5vw;
    };

    @media only screen and (max-width: 426px){
        text-align: center;
        font-size: 6.5vw;
    };
`;

const InfoMessage = props => {
    return <InfoMsg>{props.children}</InfoMsg>
};

export default InfoMessage;