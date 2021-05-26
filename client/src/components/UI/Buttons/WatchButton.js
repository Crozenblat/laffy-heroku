import React from "react";
import styled from "styled-components";

import amazonPrimeLogo from "../../../assets/prime-video-logo.svg";
import HBOMaxLogo from "../../../assets/HBO-max-logo.svg";
import huluLogo from "../../../assets/hulu-logo.svg";
import netflixLogo from "../../../assets/netflix-logo.svg";
import youtubeLogo from "../../../assets/youtube-logo.svg";

const WatchLink = styled.a`
    display: contents;
`;

const WatchBtn = styled.img`
    background: ${props => {
        return (
            props.type === "netflix" ? "#ffffff" :
            props.type === "hulu" ? "#000000" :
            props.type === "amazon-prime" ? "#1c2530" :
            props.type === "youtube" ? "#ffffff" :
            props.type === "hbo-max" && "#f7f7f7"
        )
    }};
    margin: 0.3vw 0;
    height: 3vw;
    width: 48%;
    padding: ${props => {
        return (
            props.type === "hbo-max" ? "0.7rem" : "0"
        )
    }};

    @media only screen and (max-width: 769px){
        height: 5vw;
    };

    @media only screen and (max-width: 426px){
        height: 7vw;
        margin-bottom: 1vw;
    };

    @media only screen and (max-width: 321px){
        height: 10vw;
    };
`;

const WatchButton = props => {
    let serviceLogo;
    
    switch(props.type){
        case "amazon-prime":
            serviceLogo = amazonPrimeLogo;
        break;
        case "hbo-max":
            serviceLogo = HBOMaxLogo;
        break;
        case "hulu":
            serviceLogo = huluLogo;
        break;
        case "netflix":
            serviceLogo = netflixLogo;
        break;
        case "youtube":
            serviceLogo = youtubeLogo;
        break;
        default:
            return
    }
    return (
        <WatchLink href={props.serviceLink} target="_blank">
            <WatchBtn type={props.type} src={serviceLogo} title={props.type}/>            
        </WatchLink>
    )
};

export default WatchButton;