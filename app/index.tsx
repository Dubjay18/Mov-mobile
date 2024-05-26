import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeStyles } from "@/constants/Colors";
import TrendingMovies from "@/components/TrendingMovies";
import { MovieItem } from "@/config/api";
import MovieList from "@/components/MovieList";

export default function Index() {
  const movies: MovieItem[] = [
    {
      adult: false,
      backdrop_path: "/path/to/backdrop",
      id: 1,
      original_language: "en",
      original_title: "Original Title",
      overview: "This is an overview of the movie.",
      popularity: 10.0,
      poster_path: "/path/to/poster",
      release_date: "2022-01-01",
      title: "Title",
      video: false,
      vote_average: 7.5,
      vote_count: 100,
    },
    {
      adult: false,
      backdrop_path: "/path/to/backdrop2",
      id: 2,
      original_language: "en",
      original_title: "Original Title 2",
      overview: "This is an overview of the second movie.",
      popularity: 20.0,
      poster_path: "/path/to/poster2",
      release_date: "2022-02-02",
      title: "Title 2",
      video: false,
      vote_average: 8.5,
      vote_count: 200,
    },
  ];
  const [trendingMovies, setTrendingMovies] =
    React.useState<MovieItem[]>(movies);
  const [upcomingMovies, setUpcomingMovies] =
    React.useState<MovieItem[]>(movies);
  const [topRatedMovies, setTopRatedMovies] =
    React.useState<MovieItem[]>(movies);
  return (
    <SafeAreaView className={"flex-1 bg-neutral-900"}>
      <StatusBar style="light" />
      <View className={"flex-row justify-between items-center mx-4 mb-5"}>
        <Bars3CenterLeftIcon size={30} strokeWidth={2} color={"#fff"} />
        <Text className={"text-3xl text-white"}>
          <Text style={themeStyles.text}>M</Text>ovies
        </Text>
        <TouchableOpacity>
          <MagnifyingGlassIcon size={30} strokeWidth={2} color={"#fff"} />
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        <TrendingMovies data={trendingMovies} />
        <MovieList data={upcomingMovies} title={"Upcoming"} />
        <MovieList data={topRatedMovies} title={"Top Rated"} />
      </ScrollView>
    </SafeAreaView>
  );
}
