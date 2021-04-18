import { StackScreenProps } from '@react-navigation/stack';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet,  FlatList, SafeAreaView } from 'react-native';
import { RootStackParamList } from '../App';
import { ListItem } from '../components/ListItem';
// NewAPIのAPI keyを以下のファイルに 
// {
//     "key": "jf;jfajajfafdjkdajfljg"
// }
// のような形でしまってある。
// NewsAPIについてはこちらを参照(https://newsapi.org/)
import NewsApiKey from '../assets/NewsApiKey.json'

type Article = {
  urlToImage: string;
  title: string;
  author: string;
  url:string
}

type HomeProps = StackScreenProps<RootStackParamList,'Home'>;

const apiKey = NewsApiKey.key

export default function HomeScreen({navigation}:HomeProps) {
    const [articles, setArticles] = useState<Article[]>([]);

    const fetch = async () => {
      const response = await axios.get<{articles:Article[]}>(
        `https://newsapi.org/v2/everything?q=tesla&from=2021-03-18&sortBy=publishedAt&apiKey=${apiKey}`
      );
      setArticles(response.data.articles);
    };
    useEffect(() => {
      fetch();
    }, []);
  
    return (
      <SafeAreaView style={styles.container}>
      
        <FlatList
          data={articles}
          renderItem={({ item }) => (
            <ListItem
              imageUrl={item.urlToImage}
              title={item.title}
              subTitle={item.author}
              onPress={() => {navigation.navigate('Detail', { uri: item.url })}}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <StatusBar style="light" />
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:"#222",
    },
  });