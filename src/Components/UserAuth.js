export const auth = async () => {
    try {
        const token = localStorage.getItem("Token");
        if (token) {
            const response = await fetch("https://smit-student-portal.herokuapp.com/auth", {
                method: "POST",
                headers: {
                    'authorization': token,
                    'Content-Type': 'application/json',
                }
            })
            console.log(response.status)
            if (response.status === 201) {
                return true
            }
            else {
                return false
            }


        }
        else {
            return false
        }
    } catch (error) {
        return error
        // navigate('../login');
    }
}