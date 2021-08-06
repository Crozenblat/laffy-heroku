import React, {useRef} from "react";
import styled from "styled-components";

import useParallax from "../../hooks/useParallax";

const BnnrParallaxContainer = styled.div`
    width: 100%;
    height: 31vw;

    position: relative;
    margin-top: -3rem;

    @media only screen and (max-width: 1025px){
        height: 43vw;
    };   
    
    @media only screen and (max-width: 769px){
        height: ${props => (
            props.type === "homePage" ? "50vw" :
            props.type === "comedianPage" && "55vw"
        )};
    };

    @media only screen and (max-width: 426px){
        height: ${props => (
            props.type === "homePage" ? "70vw" :
            props.type === "comedianPage" && "76vw"
        )};
    };   
    
    @media only screen and (max-width: 321px){
        height: ${props => (
            props.type === "homePage" ? "85vw" :
            props.type === "comedianPage" && "96vw"
        )};
    };  
`;

const BnnrBackgroundImage = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;

    width: 100%;

    background-size: cover;
    background-repeat: no-repeat;
    background-image: ${props => props.backgroundImg};
    background-position-y: 45%;

    @media only screen and (max-width: 1025px){
        background-size: ${props => props.type === "comedianPage" && "138vw"};
    };   
    
    @media only screen and (max-width: 769px){
        background-size: ${props => props.type === "comedianPage" && "150vw"};
    };

    @media only screen and (max-width: 426px){
        background-size: ${props => props.type === "comedianPage" && "205vw"};
        background-position-y: ${props => props.type === "comedianPage" && "-17%"};
    };   
    
    @media only screen and (max-width: 321px){
        background-size: ${props => props.type === "comedianPage" && "240vw"};
    };  
`;

const BnnrBackgroundImageOverlay = styled.div`
    background: black;
    opacity: 0.8;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
`;

const BnnrContent = styled.div`
    position: absolute;
    top: 0;
    left: 0;
`;

const BnnrHeading = styled.h1`
    color: ${props => props.theme.secondaryColor};
    font-weight: bold;
    font-size: ${props => (
        props.type === "homePage" ? "9vw" :
        props.type === "comedianPage" && "6.8vw"
    )};
    text-transform: capitalize;
    margin-top: 1.4vw;
    margin-left: 5%;

    @media only screen and (max-width: 1025px){
        font-size: ${props => (
            props.type === "homePage" && "11vw"
        )};
        margin-top: 3vw;
    };

    @media only screen and (max-width: 769px){
        font-size: ${props => (
            props.type === "homePage" && "14vw"
        )};
        margin-top: 7vw;
    };

    @media only screen and (max-width: 426px){
        font-size: ${props => (
            props.type === "homePage" ? "19vw" :
            props.type === "comedianPage" && "10vw"
        )};
        margin-top: ${props => (
            props.type === "comedianPage" && "9vw"
        )};
    };
`;

const BnnrSubheading = styled.p`
    color: ${props => props.theme.secondaryColor};
    font-size: 2.2vw;
    font-weight: 600;
    width: ${props => (
        props.type === "homePage" ? "49%" :
        props.type === "comedianPage" && "62%"
    )};
    margin-left: 6%;

    @media only screen and (max-width: 1025px){
        font-size: 2.7vw;
        width: 60%;
    };

    @media only screen and (max-width: 769px){
        font-size: 3vw;
        width: ${props => (
            props.type === "homePage" && "70%"
        )};
    };

    @media only screen and (max-width: 426px){
        font-size: 4.6vw;
        width: ${props => (
            props.type === "homePage" ? "80%" :
            props.type === "comedianPage" && "90%"
        )};
    };

    @media only screen and (max-width: 376px){
        font-size: 4.7vw;
    };

    @media only screen and (max-width: 321px){
        font-size: 5.4vw;
    };
`;

const Banner = props => {

    const parallaxBackground = useRef(null);
    const parallaxForeground = useRef(null);

    useParallax(parallaxForeground, 0.4);
    useParallax(parallaxBackground, 0.2);

    const overlay = props.type === "comedianPage" ? <BnnrBackgroundImageOverlay/> : null;

    return (
        <BnnrParallaxContainer type={props.type}>
            <BnnrBackgroundImage type={props.type} backgroundImg={props.backgroundImg} ref={parallaxBackground}/>
            {overlay}
            <BnnrContent ref={parallaxForeground}>
                <BnnrHeading type={props.type}>{props.heading}</BnnrHeading>
                <BnnrSubheading type={props.type}>{props.subheading}</BnnrSubheading>
                {props.children}
            </BnnrContent>
        </BnnrParallaxContainer>
    )
}

export default Banner;