import React from "react";
import styled from "styled-components";

import SectionHeading from "../components/Section/SectionHeading";
import ChangePasswordForm from "../containers/ChangePassword/ChangePasswordForm";

const ChngPsswordPosWrppr = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ChangePasswordPage = props => {
    return(
        <ChngPsswordPosWrppr>
            <SectionHeading textAlign="center" type="main">Change Password</SectionHeading>
            <ChangePasswordForm/>
        </ChngPsswordPosWrppr>
    )
};

export default ChangePasswordPage;