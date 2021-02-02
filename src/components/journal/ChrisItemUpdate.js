import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getOneItem, updateItem } from "./../../modules/APICalls";
import { Form, Button, Row, Col, Container } from "react-bootstrap";

export const ChrisItemUpdate = () => {

  const [chrisItem, setChrisItem] = useState({});

  const history = useHistory();
  const {chrisItemId} = useParams();

  const handleInputChange = (event) => {
    const newItemObj = { ...chrisItem };
    newItemObj[event.target.id] = event.target.value;
    setChrisItem(newItemObj);
  }

  const handleUpdateItem = () => {
    if(!chrisItem.title){
      alert ("Please enter a title")
    }else {
	const newItemObj = { ...chrisItem }
	newItemObj["fbid"] = chrisItemId;
    updateItem(newItemObj)
      .then(response => history.push("/"))
    }
  }

  useEffect(() => {
	getOneItem(chrisItemId)
	.then((chrisItem) => {
		setChrisItem(chrisItem)})
}, [chrisItemId])


  return (
    <>
	<Container fluid="xl">
    <Row>
      <Col className="m-2" md={6}>
        <h4>Edit This Item</h4>
        <Form>
        	<Form.Group controlId="title" className="mb-3">
          		<Form.Label>Title</Form.Label>
          		<Form.Control type="text" value={chrisItem?.title || ""} onChange={handleInputChange}/>
          		<Form.Text className="text-muted">
            		For best results, be specific
          		</Form.Text>
        	</Form.Group>

        	<Form.Group controlId="details">
          		<Form.Label>Details</Form.Label>
          		<Form.Control as="textarea" rows={3} value={chrisItem?.details || ""} onChange={handleInputChange}/>
        	</Form.Group>

          <Button onClick={handleUpdateItem}>Save Changes</Button>
		</Form>
		
      </Col>
      </Row>
      </Container>
    </>
  )
}