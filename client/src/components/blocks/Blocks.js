import React, { Component } from "react";
import { Link } from "react-router-dom";
import Block from "./Block";

class Blocks extends Component {
  state = { blocks: [] };

  componentDidMount() {
    fetch(`${document.location.origin}/api/blocks`)
      .then(response => response.json())
      .then(json => this.setState({ blocks: json }));
  }

  render() {
    return (
      <div className="Blocks">
        <h3 className="pageTitle">Blocks</h3>
        {this.state.blocks.map(block => {
          return (
            <div key={block.hash} className="Block">
              <Block key={block.hash} block={block} />
            </div>
          );
        })}
      </div>
    );
  }
}

export default Blocks;
