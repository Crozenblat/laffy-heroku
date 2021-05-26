import React, {useState, useEffect} from "react";
import styled from "styled-components";
import axios from "axios";

import withErrorHandler from "../../hoc/withErrorHandler";

import ComedianWindow from "../../components/Comedian/ComedianWindow";
import LoadingIcon from "../../components/LoadingIcon/LoadingIcon";
import InfoMessage from "../../components/Messages/InfoMessage";

const SrchRslts = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;

    @media only screen and (max-width: 426px){
        width: 85%;
        justify-content: center;
    };
`;

const SearchResults = props => {
    const [content, setContent] = useState(<LoadingIcon/>);

    useEffect(() => {
        (async () => {
            try{
                let searchResults = await axios.get(`/search?search-term=${props.searchTerm}`);
                setContent(searchResults.data.map((comedian, index) => {
                    return <ComedianWindow key={`searchResult-${index}`} name={comedian.name} accountImage={comedian.accountImage} tags={comedian.tags} linkId={comedian._id}/>
                }));
            }catch(err){
                if(err.response.data === "No search term entered."){
                    setContent(<InfoMessage>{err.response.data}</InfoMessage>)
                }else{
                    setContent(<InfoMessage>Seach results could not be fetched. Please try again.</InfoMessage>)
                };
            };
        })();
    }, [props.searchTerm]);

    return(
        <SrchRslts>
            {content}
        </SrchRslts>
    );
};

export default withErrorHandler(SearchResults);