import {Text, TouchableWithoutFeedback, View} from "react-native";
import {MovieItem} from "@/config/api";

export default function MovieCard({
                                      movie,
                                  }: {
    movie: MovieItem
}) {
    return (
        <TouchableWithoutFeedback>

            <View className={"flex-row items-center"}>
                <Image source={{uri: movie.poster_path}} className={"w-32 h-48 rounded-lg"}/>
                <View className={"ml-4"}>
                    <Text className={"text-white text-lg"}>{movie.title}</Text>
                    <Text className={"text-gray-400"}>{movie.release_date}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );

}