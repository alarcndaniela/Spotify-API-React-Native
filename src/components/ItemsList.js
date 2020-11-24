import React, { Component } from "react";
import {FlatList, StyleSheet, View, Dimensions} from "react-native";
import Text from '../components/TextCustom';
import constants from "../utils/constants";
import Item from "./Item";

const {height} = Dimensions.get('screen');

export default ({ items, navigation, onEndReached}) => (
    <FlatList 
        data={items}
        renderItem={( {item} ) => 
            <Item item={item} navigation={navigation} />
        }
        keyExtractor={(item) => `${item.id}`}
        onEndReached={onEndReached}
        ListEmptyComponent={() => 
            <View style={styles.container}>
                <Text style={styles.title} fontFamily="regular">No songs found</Text>
            </View>
        }
    />
);
const styles = StyleSheet.create({
    container:{
        position: "relative",
        height,
        justifyContent: "center",
        alignItems: "center",
    },
    title:{
        width: 180,
        textAlign: "center",
        marginBottom: 160,
        fontSize: 22,
        color: constants.COLORS.LIGHT_GRAY,
    },
});

