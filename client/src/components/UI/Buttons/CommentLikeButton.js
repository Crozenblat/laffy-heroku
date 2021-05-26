import React from "react";
import styled from "styled-components";
import {useSelector} from "react-redux";

const LkBtnCntnr = styled.span`
    display: flex;
    width: 3.2vw;
    justify-content: space-between;
    align-items: center;

    @media only screen and (max-width: 1024px){
        width: 4.2vw;
    };

    @media only screen and (max-width: 769px){
        width: 6.5vw;
    };

    @media only screen and (max-width: 426px){
        width: 9.5vw;
    };

    @media only screen and (max-width: 321px){
        width: 13vw;
    };
`;

const LkBtn = styled.button`
    width: 2vw;
    background: transparent;
    border: none;
    cursor: pointer;
    fill: ${props => props.active ? props.theme.secondaryColor : "grey"};

    &:hover{
        fill: ${props => props.active ? props.theme.secondaryColor : "white"};
    };

    @media only screen and (max-width: 1024px){
        width: 2.8vw;
    };

    @media only screen and (max-width: 769px){
        width: 4.2vw;
    };

    @media only screen and (max-width: 426px){
        width: 6vw;
    };

    @media only screen and (max-width: 321px){
        width: 8vw;
    };
`;

const LkCountr = styled.span`
    font-size: 1.6vw;

    @media only screen and (max-width: 1024px){
        font-size: 2vw;
    };

    @media only screen and (max-width: 769px){
        font-size: 3vw;
    };

    @media only screen and (max-width: 426px){
        font-size: 4.5vw;
    };

    @media only screen and (max-width: 321px){
        font-size: 6vw;
    };
`;

const CommentLikeButton = props => {
    const userId = useSelector(state => state.authorization.userId);

    return (
        <LkBtnCntnr>
            <LkBtn onClick={props.click} active={props.likes.includes(userId)}>
                <svg x="0px" y="0px" viewBox="0 0 512 512">
                    <g>
                        <path d="M53.333,224C23.936,224,0,247.936,0,277.333V448c0,29.397,23.936,53.333,53.333,53.333h64
                            c12.011,0,23.061-4.053,32-10.795V224H53.333z"/>
                    </g>
                    <g>
                        <path d="M512,304c0-12.821-5.077-24.768-13.888-33.579c9.963-10.901,15.04-25.515,13.653-40.725
                            c-2.496-27.115-26.923-48.363-55.637-48.363H324.352c6.528-19.819,16.981-56.149,16.981-85.333c0-46.272-39.317-85.333-64-85.333
                            c-22.165,0-37.995,12.48-38.677,12.992c-2.517,2.027-3.989,5.099-3.989,8.341v72.341l-61.44,133.099l-2.56,1.301v228.651
                            C188.032,475.584,210.005,480,224,480h195.819c23.232,0,43.563-15.659,48.341-37.269c2.453-11.115,1.024-22.315-3.861-32.043
                            c15.765-7.936,26.368-24.171,26.368-42.688c0-7.552-1.728-14.784-5.013-21.333C501.419,338.731,512,322.496,512,304z"/>
                    </g>
                </svg>
            </LkBtn>
            <LkCountr>{props.likes.length}</LkCountr>
        </LkBtnCntnr>
    )
};

export default CommentLikeButton;