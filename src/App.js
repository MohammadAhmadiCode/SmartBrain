import React, { Component } from 'react';
import './App.css';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
import Navigation from './Components/navigation/Navigation';
import Logo from './Components/Logo/Logo';
import Rank from './Components/Rank/Rank';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';

const app = new Clarifai.App({
  apiKey: 'a5bc9e652ed94a6c8cae4ca0d6f7be23'
 });
const particleObject= {
  particles: {
    number: {
      value: 200,
      density: {
        enable: true,
        value_area: 1000
      }
    }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input : '',
      imageUrl: '',
      box: {},
      route: "signIn",
      isSignedIn: false
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow : clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }
  displayFaceBox = (box) => {
    this.setState({box: box})
  }

  onInputChange = (event) => {
    this.setState({input : event.target.value})
  }
  onButtonSubmit = () => {
    this.setState({imageUrl : this.state.input})
    app.models.predict(Clarifai.FACE_DETECT_MODEL , 
      this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if(route ==='signout'){
      this.setState({isSignedIn :false})
    }else if(route === 'home'){
      this.setState({isSignedIn : true})
    }
    this.setState({route : route})
  }
  

  render() { 
    return (
      <div className="App">
        <Particles className="particles"
          params = {particleObject}
        />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange = {this.onRouteChange}/>
        {this.state.route ==="home"
          ? <div>
              <Logo />
              <Rank />
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
              <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
            </div>
          :(this.state.route === "signIn"
          ? <SignIn onRouteChange = {this.onRouteChange}/>
          : <Register onRouteChange = {this.onRouteChange}/>
          )
        }

      </div>
    );
  }
}
 
export default App;