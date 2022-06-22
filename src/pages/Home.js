import React from 'react'
import { Container, Row, Col, CardGroup, Button, Image, ButtonGroup } from 'react-bootstrap'
import { PokeCard } from '../components/PokeCard'
import logo from '../assets/International_Pokémon_logo.png'
import { Link } from 'react-router-dom'
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

    if (data.length !== 0) return (
        <Container fluid>

                    <Container className="p-3 shadow-lg" style={{backgroundColor : "white", color : "black"}}>
                        <div className="text-center">
                            <Image src={logo} fluid width={200} />
                            <h1>Pokedex with Electron</h1>
                        </div>
                        <ButtonGroup>
                            <Button className="pokemon-btn" disabled={!data.previous} onClick={() => handlePrevBtn(data.previous)}>
                                Previous
                            </Button>
                            <Button className="pokemon-btn" disabled={!data.next} onClick={() => handleNextBtn(data.next)}>
                                Next
                            </Button>
                        </ButtonGroup>
                        <hr />
                        <ButtonGroup>
                            <Link to="/team">
                                <Button className="pokemon-btn-red">Check out my team</Button>
                            </Link>
                        </ButtonGroup>
                        <hr />
                        <CardGroup>
                            <Row>
                                {
                                    data?.results.map((element, index) => {
                                        return <Col key={index}>
                                            <PokeCard name={element.name} url={element.url} />
                                        </Col>
                                    })
                                }
                            </Row>
                        </CardGroup>
                    </Container>
          

        </Container>
    )
}

export default HomeView