import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function Settings({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Texto de ejemplo configuracion</Text>
    </View>
  );
}
