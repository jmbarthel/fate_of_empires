import React from 'react';
import { Image } from "react-native";

export default Bifocals = (props) => {
    const type = 'technology';
    const name = 'Bifocals';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/technology/Bifocals.jpg')} />
}