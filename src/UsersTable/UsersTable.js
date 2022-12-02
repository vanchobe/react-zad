import Users from "../Users/Users";
import Pagination from "../Pagination/Pagination";
import { Table, Row, Col } from "react-bootstrap";
import ReactPaginate from "react-paginate";
function UsersTable({
  currentPageData,
  pageCount,
  activePage,
  handlePageClick,
}) {
  return (
    <>
      <Row>
        <Col xs={12} md={12}>
        <Pagination
            pageCount={pageCount}
            activePage={activePage}
            handlePageClick={handlePageClick}
          />
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
            {currentPageData.map((user) => {
              return (
                <Users
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
                />
              );
            })}
          </Table>
          <Pagination
            pageCount={pageCount}
            activePage={activePage}
            handlePageClick={handlePageClick}
          />
        </Col>
      </Row>
    </>
  );
}

export default UsersTable;
