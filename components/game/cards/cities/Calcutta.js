import React from 'react';
import { Image } from "react-native";

export default Calcutta = (props) => {
    const type = 'city';
    const name = 'Calcutta';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/cities/Calcutta.jpg')} />
}