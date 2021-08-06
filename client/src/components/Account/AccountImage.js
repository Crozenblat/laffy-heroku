import React from "react";
import styled from "styled-components";

const AccntImg = styled.span`
    display: inline-block;
    background-image: url("${props => props.img}");
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 50%;
    border-style: solid;
    border-width: 1px;
    border-color: ${props => {
        return (
            props.type === "trendingTab" ? props.theme.primaryColor : props.theme.secondaryColor
        )
    }};
    padding: ${props => {
        return (
            props.type === "tourDate" ? "3vw" :
            props.trendingIsSidebar ? "2.4vw" :
            props.type === "trendingTab" ? "3vw" :
            props.type === "comedianWindow" ? "7vw" :
            props.type === "comedianBanner" && "11vw"
            )
    }};
    margin-top: ${props => {
        return (
            props.type === "comedianWindow" && "1vw"
        )
    }};

    @media only screen and (max-width: 1025px){
        padding: ${props => {
            return (
                props.type === "comedianBanner" && "13vw"
            )
        }};
    };

    @media only screen and (max-width: 769px){
        padding: ${props => {
            return (
                props.type === "tourDate" ? "5vw" :
                props.type === "trendingTab" ? "4vw" :
                props.type === "comedianBanner" && "15vw"
            )
        }};
    };

    @media only screen and (max-width: 426px){
        padding: ${props => {
            return (
                props.type === "comedianWindow" ? "16vw" :
                props.type === "trendingTab" ? "7vw" :
                props.type === "tourDate" && "7vw"
            )
        }};
    };
`;

const AccountImage = props => {
    return (
        <AccntImg type={props.type} img={props.img} trendingIsSidebar={props.trendingIsSidebar}/>
    )
}

export default AccountImage;