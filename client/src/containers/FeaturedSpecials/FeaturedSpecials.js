import React, {useState, useEffect, Fragment} from "react";
import styled from "styled-components";
import axios from "axios";

import InfoMessage from "../../components/Messages/InfoMessage";
import withErrorHandler from "../../hoc/withErrorHandler";

import FeaturedSpecial from "../../components/Comedian/Special/FeaturedSpecial";

const FtrdSpclsWrppr = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const Divider = styled.div`
    background: ${props => props.theme.secondaryColor};
    width: 0.3vw;

    @media only screen and (max-width: 426px){
        width: 0rem;
    };
`;

const FeaturedSpecials = props => {
    let [content, setContent] = useState();

    useEffect(() => {
        (async () => {
            try{
                let featuredSpecials = await axios.get("/featured-specials");

                setContent(featuredSpecials.data.map((special, index, arr) => {
                    let divider = index < arr.length - 1 ? <Divider/> : null;
                    return (
                        <Fragment key={`featuredSpecial-${index}`}>
                            <FeaturedSpecial url={`/comedians/${special.comedianId}`} backgroundImage={special.specialCover} specialTitle={special.specialTitle}/>
                            {divider}
                        </Fragment>
                    );
                }));
            }catch(err){
                setContent(<InfoMessage>Featured specials could not be fetched. Please refresh the page.</InfoMessage>);
                console.log(err);
            };
        })();
    }, []);

    return(
        <FtrdSpclsWrppr>
            {content}
        </FtrdSpclsWrppr>
    );
};

export default withErrorHandler(FeaturedSpecials);