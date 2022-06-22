import React from 'react'
import { Container, Row, Col, CardGroup, Button, Image } from 'react-bootstrap'
import { PokeCard } from '../components/PokeCard'
import logo from '../assets/International_Pokémon_logo.png'
const HomeView = () => {

    const [data, setData] = React.useState([])
    const [url, setUrl] = React.useState("https://pokeapi.co/api/v2/pokemon?")
    
    const fetchPokemons = async (_url) => {
        fetch(`${_url}`)
            .then(res => res.json())
            .then((result) => {
                setData(result)
                console.log(result)
            })
    }

    const handleNextBtn = (_url) => setUrl(_url)
    const handlePrevBtn = (_url) => setUrl(_url)


    React.useEffect(() => {
        fetchPokemons(url)
    }, [url])

    if(data.length !== 0 )return (
        <Container fluid>
            <Row>
                <Col>
                    <Container className="p-3 shadow-lg">
                        <div className="text-center">
                        <Image src={logo} fluid width={200}/>
                        <h1>Pokedex with Electron</h1>
                        </div>
                        <Button disabled={!data.previous}  onClick={() => handlePrevBtn(data.previous)}>
                            Previous
                        </Button>
                        <Button disabled={!data.next} onClick={() => handleNextBtn(data.next)}>
                            Next
                        </Button>
                        <hr />
                        <CardGroup>
                            <Row>
                                {
                                    data?.results.map((element, index) => {
                                        return <Col key={index}>
                                            <PokeCard name={element.name}  url={element.url}/>
                                        </Col>
                                    })
                                }
                            </Row>
                        </CardGroup>
                    </Container>
                </Col>
            </Row>

        </Container>
    )
}

export default HomeView