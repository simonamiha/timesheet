import EmployeeTable from './EmployeeTable';
import LeavesTable from './Leaves';
import Dashboard from './Dashboard';
import Login from './Login';
import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {
  MemoryRouter,
  Route,
  Routes,
  Link,
  matchPath,
  useLocation,
} from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';

function Router(props) {
  const { children } = props;
  if (typeof window === 'undefined') {
    return <StaticRouter location='/Dashboard'>{children}</StaticRouter>;
  }

  return (
    <MemoryRouter initialEntries={['/Login']} initialIndex={0}>
      {children}
    </MemoryRouter>
  );
}

Router.propTypes = {
  children: PropTypes.node,
};

function useRouteMatch(patterns) {
  const { pathname } = useLocation();

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];
    const possibleMatch = matchPath(pattern, pathname);
    if (possibleMatch !== null) {
      return possibleMatch;
    }
  }

  return null;
}

function MyTabs() {
  // You need to provide the routes in descendant order.
  // This means that if you have nested routes like:
  // users, users/new, users/edit.
  // Then the order should be ['users/add', 'users/edit', 'users'].
  const routeMatch = useRouteMatch(['/EmployeeTable', '/Leaves', '/Dashboard', '/Login']);
  const currentTab = routeMatch?.pattern?.path;

  return (
    <Tabs value={currentTab}>
      <Tab label="Dashboard" value="/Dashboard" to="/Dashboard" component={Link} />
      <Tab label="Employees" value="/EmployeeTable" to="/EmployeeTable" component={Link} />
      <Tab label="Leaves" value="/Leaves" to="/Leaves" component={Link} />
      <Tab label="Login" value="/Login" to="/Login" component={Link} />
    </Tabs>
  );
}

export default function TabsRouter() {
  return (
    <Router>
      <Box sx={{ width: '100%'}}>
      <MyTabs />
        <Routes>
          <Route path="/Dashboard" element={<Dashboard />}/>
          <Route path="/EmployeeTable" element={<EmployeeTable />}/>
          <Route path="/Leaves" element={<LeavesTable />}/>
          <Route path="/Login" element={<Login />}/>
        </Routes>
      </Box>
    </Router>
  );
}