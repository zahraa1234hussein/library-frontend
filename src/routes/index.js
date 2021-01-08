import React from 'react';
import {Switch} from 'react-router-dom';
import Route from './Route';
import Home from '../pages/Home';
import Login from '../pages/Login';
import AdminRegister from '../pages/AdminRegister';
import adminApprove from '../pages/AdminApprove';
import Register from '../pages/Register';
import AdminBooks from '../pages/AdminBooks';
import AdminAuthors from '../pages/AdminAuthors';
import AdminCategories from '../pages/AdminCategories';
import AdminLanguages from '../pages/AdminLanguages';
import AdminPublishers from '../pages/AdminPublishers';
import AdminSeries from '../pages/AdminSeries';
import PageNotFound from '../pages/PageNotFound';
import Checkout from '../pages/payment/Checkout';
import Profile from '../pages/Profile';


const routesConfiguration = [
	
	{
		path: '/',
		exact: true,
		component: Home,
		isPrivate: true,
		isAdminRoute: false,
	},
	{
		path: '/profile',
		exact: true,
		component: Profile,
		isPrivate: true,
		isAdminRoute: false,
	},
	{
		path: '/payment/:book_id',
		exact: true,
		component: Checkout,
		isPrivate: true,
		isAdminRoute: false,
	},
	{
		path: '/login',
		exact: true,
		component: Login,
		isPrivate: false,
		isAdminRoute: false,
	},
	{
		path: '/register',
		exact: true,
		component: Register,
		isPrivate: false,
		isAdminRoute: false,
	},
	{
		path: '/admin-register',
		exact: true,
		component: AdminRegister,
		isPrivate: false,
		isAdminRoute: false,
	},
	{
		path: '/admin-approve',
		exact: true,
		component: adminApprove,
		isPrivate: true,
		isAdminRoute: true,
	},
	{
		path: '/admin-books',
		exact: true,
		component: AdminBooks,
		isPrivate: true,
		isAdminRoute: true,
	},
	{
		path: '/admin-authors',
		exact: true,
		component: AdminAuthors,
		isPrivate: true,
		isAdminRoute: true,
	},
	{
		path: '/admin-categories',
		exact: true,
		component: AdminCategories,
		isPrivate: true,
		isAdminRoute: true,
	},
	{
		path: '/admin-languages',
		exact: true,
		component: AdminLanguages,
		isPrivate: true,
		isAdminRoute: true,
	},
	{
		path: '/admin-publishers',
		exact: true,
		component: AdminPublishers,
		isPrivate: true,
		isAdminRoute: true,
	},
	{
		path: '/admin-series',
		exact: true,
		component: AdminSeries,
		isPrivate: true,
		isAdminRoute: true,
	},
];
export default function Routes() {
	return (
		<Switch>
			{routesConfiguration.map((route, index) => (
				<Route
					path={route.path}
					exact={route.exact}
					component={route.component}
					isPrivate={route.isPrivate}
					isAdminRoute={route.isAdminRoute}
					key={index}
				/>
			))}
			<Route
				component={PageNotFound}
				isPrivate={false}
				isAdminRoute={false}
			/>
		</Switch>
	);
}
