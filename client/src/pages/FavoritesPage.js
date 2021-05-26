import React from "react";
import {useSelector} from "react-redux";
import styled from "styled-components";

import Favorites from "../containers/Favorites/Favorites";

import SectionHeading from "../components/Section/SectionHeading";

import LogInInvite from "../components/Messages/LogInInvite";

import useMediaQuery from "../hooks/useMediaQuery";

const FvrtsPosWrppr = styled.div`
    width: 97%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;

    @media only screen and (max-width: 426px){
        align-items: center;
    };
`;

const FavoritesPage = props => {
    const username = useSelector(state => state.authorization.username);
    const [screenWidth] = useMediaQuery();

    return (
        <FvrtsPosWrppr>
            <SectionHeading textAlign={screenWidth <= 426 ? "center" : "start"} type="subsection">{`${username ? username + "'s" : ""} favorite comedians`}</SectionHeading>
            {username ? <Favorites/> : <LogInInvite>You must be logged in to view recently viewed comedians. Sign up now!</LogInInvite>}
        </FvrtsPosWrppr>
    )
};

export default FavoritesPage;