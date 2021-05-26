import React from "react";
import styled from "styled-components";

const SctnHdng = styled.h1`
    color: ${props => props.theme.secondaryColor};
    text-transform: capitalize;
    font-size: 5.5vw;
    margin-top: 3rem;
    margin-bottom: 2rem;
    position: relative;
    text-align: ${props => {
        return (
            props.textAlign === "start" ? "start" :
            props.textAlign === "center" && "center"
        )
    }};
    width: 100%;

    @media only screen and (max-width: 426px){
        font-size: 13vw;
        margin: 1rem 0 3vw 0;
    };
`;

const SectionHeading = props => {
    return <SctnHdng textAlign={props.textAlign} type={props.type}>{props.children}</SctnHdng>
};

export default SectionHeading;