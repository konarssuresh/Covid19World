import * as actionTypes from './action_types';

export const fetchDashboardSuccess=(fetchedData)=>{
    return {
        type:actionTypes.FETCH_DASHBOARD_SUCCESS,
        data:fetchedData
    }
}

export const fetchDashboardFail = (error)=>{
    return {
        type:actionTypes.FETCH_DASHBOARD_FAIL,
        error:error
    }
}

export const fetchDashboardInit= ()=>{
    return async(dispatch)=>{
        try{
            const response=await fetch("https://corona-api.com/timeline");
            const result=await response.json();
            const resultObj=result.data[0];
            console.log(resultObj);
            const fetchedData={
                updatedAt:resultObj.updated_at,
                updatedDate:resultObj.date,
                deaths:resultObj.deaths,
                confirmed:resultObj.confirmed,
                recovered:resultObj.recovered,
                new_confirmed:resultObj.new_confirmed,
                new_recovered:resultObj.new_recovered,
                new_deaths:resultObj.new_deaths
            }
            dispatch(fetchDashboardSuccess(fetchedData));
            //build the object and dispatch action
        }catch(error){
            dispatch(fetchDashboardFail(error));
        }
    }
}