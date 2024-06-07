import {
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
import { getSimilarMovies, MovieItem } from "@/config/api";
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
  } = useQuery({
    queryKey: ["similar-movies", (params as unknown as MovieItem)?.id],
    queryFn: async () =>
      await getSimilarMovies((params as unknown as MovieItem)?.id),
  });

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
      <View>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/original${
              (params as unknown as MovieItem)?.backdrop_path
            }`,
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
          {(params as unknown as MovieItem)?.title}
        </Text>
        <Text
          className={"text-neutral-400 text-base text-center font-semibold"}
        >
          Released .{" "}
          {(params as unknown as MovieItem).release_date?.split("-")[0]} .
          170min
        </Text>
        <View className={"flex-row mx-4 space-x-2 justify-center"}>
          {/*{*/}
          {/*  // Genres*/}
          {/*  (params as unknown as MovieItem)?.genres?.map((genre, index) => (*/}
          {/*      <Text*/}
          {/*          key={index}*/}
          {/*          className={*/}
          {/*          "text-neutral-400 text-base text-center font-semibold"*/}
          {/*          }*/}
          {/*      >*/}
          {/*          {genre.name}*/}
          {/*      </Text>*/}
          {/*      ))*/}
          {/*}*/}
          <Text
            className={"text-neutral-400 text-base text-center font-semibold"}
          >
            Action .
          </Text>
          <Text
            className={"text-neutral-400 text-base text-center font-semibold"}
          >
            Thrill .
          </Text>
          <Text
            className={"text-neutral-400 text-base text-center font-semibold"}
          >
            Comedy
          </Text>
        </View>
        <Text className={"text-neutral-400 mx-4 tracking-wide"}>
          {(params as unknown as MovieItem).overview}
        </Text>
        {
          // Cast
          (params as unknown as MovieItem)?.id && (
            <Cast movie_id={(params as unknown as MovieItem)?.id} />
          )
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
    </ScrollView>
  );
}
