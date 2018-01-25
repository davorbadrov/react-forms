// Helpers

export function login(email, password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (email === 'test@test.com') {
                resolve({
                    token: 'THIS_IS_YOUR.JWT_TOKEN.FOR_AUTHENTICATION'
                });
            } else {
                reject({
                    status: 400,
                    message: 'Invalid credentials...'
                });
            }
        }, 1500);
    });
}

export const submitData = ({age, email, name, forceSubmissionFail, type}) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (forceSubmissionFail) {
                return reject(`Couldn't submit your data`);
            }

            return resolve({
                name: name,
                email: email,
                age: age
            });
        }, 2500);
    });
};
