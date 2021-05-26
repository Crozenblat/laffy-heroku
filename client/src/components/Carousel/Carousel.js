import React, {Fragment, useEffect, useState, useRef} from "react";
import styled from "styled-components";

import SlidesContainer from "./SlidesContainer";
import Slide from "./Slide";
import CarouselArrow from "../UI/Buttons/CarouselArrow";
import Dots from "./Dots";

const Crsl = styled.div`
    position: relative;
    height: min-content;
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
`;

const DtsPosWrppr = styled.div`
    margin: 1vw;
`;

const Carousel = props => {

    const children = ((groupAmt) => {
//props.children is read-only, can't splice, must clone.
        let childrenClone = Array.from(props.children);
        let items = [];
        if(props.type === "specials"){
            let numOfGroups = Math.ceil(childrenClone.length/props.itemsPerSlide);
            for(let i = 0; i < numOfGroups; i++){
                items.push(childrenClone.splice(0, props.itemsPerSlide));
            }
        }else{
            items = childrenClone;
        };

        return items;
    })();

    const getWidth = () => window.innerWidth;

    const firstSlide = children[0];
    const secondSlide = children[1];
    const lastSlide = children[children.length - 1];

    const [activeSlide, setActiveSlide] = useState(0);
    const [translate, setTranslate] = useState(getWidth());
    const [transition, setTransition] = useState(0.45);
    const [displayedSlides, setDisplayedSlides] = useState([lastSlide, firstSlide, secondSlide]);
    const [transitionAllowed, setTransitionAllowed] = useState(true);

    const transitionRef = useRef();

    const calculateCurrentSlides = () => {
        let slides = [];

        if(activeSlide === children.length - 1){
            slides = [children[children.length - 2], lastSlide, firstSlide];
        }else if(activeSlide === 0){
            slides = [lastSlide, firstSlide, secondSlide];
        }
        else{
            slides = children.slice(activeSlide - 1, activeSlide + 2);
        };

        return slides;
    };

    useEffect(() => {
        setDisplayedSlides(calculateCurrentSlides());
    }, [props.selectedSpecial]);

    useEffect(() => {
        transitionRef.current.addEventListener("transitionend", smoothTransition);    
        window.addEventListener("resize", handleResize);    

        let transRef =  transitionRef.current;

        return () => {
            transRef.removeEventListener("transitionend", smoothTransition);
            window.removeEventListener("resize", handleResize);
        }
    });

    const handleResize = () => {
        setTranslate(getWidth());
        setTransition(0);
        setTimeout(() => {
            setTransition(0.45);
        }, 0);
    };

    const smoothTransition = () => {
        setDisplayedSlides(calculateCurrentSlides());
        setTransition(0);
        setTranslate(getWidth());
        setTimeout(() => {
            setTransition(0.45);
            setTransitionAllowed(true);
        }, 0);
    };

    const nextSlide = () => {
        if(transitionAllowed){
            setTranslate(prevState => prevState + getWidth());
            activeSlide === children.length - 1 ? setActiveSlide(0) : setActiveSlide(prevState => prevState + 1);
            setTransitionAllowed(false);
        };
    };

    const prevSlide = () => {
        if(transitionAllowed){
            setTranslate(prevState => prevState - getWidth());
            activeSlide === 0 ? setActiveSlide(children.length - 1) : setActiveSlide(prevState => prevState - 1);
            setTransitionAllowed(false);
        };
    };

    let leftArrow;
    let rightArrow;
    let dots;

    if(children.length > 1){
        leftArrow = <CarouselArrow direction="left" clicked={prevSlide}/>;
        rightArrow = <CarouselArrow direction="right" clicked={nextSlide}/>;
        dots = <Dots slides={children} activeSlide={activeSlide}/>;
    };

    return (
        <Fragment>
            <Crsl>
                <SlidesContainer transRef={transitionRef} translate={translate} transition={transition} width={getWidth()*displayedSlides.length}>
                    {displayedSlides.map((slide, index) => {
                        return <Slide key={slide + index}>{slide}</Slide>
                    })}
                </SlidesContainer>
                {leftArrow}
                {rightArrow}
            </Crsl>
            <DtsPosWrppr>
                {dots}
            </DtsPosWrppr>
        </Fragment>
    )
}

export default Carousel;