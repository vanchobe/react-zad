import Users from './Users/Users';
import './App.css';
import {Table, Row, Col, Container, Form, Dropdown, DropdownButton} from 'react-bootstrap'
import ReactPaginate from 'react-paginate';
import React, { useState, useEffect} from 'react';
import axios from 'axios';

function App() {

    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [perPage, setPerPage] = useState(3);
    const [input, setInput] = useState('');
    const [activePage, setActivePage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [currentPageData, setCurrentPageData] = useState([]);

    const handleSelect = (e) => {
      const itemsPerPage = (e === 'all' ? data.length : Number(e));
      const pageData = filteredData.length !== 0 ? filteredData : data;
      setCurrentPageData([...pageData].slice(0, itemsPerPage));
      setPerPage(itemsPerPage)
      setPageCount(Math.ceil(pageData.length / itemsPerPage))
    }

    const handlePageClick = ({selected}) => {
      const selectedPage = (Number(selected) + 1)
      const pageData = filteredData.length !== 0 ? filteredData : data;
      setCurrentPageData([...pageData].slice((selectedPage - 1) * perPage, selectedPage * perPage));
      setActivePage(selectedPage)
    }
  
    const handleInput = (e) => {
      const typedInput = e.target.value;
      setInput(typedInput);
      const filteredData = [...data].filter(user => {
        if(user.firstName.toLowerCase().includes(typedInput.toLowerCase()) 
        || user.lastName.toLowerCase().includes(typedInput.toLowerCase())){
          return user
        } else {
          return null;
        }
    })
    
    const currentPageCount = Math.ceil(filteredData.length / perPage);
    setFilteredData(filteredData)
    setCurrentPageData(filteredData.slice(0, perPage))
    setActivePage(0)
    setPageCount(currentPageCount)
    }

    const fetchData = async () => { 
      try {
        const fakeData = await axios.get('http://apis.chromeye.com:9191/people');
        setData(fakeData.data)
        setCurrentPageData(fakeData.data.slice(0, activePage + perPage));
        setPageCount(Math.ceil(fakeData.data.length / perPage))
      } catch (error) {
        console.error(error);
      }
    }

    useEffect(() => {
      fetchData();
    }, []);

  return (
    <div className="App">
      <Container>
     <Row>
       <Col>
      <DropdownButton
      className="customDropDown col-md-4"
      title={"Per Page: " + perPage}
      onSelect={handleSelect}
        >
          <Dropdown.Item eventKey="1">1</Dropdown.Item>
          <Dropdown.Item eventKey="3">3</Dropdown.Item>
          <Dropdown.Item eventKey="5">5</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item eventKey="all">All</Dropdown.Item>
      </DropdownButton>
      </Col>
      <Col>
      <Form className="col-md-12">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label></Form.Label>
          <Form.Control type="keyword" onChange={handleInput} value={input}  placeholder="Enter Keyword" />
        </Form.Group>
      </Form>
      </Col>
      </Row>
  <Row>
    <Col xs={12} md={12}>
             <Table striped bordered hover>
  <thead>
    <tr>
      <th>Avatar</th>
      <th>ID</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Email</th>
      <th>Company</th>
      <th>Department</th>
      <th>Published At</th>
      <th>Created At</th>
      <th>Updated At</th>
    </tr>
  </thead>
  { currentPageData.map(user => {
        return <Users 
        key={user.id}  
        id={user.id}
        nameFirst={user.firstName} 
        nameLast={user.lastName}
        internetEmail={user.email}
        personAvatar={user.avatar}
        publishedDate={user.published_at}
        company={user.company}
        createdDate={user.created_at}
        updatedDate={user.updated_at}
        />})} 
    </Table>
    {pageCount > 1 ? <ReactPaginate
            previousLabel={"Prev"}
            nextLabel={"Next"}
            breakLabel={"..."}
            initialSelected={activePage}
            breakClassName={"break-me"}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}/> : ''}  
    </Col>
</Row>
</Container>
    </div>
  );
}

export default App;
