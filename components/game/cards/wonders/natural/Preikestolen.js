import React from 'react';
import { Image } from "react-native";

export default Preikestolen = (props) => {
    const type = 'natural_wonder';
    const name = 'Preikestolen';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../../assets/wonders/natural/Preikestolen.jpg')} />
}