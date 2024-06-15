import {
  ActivityIndicator,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getPerson, getPersonMovies } from "@/config/api";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeStyles } from "@/constants/Colors";
import { ChevronLeftIcon, HeartIcon } from "react-native-heroicons/solid";
import { useState } from "react";
import MovieList from "@/components/MovieList";

var { width, height } = Dimensions.get("window");
const ios = Platform.OS === "ios";
const verticalMargin = ios ? "" : "my-3";
export default function CastScreen() {
  const params = useLocalSearchParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const {
    isPending: isPending,
    error: error,
    data: personDetails,
    refetch: refetchPersonDetails,
  } = useQuery({
    queryKey: ["cast", (params as unknown as any)?.person_id],
    queryFn: async () => await getPerson((params as unknown as any)?.person_id),
  });
  const {
    isPending: isPendingPersonMovies,
    error: errorPersonMovies,
    data: personMovies,
  } = useQuery({
    queryKey: ["person-movies", (params as unknown as any)?.person_id],
    queryFn: async () =>
      await getPersonMovies((params as unknown as any)?.person_id),
  });

  async function retry() {
    await refetchPersonDetails();
  }

  if (isPending) {
    return (
      <View className={"flex-1 justify-center items-center"}>
        <ActivityIndicator
          size={"large"}
          color={themeStyles.background.backgroundColor}
        />
      </View>
    );
  }

  if (error) {
    return (
      <View className={"flex-1 justify-center items-center"}>
        <Text className={"text-white"}>
          An error occurred. Please try again.
        </Text>
        <TouchableOpacity onPress={retry}>
          <Text className={"text-white underline"}>Retry</Text>
        </TouchableOpacity>
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
      <SafeAreaView
        className={`${verticalMargin}  z-20 w-full flex-row justify-between items-center px-4 h-fit`}
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
      <View className={"flex-row justify-center items-center "}>
        <View
          style={{
            shadowColor: "gray",
            shadowRadius: 40,
            shadowOpacity: 1,
            shadowOffset: { width: 0, height: 5 },
          }}
        >
          <View
            className={
              "overflow-hidden rounded-full h-72 w-72 items-center border-neutral-500"
            }
          >
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/original${personDetails?.data?.profile_path}`,
              }}
              className={""}
              style={{
                width: width * 0.7,
                height: width * 0.74,
              }}
            />
          </View>
        </View>
      </View>
      <View className={"flex-row justify-center items-center"}>
        <View className={"mt-4"}>
          <Text className={"text-white text-2xl text-center"}>
            {personDetails?.data?.name}
          </Text>
          <Text className={"text-neutral-400 text-lg text-center"}>
            {personDetails?.data?.place_of_birth}
          </Text>
        </View>
      </View>
      <View
        className={
          "mx-3 my-4 flex-row justify-between rounded-full bg-neutral-700 p-3"
        }
      >
        <View className={"pr-4 border-r-white border-r-2"}>
          <Text className={"text-white text-lg text-center"}>Gender</Text>
          <Text className={"text-neutral-400 text-lg text-center"}>
            {personDetails?.data?.gender == 1
              ? "Female"
              : personDetails?.data?.gender
                ? "Male"
                : "Not Specified"}
          </Text>
        </View>
        <View className={"pr-4 border-r-white border-r-2"}>
          <Text className={"text-white text-lg text-center"}>Birthday</Text>
          <Text className={"text-neutral-400 text-lg text-center"}>
            {personDetails?.data?.birthday}
          </Text>
        </View>
        <View className={"pr-4 border-r-white border-r-2"}>
          <Text className={"text-white text-lg text-center"}>Known for</Text>
          <Text className={"text-neutral-400 text-lg text-center"}>
            {personDetails?.data?.known_for_department}
          </Text>
        </View>
        <View className={"pr-4"}>
          <Text className={"text-white text-lg text-center"}>Popularity</Text>
          <Text className={"text-neutral-400 text-lg text-center"}>
            {personDetails?.data?.popularity}
          </Text>
        </View>
      </View>
      <View className={"my-6 mx-4 space-y-2"}>
        <Text className={"text-lg text-white"}>Biography</Text>
        <Text className={"text-neutral-400 tracking-wide"}>
          {personDetails?.data?.biography}
        </Text>
      </View>
      <MovieList
        data={personMovies?.data?.cast}
        title={"Movies"}
        hideSeeAll={true}
      />
    </ScrollView>
  );
}
