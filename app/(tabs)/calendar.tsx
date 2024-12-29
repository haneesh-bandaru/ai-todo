
import { useState } from 'react'
import { View, Text, TouchableOpacity, ScrollView, Modal, SafeAreaView, StatusBar } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import ExpoCalendar from '@/components/ExpoCalendarComponent'

interface Task {
  id: number
  title: string
  coins: number
  completed: boolean
}

export default function Home() {
  const [date, setDate] = useState<Date>(new Date())
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [tasks] = useState<Task[]>([
    { id: 1, title: 'Tidy up bathroom and bedroom', coins: 30, completed: false },
    { id: 2, title: 'Physical activity (sports, workout)', coins: 40, completed: false },
    { id: 3, title: 'Morning hygiene and skin care', coins: 30, completed: false },
  ])

  const navigateToCamera = () => {
    setIsModalVisible(false)
    router.navigate('/camera')
  }

  return (
    <SafeAreaView className="flex-1 bg-[#e8f4ea]">
      <StatusBar barStyle="dark-content" />
      <ScrollView className="flex-1 p-4">
        {/* Header */}
        <View className="flex-row justify-between items-center mb-6">
          <View className="flex-row items-center">
            <View className="w-12 h-12 bg-[#8bc34a] rounded-full items-center justify-center mr-3">
              <Text className="text-white text-lg font-semibold">AB</Text>
            </View>
            <Text className="text-2xl font-semibold text-[#2c3e50]">Abigail</Text>
          </View>
          <View className="flex-row items-center">
            <Text className="text-[#7f8c8d] mr-2">23</Text>
            <Text className="text-[#8bc34a]">/ 54</Text>
          </View>
        </View>

        {/* Calendar */}
        <ExpoCalendar />

        {/* Tasks Section */}
        <View className="bg-white rounded-3xl p-4 shadow-lg mb-6">
          <View className="flex-row justify-between items-center mb-4 px-2">
            <Text className="text-xl font-semibold text-[#2c3e50]">Daily habits</Text>
            <TouchableOpacity>
              <Text className="text-[#8bc34a]">Goals</Text>
            </TouchableOpacity>
          </View>

          {tasks.map((task) => (
            <TouchableOpacity
              key={task.id}
              className="flex-row items-center bg-[#fff9e6] rounded-2xl p-4 mb-3"
            >
              <View className="flex-1">
                <Text className="text-[#2c3e50] font-medium">{task.title}</Text>
              </View>
              <View className="flex-row items-center bg-white px-3 py-1 rounded-full">
                <Text className="text-[#8bc34a] font-semibold mr-1">{task.coins}</Text>
                <Text className="text-[#7f8c8d]">Coins</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        onPress={() => setIsModalVisible(true)}
        className="absolute bottom-8 right-8 w-16 h-16 bg-[#8bc34a] rounded-full items-center justify-center shadow-lg"
      >
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white rounded-t-3xl p-6">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-2xl font-semibold text-[#2c3e50]">Add New</Text>
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <Ionicons name="close" size={24} color="#7f8c8d" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={navigateToCamera}
              className=" flex-row items-center bg-[#e8f4ea] p-4 rounded-2xl mb-3"
            >
              <View className="w-10 h-10 bg-[#8bc34a] rounded-full items-center justify-center mr-3">
                <Ionicons name="camera" size={20} color="white" />
              </View>
              <Text className="text-[#2c3e50] font-medium">Take a Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-row items-center bg-[#e8f4ea] p-4 rounded-2xl mb-3"
            >
              <View className="w-10 h-10 bg-[#8bc34a] rounded-full items-center justify-center mr-3">
                <Ionicons name="list" size={20} color="white" />
              </View>
              <Text className="text-[#2c3e50] font-medium">Add Task</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

