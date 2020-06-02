import * as actionTypes from "../actions/action_types";
const initialState={
    countries:null,
    loading:false
}

const reducer=(state=initialState,action)=>{
    switch(action.type){
        case actionTypes.STATS_INIT:
            return {
                ...state,
                loading:true
            }
        case actionTypes.FETCH_STATS_SUCCESS:
            return{
                ...state,
                countries:action.data,
                loading:false
            }
        case actionTypes.FETCH_STATS_FAIL:
            return{
                ...state,
                loading:false
            }

        default:
            return state
    }
}

export default reducer