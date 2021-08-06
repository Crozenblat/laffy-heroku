import React, {useState, useRef, Fragment, useEffect} from "react";
import styled from "styled-components";
import {useSelector} from "react-redux";

import Banner from "../components/Banner/Banner";
import hompageBannerImage from "../assets/homePage-banner-img.jpg";
import CtaButton from "../components/UI/Buttons/CtaButton";

import LogInInvite from "../components/Messages/LogInInvite";

import SectionHeading from "../components/Section/SectionHeading";

import RecentlyViewed from "../containers/RecentlyViewed/RecentlyViewed";

import TourFeed from "../containers/TourFeed/TourFeed";

import Trending from "../containers/Trending/Trending";

import FeaturedSpecials from "../containers/FeaturedSpecials/FeaturedSpecials";


const BnnrBtnPosWrppr = styled.span`
    margin-left: 6vw;
`;

const TourDatePosWrppr = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const TrendingTabPosWrppr = styled.span`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 80vw;
    right: 2vw;

    @media only screen and (max-width: 1024px){
        top: 90vw;
    };

    @media only screen and (max-width: 768px){
        position: relative;
        top: 0;
        right: 0;
    };
`;

const HomePage = props => {
    const trendingRef = useRef(null);
    const username = useSelector(state => state.authorization.username);
    const [hasTourDates, setHasTourDates] = useState(null);

    useEffect(() => {
        if((!hasTourDates)){
            trendingRef.current.style.position = "relative";
            trendingRef.current.style.top = 0;
            trendingRef.current.style.right = 0;
        }else{
            trendingRef.current.removeAttribute("style");
        };        
    }, [hasTourDates]);

    return (
        <Fragment>
            <Banner 
                type="homePage"
                backgroundImg={`url(${hompageBannerImage})`}
                heading="Laff it up!"
                subheading="Laffy is a platform that allows you to keep tabs on the comedians you love and discover new favorites. Get started now!">
                <BnnrBtnPosWrppr>
                    <CtaButton type="banner" to="/explore">Explore</CtaButton>
                </BnnrBtnPosWrppr>
            </Banner>
            <SectionHeading textAlign="center" type="subsection">{`${username ? username + "'s" : ""} recently viewed`}</SectionHeading>
                {username ? <RecentlyViewed/> : <LogInInvite>You must be logged in to view recently viewed comedians. Sign up now!</LogInInvite>}
            <SectionHeading textAlign="center" type="subsection">Shows coming near you</SectionHeading>
                <TourDatePosWrppr>
                    <TourFeed type="homepage" onLoad={() => setHasTourDates(true)}/>
                </TourDatePosWrppr>
            <TrendingTabPosWrppr ref={trendingRef}>
                    <SectionHeading textAlign="center" type="subsection">Trending</SectionHeading>
                    <Trending isSidebar={hasTourDates}/>
            </TrendingTabPosWrppr>
            <SectionHeading textAlign="center" type="subsection">Featured Specials</SectionHeading>
            <FeaturedSpecials/>
        </Fragment>
    );
};

export default HomePage;