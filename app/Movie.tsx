import {
  ActivityIndicator,
  Button,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { ChevronLeftIcon, HeartIcon } from "react-native-heroicons/solid";
import { themeStyles } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { getMovieDetails, getSimilarMovies } from "@/config/api";
import Cast from "@/components/Cast";
import { useQuery } from "@tanstack/react-query";
import MovieList from "@/components/MovieList";

var { width, height } = Dimensions.get("window");
const ios = Platform.OS === "ios";
const topMargin = ios ? "" : "mt-3";
export default function MovieScreen() {
  const params = useLocalSearchParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const {
    isPending: isPendingSimilarMovies,
    error: errorSimilarMovies,
    data: similarMoviesData,
    refetch: refetchSimilarMovies,
  } = useQuery({
    queryKey: ["similar-movies", (params as unknown as any)?.movie_id],
    queryFn: async () =>
      await getSimilarMovies((params as unknown as any)?.movie_id),
  });
  const {
    isPending: isPending,
    error: error,
    data: MovieDetails,
    refetch: refetchMovieDetails,
  } = useQuery({
    queryKey: ["movie", (params as unknown as any)?.movie_id],
    queryFn: async () =>
      await getMovieDetails((params as unknown as any)?.movie_id),
  });

  async function retry() {
    await refetchMovieDetails();
    await refetchSimilarMovies();
  }

  if (isPending) {
    return (
      <View className={"flex-1 justify-center items-center bg-neutral-900"}>
        <ActivityIndicator
          size={"large"}
          color={themeStyles.background.backgroundColor}
        />
      </View>
    );
  }

  if (error) {
    return (
      <View className={"flex-1 justify-center items-center bg-neutral-900"}>
        <Text className={"text-white"}>An error occurred</Text>
        <Button
          title={"Retry"}
          onPress={retry}
          color={themeStyles.background.backgroundColor}
        />
      </View>
    );
  }
  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: 20,
      }}
      className={"flex-1 bg-neutral-900"}
    >
      <View className={"w-full"}>
        <SafeAreaView
          className={`${topMargin} absolute z-20 w-full flex-row justify-between items-center px-4 h-fit`}
        >
          <TouchableOpacity
            style={themeStyles.background}
            className={"rounded-xl p-1 "}
            onPress={() => router.back()}
          >
            <ChevronLeftIcon size={28} strokeWidth={2.5} color={"white"} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsFavorite(!isFavorite)}
            className={"rounded-xl p-1 "}
          >
            <HeartIcon
              size={35}
              strokeWidth={2.5}
              color={
                isFavorite ? themeStyles.background.backgroundColor : "white"
              }
            />
          </TouchableOpacity>
        </SafeAreaView>
      </View>
      {isPending ? (
        <View className={"max-h-48"}>
          <ActivityIndicator
            color={themeStyles.background.backgroundColor}
            size={"large"}
          />
        </View>
      ) : (
        <>
          <View>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/original${MovieDetails?.data?.backdrop_path}`,
              }}
              style={{
                width,
                height: height * 0.55,
              }}
            />
            <LinearGradient
              colors={["transparent", "rgba(23,23,23,0.8)", "rgba(23,23,23,1)"]}
              style={{
                width,
                height: height * 0.48,
              }}
              start={{
                x: 0.5,
                y: 0,
              }}
              end={{
                x: 0.5,
                y: 1,
              }}
              className={"absolute bottom-0"}
            />
          </View>
          <View
            style={{
              marginTop: -(height * 0.09),
            }}
            className={"space-y-3"}
          >
            <Text
              className={
                "text-white text-3xl text-center tracking-wider font-bold "
              }
            >
              {MovieDetails?.data?.title}
            </Text>
            <Text
              className={"text-neutral-400 text-base text-center font-semibold"}
            >
              Released . {MovieDetails?.data?.release_date?.split("-")[0]} .
              170min
            </Text>
            <View className={"flex-row mx-4 space-x-2 justify-center"}>
              {// Genres
              MovieDetails?.data?.genres?.map(
                (genre: IGenre, index: number) => (
                  <Text
                    key={index}
                    className={
                      "text-neutral-400 text-base text-center font-semibold"
                    }
                  >
                    {genre.name}{" "}
                    {index + 1 < MovieDetails?.data?.genres?.length && "."}
                  </Text>
                ),
              )}
            </View>
            <Text className={"text-neutral-400 mx-4 tracking-wide"}>
              {MovieDetails?.data?.overview}
            </Text>
            {
              // Cast
              params && <Cast movie_id={(params as any)?.movie_id} />
            }
            {
              // Similar Movies
              similarMoviesData && (
                <MovieList
                  data={similarMoviesData?.data?.results}
                  title={"Similar movies"}
                  hideSeeAll
                />
              )
            }
          </View>
        </>
      )}
    </ScrollView>
  );
}
