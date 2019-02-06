import React from 'react';
import { Image } from "react-native";

export default WuZetian = (props) => {
    const type = 'people';
    const name = 'WuZetian';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/people/WuZetian.jpg')} />
}