import { useState } from "react";
import { pokeApi } from "@/api";
import { Layout } from "@/components/layouts";
import { PokemonListResponse, PokemonResponse } from "@/interfaces";
import { localFavorites } from "@/utils";
import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import confetti from 'canvas-confetti';




type Props = {
    pokemon: PokemonResponse
}


const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {


    const [ isInFavorites, setIsInFavorites] = useState( localFavorites.existsInFavorites(pokemon.id) )

    
    const onToggleFavorite = () => {
        localFavorites.toggleFavorites( pokemon.id );       
        setIsInFavorites(!isInFavorites); 

        if( !isInFavorites ) {
            confetti({
                zIndex: 999,
                particleCount: 100,
                spread: 160,
                angle: -100,
                origin: { x: 1, y: 0 }
            });
        }
    }

    return (

        <Layout title={pokemon.name}>

            <Grid.Container css={{ marginTop: '5px' }} gap={2}>

                <Grid xs={12} sm={4}>
                    <Card isHoverable css={{ padding: '30px' }}>
                        <Card.Body>
                            <Card.Image
                                src={`${pokemon.sprites.other?.dream_world.front_default || 'not image found'}`}
                                alt={pokemon.name}
                                width='100%'
                                height={200}
                            />
                        </Card.Body>
                    </Card>
                </Grid>

                <Grid xs={12} sm={8}>
                    <Card isHoverable css={{ padding: '30px' }}>
                        <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Text h1 transform="capitalize">{pokemon.name}</Text>
                            <Button
                                ghost = { !isInFavorites }
                                color="gradient"
                                onPress={onToggleFavorite}
                            >
                            { isInFavorites ? 'Borrar de Favoritos' : 'Agregar a Favoritos' }
                            </Button>
                        </Card.Header>
                        <Card.Body>
                            <Text size={20}>Sprites:</Text>

                            <Container display="flex" direction="row" gap={0}>
                                <Image
                                    src={`${pokemon.sprites.front_default || 'not image found'}`}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                                <Image
                                    src={`${pokemon.sprites.back_default || 'not image found'}`}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                                <Image
                                    src={`${pokemon.sprites.front_shiny || 'not image found'}`}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                                <Image
                                    src={`${pokemon.sprites.back_shiny || 'not image found'}`}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                            </Container>

                        </Card.Body>
                    </Card>
                </Grid>

            </Grid.Container>

        </Layout>

    )
}


export const getStaticPaths: GetStaticPaths = async (ctx) => {

    const { data } = await pokeApi.get<PokemonListResponse>(`/pokemon?limit=151`);

    const pokemonPaths: string[] = data.results.map( (pokemon) => pokemon.name );

    return {
        paths: pokemonPaths.map( (pokemon) => ({ params: { name: pokemon } }) ),
        fallback: false
    }

}


export const getStaticProps: GetStaticProps = async ({ params }) => {

    const { name } = params as { name: string };
    const { data } = await pokeApi.get<PokemonResponse>(`/pokemon/${name}`); 

    const pokemon = {
        id: data.id,
        name: data.name,
        sprites: data.sprites
    }

    return {
        props: {
            pokemon
        }
    }

}


export default PokemonByNamePage;