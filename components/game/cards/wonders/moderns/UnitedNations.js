import React from 'react';
import { Image } from "react-native";

export default UnitedNations = (props) => {
    const type = 'modern_wonder';
    const name = 'UnitedNations';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../../assets/wonders/moderns/UnitedNations.jpg')} />
}