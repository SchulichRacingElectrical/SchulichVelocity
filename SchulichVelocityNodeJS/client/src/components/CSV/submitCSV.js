import React, {Component} from 'react';
//import ReactFileReader from 'react-file-reader';
//import {post} from 'axios';
import '../../CSS/submitCSV.css';
import ParseCSV from './parseCSV';

export default class SubmitCSV extends Component {

    // componentDidMount() {
    //     document.title = "Schulich Velocity: Submit"
    // }
    //
    // handleFiles = file => {
    //     const url = 'http://localhost:3000/submitCSV';
    //     const formData = new FormData();
    //     formData.append('file', file);
    //     const config = {
    //         headers: {
    //             'content-type': 'multipart/form-data'
    //         }
    //     };
    //     post(url, formData, config);
    // };

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
                <ParseCSV/>
            </div>
        );
    }
}
