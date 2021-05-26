import React from "react";
import styled from "styled-components";
import {useSelector} from "react-redux";

import FavoriteButton from "../UI/Buttons/FavoriteButton";
import ShareButton from "../UI/Buttons/ShareButtons/ShareButton";

const OptnBr = styled.div`
    display: flex;
    align-items: center;
    height: 4vw;
    width: 100%;
    background: ${props => props.theme.menuColor};
    backdrop-filter: ${props => props.theme.menuBlur};

    @media only screen and (max-width: 1025px){
        height: 6vw;        
    };

    @media only screen and (max-width: 769px){
        height: 7vw;        
    };

    @media only screen and (max-width: 426px){
        height: 10vw;
    };

    @media only screen and (max-width: 376px){
        height: 12vw;
    };

    @media only screen and (max-width: 321px){
        height: 15vw;
    };
`;

const BtnPosWrppr = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 19vw;
    margin-left: 13vw;

    @media only screen and (max-width: 2071px){
        width: 22vw;
    };

    @media only screen and (max-width: 1441px){
        width: 23vw;
    };

    @media only screen and (max-width: 1025px){
        width: 29vw;
    };

    @media only screen and (max-width: 769px){
        width: 44vw;
    };

    @media only screen and (max-width: 426px){
        width: 24vw;
    };

    @media only screen and (max-width: 376px){
        width: 28vw;
    };

    @media only screen and (max-width: 321px){
        width: 34vw;
    };
`;

const OptionsBar = props => {
    const userId = useSelector(state => state.authorization.userId);

    let favoriteButton = userId ? <FavoriteButton favoriteButtonClick={props.favoriteButtonClick} favorited={props.favorited}/> : null;

    return (
        <OptnBr>
            <BtnPosWrppr>
                <ShareButton shareBtnActive={props.shareBtnActive} click={props.shareButtonClick}/>
                {favoriteButton}
            </BtnPosWrppr>
        </OptnBr>
    )
};

export default OptionsBar;