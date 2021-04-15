import {StatusBar} from 'expo-status-bar';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
import {Ionicons} from '@expo/vector-icons';

function Input(props) {
  const [text, setText] = useState('');

  const onPress = () => {
    props.addEet(text);
    setText('');
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        onChangeText={(_text) => setText(_text)}
        value={text}
      />
      <TouchableOpacity style={styles.button}>
        <Text
          style={styles.buttonText}
          onPress={onPress}
        >
          イートする
        </Text>
      </TouchableOpacity>
    </View>
  );
}
Input.propTypes = {
  addEet: PropTypes.func,
};

const eetStyles = StyleSheet.create({
  container: {
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderColor: 'rgb(29, 161, 242)',
    marginBottom: 10,
    borderRadius: 5,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
  actionContainer: {
    borderTopWidth: 1,
    borderTopColor: '#aaa',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingTop: 5,
    marginTop: 20,
  },
});
function Eet(props) {
  const {
    text,
    like,
    onLike,
  } = props;
  return (
    <View style={eetStyles.container}>
      <Text style={eetStyles.text}>{text}</Text>
      <View style={eetStyles.actionContainer}>
        <TouchableOpacity onPress={onLike}>
          {like ?
            <Ionicons
              name="heart-circle-sharp"
              size={22}
              color="rgb(252, 108, 133)"
            /> :
            <Ionicons
              name="ios-heart-circle-outline"
              size={22}
              color="#aaa"
            />
          }
        </TouchableOpacity>
      </View>
    </View>
  );
}
Eet.propTypes = {
  text: PropTypes.string,
  like: PropTypes.bool,
  onLike: PropTypes.func,
};

export default function App() {
  const [eet, setEet] = useState([]);
  const addEet = (text) => {
    const newEet = eet.slice();
    newEet.push({
      text,
      id: `${Date.now()}`,
      like: false,
    });
    setEet(newEet);
  };

  const onLike = (index)=> {
    const newEet = eet.slice();
    newEet[index].like = !newEet[index].like;
    setEet(newEet);
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Input addEet={addEet} />
        <View style={styles.content}>
          <FlatList
            data={eet}
            renderItem={ ( {item, index} ) =>
              <Eet
                text={item.text}
                like={item.like}
                onLike={ ()=> onLike(index)}
              />
            }
            // keyExtractor={(item)=>`${item.id}`}
            contentContainerStyle={styles.contentContainer}
          />
        </View>
        <StatusBar style="light" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#222',
  },
  container: {
    flex: 1,
    paddingTop: 20,
  },
  button: {
    backgroundColor: 'rgb(29, 161, 242)',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: '900',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    borderColor: 'rgb(29, 161, 242)',
    borderWidth: 2,
    marginRight: 10,
    borderRadius: 10,
    color: 'white',
    paddingHorizontal: 10,
    fontSize: 16,
  },
  content: {
    padding: 20,
    flex: 1,
  },
  contentText: {
    color: 'white',
    fontSize: 22,
  },
  contentContainer: {
    paddingBottom: 50,
  },
});
