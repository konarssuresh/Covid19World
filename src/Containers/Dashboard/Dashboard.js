import React,{Component} from 'react';
import {fetchDashboardInit} from "../../store/actions/index";
import {connect} from 'react-redux';
import classes from './Dashboard.module.css';
import {formatNumber,formatDate} from '../../utility';
import {NavLink} from 'react-router-dom';

class Dashboard extends Component{
    componentDidMount(){
       this.props.onFetchInit();
    }
    render(){
        let dashboardData=null;
        if(!this.props.loading){
            dashboardData=(<div className="container">
                <div className={ classes.Dashboard+" jumbotron"}>
                    <h3>Global Covid19 Stats</h3>
                    <h4><span className={classes.SpanTitle}>Confirmed:</span> <span className="text-primary">{formatNumber(this.props.confirmed)}</span></h4>
                    <h4><span className={classes.SpanTitle}>Recovered:</span> <span className="text-success">{formatNumber(this.props.recovered)}</span></h4>
                    <h4><span className={classes.SpanTitle}>Deaths:</span> <span className="text-danger">{formatNumber(this.props.deaths)}</span></h4>
                    <h3>Last 24 hours</h3>
                    <h4><span className={classes.SpanTitle}>Confirmed:</span> <span className="text-primary">{formatNumber(this.props.new_confirmed)}</span></h4>
                    <h4><span className={classes.SpanTitle}>Recovered:</span> <span className="text-success">{formatNumber(this.props.new_recovered)}</span></h4>
                    <h4><span className={classes.SpanTitle}>Deaths:</span> <span className="text-danger">{formatNumber(this.props.new_deaths)}</span></h4>
                    <NavLink to="/stats" className="btn btn-primary btn-lg">Countrywise Details</NavLink>
                    <hr/>
                    <p className="text-primary">Last updated on {formatDate(this.props.updatedAt)}</p>
                </div>
            </div>)
        } 

        return  (<div className={classes.Dashboard}>
                    {dashboardData}
                </div>)
    }
    
}

const mapDispatchToProps=(dispatch)=>{
    return {
        onFetchInit:()=>dispatch(fetchDashboardInit())
    }
}
const mapStateToProps=(state)=>{
    return {
        updatedAt:state.dboard.updatedAt,
        updatedDate:state.dboard.updatedDate,
        deaths:state.dboard.deaths,
        confirmed:state.dboard.confirmed,
        recovered:state.dboard.recovered,
        new_confirmed:state.dboard.new_confirmed,
        new_recovered:state.dboard.new_recovered,
        new_deaths:state.dboard.new_deaths,
        loading:state.dboard.loading
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard)