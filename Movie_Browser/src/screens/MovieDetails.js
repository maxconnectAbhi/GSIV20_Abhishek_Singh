import React, { Component } from 'react'
import { Text, View, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import { Image } from 'react-native-elements'
import { verticalScale, BACKGROUND, GRAY, scale, LIGHTGRAY } from '../components/common/Constants'
import { IMAGE_BASE_URL } from '../components/Network/URL'
import { UserCotext } from '../App'

export default class MovieDetails extends Component {
    render() {
       // const item = this.props.navigation.getParam('item', 'empty')
        return (
            <UserCotext.Consumer>
                {(context)=>
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <Image source={{ uri: IMAGE_BASE_URL + context.state.item.poster_path }} style={styles.image} resizeMode="stretch" />
                    <View style={styles.textView}>
                        <Text style={styles.title}>{context.state.item.original_title}</Text>
                        <Text style={styles.rating}> ({context.state.item.vote_average})</Text>
                    </View>

                    <View style={styles.dateView}>
                        <Text style={{ fontSize: scale(20) }}>{context.state.item.release_date}</Text>
                    </View>

                    <Text style={{ fontSize: scale(20) }}>Description:  {context.state.item.overview}</Text>
                </ScrollView>
            </SafeAreaView>
          }
            </UserCotext.Consumer>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUND,
        margin: 12
    },
    image: {
        width: '100%',
        height: verticalScale(400)
    },
    textView: {
        flexDirection: 'row',
        marginTop: verticalScale(10)
    },
    title: {
        fontWeight: 'bold',
        color: GRAY, fontSize: scale(20),
        maxWidth: '85%'
    },
    rating: { 
        fontWeight: 'bold',
        color: LIGHTGRAY, 
        fontSize: scale(20) 
    },
    dateView:{ 
        flexDirection: 'row', 
        marginVertical: verticalScale(15) 
    }

})