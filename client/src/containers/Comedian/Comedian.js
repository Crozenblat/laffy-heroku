import React, {useState, useEffect, useRef, Fragment} from "react";
import styled from "styled-components";
import {useSelector} from "react-redux";
import axios from "axios";
import {useParams, useLocation} from "react-router-dom";

import useMediaQuery from "../../hooks/useMediaQuery";

import Banner from "../../components/Banner/Banner";
import comedianPageBannerImg from "../../assets/comedianPage-banner-img.jpeg";
import AccountImage from "../../components/Account/AccountImage";
import ShareOptionButton from "../../components/UI/Buttons/ShareButtons/ShareOptionButton";
import OptionsBar from "../../components/Comedian/OptionsBar";

import SectionHeading from "../../components/Section/SectionHeading";

import Special from "../../components/Comedian/Special/Special";
import SpecialInfo from "../../components/Comedian/Special/SpecialInfo";

import PopularVideo from "../../components/Comedian/PopularVideo/PopularVideo";

import ComedianWindow from "../../components/Comedian/ComedianWindow";

import TourFeed from "../TourFeed/TourFeed";

import Carousel from "../../components/Carousel/Carousel";

import CommentForm from "../Comments/CommentForm"

import Comment from "../../containers/Comments/Comment";

import withErrorHandler from "../../hoc/withErrorHandler";

const ComedianImagePosWrppr = styled.span`
    position: absolute;
    top: 5vw;
    right: 6vw;
    z-index: 1;

    @media only screen and (max-width: 1024px){
        top: 10vw;
    };

    @media only screen and (max-width: 768px){
        top: 13vw;
        right: 3vw;
    };

    @media only screen and (max-width: 426px){
        top: 68vw;
        right: 1vw;
    };

    @media only screen and (max-width: 320px){
        top: 85vw;
        right: 3vw;
    };
`;

const ShareOptionsPosWrppr = styled.span`
    display: flex;
    position: absolute;
    top: 33vw;
    left: 14vw;
    justify-content: space-between;
    width: 14vw;
    align-self: flex-start;

    @media only screen and (max-width: 1441px){
        top: 31vw;
    };

    @media only screen and (max-width: 1025px){
        top: 42vw;
    };

    @media only screen and (max-width: 769px){
        top: 49vw;
        width: 26vw;
    };

    @media only screen and (max-width: 426px){
        top: 76vw;
        width: 38vw;
    };

    @media only screen and (max-width: 320px){
        top: 91vw;
        width: 51vw;
    };
`;

const SimilarComediansWrppr = styled.div`
    display: flex;

    @media only screen and (max-width: 426px){
        flex-wrap: wrap;
        justify-content: center;
    };
`;

const CmmntSectionPosWrppr = styled.div`
    width: 80vw;
`;

