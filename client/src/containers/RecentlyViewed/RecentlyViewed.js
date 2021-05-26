import React, {useState, useEffect} from "react";
import styled from "styled-components";
import axios from "axios";

import withErrorHandler from "../../hoc/withErrorHandler";

import InfoMessage from "../../components/Messages/InfoMessage"
import ComedianWindow from "../../components/Comedian/ComedianWindow";
import LoadingIcon from "../../components/LoadingIcon/LoadingIcon";

const RcntlyVwd = styled.div`
    display: flex;
    justify-content: space-around;

    @media only screen and (max-width: 426px){
        width: 85%;
        flex-wrap: wrap;
    };
`

const RecentlyViewed = props => {
    const [content, setContent] = useState(<LoadingIcon/>);

    useEffect(() => {
        (async () => {
            try{
                let recentlyViewed = await axios.get("/user/recently-viewed", {withCredentials: true});
                if(recentlyViewed.data.length){
                    let comedianWindows = recentlyViewed.data.map((comedian, index) => {
                        return <ComedianWindow key={`recentlyViewed-${index}`} name={comedian.name} accountImage={comedian.accountImage} tags={comedian.tags} linkId={comedian._id}/>
                    });
                    setContent(comedianWindows);
                }else{
                    setContent(<InfoMessage>You don't currently have any recently viewed comedians.</InfoMessage>);
                }
            }catch(err){
                console.log(err);
                setContent(<InfoMessage>Your recently viewed comedians could not be fetched.</InfoMessage>);
            };
        })();
    }, []);

    return (
        <RcntlyVwd>
            {content}
        </RcntlyVwd>

    )
};

export default withErrorHandler(RecentlyViewed);