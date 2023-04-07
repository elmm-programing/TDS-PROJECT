import { useState } from "react";
import { AsyncTypeahead } from 'react-bootstrap-typeahead'; // ES2015
import { getUser } from "../Services/Users";

export const AutoComplete = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<{ username: string, titulo: string }[]>([]);

  const handleSearch = (query: string) => {
    setIsLoading(true);
    let response = getUser(query)
    console.log(response)
    response.then(value => {
      let al = value.map(val => {
        return { username: val.username, titulo: val.name }
      })
      setOptions(al);
      setIsLoading(false);
    })
  };

  // Bypass client-side filtering by returning `true`. Results are already
  // filtered by the search endpoint, so no need to do it again.
  const filterBy = () => true;

  return (
    <AsyncTypeahead
      labelKey={(option: any) => `${option.username} `}
      filterBy={filterBy}
      id="async-example"
      isLoading={isLoading}
      minLength={3}
      onSearch={handleSearch}
      options={options}
      renderMenuItemChildren={(option: any) => (
        <>
          <span>{option.username}</span>
        </>
      )}
      placeholder="Search user..."
    />
  );
};