const Comedian = props => {
    const [favorited, setFavorited] = useState(null);
    const [selectedSpecial, setSelectedSpecial] = useState({});
    const [shareBtnActive, setShareBtnActive] = useState(false);
    const [comedianInfo, setComedianInfo] = useState();
    const [specialsPerSlide, setSpecialsPerSlide] = useState(6);
    const [open, setOpen] = useState(false);

    const userId = useSelector(state => state.authorization.userId);
    const {comedianId} = useParams();
    const location = useLocation();
    const specialInfoRef = useRef();
    const [screenWidth] = useMediaQuery();

    useEffect(() => {
        if(screenWidth < 376){
            setSpecialsPerSlide(3);
        }else if(screenWidth <= 426){
            setSpecialsPerSlide(4);
        }else{
            setSpecialsPerSlide(6);
        }
    }, [screenWidth]);
    
    useEffect(() => {
        (async () => {
            let info = await axios.get(`/comedians/${comedianId}`);
            setComedianInfo(null);
            setComedianInfo(info.data);
            if(location.hash === "#specialInfo"){
                specialInfoRef.current.scrollIntoView({behavior: "smooth"});
                setOpen(true);
                setSelectedSpecial(info.data.specials[info.data.specials.findIndex(special => special.specialTitle === location.state.featuredSpecial)] || {});
            }else{
                window.scrollTo(0, 0);
            }
            setFavorited(info.data.metrics.favoritesReceived.find(item => item === userId));
            if(userId){
                try{
                    await axios.patch(`/comedians/${comedianId}/viewCount`);
                    await axios.patch("/user/recentlyViewed", {comedianId}, {withCredentials: true});
                }catch(err){
                    console.log(err);
                };
            };
        })();
    }, [comedianId, userId]);

    const updateSpecialRating = (rating) => {
        axios.patch(`/comedians/${comedianId}/special-ratings`, {userId, rating, specialTitle: selectedSpecial.specialTitle}, {withCredentials: true});
        setComedianInfo(prev => {
            let specials = prev.specials;
            let specialRatings = specials[specials.findIndex(special => special.specialTitle === selectedSpecial.specialTitle)].specialRatings;
            if(specialRatings.filter(rating => rating.userId === userId).length){
                specialRatings[specialRatings.findIndex(rating => rating.userId === userId)].rating = rating;
            }else{
                specialRatings.push({userId, rating});
            };

            return {
                ...prev,
                specials: [
                    ...specials
                ]
            };
        });
    };

    const updateCommentLikes = (commentId) => {
        setComedianInfo(prev => {
            let comments = prev.comments;
            let foundCommentLikes = comments[comments.findIndex(comment => comment._id === commentId)].commentLikes;
            if(foundCommentLikes.includes(userId)){
                foundCommentLikes.splice(foundCommentLikes.findIndex(like => like === userId), 1);
            }else{
                foundCommentLikes.push(userId);
            };

            return{
                ...prev,
                comments
            }
        });
    };

    const updateFavorited = async () => {
        try{
            setFavorited(!favorited);
            await axios.patch("/user/favorited", {comedianId}, {withCredentials: true});
            await axios.patch(`/comedians/${comedianId}/favoritesReceived`, {userId}, {withCredentials: true});
        }catch(err){
            console.log(err);
        }
    }

    let banner;
    let specials;
    let popularVideos;
    let similarComedianWindows;
    let comments;

    if(comedianInfo){
        specials = comedianInfo.specials.map((special, index) => {
            return <Special key={`${comedianInfo.name}-special-${index}`} type="catalogue" special={special} selectedSpecial={selectedSpecial} setSpecial={(title) => setSelectedSpecial(title)} setOpen={(bool) => setOpen(bool)}/>
        });

        popularVideos = comedianInfo.popularVideos.map((link, index) => {
            return <PopularVideo key={`${comedianInfo.name}-popularVideo-${index}`} src={link}/>
        });        

        similarComedianWindows = comedianInfo.similarComedians.map((comedian, index) => {
            return <ComedianWindow key={`${comedianInfo.name}-similarComedian-${index}`} name={comedian.name} accountImage={comedian.accountImage} tags={comedian.tags} linkId={comedian._id}/>
        });

        comments = comedianInfo.comments.sort((a,b) => {
            return b.commentLikes.length - a.commentLikes.length
        }).map(comment => {
            return <Comment updateCommentLikes={updateCommentLikes} commentId={comment._id} comedianId={comedianId} author={comment.commentAuthor} date={comment.commentDate} content={comment.commentContent} likes={comment.commentLikes}/>
        });
    };

    let content = comedianInfo ? 
    <Fragment>
        <Banner type="comedianPage" backgroundImg={`url(${comedianPageBannerImg})`} heading={comedianInfo.name} subheading={comedianInfo.description}>
            <ComedianImagePosWrppr>
                <AccountImage type="comedianBanner" img={comedianInfo.accountImage}/>
            </ComedianImagePosWrppr>
        </Banner>
        <ShareOptionsPosWrppr>
            <ShareOptionButton type="facebook" comedianName={comedianInfo.name} shareBtnActive={shareBtnActive}/>
            <ShareOptionButton type="twitter" comedianName={comedianInfo.name} shareBtnActive={shareBtnActive}/>
            <ShareOptionButton type="reddit" comedianName={comedianInfo.name} shareBtnActive={shareBtnActive}/>
        </ShareOptionsPosWrppr>
        <OptionsBar shareBtnActive={shareBtnActive} shareButtonClick={() => setShareBtnActive(!shareBtnActive)} favorited={favorited} favoriteButtonClick={updateFavorited}/>
        <SectionHeading textAlign="center" type="subsection">Specials</SectionHeading>
        <Carousel type="specials" itemsPerSlide={specialsPerSlide} selectedSpecial={selectedSpecial}>
            {specials}
        </Carousel>
        <SpecialInfo passedRef={specialInfoRef} open={open} special={selectedSpecial} updateSpecialRating={updateSpecialRating}/>
        <SectionHeading textAlign="center" type="subsection">Tour Dates</SectionHeading>
            <TourFeed type="comedian" name={comedianInfo.name} accountImage={comedianInfo.accountImage}/>
        <SectionHeading textAlign="center" type="subsection">Popular Videos</SectionHeading>
        <Carousel type="videos">
            {popularVideos}
        </Carousel>
        <div>
            <SectionHeading textAlign={screenWidth < 427 ? "center" : "start"} type="subsection">{`${comedianInfo.name} fans also like:`}</SectionHeading>
            <SimilarComediansWrppr>
                {similarComedianWindows}
            </SimilarComediansWrppr>
        </div>
        <CmmntSectionPosWrppr>
            <SectionHeading textAlign={screenWidth < 427 ? "center" : "start"} type="subsection">Comments</SectionHeading>
            <CommentForm updateComedianComments={setComedianInfo} comedianId={comedianInfo._id}/>
            {comments}
        </CmmntSectionPosWrppr>
    </Fragment> : null;

    return (
        content
    );
};

export default withErrorHandler(Comedian);