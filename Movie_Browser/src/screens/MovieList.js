import React, { Component } from 'react'
import { Text, View, FlatList, SafeAreaView, StyleSheet, RefreshControl, Platform } from 'react-native'
import { MOVIE_LISTURL, BASE_URL, MOVIE_SEARCH } from '../components/Network/URL'
import NetInfo from "@react-native-community/netinfo";
import { SearchBar } from 'react-native-elements';
import { Loader, MovieCard, LoadMoreButton } from '../components/common/Common';
import { BACKGROUND, DISABLED, verticalScale, scale } from '../components/common/Constants';
import { UserCotext } from '../App';


export default class MovieList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            isRefresh: false,
            movieList: [],
            search: '',
            page:null,
            morePress:false,
            total_pages:''
        }
    }

    componentDidMount() {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                this.getMoviesFromApi(1)
            } else {
                alert("No Internet Available")
            }
        })
    }

    getMoviesFromApi = (page) => {
        this.setState({ loading: true })
        try {
            let url = BASE_URL + MOVIE_LISTURL + page
            fetch(url)
                .then(res => res.json())
                .then(res => {
                    var joined =this.state.movieList.concat(res.results)
                    this.setState({ loading: false,movieList: joined ,page:page, isRefresh: false, morePress:false,total_pages:res.total_pages })
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
                this.setState({movieList:[]})
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
        this.setState({ isRefresh: true,movieList:[] }, () => this.getMoviesFromApi(1))
    }


    render() {
        const {movieList,page,morePress,loading,search,isRefresh,total_pages} = this.state
        return (
            <UserCotext.Consumer>
                {(context)=>
            <SafeAreaView style={styles.container}>
                {loading && <Loader />}
                <SearchBar round lightTheme placeholder="Search" value={search}
                    containerStyle={{ backgroundColor: '#FFF' }} inputContainerStyle={{ backgroundColor: DISABLED }}
                    onChangeText={this.updateSearch} 
                    />
                <FlatList
                    extraData={this.state}
                    numColumns={2}
                    data={movieList}
                    renderItem={({ item }) => <MovieCard item={item} navigation={this.props.navigation} />}
                    keyExtractor={item => item.id}
                    ListFooterComponent={(search != '') || (page == total_pages) || (loading && !morePress) ? null :
                    <LoadMoreButton loading={morePress?true:false} onPress={()=>{this.getMoviesFromApi(page+1),this.setState({morePress:true})}}/>
                      }
                    ListEmptyComponent={this.listEmpty}
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefresh}
                            onRefresh={this._handleRefresh}
                        />
                    }
                />
            </SafeAreaView>
            }
            </UserCotext.Consumer>
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