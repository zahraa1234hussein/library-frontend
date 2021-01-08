import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthenticatedUser } from './actions/loginAction';
import { logout } from './actions/logoutAction';
import Routes from "./routes/index";

function App() {
 	const dispatch = useDispatch();

	const {isLoading} = useSelector((state) => state.auth);

	useEffect(() => {
    const token = localStorage.getItem('token');
		if (token) {
			dispatch(getAuthenticatedUser());			
		}
		else {
			dispatch(logout()); // set loading to false
		}	
	}, [dispatch]);

	if(isLoading) {
		return <div> still loading</div>
	}
	return (
		<>
			<Routes/>
		</>
	);
}

export default App;
