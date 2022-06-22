import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'


export const PokeCard = (props) => {
    const { name, url } = props
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
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={data.sprites.front_default} width={200} />
            <Card.Header>
                <Card.Title>{name.toUpperCase()}</Card.Title>
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                </Card.Text>
                <hr />
                <Link to={`/${data.id}`}>
                    <Button variant="primary">Check it out !</Button>
                </Link>
            </Card.Body>
        </Card>
    )
    else return null
}