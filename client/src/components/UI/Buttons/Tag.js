import React from "react";
import styled from "styled-components";

import {Link} from "react-router-dom";

const TgLnk = styled(Link)`

`;

const TgBtn = styled.button`
    background: ${props => props.theme.secondaryColor};
    text-decoration: none;
    color: ${props => props.theme.primaryColor};
    border: none;
    border-radius: 10px;
    margin: 0.3rem;
    padding: 3px 15px;
    font-size: 1.3vw;
    transition: 0.3s;
    outline: none;

    &:hover{
        background: white;
        color: ${props => props.theme.secondaryColor};
        cursor: pointer;
    }

    @media only screen and (max-width: 1024px){
        font-size: 2vw;
    }

    @media only screen and (max-width: 426px){
        font-size: 3vw;
    }
`;

const Tag = props => {
    return (
        <TgLnk to={{pathname:"/search", search:`?search-term=${props.tagName}`}}>
            <TgBtn>{props.children}</TgBtn>
        </TgLnk>
    )
};

export default Tag;