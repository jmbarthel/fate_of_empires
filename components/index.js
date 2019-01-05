import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';


const mapStateToProps = state => {
    return { ...state };
};

class Index1 extends React.Component {
    render() {
      return (
        <View style={styles.container}>
            <Text>Root Game Component</Text>
        </View>
      );
    }
  }
  
export default Index = connect(mapStateToProps)(Index1);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  