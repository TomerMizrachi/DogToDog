import React from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity, Image, Button } from 'react-native';
import { IconButton } from './IconButton';
import { AuthContext } from '../context/AuthContext';
import { UserContext } from '../context/UserContext';

export default function Matches({ navigation }) {
    const state = React.useContext(UserContext);
    const { logout } = React.useContext(AuthContext);

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Image
                source={{ uri: item.image }}
                style={styles.image}
            >
            </Image>
            <View style={styles.info}>
                <Text style={styles.text}> Name: {item.name}</Text>
                <Text style={styles.text}> Age: {item.age}</Text>
                <Text style={styles.text}> Email: {item.email}</Text>
                <Text style={styles.text}> Breed: {item.breed}</Text>
            </View>
            <TouchableOpacity title={'button'} style={styles.button}>
                <Text style={styles.btntext}>Chat</Text>
            </TouchableOpacity>
        </View>
    );


    React.useEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: '#fce4ec',
            }, headerTitleStyle: {
                color: '#b4004e'
            },
            headerRight: () => <IconButton
                style={styles.back}
                name="logout"
                onPress={() => {
                    logout();
                }}
            />
        })
    }, [navigation, state, logout]);

    return (
        <View style={styles.container}>
            <FlatList
                data={state.matches}
                renderItem={renderItem}
                keyExtractor={item => item._id}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fce4ec',
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        borderColor: '#b4004e',
        borderWidth: 1
    },
    image: {
        width: 140,
        height: 145,
        margin: 5
    },
    info: {
        flex: 1,
        flexDirection: 'column',
    },
    text: {
        color: '#b4004e',
        padding: 8,
        fontSize: 16,
    },
    button: {
        margin:10,
        alignSelf: 'center',
        padding: 20,
        backgroundColor: '#b4004e',
    },
    btntext: {
        color: '#fff',
        fontWeight: 'bold'
    },
    back: {
        marginRight: 16
    },
});