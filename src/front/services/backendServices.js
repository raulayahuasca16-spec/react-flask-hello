 export const login = async (user, navigate) => {
    const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/login`,{
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await response.json()
    if (!response.ok) {
        alert(data.error);
        return
    }
    localStorage.setItem("token", data.token)
    navigate("/private")
}

export const privateCheck = async () => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/profile`,{
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
    
    const data = await response.json()
    if (!response.ok) {
        return false;
    }
    return data;
}

export const register = async (user, navigate) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/register`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" }
    });
    const data = await response.json();
    if (!response.ok) {
        alert(data.error || data.msg);
        return;
    }
    alert("User created successfully, please log in");
    navigate("/");
};