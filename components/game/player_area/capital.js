import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { connect } from 'react-redux';
import CapitalCard from './capital_card.js';


const mapStateToProps = state => {
    return { ...state };
};

class Capital1 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<TouchableOpacity style={[this.props.style, styles.container, {flexDirection: 'row', left: 40}]} onPress={this.props.expandCapital}>
					{
						this.props.capital.workers.length > 0
						?
						<View style={[{width: '48%', bottom: 50 - (50*this.props.capital.workers.length)}]}>
							{this.props.capital.workers.map((card, i) => {
								return <CapitalCard key={i} num={i} card={card} hand={true}/>
							})}
						</View>
						: undefined
					}
					{
						this.props.capital.armies.length > 0
						? 
						<View style={[{width: '48%', bottom: 50 - (50*this.props.capital.armies.length), right: 40}]}>
							{this.props.capital.armies.map((card, i) => {
								return <CapitalCard key={i} num={i} card={card} hand={true}/>
							})}
						</View>
						: undefined
					}
					{
						this.props.capital.other.length > 0
						? 
						<View style={[{width: '48%', bottom: 50 - (50*this.props.capital.other.length), right: 80}]}>
							{this.props.capital.other.map((card, i) => {
								return <CapitalCard key={i} num={i} card={card} hand={true}/>
							})}
						</View>
						: undefined
					}
				{this.props.capital.workers.length === 0 && this.props.capital.armies.length === 0
					? <Text style={{color: '#fff'}}>Capital</Text>
					: undefined
				}
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },
});
  
export default Capital = connect(mapStateToProps)(Capital1);