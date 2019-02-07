import React from 'react';
import { Image } from "react-native";

export default Infantry = (props) => {
    const cost = 5; const type='army';
    const name = 'Infantry';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/starters/Infantry.jpg')} />
}