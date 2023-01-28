import React, { useEffect, useState } from 'react'
import { Dimensions, FlatList } from 'react-native'
import { Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Loader } from '../components/Loader'
import { PokemonCard } from '../components/PokemonCard'
import { SearchInput } from '../components/SearchInput'
import { usePokemonSearch } from '../hooks/usePokemonSearch'
import { SimplePokemon } from '../interfaces/pokemonInterface'
import { styles as globalStyles } from '../theme/appTheme'

const windowWidth = Dimensions.get('window').width

export const SearchScreen = () => {

    const { top } = useSafeAreaInsets()
    const { isFetching, simplePokemonList } = usePokemonSearch()
    const [ searchTerm, setSearchTerm ] = useState('')
    const [ filteredPokemons, setFilteredPokemons ] = useState<SimplePokemon[]>([])
    
    useEffect(() => {
      if( searchTerm.length === 0 ){
        return setFilteredPokemons([])
      }

      if( isNaN( Number( searchTerm) ) ){
          setFilteredPokemons(
            simplePokemonList.filter( 
                poke => poke.name.toLocaleLowerCase()
                    .includes( searchTerm.toLocaleLowerCase() )
            )
          )
      }else{
        const pokemonById = simplePokemonList.find( poke => poke.id === searchTerm )
        setFilteredPokemons(
            pokemonById ? [ pokemonById ] : []
        )
      }

    }, [ searchTerm ])
    

    if( isFetching ){
        return <Loader />
    }

    return (
        <View
            style={{
                flex: 1,
                marginHorizontal: 20,
            }}
        >
            <SearchInput
                onDebounce={ setSearchTerm }
                style={{
                    position: 'absolute',
                    zIndex: 999,
                    width: windowWidth - 40,
                    marginTop: top + 20,
                }}
            />
            
                <FlatList 
                    data={ filteredPokemons }
                    keyExtractor={ (item) => item.id }
                    renderItem={ ({ item }) => <PokemonCard pokemon={ item }/>}
                    ListHeaderComponent={(
                        <Text style={{ 
                            ...globalStyles.title,
                            ...globalStyles.globalMargin,
                            marginTop: top + 80,
                            marginBottom: 10,
                        }}>{ searchTerm }</Text>
                    )}
                    showsVerticalScrollIndicator={ false }
                    numColumns={ 2 }
                    // style={{ backgroundColor: 'red'}}
                />
            
        </View>
    )
}
