import React, { useState } from "react";
import styled from "styled-components";
import DOMPurify from "dompurify";
import {useSelector} from "react-redux";
import axios from "axios";

import CommentLikeButton from "../../components/UI/Buttons/CommentLikeButton";
import ErrorMessage from "../../components/Messages/ErrorMessage";

const Cmmnt = styled.div`
    display: flex;
    border: solid 1px ${props => props.theme.secondaryColor};
    color: white;
    padding: 1vw;
    margin-bottom: 1vw;

    @media only screen and (max-width: 1441px){
        padding: 0 1vw;
    };
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
    width: 100%;

    @media only screen and (max-width: 321px){
        padding: 0 0.5rem;
    };
`;

const CmmntDate = styled.span`
    font-size: 1.4vw;

    @media only screen and (max-width: 1024px){
        font-size: 2vw;
    };

    @media only screen and (max-width: 769px){
        font-size: 2.7vw;
    };

    @media only screen and (max-width: 426px){
        font-size: 4vw;
        display: block;
        margin-bottom: 3vw;
    };

    @media only screen and (max-width: 321px){
        font-size: 5vw;
    };
`;

const CmmntContent = styled.div`
    font-size: 1.5vw;
    word-break: break-word;
    margin: 0.3vw 0 1vw 0.2vw;

    @media only screen and (max-width: 1024px){
        font-size: 2.5vw;
    };

    @media only screen and (max-width: 769px){
        font-size: 3vw;
        margin-bottom: 2vw;

    };

    @media only screen and (max-width: 426px){
        font-size: 4.4vw;
    };

    @media only screen and (max-width: 321px){
        font-size: 5vw;
    };
`;

const CmmntName = styled.span`
    color: ${props => props.theme.secondaryColor};
    font-size: 2vw;
    font-weight: bold;
    margin-right: 1rem;
    word-break: break-word;

    @media only screen and (max-width: 1024px){
        font-size: 3vw;
    };

    @media only screen and (max-width: 769px){
        font-size: 4vw;
    };

    @media only screen and (max-width: 426px){
        font-size: 6vw;
    };

    @media only screen and (max-width: 321px){
        font-size: 7vw;
    };
`;

const CmmntLkeBtnPosWrppr = styled.div`
    margin-left: 0.5vw;
`;

const Comment = props => {
    const userId = useSelector(state => state.authorization.userId);
    const [errMsg, setErrMsg] = useState(null);

    const clickLikeHandler = () => {
        if(!userId){
            return setErrMsg(<ErrorMessage type="commentError">*Must be signed in to like comments</ErrorMessage>);
        };

        props.updateCommentLikes(props.commentId);

        axios.patch(`/comedians/${props.comedianId}/comments/${props.commentId}/commentLikes`, {}, {withCredentials: true});
    };

    const content = DOMPurify.sanitize(props.content.replace(/\n/ig, "<br/>"));

    return (
        <Cmmnt>
            <ContentContainer>
                <div>
                    <CmmntName>{props.author}</CmmntName>
                    <CmmntDate>{props.date}</CmmntDate>
                </div>
                <CmmntContent dangerouslySetInnerHTML={{__html: content}}/>
                <CmmntLkeBtnPosWrppr>
                    <CommentLikeButton likes={props.likes} updateCommentLikes={props.updateCommentLikes} click={clickLikeHandler}/>
                </CmmntLkeBtnPosWrppr>
                {errMsg}
            </ContentContainer>
        </Cmmnt>
    )
}

export default Comment;