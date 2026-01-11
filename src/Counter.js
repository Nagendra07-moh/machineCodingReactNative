import { StyleSheet, Text, View , Button } from 'react-native'
import React from 'react'
import { useCounter } from '../hooks/useCounter'

const Counter = () => {
  const {
        count,
        pause,
        play,
        reset
    } = useCounter();
  return (
    <View 
      style={{flex:1,alignItems:'center',justifyContent:'center'}}
    >
      <View style={{flexDirection:'row'}}>
        <Text style={{fontSize:24,fontWeight:'700'}}>{count.HH}:</Text>
        <Text style={{fontSize:24,fontWeight:'700'}}>{count.MM}:</Text>
        <Text style={{fontSize:24,fontWeight:'700'}}>{count.SS} </Text>
      </View>
      <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
        <Button title='Play' onPress={play}/>
        <Button title='pause' onPress={pause}/>
        <Button title='reset' onPress={reset}/>
      </View>
    </View>
  )
}

export default Counter

const styles = StyleSheet.create({})