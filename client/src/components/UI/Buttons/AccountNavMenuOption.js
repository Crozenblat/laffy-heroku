import React from "react";
import styled from "styled-components";

import {Link} from "react-router-dom";

const AccntNavMenuOptn= styled(Link)`
    background: ${props => props.theme.menuColor};
    backdrop-filter: ${props => props.theme.menuBlur};
    text-decoration: none;
    color: white;
    font-size: 2vw;
    display: flex;
    justify-content: center;
    padding: 0 0.2vw 0.2vw 0.2vw;

    &:not(:last-child){
        border-bottom: solid 1px grey;
    }

    &:hover{
        color: ${props => props.theme.secondaryColor};
    }

    @media only screen and (max-width: 426px){
        font-size: 6vw;
        padding: 0 0.2vw 1vw 0.2vw;
    };
`;

const AccountNavMenuOption = props => {
    return(
        <AccntNavMenuOptn to={props.to} onClick={props.click}>{props.children}</AccntNavMenuOptn>
    );
};

export default AccountNavMenuOption;