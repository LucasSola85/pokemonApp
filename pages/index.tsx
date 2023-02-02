import { pokeApi } from "@/api";
import { Layout } from "@/components/layouts";
import { PokemonCard } from "@/components/pokemon";
import { PokemonListResponse, SmallPokemon } from "@/interfaces";
import { Grid } from "@nextui-org/react";
import { GetStaticProps, NextPage } from "next";

type Props = {
  pokes: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({ pokes }) => {


  return (
    <Layout>
      <Grid.Container gap={2} justify='flex-start'>
        {
          pokes.map((poke, i) => (
            <PokemonCard key={i} poke={poke} />
          ))
        }
      </Grid.Container>

    </Layout>
  )

};

export const getStaticProps: GetStaticProps = async () => {


  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151')

  data.results.forEach((poke, i) => {
    const id = data.results[i].url.split('/')[6]
    poke['img'] = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
    poke['id'] = Number(id);
  })



  return {
    props: {
      pokes: data.results
    }
  }

}

export default HomePage;