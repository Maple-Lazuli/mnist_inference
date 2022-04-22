import React from "react";
import 'semantic-ui-css/semantic.min.css';
import CanvasDraw from "react-canvas-draw";
import Prediction from "./Prediction";
import Backend from "../api/backend";


class App extends React.Component {

    state = {
        brushRadius: 1,
        predictions: [.1, .1, .1, .1, .1, .1, .1, .1, .1, .1],
        imgsrc: "http://127.0.0.1:3033/image?image=blank"
    }



    sendChanges = async () => {
        const response = await Backend.post(
            '/images', {
            data: {
                imageData: this.saveableCanvas.getDataURL()
            }
        });
        this.setState({ imgsrc: "http://127.0.0.1:3033/image?image=" + response.data.image }, () => { this.getPredictions(response.data.image) })

    }

    getPredictions = async (image) => {
        const response = await Backend.get(
            '/prediction', {
            params: { image: image }
        });
        this.setState({ predictions: response.data.predictions })
        if (response.status !== 200) {
        }
    }

    clearCanvas = (e) => {
        e.preventDefault();
        this.saveableCanvas.eraseAll();
        this.sendChanges();

    }

    updateBrushRadius = () => {
        this.setState({brushRadius: document.getElementById("brush").value})
    }

    updateLazyRadius = () => {
        this.setState({lazyRadius: document.getElementById("lazy").value})
    }

    render() {
        return (
            <div className="ui container">
                <div className="ui three item menu">
                    <a className="active item">Inference</a>
                    <a className="item">Training</a>
                    <a className="item">Evaluation</a>
                </div>

                <div className="ui grid">
                    <div className="eight wide column" onMouseUp={this.sendChanges}>
                        <CanvasDraw
                            ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
                            brushColor={"white"}
                            backgroundColor={'black'}
                            brushRadius={this.state.brushRadius}
                            lazyRadius={this.state.lazyRadius}
                            canvasWidth={this.state.width}
                            canvasHeight={this.state.height}
                        />
                    </div>

                    <div className="eight wide column">
                        <img src={this.state.imgsrc} width={400} height={400} alt="Image To Classify" />
                    </div>


                    <div className="six wide column">


                        <form className="ui form">
                            <div className="field">
                                <button className="ui button red" onClick={this.clearCanvas}>Clear</button>
                            </div>

                            <div className="field">
                                <label>Brush Radius</label>
                                <input type="text" name="first-name" placeholder="1"  id = "brush" onChange={this.updateBrushRadius} />
                            </div>
                            <div className="field">
                                <label>Lazy Radius</label>
                                <input type="text" name="last-name" placeholder="5" id = "lazy" onChange={this.updateLazyRadius} />
                            </div>
                        </form>


                    </div>
                    <div className="eight wide column">
                        <Prediction predictions={this.state.predictions} />
                    </div>
                </div>
            </div >
        )
    }
}

export default App;
