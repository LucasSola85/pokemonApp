import { Grid, Card,  } from "@nextui-org/react"
import { FC } from "react"
import { FavoriteCardPokemon } from "./FavoriteCardPokemon"


type Props = {
    pokemons: number[],
}

export const FavoritesPokemons: FC<Props> = ({ pokemons }) => {
    return (
        <Grid.Container gap={2} justify="center" direction="row">
            {
                pokemons.map((id) => (

                    <Grid xs={6} sm={3} md={2} xl={1} key={id}>
                        <FavoriteCardPokemon key={id} id={id} />
                    </Grid>
                ))

            }

        </Grid.Container>
    )
}
