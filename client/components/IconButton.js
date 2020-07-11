import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';

export function IconButton({ name, style, onPress }) {
  const { colors } = useTheme();
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      {name === 'logout' ? <SimpleLineIcons name={name} size={24} color="#b4004e" /> :
        <Ionicons name={name} size={24} color="#b4004e" />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {},
});