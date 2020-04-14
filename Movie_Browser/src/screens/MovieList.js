import React, { Component } from 'react'
import { Text, View, FlatList, SafeAreaView, StyleSheet, RefreshControl, Platform } from 'react-native'
import { MOVIE_LISTURL, BASE_URL, MOVIE_SEARCH } from '../components/Network/URL'
import NetInfo from "@react-native-community/netinfo";
import { SearchBar } from 'react-native-elements';
import { Loader, MovieCard } from '../components/common/Common';
import { BACKGROUND, DISABLED, verticalScale, scale } from '../components/common/Constants';


export default class MovieList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            isRefresh: false,
            movieList: [],
            search: ''
        }
    }

    componentDidMount() {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                this.getMoviesFromApi()
            } else {
                alert("No Internet Available")
            }
        })
    }

    getMoviesFromApi = () => {
        this.setState({ loading: true })
        try {
            let url = BASE_URL + MOVIE_LISTURL
            fetch(url)
                .then(res => res.json())
                .then(res => {
                    this.setState({ loading: false, movieList: res.items, isRefresh: false })
                })
                .catch((error) => {
                    console.error(error);
                });
        } catch (error) {
            console.error(error)
        }
    }

    updateSearch = search => {
        this.setState({ search })
        try {
            if (search != "") {
                let url = BASE_URL + MOVIE_SEARCH + search
                fetch(url)
                    .then(res => res.json())
                    .then(res => {
                        this.setState({ movieList: res.results })
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } else {
                this.componentDidMount()
            }
        } catch (error) {
            console.error(error)
        }
    };

    listEmpty = () => {
        return (!this.state.loading &&
            <View style={styles.emptylistview}>
                <Text>No Results Found</Text>
            </View>
        )
    }

    _handleRefresh = () => {
        this.setState({ isRefresh: true }, () => this.getMoviesFromApi())
    }


    render() {
        return (
            <SafeAreaView style={styles.container}>
                {this.state.loading && <Loader />}
                <SearchBar round lightTheme placeholder="Search" value={this.state.search}
                    containerStyle={{ backgroundColor: '#FFF' }} inputContainerStyle={{ backgroundColor: DISABLED }}
                    onChangeText={this.updateSearch} onClear={this.getMoviesFromApi} />
                <FlatList
                    extraData={this.state}
                    numColumns={2}
                    data={this.state.movieList}
                    renderItem={({ item }) => <MovieCard item={item} navigation={this.props.navigation} />}
                    keyExtractor={item => item.id}
                    ListEmptyComponent={this.listEmpty}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefresh}
                            onRefresh={this._handleRefresh}
                        />
                    }
                />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUND
    },
    emptylistview: {
        top: Platform.OS === 'ios' ? verticalScale(200) : 0,
        alignItems: "center",
        justifyContent: "center",
        padding: scale(10)
    },
})