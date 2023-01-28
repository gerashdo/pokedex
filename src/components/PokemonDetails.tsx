import React from 'react'
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import { FullPokemon } from '../interfaces/pokemonInterface'
import { FadeInImage } from './FadeInImage';

interface Props {
    pokemon: FullPokemon;
}

export const PokemonDetails = ({ pokemon }:Props) => {
  return (
    <ScrollView
        style={{ ...StyleSheet.absoluteFillObject }}
        showsVerticalScrollIndicator={ false }
    >
        {/* Types and weight */}
        <View style={{
            ...styles.container,
            ...styles.globalMargin,
        }}>
            <Text style={{
                ...styles.title,
            }}>Tipos</Text>
            <View
                style={{
                    flexDirection: 'row',
                }}
            >
                {
                    pokemon.types.map( ({ type }) => (
                        <Text
                            key={ type.name }
                            style={{
                                ...styles.regularText,
                                marginRight: 10,
                            }}
                        >{ type.name }</Text>
                    ))
                }
            </View>
            <Text style={{
                ...styles.title,
            }}>Peso</Text>
            <Text style={{
                ...styles.regularText,
            }}>{ Number(pokemon.weight) / 10 } kg</Text>
        </View>

        <View>
            <Text style={{
                ...styles.title,
                ...styles.globalMargin 
            }}>Spirites</Text>
            <ScrollView
                 horizontal={ true }
                 showsHorizontalScrollIndicator={ false }
            >
                <FadeInImage 
                    uri={ pokemon.sprites.front_default }
                    style={ styles.spriteImage }
                />
                <FadeInImage 
                    uri={ pokemon.sprites.back_default }
                    style={ styles.spriteImage }
                />
                <FadeInImage 
                    uri={ pokemon.sprites.front_shiny }
                    style={ styles.spriteImage }
                />
                <FadeInImage 
                    uri={ pokemon.sprites.back_shiny }
                    style={ styles.spriteImage }
                />
                {
                    pokemon.sprites.front_female && (
                        <FadeInImage 
                            uri={ pokemon.sprites.front_female }
                            style={ styles.spriteImage }
                        />
                    )
                }
                {
                    pokemon.sprites.back_female && (
                        <FadeInImage 
                            uri={ pokemon.sprites.back_female }
                            style={ styles.spriteImage }
                        />
                    )
                }
                {
                    pokemon.sprites.front_shiny_female && (
                        <FadeInImage 
                            uri={ pokemon.sprites.front_shiny_female }
                            style={ styles.spriteImage }
                        />
                    )
                }
                {
                    pokemon.sprites.back_shiny_female && (
                        <FadeInImage 
                            uri={ pokemon.sprites.back_shiny_female }
                            style={ styles.spriteImage }
                        />
                    )
                }
            </ScrollView>

            {/* Stats */}
            <View style={{
                ...styles.globalMargin,
            }}>
                <Text style={{
                    ...styles.title,
                    marginTop: 0,
                }}>Stats</Text>
                <View>
                    {
                        pokemon.stats.map( ( stat, index ) => (
                            <View
                                key={ stat.stat.name + index }
                                style={{ flexDirection: 'row' }}
                            >
                            <Text
                                key={ stat.stat.name }
                                style={{
                                    ...styles.regularText,
                                    width: 170,
                                }}
                            >{ stat.stat.name }</Text>
                            <Text
                                key={ stat.base_stat }
                                style={{
                                    ...styles.regularText,
                                    marginRight: 10,
                                }}
                            >{ stat.base_stat }</Text>
                            </View>
                        ))
                    }
                </View>
            </View>

            {/* Abilities */}
            <View style={{
                ...styles.globalMargin,
            }}>
                <Text style={{
                    ...styles.title,
                }}>Habilidades</Text>
                <View style={{ flexDirection: 'row'}}>
                    {
                        pokemon.abilities.map( ({ ability }) => (
                            <Text
                                key={ ability.name }
                                style={{
                                    ...styles.regularText,
                                    marginRight: 10,
                                }}
                            >{ ability.name }</Text>
                        ))
                    }
                </View>
            </View>

            {/* Moves */}
            <View style={{
                ...styles.globalMargin,
                marginBottom: ( Platform.OS === 'ios' ) ? 95 : 75,
            }}>
                <Text style={{
                    ...styles.title,
                }}>Movimientos</Text>
                <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
                    {
                        pokemon.moves.map( ({ move }) => (
                            <Text
                                key={ move.name }
                                style={{
                                    ...styles.regularText,
                                    marginRight: 10,
                                }}
                            >{ move.name }</Text>
                        ))
                    }
                </View>
            </View>


        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 400
    },
    globalMargin: {
        marginHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 15,
    },
    regularText:{
        fontSize: 18,
    },
    spriteImage:{
        width: 100,
        height: 100,
    }
})
