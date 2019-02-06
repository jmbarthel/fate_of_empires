import React from 'react';
import { Image } from "react-native";

export default QueenElizabethI = (props) => {
    const type = 'people';
    const name = 'QueenElizabethI';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/people/QueenElizabethI.jpg')} />
}