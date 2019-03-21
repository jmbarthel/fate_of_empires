import React from 'react';
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { connect } from 'react-redux';
import TheInternet from '../cards/wonders/moderns/TheInternet';


const mapStateToProps = state => {
    return { ...state };
};

class Wonder1 extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            layout: {
                width: 0, 
                height: 0
            }
        }
    }
    
    onPress(){
        if(this.props.turn === this.props.playerNumber){
            this.props.expandWonderCard(this.props.card.card({num: this.props.num, expanded: true, progress: this.props.card.progress, claimedBy: this.props.card.claimedBy}));
        } else{
            alert('Not your turn.');
        }
    }

	render() {
		return (
                <View 
                    style={[this.props.style, styles.wonder, {width: (100/this.props.number_of_wonders)+'%'}]}
                    onLayout={(e) => {
                        let {x, y, width, height} = e.nativeEvent.layout;
                        this.setState({layout: {width, height}})
                    }}
                >
                    <TouchableOpacity onPress={this.onPress.bind(this)}>
                        {this.props.card.card({
                            layout: this.state.layout, 
                            style: {
                                borderRadius: 25,
                            }
                        })}
                    </TouchableOpacity>
                    
                </View>
		);
	}
}

const styles = StyleSheet.create({
    wonder: {
        // borderRadius: 25, 
		// borderColor: '#000',
		// borderWidth: 1,
        height: '100%',
        // backgroundColor: '#000',
        // margin: 3,
    }
});
  
export default Wonder = connect(mapStateToProps)(Wonder1);