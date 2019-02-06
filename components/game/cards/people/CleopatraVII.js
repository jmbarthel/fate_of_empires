import React from 'react';
import { Image } from "react-native";

export default CleopatraVII = (props) => {
    const type = 'people';
    const name = 'CleopatraVII';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/people/CleopatraVII.jpg')} />
}