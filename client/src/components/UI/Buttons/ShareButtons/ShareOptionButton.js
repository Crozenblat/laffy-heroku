import React, {useEffect} from "react";
import styled from "styled-components";

import facebookIcon from "../../../../assets/facebook-icon.svg";
import twitterIcon from "../../../../assets/twitter-icon.svg";
import redditIcon from "../../../../assets/reddit-icon.svg"

const ShrOptnBtn = styled.a`
    background-image: ${props => `url(${props.service})`};
    background-size: 4vw;
    background-position: center;
    background-repeat: no-repeat;
    border: transparent;
    border-radius: 50%;
    padding: 2vw;
    backface-visibility: hidden;

    &:hover{
        cursor: pointer;
    };

    @media only screen and (max-width: 1024px){
        background-size: 5vw;
        padding: 3vw;
    };

    @media only screen and (max-width: 768px){
        background-size: 8vw;
        padding: 4vw;
        margin-bottom: 2vw;
    };

    @media only screen and (max-width: 426px){
        background-size: 11.5vw;
        padding: 6vw;
    };

    @media only screen and (max-width: 320px){
        background-size: 16vw;
        padding: 8vw;
    };
`;

const ShrOptnBtnAnmtnWrpper = styled.span`
    display: inherit;
    transform: ${props => props.active ? "rotate(0deg) translateY(-1.8vw)" : "rotate(45deg) translateY(0)"};
    opacity: ${props => props.active ? "100%" : "0%"};
    visibility: ${props => props.active ? "visible" : "hidden"};
    transition: 0.2s;
`;

const ShareOptionButton = props => {

    useEffect(() => {
        if(props.type === "twitter"){
            window.twttr = (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0],
                  t = window.twttr || {};
                if (d.getElementById(id)) return t;
                js = d.createElement(s);
                js.id = id;
                js.src = "https://platform.twitter.com/widgets.js";
                fjs.parentNode.insertBefore(js, fjs);
              
                t._e = [];
                t.ready = function(f) {
                  t._e.push(f);
                };
              
                return t;
            }(document, "script", "twitter-wjs"));
        }
    }, [props.type]);

    let socialMediaService;
    let btnElement;

    switch(props.type){
        case "facebook":
            btnElement = <ShrOptnBtnAnmtnWrpper active={props.shareBtnActive}><span data-href={window.location.href}><ShrOptnBtn target="_blank" service={facebookIcon} active={props.shareBtnActive} href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURI(window.location.href)}&amp;src=sdkpreparse`} data-layout="button" data-size="large"/></span></ShrOptnBtnAnmtnWrpper>
        break;
        case "twitter":
            let twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURI(`Check Out ${props.comedianName} on Laffy!`)}`
            btnElement = <ShrOptnBtnAnmtnWrpper active={props.shareBtnActive}><a target="_blank" rel="noopener noreferrer" href={twitterUrl}><ShrOptnBtn service={twitterIcon}/></a></ShrOptnBtnAnmtnWrpper>
        break;
        case "reddit":
            let redditUrl = `http://www.reddit.com/submit?title=${encodeURI(`Check Out ${props.comedianName} on Laffy!`)}&url=${window.location.href}`
            btnElement = <ShrOptnBtnAnmtnWrpper active={props.shareBtnActive}><a target="_blank" rel="noopener noreferrer" href={redditUrl}><ShrOptnBtn service={redditIcon}/></a></ShrOptnBtnAnmtnWrpper>
        break;
        default:
            return
    };

    return(
        btnElement
    );
};

export default ShareOptionButton;