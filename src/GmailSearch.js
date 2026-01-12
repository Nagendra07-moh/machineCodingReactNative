import { StyleSheet, Text, View, TextInput, FlatList, Pressable } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'

const GmailSearch = () => {
    const [data, setData] = useState([])
    const [filteredTxt, setFilteredTxt] = useState([])
    const [searchTxt, setSearchTxt] = useState("")
    const [selectedPills,setSelectedPills] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('https://jsonplaceholder.typicode.com/posts')
            const resData = await res.json()
            setData(resData.map((item) => ({
                ...item,
                isSelected: false
            })))
        }
        fetchData()
    }, [])

    const highlightText = (text, search) => {  //practice again
        if (!search) return <Text>{text}</Text>

        let lowerCaseText = text.toLowerCase()
        let lowerCaseSearch = search.toLowerCase()

        let startingIndex = lowerCaseText?.indexOf(lowerCaseSearch)

        if (startingIndex === -1) return <Text>{text}</Text>

        let endIndex = startingIndex + search?.length

        return (
            <Text>
                <Text>{text.substring(0, startingIndex)}</Text>
                <Text style={{ backgroundColor: '#FFD54F', fontWeight: '600' }}>
                    {text.substring(startingIndex, endIndex)}
                </Text>
                <Text>{text.substring(endIndex, text.lengthd)}</Text>
            </Text>
        )
    };

    const onSelect = (item,index) => {
        setFilteredTxt((prev) => prev?.map((item,i) => i === index ? {...item, isSelected : !item?.isSelected} : item))
        setSelectedPills((prev) => [...prev , item])
    }

    const renderPopupData = useCallback(
        ({ item, index }) => (
            <Pressable style={{ backgroundColor: item?.isSelected ? '#FFAAB8' :  index % 2 === 0 ? '#A8DF8E' : '#F0FFDF', paddingVertical: 8 }}
                onPress={() => onSelect(item,index)}
            >
                {highlightText(item.title, searchTxt)}
            </Pressable>
        ),
        [searchTxt]
    );

    const onChangeSearchText = (text) => {
        setSearchTxt(text);
        setFilteredTxt(() => data.filter((item) =>
            item.title.toLowerCase().includes(text.toLowerCase())
        ));
    };
    return (
        <View style={styles.container}>
            <View>
                
            </View>
            <View>
                <TextInput
                    value={searchTxt}
                    style={styles.searchBox}
                    placeholder='Search....'
                    onChangeText={(txt) => onChangeSearchText(txt)}
                />
            </View>
            <View style={{ width: 300, height: 660 }}>
                {searchTxt?.length ?
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