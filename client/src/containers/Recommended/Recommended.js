import React, {useState, useEffect} from "react";
import styled from "styled-components";
import axios from "axios";

import withErrorHandler from "../../hoc/withErrorHandler";

import InfoMessage from "../../components/Messages/InfoMessage";
import ComedianWindow from "../../components/Comedian/ComedianWindow";
import LoadingIcon from "../../components/LoadingIcon/LoadingIcon";

const Rccmmndd = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;

    @media only screen and (max-width: 426px){
        width: 85%;
        justify-content: space-around;
    };
`;

const Recommended = props => {
    const [content, setContent] = useState(<LoadingIcon/>);

    useEffect(() => {
        (async () => {
            try{
                let recommended = await axios.get("/user/recommended", {withCredentials: true});
                if(recommended.data.length){
                    setContent(recommended.data.map((comedian, index) => {
                        return <ComedianWindow key={`recommended-${index}`} name={comedian.name} accountImage={comedian.accountImage} tags={comedian.tags} linkId={comedian._id}/>
                    }));
                }else{
                    setContent(<InfoMessage>You don't currently have any recommendations. Go favorite some comedians to get recommendations!</InfoMessage>);
                };
            }catch(err){
                setContent(<InfoMessage>Recommended comedians could not be fetched. Please refresh the page.</InfoMessage>);
                console.log(err);
            };
        })();
    }, []);

    return (
        <Rccmmndd>
            {content}
        </Rccmmndd>
    )
}

export default withErrorHandler(Recommended);