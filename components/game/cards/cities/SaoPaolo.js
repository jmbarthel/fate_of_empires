import React from 'react';
import { Image } from "react-native";
import { gainResources, gainResourcesPer } from '../cardEffectFuncs/utilities.js';

export default SaoPaolo = (props) => {
    props = {
        ...props, 
        type: 'city', 
        name: 'SaoPaolo', 
        cost: {
            gold: 0,
            influence: 6, 
            science: 0,
        },
        choiceCount: 2, 
        choices: {
            1: [gainResources.bind(this, {influence: 2})],
            2: [gainResourcesPer.bind(this, 1, 'any', 'eachWorkerOnCapital')],
            // 1: {
            //     produceResource: {
            //         influence: 2,
            //     }
            // },
            // 2: {
            //     produceResource: {
            //         eachWorkerOnCapital: {
            //             any: 1
            //         }
            //     }
            // }
        }
    }
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/cities/SaoPaolo.jpg')} />
}