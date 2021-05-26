import React, {Fragment, useState} from "react";
import styled from "styled-components";
import {CSSTransition} from "react-transition-group";

import SideDrawerToggleButton from "../UI/Buttons/SideDrawerToggleButton";
import SideDrawer from "./SideDrawer";
import NavigationItem from "./NavigationItem";
import AccountNavMenu from "../Account/AccountNavMenu";
import SearchForm from "../../containers/SearchForm/SearchForm";

import useMediaQuery from "../../hooks/useMediaQuery";
import Backdrop from "../UI/Backdrops/Backdrop";

const NavLinkGroup = styled.div`
    display: flex;
    height: 100%;
    justify-content: space-around;
    width: 41vw;

    @media only screen and (max-width: 426px){
        width: 76vw;
    };
`;

const NavigationItms = styled.nav`
    background: ${props => props.theme.primaryColor};
    width: 100%;
    height: 4vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    z-index: 2;

    @media only screen and (max-width: 426px){
        height: 14vw;
    };
`;

const SideDrwrTgglBtnPosWrppr = styled.div`
    margin-left: 1rem;
`;

const NavigationItems = props => {
    const [screenWidth] = useMediaQuery();
    const [sideDrawerOpen, setSideDrawerOpen] = useState(false);

    let navLinks = screenWidth > 449 ? <Fragment>
                                            <NavLinkGroup>
                                                <NavigationItem to="/" exact>Home</NavigationItem>
                                                <NavigationItem to="/favorites">Favorites</NavigationItem>
                                                <NavigationItem to="/explore">Explore</NavigationItem>
                                            </NavLinkGroup> 
                                            <NavLinkGroup>
                                                <AccountNavMenu click={() => setSideDrawerOpen(false)}/>
                                                <SearchForm/>
                                            </NavLinkGroup>
                                       </Fragment> :
                                       <Fragment>
                                            <SideDrwrTgglBtnPosWrppr>
                                                <SideDrawerToggleButton active={sideDrawerOpen} click={() => {setSideDrawerOpen(!sideDrawerOpen)}}/>
                                            </SideDrwrTgglBtnPosWrppr>
                                            <SearchForm/>
                                       </Fragment>

    return (
        <Fragment>
            <CSSTransition in={sideDrawerOpen} classNames="fade" timeout={300} unmountOnExit>
                <Backdrop click={() => setSideDrawerOpen(false)}/>
            </CSSTransition>
            <NavigationItms>
                {navLinks}
                <CSSTransition in={sideDrawerOpen} classNames="slide" timeout={300} unmountOnExit>
                    <SideDrawer sideDrawerOpen={sideDrawerOpen} click={() => setSideDrawerOpen(false)}/>
                </CSSTransition>
            </NavigationItms>
        </Fragment>
        
    );
}

export default NavigationItems;