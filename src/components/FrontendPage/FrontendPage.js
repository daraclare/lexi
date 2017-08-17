import React, { Component } from 'react';
import axios from 'axios';

function searchingFor(term){
  return function(x) {
    return x.word.toLowerCase().includes(term.toLowerCase()) || !term;
  };
}

function startingLetter(letter){
  return function(x) {
    return x.word[0].toLowerCase().includes(letter.toLowerCase()) || !letter;
  };
}

function findKeyword(keyword){
  return function(x) {
    return x.keywords.includes(keyword) || !keyword;
  };
}

export default class FrontendPage extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      searchTerm: '',
      searchLetter: '',
      keywordFound: ''
    };

    this.updateSearch = this.updateSearch.bind(this);
    this.searchLetter = this.searchLetter.bind(this);
    this.searchKeyword = this.searchKeyword.bind(this);
    this.clearButton = this.clearButton.bind(this);

  }

  componentDidMount() {
    axios.get('/lexi-frontend.json')
    .then(response => {
      this.setState({
        data: response.data
      });
    });
  }

  searchLetter(event) {
    let searchLetter = event.target.id;
    this.setState({
      searchLetter: searchLetter
    });
  }

  updateSearch(event) {
    let searchTerm = event.target.value;
    this.setState({
      searchLetter: '',
      keywordFound: '',
      searchTerm: searchTerm
    });
  }

  searchKeyword(event) {
    this.setState({
      searchLetter: '',
      keywordFound: event.target.id
    });
  }

  clearButton() {
    this.setState({
      searchLetter: ''
    });
  }

  render() {
    //use ES6 destructuring
    const {data, searchTerm, searchLetter, keywordFound} = this.state;

    let alphabetLetters = [
      "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
    ];

    let keywordList = ["SWE", "computer science"];

    // sort the glossary terms alphabetically
    data.sort(function(a, b) {
      let wordA = a.word.toLowerCase(); // ignore upper and lowercase
      let wordB = b.word.toLowerCase(); // ignore upper and lowercase
      if (wordA < wordB) {
        return -1;
      }
      if (wordA > wordB) {
        return 1;
      }
      // names must be equal
      return 0;
    });

    return (
      <div className="lexi-container">
        <h1>LEXI: Software Engineering Glossary</h1>

      <div>
        <input className="searchbox" type="text" value={searchTerm} onChange={this.updateSearch}/>
        <span className="filterByText">{searchLetter ? <span>filtered by '{searchLetter}' <button className="clearButton" onClick={this.clearButton}>CLEAR</button></span>: ''}</span>
      </div>


        <p>
          {alphabetLetters.map(letter => <span key={letter} className="letter"><a href="#" onClick={this.searchLetter} id={letter}>{letter}</a></span>)}
        </p>

        <p>
          keywords: {keywordList.map((word) => {
            return (
              <span key={word}>
                <a onClick={this.searchKeyword} href="#" id={word}>{word}</a>
                <span> | </span>
              </span>

            );

          })}
        </p>

        {data.filter(searchingFor(searchTerm))
             .filter(startingLetter(searchLetter))
             .filter(findKeyword(keywordFound))
             .map((data, index) => {
            return (
              <div key={index}>
                <p><span className="word">{data.word}:</span> {data.answer}</p>
                {data.keywords.map((keyword, index) => {
                  return (
                    <button className="keywords" key={index}>{keyword.toUpperCase()}</button>
                  );
                })}
                <hr/>
              </div>
            );
        })}
      </div>
    );
  }
}
