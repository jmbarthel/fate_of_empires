import React from 'react';
import { Image } from "react-native";

export default Minneapolis = (props) => {
    const type = 'city';
    const name = 'Minneapolis';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/cities/Minneapolis.jpg')} />
}