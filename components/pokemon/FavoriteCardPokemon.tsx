import { Card } from "@nextui-org/react"
import { useRouter } from "next/router"
import { FC } from "react"


type Props = {
    id: number,
}

export const FavoriteCardPokemon: FC<Props> = ({ id }) => {

    const router = useRouter()

    const onFavoriteClick = () => {
        router.push(`/pokemon/${id}`)
    }


    return (
        <Card isHoverable isPressable css={{ padding: 10 }} onPress = { onFavoriteClick } >
            <Card.Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
                width={100}
                height={140}
            />

        </Card>
    )
}
