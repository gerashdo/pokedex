import { useEffect, useRef, useState } from "react"
import { pokemonAPI } from "../api/pokemonApi"
import { PokemonPaginatedResponse, PokemonResult, SimplePokemon } from '../interfaces/pokemonInterface';



export const usePokemonPaginated = () => {
    
    const nextUrl = useRef('https://pokeapi.co/api/v2/pokemon?limit=40')
    const [ isLoading, setIsLoading ] = useState( true )
    const [ simplePokemonList, setSimplePokemonList ] = useState<SimplePokemon[]>([])

    const loadPokemos = async() => {
        setIsLoading( true )

        const { data } = await pokemonAPI.get<PokemonPaginatedResponse>( nextUrl.current )
        nextUrl.current = data.next

        const newPokemonList = mapPokemonResponseToSimplePokemon( data.results )
        setSimplePokemonList([ ...simplePokemonList, ...newPokemonList ])

        setIsLoading( false )
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
        isLoading,
        loadPokemos,
    }
}
