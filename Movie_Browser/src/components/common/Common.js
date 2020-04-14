import React from 'react';
import { View, Text, ActivityIndicator, TouchableWithoutFeedback } from "react-native";
import { Card } from 'react-native-elements';
import { BLUE, verticalScale, GRAY, DISABLED } from './Constants';
import { IMAGE_BASE_URL } from '../Network/URL'
import { CommonStyle } from './Styles';

export const Loader = () => {
  return (
    <View style={CommonStyle.loading}>
      <ActivityIndicator size="large" color={BLUE}/>
    </View>
  )
}

export const MovieCard = ({ item, navigation }) => {
  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate('Details', { item: item })}>
      <Card image={{ uri: IMAGE_BASE_URL + item.poster_path }} imageStyle={{ overflow: 'hidden', height: verticalScale(260) }}
        containerStyle={{ width: '45%', margin: 9, borderRadius: 15, overflow: 'hidden', backgroundColor: DISABLED }}>
        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
          <Text style={{ width: '80%', color: BLUE }}>{item.original_title}</Text>
          <Text style={{ color: GRAY }}>({item.vote_average})</Text>
        </View>
        <Text numberOfLines={2} style={{ color: GRAY, fontSize: 12, marginTop: 10 }}>{item.overview}</Text>
      </Card>
    </TouchableWithoutFeedback>
  )
}

