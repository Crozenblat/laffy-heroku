import React, {useState, useEffect, Fragment} from "react";
import styled from "styled-components";
import {useSelector} from "react-redux";

import ErrorMessage from "../../Messages/ErrorMessage";

const ReviewContainer = styled.form`
    display: flex;
    opacity: ${props => props.open ? 1 : 0};
`;

const ReviewInput = styled.input`
    display: none;
`;

const ReviewStar = styled.label`
    width: 2.5vw;
    margin: 0 0.1vw 1vw 0;
    cursor: pointer;
    stroke: ${props => props.theme.secondaryColor};
    stroke-width: 30px;
    fill: ${props => props.active ? props.theme.secondaryColor : "transparent"};
    transition: all 0.2s;
    
    @media only screen and (max-width: 769px){
        width: 3vw;
    };

    @media only screen and (max-width: 426px){
        width: 7vw;
        margin: 0 0.4vw;
    };
`;

const AvgRtng = styled.p`
    color: ${props => props.theme.secondaryColor};
    font-size: 2vw;
    margin-left: 1vw;

    @media only screen and (max-width: 1025px){
        font-size: 2.4vw;
        margin-top: -0.5vw;
    };

    @media only screen and (max-width: 769px){
        font-size: 3vw;
    };

    @media only screen and (max-width: 426px){
        font-size: 6vw;
    };
`;

const Review = props => {
    const userId = useSelector(state => state.authorization.userId);
    const [hoveredStar, setHoveredStar] = useState(null);
    const [selectedStar, setSelectedStar] = useState(null);
    const [avgRating, setAvgRating] = useState(null);
    const [errMsg, setErrMsg] = useState(null);

    useEffect(() => {
        if(props.ratings){
            let foundRating = props.ratings.find(x => x.userId === userId);
            setSelectedStar(foundRating ? foundRating.rating : null);
            let avgRating = props.ratings.reduce((accumulator, currVal) => accumulator + currVal.rating, 0)/props.ratings.length;
            setAvgRating(isNaN(avgRating) ? null : `(Avg: ${avgRating})`);
        };
    }, [props.ratings, userId]);

    const handleClick = (index) => {
        if(!userId){
            setErrMsg(<ErrorMessage>*Must be logged in to rate specials</ErrorMessage>);
        }else{
            setSelectedStar(index);
            props.updateSpecialRating(index);
        };
    };

    const handleExitHover = () => {
        setHoveredStar(null);
    };

    const handleStarHover = (index) => {
        setHoveredStar(++index);
    };

    const reviewStars = [...Array(5)].map((item, index) => {
        let starValue = index + 1;
        let active = hoveredStar ? hoveredStar > index : selectedStar > index;
        return (
            <Fragment key={`star-${starValue}`}>
                <ReviewInput type="radio" name="rating" id={`star-${starValue}`} value={starValue}/>
                <ReviewStar htmlFor={`star-${starValue}`} active={active} onMouseEnter={() => handleStarHover(index)} onClick={() => handleClick(starValue)}>
                    <svg x="0px" y="0px" viewBox="0 0 512 512">
                        <polygon points="512,197.816 325.961,185.585 255.898,9.569 185.835,185.585 0,197.816 142.534,318.842 95.762,502.431 255.898,401.21 416.035,502.431 369.263,318.842"/>
                    </svg>
                </ReviewStar>
            </Fragment>
        )
    });

    return (
        <Fragment>
            <ReviewContainer open={props.open} onMouseLeave={() => handleExitHover()}>
                {reviewStars}
                <AvgRtng>{avgRating}</AvgRtng>
            </ReviewContainer>
            {errMsg}
        </Fragment>
    )
};

export default Review;