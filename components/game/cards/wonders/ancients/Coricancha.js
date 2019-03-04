import React from 'react';
import { Image } from "react-native";

export default Coricancha = (props) => {
    props = {
        ...props, 
        type: 'ancient_wonder', 
        name: 'Coricancha', 
        cost: {
            gold: 12,
            influence: 10, 
            science: 8,
        },
    }
        
    if(props.expanded){
        return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../../assets/wonders/ancients/Coricancha.jpg')} />
    } else{
        return <Image style={{
            width: props.layout.width, 
            maxHeight: props.layout.height,
            ...props.style
        }} 
        resizeMode='contain'
        props={props} source={require('../../../../../assets/wonders/ancients_sprites/Coricancha.png')} />
    }
}