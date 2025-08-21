import {Image, StyleSheet, Text, TextInput, View} from 'react-native'
import React from 'react'
import {icons} from "@/constants/icons";
interface Props {
    placeholder:string,
    onPress?: () => void,
}
const SearchBar = ({placeholder,onPress}:Props) => {
  return (
    <View className="flex-row px-5 py-4 items-center bg-dark-200 rounded-full ">
      <Image source={icons.search} className="size-5" resizeMode="contain" tintColor="#ab8bf"/>
        <TextInput
            onPress={onPress}
            value=""
            onChange={()=>{}}
            placeholderTextColor="#a8b5db"
            className="flex-1 ml-2 text-white"
            placeholder={placeholder}
        />
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({})