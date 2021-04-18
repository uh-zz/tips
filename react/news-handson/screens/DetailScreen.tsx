import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, SafeAreaView, Image, View } from 'react-native';
import WebView from 'react-native-webview';
import { RootStackParamList } from '../App';

type DetailProps = StackScreenProps<RootStackParamList,'Detail'>;

export default function DetailScreen({route}:DetailProps) {
  return (
    <SafeAreaView style={styles.container}>
      <WebView source={{ uri: route.params.uri }} style={{ marginTop: 20 }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  textContainer: {
    margin: 10,
  },
});