import React from "react";
import styled from "styled-components";
import useQuery from "../hooks/useQuery";

import SectionHeading from "../components/Section/SectionHeading";
import SearchResults from "../containers/SearchResults/SearchResults";

const SrchRsltsPosWrppr = styled.div`
    width: 97%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const SearchResultsPage = props => {
    let searchTerm = useQuery().get("search-term");
    
    return(
        <SrchRsltsPosWrppr>
            <SectionHeading type="main">{`Search Results for "${searchTerm}"`}</SectionHeading>
            <SearchResults searchTerm={searchTerm}/>
        </SrchRsltsPosWrppr>
    );
};

export default SearchResultsPage;