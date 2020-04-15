import React from 'react';
import { View, Text, ActivityIndicator, TouchableWithoutFeedback, StyleSheet } from "react-native";
import { Card, Button } from 'react-native-elements';
import { BLUE, verticalScale, GRAY, DISABLED } from './Constants';
import { IMAGE_BASE_URL } from '../Network/URL'
import { CommonStyle } from './Styles';
import { UserCotext } from '../../App';

export const Loader = () => {
  return (
    <View style={CommonStyle.loading}>
      <ActivityIndicator size="large" color={BLUE}/>
    </View>
  )
}

export const MovieCard = ({ item, navigation }) => {
  return (
    <UserCotext.Consumer>
      {(context)=>
    <TouchableWithoutFeedback onPress={() => {context.globalStateChange('items',item),navigation.navigate('Details')} }>
      <Card image={{ uri: IMAGE_BASE_URL + item.poster_path }} imageStyle={styles.cardImage}
        containerStyle={styles.card}>
        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
          <Text numberOfLines={1} style={styles.title}>{item.original_title}</Text>
          <Text style={{ color: GRAY }}>({item.vote_average})</Text>
        </View>
        <Text numberOfLines={2} style={styles.description}>{item.overview}</Text>
      </Card>
    </TouchableWithoutFeedback>
}
    </UserCotext.Consumer>
  )
}

export const LoadMoreButton = (props)=> {
  return (
    <Button 
    {...props}
  title="Load More"
  raised
  containerStyle={styles.button}
  />
  )
}


const styles = StyleSheet.create({
  card: {
    width: '45%', margin: 9,
   borderRadius: 15,
   overflow: 'hidden',
   backgroundColor: DISABLED 
  },
  cardImage:{ 
    overflow: 'hidden',
     height: verticalScale(260) 
    },
  title:{ 
    width: '80%', 
    color: BLUE 
},
  description:{
     color: GRAY, fontSize: 12,
     marginTop: 10 },
  button: {
      alignSelf:'center',
      width:'40%',
     borderRadius:20,
     overflow:'hidden',
      marginVertical:10
  },
})