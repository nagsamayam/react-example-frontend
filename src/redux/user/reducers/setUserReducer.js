import { SET_USER } from "../actionTypes";

const initialUserState = {
    firstName: '',
    lastName: '',
    email: '',
    roleId: 0,
}

const setUserReducer = (user = initialUserState, action) => {
    switch(action.type) {
        case SET_USER:
            return {
                ...user, 
                firstName: action.user.firstName, 
                lastName: action.user.lastName, 
                email: action.user.email,
                roleId: action.user.roleId,
            }
        default: return user
    }
}

export default setUserReducer;