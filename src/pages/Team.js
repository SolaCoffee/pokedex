import React from 'react'
import { CardGroup, Col, Container, Row, Card, Button, ListGroup, ButtonGroup, ListGroupItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const TeamView = () => {

    const [team, setTeam] = React.useState([])

    const handleDeleteBtn = (_pokemon) => {
        let indexOf = team.findIndex(element => element === _pokemon.id)
        team.splice(indexOf, 1)
        localStorage.setItem("team", JSON.stringify(team))
        alert('Pokemon deleted from your team')
    }

    React.useEffect(() => {
        let JSONteam = localStorage.getItem("team")
        setTeam(JSON.parse(JSONteam))

    }, [team])


    return (
        <Container fluid>
            <Row>
                <Col>
                    <Container className="p-3 mt-3">
                        <Link to="/" >
                            <Button className="mb-3"> Return to Pokedex </Button>
                        </Link>
                        <h3>My team</h3>
                        <hr />
                        <Row>
                            {team && team.length !== 0 ? team.map((element, index) => {
                                return <Col className="mb-3"><Card style={{ width: '15rem', borderRadius: "15px" }}>
                                    <Card.Img variant="top" src={element.sprites.front_default} />
                                    <Card.Header className="pokemon-header text-center">
                                        <Card.Title>{element.name.toUpperCase()}</Card.Title>
                                    </Card.Header>
                                    <Card.Body>
                                        <ListGroup className="mb-3">
                                            <ListGroup.Item>Type : {element.types[0].type.name}</ListGroup.Item>
                                        </ListGroup>
                                        <ListGroup>
                                            {
                                                element.stats.map((element, index) => { 
                                                    return <ListGroupItem>{element.stat.name} : {element.base_stat}</ListGroupItem>
                                                })
                                            }
                                        </ListGroup>
                                        <hr />
                                        <ButtonGroup>
                                            <Link to={`/${element.id}`}>
                                                <Button>More info</Button>
                                            </Link>
                                            <Button variant="danger" onClick={() => handleDeleteBtn(element)}>Delete from Team</Button>
                                        </ButtonGroup>
                                    </Card.Body>
                                </Card></Col>
                            }) :
                                <h3>No pokemons in your team</h3>
                            }
                        </Row>
                    </Container>
                </Col>
                <Col></Col>

            </Row>
        </Container>
    )
}

export default TeamView