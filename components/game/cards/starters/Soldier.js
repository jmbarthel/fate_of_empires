import React from 'react';
import { Image } from "react-native";

export default Soldier = (props) => {
    const cost = 5; const type='army';
    const name = 'Soldier';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/starters/Soldier.jpg')} />
}