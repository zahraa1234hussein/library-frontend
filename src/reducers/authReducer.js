
const initState = {
    isLoading: true,
    isAuthenticated: false,
    user:{
        userType: "",
        name: "",
        email: "",
        phoneNumber: "",
    },
    error: {
        name: "",
        message: "",
    },
}
const authReducer = (state = initState, action) => {
        console.log(action)
    
    if(action.type === 'INITIALIZE_USER_INFO') {
        if(action.user_info)
        return{
            ...state,
            isLoading: false,
            isAuthenticated: true,
            user: action.user_info
        }
    }else if(action.type==='CLEAR_AUTH_STATE'){
        return{
          ...state,
            isLoading: false,
            isAuthenticated: false,
            user: initState.user
        }
    }else if(action.type==='REGISTER_ERROR'){
        return{
          ...state,
          isLoading: false,
          isAuthenticated: false,
          error: action.error_res
        }
    }else if(action.type==='LOGIN_ERROR'){
        return{
          ...state,
          isLoading: false,
          isAuthenticated: false,
          error: action.error_res
        }
    }
    return state;
}
export default authReducer;