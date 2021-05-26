import React, {useRef, useEffect} from "react";
import styled from "styled-components";

const CmmntInptUndrln = styled.span`
    display: inline-block;
    background: ${props => props.theme.secondaryColor};
    width: 0px;
    height: 0.4rem;
    transition: all 0.3s ease-out;
    position: absolute;
    left: 0;
    bottom: -7px;

    @media only screen and (max-width: 1440px){
        bottom: -8px;
    };
`;

const CmmntInpt = styled.textarea`
    background: transparent;
    overflow-y: hidden;
    border: none;
    border-bottom: 3px solid grey;
    color: white;
    width: 100%;
    padding: 0.5rem;
    outline: none;
    font-size: 2vw;
    margin-bottom: -1rem;
    
    &[placeholder]:empty:before {
        content: attr(placeholder);
        color: ${props => props.theme.secondaryColor};
    }
    
    &[placeholder]:empty:focus:before {
        content: "";
    }

    &:focus + ${CmmntInptUndrln}{
        width: 100%;
    };

    @media only screen and (max-width: 426px){
        font-size: 3vw;
    };

    @media only screen and (max-width: 426px){
        font-size: 5vw;
        width: 80vw;
    };
`;

const CmmntInptCntnr = styled.div`
    position: relative;
    width: 100%;
`;

const CommentInput = props => {
    const textAreaRef = useRef();

    useEffect(() => {
        textAreaRef.current.style.height = "0px";
        const scrollHeight = textAreaRef.current.scrollHeight;
        textAreaRef.current.style.height = scrollHeight + "px";
    }, [props.value]);

    return(
        <CmmntInptCntnr>
            <CmmntInpt ref={textAreaRef} value={props.value} placeholder={props.placeholder} onChange={props.keyPress}/>
            <CmmntInptUndrln/>
        </CmmntInptCntnr>
    );
}

export default CommentInput;