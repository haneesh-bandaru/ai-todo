import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Platform } from 'react-native';
import { Calendar } from 'react-native-calendars';
import * as ExpoCalendar from 'expo-calendar';
import { Ionicons } from '@expo/vector-icons';

interface Task {
  id: string;
  title: string;
  date: string;
}

export default function ExpoCalendarComponent() {
  const [hasPermission, setHasPermission] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0].split('-').slice(2).join('-'));
  const [month, setMonth] = useState(new Date().toLocaleString('default', { month: 'long' }));
  const [day, setDay] = useState(new Date().getDate());

  useEffect(() => {
    const date = new Date(selectedDate);
    setMonth(date.toLocaleString('default', { month: 'long' }));
    setDay(date.getDate());
  }, [selectedDate]);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    (async () => {
      const { status } = await ExpoCalendar.requestCalendarPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    if (hasPermission) {
      fetchTasks(selectedDate);
    }
  }, [hasPermission, selectedDate]);

  const fetchTasks = async (date: string) => {
    // In a real app, you would fetch tasks from your backend or local storage
    // For this example, we'll use dummy data
    const dummyTasks: Task[] = [
      { id: '1', title: 'Morning Workout', date },
      { id: '2', title: 'Team Meeting', date },
      { id: '3', title: 'Read a Book', date },
    ];
    setTasks(dummyTasks);
  };

  const createCalendar = async () => {
    try {
      const defaultCalendarSource =
        Platform.OS === 'ios'
          ? await getDefaultCalendarSource()
          : { isLocalAccount: true, name: 'Expo Calendar' };
      const newCalendarID = await ExpoCalendar.createCalendarAsync({
        title: 'COS Calendar',
        color: '#8bc34a',
        entityType: ExpoCalendar.EntityTypes.EVENT,
        sourceId: defaultCalendarSource.id,
        source: defaultCalendarSource,
        name: 'cosInternalCalendar',
        ownerAccount: 'personal',
        accessLevel: ExpoCalendar.CalendarAccessLevel.OWNER,
      });
      console.log(`Your new calendar ID is: ${newCalendarID}`);
      alert('Calendar created successfully!');
    } catch (error) {
      console.error('Failed to create calendar', error);
      alert('Failed to create calendar');
    }
  };

  const getDefaultCalendarSource = async () => {
    const defaultCalendar = await ExpoCalendar.getDefaultCalendarAsync();
    return defaultCalendar.source;
  };

  if (!hasPermission) {
    return (
      <View className="bg-white rounded-3xl p-6 shadow-lg mb-6">
        <Text className="text-[#2c3e50] text-lg font-semibold mb-4">Calendar access needed</Text>
        <TouchableOpacity
          onPress={async () => {
            const { status } = await ExpoCalendar.requestCalendarPermissionsAsync();
            setHasPermission(status === 'granted');
          }}
          className="bg-[#8bc34a] px-4 py-2 rounded-full"
        >
          <Text className="text-white font-medium">Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="bg-white rounded-3xl p-6 shadow-lg mb-6">
      <Text className="text-[#2c3e50] text-xl font-semibold mb-4">COS Calendar</Text>
      <Calendar
        onDayPress={(day: any) => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: '#8bc34a' },
        }}
        theme={{
          backgroundColor: '#ffffff',
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#2c3e50',
          selectedDayBackgroundColor: '#8bc34a',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#8bc34a',
          dayTextColor: '#2c3e50',
          textDisabledColor: '#d9e1e8',
          dotColor: '#8bc34a',
          selectedDotColor: '#ffffff',
          arrowColor: '#8bc34a',
          monthTextColor: '#2c3e50',
          indicatorColor: '#8bc34a',
        }}
      />
      <View className="mt-4">
        <Text className="text-[#2c3e50] text-lg font-semibold mb-2">Tasks for {selectedDate}</Text>
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="flex-row items-center bg-[#fff9e6] rounded-2xl p-4 mb-2">
              <View className="flex-1">
                <Text className="text-[#2c3e50] font-medium">{item.title}</Text>
              </View>
              <TouchableOpacity className="bg-[#8bc34a] p-2 rounded-full">
                <Ionicons name="checkmark" size={16} color="white" />
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={
            <Text className="text-[#7f8c8d] text-center">No tasks for this day</Text>
          }
        />
      </View>
      <TouchableOpacity
        onPress={createCalendar}
        className="flex-row items-center bg-[#e8f4ea] p-4 rounded-2xl mt-4"
      >
        <View className="w-10 h-10 bg-[#8bc34a] rounded-full items-center justify-center mr-3">
          <Ionicons name="calendar" size={20} color="white" />
        </View>
        <Text className="text-[#2c3e50] font-medium">Create COS Calendar</Text>
      </TouchableOpacity>
    </View>
  );
}

