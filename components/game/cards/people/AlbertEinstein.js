import React from 'react';
import { Image } from "react-native";

export default AlbertEinstein = (props) => {
    const type = 'person';
    const name = 'AlbertEinstein';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/people/AlbertEinstein.jpg')} />
}