import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { connect } from 'react-redux';
import SharedArea from '../game/shared_area/index.js';
import PlayerArea from '../game/player_area/index.js';
import OpponentArea from '../game/opponent_area/index.js';

const mapStateToProps = state => {
    return { ...state };
};

class NewGame1 extends React.Component {
	constructor(props) {
		super(props);

		let enemyArr = {};

		for(let i = 1; i <= props.num_of_enemies; i++){
			enemyArr[i] = {
				id: i, 
				expanded: false
			}
		}

		this.state = {
			num_of_enemies: 5,
			enemies: enemyArr, 
		};
	}

	expandEnemy(enemyId, event){
		this.setState((prevState) => {

			let enemies = prevState.enemies, 
				expanded = prevState.enemies[enemyId].expanded;

			Object.keys(enemies).map(id=>{ enemies[id].expanded = false; })

			enemies[enemyId].expanded = !expanded;

			return {...prevState, enemies}

		});
	}

	render() {
		return (
			<View style={styles.container}>
				
				<SharedArea/>

				<Text onPress={this.props.goBack}>Go back</Text>

				<View style={[{top: 0}, styles.opponentContainer]}>
					{Object.keys(this.state.enemies).map(enemyId => {
						let enemy = this.state.enemies[enemyId];
						return (<TouchableOpacity style={styles.opponent} key={enemy.id} onPress={this.expandEnemy.bind(this, enemy.id)}><OpponentArea expanded={enemy.expanded}/></TouchableOpacity>);
					})}
				</View>
			
			</View>
		);
	}
}

const styles = StyleSheet.create({
    container: {
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	opponentContainer:{
		position: 'absolute',
		flexDirection: 'row',
	},
});
  
export default NewGame = connect(mapStateToProps)(NewGame1);