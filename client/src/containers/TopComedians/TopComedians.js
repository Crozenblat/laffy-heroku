import React, {useState, useEffect} from "react";
import styled from "styled-components";
import {useSelector} from "react-redux";
import axios from "axios";

import withErrorHandler from "../../hoc/withErrorHandler";

import ComedianWindow from "../../components/Comedian/ComedianWindow";
import LoadingIcon from "../../components/LoadingIcon/LoadingIcon";
import InfoMessage from "../../components/Messages/InfoMessage";

const TpCmdns = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;

    @media only screen and (max-width: 426px){
        width: 85%;
        justify-content: space-around;
    };
`;

const TopComedians = props => {
    const [content, setContent] = useState(<LoadingIcon/>);
    const accessToken = useSelector(state => state.authorization.accessToken);

    useEffect(() => {
        (async () => {
            try{
                let topComedians = await axios.get("/comedians/top-comedians", {headers: {Authorization: `Bearer ${accessToken}`}});
                setContent(topComedians.data.map((comedian, index) => {
                    return <ComedianWindow key={`topComedians-${index}`} name={comedian.name} accountImage={comedian.accountImage} tags={comedian.tags} linkId={comedian._id}/>
                }));
            }catch(err){
                setContent(<InfoMessage>Top comedians could not be fetched. Please refresh the page.</InfoMessage>)
                console.log(err);
            };
        })();
    }, [accessToken]);

    return (
        <TpCmdns>
            {content}
        </TpCmdns>
    )
}

export default withErrorHandler(TopComedians);