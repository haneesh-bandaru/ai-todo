import { View, Text, TouchableOpacity, Image, SafeAreaView, StatusBar } from 'react-native';
import { Camera, CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import React, { useState, useEffect, useRef } from 'react';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const CameraComponent = () => {
    const [facing, setFacing] = useState<CameraType>("back");
    const [permission, requestPermission] = useCameraPermissions();
    const [cameraReady, setCameraReady] = useState(false);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const cameraRef = useRef(null);

    useEffect(() => {
        (async () => {
            if (!permission) {
                await requestPermission();
            }
        })();
    }, []);

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <SafeAreaView className="flex-1 bg-[#e8f4ea]">
                <StatusBar barStyle="dark-content" />
                <View className="flex-1 justify-center items-center px-6">
                    <View className="bg-white rounded-3xl p-8 shadow-lg w-full items-center">
                        <Text className="text-2xl font-semibold text-[#2c3e50] mb-4 text-center">
                            Camera Access Needed
                        </Text>
                        <Text className="text-[#7f8c8d] text-center mb-6">
                            Please grant camera access to capture your moments
                        </Text>
                        <TouchableOpacity
                            onPress={requestPermission}
                            className="bg-[#8bc34a] px-8 py-4 rounded-full shadow-lg active:bg-[#7cb342]"
                        >
                            <Text className="text-white font-semibold text-lg">Allow Camera</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        );
    }

    const toggleCameraFacing = () => {
        setFacing((current) => (current === "back" ? "front" : "back"));
    };

    const captureImage = async () => {
        if (cameraRef.current && cameraReady) {
            try {
                const photo = await cameraRef.current.takePictureAsync();
                setCapturedImage(photo.uri);
            } catch (error) {
                console.error("Failed to take picture:", error);
            }
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-[#e8f4ea]">
            <StatusBar barStyle="dark-content" />
            {capturedImage ? (
                <View className="flex-1 p-4">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-2xl font-semibold text-[#2c3e50]">Preview</Text>
                        <View className="flex-row items-center">
                            <Text className="text-[#7f8c8d] mr-2">23</Text>
                            <Text className="text-[#8bc34a]">/ 54</Text>
                        </View>
                    </View>
                    <View className="flex-1 rounded-3xl overflow-hidden shadow-2xl bg-white p-2">
                        <Image
                            source={{ uri: capturedImage }}
                            className="w-full h-full rounded-2xl"
                            resizeMode="cover"
                        />
                    </View>
                    <View className="flex-row justify-center mt-6 space-x-4">
                        <TouchableOpacity
                            onPress={() => setCapturedImage(null)}
                            className="bg-white px-6 py-4 rounded-full shadow-lg active:bg-gray-50 flex-row items-center"
                        >
                            <Ionicons name="camera-outline" size={24} color="#8bc34a" className="mr-2" />
                            <Text className="text-[#2c3e50] font-semibold">Take Another</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="bg-[#8bc34a] px-6 py-4 rounded-full shadow-lg active:bg-[#7cb342] flex-row items-center"
                        >
                            <Ionicons name="checkmark-outline" size={24} color="white" className="mr-2" />
                            <Text className="text-white font-semibold">Save Photo</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <View className="flex-1">
                    <View className="flex-row justify-between items-center p-4">
                        <View className="flex-row items-center">
                            <View className="w-10 h-10 bg-[#8bc34a] rounded-full items-center justify-center mr-3">
                                <Ionicons name="camera" size={20} color="white" />
                            </View>
                            <Text className="text-xl font-semibold text-[#2c3e50]">Camera</Text>
                        </View>
                        <View className="flex-row items-center">
                            <Text className="text-[#7f8c8d] mr-2">23</Text>
                            <Text className="text-[#8bc34a]">/ 54</Text>
                        </View>
                    </View>
                    <CameraView
                        style={{ flex: 1 }}
                        facing={facing}
                        ref={cameraRef}
                        onCameraReady={() => setCameraReady(true)}
                    >
                        <View className="flex-1 justify-between items-center p-4">
                            <TouchableOpacity
                                onPress={toggleCameraFacing}
                                className="mt-4 bg-white/20 backdrop-blur-lg p-4 rounded-full"
                            >
                                <Ionicons name="camera-reverse" size={24} color="white" />
                            </TouchableOpacity>
                            <View className="w-full bg-white/20 backdrop-blur-lg rounded-3xl p-6 mb-8">
                                <TouchableOpacity
                                    onPress={captureImage}
                                    className="self-center"
                                >
                                    <View className="w-20 h-20 rounded-full border-4 border-white bg-white/20 backdrop-blur-lg" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </CameraView>
                </View>
            )}
        </SafeAreaView>
    );
};

export default CameraComponent;

