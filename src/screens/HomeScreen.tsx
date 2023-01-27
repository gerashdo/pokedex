import React from 'react'
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from '../theme/appTheme';
import { usePokemonPaginated } from '../hooks/usePokemonPaginated';
import { PokemonCard } from '../components/PokemonCard';

interface Props extends StackScreenProps<any,any>{}

export const HomeScreen = ({ navigation }:Props) => {
    const { top } = useSafeAreaInsets()

    const { isLoading, simplePokemonList, loadPokemos } = usePokemonPaginated()
    
    return (
        <>
            <Image 
                source={ require('../assets/pokebola.png') }
                style={{
                    height: 300,
                    opacity: 0.3,
                    position: 'absolute',
                    right: -100,
                    top: -100,
                    width: 300,
                }}
            />
            
            <View style={{ alignItems: 'center' }}>
                <FlatList 
                    data={ simplePokemonList }
                    keyExtractor={ (item) => item.id }
                    renderItem={ ({ item }) => <PokemonCard pokemon={ item }/>}
                    ListHeaderComponent={(
                        <Text style={{ 
                            ...styles.title,
                            ...styles.globalMargin,
                            marginTop: top + 20,
                            marginBottom: 10,
                        }}>Pokedex</Text>
                    )}
                    onEndReached={ () => loadPokemos() }
                    onEndReachedThreshold={ 0.4 }
                    ListFooterComponent={ () => <ActivityIndicator 
                        size={ 30 }
                        color="gray"
                        style={{
                            marginVertical: 40,
                        }}
                    />}
                    showsVerticalScrollIndicator={ false }
                    numColumns={ 2 }
                />
            </View>
        </>
    )
}
