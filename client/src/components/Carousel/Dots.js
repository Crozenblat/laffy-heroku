import React from "react";
import styled from "styled-components";

const Dts = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Dt = styled.span`
    padding: 0.8vw;
    margin-right: 5px;
    border: solid 2px ${props => props.theme.secondaryColor};
    border-radius: 50%;
    background: ${props => props.active ? props.theme.secondaryColor : "transparent"};
    transition: all .2s;

    @media only screen and (max-width: 769px){
        padding: 1.1vw;
    };

    @media only screen and (max-width: 426px){
        padding: 1.7vw;
    };
`;

const Dots = props => {
    return (
        <Dts>
        {props.slides.map((slide, i) => {
            return <Dt key={`dot${i}`} active={props.activeSlide === i}/>
        })}
        </Dts>
    )
}

export default Dots;