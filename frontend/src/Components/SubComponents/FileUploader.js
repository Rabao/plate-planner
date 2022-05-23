import React, { Component } from 'react'

export default class FileUploader extends Component {
    constructor(props){
        super(props)
        this.state = {
            selectedFile: ''
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {   
        this.setState({selectedFile: document.getElementById('img-input').files[0]});
    }

  render() {
    return (
      <>
         <div className="image-dropzone">
            <span></span>
            <input type="file" id="img-input" accept=".jpg, .jpeg, .png, .bmp" onChange={() => {this.handleChange()}}/>
            <div id="preview-image-container"></div>
         </div>
      </>
    )
  }
}
