import React, {useRef} from "react";
import styled from "styled-components";

import AccountNavMenu from "../Account/AccountNavMenu";
import NavigationItem from "./NavigationItem";

const SdeDrwr = styled.div`
    display: flex;
    flex-direction: column;
    padding: 3vw 0 0 1.5vw;
    background: ${props => props.theme.primaryColor};
    position: absolute;
    top: 13vw;
    height: 100vh;
    width: 48vw;

    &.slide-enter{
        transform: translateX(-100%);
    };

    &.slide-enter-active{
        transform: translateX(0);
        transition: all 300ms;
    };

    &.slide-exit{
        transform: translateX(0);
    };

    &.slide-exit-active{
        transform: translateX(-100%);
        transition: all 300ms;
    };
`;

const SideDrawer = props => {
    const sideDrawerRef = useRef(null);
    
    return(
        <SdeDrwr sideDrawerOpen={props.sideDrawerOpen} ref={sideDrawerRef}>
            <NavigationItem to="/" exact click={(props.click)}>Home</NavigationItem>
            <NavigationItem to="/favorites" click={props.click}>Favorites</NavigationItem>
            <NavigationItem to="/explore" click={props.click}>Explore</NavigationItem>
            <AccountNavMenu click={props.click}/>
        </SdeDrwr>
    );
};

export default SideDrawer