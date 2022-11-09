export default (state,action) => {
    const {payload,type} = action

    switch(type){
        case 'SAVE_DATA':
            return {
                ...state,
                user:payload
            }
        case 'NOTIFY':
            return {
                ...state,
                noti:payload
            }
        default:
            return state
    }
}