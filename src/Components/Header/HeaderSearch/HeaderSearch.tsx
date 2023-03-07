import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const HeaderSearch = () => {
  const [search, setSearch] = useState("");
  return (
    <Form className='d-flex'>
      <Form.Control
        type='search'
        placeholder='Search'
        className='me-2'
        aria-label='Search'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Button variant='outline-success'>Search</Button>
    </Form>
  );
};

export default HeaderSearch;
