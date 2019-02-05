import React from 'react';
import { Image } from "react-native";

export default Treaties = (props) => {
    const type = 'technology';
    const name = 'Treaties';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/technology/Treaties.jpg')} />
}