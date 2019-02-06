import React from 'react';
import { Image } from "react-native";

export default StatueofZeus = (props) => {
    const type = 'ancient_wonder';
    const name = 'StatueofZeus';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../../assets/wonders/ancients/StatueofZeus.jpg')} />
}