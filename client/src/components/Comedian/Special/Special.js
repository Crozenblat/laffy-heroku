import React, {useState, useEffect} from "react";
import styled from "styled-components";

const SpclPosWrppr = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    @media only screen and (max-width: 769px){
        height: 23vw;
    };

    @media only screen and (max-width: 426px){
        height: 33vw;
    }; 

    @media only screen and (max-width: 376px){
        height: 41vw;
    }; 
`;

const Spcl = styled.div`
    background-image: url(${props => props.backgroundImage});
    background-size: cover;
    background-position: center;
    border: 1px solid ${props => props.theme.secondaryColor};
    height: 18vw;
    width: 12vw;
    margin: 1vw;

    @media only screen and (max-width: 426px){
        height: 26vw;
        width: 17vw;
    };

    @media only screen and (max-width: 376px){
        height: 34vw;
        width: 24vw;
    };
`;

const SpclIndctr = styled.svg`
    width: 2vw;
    fill: ${props => props.theme.secondaryColor};
    visibility: ${props => props.active ? "visible" : "hidden"};

    @media only screen and (max-width: 769px){
        width: 3vw;
    };

    @media only screen and (max-width: 426px){
        width: 5vw;
    };
`;

const Special = props => {

    const [active, setActive] = useState(false);

    useEffect(() => {
        if(props.type === "catalogue"){
            setActive(props.selectedSpecial.specialTitle === props.special.specialTitle);
        };
    }, [props.selectedSpecial, props.special.specialTitle, props.type]);

    const handleClick = () => {
        let newSpecial;
        if(props.selectedSpecial.specialTitle === props.special.specialTitle){
            newSpecial = {};
            props.setOpen(false);
        }else{
            newSpecial = props.special;
            props.setOpen(true);
        };
        props.setSpecial(newSpecial);
    };

    return (
        <SpclPosWrppr>
            <Spcl type={props.type} backgroundImage={props.special.specialCover} onClick={handleClick}/>
            <SpclIndctr active={active} x="0px" y="0px" viewBox="0 0 292.362 292.361">
                <path d="M286.935,197.287L159.028,69.381c-3.613-3.617-7.895-5.424-12.847-5.424s-9.233,1.807-12.85,5.424L5.424,197.287
                C1.807,200.904,0,205.186,0,210.134s1.807,9.233,5.424,12.847c3.621,3.617,7.902,5.425,12.85,5.425h255.813
                c4.949,0,9.233-1.808,12.848-5.425c3.613-3.613,5.427-7.898,5.427-12.847S290.548,200.904,286.935,197.287z"/>
            </SpclIndctr>
        </SpclPosWrppr>
    )
};

export default Special;