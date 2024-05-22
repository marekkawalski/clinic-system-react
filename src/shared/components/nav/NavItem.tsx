import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { Link } from 'react-router-dom';
import ListItemText from '@mui/material/ListItemText';
import { NavItemModel } from './models/NavItemModel.ts';
import { useAuth } from '../../../core/authentication/hooks/useAuth.tsx';
import { AuthContextProps } from '../../../core/authentication/models/AuthContextProps.ts';

function NavItem(props: NavItemModel) {
  const { authData, checkAccess }: AuthContextProps = useAuth();

  const checkItemAccess = () => {
    if (!props.requireLogin) {
      return true;
    }
    if (props.requireLogin && !authData) {
      return false;
    }
    if (!props.allowedRoles || props.allowedRoles.length === 0) {
      return true;
    }
    return checkAccess(props.allowedRoles);
  };
  return (
    <>
      {checkItemAccess() && (
        <ListItem disablePadding>
          <ListItemButton component={Link} to={props.listItemPath}>
            <ListItemText primary={props.listItemText} />
          </ListItemButton>
        </ListItem>
      )}
    </>
  );
}

export default NavItem;
