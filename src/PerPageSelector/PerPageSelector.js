import { DropdownButton, Dropdown } from "react-bootstrap";
function PerPageSelector({ handleSelect, perPage }) {
  return (
    <>
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
    </>
  );
}

export default PerPageSelector;
