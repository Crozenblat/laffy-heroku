import React, {useState, useEffect} from "react";
import styled from "styled-components";
import axios from "axios";

import withErrorHandler from "../../hoc/withErrorHandler";

import ComedianWindow from "../../components/Comedian/ComedianWindow";
import InfoMessage from "../../components/Messages/InfoMessage";
import LoadingIcon from "../../components/LoadingIcon/LoadingIcon";

const Fvrts = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;

    @media only screen and (max-width: 426px){
        width: 85%;
        justify-content: space-around;
    };
`;

const Favorites = props => {
    const [content, setContent] = useState(<LoadingIcon/>);

    useEffect(() => {
        (async () => {
            try{
                let favorited = await axios.get("/user/favorited", {withCredentials: true});
                if(favorited.data.length){
                    let comedianWindows = favorited.data.map((comedian, index) => {
                        return <ComedianWindow key={`favorite-${index}`} name={comedian.name} accountImage={comedian.accountImage} tags={comedian.tags} linkId={comedian._id}/>
                    });
                    setContent(comedianWindows);
                }else{
                    setContent(<InfoMessage>You don't currently have any favorited comedians. Go explore our comedians to find your favorites!</InfoMessage>);
                }
            }catch(err){
                setContent(<InfoMessage>Favorited comedians could not be fetched. Please refresh the page.</InfoMessage>);
                console.log(err);
            };
        })();
    }, []);

    return (
        <Fvrts>
            {content}
        </Fvrts>
    )
}

export default withErrorHandler(Favorites);