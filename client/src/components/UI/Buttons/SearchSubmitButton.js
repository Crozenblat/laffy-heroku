import React from "react";
import styled from "styled-components";

import searchIcon from "../../../assets/magnifying-glass.svg";

const SrchSbmtBtn = styled.input.attrs(props => ({
    type: "submit"
}))`
    background-image: ${props => `url(${props.icon})`};
    background-size: 1.7vw;
    background-position: center;
    background-color: transparent;
    border: none;
    background-repeat: no-repeat;
    width: 1.7vw;
    height: 1.7vw;

    @media only screen and (max-width: 426px){
        background-size: 5.6vw;
        width: 5.7vw;
        height: 5.7vw;
    }
`;

const SearchSubmitButton = props => {
    return <SrchSbmtBtn onClick={props.click} icon={searchIcon} value=""/>
};

export default SearchSubmitButton;