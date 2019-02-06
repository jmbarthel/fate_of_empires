import React from 'react';
import { Image } from "react-native";

export default ElizabethCadyStanton = (props) => {
    const type = 'people';
    const name = 'ElizabethCadyStanton';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/people/ElizabethCadyStanton.jpg')} />
}