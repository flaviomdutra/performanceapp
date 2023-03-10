import { useCallback, useState } from "react";
import {
  Button,
  TextInput,
  Text,
  View,
  StyleSheet,
  ScrollView,
} from "react-native";
import { FriendList } from "../components/FriendList";

export function Home() {
  const [name, setName] = useState("");
  const [friends, setFriends] = useState([]);

  async function handleSearch() {
    const response = await fetch(`http://192.168.15.9:3333/friends?q=${name}`);
    const data = await response.json();

    setFriends(data);
  }

  const handleFollow = useCallback(() => {
    console.log("follow user");
  }, []);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}> Amigos</Text>

      <TextInput
        placeholder="Nome do cliente"
        onChangeText={setName}
        style={styles.input}
      />

      <Button title="Buscar" onPress={handleSearch} />

      <ScrollView>
        <FriendList data={friends} follow={handleFollow} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    padding: 25,
  },
  input: {
    borderWidth: 1,
    padding: 7,
    marginVertical: 10,
  },
  list: {
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
