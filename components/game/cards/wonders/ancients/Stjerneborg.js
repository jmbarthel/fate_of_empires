import React from 'react';
import { Image } from "react-native";

export default Stjerneborg = (props) => {
    props = {
        ...props, 
        type: 'ancient_wonder', 
        name: 'Stjerneborg', 
        cost: {
            gold: 0,
            influence: 0, 
            science: 4,
        },
    }
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../../assets/wonders/ancients/Stjerneborg.jpg')} />
}