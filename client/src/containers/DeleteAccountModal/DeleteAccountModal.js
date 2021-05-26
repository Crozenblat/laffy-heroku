import React, {Fragment, useState, useRef} from "react";
import styled from "styled-components";
import {CSSTransition} from "react-transition-group";
import {useHistory} from "react-router-dom";
import axios from "axios";

import Backdrop from "../../components/UI/Backdrops/Backdrop";
import DeleteAccountModalButton from "../../components/UI/Buttons/DeleteAccountModalButtons/DeleteAccountButton";
import CancelDeleteAccountButton from "../../components/UI/Buttons/DeleteAccountModalButtons/CancelDeleteAccountButton";
import LoadingIcon from "../../components/LoadingIcon/LoadingIcon";

import ConfirmationMessage from "../../components/Messages/ConfirmationMessage";
import ErrorMessage from "../../components/Messages/ErrorMessage";

import useDetectOutsideClick from "../../hooks/useDetectOutsideClick";

import {useSelector, useDispatch} from "react-redux";
import {authLogoutUser} from "../../store/features/authorizationSlice";
import {makeDeleteAccountModalInvisible} from "../../store/features/componentVisibilitySlice";

const DltAccntMdl = styled.div`
    position: fixed;
    top: 12vw;
    left: 26vw;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: ${props => props.theme.secondaryColor};
    background: rgb(20, 20, 20);
    width: 50vw;
    height: 23vw;

    @media only screen and (max-width: 1024px){
        height: 28vw;
    };

    @media only screen and (max-width: 768px){
        top: 19vw;
    };

    @media only screen and (max-width: 426px){
        left: 8vw;
        width: 85vw;
        height: 57vw;
    };

    &.slideUpAndFade-enter {
        opacity: 0;
        transform: scale(0.9);
    };

    &.slideUpAndFade-enter-active {
        opacity: 1;
        transform: translateX(0);
        transition: all 300ms;
    };

    &.slideUpAndFade-exit {
        opacity: 1;
    };
    
    &.slideUpAndFade-exit-active {
        opacity: 0;
        transform: scale(0.9);
        transition: all 300ms;
    };
`;

const DltAccntMdlHdng = styled.h1`
    font-size: 5vw;

    @media only screen and (max-width: 426px){
        font-size: 10vw;
    };
`;

const DltAccntMdlMsg = styled.p`
    font-size: 2vw;
    text-align: center;

    @media only screen and (max-width: 426px){
        font-size: 5vw;
    };
`;

const DltAccntBtnPosWrppr = styled.div`
    display: flex;
    justify-content: space-around;
    width: 60%;
    margin-top: 4vw;

    @media only screen and (max-width: 426px){
        width: 80%;
    };
`;

const DeleteAccountModal = props => {
    const deleteAccountModalActive = useSelector(state => state.componentVisibility.deleteAccountModalVisible);
    const dispatch = useDispatch();
    const history = useHistory();

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const DeleteAccountModalRef = useRef();

    useDetectOutsideClick(DeleteAccountModalRef, () => enableScrolling());

    function enableScrolling() {
        document.body.style.overflow = "";
    }

    const deleteAccountHandler = async () => {
        try{
            setLoading(true);
            await axios.delete("/user", {withCredentials: true});
            await axios.get("/logout", {withCredentials: true});
            setMessage(<ConfirmationMessage>Account deleted successfully!</ConfirmationMessage>);
            setLoading(false);
            enableScrolling();
            setTimeout(() => {
                dispatch(authLogoutUser());
                history.push("/");
                dispatch(makeDeleteAccountModalInvisible());
            }, 2500);
        }catch(err){
            console.log(err);
            setLoading(false);
            setMessage(<ErrorMessage type="deleteAccountError">Something went wrong!</ErrorMessage>)
            setTimeout(() => {
                dispatch(makeDeleteAccountModalInvisible());
            }, 2500);
        };
    };

    let content = loading ? <LoadingIcon/> : message ? message : <Fragment>
                                                                    <DltAccntMdlHdng>Delete Account?</DltAccntMdlHdng>
                                                                    <DltAccntMdlMsg>Are you sure you want to delete your account? There is no way to reverse this action.</DltAccntMdlMsg>
                                                                    <DltAccntBtnPosWrppr>
                                                                        <DeleteAccountModalButton click={deleteAccountHandler}>Delete</DeleteAccountModalButton>
                                                                        <CancelDeleteAccountButton click={() => {
                                                                            dispatch(makeDeleteAccountModalInvisible());
                                                                            enableScrolling();
                                                                        }}>Cancel</CancelDeleteAccountButton>
                                                                    </DltAccntBtnPosWrppr>
                                                                 </Fragment>

    return(
        <Fragment>
            <CSSTransition
            in={deleteAccountModalActive}
            timeout={300}
            classNames="fade"
            unmountOnExit>
                <Backdrop active={deleteAccountModalActive} click={() => dispatch(makeDeleteAccountModalInvisible())}/>
            </CSSTransition>
            <CSSTransition
                in={deleteAccountModalActive}
                timeout={300}
                classNames="slideUpAndFade"
                unmountOnExit
                onExited={() => setMessage(null)}
                >
                    <DltAccntMdl ref={DeleteAccountModalRef}>
                        {content}
                    </DltAccntMdl>
            </CSSTransition>
        </Fragment>
    );
};

export default DeleteAccountModal;