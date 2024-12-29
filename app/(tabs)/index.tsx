'use client'

import React, { useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { Task } from '@/types'

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Tidy up bathroom and bedroom',
      completed: false,
      isDaily: true,
    },
    {
      id: '2',
      title: 'Physical activity',
      completed: false,
      isDaily: true,
      time: '10:00 AM',
    },
  ])

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  return (
    <View className="flex-1 bg-emerald-50">
      {/* Header */}
      <View className="pt-12 px-4 pb-4 bg-emerald-100 rounded-b-3xl">
        <View className="flex-row justify-between items-center mb-4">
          <Image
            source={{ uri: "/placeholder.svg?height=40&width=40" }}
            className="w-10 h-10 rounded-full"
          />
          <Text className="text-2xl font-semibold">
            {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
          </Text>
          <View className="w-10 h-10 rounded-full bg-white items-center justify-center">
            <Text className="text-sm font-medium">23/54</Text>
          </View>
        </View>
        
        <View className="items-center mb-4">
          <Text className="text-4xl font-bold">25,982</Text>
          <Text className="text-emerald-700 text-sm">COS coins collected</Text>
        </View>
      </View>

      {/* Task Categories */}
      <View className="flex-row p-4 gap-4">
        <TouchableOpacity 
          className="flex-1 bg-emerald-600 p-3 rounded-full items-center"
        >
          <Text className="text-white font-medium">Daily Tasks</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className="flex-1 bg-white p-3 rounded-full items-center"
        >
          <Text className="text-emerald-600 font-medium">Scheduled</Text>
        </TouchableOpacity>
      </View>

      {/* Tasks List */}
      <ScrollView className="flex-1 px-4">
        {tasks.map(task => (
          <TouchableOpacity
            key={task.id}
            onPress={() => toggleTask(task.id)}
            className={`flex-row items-center p-4 mb-3 rounded-xl ${
              task.completed ? 'bg-emerald-100' : 'bg-white'
            }`}
          >
            <View className={`w-6 h-6 rounded-full mr-3 items-center justify-center ${
              task.completed ? 'bg-emerald-500' : 'border-2 border-gray-300'
            }`}>
              {task.completed && <Ionicons className="w-4 h-4 text-white" />}
            </View>
            <View className="flex-1">
              <Text className={`font-medium ${
                task.completed ? 'text-gray-500 line-through' : 'text-gray-900'
              }`}>
                {task.title}
              </Text>
              {task.time && (
                <Text className="text-sm text-gray-500">{task.time}</Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity 
        className="absolute bottom-6 right-6 w-14 h-14 bg-emerald-500 rounded-full items-center justify-center shadow-lg"
      >
        <Ionicons className="w-6 h-6 text-white" />
      </TouchableOpacity>
    </View>
  )
}
