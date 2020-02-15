import React, { Component } from 'react';

export default class AddQuote extends Component {
  render() {
    return (
      <div className="add-player">
        <form>
          <label>
            Add New Quote Text:
            <input
              type="text"
              name="name"
              onChange={this.props.handleQuoteChange}
              value={this.props.text}
            />
          </label>

          <input
            onClick={this.props.handleQuoteSubmit}
            type="submit"
            value="add"
          />
        </form>
        <br />
        <hr />
      </div>
    );
  }
}
