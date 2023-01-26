import { useEffect, useRef, useState } from "react"
import { pokemonAPI } from "../api/pokemonApi"
import { PokemonPaginatedResponse, PokemonResult, SimplePokemon } from "../interfaces/pokemonInterface"



export const usePokemonPaginated = () => {
    
    const nextUrl = useRef('https://pokeapi.co/api/v2/pokemon?limit=20')
    const [ simplePokemonList, setSimplePokemonList ] = useState<SimplePokemon[]>([])

    const loadPokemos = async() => {
        const { data } = await pokemonAPI.get<PokemonPaginatedResponse>( nextUrl.current )
        nextUrl.current = data.next
        mapPokemonResponseToSimplePokemon( data.results )
    }

    const mapPokemonResponseToSimplePokemon = ( pokemonList: PokemonResult[] ) => {
        pokemonList.forEach( poke => console.log(poke.name) )
    }

    useEffect(() => {
      loadPokemos()
    }, [])
    

    return {}
}
