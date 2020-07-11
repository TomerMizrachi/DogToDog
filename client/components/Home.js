import React from 'react';
import { StyleSheet, View, Text, Platform, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { Card, CardDetails } from './Card';
import { IconButton } from './IconButton';
import { AuthContext } from '../context/AuthContext';
import { UserContext } from '../context/UserContext';
import { rootReducer } from '../reducers/rootReducer';

export default function Home({ navigation }) {
    const [index, setIndex] = React.useState(0);
    const { logout } = React.useContext(AuthContext);
    const state = React.useContext(UserContext);
    rootReducer();

    const onSwiped = () => {
        setIndex((index + 1));
    }
    const onSwipedLeft = () => {
        if (state.usersList[index]) {
            state.userDetails.dislikedUsers[state.userDetails.dislikedUsers.length] = state.usersList[index]._id;
            console.log("dislike")
        }

        // console.log(state.usersList,index);
        // state.usersList.splice(index,1);
        // setIndex(index - 1);
        // console.log(state.usersList,index);
    }
    const onSwipedRight = () => {
        state.userDetails.likedUsers[state.userDetails.likedUsers.length] = state.usersList[index]._id;
    }
    const favorits = () => {

    }

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

    if (index < state.usersList.length) {
        return (
            <View style={styles.container}>
                <View style={styles.swiperContainer}>
                    <Swiper
                        cards={state.usersList}
                        cardIndex={index}
                        renderCard={card => <Card card={card} />}
                        onSwiped={onSwiped}
                        onSwipedLeft={onSwipedLeft}
                        onSwipedRight={onSwipedRight}
                        disableTopSwipe={true}
                        disableBottomSwipe={true}
                        infinite={true}
                        animateOverlayLabelsOpacity={true}
                        backgroundColor={'#fce4ec'}
                        useViewOverflow={Platform.OS === 'ios'}
                        overlayLabels={{
                            left: {
                                title: 'NOPE',
                                style: {
                                    label: {
                                        backgroundColor: '#ec5a8c',
                                        color: '#fce4ec',
                                        fontSize: 24
                                    },
                                    wrapper: {
                                        flexDirection: 'column',
                                        alignItems: 'flex-end',
                                        justifyContent: 'flex-start',
                                        marginTop: 20,
                                        marginLeft: -20,
                                    }
                                }
                            },
                            right: {
                                title: 'Like',
                                style: {
                                    label: {
                                        backgroundColor: '#5aecba',
                                        color: '#fce4ec',
                                        fontSize: 24
                                    },
                                    wrapper: {
                                        flexDirection: 'column',
                                        alignItems: 'flex-start',
                                        justifyContent: 'flex-start',
                                        marginTop: 20,
                                        marginLeft: 20,
                                    }
                                }
                            }
                        }}
                    />
                </View>
                <View style={styles.bottomContainer}>
                    <CardDetails data={state.usersList} index={index} />
                    <TouchableOpacity style={styles.button} onPress={favorits()}>
                        <Text style={styles.btntext}>Your Matches</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <View style={styles.Bcontainer}>
                    {index >= state.usersList.length && state.usersList[0] !== undefined ? (<Text style={styles.text}>We have no more friens for you please come back later</Text>) : (<View></View>)}
                </View>
            </View>
        )
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fce4ec',
    },
    swiperContainer: {
        flex: 0.55,
    },
    bottomContainer: {
        flex: 0.45,
    },
    back: {
        marginRight: 16
    },
    Bcontainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fce4ec',
    },
    text: {
        fontSize: 24,
        margin: 10,
        color: '#b4004e'
    },
    button: {
        top: 50,
        margin: 50,
        alignSelf: 'stretch',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#b4004e',
    },
    btntext: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
    }
});