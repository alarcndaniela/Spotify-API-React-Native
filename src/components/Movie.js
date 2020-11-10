import React from 'react'
import { View, StyleSheet, Image, Pressable} from 'react-native'
import constants from '../utils/constants';
import { DateTime } from "luxon";

import Text from '../components/TextCustom';

const Luxon = DateTime.local().setLocale("es");

const imageWidth = 99;
const imageMargin = imageWidth + 20 ;

const imageHeight = 133;
const cardTop = imageHeight / 2  ;

const Movie = ({movie, navigation}) => {
    const {title, vote_average, poster_path, popularity, release_date } = movie;
    const date = DateTime.fromISO(release_date).setLocale('es').toFormat('y');
    
    const loadMovie = () => {
        navigation.navigate(constants.SCREEN.DETAILS, {movie});
    };

    return (
        <Pressable style={styles.card} onPress={loadMovie}>
            <Image 
            resizeMode="cover"
            style={styles.poster}
            source={{ 
                uri: `https://image.tmdb.org/t/p/original/${poster_path}`,
            }} 
            />
            <View style={{flex: 1, marginLeft: imageMargin}}>
                <View style={styles.titleContainer}>
                    <Text fontFamily="bold" numberOfLines={2} ellipsizeMode="clip" style={styles.title}>{title}</Text>
                    <Text fontFamily="regular" style={styles.votes}>{vote_average}</Text>
                </View>

                <View style={styles.titleContainer}>
                    <Text fontFamily="regular" style={styles.popularity}>{popularity.toFixed(0)}</Text>
                    <Text fontFamily="regular" style={styles.release_date}>{date}</Text>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: constants.COLORS.LIGHT,
        marginTop: cardTop,
        paddingHorizontal: 20,
        paddingBottom: 20,
        paddingTop: 30,
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "flex-end",
        position: "relative",
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
    },
    title: {
        color: constants.COLORS.TEXT_COLOR,
        fontWeight: 'bold',
        flexGrow: 1,
        flexWrap: "wrap",
        marginRight: 12
    },
    votes: {
        color: constants.COLORS.WARNING,
        fontWeight: "bold",
    },
    popularity: {
        borderColor: constants.COLORS.PRIMARY,
        color: constants.COLORS.PRIMARY,
        borderWidth: 1,
        padding: 2,
        flex: 1,
        width: 40,
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
        width: 40,
        borderRadius: 5,
        textAlign: "center",
        marginTop: 8,
        marginBottom: 8,
        fontWeight: "400",
        fontSize: 12,
    },
    poster: {
        width: imageWidth,
        height: imageHeight,
        borderRadius:10,
        position: "absolute",
        bottom: 20,
        left: 20,
    }
});

export default Movie;
