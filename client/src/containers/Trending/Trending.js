import React, {useState, useEffect, Fragment} from "react";
import axios from "axios";

import withErrorHandler from "../../hoc/withErrorHandler";

import TrendingTab from "../../components/Trending/TrendingTab";
import LoadingIcon from "../../components/LoadingIcon/LoadingIcon";
import InfoMessage from "../../components/Messages/InfoMessage";

const Trending = props => {
    const [content, setContent] = useState(<LoadingIcon/>);

    useEffect(() => {
        (async () => {
            try{
                let getComedians = await axios.get("/comedians/trending");
                setContent(getComedians.data.map(comedian => {
                    return <TrendingTab key={`trending-${comedian._id}`} linkId={comedian._id} isSidebar={props.isSidebar} comedianAccountImage={comedian.accountImage} comedianViews={comedian.metrics.views} comedianFavoritesReceived={comedian.metrics.favoritesCount}>{comedian.name}</TrendingTab>
                }));
            }catch(err){
                setContent(<InfoMessage>Trending comedians could not be fetched. Please try again.</InfoMessage>)
                console.log(err);
            };
        })();
    }, [props.isSidebar]);

    return (
        <Fragment>
            {content}
        </Fragment>
    );
};

export default withErrorHandler(Trending);