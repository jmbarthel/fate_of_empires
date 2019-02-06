import React from 'react';
import { Image } from "react-native";

export default Auckland = (props) => {
    const type = 'cities';
    const name = 'Auckland';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/cities/Auckland.jpg')} />
}