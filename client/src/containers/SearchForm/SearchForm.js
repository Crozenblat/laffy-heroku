import React, {useState} from "react";
import styled from "styled-components";
import {useHistory} from "react-router-dom";

import SearchInput from "../../components/UI/Inputs/SearchInput";
import SearchSubmitButton from "../../components/UI/Buttons/SearchSubmitButton";

const SrchFrm = styled.form`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 12vw;

    @media only screen and (max-width: 426px){
        margin-right: 3vw;
        width: auto;
    };
`;

const SearchForm = props => {
    const [searchValue, setSearchValue] = useState("");

    const history = useHistory();

    const submitHandler = (e) => {
        e.preventDefault();
        history.push(`/search?search-term=${searchValue}`);
        setSearchValue("");
    };

    return (
        <SrchFrm>
            <SearchInput value={searchValue} onchange={(e) => setSearchValue(e.target.value)}/>
            <SearchSubmitButton click={submitHandler}/>
        </SrchFrm>
    );
};

export default SearchForm;