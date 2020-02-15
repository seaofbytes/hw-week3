import React, { Component } from 'react';
import Quote from '../Quote/Quote';
import AddQuote from '../AddQuote/AddQuote';

export default class QuoteSearcher extends Component {
  state = {
    quotes: [],
    fetching: true,
    searchValue: '',
    newQuoteText: ''
  };

  componentDidMount() {
    this.search('tree');
  }

  search = (keyword = this.state.searchValue) => {
    
    fetch(`https://quote-garden.herokuapp.com/quotes/search/${keyword}`)
      .then(res => res.json())
      .then(data => {
      if (!data.results.length) {
          this.setState({ ...this.state, noSearchResult: true });
        } else {
          this.setState({ ...this.state, noSearchResult: false });
        }
      
        const uniqueQuotes = data.results.reduce((uniqueQuotes, quote) => {
          return uniqueQuotes.map(q => q.quoteText).includes(quote.quoteText)
            ? uniqueQuotes
            : [...uniqueQuotes, quote];
        }, []);

        this.setState({
          ...this.state,
          fetching: false,
          quotes: uniqueQuotes.map(quote => {
            return {
              ...quote,
              color: 'black'
            };
          })
        });
      });
  };

  likeOrDislikeQuote = (e, id) => {
    const updatedQuotes = this.state.quotes.map(quote => {
      if (id === quote._id && e.target.name === 'Like') {
        return {
          ...quote,
          color: 'green',
          liked: true
        };
      } else if (id === quote._id && e.target.name === 'Dislike') {
        return {
          ...quote,
          color: 'red',
          liked: false
        };
      } else {
        return quote;
      }
    });

    this.setState({
      ...this.state,
      quotes: [...updatedQuotes]
    });
  };

  displayQuotes = () => {
    return this.state.quotes.map(quote => {
      return (
        <Quote
          id={quote._id}
          key={quote._id}
          quoteText={quote.quoteText}
          quoteAuthor={quote.quoteAuthor}
          color={quote.color}
          likeOrDislikeQuote={this.likeOrDislikeQuote}></Quote>
      );
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.search();
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  getUniqueAuthors = () => {
    const uniqueAuthors = this.state.quotes.reduce((uniqueAuthors, quote) => {
      return uniqueAuthors.map(q => q.quoteAuthor).includes(quote.quoteAuthor)
        ? uniqueAuthors
        : [...uniqueAuthors, quote];
    }, []);
    return uniqueAuthors.length;
  };

  addQuote = () => {
    const quote = {
      _id: Math.round(Math.random() * 100000),
      quoteText: this.state.newQuoteText,
      quoteAuthor: 'Sandi Lukez'
    };
    this.setState({
      ...this.state,
      quotes: this.state.quotes.concat(quote)
    });
  };

  handleQuoteSubmit = e => {
    e.preventDefault();
    this.addQuote();
  };

  handleQuoteChange = e => {
    this.setState({
      ...this.state,
      newQuoteText: e.target.value
    });
  };

  render() {
    if (this.state.fetching) {
      return <div>Loading . . .</div>;
    } else {
      return (
        <div>
          <h1>QUOTES</h1>
          <AddQuote
            quoteText={this.state.newQuoteText}
            handleQuoteChange={this.handleQuoteChange}
            handleQuoteSubmit={this.handleQuoteSubmit}
          />
          <h2>Unique quotes : {this.state.quotes.length}</h2>
          <h2>Unique authors : {this.getUniqueAuthors()} </h2>
          <hr />
          <h3>
            Likes:{' '}
            {this.state.quotes.filter(quote => quote.liked === true).length}/
            Dislikes:{' '}
            {this.state.quotes.filter(quote => quote.liked === false).length}
          </h3>
          <form className="form-inline">
            <input
              onChange={this.handleChange}
              value={this.state.searchValue}
              type="search"
              name="searchValue"
              placeholder="Search"
              aria-label="Search"></input>
            <button
              onClick={this.handleSubmit}
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit">
              Search
            </button>
          </form>
          {this.state.noSearchResult ? (
            <div>No Search Results</div>
          ) : (
            this.displayQuotes()
          )}
        </div>
      );
    }
  }
}
