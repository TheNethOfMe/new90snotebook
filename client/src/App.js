import React, { Component } from "react";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";

import "./sass/main.scss";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <h1>
          My 90s Notebook <i className="fas fa-book" />
        </h1>
        <Landing />
        <Footer />
      </div>
    );
  }
}

export default App;
