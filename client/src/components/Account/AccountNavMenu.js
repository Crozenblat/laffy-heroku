import React, {useRef, useState} from "react";
import styled from "styled-components";
import axios from "axios";
import {Link, useHistory} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {authLogoutUser} from "../../store/features/authorizationSlice";
import {makeDeleteAccountModalVisible} from "../../store/features/componentVisibilitySlice";

import useDetectOutsideClick from "../../hooks/useDetectOutsideClick";

import AccountNavMenuOption from "../UI/Buttons/AccountNavMenuOption";

const AccntNavMenuLabel = styled.p`
    color: white;
    font-size: 2.5vw;

    @media only screen and (max-width: 426px){
        margin: 0 2vw 0 0;
        font-size: 7.2vw;
    };
`;

const AccntLoginLink = styled(Link)`
    color: white;
    font-size: 2.5vw;
    text-decoration: none;

    &:hover{
        color: ${props => props.theme.secondaryColor}
    }

    @media only screen and (max-width: 426px){
        font-size: 8.5vw;
    };
`;

const AccntNavMenuArrow = styled.svg`
    fill: ${props => props.isOpen ? props.theme.secondaryColor : "white"};
    width: 1.3vw;
    margin-top: 0.7vw;
    margin-right: 0.8vw;

    @media only screen and (max-width: 426px){
        width: 4.3vw;
        margin-top: 1.7vw;
        margin-right: 2vw;
    };
`;

const AccntNavMenuContainer = styled.div`
    &:hover{
        cursor: pointer;
    }
`;

const AccntNavMenuHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:hover{
        ${AccntNavMenuArrow}{
            fill: ${props => props.theme.secondaryColor};
        }
    }
`;

const AccntNavMenuSelect = styled.div`
    display: flex;
    flex-direction: column;
    height: ${props => props.isOpen ? "11vw" : 0};
    overflow: hidden;
    margin-top: 0.7vw;
    transition: all 0.2s;

    @media only screen and (max-width: 426px){
        height: ${props => props.isOpen ? "30vw" : 0};
        width: 48vw;
        margin-left: -1.5vw;
    };
`;

const AccountNavMenu = props => {
    const [open, setOpen] = useState(false);
    const AccountMenuRef = useRef(null);
    const dispatch = useDispatch();
    const history = useHistory();
    
    useDetectOutsideClick(AccountMenuRef, () => setOpen(false));
    
    const username =  useSelector(state => state.authorization.username);

    const logout = () => {
        dispatch(authLogoutUser());
        axios.get("/logout", {withCredentials: true});
        history.push("/");
    };

    const disableScrolling = () => {
        document.body.style.overflow = "hidden";
    };

    let menuLabel = username ? <AccntNavMenuLabel>My Account</AccntNavMenuLabel> : <AccntLoginLink to="/login" onClick={props.click}>Login</AccntLoginLink>
;
    let accountMenuArrow = username ? <AccntNavMenuArrow isOpen={open} x="0px" y="0px" viewBox="0 0 490.667 490.667">
        <g>
            <path d="M484.075,22.146c-3.989-1.664-8.576-0.725-11.627,2.304L245.333,251.586L18.219,24.472
            c-3.051-3.051-7.68-3.968-11.627-2.325C2.603,23.789,0,27.693,0,32.002v192c0,2.837,1.131,5.547,3.115,7.552l234.667,234.667
            c2.091,2.069,4.821,3.115,7.552,3.115s5.461-1.045,7.552-3.115l234.667-234.667c1.984-2.005,3.115-4.715,3.115-7.552v-192
            C490.667,27.693,488.064,23.789,484.075,22.146z"/>
        </g>
        </AccntNavMenuArrow> : null;
        
    let accountMenuSelect = username ? <AccntNavMenuSelect isOpen={open} onClick={() => setOpen(!open)}>
        <AccountNavMenuOption to="/change-password" click={() => {
            if(props.click){
                props.click(); 
            };
        }}>Change Password</AccountNavMenuOption>
        <AccountNavMenuOption click={() => {
            if(props.click){
                props.click(); 
            };

            logout();
        }}>Logout</AccountNavMenuOption>
        <AccountNavMenuOption click={() => {
            if(props.click){
                props.click(); 
            };

            disableScrolling();
            dispatch(makeDeleteAccountModalVisible());
        }}>Delete Account</AccountNavMenuOption>
    </AccntNavMenuSelect> : null;

    return (
        <AccntNavMenuContainer ref={AccountMenuRef}>
            <AccntNavMenuHeader onClick={() => setOpen(!open)}>
                {menuLabel}
                {accountMenuArrow}
            </AccntNavMenuHeader>
            {accountMenuSelect}
        </AccntNavMenuContainer>
    );
};

export default AccountNavMenu;