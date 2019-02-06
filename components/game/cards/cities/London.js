import React from 'react';
import { Image } from "react-native";

export default London = (props) => {
    const type = 'city';
    const name = 'London';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/cities/London.jpg')} />
}