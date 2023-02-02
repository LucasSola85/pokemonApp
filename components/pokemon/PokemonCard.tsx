import { SmallPokemon } from "@/interfaces";
import { Card, Grid, Row, Text } from "@nextui-org/react"
import { useRouter } from "next/router";
import { FC } from "react";

type Props = {
    poke: SmallPokemon;
}


export const PokemonCard: FC<Props> = ({ poke }) => {

    const router = useRouter();


    const onclick = () => {
        router.push(`/name/${poke.name}`)
    }


    return (
        <>
            <Grid xs={6} sm={3} md={2} xl={1}>

                <Card
                    key={poke.name}
                    isHoverable
                    isPressable
                    onPress={ onclick }
                >
                    <Card.Body css={{ p: 0 }}>
                        <Card.Image
                            src={poke.img}
                            width="100%"
                            height="18rem"
                            alt={poke.name}
                        />
                    </Card.Body>
                    <Card.Footer
                        isBlurred
                        css={{
                            position: "absolute",
                            bgBlur: "#ffffff66",
                            borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
                            bottom: 0,
                            zIndex: 1,
                        }}
                    >
                        <Row>

                            <Text color="#000" size={18} css={{
                                fontWeight: 600,
                                textShadow: "0 0 10px #fff",
                                textTransform: "capitalize",
                            }}>
                                #{poke.id}- {poke.name}
                            </Text>

                        </Row>
                    </Card.Footer>
                </Card>

            </Grid>


        </>
    )
}
