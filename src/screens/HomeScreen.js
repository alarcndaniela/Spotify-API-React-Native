import React, {Component} from 'react'
import { View, SafeAreaView, ActivityIndicator, StyleSheet } from 'react-native';
import spotify_token from '../utils/spotifyToken';
import spotify_search from '../utils/spotifySearch';
import ItemsList from '../components/ItemsList';
import Searchbar from '../components/SearchBar';
import constants from '../utils/constants';


const PAGE = 20;

class HomeScreen extends Component {
    constructor(props){
        super(props);
    
        this.state = {
            songs: [],
            offset: 0,
            query: "",
            isFetching: false,
            isEmpty: false,
            spotify_token: null,
            isTokenFetching: false
        };
    }

    async componentDidMount() {
        await this.refreshToken();
        await this.loadNextPage();
    }

    async USAFE_componentWillMount(){
        this.refreshToken();
        this.loadNextPage();
    }

    handleSearchChange(text) {
        this.setState(
            {
                songs: [],
                offset: 0,
                query: text,
                isEmpty: false,
            },
            () => {
                this.loadNextPage();
            }
        );
    }

    async loadNextPage() {
        const {
            songs,
            offset,
            query,
            spotify_token,
            isFetching,
            isEmpty
        } = this.state;

        if(isFetching || isEmpty){
            return;
        }

        this.setState({isFetching : true});

        const newSongs = await spotify_search({
            offset: offset,
            limit: PAGE,
            q: query,
            spotify_token
        });

        if(newSongs.length === 0){
            console.log('no songs');
            this.setState({isEmpty:true});
        }

        this.setState({
            isFetching: false,
            songs: [...songs, ...newSongs],
            offset: offset + PAGE
        });
    }

    async refreshToken() {
        this.setState({
            isTokenFetching: true
        });

        const newToken = await spotify_token();

        this.setState({
            spotify_token: newToken,
            isTokenFetching:false
        });
    }

    async handleEndReached(){
        await this.loadNextPage();
    }

    render() {
        const { query, songs, isFetching } = this.state;
        return (
            <SafeAreaView  style={styles.container}>
                <Searchbar
                    onChange={text =>this.handleSearchChange(text)}
                    text={query}
                />
            <View>
                {isFetching && songs.length === 0 ? (
                    <ActivityIndicator/>
                ) : (
                    <ItemsList
                        navigation={this.props.navigation}
                        route={this.props.route}
                        items={songs}
                        onEndReached={() => this.handleEndReached()}
                    />
                )}
            </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: constants.COLORS.GRAY,
        marginTop: Platform.OS !== 'ios' ? 20 : 0,
    },
});

export default HomeScreen;