import React from "react";
import styled from "styled-components";

import AccountImage from "../Account/AccountImage";
import CtaButton from "../UI/Buttons/CtaButton";

const TrDteCntnr = styled.div`
    color: ${props => props.theme.secondaryColor};
    border: 1px solid ${props => props.theme.secondaryColor};
    position: relative;
    width: 40vw;
    margin-bottom: 1vw;

    @media only screen and (max-width: 426px){
        width: 90vw;
    };
`;

const NewDteAlrt = styled.div`
    display: flex;
    align-items: center;
    border-bottom: 1px solid ${props => props.theme.secondaryColor};
    font-size: 1.8rem;
`;

const NewDteAlrtIcn = styled.svg`
    width: 1.7vw;
    fill: red;
    margin: 0.3vw;

    @media only screen and (max-width: 769px){
        width: 2.4vw;
    };

    @media only screen and (max-width: 426px){
        width: 5vw;
        margin: 0.8vw;
    };
`;

const NewDteAlrtMsg = styled.span`
    font-size: 1.7vw;

    @media only screen and (max-width: 769px){
        font-size: 2.3vw;
    };

    @media only screen and (max-width: 426px){
        font-size: 5vw;
    };
`;

const TrDteCntnt = styled.div`
    padding: 0.5vw;
`;

const TrDteHdr = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const TrDteAccntInfo = styled.div`
    display: flex;
    align-items: center;
    width: 109rem;
`;

const TrDtePrfrmr = styled.p`
    font-size: 2.8vw;
    font-weight: 600;
    margin-left: 1vw;

    @media only screen and (max-width: 769px){
        font-size: 3vw;
    };

    @media only screen and (max-width: 426px){
        font-size: 7vw;
    };
`;

const TrDteLctn = styled.p`
    font-size: 2vw;

    @media only screen and (max-width: 426px){
        font-size: 4.5vw;
    };
`;

const TrDteTme = styled.div`
    display: flex;
    font-size: 1.7vw;

    @media only screen and (max-width: 426px){
        font-size: 4vw;
    };
`;

const Divider = styled.span`
    background: rgb(0,153,216);
    border-radius: 50%;
    padding: 0.4vw;
    margin: 0.4vw 0.3vw 0 0.3vw;
    align-self: center;

    @media only screen and (max-width: 426px){
        padding: 0.9vw;
        margin: 1.2vw 1vw 0 1vw;
    };
`;

const TourDate = props => {
    const weekLengthInMilliseconds = 1000*60*60*24*7;

    const tourAlert = new Date().getTime() - props.showSalesStart.getTime() < weekLengthInMilliseconds ? 
    <NewDteAlrt>
        <NewDteAlrtIcn x="0px" y="0px" viewBox="0 0 512 512">
            <path d="M256,0C115.2,0,0,115.2,0,256s115.2,256,256,256s256-115.2,256-256S396.8,0,256,0z M256,51.2
            c28.16,0,48.64,23.04,46.08,51.2L281.6,307.2h-51.2l-20.48-204.8C207.36,74.24,227.84,51.2,256,51.2z M256,460.8
            c-28.16,0-51.2-23.04-51.2-51.2c0-28.16,23.04-51.2,51.2-51.2s51.2,23.04,51.2,51.2C307.2,437.76,284.16,460.8,256,460.8z"/>
        </NewDteAlrtIcn>
        <NewDteAlrtMsg>
            New Date!
        </NewDteAlrtMsg>
    </NewDteAlrt> : null;
        

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    return (
        <TrDteCntnr>
            {tourAlert}
            <TrDteCntnt>
                <TrDteHdr>
                    <TrDteAccntInfo>
                        <AccountImage type="tourDate" img={props.accountImage}/>
                        <TrDtePrfrmr>{props.name}</TrDtePrfrmr>
                    </TrDteAccntInfo>
                    <CtaButton type="tourDate" link={props.showUrl}>Get Tickets!</CtaButton>
                </TrDteHdr>
                <TrDteLctn>{`${props.showCity}, ${props.showState} - ${props.showVenue}`}</TrDteLctn>
                <TrDteTme>
                    <p>{`${monthNames[props.showTime.getMonth()]} ${props.showTime.getDate() + 1}th`}</p>
                    <Divider/>
                    <p>{props.showTime.getFullYear()}</p>
                </TrDteTme>
                <TrDteTme>
                    <p>{dayNames[props.showTime.getDay()]}</p>
                    <Divider/>
                    <p>{props.showTime.toLocaleTimeString('en-US').replace(/:\d\d /, " ")}</p>
                </TrDteTme>
            </TrDteCntnt>
        </TrDteCntnr>
    );
};

export default TourDate;