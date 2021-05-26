import React, { Fragment } from "react";
import {useSelector} from "react-redux";
import styled from "styled-components";

import SectionHeading from "../components/Section/SectionHeading";

import TopComedians from "../containers/TopComedians/TopComedians";
import Recommended from "../containers/Recommended/Recommended";
import LogInInvite from "../components/Messages/LogInInvite";

import useMediaQuery from "../hooks/useMediaQuery";

const ExplrPosWrppr = styled.div`
    width: 97%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;

    @media only screen and (max-width: 426px){
        align-items: center;
    };
`;

const ExplorePage = props => {
    const username = useSelector(state => state.authorization.username);
    const [screenWidth] = useMediaQuery();

    return (
        <Fragment>
            <ExplrPosWrppr>
                <SectionHeading textAlign={screenWidth <= 426 ? "center" : "start"} type="subsection">{`Recommended ${username ? "for " + username : ""}`}</SectionHeading>
                {username ? <Recommended/> : <LogInInvite>You must be logged in to view recently viewed comedians. Sign up now!</LogInInvite>}
            </ExplrPosWrppr>
            <ExplrPosWrppr>
                <SectionHeading textAlign={screenWidth <= 426 ? "center" : "start"} type="subsection">Most popular</SectionHeading>
                <TopComedians/>                
            </ExplrPosWrppr>
        </Fragment>
    )
}

export default ExplorePage;