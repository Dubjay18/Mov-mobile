import React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import {Bars3CenterLeftIcon, MagnifyingGlassIcon} from "react-native-heroicons/outline"
import {StatusBar} from "expo-status-bar";
import {SafeAreaView} from "react-native-safe-area-context";
import {themeStyles} from "@/constants/Colors";
import TrendingMovies from "@/components/TrendingMovies";

export default function Index() {
    const [trendingMovies, setTrendingMovies] = React.useState([1, 2, 3])
    return (
        <SafeAreaView className={"flex-1 bg-neutral-900"}>
            <StatusBar style="light"/>
            <View className={"flex-row justify-between items-center mx-4 mb-5"}>
                <Bars3CenterLeftIcon size={30} strokeWidth={2} color={"#fff"}/>
                <Text className={"text-3xl text-white"}>
                    <Text style={themeStyles.text}>M</Text>ovies
                </Text>
                <TouchableOpacity>
                    <MagnifyingGlassIcon size={30} strokeWidth={2} color={"#fff"}/>
                </TouchableOpacity>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 10}}
            >
                {/*//TODO: Add carousel here*/}
                <TrendingMovies/>
            </ScrollView>

        </SafeAreaView>
    );
}

