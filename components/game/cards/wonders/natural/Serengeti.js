import React from 'react';
import { Image } from "react-native";

export default Serengeti = (props) => {
    const cost = 5; const type='natural_wonder';
    const name = 'Serengeti';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../../assets/wonders/natural/Serengeti.jpg')} />
}