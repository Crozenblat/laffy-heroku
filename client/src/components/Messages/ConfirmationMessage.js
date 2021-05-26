import React from "react";
import styled from "styled-components";

const CnfmtnMsg = styled.p`
    color: green;
    font-size: 2vw;
    text-align: center;
`;

const ConfirmationMessage = props => {
    return <CnfmtnMsg>{props.children}</CnfmtnMsg>
};

export default ConfirmationMessage;