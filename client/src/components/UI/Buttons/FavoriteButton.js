import React from "react";
import styled from "styled-components";

import useMediaQuery from "../../../hooks/useMediaQuery";

const FvrtBtnTxt = styled.p`
    margin-left: 1rem;
    font-size: 2.4vw;

    @media only screen and (max-width: 1025px){
        font-size: 3.3vw;
    };

    @media only screen and (max-width: 769px){
        font-size: 4.6vw;
    };
`;

const FvrtIcn = styled.svg`
    width: 2.5vw;
    stroke-width: 30px;

    @media only screen and (max-width: 1025px){
        width: 3.8vw;
    };

    @media only screen and (max-width: 769px){
        width: 5vw;
    };

    @media only screen and (max-width: 426px){
        width: 8vw;
        position: relative;
        right: 0.2vw;
        top: 0.2vw;
    };

    @media only screen and (max-width: 376px){
        width: 10vw;
        right: 0.3vw;
    };

    @media only screen and (max-width: 321px){
        width: 13vw;
    };
`;

const FvrtBtn = styled.button`
    display: flex;
    align-items: center;
    background: ${props => props.favorited ? props.theme.secondaryColor : "transparent"};
    height: 3vw;
    padding: 0 2rem;
    border: solid 1px ${props => props.theme.secondaryColor};
    border-radius: 40px;
    width: ${props => props.favorited ? "14.5vw" : "13.2vw"};
    transition: 0.2s;

    &:hover{
        cursor: pointer;
    };

    ${FvrtBtnTxt}{
        color: ${props => props.favorited ? props.theme.primaryColor : props.theme.secondaryColor};
    };

    ${FvrtIcn}{
        stroke: ${props => props.favorited ? props.theme.primaryColor : props.theme.secondaryColor};
        fill: ${props => props.favorited ? props.theme.secondaryColor : "transparent"};
    };

    @media only screen and (max-width: 2071px){
        width: ${props => props.favorited ? "15.1vw" : "13.7vw"};
    };

    @media only screen and (max-width: 1705px){
        width: ${props => props.favorited ? "15.5vw" : "14.2vw"};
    };

    @media only screen and (max-width: 1441px){
        width: ${props => props.favorited ? "16.1vw" : "14.8vw"};
    };

    @media only screen and (max-width: 1226px){
        width: ${props => props.favorited ? "16.8vw" : "15.4vw"};
    };

    @media only screen and (max-width: 1040px){
        width: ${props => props.favorited ? "16.8vw" : "15.4vw"};
    };

    @media only screen and (max-width: 1025px){
        height: 4.5vw;
        width: ${props => props.favorited ? "22.6vw" : "20.8vw"};
    };

    @media only screen and (max-width: 769px){
        height: 6vw;
        width: ${props => props.favorited ? "32vw" : "28.4vw"};
    };

    @media only screen and (max-width: 583px){
        width: ${props => props.favorited ? "33.2vw" : "28.4vw"};
    };

    @media only screen and (max-width: 500px){
        width: ${props => props.favorited ? "34.6vw" : "28.4vw"};
    };

    @media only screen and (max-width: 426px){
        height: auto;
        width: auto;
        padding: 1.3vw 0.713vw;
        border-radius: 50%;
    };

    @media only screen and (max-width: 321px){
        padding: 1.52vw 0.57vw;
    };
`;

const FavoriteButton = props => {
    let [screenWidth] = useMediaQuery();
    let favoriteBtnText = props.favorited ? "Favorited" : "Favorite";

    return (
        <FvrtBtn onClick={props.favoriteButtonClick} favorited={props.favorited}>
            <FvrtIcn viewBox="-60 0 600 512">
                <path d="m246.122 477.289c-144.417-126.367-246.122-193.304-246.122-299.774 0-80.513 57.4-146.515 136-146.515 54.544 0 95.017 33.497 120 81.015 24.981-47.515 65.454-81.015 120-81.015 78.609 0 136 66.015 136 146.515 0 106.457-101.572 173.291-246.122 299.773-5.657 4.949-14.1 4.949-19.756.001z"/>
            </FvrtIcn>
            {screenWidth > 426 ? <FvrtBtnTxt>{favoriteBtnText}</FvrtBtnTxt> : null}
        </FvrtBtn>
    )
}

export default FavoriteButton;