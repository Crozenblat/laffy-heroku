import React from "react";
import styled from "styled-components";

const CrslArrw = styled.button`
    display: flex;
    position: absolute;
    top: 0;
    ${props => props.direction === "right" ? "right: 1vw" : "left: 1vw"};
    height: 100%;
    width: 6vw;
    justify-content: center;
    background: transparent;
    border: none;
    align-items: center;
    transition: transform ease-in 0.1s;
    cursor: pointer;

    &:hover{
        transform: scale(1.1);
    };

    

    @media only screen and (max-width: 426px){
        width: 7vw;
    }
`;

const CarouselArrowImg = styled.svg`
    fill: ${props => props.theme.secondaryColor};
    height: fit-content;
`;

const CarouselArrow = props => {

    return (
        <CrslArrw direction={props.direction} onClick={props.clicked}>
            {props.direction === "right" ? 
                <CarouselArrowImg x="0px" y="0px" viewBox="0 0 256 256">
                    <polygon points="79.093,0 48.907,30.187 146.72,128 48.907,225.813 79.093,256 207.093,128 		"/>
                </CarouselArrowImg>
            :
                <CarouselArrowImg x="0px" y="0px" viewBox="0 0 256 256">
                    <polygon points="207.093,30.187 176.907,0 48.907,128 176.907,256 207.093,225.813 109.28,128"/>
                </CarouselArrowImg>
            }
        </CrslArrw>
    )
};

export default CarouselArrow;