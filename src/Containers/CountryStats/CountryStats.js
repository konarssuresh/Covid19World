import React,{Component} from 'react';
import classes from "./CountryStats.module.css";
import {fetchStatsInit} from "../../store/actions/index";
import {connect} from "react-redux";
import {formatNumber,formatDate}  from "../../utility";
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import Aux from "../../hoc/Auxilary";

class CountryStats extends Component{

    state={
        filterText:'',
        selectedCountry:null,
        showModal:false
    }

    onFilterTextChangeHandler=(event)=>{
        this.setState({filterText:event.target.value});
    }

    handleModalClose=()=>{
        this.setState({selectedCountry:null})
    }

    onCountryClicked=(key)=>{
        const country= this.props.countries.find((country)=>{
            return country.code === key
        })
        if(country){
            console.log("country found");
            this.setState({selectedCountry:country})
        }
    }

    componentDidMount(){
        this.props.onFetchStats();
    }

    render(){
        let countries=null;
        let modal=null;
        //build page data
        if(!this.props.loading){
            let countriesArray=this.props.countries;
            if(countriesArray&& countriesArray.length>0){
                //filter array based on text input
                let filteredCountriesArray=countriesArray.filter((country)=>{
                    return !country.name.toLowerCase().search(this.state.filterText.toLowerCase());
                });
                //sort the countries based on active cases in descending order in the filtered array
                filteredCountriesArray.sort((left,right)=>{
                    if((left.latest_data.confirmed)<(right.latest_data.confirmed)){
                        return 1
                    }
                    if((left.latest_data.confirmed)>(right.latest_data.confirmed)){
                        return -1
                    }
                })
                // build the jsx for sorted array
                countries=filteredCountriesArray.map(country=>{
                    return (
                        <tr key={country.code} onClick={()=>this.onCountryClicked(country.code)}>
                            <td>{country.name}</td>
                            <td className="text-primary">{formatNumber(country.latest_data.confirmed)}</td>
                            <td className="text-warning d-none d-lg-table-cell">{formatNumber(country.latest_data.confirmed-country.latest_data.recovered)}</td>
                            <td className="text-success d-none d-lg-table-cell">{formatNumber(country.latest_data.recovered)}</td>
                            <td className="text-danger">{formatNumber(country.latest_data.deaths)}</td>
                            <td className="text-danger d-none d-lg-table-cell">{country.latest_data.calculated.death_rate?country.latest_data.calculated.death_rate.toFixed(2):0}</td>
                            <td className="text-success d-none d-lg-table-cell">{country.latest_data.calculated.recovery_rate?country.latest_data.calculated.recovery_rate.toFixed(2):0}</td>
                        </tr>
                    )
                })
            }
        }
        //build modal data
        if(this.state.selectedCountry){
            modal=(                
            <Modal show={this.state.selectedCountry!==null} onHide={this.handleModalClose}>
                <ModalHeader>
                    <ModalTitle>
                        <div className="container text-center">
                            <h2 className="text-primary">{this.state.selectedCountry.name}</h2>
                        </div>
                    </ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <div className={classes.Modal+" container"}>
                        <h3><span className={classes.ModalStatsParam}>Population -</span>  <span className={classes.ModalStatsVal+ " text-primary"}>{formatNumber(this.state.selectedCountry.population)}</span></h3>
                        <h3><span className={classes.ModalStatsParam}>Total Confirmed -</span> <span className={classes.ModalStatsVal+ " text-primary"}>{formatNumber(this.state.selectedCountry.latest_data.confirmed)}</span></h3>
                        <h3><span className={classes.ModalStatsParam}>Total Active -</span> <span className={classes.ModalStatsVal+" text-warning"}>{formatNumber(this.state.selectedCountry.latest_data.confirmed-this.state.selectedCountry.latest_data.recovered)}</span></h3>
                        <h3><span className={classes.ModalStatsParam}>Total Recovered -</span> <span className={classes.ModalStatsVal+" text-success"}>{formatNumber(this.state.selectedCountry.latest_data.recovered)}</span></h3>
                        <h3><span className={classes.ModalStatsParam}>Total Critial -</span> <span className={classes.ModalStatsVal+" text-danger"}>{formatNumber(this.state.selectedCountry.latest_data.critical)}</span></h3>
                        <h3><span className={classes.ModalStatsParam}>Total Deaths -</span> <span className={classes.ModalStatsVal+" text-danger"}>{formatNumber(this.state.selectedCountry.latest_data.deaths)}</span></h3>
                        <h3><span className={classes.ModalStatsParam}>Death Rate -</span> <span className={classes.ModalStatsVal+" text-danger"}>{this.state.selectedCountry.latest_data.calculated.death_rate?this.state.selectedCountry.latest_data.calculated.death_rate.toFixed(2):0}%</span></h3>
                        <h3><span className={classes.ModalStatsParam}>Recovery Rate-</span> <span className={classes.ModalStatsVal+" text-success"}>{this.state.selectedCountry.latest_data.calculated.recovery_rate?this.state.selectedCountry.latest_data.calculated.recovery_rate.toFixed(2):0}%</span></h3>
                        <h3><span className={classes.ModalStatsParam}>Cases per Million Population- </span> <span className={classes.ModalStatsVal+" text-primary"}>{this.state.selectedCountry.latest_data.calculated.cases_per_million_population}</span></h3>
                        <span className="text-primary">last updated at -{formatDate(this.state.selectedCountry.updated_at)}</span> 
                    </div>
                </ModalBody>
                <ModalFooter>
                    <div>
                        <button className="btn btn-primary" onClick={this.handleModalClose}>Close</button>
                    </div>
                </ModalFooter>
            </Modal>)
        }
        return (
            <Aux>
                <div className="container">
                    <p>Filter:- <input onChange={this.onFilterTextChangeHandler} className="form-control" placeholder="Region Name"/></p>
                    <p className="text-primary">Click in countries for detailed info</p>
                    <div className="table-responsive">
                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">Country</th>
                                    <th scope="col">Conf</th>
                                    <th scope="col" className="d-none d-lg-table-cell">Act</th>
                                    <th scope="col" className="d-none d-lg-table-cell">Disch</th>
                                    <th scope="col">Death</th>
                                    <th scope="col" className="d-none d-lg-table-cell">Death %</th>
                                    <th scope="col" className="d-none d-lg-table-cell">Recovery %</th>
                                </tr>
                            </thead>
                            <tbody>
                                {countries}
                            </tbody>
                        </table>
                    </div>
                </div>
                {modal}
            </Aux>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        countries:state.stats.countries,
        loading:state.stats.loading
    }
}

const mapDispatchToProps=(dispatch)=>{
    return {
        onFetchStats:()=>dispatch(fetchStatsInit())
    }
}

export default  connect(mapStateToProps,mapDispatchToProps)(CountryStats)
