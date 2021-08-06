import React, {useRef} from "react";
import useMediaQuery from "../../../hooks/useMediaQuery";
import styled from "styled-components";
import { Player } from 'video-react';
import "../../../../node_modules/video-react/dist/video-react.css";

import ReviewStars from "../../UI/Buttons/ReviewStars";

import WatchButton from "../../UI/Buttons/WatchButton";

const SpclInfo = styled.div`
    display: flex;
    justify-content: space-between;
    background: #000033;
    overflow: hidden;
    padding: 0 1%;
    width: 98%;
    transition: all 0.6s;
    height: ${props => props.open ? "33vw" : 0};

    @media only screen and (max-width: 769px){
        height: ${props => props.open ? "55vw" : 0};
    };

    @media only screen and (max-width: 426px){
        flex-direction: column-reverse;
        align-items: center;
        height: ${props => props.open ? "auto" : 0};
    };
`;

const SpclInfoWrppr = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 45%;

    @media only screen and (max-width: 426px){
        width: 100%;
    };
`;

const SpclTitle = styled.h2`
    color: ${props => props.theme.secondaryColor};
    font-size: 3.5vw;
    text-align: center;

    @media only screen and (max-width: 769px){
        font-size: 4vw;
    };

    @media only screen and (max-width: 426px){
        font-size: 7vw;
    };
`;

const SpclDescription = styled.p`
    color: ${props => props.theme.secondaryColor};
    font-size: 1.5vw;

    @media only screen and (max-width: 769px){
        font-size: 2.3vw;
    };

    @media only screen and (max-width: 426px){
        font-size: 4vw;
        text-align: center;
    };
`;

const SpclTrailerWrppr = styled.div`
    display: flex;
    justify-content: center;
    width: 50%;

    @media only screen and (max-width: 426px){
        width: 102.1%;
        height: ${props => props.hasTrailer ? "54vw" : 0};
    };
`;

const ReviewPosWrapper = styled.div`
    margin: 1rem 0;
    align-self: flex-start;

    @media only screen and (max-width: 426px){
        align-self: center;
    };
`;

const WatchBtnPosWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width: 90%;
`;

const StyledPlayer = styled(Player)`
    height: 100%;
`;

const TrlrSubstitute = styled.img`
    height: 100%;
`;

const SpecialInfo = props => {
    let playerRef = useRef(null);
    const [screenWidth] = useMediaQuery();
    console.log(screenWidth);
    let watchButtons;
    
    if(props.special.specialAvailability){
        watchButtons = props.special.specialAvailability.map((watch, index) => {
            return <WatchButton key={`watchBtn${index}`} type={watch.service} serviceLink={watch.specialPage}/>
        });
    };

    let specialTrailer = props.special.specialTrailer ? 
        <StyledPlayer ref={playerRef} onEnded={() => playerRef.current.load()} src={props.special.specialTrailer} poster={props.special.specialCover} fluid={false} height="100%" width="100%"/> 
        : screenWidth > 426 ? <TrlrSubstitute src={props.special.specialCover}/> : null;

    return (
        <SpclInfo ref={props.passedRef} open={props.open}>
            <SpclTrailerWrppr hasTrailer={props.special.specialTrailer}>
                {specialTrailer}
            </SpclTrailerWrppr>
            <SpclInfoWrppr>
                <SpclTitle>{props.special.specialTitle}</SpclTitle>
                <SpclDescription>{props.special.specialDescription}</SpclDescription>
                <ReviewPosWrapper>
                    <ReviewStars open={props.open} ratings={props.special.specialRatings} updateSpecialRating={props.updateSpecialRating}/>
                </ReviewPosWrapper>
                <WatchBtnPosWrapper>
                    {watchButtons}
                </WatchBtnPosWrapper>
            </SpclInfoWrppr>
        </SpclInfo>
    )
};

export default SpecialInfo;