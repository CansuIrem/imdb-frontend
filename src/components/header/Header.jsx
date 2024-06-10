import React, { useState, useEffect, useRef, useContext } from 'react';
import { Navbar, Nav, Form, FormControl, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import './header.css';
import SearchApi from '../../api/SearchApi';
import { UserContext } from '../UserContext';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState("All");
  const navigate = useNavigate();
  const { userEmail, setUserEmail } = useContext(UserContext);

  function handleSignIn() {
    navigate('/signin');
  }

  function handleLogout() {
    setUserEmail('');
    navigate('/');
  }

  function handleWatchlistClick() {
    if (!userEmail) {
      navigate('/login');
    } 
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 27) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    let searchApi = new SearchApi();
    const fetchResults = async () => {
      if (searchTerm.length >= 3) {
        try {
          const response = await searchApi.search(searchTerm);
          const combinedResults = [...response.data.movies, ...response.data.people];
          setSearchResults(combinedResults.slice(0, 3));
          setShowDropdown(true);
          console.log(combinedResults);
        } catch (error) {
          console.error("Error fetching search results", error);
        }
      } else {
        setShowDropdown(false);
      }
    };

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    const debounceFetch = setTimeout(fetchResults, 300);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      clearTimeout(debounceFetch);
    };
  }, [searchTerm]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="navbar-custom">
      <Navbar.Brand href="/" className="navbar-brand-custom">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg"
          height="30"
          className="d-inline-block align-top"
          alt="IMDB Logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <button className="menu-button">
          <FontAwesomeIcon className='icon' icon={faBars} />
          {" "}Menu</button>
        <Form inline className="search-form">
          <div className="search-box-wrapper" ref={dropdownRef}>
            <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdown-basic" className="category-dropdown">
                {selectedOption}
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-custom">
                <Dropdown.Item onClick={() => handleOptionSelect("All")}>All</Dropdown.Item>
                <Dropdown.Item onClick={() => handleOptionSelect("Titles")}>Titles</Dropdown.Item>
                <Dropdown.Item onClick={() => handleOptionSelect("Celebs")}>Celebs</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <div className="vertical-divider"></div>
            <FormControl
              type="text"
              placeholder="Search IMDb"
              className="search-input"
              value={searchTerm}
              onChange={handleSearchInputChange}
            />
            <button type="submit" className="search-button">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
          {showDropdown && (
            <div className="search-dropdown">
              {searchResults.map((result, index) => (
                <div key={index} className="dropdown-item-custom">
                  <div className="search-result-item">
                    <img
                      src={result.photo || "https://via.placeholder.com/50"}
                      alt={result.name}
                      className="result-photo"
                    />
                    <div className="result-text">
                      <strong>{result.name}</strong>
                      <p>{result.stars || result.description}</p>
                    </div>
                  </div>
                  {index < searchResults.length - 1 && <div className="item-divider"></div>}
                </div>
              ))}
            </div>
          )}
        </Form>
        <Nav className="ml-auto">
          <Nav.Link onClick={handleWatchlistClick}>Watchlist</Nav.Link>
          {userEmail ? (
            <Nav.Link href="#profile" onClick={handleLogout}>{userEmail}</Nav.Link>
          ) : (
            <Nav.Link href="#signin" onClick={handleSignIn}>Sign In</Nav.Link>
          )}
          <Dropdown>
            <Dropdown.Toggle variant="dark" id="dropdown-basic" className="language-dropdown">
              EN
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu-custom">
              <Dropdown.Item href="#action/1">EN</Dropdown.Item>
              <Dropdown.Item href="#action/2">TR</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
