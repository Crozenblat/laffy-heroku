import React, {useState} from "react";
import styled from "styled-components";
import axios from "axios";
import {useSelector} from "react-redux";
import {checkValidity} from "../../utilities/utilities";

import CommentInput from "../../components/UI/Inputs/CommentInput";
import SubmitButton from "../../components/UI/Buttons/SubmitButton";
import ErrorMessage from "../../components/Messages/ErrorMessage";

const CmmntFrm = styled.form`
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
`;

const CmmntCntntPosWrppr = styled.div`
    display: flex;
    justify-content: space-between;
`;

const CmmntSbmtPosWrppr = styled.span`
    margin: 1rem 0;
    align-self: flex-end;
`;

const CmmntErrMsgPosWrppr = styled.div`
    position: absolute;
    left: 5.2rem;
`;

const CommentForm = props => {

    const [controls, setControls] = useState({
        value: "",
        validationRules:{
            required: true
        },
        placeholder: "Leave a comment!",
        isValid: false,
        errMsg: null
    });

    const username = useSelector(state => state.authorization.username);

    const inputChangedHandler = event => {
        event.persist();
        setControls(prev => ({
            ...prev, 
            value: event.target.value
        }));
    };

    const submitHandler = event => {
        event.preventDefault();
        let newComment = {
            commentAuthor: username || "Anonymous",
            commentDate: new Date().toLocaleString('en-US').replace(/:\d\d /, " "),
            commentContent: controls.value,
            commentLikes: []
        };
        let {isValid, errType} = checkValidity(controls.value, controls.validationRules);

        let errMsg;

        switch(errType){
            case "required":
                errMsg = "*Error: Can't submit a blank comment.";
            break;
            default:
                errMsg = null;
        };

        setControls(prev => ({
            ...prev,
            value: "",
            isValid,
            errMsg
        }));

        if(isValid){
            axios.patch(`/comedians/${props.comedianId}/comments`, newComment, {withCredentials: true});

            props.updateComedianComments(prev => {
                let updatedComments = [...prev.comments];
                updatedComments.push(newComment);
                return {
                    ...prev,
                    comments: updatedComments
                }
            });
        };
    };

    let errMsgDisplay = controls.errMsg ? <ErrorMessage>{controls.errMsg}</ErrorMessage> : null;

    return(
        <CmmntFrm>
            <CmmntCntntPosWrppr>
                <CommentInput keyPress={inputChangedHandler} value={controls.value} placeholder={controls.placeholder}/>
            </CmmntCntntPosWrppr>
            <CmmntSbmtPosWrppr>
                <CmmntErrMsgPosWrppr>{errMsgDisplay}</CmmntErrMsgPosWrppr>
                <SubmitButton click={submitHandler} type="commentSubmit">Submit</SubmitButton>
            </CmmntSbmtPosWrppr>
        </CmmntFrm>
    );
};

export default CommentForm;