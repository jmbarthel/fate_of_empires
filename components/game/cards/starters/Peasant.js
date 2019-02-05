import React from 'react';
import { Image } from "react-native";

export default Peasant = (props) => {
    const type = 'worker';
    const name = 'Peasant';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/starters/Peasant.jpg')} />
}