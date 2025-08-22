import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import {Link} from "expo-router";
interface Movie {
    Title: string;
    Year: string;
    Type: string;
    imdbID:string,
    Poster: string;
}
const MovieCard = ({Title,Poster,Year,Type,imdbID}:Movie) => {
  return (
    <Link href={`/movies/${imdbID}`} asChild>
        <TouchableOpacity className="w-[30%]" >
                <Image
                    source={{uri:Poster}}
                    className="w-full h-52 rounded-lg"
                    resizeMode={"cover"}
                />
            <Text className="text-white text-sm font-bold mt-2" numberOfLines={1}>{Title}</Text>
            <View className="flex-row items-center mt-1 gap-2">
                <Text className="text-sm text-light-200">{Year}</Text>
                {/*<Text className="text-sm text-light-200 capitalize">{Type}</Text>*/}
            </View>
        </TouchableOpacity>
    </Link>
  )
}

export default MovieCard

const styles = StyleSheet.create({})