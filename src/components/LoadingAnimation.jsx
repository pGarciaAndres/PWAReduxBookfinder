import React from 'react';
import styled from 'styled-components';
import loading from '../images/loading.gif';

const LoadingContainer = styled.div`
    width: 100%;
    margin: 60px auto 10px auto;
    @media (max-width: 500px) {
        margin-top: 0px;
    }
    img {
        width: 400px;
        display: block;
        margin: 0 auto;
        @media (max-width: 500px) {
            width: 70%;
        }
    }
    p {
        color: white;
        text-align: center;
        letter-spacing: 10px;
        font-size: 36px;
        font-family: ui-sans-serif;
        overflow: hidden;
        background: linear-gradient(90deg, #0fb9b1, #fff, #0fb9b1);
        background-repeat: no-repeat;
        background-size: 90%;
        animation: animate 1.8s cubic-bezier(0.99, 0.98, 0.93, 0.74) infinite;
        -webkit-background-clip: text;
        -webkit-text-fill-color: rgba(255, 255, 255, 0);
        @media (max-width: 500px) {
            font-size: 6vw;
        }
    }
      
    @keyframes animate {
        0% {
            background-position: -600%;
        }
        100% {
            background-position: 600%;
        }
    }
`;
const LoadingAnimation = props => {
    return (
        <LoadingContainer>
            <img src={loading} alt={'loading'}/>
            <p>loading...</p>
        </LoadingContainer>
    )
}

export default LoadingAnimation