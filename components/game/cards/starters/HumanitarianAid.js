import React from 'react';
import { Image } from "react-native";

export default HumanitarianAid = (props) => {
    const type = 'worker';
    const name = 'HumanitarianAid';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/starters/HumanitarianAid.jpg')} />
}