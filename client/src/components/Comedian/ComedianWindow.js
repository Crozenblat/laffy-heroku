import React from "react";
import styled from "styled-components";

import {Link} from "react-router-dom";

import AccountImage from "../Account/AccountImage";
import Tag from "../UI/Buttons/Tag";

const Window = styled.div`
    border: 1px solid ${props => props.theme.secondaryColor};
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    width: 21vw;
    margin: 0.7rem;
    padding-bottom: 1vw;
    transition: all 0.3s;
    position: relative;

    &:hover{
        transform: translateY(-3px);
        box-shadow: 0 1rem 2rem rgba(0, 0, 0, .2);
    };

    @media only screen and (max-width: 426px){
        width: 36vw;
    };
`;

const PerformerName = styled.h3`
    font-size: 3vw;
    margin-bottom: 1rem;
    color: ${props => props.theme.secondaryColor};

    @media only screen and (max-width: 426px){
        font-size: 6.5vw;
    };
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
`;

const TgPosWrppr = styled.span`
    z-index: 1;
    cursor: pointer;
`;

const ProfileWindow = props => {

    let tags = props.tags.map((tag, index) => {
        return (<Tag key={`comedianWindow${index}`} tagName={tag}>{tag}</Tag>)
    });
    
    return (
        <Window>
            <StyledLink to={{pathname: `/comedian/${props.linkId}`}}/>
            <AccountImage type="comedianWindow" img={props.accountImage}/>
            <PerformerName>{props.name}</PerformerName>
            <TgPosWrppr>
                {tags}
            </TgPosWrppr>
        </Window>
    )
}

export default ProfileWindow;