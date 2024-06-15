import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getCredits } from "@/config/api";
import { useEffect } from "react";
import { router } from "expo-router";

export default function Cast({ movie_id }: { movie_id: number }) {
  const {
    data: castData,
    error: castError,
    isLoading: castIsLoading,
  } = useQuery({
    queryKey: ["credits", movie_id],
    queryFn: async () => await getCredits(movie_id),
  });
  useEffect(() => {
    console.log(castError);
  }, [castError]);
  return (
    <View className={"my-6"}>
      <Text className={"text-lg mx-4 mb-5 text-white"}>Top Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 15 }}
      >
        {castData &&
          castData?.data &&
          castData?.data?.cast?.map((person: any, index: number) => (
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/cast",
                  params: {
                    person_id: person.id,
                  },
                })
              }
              key={index}
              className={"mr-4 items-center"}
            >
              <View
                className={
                  "overflow-hidden rounded-full h-20 w-20 items-center border-neutral-500"
                }
              >
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/original${person.profile_path}`,
                  }}
                  className={"rounded-xl h-24 w-20"}
                />
              </View>
              <Text className={"text-white text-xs mt-1"}>
                {person.name.length > 10
                  ? person.name.slice(0, 14) + "..."
                  : person.name}
              </Text>

              <Text className={"text-neutral-400 text-xs mt-1"}>
                {person.character.length > 10
                  ? person.character.slice(0, 14) + "..."
                  : person.character}
              </Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
}
