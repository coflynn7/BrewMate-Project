import React, { useRef, useState, useEffect } from 'react';
import { Button, Form } from "react-bootstrap";
import api from '../../api/axios';

function getBeerStyles(setBeerStyles) {
    api.get('/uniqueBeerStyles')
    .then((res) => {
        console.log("response: " + res);
        setBeerStyles(res.data);
    })
    .catch((err) => console.error('Error getting unique beer styles', err));
}

function BrewSearch() {

    const beerNameRef = useRef();
    const beerStyleRef = useRef();


    const [searchResults, setsearchResults] = useState([]);
    const [beerStyles, setBeerStyles] = useState([]);

    //load unique beer styles
    useEffect(() => {
        getBeerStyles(setBeerStyles);
     }, []);
    
    function handleSearch(e) {
        e?.preventDefault();

        const beerName = beerNameRef.current.value;
        const beerStyle = beerStyleRef.current.value;

        api.get('/search', {
            params: {
                beerName: beerName,
                style: beerStyle
            }
        })
        .then(response =>  {
            setsearchResults(response.data.results);
            console.log(response.data.results);
        })
        .catch(error => console.error('API error:', error));
    }

  return <div>
    <div>
        <Form onSubmit={handleSearch}>
        <Form.Label htmlFor="beerNameInput">Beer Name</Form.Label>
        <Form.Control id="beerNameInput" ref={beerNameRef} className="w-auto" />
        <Form.Label htmlFor="beerStyleInput">Beer Style</Form.Label>
        <Form.Select id="beerStyleInput" ref={beerStyleRef} className="w-auto">
            <option key={"All"} value="All">All</option>
            {beerStyles.map( item => <option key={item.style} value={item.style}>{item.style}</option> ) }
        </Form.Select>
        <Button variant="success" type="submit" onClick={handleSearch} className="m-3">Search!</Button>
        </Form>
    </div>
    {searchResults.length > 0 ?
    <div>
        {searchResults.map( (beerObj) => <p>{beerObj.beerName}</p>)}
    </div>
    : <><p>No results!</p></>}
</div>
}

export default BrewSearch;