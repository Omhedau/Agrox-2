import { View, Text, Button } from 'react-native'
import React from 'react'
import axios from 'axios'

const text = () => {

    const sendRequest = () => {
        const data = {
          name: "bob kale",
          mobile: "7373737144",
          role: "Farmer",
        };

        axios
          .post("http://10.0.2.2:3000/api/user", data)
          .then((response) => console.log(response.data))
          .catch((error) => console.error(error));
    }

    return (
        <View>
            <Text>text</Text>
            <Button title="Send Request" onPress={sendRequest} />
        </View>
    )
}

export default text