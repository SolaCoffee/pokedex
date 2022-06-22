import React from 'react'
import { Container, Row, Col ,Card, ListGroup, CardGroup, Button } from 'react-bootstrap'
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
    React.useEffect(() => {
        if (data.length === 0) fetchInformations()
    }, [data, fetchInformations])
    if (data.length !== 0) return (
        <Container fluid>
            <Row>
                <Col>
                    <Container className="p-3 shadow-lg">
                        <Link to="/">
                            <Button className="mb-3"> Return to Pokedex </Button>
                        </Link>
                        <h1>Pokemon n°{id} : {data.name} </h1>
                        
                        <hr />
                        <CardGroup>
                            <Row>
                                <Col>
                                    <Card style={{ width: '18rem' }}>
                                        <Card.Img variant="top" src={data.sprites.front_default} />
                                        <Card.Body>
                                            <Card.Header>
                                                <Card.Title>{data.name} (M)</Card.Title>
                                            </Card.Header>
                                            <ListGroup variant="flush">
                                                {data.stats.map((element, index) => {
                                                    return <ListGroup.Item key={index}> <b>{element.stat.name.toUpperCase()}</b> : {element.base_stat} </ListGroup.Item>
                                                })}
                                            </ListGroup>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col>
                                    <Card style={{ width: '18rem' }}>
                                        <Card.Img variant="top" src={data.sprites.front_shiny} />
                                        <Card.Body>
                                            <Card.Header>
                                                <Card.Title>Shiny Version</Card.Title>
                                            </Card.Header>
                                            <ListGroup variant="flush">
                                            </ListGroup>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </CardGroup>
                    </Container>
                </Col>
                <Col>
                    <Container className="p-3 mt-3 shadow-lg">
                        <CardGroup>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Header>
                                    <Card.Title>Abilities</Card.Title>
                                </Card.Header>
                                <ListGroup variant="flush">
                                    {data.abilities.map((element,index) => { 
                                        return <ListGroup.Item key={index}>{element.ability.name}</ListGroup.Item>
                                    })}
                                </ListGroup>
                            </Card.Body>
                        </Card>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Header>
                                    <Card.Title>Type</Card.Title>
                                </Card.Header>
                                <ListGroup variant="flush">
                                    {data.types.map((element,index) => { 
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