import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';
import React, { useState, useEffect, createContext } from 'react';
import { responsivePropType } from 'react-bootstrap/esm/createUtilityClasses';
import ReactSwitch from "react-switch";

export const ThemeContext = createContext(null);
// from spotify dev app
const CLIENT_ID="1a922cb4a8db415b97255d7d0766528d"
const CLIENT_SECRET="eabd6b890eb842ac9becdcf2ba63599d"

function Projects() {

  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [foundArtistName, setArtistName] = useState("no artist");
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    // authorisation parameters required by Spotify
    var authParams = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    }
    // fetch token
    fetch('https://accounts.spotify.com/api/token', authParams)
    .then(result => result.json())
    .then(data => setAccessToken(data.access_token))
  }, [])

  async function search() {
    console.log("searching for " + searchInput)
    
    var searchParam = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }

    // get artist ID given name
    var artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', searchParam)
      .then(response => response.json())
      // assume that its the first one
      .then(data => { return data.artists.items })

    console.log(artistID)

    var finArtistID = artistID[0].id

    setArtistName(artistID[0].name)

    // fetch all albums
    var returnedAlbums = await fetch('https://api.spotify.com/v1/artists/' + finArtistID + '/albums' + '?include_groups=album&market=US&limit=50', searchParam)
    .then(response => response.json())
    .then(data => {
      // console.log(data)
      setAlbums(data.items);
    })
  }

  // console.log(albums);
  return (
    <div className="body">
      <Container>
        <InputGroup className='mb-3' size="lg">
          <FormControl
            placeholder='Search For Artist'
            type="input"
            onKeyDown={event => {
              if (event.key == "Enter") {
                search();
              }
            }}
            onChange={event => setSearchInput(event.target.value)}
          />
          <Button className='search-button' onClick={search}>
            Search
          </Button>
        </InputGroup>
      </Container>
      <div className='name-text'>
        Showing results for {foundArtistName}
      </div>
      {/* Contains the album cards */}
      <Container>
        <Row className='mx-2 row row-cols-4'>

          {albums.map( (album, i) => {
            console.log(album)
            return (
              <a href={album.uri} target="_blank" rel="noopener noreferrer" key={i} style={{ textDecoration: 'none' }}>
                <Card className="custom-card" style={{ minHeight: "100px" }}>
                  <Card.Img src={album.images[0].url} />
                  <Card.Body>
                    <Card.Title>{album.name}</Card.Title>
                    <Card.Text>Release date: {album.release_date}</Card.Text>
                    <Card.Text>Total tracks: {album.total_tracks}</Card.Text>
                  </Card.Body>
                </Card>
              </a>
            )
          })}
        </Row>
      </Container>
    </div>
  );
}

export default Projects;
