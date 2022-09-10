export const LOGIN = 'Login is done';
const loginDone = ({ email }) => ({ type: LOGIN, email });

export default loginDone;
