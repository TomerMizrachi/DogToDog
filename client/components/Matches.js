import React from 'react';
import { StyleSheet, View, Text, Platform, TouchableOpacity } from 'react-native';
import { IconButton } from './IconButton';
import { AuthContext } from '../context/AuthContext';
import { UserContext } from '../context/UserContext';


export default function Matches({ navigation }) {
    const state = React.useContext(UserContext);
    const { logout } = React.useContext(AuthContext);

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
    }, [navigation, logout]);

    return (
        <View style={styles.container}>
            <Text></Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fce4ec',
    },
    back: {
        marginRight: 16
    },
});