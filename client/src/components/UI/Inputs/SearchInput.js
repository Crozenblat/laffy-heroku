import React from "react";
import styled from "styled-components";

const SrchInput = styled.input`
    height: 2vw;
    width: 10vw;
    font-size: 1.5vw;
    border: solid 1px transparent;
    border-radius: 2rem;
    padding-left: 0.7vw;

    &:focus{
        outline: none;
    };

    @media only screen and (max-width: 426px){
        height: 7vw;
        width: 30vw;
        margin-right: 1vw;
        font-size: 4vw;
        padding-left: 2vw;
    };
`;

const SearchInput = props => {
    return <SrchInput type="text" placeholder="Search..." value={props.value} onChange={props.onchange}></SrchInput>
};

export default SearchInput;