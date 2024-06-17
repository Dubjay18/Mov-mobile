import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { MovieItem, searchMovies } from "@/config/api";
import { XMarkIcon } from "react-native-heroicons/solid";
import { useState } from "react";
import { themeStyles } from "@/constants/Colors";

var { width, height } = Dimensions.get("window");
export default function SearchScreen() {
  const params = useLocalSearchParams();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const {
    isPending: isPending,
    error: error,
    data: moviesData,
    refetch: refetchMoviesData,
  } = useQuery({
    queryKey: ["search-movies"],
    enabled: false,
    queryFn: async () => await searchMovies(searchQuery || ""),
  });
  const imageBaseUrl = "https://image.tmdb.org/t/p/original";
  return (
    <SafeAreaView className={"flex-1 bg-neutral-900"}>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 20,
        }}
        className={"flex-1 bg-neutral-900"}
      >
        <View className={"my-4 w-full"}>
          <View
            className={
              "w-full rounded-full border-2 border-neutral-500 flex-row"
            }
          >
            <TextInput
              placeholder={"Search movie"}
              keyboardType={"web-search"}
              placeholderTextColor={"lightgrey"}
              onChangeText={(text) => setSearchQuery(text)}
              onSubmitEditing={() => refetchMoviesData()}
              value={searchQuery}
              className={
                "font-semibold h-14 text-white text-base rounded-full flex-1 pb-1 pl-6 tracking-wider"
              }
            />
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/",
                })
              }
              className={" rounded-full p-3 m-1 bg-neutral-500"}
            >
              <XMarkIcon className={"text-white"} color={"white"} size={24} />
            </TouchableOpacity>
          </View>
        </View>
        {moviesData?.data?.results?.length > 0 && (
          <Text className={"text-neutral-400 mb-2 px-4"}>
            Search Results ({moviesData?.data?.results?.length || 0})
          </Text>
        )}
        {isPending ? (
          <View className={"flex-1 justify-center items-center bg-neutral-900"}>
            <ActivityIndicator
              size={"large"}
              color={themeStyles.background.backgroundColor}
            />
          </View>
        ) : error ? (
          <View className={"flex-1 justify-center items-center bg-neutral-900"}>
            <Text className={"text-white"}>An error occurred</Text>
            <TouchableOpacity onPress={() => refetchMoviesData}>
              <Text style={themeStyles.text} className={"text-lg"}>
                Retry
              </Text>
            </TouchableOpacity>
          </View>
        ) : moviesData?.data?.results?.length == 0 ? (
          <View className={"flex-1 justify-center items-center bg-neutral-900"}>
            <Text className={"text-white"}>No results found</Text>
          </View>
        ) : (
          <View className={"flex-row justify-between flex-wrap px-3"}>
            {moviesData?.data?.results.map(
              (movie: MovieItem, index: number) => (
                <TouchableWithoutFeedback
                  onPress={() =>
                    router.push({
                      pathname: "/Movie",
                      params: {
                        movie_id: movie.id,
                      },
                    })
                  }
                >
                  <View className={"space-y-4 mb-4"}>
                    <Image
                      source={{ uri: `${imageBaseUrl}${movie?.poster_path}` }}
                      className={"rounded-3xl"}
                      style={{
                        width: width * 0.44,
                        height: height * 0.3,
                      }}
                    />
                    <Text className={"text-neutral-300 text-lg"}>
                      {movie.title.length > 14
                        ? movie.title.slice(0, 14) + "..."
                        : movie.title}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              ),
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
