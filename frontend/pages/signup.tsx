import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function SignUp() {

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            email: data.get('email'),
            phone: data.get('phone'),
            password: data.get('password')
        });
    };

    const passwordRegex = /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,16}$/
    const [password, setPassword] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);

    const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    const [email, setEmail] = React.useState("");

    const teacherExpRegex = /^([0-9]|[1-6][0-9]|70)$/
    const [teacherExp, setTeacherExp] = React.useState("");

    var curr = new Date();
    curr.setDate(curr.getDate());
    var currDate = curr.toISOString().substring(0, 10);
    const [date, setDate] = React.useState(currDate)
    function dateCondition() {
        if (date <= currDate)
            return false;
        return true;
    }

    const [registeredUserRole, setRegisteredUserRole] = React.useState("")
    function handleUserRole(registeredUserRole) {
        if (registeredUserRole === 'student') {

            return (<>
                <Grid item xs={12}>
                    <TextField
                        name="studentBirthday"
                        required
                        fullWidth
                        id="studentBirthday"
                        label="Fecha de Nacimiento"
                        type="date"
                        focused
                        defaultValue={currDate}
                        onChange={(event) => setDate(event.target.value)}
                        error={date !== "" && dateCondition()}
                        helperText={date !== "" && dateCondition() ? <>Ingrese una fecha anterior a hoy</> : <></>}
                    />
                </Grid>
                {
                    <Grid item xs={12}>
                        <Typography component="span">
                            <br />Nivel de Estudios:<br /><br />
                        </Typography>


                        <FormControl>
                            <FormLabel id="elementary">Primario</FormLabel>
                            <RadioGroup
                                color="primary"
                                aria-labelledby="elementary"
                                name="elementary-radio-buttons-group"
                                defaultValue="NAElementary"
                            >
                                <Grid item xs={12}>
                                    <FormControlLabel value="currentElementary" control={<Radio />} label="En curso" />
                                    <FormControlLabel value="finishedElementary" control={<Radio />} label="Finalizado" />
                                    <FormControlLabel value="NAElementary" control={<Radio />} label="No Aplica" />
                                </Grid>
                            </RadioGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel id="highSchool">Secundario</FormLabel>
                            <RadioGroup
                                color="primary"
                                aria-labelledby="highSchool"
                                name="highSchool-radio-buttons-group"
                                defaultValue="NAHighSchool"
                            >
                                <Grid item xs={12}>
                                    <FormControlLabel value="currentHighSchool" control={<Radio />} label="En curso" />
                                    <FormControlLabel value="finishedHighSchool" control={<Radio />} label="Finalizado" />
                                    <FormControlLabel value="NAHighSchool" control={<Radio />} label="No Aplica" />
                                </Grid>
                            </RadioGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel id="tertiary">Terciario</FormLabel>
                            <RadioGroup
                                color="primary"
                                aria-labelledby="tertiary"
                                name="tertiary-radio-buttons-group"
                                defaultValue="NATertiary"
                            >
                                <Grid item xs={12}>
                                    <FormControlLabel value="currentTertiary" control={<Radio />} label="En curso" />
                                    <FormControlLabel value="finishedTertiary" control={<Radio />} label="Finalizado" />
                                    <FormControlLabel value="NATertiary" control={<Radio />} label="No Aplica" />
                                </Grid>
                            </RadioGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel id="university">Universitario</FormLabel>
                            <RadioGroup
                                color="primary"
                                aria-labelledby="university"
                                name="university-radio-buttons-group"
                                defaultValue="NAUniversity"
                            >
                                <Grid item xs={12}>
                                    <FormControlLabel value="currentUniversity" control={<Radio />} label="En curso" />
                                    <FormControlLabel value="finishedUniversity" control={<Radio />} label="Finalizado" />
                                    <FormControlLabel value="NAUniversity" control={<Radio />} label="No Aplica" />
                                </Grid>
                            </RadioGroup>
                        </FormControl>
                    </Grid>}
            </>)
        }

        if (registeredUserRole === 'teacher') {
            return (
                <>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="teacherTitle"
                            required
                            fullWidth
                            id="teacherTitle"
                            label="Título"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            id="teacherExperience"
                            label="Su experiencia (0 a 70 años)"
                            name="teacherExperience"
                            type='number'
                            error={teacherExp !== "" && !teacherExp.match(teacherExpRegex)}
                            helperText={teacherExp !== "" && !teacherExp.match(teacherExpRegex) ?
                                <>Ingrese un número válido:<br />
                                    Su experiencia laboral debe ser entre 0 y 70 años.
                                </> : <></>}
                            value={teacherExp}
                            onChange={(event) => setTeacherExp(event.target.value)}
                            inputProps={{ min: 0, max: 70 }}
                        />
                    </Grid>
                </>
            );
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    marginBottom: 25,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Registrarse
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="Nombre"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Apellido"
                                name="lastName"
                                autoComplete="family-name"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Correo Electrónico"
                                name="email"
                                autoComplete="email"
                                error={email !== "" && !email.match(emailRegex)}
                                helperText={email !== "" && !email.match(emailRegex) ? <>email incorrecto</> : <></>}
                                onChange={(event) => setEmail(event.target.value)}
                                value={email}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="phone"
                                label="Número de Telefono"
                                name="phone"
                                autoComplete="phone"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(prev => !prev)}
                                                edge="end"
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                                required
                                fullWidth
                                name="password"
                                label="Contraseña"
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                autoComplete="new-password"
                                error={password !== "" && !password.match(passwordRegex)}
                                helperText={password !== "" && !password.match(passwordRegex) ?
                                    <>Ingrese una contraseña válida.<br />
                                        La contraseña debe poseer:<br />
                                        - Entre 8 y 16 caracteres alfanuméricos<br />
                                        - Dos letras mayúsculas<br />
                                        - Un caracter especial, elegir entre: !@#$&*<br />
                                        - Tres letras minúsculas<br />
                                        - Dos números<br />
                                    </> : <></>}
                                onChange={(event) => setPassword(event.target.value)}
                                value={password}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="Quiero recibir emails de la plataforma"
                            />
                        </Grid>
                        <Grid item xs={12}
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center">
                            <FormControl>
                                <FormLabel id="registeredUserRole">¿Qué te trae acá?<br /></FormLabel>
                                <RadioGroup
                                    color="primary"
                                    aria-labelledby="registeredUserRole"
                                    name="user-role-radio-buttons-group"
                                    onChange={(event) => setRegisteredUserRole(event.target.value)}
                                >
                                    <Grid item xs={12}>
                                        <FormControlLabel value="teacher" control={<Radio />} label="Soy profesor" />
                                        <FormControlLabel value="student" control={<Radio />} label="Soy estudiante" />
                                    </Grid>
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        {handleUserRole(registeredUserRole)}
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Registrarse
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/signin" variant="body2">
                                Ya tiene cuenta? Ingrese con su usuario
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}