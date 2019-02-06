import React from 'react';
import { Image } from "react-native";

export default TempleofArtemis = (props) => {
    const type = 'ancient_wonder';
    const name = 'TempleofArtemis';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../../assets/wonders/ancients/TempleofArtemis.jpg')} />
}