
export interface PokemonPaginatedResponse {
    count:    number;
    next:     string;
    previous: null;
    results:  PokemonResult[];
}

export interface PokemonResult {
    name: string;
    url:  string;
}

export interface SimplePokemon {
    id: string;
    name: string;
    picture:  string;
}
