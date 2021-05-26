import React from "react";
import styled from "styled-components";

const Sld = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Slide = props => {
    return (
        <Sld>
            {props.children}
        </Sld>
    )
}

export default Slide;