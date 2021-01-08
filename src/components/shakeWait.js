import React from 'react';
import ShakerImage from '../images/cocktail_shaker.png';
import '../styles/csshake-slow.min.css';

const ShakeWait = (props) => {
    return (
        <img className="shake-slow shake-constant responsive-img" src={ShakerImage} alt="cocktail shaker loading"/>
        )
}

export default ShakeWait;