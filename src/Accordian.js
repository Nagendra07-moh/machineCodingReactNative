import { useState } from 'react'
import { StyleSheet, Text, View, FlatList, Pressable,TextInput } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
const data = [
  {
    key: "Personal Information",
    value: [
      {
        key: "Name",
        value: "",
        isMandatory: true,
      },
      {
        key: "Email",
        value: "",
        isMandatory: true,
      },
      {
        key: "Phone",
        value: "",
        isMandatory: true,
      },
      {
        key: "Extension",
        value: "",
        isMandatory: false,
      },
      {
        key: "Country",
        value: "",
        isMandatory: false,
      },
      {
        key: "City/Province",
        value: "",
        isMandatory: false,
      },
    ],
  },
  {
    key: "Billing Address",
    value: [
      {
        key: "Address 1",
        value: "",
        isMandatory: false,
      },
      {
        key: "Address 2",
        value: "",
        isMandatory: false,
      },
      {
        key: "City",
        value: "",
        isMandatory: false,
      },
      {
        key: "State",
        value: "",
        isMandatory: false,
      },
      {
        key: "Zip Code",
        value: "",
        isMandatory: false,
      },
    ],
  },
  {
    key: "Shipping Address",
    value: [
      {
        key: "Address 1",
        value: "",
        isMandatory: false,
      },
      {
        key: "Address 2",
        value: "",
        isMandatory: false,
      },
      {
        key: "City",
        value: "",
        isMandatory: false,
      },
      {
        key: "State",
        value: "",
        isMandatory: false,
      },
      {
        key: "Zip Code",
        value: "",
        isMandatory: false,
      },
    ],
  },
];


export default function Accordian() {
  const [formData, setFormData] = useState(data)
  const [currExpandInd, setCurrExpandInd] = useState(-1)


  const renderInnerData = (innerData) => {
    return (
      <View style={{marginVertical:10}}>
        {innerData?.map((item, index) => (
         <View
          key={index}
          style={{marginVertical:6}}
         >
           <Text 
           key={index}>
            {item.key}{item?.isMandatory && '*'}:</Text>
            <TextInput
              style={styles.input}
              onChangeText={()=>{}}
              value={item.value}
              placeholder="useless placeholder"
              keyboardType="numeric"
            />
         </View>
        ))}
      </View>
    );
  };

  const renderData = ({ item, index }) => {
    return (
      <Pressable
        style={{paddingHorizontal:8,paddingVertical:6,borderRadius:6,borderBottomWidth:1}}
        onPress={() => index === currExpandInd ? setCurrExpandInd(-1) : setCurrExpandInd(index)}
      >
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text>{item?.key}</Text>
        {index === currExpandInd ? <AntDesign name="up" size={12} color="black" /> : <AntDesign name="down" size={12} color="black" />}
        </View>
        
        {index === currExpandInd && renderInnerData(item?.value)}
      </Pressable>
    )
  }
  return (
    <View style={styles.container}>
      <View style={{borderWidth:2,borderColor:'gray',borderRadius:4,borderBottomWidth:1}}>
        <FlatList
          data={formData}
          renderItem={renderData}
          keyExtractor={item => item.key}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 100,
    backgroundColor: 'white',
    padding: 8,
  },
  input: {
    height: 20,
    margin: 4,
    borderWidth: 1,
    padding: 4,
    borderRadius:6
  },

});
