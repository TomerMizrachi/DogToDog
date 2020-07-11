import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { BASE_URL } from '../config/index'
import { createAction } from '../config/createAction';


export function rootReducer() {
    const [state, dispatch] = React.useReducer((state, action) => {
        switch (action.type) {
            case 'SET_USER':
                return {
                    ...state,
                    user: { ...action.payload }
                };
            case 'REMOVE_USER':
                return {
                    ...state,
                    user: undefined
                };
            case 'SET_LOADING':
                return {
                    ...state,
                    loading: action.payload,
                };
            case 'SET_USERS':
                return {
                    ...state,
                    usersList: action.payload,
                };
            default:
                return state;
        }
    }, {
        user: undefined,
        loading: true,
        usersList: []
    });

    const auth = React.useMemo(() => ({
        login: async (email, password) => {
            try {
                const { data } = await axios.post(`${BASE_URL}/api/login`, {
                    email: email,
                    password: password
                });
                const user = {
                    email: data.user.email,
                    token: data.token,
                };
                await AsyncStorage.setItem('user', JSON.stringify(user));
                dispatch(createAction('SET_USER', user));
            } catch (e) {
                console.log(e)
            }
        },
        register: async (name, email, breed, age, password, image) => {
            try {
                await axios.post(`${BASE_URL}/api/createUser`, {
                    name: name,
                    email: email,
                    breed: breed,
                    age: age,
                    password: password,
                    image: image
                });
            } catch (e) {
                console.log(e)
            }
        },
        logout: async () => {
            try {
                await AsyncStorage.removeItem('user');
                dispatch(createAction('REMOVE_USER'));
            } catch (e) {
                console.log(e)
            }
        },
    }),
        [],
    );

    React.useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if (user) {
                dispatch(createAction('SET_USER', JSON.parse(user)));
                axios.get(`${BASE_URL}/api`, {
                    headers: {
                        Authorization: `bearer ${user.token}`,
                    },
                }).then(({ data }) => {
                    data = data.filter(d => d.email !== JSON.parse(user).email);
                    dispatch(createAction('SET_USERS', data));
                });
            }
            dispatch(createAction('SET_LOADING', false));
        });
    }, []);


    return { auth, state, dispatch };
}
