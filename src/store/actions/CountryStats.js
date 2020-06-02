import * as actionTypes from "./action_types";

export const fetchStatsSuccess=(fetchedData)=>{
    return{
        type:actionTypes.FETCH_STATS_SUCCESS,
        data:fetchedData
    }
}

export const fetchStatsFail=(error)=>{
    return {
        type:actionTypes.FETCH_STATS_FAIL,
        error:error
    }
}

export const fetchStatsInit=()=>{
    return async(dispatch)=>{
        try{
            dispatch({type:actionTypes.STATS_INIT});
            const response=await fetch("https://corona-api.com/countries");
            const result=await response.json();
            console.log(result)
            dispatch(fetchStatsSuccess(result.data));
        }catch(error){
            dispatch(fetchStatsFail(error))
        }
        
    }
}