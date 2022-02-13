import {
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Dialog,
    DialogActions,
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography
} from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CallIcon from '@mui/icons-material/Call';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import {ReactElement, useState} from "react";
import img1 from '../img/1.jpg'
import img2 from '../img/imagen2.jpg'
import img3 from '../img/imagen3.jpg'
import img4 from '../img/imagen4.jpg'

export default function Inicio(): ReactElement {
    const [row, setRow] = useState<Array<any>>([
        {
            id: 1,
            nombre: "Peque Ciudad",
            descripcion: "PequeCiudad es un proyecto extensionista infantil que surgió el 14 de octubre de 2016, tiene como objetivo desarrollar la inteligencia emocional, el lenguaje oral y escrito, la imaginación, las relaciones sociales y los...",
            imagen: img1,
            mas: ""
        },
        {
            id: 2,
            nombre: "Movimiento de Radialistas en la Red",
            descripcion: "El Movimiento de Radialistas en la Red tiene su incidencia fundamental en el desarrollo de la programación de la radio web universitaria, Radio Ciudad Digital. Posibilita a estudiantes, profesores y trabajadores un espacio para el ...",
            imagen: img2,
            mas: ""
        },
        {
            id: 3,
            nombre: "Talentos de Hierro",
            descripcion: "Siguiendo la política de la práctica de ejercicios físicos y deportes como vía para el desarrollo de un joven profesional altamente competitivo, la Universidad de las Ciencias Informáticas (UCI) desde su creación fomentó...",
            imagen: img3,
            mas: ""
        },
        {
            id: 4,
            nombre: "Acciones de motivación y orientación vocacional",
            descripcion: "La Formación Vocacional y Orientación Vocacional constituye base del desarrollo económico-social de cualquier nación. De la concepción, organización y ejecución de... ",
            imagen: img4,
            mas: ""
        }])
    const [open, setOpen] = useState<{ open: boolean, id: number }>({open: false, id: -1});

    const handleClickOpen = (id: number) => () => {
        setOpen({open: true, id: id});
    };

    const handleClose = () => {
        setOpen({open: false, id: -1});
    };

    function BarraLateral(): ReactElement {
        return (
            <Grid item container direction={"column"} justifyContent="center" alignItems="center" xl={3} lg={3}
                  sx={{
                      height: "calc(100vh - 96px)",
                      backgroundImage: "linear-gradient(200deg,#5E1914,red, orange,white,white )",
                      boxShadow: "0 0 10px 0"
                  }}>
                <Typography variant={"h4"}>
                    Documentos
                </Typography>
                <Grid sx={{width: "90%", backgroundColor: "#fff5"}}>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <PictureAsPdfIcon/>
                                </ListItemIcon>
                                <ListItemText
                                    primary="Formato para inscribir los proyectos extensionistas universitarios"/>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <PictureAsPdfIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Manual de procedimiento para crear proyectos socioculturales"/>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <PictureAsPdfIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Inscripción de proyectos extensionistas universitarios"/>
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Grid>
                <Typography variant={"h4"}>
                    Contactos
                </Typography>
                <Grid sx={{width: "90%", backgroundColor: "#fff5"}}>
                    <Grid container direction={"row"} sx={{padding: 1}}>
                        <LocationOnIcon sx={{marginRight: 1}}/>
                        <Typography> Centro cultural,</Typography>
                        <Typography> Segundo piso,</Typography>
                        <Typography> Departamento de Actividades</Typography>
                        <Typography> Extracurriculares.</Typography>
                    </Grid>
                    <Grid container direction={"row"} sx={{padding: 1}}>
                        <CallIcon sx={{marginRight: 1}}/>
                        <Typography> 7835-8403</Typography>
                    </Grid>
                </Grid>
            </Grid>
        )
    }

    function getCard(id: number): ReactElement {
        let value = row.filter(value => value.id === id)[0]
        let descripcion: string = value?.descripcion
        if (id > -1) {
            descripcion = descripcion.replace("...", "")
            descripcion.trim()
            descripcion += " " + value.mas
        }
        return (
            <Card sx={{maxWidth: 345, margin: 1}}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image={value?.imagen}
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {value?.nombre}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {descripcion}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>)
    }

    return (
        <Grid container direction={"row"}>
            <Grid item container xl={true} lg={true} sx={{height: 'calc(100vh - 96px)', overflow: 'auto'}}>
                {row.map((value) =>
                    <Grid item sx={{margin: 2}} key={value.id}>
                        <Card sx={{maxWidth: 345}} onClick={handleClickOpen(value.id)}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={value.imagen}
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {value.nombre}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {value.descripcion}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                )}
            </Grid>
            <BarraLateral/>
            <Dialog
                open={open.open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                {getCard(open.id)}
                <DialogActions>
                    <Button onClick={handleClose}>Inscribirse</Button>
                    <Button onClick={handleClose} color={"secondary"}>Almacenar</Button>
                    <Button onClick={handleClose} color={"error"} autoFocus> Salir </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    )
}