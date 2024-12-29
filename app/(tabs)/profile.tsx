'use client'

import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image, Switch } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { User } from '@/types'

export default function ProfileScreen() {
  const [user, setUser] = useState<User>({
    username: 'John Doe',
    email: 'john@example.com',
    preferences: {
      notifications: true,
      defaultView: 'daily',
      theme: 'light'
    }
  })

  return (
    <View className="flex-1 bg-white pt-12">
      <View className="items-center p-6 bg-emerald-50">
        <View className="relative">
          <Image
            source={{ uri: "/placeholder.svg?height=100&width=100" }}
            className="w-24 h-24 rounded-full"
          />
          <TouchableOpacity 
            className="absolute bottom-0 right-0 bg-emerald-500 p-2 rounded-full"
          >
            <Ionicons className="w-5 h-5 text-white" />
          </TouchableOpacity>
        </View>
        <Text className="text-xl font-semibold mt-4">{user.username}</Text>
        <Text className="text-gray-500">{user.email}</Text>
      </View>

      <View className="flex-1 p-6">
        <Text className="text-lg font-semibold mb-4">Preferences</Text>
        
        <View className="space-y-4">
          <View className="flex-row items-center justify-between">
            <Text className="text-gray-700">Enable Notifications</Text>
            <Switch
              value={user.preferences.notifications}
              onValueChange={(value) => 
                setUser(prev => ({
                  ...prev,
                  preferences: { ...prev.preferences, notifications: value }
                }))
              }
            />
          </View>

          <View className="flex-row items-center justify-between">
            <Text className="text-gray-700">Default View</Text>
            <View className="flex-row bg-gray-100 rounded-lg p-1">
              <TouchableOpacity
                onPress={() => 
                  setUser(prev => ({
                    ...prev,
                    preferences: { ...prev.preferences, defaultView: 'daily' }
                  }))
                }
                className={`px-4 py-2 rounded-lg ${
                  user.preferences.defaultView === 'daily' ? 'bg-white shadow' : ''
                }`}
              >
                <Text className={
                  user.preferences.defaultView === 'daily' 
                    ? 'text-emerald-600' 
                    : 'text-gray-600'
                }>
                  Daily
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => 
                  setUser(prev => ({
                    ...prev,
                    preferences: { ...prev.preferences, defaultView: 'calendar' }
                  }))
                }
                className={`px-4 py-2 rounded-lg ${
                  user.preferences.defaultView === 'calendar' ? 'bg-white shadow' : ''
                }`}
              >
                <Text className={
                  user.preferences.defaultView === 'calendar' 
                    ? 'text-emerald-600' 
                    : 'text-gray-600'
                }>
                  Calendar
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="flex-row items-center justify-between">
            <Text className="text-gray-700">Theme</Text>
            <View className="flex-row bg-gray-100 rounded-lg p-1">
              <TouchableOpacity
                onPress={() => 
                  setUser(prev => ({
                    ...prev,
                    preferences: { ...prev.preferences, theme: 'light' }
                  }))
                }
                className={`px-4 py-2 rounded-lg ${
                  user.preferences.theme === 'light' ? 'bg-white shadow' : ''
                }`}
              >
                <Text className={
                  user.preferences.theme === 'light' 
                    ? 'text-emerald-600' 
                    : 'text-gray-600'
                }>
                  Light
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => 
                  setUser(prev => ({
                    ...prev,
                    preferences: { ...prev.preferences, theme: 'dark' }
                  }))
                }
                className={`px-4 py-2 rounded-lg ${
                  user.preferences.theme === 'dark' ? 'bg-white shadow' : ''
                }`}
              >
                <Text className={
                  user.preferences.theme === 'dark' 
                    ? 'text-emerald-600' 
                    : 'text-gray-600'
                }>
                  Dark
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <TouchableOpacity 
          className="mt-8 flex-row items-center justify-center p-4 bg-red-50 rounded-lg"
        >
          <Ionicons className="w-5 h-5 text-red-500 mr-2" />
          <Text className="text-red-500 font-medium">Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

