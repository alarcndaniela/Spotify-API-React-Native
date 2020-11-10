import React from 'react'
import { View, StyleSheet, Pressable, Image } from 'react-native'
import constants from "../utils/constants";
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';

import Text from '../components/TextCustom';


const CastandCrew = ({ navigation, cast, crew}) => {
    let newItems;
    console.log(cast);
    console.log(crew);

    if(cast){
        newItems = [...cast].slice(0, 4);
    } else {
        newItems = [...crew].slice(0, 4);
    }
  
    const gotoCastCrewDetails = () => {
        navigation.navigate(constants.SCREEN.CASTANDCREW, {
            crew,
            cast,
        });
    };

    return (
        <View style={styles.container}> 
            <View style={styles.titleContainer}>
                <Text fontFamily="bold" style={styles.title}>{cast ? "Actores" : "Productores"}</Text>
                <Pressable onPress={gotoCastCrewDetails}>
                    <Text fontFamily="regular" style={styles.seemore}>
                        Ver Todos <AntDesign name="right" size={12} color={constants.COLORS.GRAY} />
                    </Text>
                </Pressable>
              
            </View>
            <View style={styles.castContainer}>
            {newItems && newItems.map((item, index) => 
                item.profile_path ? (
                    <Image 
                        key={index}
                        resizeMode='cover' 
                        style={styles.image} 
                        source={{ 
                            uri: `https://image.tmdb.org/t/p/original/${item.profile_path}` 
                        }}
                    />
                ) : (
                    <View style={styles.iconContainer}>
					    <Ionicons name="md-person" size={60} color={constants.COLORS.GRAY} />
					</View>
                    )               
                )}
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        marginTop: 25,
    },
    titleContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center",
    },
    title: {
        color: constants.COLORS.TEXT_COLOR,
        fontWeight: 'bold',
        flexGrow: 1,
        flexWrap: "wrap",
        marginRight: 12,
    },
    castContainer:{
        marginTop: 25,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    image: {
        width: 70, 
        height: 70, 
        borderRadius: 80,
    },
    seemore:{
        color: constants.COLORS.GRAY,
        fontSize: 12,
        justifyContent: "flex-start",
        alignItems: "center"
    },
    iconContainer: {
        backgroundColor: constants.COLORS.LIGHT_GRAY,
        width: 70,
        height: 70,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 80,
    },
});

export default CastandCrew;
