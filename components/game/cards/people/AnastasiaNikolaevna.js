import React from 'react';
import { Image } from "react-native";

export default AnastasiaNikolaevna = (props) => {
    const type = 'people';
    const name = 'AnastasiaNikolaevna';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/people/AnastasiaNikolaevna.jpg')} />
}