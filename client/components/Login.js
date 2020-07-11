import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import Error from './Eroor'
import { AuthContext } from '../context/AuthContext';
import { Loading } from './Loading'



export default function Login({ navigation }) {
    const {login} = React.useContext(AuthContext);

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState('');

    return (
        <View style={styles.container}>
            <Loading loading={isLoading} />
            <View style={styles.login}>
                <Text style={styles.header}>DogToDog</Text>
                <Error error={error}></Error>
                <TextInput style={styles.textinput} placeholder="Email"
                    underlineColorAndroid={'transparent'}
                    value={email}
                    onChangeText={setEmail} />
                <TextInput style={styles.textinput} placeholder="Password"
                    secureTextEntry={true}
                    underlineColorAndroid={'transparent'}
                    value={password}
                    onChangeText={setPassword} />
                <TouchableOpacity style={styles.loginbutton}
                    onPress={async () => {
                        try {
                            setIsLoading(true);
                            await login(email, password);
                        } catch (e) {
                            console.log(e)
                            setError(e.message);
                            setIsLoading(false);
                        }
                    }}>
                    <Text style={styles.btntext}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.signupbutton}
                    onPress={() => {
                        navigation.navigate('Registration');
                    }}>
                    <Text style={styles.qtext}>Don't have an acount yet? Sign up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fce4ec',
        paddingLeft: 60,
        paddingRight: 60,
    },
    login: {
        alignSelf: 'stretch'
    },
    header: {
        fontSize: 24,
        color: '#b4004e',
        paddingBottom: 10,
        marginBottom: 50,
        borderBottomColor: '#b4004e',
        borderBottomWidth: 1
    },
    textinput: {
        fontSize: 18,
        alignSelf: 'stretch',
        height: 35,
        marginBottom: 20,
        color: '#000',
        borderBottomColor: '#c48b9f',
        borderBottomWidth: 1,
    },
    loginbutton: {
        alignSelf: 'stretch',
        alignItems: 'center',
        padding: 20,
        marginTop: 20,
        backgroundColor: '#b4004e',
    },
    signupbutton: {
        alignSelf: 'stretch',
        alignItems: 'center',
        padding: 20,
        marginBottom: 20,
        backgroundColor: '#fce4ec',
    },
    btntext: {
        color: '#fff',
        fontWeight: 'bold'
    },
    qtext: {
        color: '#b4004e',
        alignSelf: 'center',
        margin: 10
    }
});
