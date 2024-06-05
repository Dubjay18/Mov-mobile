import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Cast({
  cast,
}: {
  cast: {
    personName: string;
    characterName: string;
  }[];
}) {
  return (
    <View className={"my-6"}>
      <Text className={"text-lg mx-4 mb-5 text-white"}>Top Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 15 }}
      >
        {cast &&
          cast.map(
            (
              person: {
                personName: string;
                characterName: string;
              },
              index: number,
            ) => (
              <TouchableOpacity key={index} className={"mr-4 items-center"}>
                <View
                  className={
                    "overflow-hidden rounded-full h-20 w-20 items-center border-neutral-500"
                  }
                >
                  <Image
                    source={require("../assets/images/sukuna.jpg")}
                    className={"rounded-xl h-24 w-20"}
                  />
                </View>
                <Text className={"text-white text-xs mt-1"}>
                  {person.personName.length > 10
                    ? person.personName.slice(0, 14) + "..."
                    : person.personName}
                </Text>

                <Text className={"text-neutral-400 text-xs mt-1"}>
                  {person.characterName.length > 10
                    ? person.characterName.slice(0, 14) + "..."
                    : person.characterName}
                </Text>
              </TouchableOpacity>
            ),
          )}
      </ScrollView>
    </View>
  );
}
