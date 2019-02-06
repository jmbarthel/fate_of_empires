import React from 'react';
import { Image } from "react-native";

export default Kyoto = (props) => {
    const type = 'cities';
    const name = 'Kyoto';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/cities/Kyoto.jpg')} />
}