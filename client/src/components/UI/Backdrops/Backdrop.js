import React from "react";
import styled from "styled-components";

const Bckdrp = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: block;
    z-index: 2;
    background: black;

    &.fade-enter {
        opacity: 0;
    };

    &.fade-enter-active {
        opacity: 0.9;
        transition: all 300ms;
    };

    &.fade-enter-done {
        opacity: 0.9;
    };

    &.fade-exit {
        opacity: 0.9;
    };
    
    &.fade-exit-active {
        opacity: 0;
        transition: all 300ms;
    };
`;

const Backdrop = props => {

    return (
        <Bckdrp onClick={props.click}>{props.children}</Bckdrp>
    );
};

export default Backdrop;