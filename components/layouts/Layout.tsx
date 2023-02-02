import Head from "next/head"
import { FC } from "react"
import { Navbar } from "../iu"

type Props = {
    title?: string,
    children: React.ReactNode
}

export const Layout: FC<Props> = ( { children, title = 'Pokemon App'} ) => {

  return (
    <>
    
        <Head>
            <title>{title}</title>
            <meta name="author" content="Lucas Sola" />
            <meta name="description" content="Informacion sobre el pokemon XXXXX" />
            <meta name="keywords" content="pokemon, XXXXX, pokedex" />
        </Head>

        <Navbar />

        <main style={{
            padding: '0 20px',
        }}>
            { children }
        </main>
    
    
    
    </>
  )
}
