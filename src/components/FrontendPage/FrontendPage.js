import React, { Component } from 'react';
import axios from 'axios';

function searchingFor(term){
  return function(x) {
    return x.word.toLowerCase().includes(term.toLowerCase()) || !term;
  };
}

export default class FrontendPage extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      searchTerm: ''
    };

    this.updateSearch = this.updateSearch.bind(this);

  }

  componentDidMount() {
    axios.get('/lexi-frontend.json')
    .then(response => {
      this.setState({
        data: response.data
      });
    });
  }



  updateSearch(event) {
    let searchTerm = event.target.value;
    this.setState({
      searchTerm: searchTerm
    });
  }

  render() {

    // let filteredList = this.state.data.filter((data) => {
    //   console.log('data.word.toLowerCase().indexOf(this.state.searchTerm.toLowerCase())', data.word.toLowerCase().indexOf(this.state.searchTerm.toLowerCase()));
    //   return (
    //     data.word.toLowerCase().indexOf(this.state.searchTerm.toLowerCase()) !== -1
    //   );
    // });

    let filteredList = this.state.data;

    // sort the glossary terms alphabetically
    filteredList.sort(function(a, b) {
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
        <input type="text" value={this.state.searchTerm} onChange={this.updateSearch}/>


        {this.state.data.filter(searchingFor(this.state.searchTerm)).map((data, index) => {
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
