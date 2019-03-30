import React, { Component } from 'react';
import ReactFileReader from 'react-file-reader';
import { post } from 'axios';
import './submitCSV.css';

export default class SubmitCSV extends Component {
  handleFiles = file => {
    const url = 'http://localhost:3001/submitCSV';
    const formData = new FormData();
    formData.append('file',file);
    const config = {
      headers: {
        'content-type':'multipart/form-data'
      }
    }
    post(url, formData, config);
  }

  render() {
    return (
      <div className="submitCSV">
        <div>
          <p>
            <br></br>
              Upload a CSV file by clicking the button and selecting your file. 
              Once submitted, you can view the data in the historical data section. 
          </p>
        </div>
        <ReactFileReader handleFiles={this.handleFiles}>
          <button className='submitBTN'>
            Upload
          </button>
        </ReactFileReader>
      </div>
    );
  }
}
