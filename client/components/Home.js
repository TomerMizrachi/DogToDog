import React from 'react';
import { StyleSheet, View, Text, Platform, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../config/index';
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
    const matches = () => {
        const likedarr = state.userDetails.likedUsers;
        const users = state.usersList;
        let matchUsers = [];
        likedarr.forEach(likedId => {
            users.forEach(user => {
                if (user._id === likedId) {
                    matchUsers[matchUsers.length] = user;
                }
            });
        });
        state.matches = matchUsers;
    };
    const onSwiped = () => {
        setIndex((index + 1));
    }
    const onSwipedLeft = () => {
        if (state.usersList[index]) {
            state.userDetails.dislikedUsers[state.userDetails.dislikedUsers.length] = state.usersList[index]._id;
        }
    }
    const onSwipedRight = async () => {
        if (state.usersList[index]) {
            state.userDetails.likedUsers[state.userDetails.likedUsers.length] = state.usersList[index]._id;
            state.usersList[index].likedBy[state.usersList[index].likedBy.length] = state.userDetails._id;
            await updateLikes(state.usersList[index].email, state.usersList[index].likedBy);
        }
    }
    const matchesDB = async () => {
        try {
            await updateLikes(state.userDetails.email, state.userDetails.likedUsers, state.userDetails.dislikedUsers);
            matches(); 
            navigation.navigate('Your Matches');
        } catch (e) {
            console.log(e)
        }
    }
    const updateLikes = async (email, liked, dislike) => {
        try {
            if (dislike) {
                await axios.put(`${BASE_URL}/api/update/${email}`, {
                    likedUsers: liked,
                    dislikedUsers: dislike,
                });
            } else if (!dislike) {
                await axios.put(`${BASE_URL}/api/update/${email}`, {
                    likedBy: liked,
                });
            }
        } catch (e) {
            console.log(e)
        }
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
                    <TouchableOpacity style={styles.button}
                        onPress={matchesDB}>
                        <Text style={styles.btntext}>Your Matches</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                {index >= state.usersList.length && state.usersList[0] !== undefined ? (
                    <View style={styles.Bcontainer}>
                        <Text style={styles.text}>We have no more friens for you please come back later</Text>
                        <TouchableOpacity style={styles.button}
                            onPress={matches}>
                            <Text style={styles.btntext}>Your Matches</Text>
                        </TouchableOpacity>
                    </View>
                ) : (<View></View>)}
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