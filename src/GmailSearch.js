import { StyleSheet, Text, View, TextInput, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'

const GmailSearch = () => {
    const [data, setData] = useState([])
    const [filteredTxt, setFilteredTxt] = useState([])
    const [searchTxt, setSearchTxt] = useState("")
    const [showPopup, setShoPopup] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('https://jsonplaceholder.typicode.com/posts')
            const resData = await res.json()
            setData(resData)
        }
        fetchData()
    }, [])

    const renderPopupData = ({ item, index }) => {
        return (
            <View style={{
                backgroundColor: index % 2 === 0 ? '#A8DF8E' : '#F0FFDF',
                paddingVertical:8,
                paddingLeft:2,
                borderRadius:2
            }}>
                <Text>{item?.title}</Text>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <View>
                <TextInput
                    value={searchTxt}
                    style={styles.searchBox}
                    placeholder='Search....'
                    onChangeText={(txt) => setSearchTxt(txt)}
                />
            </View>
            <View style={{ width: 300, height:660}}>
                {showPopup ?
                    <FlatList
                        data={filteredTxt}
                        renderItem={renderPopupData}
                        keyExtractor={(item) => item?.id}
                        showsVerticalScrollIndicator={false}
                    />
                    : <></>}
            </View>
        </View>
    )
}

export default GmailSearch

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 140
    },
    searchBox: {
        borderWidth: 1,
        width: 300,
        paddingLeft: 4,
        paddingVertical: 6,
        borderRadius: 4
    }
})