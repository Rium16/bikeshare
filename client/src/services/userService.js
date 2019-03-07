// inspired by http://jasonwatmore.com/post/2017/09/16/react-redux-user-registration-and-login-tutorial-example
export const userService = {
    login,
    logout
}

/*
    This folder encapsulates all the functions we need for user-related network requests. Pulling them out into here
    just helps for reusability.
*/

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    }

    return fetch('/api/user', requestOptions)
        .then(handleResponse)
        .then(user => {
            console.log(user);
            const login = JSON.stringify(user[0]);
            if (login !== undefined) {
                localStorage.setItem('user', login);
                return user;
            } else {
                throw new Error("Invalid login details");
            }

        
        });
}

function logout() {
    // just remove user from local storage
    localStorage.removeItem('user');
}

function getReservation(CID) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ CID })
    }

    return fetch('/api/reservation', requestOptions)
        .then(handleResponse)
        .then(reservation => {
            console.log(reservation);
            const res = JSON.stringify(reservation[0]);
        });
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {

            // may need to look at what response data looks like
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    })
}