import * as actionTypes from '../actions/action_types'

const initialState={
    updatedAt:null,
    updatedDate:null,
    deaths:null,
    confirmed:null,
    recovered:null,
    new_confirmed:null,
    new_recovered:null,
    new_deaths:null,
    loading:false
}

const reducer=(state=initialState,action)=>{
    switch(action.type){
        case(actionTypes.DASHBOARD_INIT):
            return{
                ...state,
                loading:true
            }
        case(actionTypes.FETCH_DASHBOARD_FAIL):
            return {
                ...state,
                loading:false
            }

        case(actionTypes.FETCH_DASHBOARD_SUCCESS):
            return {
                ...state,
                updatedAt:action.data.updatedAt,
                updatedDate:action.data.updatedDate,
                deaths:action.data.deaths,
                confirmed:action.data.confirmed,
                recovered:action.data.recovered,
                new_deaths:action.data.new_deaths,
                new_confirmed:action.data.new_confirmed,
                new_recovered:action.data.new_recovered,
                loading:false
            }

        default:
            return state
    }
}


export default reducer;