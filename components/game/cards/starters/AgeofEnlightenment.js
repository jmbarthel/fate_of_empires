import React from 'react';
import { Image } from "react-native";

export default AgeofEnlightenment = (props) => {
    const cost = 5; const type='event';
    const name = 'AgeofEnlightenment';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/starters/AgeofEnlightenment.jpg')} />
}