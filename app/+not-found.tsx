import React, { useLayoutEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Link, useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function NotFound() {
  const navigation = useNavigation();

  // Use layoutEffect to hide the header when this component is rendered
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false, // Hide the header
    });
  }, [navigation]);
  return (
    <View className="flex-1 bg-[#e8f4ea] justify-center items-center p-6">
      <View className="bg-white rounded-3xl p-6 shadow-lg items-center max-w-md w-full">
        <Text className="text-3xl font-bold text-[#2c3e50] mb-4">Oops!</Text>
        <Text className="text-xl text-[#7f8c8d] mb-6 text-center">
          This page is still growing...
        </Text>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' }}
          className="w-full h-48 rounded-2xl mb-6"
          resizeMode="cover"
        />
        <View className="bg-[#fff9e6] rounded-2xl p-4 mb-6 w-full">
          <Text className="text-[#2c3e50] text-center">
            We're nurturing this page. Check back soon for new growth!
          </Text>
        </View>
        <Link href="/" asChild>
          <TouchableOpacity className="flex-row items-center bg-[#8bc34a] px-6 py-3 rounded-full">
            <Ionicons name="home" size={24} color="white" className="mr-2" />
            <Text className="text-white font-semibold">Return Home</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

