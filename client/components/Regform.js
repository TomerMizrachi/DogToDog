import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import Error from './Eroor'
import { IconButton } from './IconButton';
import { AuthContext } from '../context/AuthContext';
import { Loading } from './Loading'
import * as ImagePicker from 'expo-image-picker';

export default function Regform({ navigation }) {
  const { register } = React.useContext(AuthContext);

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [breed, setBreed] = React.useState('');
  const [age, setAge] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [image, setImage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Loading loading={isLoading} />
      <View style={styles.regform}>
        <IconButton style={styles.back} name="md-arrow-back" onPress={() => { navigation.pop() }} />
        <Text style={styles.header}>Registration</Text>
        <TextInput style={styles.textinput} placeholder="Name"
          underlineColorAndroid={'transparent'}
          value={name}
          onChangeText={setName} />
        <TextInput style={styles.textinput} placeholder="Email"
          underlineColorAndroid={'transparent'}
          value={email}
          onChangeText={setEmail} />
        <TextInput style={styles.textinput} placeholder="Breed"
          underlineColorAndroid={'transparent'}
          value={breed}
          onChangeText={setBreed} />
        <TextInput style={styles.textinput} placeholder="Age"
          underlineColorAndroid={'transparent'}
          value={age}
          onChangeText={setAge} />
        <TextInput style={styles.textinput} placeholder="Password"
          secureTextEntry={true} underlineColorAndroid={'transparent'}
          value={password}
          onChangeText={setPassword} />
        <TouchableOpacity
          style={styles.imgbutton}
          onPress={pickImage}>
          <Text style={styles.qtext}>upload image</Text>
        </TouchableOpacity>
        <Error error={error} />
        <TouchableOpacity style={styles.button}
          onPress={async () => {
            try {
              setIsLoading(true);
              await register(name, email, breed, age, password, image);
              navigation.pop();
            } catch (e) {
              console.log(e)
              setError(e.message);
              setIsLoading(false);
            }
          }}>
          <Text style={styles.btntext}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View >
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
  regform: {
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
  button: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#b4004e',
  },
  btntext: {
    color: '#fff',
    fontWeight: 'bold'
  },
  back: {
    top: 10,
    left: 270
  },
  imgbutton: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fce4ec',
  },
  qtext: {
    color: '#b4004e',
    alignSelf: 'center',
    margin: 10
  }
});
