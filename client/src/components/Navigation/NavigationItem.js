import React from "react";
import styled from "styled-components";

import {NavLink} from "react-router-dom";

const activeClassName = 'nav-item-active';

const NavigationItm = styled(NavLink).attrs({
    activeClassName
})`
    color: white;
    text-decoration: none;
    font-size: 2.5vw;

    &:hover,
    &:active,
    &.${activeClassName} {
        color: ${props => props.theme.secondaryColor};
    }

    @media only screen and (max-width: 426px){
        font-size: 8.5vw;
    };
`;

const NavigationItem = props => {

    return (
        <NavigationItm to={props.to} exact={props.exact} onClick={props.click}>{props.children}</NavigationItm>
    )
}

export default NavigationItem;