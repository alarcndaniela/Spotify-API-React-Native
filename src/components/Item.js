import React from 'react'
import { View, Image, StyleSheet, Pressable} from 'react-native'
import { Card } from 'react-native-paper';
import Text from './TextCustom';
import constants from '../utils/constants';

export default class Item extends React.Component  {
    constructor(props){
        super(props);
    }
    
    render() {
        return (
            <Pressable style={styles.card}  onPress={() => this.props.navigation.navigate('Details', {item:this.props.item})}>
                <View style={styles.container}>
                    <Image 
                        resizeMode="cover"
                        style={styles.poster}
                        source={{uri: this.props.item.imageUri}}
                    />
                    <View style={styles.information}>
                        <Text fontFamily="bold" numberOfLines={2} style={styles.title}  ellipsizeMode="clip">{this.props.item.title}</Text>
                        <Text fontFamily="regular" numberOfLines={2} style={styles.album}>{this.props.item.album + "-" + this.props.item.artist}</Text>
                    </View>
                </View>
            </Pressable>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: "row",
    },
    card: {
        position: 'relative',
        padding: 20,
        margin: 20,
		justifyContent: "center",
		backgroundColor: constants.COLORS.LIGHT,
		borderRadius:25,
		top: 10,
        zIndex: 10,
    },
    card2: {
        position: 'relative',
        padding: 20,
        margin: 20,
		justifyContent: "center",
		backgroundColor: "#FFFF",
		borderRadius:25,
		top: 10,
        zIndex: 10,
    },
    information:{
        justifyContent:"center",
        marginStart: 10,
    },
    title: {
        fontWeight: 'bold',
        flexGrow: 1,
        flexWrap: "wrap",
        marginRight: 12
    },  
    album: {
        fontWeight: 'bold',
        flexGrow: 1,
        flexWrap: "wrap",
        marginRight: 12
    },
    poster: {
        width: 70,
        height: 70,
        borderRadius:10,
    },
});
