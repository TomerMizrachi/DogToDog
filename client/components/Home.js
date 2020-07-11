import React from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
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
        setIndex((index + 1) % state.usersList.length);
    }
    const onSwipedLeft = () => {
        console.log("left")
    }
    const onSwipedRight = () => {
        console.log("right")
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
            </View>
        </View>
    )
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
    }
});