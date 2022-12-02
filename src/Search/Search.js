import { Form } from "react-bootstrap";
function Search({ handleInput, input }) {
  return (
    <>
      <Form className="col-md-12">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label></Form.Label>
          <Form.Control
            type="keyword"
            onChange={handleInput}
            value={input}
            placeholder="Enter Keyword"
          />
        </Form.Group>
      </Form>
    </>
  );
}

export default Search;
