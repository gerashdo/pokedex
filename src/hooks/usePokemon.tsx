import { useEffect, useState } from 'react'
import { pokemonAPI } from '../api/pokemonApi'
import { FullPokemon } from '../interfaces/pokemonInterface'

export const usePokemon = ( id: string ) => {

    const [isLoading, setIsLoading] = useState(true)
    const [ pokemon, setPokemon ] = useState<FullPokemon>( {} as FullPokemon )

    const loadPokemon = async() => {
        const { data } = await pokemonAPI.get<FullPokemon>( `https://pokeapi.co/api/v2/pokemon/${ id }` )
        setPokemon( data )
        setIsLoading( false )
    }

    useEffect(() => {
      loadPokemon()
    }, [])
    

  return {
    pokemon,
    isLoading,
  }
}
