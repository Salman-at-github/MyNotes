export const editNote = async(id, title, description, tag)=>{
    try { 
        let success = false;
        const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/v1/notes/update/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("token"),
            },
            body: JSON.stringify({ title, description, tag }),
          });
        if(response.status === 200){
            success = true
        }
        return success
    } catch (error) {
        throw error
    }
}