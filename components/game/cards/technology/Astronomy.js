import React from 'react';
import { Image } from "react-native";

export default Astronomy = (props) => {
    const type = 'technology';
    const name = 'Astronomy';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/technology/Astronomy.jpg')} />
}