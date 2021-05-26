import React from "react";
import styled from "styled-components";

const Line = styled.div`
    width: 80%;
    height: 5%;
`;

const SdeDrwrTgglBtn = styled.button`
    display: flex;
    border: 1px solid ${props => props.theme.secondaryColor};
    border-radius: 15%;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 2.5vw;
    height: 2vw;
    background: ${props => props.active ? props.theme.secondaryColor : "transparent"};

    ${Line}{
        background: ${props => props.active ? props.theme.primaryColor : props.theme.secondaryColor};
    };

    @media only screen and (max-width: 426px){
        height: 12vw;
        width: 15vw;
    };
`;

const SideDrawerToggleButton = props => {
    return(
        <SdeDrwrTgglBtn active={props.active} onClick={props.click}>
            <Line/>
            <Line/>
            <Line/>
        </SdeDrwrTgglBtn>
    );
};

export default SideDrawerToggleButton;