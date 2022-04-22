import React from "react";
import 'semantic-ui-css/semantic.min.css';
import Backend from "../api/backend";
import Plot from 'react-plotly.js';


class Prediction extends React.Component {

    state = {
        number: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

    }

    render() {
        return (
                    <Plot
                        data={[
                            { type: 'bar', x: this.state.number, y: this.props.predictions},
                        ]}
                        layout={{
                            title: 'Probability Of Number', xaxis: {
                                showticklabels: true,
                                type: 'category'
                            }
                        }}
                    />
        )
    }
}

export default Prediction;
