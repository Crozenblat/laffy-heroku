import React from "react";
import styled from "styled-components";

const Video = styled.iframe`
    width: 69vw;
    height: 38vw;
    border: solid 1px ${props => props.theme.secondaryColor};

    @media only screen and (max-width: 426px){
        width: 77vw;
        height: 44vw;
    };
`;

const PopularVideo = props => {
    return (
        <Video src={props.src}
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen/>
    )
}

export default PopularVideo;