import React from 'react';
import { Image } from "react-native";

export default Seoul = (props) => {
    const type = 'city';
    const name = 'Seoul';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/cities/Seoul.jpg')} />
}