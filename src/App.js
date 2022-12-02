import "./App.css";
import UsersTable from "./UsersTable/UsersTable";
import Search from "./Search/Search";
import PerPageSelector from "./PerPageSelector/PerPageSelector";
import { Row, Col, Container } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [perPage, setPerPage] = useState(3);
  const [input, setInput] = useState("");
  const [activePage, setActivePage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [currentPageData, setCurrentPageData] = useState([]);

  const handleSelect = (e) => {
    const itemsPerPage = e === "all" ? data.length : Number(e);
    const pageData = filteredData.length !== 0 ? filteredData : data;
    setCurrentPageData([...pageData].slice(0, itemsPerPage));
    setPerPage(itemsPerPage);
    setPageCount(Math.ceil(pageData.length / itemsPerPage));
  };

  const handlePageClick = ({ selected }) => {
    const selectedPage = Number(selected) + 1;
    const pageData = filteredData.length !== 0 ? filteredData : data;
    setCurrentPageData(
      [...pageData].slice((selectedPage - 1) * perPage, selectedPage * perPage)
    );
    setActivePage(selectedPage);
  };

  const handleInput = (e) => {
    const typedInput = e.target.value;
    setInput(typedInput);
    const filteredData = [...data].filter((user) => {
      if (
        user.firstName.toLowerCase().includes(typedInput.toLowerCase()) ||
        user.lastName.toLowerCase().includes(typedInput.toLowerCase())
      ) {
        return user;
      } else {
        return null;
      }
    });

    const currentPageCount = Math.ceil(filteredData.length / perPage);
    setFilteredData(filteredData);
    setCurrentPageData(filteredData.slice(0, perPage));
    setActivePage(0);
    setPageCount(currentPageCount);
  };

  const fetchData = async () => {
    try {
      const fakeData = await axios.get("http://apis.chromeye.com:9191/people");
      setData(fakeData.data);
      setCurrentPageData(fakeData.data.slice(0, activePage + perPage));
      setPageCount(Math.ceil(fakeData.data.length / perPage));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <PerPageSelector handleSelect={handleSelect} perPage={perPage} />
          </Col>
          <Col>
            <Search handleInput={handleInput} input={input} />
          </Col>
        </Row>
        <UsersTable
          currentPageData={currentPageData}
          pageCount={pageCount}
          activePage={activePage}
          handlePageClick={handlePageClick}
        />
      </Container>
    </div>
  );
}

export default App;
