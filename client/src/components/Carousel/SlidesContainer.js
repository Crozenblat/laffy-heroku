import React from "react";
import styled from "styled-components";

const SldsCntnr = styled.div`
    transform: translateX(-${props => props.translate}px);
    transition: transform ease-out ${props => props.transition}s;
    height: 100%;
    width: ${props => props.width}px;
    display: flex;
`;

const SlidesContainer = props => {

    return (
        <SldsCntnr ref={props.transRef} translate={props.translate} transition={props.transition} width={props.width} className="slideContainer">
            {props.children}
        </SldsCntnr>
    )
}

export default SlidesContainer;