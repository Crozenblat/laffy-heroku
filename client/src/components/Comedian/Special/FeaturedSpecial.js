import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";

const FtrdSpcl = styled.div`
    border: 1px solid ${props => props.theme.secondaryColor};
    background-image: url(${props => props.backgroundImage});
    background-position: center;
    background-size: cover;
    height: 34vw;
    width: 23vw;
    margin: 1vw 2vw;
    position: relative;

    @media only screen and (max-width: 426px){
        height: 40vw;
        width: 27vw;
    };
`;

const FtrdSpclLnk = styled(Link)`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
`;

const FeaturedSpecial = props => {
    return(
        <FtrdSpcl backgroundImage={props.backgroundImage}>
            <FtrdSpclLnk to={{
                pathname: props.url,
                hash: "#specialInfo",
                state: {featuredSpecial: props.specialTitle}
            }}/>
        </FtrdSpcl>
    );
};

export default FeaturedSpecial;