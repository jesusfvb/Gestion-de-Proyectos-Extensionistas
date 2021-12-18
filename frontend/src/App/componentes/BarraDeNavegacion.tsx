import {
    AppBar,
    Badge,
    Box,
    CssBaseline,
    Grid,
    IconButton,
    Menu,
    MenuItem,
    styled,
    Tab,
    Tabs,
    Toolbar
} from "@mui/material";
import {Fragment, MouseEvent, SyntheticEvent, useRef, useState} from "react";
import {Outlet} from "react-router";
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import logo from "../img/logo.png";

export default function BarraDeNavegacion(props: { serrarSession: Function }) {
    const menuId = 'primary-search-account-menu';
    const cuenta = useRef<Element>()
    const [anchorEl, setAnchorEl] = useState<null | Element>(null);
    const [value, setValue] = useState(0);

    const isMenuOpen = Boolean(anchorEl);
    const handleProfileMenuOpen = (event: MouseEvent) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleSerrarSession = () => {
        props.serrarSession()
    }
    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <Fragment>
            <CssBaseline/>
            <AppBar sx={{
                color: "white",
                backgroundImage: "linear-gradient(200deg,#5E1914,red, orange,white,white )",
            }}>
                <Toolbar>
                    <Grid container direction={"row"} justifyContent="space-between" alignItems="center">
                        <Grid item>
                            <img src={logo} width={500} alt="logo"/>
                        </Grid>
                        <Grid item xl={7} lg={7} container direction="column">
                            <Grid container direction="column" justifyContent="center" alignItems="flex-end">
                                <Box ref={cuenta}>
                                    <IconButton aria-label="show 17 new notifications" color="inherit">
                                        <Badge badgeContent={17} color="error">
                                            <NotificationsIcon/>
                                        </Badge>
                                    </IconButton>
                                    <IconButton
                                        size="large"
                                        edge="end"
                                        aria-label="account of current user"
                                        aria-controls={menuId}
                                        aria-haspopup="true"
                                        onClick={handleProfileMenuOpen}
                                        color="inherit"
                                    >
                                        <AccountCircle/>
                                    </IconButton>
                                    <Menu anchorEl={anchorEl} id={menuId} keepMounted open={isMenuOpen}
                                          onClose={handleMenuClose}
                                          transformOrigin={{
                                              vertical: 'top',
                                              horizontal: 'right',
                                          }}
                                          anchorOrigin={{
                                              vertical: 'top',
                                              horizontal: 'right'
                                          }}
                                    >
                                        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                                        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
                                        <MenuItem onClick={handleSerrarSession}>Cerrar Sesión</MenuItem>
                                    </Menu>
                                </Box>
                            </Grid>
                            <Grid container direction="column" justifyContent="center" alignItems={"flex-start"}>
                                <Tabs value={value} onChange={handleChange} textColor="inherit" variant="fullWidth"
                                      sx={{minWidth: 400}}>
                                    <Tab label="Inicio"/>
                                    <Tab label="Proyectos"/>
                                    <Tab label="Propuestas"/>
                                </Tabs>
                            </Grid>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Toolbar/>
            <Outlet/>
        </Fragment>
    );
}