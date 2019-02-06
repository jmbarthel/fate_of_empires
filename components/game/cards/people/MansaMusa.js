import React from 'react';
import { Image } from "react-native";

export default MansaMusa = (props) => {
    const type = 'people';
    const name = 'MansaMusa';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/people/MansaMusa.jpg')} />
}