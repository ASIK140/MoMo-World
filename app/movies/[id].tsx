import {ScrollView, StyleSheet, Text, Image, View, TouchableOpacity, ActivityIndicator} from 'react-native'
import React, {useEffect, useState} from 'react'
import {router, useLocalSearchParams} from "expo-router";
import {fetchMoviesDetails} from "@/services/api";
import {icons} from "@/constants/icons";
interface MovieInfoProps {
    label:string,
    value:number| string |null|undefined
}
const MovieInfo=({label,value}:MovieInfoProps)=>{
    return(
        <View className="flex-col items-start mt-5">
            <Text className="text-light-200 font-normal text-sm">{label}</Text>
            <Text className="text-light-100 font-bold text-sm mt-2 text-justify">{value || "N/A"}</Text>
        </View>
    )
}
const MovieDetails = () => {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const {id}=useLocalSearchParams()
    const getMovieDetails = async ()=>{
      try {
          const data = await fetchMoviesDetails(id as string)
            if (data!=null){
                setMovie(data)
            }
      }catch (err) {
          console.error("Error fetching movies: ", err)
      }finally {
          setLoading(false)
      }
    }
    useEffect(() => {
        getMovieDetails()
    }, []);
  return (
    <View className="flex-1 bg-primary">

        {loading?<ActivityIndicator size="large" color="#000ff" className='my-3 mt-80'/>:
            <ScrollView contentContainerStyle={{
                paddingBottom:80
            }} className="">
                <View>
                    <Image className="w-full h-[550px]"  source={{uri:movie?.Poster}}/>
                </View>
                <View className="flex-col items-start justify-center mt-5 px-5">
                    <Text className="text-white font-bold text-xl">
                        {movie?.Title}
                    </Text>
                    <View className="flex-row gap-x-1 mt-2 items-center">
                        <Text className="text-light-200 text-sm">
                            {movie?.Released}
                        </Text>
                        <Text className="text-light-200 text-sm">{movie?.Runtime}</Text>
                    </View>
                    <View className="flex-row gap-x-1 mt-2 items-center bg-dark-100 px-2 py-1 rounded-md">
                        <Image source={icons.star} className="size-4"/>
                        <Text className="text-white font-bold text-sm">{movie?.imdbRating}</Text>
                        <Text className="text-light-200 text-sm">({movie?.imdbVotes} votes)</Text>
                    </View>
                    <MovieInfo label={"Overview"} value={movie?.Plot}/>
                    <MovieInfo label={"Actors"} value={movie?.Actors}/>
                    <View className="flex flex-row w-full gap-10">
                        <MovieInfo label={"Director"} value={movie?.Director}/>
                        <MovieInfo label={"Writer"} value={movie?.Writer}/>
                    </View>
                    <MovieInfo label={"Genres"} value={movie?.Genre?.replace(/, /g, ' - ')}/>
                    <MovieInfo label={"BoxOffice Collection"} value={movie?.BoxOffice}/>

                </View>
            </ScrollView>
        }
        <TouchableOpacity className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
        onPress={router.back}
        >
            <Image source={icons.arrow} className="size-5 mr-1 mt-0.5 rotate-180" tintColor="#fff"/>
            <Text className="text-white font-semibold text-base">Go back</Text>
        </TouchableOpacity>
    </View>
  )
}

export default MovieDetails

const styles = StyleSheet.create({})