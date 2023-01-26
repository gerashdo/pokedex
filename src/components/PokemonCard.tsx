import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, Image, StyleSheet } from 'react-native';
import { Text, TouchableOpacity, View } from 'react-native'

import ImageColors from 'react-native-image-colors'

import { SimplePokemon } from '../interfaces/pokemonInterface'
import { FadeInImage } from './FadeInImage';

interface Props {
    pokemon: SimplePokemon;
}

const windowWidth = Dimensions.get('window').width

export const PokemonCard = ({ pokemon }:Props ) => {

    const [ bgColor, setBgColor ] = useState('gray')
    const isMounted = useRef( true )

    const getPictureColors = async() => {
        const result = await ImageColors.getColors( pokemon.picture )

        if( !isMounted ) return

        if( result.platform === 'android' ){
            setBgColor( result.dominant || 'gray' )
        }else if( result.platform === 'ios' ){
            setBgColor( result.background )
        }
    }

    useEffect(() => {
      getPictureColors()
    
      return () => {
        isMounted.current = false
      }
    }, [])
    

    return (
        <TouchableOpacity
            activeOpacity={ 0.95 }
        >
            <View style={{ ...styles.cardContainer, backgroundColor: bgColor }}>
                <Text style={ styles.name }>{ pokemon.name }</Text>
                <Text style={ styles.number }>{ `# ${pokemon.id}` }</Text>
                <View style={ styles.pokebolaContainer }>
                    <Image 
                        source={ require('../assets/pokebola-blanca.png') }
                        style={ styles.pokebola }
                    />
                </View>

                <FadeInImage 
                    uri={ pokemon.picture }
                    style={ styles.pokemonPicture }
                />

            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardContainer:{
        height: 120,
        width: windowWidth * 0.4,
        marginHorizontal: 10,
        marginVertical: 10,
        padding: 10,
        borderRadius: 15,
    },
    name: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
    number: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    pokemonPicture:{
        height: 100, 
        width: 100,
        position: 'absolute',
        right: -5,
        bottom: -8,
    },
    pokebolaContainer: {
        height: 100,
        width: 100,
        position: 'absolute',
        right: 0,
        bottom: 0,
        overflow: 'hidden',
    },
    pokebola: {
        height: 100,
        width: 100,
        position: 'absolute',
        right: -20,
        bottom: -20,
    }
})
