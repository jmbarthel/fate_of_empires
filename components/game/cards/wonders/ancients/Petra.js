import React from 'react';
import { Image } from "react-native";

export default Petra = (props) => {
    const type = 'ancient_wonder';
    const name = 'Petra';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../../assets/wonders/ancients/Petra.jpg')} />
}