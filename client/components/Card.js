import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'

export function Card({ card }) {
    return card ? (
        <View style={styles.card}>
            <Image source={{ uri: card.image }} style={styles.cardImage} />
        </View>
    ) : (<View style={styles.card}>
        <Text></Text>
    </View>)
}

export function CardDetails({ data ,index}) {

    return (data[index] !== undefined) ? (
        <View style={styles.cardDetails}>
            <Text style={styles.text}>{data[index].name}</Text>
            <Text style={styles.text}>{data[index].breed}</Text>
            <Text style={styles.text}>{data[index].age}</Text>
        </View>
    ) : (
            <View></View>
        )
}

const styles = StyleSheet.create({
    card: {
        flex: 0.45,
        borderRadius: 8,
        shadowRadius: 25,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 0 },
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    cardImage: {
        width: 300,
        flex: 1,
        resizeMode: 'contain'
    },
    cardDetails: {
        flex: 0.55,
        alignItems: 'center',
        backgroundColor: '#fce4ec',
    },
    text: {
        fontSize: 24,
        marginBottom: 10,
        color: '#b4004e'
    }
});
