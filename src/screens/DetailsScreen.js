import React, {useEffect, useState} from 'react';
import { View, Pressable, Image, StyleSheet, Dimensions} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { DateTime } from "luxon";
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons, MaterialCommunityIcons} from '@expo/vector-icons';
import axios from "../utils/axios"

import Text from '../components/TextCustom'; 

import constants from "../utils/constants";

import Stars from "../components/Stars";
import CastandCrew from "../components/CastandCrew";

const {width, height} = Dimensions.get('screen');

const imageWidth = 129;
const imageMargin = imageWidth + 20 ;

const imageHeight = 180;


export const DetailsScreen = ({ navigation, route }) => {
    const { movie } = route.params;

    const date = DateTime.fromISO(movie.release_date).setLocale('es').toFormat('y');

    const [cast, setCast] = useState([]);
    const [crew, setCrew] = useState([]);

    React.useEffect(() => {
        axios.get(`movie/${movie.id}/credits?api_key=${constants.API_KEY}&language=es-ES`)
        .then((res) => {
          setCast(res.data.cast);
          setCrew(res.data.crew);
        })
        .catch((err) => console.log(err));
    }, [setCast, setCrew]);

    
    useEffect(() => {
        navigation.setOptions({
            headerLeft: (props) => {
                return (
                <View style={styles.containerButtonIcon} >
                    <MaterialIcons name="arrow-back" size={24} color={constants.COLORS.PRIMARY} {...props}  />
                </View>)
            },
            headerRight: () => {
                return ( 
                <View style={styles.containerButtonIcon}>
                    <MaterialCommunityIcons name="dots-horizontal" size={24} color={constants.COLORS.PRIMARY} />
                </View>)
            },
        });
    });


    return (
        <ScrollView  style={styles.container} stickyHeaderIndices={[1]}>
            <View style={styles.imageContainer}>
                <Image 
                    style={[StyleSheet.absoluteFill, styles.cover]}
                    blurRadius={5}
                    source={{ uri: `https://image.tmdb.org/t/p/original/${movie.backdrop_path}` }}
                ></Image>
                <View style={styles.backdrop}/>
            </View>

            <View style={styles.content}>
                 <Image
                    resizeMode="cover"
                    style={styles.poster}
					source={{
						uri: `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
					}}/>

                <View style={{flex: 1, marginLeft: imageMargin}}>
                    <View style={styles.titleContainer}>
                        <Text fontFamily="bold" numberOfLines={2} ellipsizeMode="clip" style={styles.title}>{movie.title}</Text>
            
                    </View>

                    <View style={styles.numbersContainer}>
                        <Text fontFamily="regular" style={styles.popularity}>{movie.popularity.toFixed(0)}</Text>
                        <Text fontFamily="regular" style={styles.release_date}>{date}</Text>
                    </View>

                     <View style={{flexDirection: "row", alignItems: "baseline"}}>
                        <Stars realVotes={Math.floor(movie.vote_average / 2)}/>
                        <Text fontFamily="regular" style={styles.votes}>{movie.vote_average}</Text>
                    </View>
                </View>
                <View style={styles.content2}>
                    <View style={styles.secondaryContent}>
                        <Text fontFamily="bold" style={styles.title}>Resumen</Text>
                        <Text fontFamily="regular" style={styles.paragraph}>{movie.overview} </Text>
                    </View>
                <CastandCrew navigation={navigation} cast={cast} />
                <CastandCrew navigation={navigation} crew={crew} />
                </View>
                </View>
            <View style={{height:600}}></View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: constants.COLORS.LIGHT,
    },
    imageContainer: {
        position: "relative",
        width,
        height: height / 3,
    },
    cover: {
        width: null,
        height: null,
        zIndex: 8,
    },
    backdrop:{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: constants.COLORS.PRIMARY,
        opacity: 0.7,
        zIndex: 10,
    },
	content: {
		position: 'relative',
		width,
		padding: 25,
		paddingBottom: 0,
		backgroundColor: constants.COLORS.LIGHT,
		borderTopLeftRadius: 25,
		borderTopRightRadius: 25,
		top: -25,
		zIndex: 10,
	},
    secondaryContent: {
        marginTop:50,
    },
	content2: {
		position: 'relative',
		width,
        paddingHorizontal: 20,
        marginStart: -20,
		backgroundColor: constants.COLORS.LIGHT,
		zIndex: 9,
	},

    titleContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
    },
    numbersContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        marginTop: 8,
    },
    title: {
        color: constants.COLORS.TEXT_COLOR,
        fontWeight: 'bold',
        flexGrow: 1,
        flexWrap: "wrap",
        marginRight: 12,
    },
    votes: {
        color: constants.COLORS.WARNING,
        fontWeight: "bold",
        fontSize: 16,
        marginLeft:8,
        marginTop: 8,
    },
    popularity: {
        borderColor: constants.COLORS.PRIMARY,
        color: constants.COLORS.PRIMARY,
        borderWidth: 1,
        padding: 2,
        flex: 1,
        width: 30,
        borderRadius: 5,
        textAlign: "center",
        marginTop: 8,
        marginBottom: 8,
        fontWeight: "400",
        fontSize: 12,
    },
    release_date: {
        borderColor: constants.COLORS.WARNING,
        color: constants.COLORS.WARNING,
        borderWidth: 1,
        padding: 2,
        margin:10,
        flex: 1,
        width: 30,
        borderRadius: 5,
        textAlign: "center",
        marginTop: 8,
        marginBottom: 8,
        fontWeight: "400",
        fontSize: 12,
    },
	poster: {
		position: 'absolute',
		width: imageWidth,
		height: imageHeight,
		borderRadius: 16,
		top: -90,
		left: 0,
	},
    starsContainer:{
        flexDirection: "row",
    },
    paragraph: {
        marginTop: 25,
        fontSize: 14,
        fontWeight: "300",
        color: constants.COLORS.GRAY,
        lineHeight: 22,
    },
    containerButtonIcon: {
        backgroundColor: constants.COLORS.LIGHT,
        opacity: .4,
        borderRadius: 20,
        height:30,
        width: 30,
        marginHorizontal:20,
        justifyContent: "center",
        alignItems: "center",
    },
});
