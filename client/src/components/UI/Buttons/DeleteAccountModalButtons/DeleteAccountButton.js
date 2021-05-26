import React from "react";
import styled from "styled-components";

const DltAccntMdlBtn = styled.button`
    background: rgba(255,0,0,.8);
    transition: all .4s;
    color: black;
    border: solid 1px red;
    border-radius: 5px;
    font-size: 3vw;
    padding: 0.4vw;

    &:hover{
        cursor: pointer;
        background: red;
        color: black
    }

    @media only screen and (max-width: 426px){
        font-size: 7vw;
    };
`;

const DeleteAccountModalButton = props => {
    return <DltAccntMdlBtn onClick={props.click}>{props.children}</DltAccntMdlBtn>
};

export default DeleteAccountModalButton;