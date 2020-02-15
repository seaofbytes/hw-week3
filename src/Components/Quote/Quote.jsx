import React, { Component } from 'react';

export default class Quote extends Component {
  render() {
    return (
      <div>
        <h2 style={{ color: this.props.color }}>
          Text: {this.props.quoteText}
        </h2>
        <h2>Author: {this.props.quoteAuthor}</h2>
        <br />
        <button
          name="Dislike"
          onClick={e => this.props.likeOrDislikeQuote(e, this.props.id)}>
          Dislike!
        </button>
        <button
          name="Like"
          onClick={e => this.props.likeOrDislikeQuote(e, this.props.id)}>
          Like!
        </button>
        <hr />
      </div>
    );
  }
}
