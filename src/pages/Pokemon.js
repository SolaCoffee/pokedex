import React from 'react'
import { Container, Row, Col, Card, ListGroup, CardGroup, Button, ButtonGroup } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'

const PokemonView = () => {
    const { id } = useParams()
    const [data, setData] = React.useState([])


    const fetchInformations = async () => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(res => res.json())
            .then(result => {
                console.log(result)
                setData(result)
            })
    }
    const handleAddBtn = (_pokemon) => {
        let team = localStorage.getItem("team")
        team = team ? JSON.parse(team) : []
        team.push(_pokemon)
        localStorage.setItem("team", JSON.stringify(team))
        alert('Pokemon added to your team')
    }

    React.useEffect(() => {
        if (data.length === 0) fetchInformations()
    }, [data, fetchInformations])

    if (data.length !== 0) return (
        <Container fluid>
            <Row>
                <Col>
                    <Container className="p-3 shadow-lg" style={{backgroundColor : "white"}}>
                        <ButtonGroup className="mb-3">
                            <Link to="/">
                                <Button className="pokemon-btn"> Return to Pokedex </Button>
                            </Link>
                            <Button className="pokemon-btn-red" variant="danger" onClick={() => handleAddBtn(data)}>Add to my team</Button>
                        </ButtonGroup>
                        <h3>Pokemon No.{id} : {data.name.toUpperCase()} </h3>
                        <hr />
                        <CardGroup>
                            <Row>
                                <Col>
                                    <Card className="pokemon-card">
                                        <Card.Img variant="top" src={data.sprites.front_default} />
                                        <Card.Body>
                                            <Card.Header className="pokemon-header">
                                                <Card.Title>{data.name} (M)</Card.Title>
                                            </Card.Header>
                                            <ListGroup>
                                                {data.stats.map((element, index) => {
                                                    return <ListGroup.Item key={index}> <b>{element.stat.name.toUpperCase()}</b> : {element.base_stat} </ListGroup.Item>
                                                })}
                                            </ListGroup>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col>
                                    <Card className="pokemon-card">
                                        <Card.Img variant="top" src={data.sprites.front_shiny} />
                                        <Card.Body>
                                            <Card.Header className="pokemon-header">
                                                <Card.Title>Shiny version</Card.Title>
                                            </Card.Header>

                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </CardGroup>
                    </Container>
                </Col>
                <Col>
                    <Container className="p-3 mt-3 shadow-lg" style={{backgroundColor : "white"}}>
                        <CardGroup>
                            <Card style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Header className="pokemon-header">
                                        <Card.Title>Abilities</Card.Title>
                                    </Card.Header>
                                    <ListGroup>
                                        {data.abilities.map((element, index) => {
                                            return <ListGroup.Item key={index}>{element.ability.name}</ListGroup.Item>
                                        })}
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                            <Card style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Header className="pokemon-header">
                                        <Card.Title>Type</Card.Title>
                                    </Card.Header>
                                    <ListGroup>
                                        {data.types.map((element, index) => {
                                            return <ListGroup.Item key={index}>{element.type.name}</ListGroup.Item>
                                        })}
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        </CardGroup>
                    </Container>
                </Col>

            </Row>
        </Container>
    )
}

export default PokemonView