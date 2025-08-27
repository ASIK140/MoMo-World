import {ActivityIndicator, FlatList, Image, Text, View} from 'react-native'
import React, {useState,useEffect} from 'react'
import {images} from "@/constants/images";
import {fetchMovies} from "@/services/api";
import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import {icons} from "@/constants/icons";

interface Movie {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}
const Search = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState<Movie[]>([])
    const [loading, setLoading] = useState(true)

    const getMovies=async (query:string="")=>{
        try {
            setLoading(true)
            setMovies([])
            const data = await fetchMovies(query);
            if (data && data.Response==="True" && data.Search){
                setMovies(data.Search);
            }
        }catch (err){
            console.error("Error fetching movies: ", err)
        }finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getMovies()
    },[]);
    const searchMovies=async ()=>{
            getMovies(searchQuery);
    }
  return (
      <View className="flex-1 bg-primary">
          <Image source={images.bg} className="w-full flex-1 absolute z-0" resizeMode="cover" />
          <FlatList data={movies} renderItem={({item})=>(
              <MovieCard {...item} />
          )}
                    keyExtractor={(item, index) => index.toString()}
                    className="px-5"
                    numColumns={3}
                    columnWrapperStyle={{ justifyContent:"flex-start",gap:16,marginVertical:16}}
                    ListHeaderComponent={
                        <>
                            <View className="flex-1 mt-5">
                                <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto"/>
                                <View className="my-0">
                                    <SearchBar  value={searchQuery} OnChangeText={(text:string)=>setSearchQuery(text)} onSubmit={searchMovies}  placeholder="Search movies.."/>
                                </View>
                                {

                                    searchQuery?<Text className="text-lg text-white font-bold mt-5 mb-2">Search for {searchQuery}</Text> :
                                        <Text className="text-lg text-white font-bold mt-5 mb-2">Latest Movies</Text>
                                }
                                {loading && (<ActivityIndicator size="large" color="#000ff" className='my-3'/>)}
                            </View>
                        </>
                    }

                    ListEmptyComponent={
                        !loading? <View className="mt-10 px-5">
                        <Text className="text-center text-gray-500" >No movies found</Text>
                        </View>:null
                    }
          />
      </View>
  )
}

export default Search
