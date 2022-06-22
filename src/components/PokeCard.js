import React from 'react'
import { Card, Button, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'


export const PokeCard = (props) => {
    const { url } = props
    const [data, setData] = React.useState([])
    const fetchInformations = async () => {
        fetch(`${url}`)
            .then(res => res.json())
            .then(result => {
                setData(result)
            })
    }

    React.useEffect(() => {
        fetchInformations()
    }, [url])
    if (data.length !== 0) return (
        <Card className="pokemon-card mb-3">
            <Card.Img variant="top" src={data.sprites.front_default} width={200} />
            <Card.Header className="pokemon-header text-center">
                <Card.Title>No.{data.id} : {data.name.toUpperCase()}</Card.Title>
            </Card.Header>
            <Card.Body>
                <ListGroup>
                    <ListGroup.Item><b>Type</b> : {data.types[0].type.name.toUpperCase()}</ListGroup.Item>
                </ListGroup>
                <hr />
                <Link to={`/${data.id}`}>
                    <Button className="pokemon-btn">Check it out !</Button>
                </Link>
            </Card.Body>
        </Card>
    )
    else return null
}