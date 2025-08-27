import {ScrollView, Image, StyleSheet, Text, View, ActivityIndicator, FlatList} from 'react-native'
import React, {useEffect, useState} from 'react'
import {images} from "@/constants/images";
import {icons} from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import {useRouter} from "expo-router";
import {fetchMovies} from "@/services/api";
import MovieCard from "@/components/MovieCard";
interface Movie {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}
const Index = () => {
        const router = useRouter()
        const [movies, setMovies] = useState<Movie[]>([])
        const [loading, setLoading] = useState(true)
    useEffect(() => {
        const getMovies=async ()=>{
            try {
                const data = await fetchMovies();
                if (data && data.Response==="True" && data.Search){
                    setMovies(data.Search);
                }
            }catch (err){
                console.error("Error fetching movies: ", err)
            }finally {
                setLoading(false)
            }
        }
        getMovies()
    }, []);
    return (
    <View className="flex-1 bg-primary">
        <Image source={images.bg} className="absolute w-full z-0"/>
        <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{
            minHeight:"100%",
            paddingBottom:10
        }} >
            <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto"/>
            <View className="flex-1 mt-5">
                <SearchBar
                    onPress={()=>router.push("/search")}
                    placeholder={"Search for a movie"}
                />
                {
                    loading?(
                        <ActivityIndicator size="large" color="#000ff" />

                    ):(
                        <>
                            <Text className="text-lg text-white font-bold mt-5 mb-2">Latest Movies</Text>

                            <FlatList data={movies} renderItem={
                                ({item})=>(
                                    <MovieCard
                                        {...item}
                                    />
                                )
                            }
                                      keyExtractor={(item) => item.imdbID}
                                      numColumns={3}
                                      columnWrapperStyle={
                                {
                                    justifyContent:"flex-start",
                                    gap:20,
                                    paddingRight:5,
                                    marginBottom:10
                                }
                                      }
                                      className="mt-2 pb-32"
                                      scrollEnabled={false}
                            />
                        </>
                    )
                }
            </View>

        </ScrollView>
    </View>
  )
}

export default Index

const styles = StyleSheet.create({})
