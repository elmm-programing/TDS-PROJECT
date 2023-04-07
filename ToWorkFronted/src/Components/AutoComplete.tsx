import { useState } from "react";
import Form from "react-bootstrap/esm/Form";
import { Highlighter, Typeahead } from 'react-bootstrap-typeahead'; // ES2015
export function AutoComplete() {
   const [singleSelections, setSingleSelections] = useState([]);
  const [multiSelections, setMultiSelections] = useState([]);
   const props = {};
var options = [
  'John',
  'Miles',
  'Charles',
  'Herbie',
];
 props.renderMenuItemChildren = (option, { text }) => (
        <>
          <Highlighter search={text}>{option}</Highlighter>,
          <div>
            <small>Population: {option}</small>
          </div>
        </>
      );
  return (
    <>
      <Form.Group>
        <Typeahead
         {...props}
          id="basic-typeahead-single"
          labelKey="name"
          options={options}
          inputProps={{
    className: 'my-custom-classname',
    style: {
      'width': 30+'rem',
    }
  }}
          placeholder="Choose a state..."
          selected={singleSelections}
        />
      </Form.Group>
          </>
  );}
