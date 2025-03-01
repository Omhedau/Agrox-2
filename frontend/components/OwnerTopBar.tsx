import { FontAwesome } from '@expo/vector-icons';
import { View, Text } from 'react-native';
import React from 'react';
const OwnerTopBar = () => {
    return (
        <View className="flex flex-row items-center justify-between p-4 bg-gray-100 border-b border-gray-300">
            <Text className="text-xl font-bold text-gray-800">OwnerTopBar</Text>
            <View className="flex flex-row items-center">
                <FontAwesome name="bars" size={24} color="black" />
                <FontAwesome name="bell" size={24} color="black" className="mr-4" />
            </View>
        </View>
    )
}
