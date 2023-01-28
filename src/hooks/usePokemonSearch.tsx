import { useEffect, useRef, useState } from "react"
import { pokemonAPI } from "../api/pokemonApi"
import { PokemonPaginatedResponse, PokemonResult, SimplePokemon } from '../interfaces/pokemonInterface';

export const usePokemonSearch = () => {
    
    const [ isFetching, setIsFetching ] = useState( true )
    const [ simplePokemonList, setSimplePokemonList ] = useState<SimplePokemon[]>([])

    const loadPokemos = async() => {
        const { data } = await pokemonAPI.get<PokemonPaginatedResponse>( 'https://pokeapi.co/api/v2/pokemon?limit=1300' )

        const newPokemonList = mapPokemonResponseToSimplePokemon( data.results )
        setSimplePokemonList( newPokemonList )

        setIsFetching( false )
    }

    const mapPokemonResponseToSimplePokemon = ( pokemonList: PokemonResult[] ): SimplePokemon[] => {
        const newPokemonLis:SimplePokemon[] = pokemonList.map( ({ name, url }) => {
            const urlParts = url.split('/')
            const id = urlParts[ urlParts.length - 2 ]

            const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${ id }.png`
            
            return { id, name, picture }
        }) 

        return newPokemonLis
    }

    useEffect(() => {
      loadPokemos()
    }, [])
    

    return {
        simplePokemonList,
        isFetching,
    }
}
