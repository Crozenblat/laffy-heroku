import React from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";

import AccountImage from "../Account/AccountImage";

const TrndngTab = styled.div`
    background: ${props => props.theme.secondaryColor};
    color: ${props => props.theme.primaryColor};
    font-weight: 500;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: ${props => props.trendingIsSidebar ? "25vw" : "51vw"};
    border: solid 1px ${props => props.theme.primaryColor};

    @media only screen and (max-width: 426px){
        width: 90vw;
    };
`;

const TrndngComedianWrapper = styled.span`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const TrndngComedianName = styled.span`
    font-size: ${props => props.trendingIsSidebar ? "1.9vw" : "3.5vw"};
    margin-left: 0.5rem;

    @media only screen and (max-width: 426px){
        font-size: 7vw;
    };
`;

const TrndngMetricsWrapper = styled.span`
    display: flex;
    flex-direction: column;
`;

const TrndngMetricWrapper = styled.span`
    display: flex;
    align-items: center;
`;

const MetricIcon = styled.svg`
    width: ${props => props.trendingIsSidebar ? "2vw" : "3vw"};

    @media only screen and (max-width: 426px){
        width: 7vw;
    };
`;

const MetricStat = styled.span`
    font-size: 2vw;
    margin-left: 0.5rem;
    margin-top: -0.3rem;

    @media only screen and (max-width: 426px){
        font-size: 5vw;
    };
`;

const StyledLink = styled(Link)`
    text-decoration: none;
`

const TrendingTab = props => {
    return (
        <StyledLink to={`/comedians/${props.linkId}`}>
            <TrndngTab trendingIsSidebar={props.isSidebar}>
                    <TrndngComedianWrapper>
                        <AccountImage type="trendingTab" trendingIsSidebar={props.isSidebar} img={props.comedianAccountImage}/>
                        <TrndngComedianName trendingIsSidebar={props.isSidebar}>{props.children}</TrndngComedianName>
                    </TrndngComedianWrapper>
                    <TrndngMetricsWrapper>
                        <TrndngMetricWrapper>
                            <MetricIcon trendingIsSidebar={props.isSidebar} x="0px" y="0px" viewBox="0 0 511.999 511.999">
                                <path d="M508.745,246.041c-4.574-6.257-113.557-153.206-252.748-153.206S7.818,239.784,3.249,246.035
                                c-4.332,5.936-4.332,13.987,0,19.923c4.569,6.257,113.557,153.206,252.748,153.206s248.174-146.95,252.748-153.201
                                C513.083,260.028,513.083,251.971,508.745,246.041z M255.997,385.406c-102.529,0-191.33-97.533-217.617-129.418
                                c26.253-31.913,114.868-129.395,217.617-129.395c102.524,0,191.319,97.516,217.617,129.418
                                C447.361,287.923,358.746,385.406,255.997,385.406z"/>
                                <path d="M255.997,154.725c-55.842,0-101.275,45.433-101.275,101.275s45.433,101.275,101.275,101.275
                                s101.275-45.433,101.275-101.275S311.839,154.725,255.997,154.725z M255.997,323.516c-37.23,0-67.516-30.287-67.516-67.516
                                s30.287-67.516,67.516-67.516s67.516,30.287,67.516,67.516S293.227,323.516,255.997,323.516z"/>
                            </MetricIcon>
                            <MetricStat trendingIsSidebar={props.isSidebar}>{props.comedianViews}</MetricStat>
                        </TrndngMetricWrapper>
                        <TrndngMetricWrapper>
                            <MetricIcon trendingIsSidebar={props.isSidebar} viewBox="-60 0 600 512">
                                <path fill="transparent" stroke="black" strokeWidth="40" d="m246.122 477.289c-144.417-126.367-246.122-193.304-246.122-299.774 0-80.513 57.4-146.515 136-146.515 54.544 0 95.017 33.497 120 81.015 24.981-47.515 65.454-81.015 120-81.015 78.609 0 136 66.015 136 146.515 0 106.457-101.572 173.291-246.122 299.773-5.657 4.949-14.1 4.949-19.756.001z"/>
                            </MetricIcon>
                            <MetricStat trendingIsSidebar={props.isSidebar}>{props.comedianFavoritesReceived}</MetricStat>
                        </TrndngMetricWrapper>
                    </TrndngMetricsWrapper>
            </TrndngTab>
        </StyledLink>
    )
}

export default TrendingTab;