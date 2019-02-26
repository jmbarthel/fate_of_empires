import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';


const mapStateToProps = state => {
    return { ...state };
};

class ExpandedCapital1 extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		return (
			<View style={styles.container}>

                <View style={styles.cardRow}>
                    <Text style={styles.labelText}>Workers:</Text>
                    {this.props.capital.workers.map((card, i) => {
                        return <TouchableOpacity key={i} onPress={() => this.props.expandHandCard(card({num: i, expanded: true, capital: true}))} style={styles.card}>{card({hand: true})}</TouchableOpacity>;
                    })}
                </View>

				<View style={styles.cardRow}>
                    <Text style={styles.labelText}>Armies:</Text>
                    {this.props.capital.armies.map((card, i) => {
                        return <TouchableOpacity key={i} onPress={() => this.props.expandHandCard(card({num: i, expanded: true, capital: true}))} style={styles.card}>{card({hand: true})}</TouchableOpacity>;
                    })}
                </View>

				<View style={styles.cardRow}>
                    <Text style={styles.labelText}>Other:</Text>
                    {this.props.capital.other.map((card, i) => {
                        return <TouchableOpacity key={i} onPress={() => this.props.expandHandCard(card({num: i, expanded: true, capital: true}))} style={styles.card}>{card({hand: true})}</TouchableOpacity>;
                    })}
                </View>

                <Ionicons 
					style={styles.close} 
					name="md-close" 
					size={32} 
					color="white" 
					onPress={this.props.closeCapital}
				/>

			</View>
		);
	}
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(100, 100, 100, 0.7)',
        position: 'absolute',
    },
    cardRow: {
        height: '30%', 
        width: '70%',
        // backgroundColor: '#fff',
        margin: 5,
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    card: {
        height: '100%',
        width: '20%',
        margin: 5, 
        borderWidth: 2, 
        borderColor: '#000',
        borderRadius: 10,
    },
    labelText: {
        transform: [
            {rotate: '-90deg'}
        ],
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
        textShadowColor:'#000',
        textShadowOffset:{
            width: 1,
            height: 1
        },
        textAlign: 'center',
        textShadowRadius: 1,
        height: 20,
        top: 50
    },
    close: {
        top: 10, 
        right: 10,
        position: 'absolute'
    }
});
  
export default ExpandedCapital = connect(mapStateToProps)(ExpandedCapital1);