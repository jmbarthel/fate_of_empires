import React from 'react';
import { Image } from "react-native";

export default Sydney = (props) => {
    const type = 'city';
    const name = 'Sydney';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/cities/Sydney.jpg')} />
}