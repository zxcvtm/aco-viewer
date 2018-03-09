import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {render} from 'react-dom'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Polyline } from "react-google-maps"
import { Form, Input, Button, Row, Col, Spin } from 'antd';
import * as utils from '../helpers/utils'
import * as AcoActions from '../actions/aco'

const FormItem = Form.Item;


const Map = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={12}
    defaultCenter={{ lat: -33.437878, lng: -70.650421 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: -33.437878, lng: -70.650421 }} />}
    {props.points.map((obj, index)=>{
      return (
        <Marker key={index} position={obj}/>
      );
    })
    }
    {props.order.length > 0 &&
    <Polyline
      path={props.order}
    />
    }

  </GoogleMap>
));
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      points: [],
      nPoints:0,
      sortedPoints: []
    }
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.aco.get.isLoading && !nextProps.aco.get.isLoading){
      let sortedPoints = [];
      let data = nextProps.aco.get.data;
      for(let i = 0; i< data.order.length; i++) {
        sortedPoints.push(this.state.points[data.order[i]])
      }
      console.log("sortedPoints: ", sortedPoints);
      this.setState({
        ...this.state,
        sortedPoints: sortedPoints
      })
    }
  }
  generateRandom = () => {
    this.setState({
      ...this.state,
      points: utils.getRandomPoints(this.state.nPoints),
      sortedPoints: [],
    })
  };
  calculateRoute = () => {
    let graph = JSON.parse(JSON.stringify(utils.getAdyacencyGraph(this.state.points)));
    let dataJson = {
      graph: graph
    };
    this.props.acoActions.GettingAcoRoute();
    this.props.acoActions.GetAcoRoute(dataJson);
  };
  changeNPoints = (event) => {
    let state = this.state;
    state.nPoints = parseInt(event.target.value);
    this.setState(state);
  };
  render() {
    return (
      <div>
        <div style={{padding:"20px"}}>
          <Row>
            <Col span={12}>
              <h1>Mapa</h1>
              <Form layout="inline" onSubmit={()=>{}}>
                <FormItem>
                  <Input
                    type={"number"}
                    value={this.state.nPoints}
                    placeholder="Nº Puntos"
                    onChange={this.changeNPoints}
                  />
                </FormItem>
                <FormItem>
                  <Button type="primary" onClick={this.generateRandom}>Generar Puntos</Button>
                </FormItem>
                <FormItem>
                  <Button type="primary" onClick={this.calculateRoute} style={{marginLeft:"5px"}}>Calcular Ruta</Button>
                </FormItem>
                {this.props.aco.get.isLoading &&
                  <FormItem>
                    <Spin/>
                  </FormItem>
                }
                <FormItem>
                  <span>
                    {"Duracion: "+this.props.aco.get.data.elapsedTime===undefined?"":this.props.aco.get.data.elapsedTime}
                  </span>
                </FormItem>
                <FormItem>
                  <span>
                    {"Distancia: "+this.props.aco.get.data.distance===undefined?"":this.props.aco.get.data.distance}
                  </span>
                </FormItem>
              </Form>
            </Col>
          </Row>
        </div>
        <div style={{padding:"20px"}}>
          <Map
            isMarkerShown={false}
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `80vh` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            points = {this.state.points}
            order = {this.state.sortedPoints}
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  aco : state.aco
});

const mapDispatchToProps = dispatch => ({
  acoActions: bindActionCreators(AcoActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
