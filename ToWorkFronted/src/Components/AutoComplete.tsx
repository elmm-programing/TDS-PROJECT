import { useState } from "react";
import { AsyncTypeahead } from 'react-bootstrap-typeahead'; // ES2015
import { getUser } from "../Services/Users";
import { useUserStore } from "../store/UsersStore";
import { IUser } from "../Types/common";

import { useNavigate } from "react-router-dom";
export const AutoComplete = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<{ username: string, titulo: string }[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const userStore = useUserStore()
  const navigate = useNavigate();
  const goPerfil = (username: string) => {
    let arr = users.filter(val => {
      if (val.username === username) {
        return val
      }
    })
    userStore.selectedPerfil = arr[0]
      navigate("/perfil");
  }
  const handleSearch = (query: string) => {
    setIsLoading(true);
    let response = getUser(query)
    console.log(response)
    response.then(value => {
      setUsers(value)
      let al = value.map(val => {
        return { username: val.username, titulo: val.imagen }
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
      onChange={(selected)=>{
      goPerfil(selected[0]?.username)
      }}
      options={options}
      renderMenuItemChildren={(option: any) => (
        <>
         <img
            src={option.titulo}
            style={{
              height: '24px',
              marginRight: '10px',
              width: '24px',
            }}
          />
          <span >{option.username}</span>
        </>
      )}
      placeholder="Search user..."
    />
  );
};

