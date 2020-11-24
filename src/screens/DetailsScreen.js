import React from 'react';
import { View, Image, StyleSheet, Dimensions, Linking} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Text from '../components/TextCustom'; 
import constants from "../utils/constants";
import {FontAwesome} from "@expo/vector-icons";

import GradientButton from 'react-native-gradient-buttons';
import { LinearGradient } from 'expo-linear-gradient';


const {width} = Dimensions.get('screen');
const coverHeight = 400;


export default class DetailsScreen extends React.Component  {   
    constructor(props){
        super(props);
    }
    
    render() {
        item = this.props.route.params.item;
        return (
            <ScrollView style={styles.container} stickyHeaderIndices={[1]}>
                <View style={styles.imageContainer}>
                    <Image 
                        style={[StyleSheet.absoluteFill, styles.cover]}
                        resizeMode="cover"
                        source={{uri:item.imageUri}}
                    />
                    <LinearGradient
                         // Background Linear Gradient
                        colors={[
                            'transparent', 
                            'rgba(0,0,0,10)'
                        ]}
                        style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: 0,
                            height: 400,
                            zIndex: 11,
                        }}
                    />
                    <Text fontFamily="regular"  numberOfLines={2} style={styles.type}>{item.type}</Text> 
                    <Text fontFamily="bold"  numberOfLines={2} style={styles.title}>{item.title}</Text> 
                    <View style={styles.backdrop}/>
                </View>

                <View style={styles.content}>
                    <View style={styles.horizontalContent}> 
                        <Text fontFamily="regular" style={styles.subtitle}>{item.artist} </Text>
                    </View >
                    
                    <View style={styles.horizontalContent}> 
                        <Text fontFamily="bold" style={styles.subtitle}>Popularity: </Text>
                        <Text fontFamily="regular" style={styles.subtitle}>{item.popularity} </Text>
                        <FontAwesome style={styles.star}
                            name='star'
                            size={22}
                            color={constants.COLORS.LIGHT_GRAY}
					    />
                    </View>
                    
                    <GradientButton
                        style={{ margin: 40}}
                        text="OPEN IN SPOTIFY"
                        textStyle={{ fontSize: 20}}
                        gradientBegin={constants.COLORS.PRIMARY}
                        gradientEnd={constants.COLORS.SECONDARY}
                        gradientDirection="diagonal"
                        height={60}
                        width={300}
                        radius={30}
                        impact
                        impactStyle='Light'
                        onPressAction={ ()=>{ Linking.openURL(item.spotify)}}
                    />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: constants.COLORS.GRAY,
    },
    imageContainer: {
        position: "relative",
        height: coverHeight,
        justifyContent: "flex-end"
    },
    cover: {
        width: null,
        height: coverHeight,
        zIndex: 8,
    },
    title:{
       textAlign: "center",
       alignSelf: "center",
       width: width/1.2,
       zIndex: 12,
       fontSize: 28,
       marginBottom: 30,
       color: constants.COLORS.LIGHT,
    },
    type:{
        textAlign: "center",
        alignSelf: "center",
        width: width/1.2,
        zIndex: 12,
        fontSize: 18,
        color: constants.COLORS.LIGHT,
        opacity: 0.6,
     },
    subtitle:{
        textAlign: "center",
        alignSelf: "center",
        zIndex: 12,
        fontSize: 28,
        color: constants.COLORS.LIGHT,
    },
    star:{
        textAlign: "center",
        alignSelf: "center",
        zIndex: 12,
    },
    backdrop:{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        opacity: 0.7,
        zIndex: 10,
    },
    content: {
        position: 'relative',
        width,
        padding: 25,
        paddingBottom: 0,
        backgroundColor: constants.COLORS.GRAY,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        top: -25,
        zIndex: 10,
    },
    horizontalContent:{
        textAlign: "center",
        alignSelf: "center",
        flex: 1,
        flexDirection: "row",
    },
    buttonSpotify: {
        backgroundColor: constants.COLORS.PRIMARY,
        borderRadius:30,
    },
    button:{
        color: constants.COLORS.LIGHT,
    }
});
