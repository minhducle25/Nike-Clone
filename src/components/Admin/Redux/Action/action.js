import API from "../../../../Axios/API"

export const createAction = ({type, payload}) => {
    return {
        type,
        payload,
    }
}

export const createUserAPI = (data) => {
    return async(dispatch) => {
        try {
            const res = await API("users/create", "POST", data)
            alert("success")
            window.location.reload()
        }
        catch(error){
            console.log({...error});
        }
    }
}

export const updateUserAPI = (data, id) => {
    return async(dispatch) => {
        try{
            const token = JSON.parse(localStorage.getItem("user")).token;
            const res = await API("users/updateAdmin/"+id, "PUT", data, token);
            alert("Update user success");
            window.location.reload();
        }catch(error){
            console.log({...error});
            alert(error.response.data.error)
        }
    }
}

export const deleteUserAPI = (data) => {
    return async(dispatch) => {
        try{
            const token = JSON.parse(localStorage.getItem("user")).token;
            const res = await API("users/delete", "DELETE", {_id: data}, token);
            alert("Delete user Success")
            window.location.reload();
        }catch(error){
            console.log({...error});
            alert(error.response.data.error)
        }
    }
}