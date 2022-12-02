import { Form} from 'react-bootstrap';
import { useState, useEffect } from "react";
function Search({data}) {
  const [ inputValue, setInputValue ] = useState('');

  const handleInput = ({ target: { value }}) => {
    if (value === "") setInputValue('');
   setInputValue(value);
  };
  const filteredValues = data.filter(user => {
    if(user.nameFirst.includes(inputValue) || user.nameLast.includes(inputValue)){
      return user
    }
  })

  return (
    <>

    </>
  );
}

export default Search;


