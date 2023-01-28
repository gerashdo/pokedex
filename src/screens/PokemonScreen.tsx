import React from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { Text, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { RootStackParams } from '../navigation/Navigation'
import { StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons'
import { styles } from '../theme/appTheme'
import { FadeInImage } from '../components/FadeInImage';
import { usePokemon } from '../hooks/usePokemon';
import { PokemonDetails } from '../components/PokemonDetails';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'>{}

export const PokemonScreen = ({ route, navigation }:Props) => {
  const { top } = useSafeAreaInsets()
  const { simplePokemon, color } = route.params
  const { name, id, picture } = simplePokemon
  const { pokemon, isLoading } = usePokemon( simplePokemon.id )

  return (
    <View
      style={{ flex: 1 }}
    >
        <View
          style={{ 
            ...localStyles.colorContainer, 
            backgroundColor: color,
            zIndex: 999,
          }}
        >
          <View style={{ 
            ...styles.globalMargin,
            alignSelf: 'flex-start' 
          }}>
            <Text
              style={{
                ...localStyles.pokemonName,
                ...localStyles.text,
                marginTop: top + 50
              }}
            >{ name }</Text>
            <Text
              style={{
                ...localStyles.pokemonNumber,
                ...localStyles.text,
              }}
            >#{ id }</Text>
          </View>

          <TouchableOpacity
            onPress={ () => navigation.pop() }
            activeOpacity={ 0.8 }
            style={{
              ...localStyles.backArrow,
              top: top + 10,
            }}
          >
            <Icon 
              name='arrow-back-outline'
              size={ 40 }
              color="white"
            />
          </TouchableOpacity>
          
          <Image 
            source={ require('../assets/pokebola-blanca.png') }
            style={ localStyles.pokeball }
          />

          <FadeInImage 
            uri={ picture }
            style={ localStyles.pokemonPicture }
          /> 

        </View>

        {
          isLoading
          ? (
            <View style={ localStyles.loadingIndicator }>
              <ActivityIndicator size={ 40 } color={ color }/>
            </View>
          ): <PokemonDetails pokemon={ pokemon }/>
        }
    </View>
  )
}

const localStyles = StyleSheet.create({
  colorContainer:{
    height: 400,
    width: '100%',
    borderBottomEndRadius: 1000,
    borderBottomStartRadius: 1000,
    alignItems: 'center'
  },
  backArrow:{
    position: 'absolute',
    left: 15,
  },
  text: {
    fontWeight: 'bold',
    color: 'white'
  },
  pokemonName: {
    fontSize: 50,
  },
  pokemonNumber:{
    fontSize: 35,
  },
  pokeball:{
    height: 250,
    width: 250,
    position: 'absolute',
    bottom: 10,
    opacity: 0.3,
  },
  pokemonPicture:{
    height: 250,
    width: 250,
  },
  loadingIndicator:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
