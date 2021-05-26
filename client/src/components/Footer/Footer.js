import React from "react";
import styled from "styled-components";

const Footr = styled.footer`
    width: 100%;
    display: flex;
    justify-content: center;
    background: ${props => props.theme.secondaryColor};
    position: absolute;
    left: 0;
    bottom: -6vw;
`;

const FootrContentSpacer = styled.div`
    margin-right: 3rem;
`;

const FootrText = styled.p`
    font-size: 1vw;

    @media only screen and (max-width: 426px){
        font-size: 1.7vw;  
    };
`;

const Footer = props => {
    return (
        <Footr>
            <FootrContentSpacer>
                <FootrText><a href="https://www.vecteezy.com/free-vector/design">Design Vectors by Vecteezy</a></FootrText>
                <FootrText>Icons made by <a href="https://www.flaticon.com/authors/google" title="Google">Google</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></FootrText>
                <FootrText>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></FootrText>
                <FootrText>Icons made by <a href="https://www.flaticon.com/authors/prosymbols" title="Prosymbols">Prosymbols</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></FootrText>
                <FootrText>Icons made by <a href="https://www.flaticon.com/authors/dinosoftlabs" title="DinosoftLabs">DinosoftLabs</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></FootrText>
            </FootrContentSpacer>
            <FootrContentSpacer>
                <FootrText>Icons made by <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">Pixel perfect</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></FootrText>
                <FootrText>Icons made by <a href="https://www.flaticon.com/authors/kiranshastry" title="Kiranshastry">Kiranshastry</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></FootrText>
                <FootrText>Icons made by <a href="https://www.flaticon.com/authors/dave-gandy" title="Dave Gandy">Dave Gandy</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></FootrText>
                <FootrText>Icons made by <a href="https://www.flaticon.com/authors/good-ware" title="Good Ware">Good Ware</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></FootrText>
            </FootrContentSpacer>
        </Footr>
    );
};

export default Footer;