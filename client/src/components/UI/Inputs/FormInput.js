import React from "react";
import styled from "styled-components";

const FrmInptUndrln = styled.span`
    display: inline-block;
    width: ${props => props.touched ? "98%" : "0"};
    background: ${props => props.valid ? "green" : "red"};
    height: 0.3vw;
    margin-left: 0.6rem;
    transition: all 0.2s;

    @media only screen and (max-width: 1025px){
        width: ${props => props.touched ? "96%" : "0"};
        transition: all 0.2s;
    };

    @media only screen and (max-width: 426px){
        width: ${props => props.touched ? "95%" : "0"};
        height: 0.6vw;
    }
`;

const FrmInptInfo = styled.p`
    color: red;
    display: flex;
    font-size: 1.3vw;
    margin-left: 0.7rem;

    @media only screen and (max-width: 1024px){
        font-size: 1.5vw;
    };

    @media only screen and (max-width: 769px){
        font-size: 2vw;
    };

    @media only screen and (max-width: 426px){
        font-size: 4vw;
    };
`;

const FrmInpt = styled.input`
    font-size: 1.6vw;
    border-radius: 10px;

    @media only screen and (max-width: 1025px){
        font-size: 2.1vw;
    };

    @media only screen and (max-width: 769px){
        font-size: 2.1vw;
    };

    @media only screen and (max-width: 426px){
        font-size: 2rem;
    };
`;

const FrmLbl = styled.label`
    font-size: 2vw;

    @media only screen and (max-width: 1024px){
        font-size: 3vw;
    };

    @media only screen and (max-width: 426px){
        font-size: 2.8rem;
    };

    @media only screen and (max-width: 321px){
        font-size: 2.3rem;
    };
`;

const FrmInptCntnr = styled.div`
    display: flex;
    flex-direction: column;
    width: 27vw;

    @media only screen and (max-width: 1025px){
        width: 31vw;
    };

    @media only screen and (max-width: 769px){
        width: 41vw;
    };

    @media only screen and (max-width: 426px){
        width: 85vw;
    };
`;

const FormInput = props => {

    return(
        <FrmInptCntnr>
            <FrmLbl htmlFor={props.id}>{props.children}</FrmLbl>
            <FrmInpt type={props.type} placeholder={props.placeholder} value={props.value} onChange={props.onchange}/>
            <FrmInptUndrln touched={props.touched} valid={props.isValid}/>
            <FrmInptInfo>
                <span>{props.errMsg ? "*" : null}</span>
                <span>{props.errMsg}</span>
            </FrmInptInfo>
        </FrmInptCntnr>
    );
};

export default FormInput;