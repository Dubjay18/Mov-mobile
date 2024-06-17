import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeStyles } from "@/constants/Colors";
import TrendingMovies from "@/components/TrendingMovies";
import {
  getTopRatedMovies,
  getTrendingMovies,
  getUpcomingMovies,
  MovieItem,
} from "@/config/api";
import MovieList from "@/components/MovieList";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";

export default function Index() {
  const {
    isPending,
    error,
    data: MoviesData,
  } = useQuery({
    queryKey: ["top-rated-movies"],
    queryFn: async () => await getTopRatedMovies(),
  });
  const {
    isPending: isPendingTrending,
    error: errorTrending,
    data: TrendingMoviesData,
  } = useQuery({
    queryKey: ["trending-movies"],
    queryFn: async () => await getTrendingMovies(),
  });
  const {
    isPending: isPendingUpcoming,
    error: errorUpcoming,
    data: UpcomingMoviesData,
  } = useQuery({
    queryKey: ["upcoming-movies"],
    queryFn: async () => await getUpcomingMovies(),
  });
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
      title: "Jujustu kaisen: Sukuna fire arrow",
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
  if (isPending || isPendingTrending || isPendingUpcoming) {
    return (
      <View className={"flex-1 justify-center items-center"}>
        <ActivityIndicator color={"white"} size={"large"} />
      </View>
    );
  }

  return (
    <SafeAreaView className={"flex-1 bg-neutral-900"}>
      <StatusBar style="light" />
      <View className={"flex-row justify-between items-center mx-4 mb-5"}>
        <Bars3CenterLeftIcon size={30} strokeWidth={2} color={"#fff"} />
        <Text className={"text-3xl text-white"}>
          <Text style={themeStyles.text}>M</Text>ovies
        </Text>
        <TouchableOpacity
          onPress={() => {
            router.push({
              pathname: "/Search",
            });
          }}
        >
          <MagnifyingGlassIcon size={30} strokeWidth={2} color={"#fff"} />
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        {TrendingMoviesData && TrendingMoviesData?.data?.results && (
          <TrendingMovies data={TrendingMoviesData?.data?.results} />
        )}

        {UpcomingMoviesData && (
          <MovieList
            data={UpcomingMoviesData?.data?.results}
            title={"Upcoming"}
          />
        )}
        <MovieList data={MoviesData?.data?.results} title={"Top Rated"} />
      </ScrollView>
    </SafeAreaView>
  );
}
