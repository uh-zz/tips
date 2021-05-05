import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import YouTube from "react-native-youtube";

import { WebView } from "react-native-webview";

const YOUTUBE_SERACH_API_URI = "https://www.googleapis.com/youtube/v3/search?";

// ここはあとから設定ファイル化する
const API_KEY = "";

export default function App() {
  const [videoId, setVideoId] = useState("");

  useEffect(() => {
    const params = {
      key: API_KEY,
      q: "群青日和",
      type: "video",
      maxResults: "1",
      order: "viewCount", // 結果の並び順を再生回数の多い順に
    };

    const queryParams = new URLSearchParams(params);

    fetch(YOUTUBE_SERACH_API_URI + queryParams)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("API success:", result);

          if (result.items && result.items.length !== 0) {
            const firstItem = result.items[0];
            setVideoId(firstItem.id.videoId);
            console.log(firstItem.id.videoId);
          }
        },
        (error) => {
          console.error(error);
        }
      );
  });

  return (
    <SafeAreaView style={styles.container}>
      <YouTube
        videoId="gD2mhJ3ByGQ"
        apiKey={API_KEY}
        play={true}
        fullscreen={false}
        loop={false}
        onReady={(e) => console.log("onReady")}
        onChangeState={(e) => console.log("onChangeState:", e.state)}
        onChangeQuality={(e) => console.log("onChangeQuality: ", e.quality)}
        onError={(e) => console.log("onError: ", e.error)}
        style={{ width: "100%", height: 300 }}
      />
      {/* <WebView
        source={{
          html:
            "<iframe id='player' width='640' height='360' src='https://www.youtube.com/embed/gD2mhJ3ByGQ' frameBorder='0' allowfullscreen />",
        }}
      /> */}
      {/* <Text>Open up App.js to start working on your app!</Text>
      <Text>https://www.youtube.com/embed/{videoId}</Text> */}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
