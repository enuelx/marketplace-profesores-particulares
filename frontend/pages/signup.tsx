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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import axios from 'axios';
import { useRouter } from 'next/dist/client/router';

export default function SignUp() {
    const router = useRouter()
    var dateLessSixYear = new Date();
    dateLessSixYear.setDate(dateLessSixYear.getDate() - 2192);
    var formatDateLessSixYear = dateLessSixYear.toISOString().substring(0, 10);
    const [date, setDate] = React.useState(formatDateLessSixYear)
    function dateCondition() {
        var _auxDate = new Date();
        _auxDate.setDate(_auxDate.getDate() - 2191);
        var auxDate = _auxDate.toISOString().substring(0, 10);
        if (date >= auxDate || date.trim().length === 0)
            return false;
        return true;
    }

    const passwordRegex = /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,16}$/
    const [password, setPassword] = React.useState("");
    const [errorPassword, setErrorPassword] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);

    const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    const [errorEmail, setErrorEmail] = React.useState(false);
    const [email, setEmail] = React.useState("");

    const teacherExpRegex = /^([0-9]|[1-6][0-9]|70)$/
    const [errorTeacherExp, setErrorTeacherExp] = React.useState(false);
    const [teacherExp, setTeacherExp] = React.useState("");

    const [teacherTitle, setTeacherTitle] = React.useState("");
    const [errorTeacherTitle, setErrorTeacherTitle] = React.useState(false);

    const [name, setName] = React.useState("");
    const [errorName, setErrorName] = React.useState(false);

    const [lastName, setLastName] = React.useState("");
    const [errorLastName, setErrorLastName] = React.useState(false);

    const phoneRegex = /^[0-9,+]*$/
    const [errorPhone, setErrorPhone] = React.useState(false);
    const [phone, setPhone] = React.useState("");

    const [studies, setStudies] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setStudies(event.target.value as string);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let hasError: boolean = false;
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
        });

        if (password.trim().length === 0 || !password.match(passwordRegex)) {
            hasError = true;
            setErrorPassword(true);
        } else {
            hasError = false;
            setErrorPassword(false);
        }

        if (email.trim().length === 0 || !email.match(emailRegex)) {
            hasError = true;
            setErrorEmail(true);
        } else {
            hasError = false;
            setErrorEmail(false);
        }

        if (teacherTitle.trim().length === 0) {
            hasError = true;
            setErrorTeacherTitle(true);
        } else {
            hasError = false;
            setErrorTeacherTitle(false);
        }

        if (teacherExp.trim().length === 0 || !teacherExp.match(teacherExpRegex)) {
            hasError = true;
            setErrorTeacherExp(true);
        } else {
            hasError = false;
            setErrorTeacherExp(false);
        }

        if (name.trim().length === 0) {
            hasError = true;
            setErrorName(true);
        } else {
            hasError = false;
            setErrorName(false);
        }

        if (lastName.trim().length === 0) {
            hasError = true;
            setErrorLastName(true);
        } else {
            hasError = false;
            setErrorLastName(false);
        }

        if (phone.trim().length === 0 || !phone.match(phoneRegex)) {
            hasError = true;
            setErrorPhone(true);
        } else {
            hasError = false;
            setErrorPhone(false);
        }

        if (!hasError) {
            register(name, lastName, email, phone, password, registeredUserRole, teacherTitle, teacherExp, date, studies)
        }
    };

    const register = async (firstName, lastName, email, phone, password, role, degreeTeacher, experienceTeacher, dateOfBirthStudent, degreeLevelStudent) => {
        if (role === "student") {
            axios.post('http://localhost:3001/signUp', {
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone,
                password: password,
                role: role,
                dateOfBirthStudent: dateOfBirthStudent,
                degreeLevelStudent: degreeLevelStudent
            })
            .then(function (response) {
                console.log(response);
                router.push(
                    {
                        pathname: '/registerSuccess',
                        query: {
                            successMessage: 'Se ha registrado con ??xito. Ya puede ingresar al sitio.'
                        },
                    },
                    '/registerSuccess'
                )
            })
            .catch(function (error) {
                console.log(error);
                switch (error.response.status) {
                    case 409:
                      window.alert("La direcci??n de correo electr??nico ingresada ya se encuentra en uso.")
                      break;
                    case 401:
                        window.alert("Su sesi??n ha expirado. Por favor, vuelva a ingresar al sistema.")
                        localStorage.removeItem("token");
                        localStorage.removeItem("role");
                        localStorage.removeItem("fullName");
                        localStorage.removeItem("userId");
                        localStorage.removeItem("email");
                        window.location.href = "/signIn";
                        break;
                    case 400:
                        window.alert("Falta llenar uno o m??s campos. Por favor revise la informaci??n proporcionada.")
                        break;
                    default:
                      window.alert("Error desconocido, p??ngase en contacto con el administrador")
                      break;
                  };
            })
        } else {
        axios.post('http://localhost:3001/signUp', {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            password: password,
            role: role,
            degreeTeacher: degreeTeacher,
            experienceTeacher: experienceTeacher
        })
        .then(function (response) {
            console.log(response);
            window.location.href = "/registerSuccess?registrationType=user"
        })
        .catch(function (error) {
            console.log(error);
            switch (error.response.status) {
                case 409:
                    window.alert("Esa direcci??n de correo electr??nico ya se encuentra en uso. Por favor, ingrese otra.")
                    break;
                case 401:
                    window.alert("Su sesi??n ha expirado. Por favor, vuelva a ingresar al sistema.")
                    localStorage.removeItem("token");
                    localStorage.removeItem("role");
                    localStorage.removeItem("fullName");
                    localStorage.removeItem("userId");
                    localStorage.removeItem("email");
                    window.location.href = "/signIn";
                    break;
                case 400:
                    window.alert("Uno o m??s campos obligatorios est??n vac??os o son incorrectos, por favor revise la informaci??n proporcionada.")
                    break;
                default:
                    window.alert("Error desconocido, p??ngase en contacto con el administrador")
                    break;
            }
        })
    }};

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
                        defaultValue={formatDateLessSixYear}
                        focused
                        onChange={(event) => setDate(event.target.value)}
                        error={!dateCondition()}
                        helperText={!dateCondition() ? <>Solo se pueden registrar mayores de seis a??os.</> : <></>}
                    />
                </Grid>
                {
                    <Grid item xs={12}>
                        <Typography component="span">
                            <br />Nivel de Estudios:<br /><br />
                        </Typography>
                        <FormControl fullWidth>
                            <InputLabel id="studies-label">M??ximo nivel alcanzado</InputLabel>
                            <Select
                                labelId="studies-label"
                                id="studies"
                                value={studies}
                                label="M??ximo nivel alcanzado"
                                onChange={handleChange}
                            >
                                <MenuItem value={1}>Secundario Incompleto</MenuItem>
                                <MenuItem value={2}>Secundario Completo</MenuItem>
                                <MenuItem value={3}>Terciario Incompleto</MenuItem>
                                <MenuItem value={4}>Terciario Completo</MenuItem>
                                <MenuItem value={5}>Universitario Incompleto</MenuItem>
                                <MenuItem value={6}>Universitario Completo</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>}
            </>)
        }
        if (registeredUserRole === 'teacher') {
            debugger
            return (
                <>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="teacherTitle"
                            required
                            fullWidth
                            id="teacherTitle"
                            label="T??tulo de Grado"
                            error={errorTeacherTitle}
                            helperText={errorTeacherTitle ? <>Ingrese un t??tulo de grado habilitante para dar clases</> : <></>}
                            value={teacherTitle}
                            onChange={(event) => setTeacherTitle(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            id="teacherExperience"
                            label="Su experiencia (0 a 70 a??os)"
                            name="teacherExperience"
                            type='number'
                            error={errorTeacherExp}
                            helperText={errorTeacherExp ?
                                <>Ingrese un n??mero v??lido:<br />
                                    Su experiencia laboral debe ser entre 0 y 70 a??os.
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
                                error={errorName}
                                helperText={errorName ? <>No debe estar vac??o.</> : <></>}
                                onChange={(event) => setName(event.target.value)}
                                value={name}
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
                                error={errorLastName}
                                helperText={errorLastName ? <>No debe estar vac??o.</> : <></>}
                                onChange={(event) => setLastName(event.target.value)}
                                value={lastName}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Correo Electr??nico"
                                name="email"
                                autoComplete="email"
                                error={errorEmail}
                                helperText={errorEmail ?
                                    <>El formato de email es incorrecto. Ejemplo: example@mail.com</> : <></>}
                                onChange={(event) => setEmail(event.target.value)}
                                value={email}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="phone"
                                label="N??mero de Telefono"
                                name="phone"
                                autoComplete="phone"
                                error={errorPhone}
                                helperText={errorPhone ?
                                    <>El formato de telefono es incorrecto. Ejemplo: +5491187654321</> : <></>}
                                onChange={(event) => setPhone(event.target.value)}
                                value={phone}
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
                                label="Contrase??a"
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                autoComplete="new-password"
                                error={errorPassword}
                                helperText={errorPassword ?
                                    <>Ingrese una contrase??a v??lida.<br />
                                        La contrase??a debe poseer:<br />
                                        - Entre 8 y 16 caracteres alfanum??ricos<br />
                                        - Dos letras may??sculas<br />
                                        - Un caracter especial, elegir entre: !@#$&*<br />
                                        - Tres letras min??sculas<br />
                                        - Dos n??meros<br />
                                    </> : <></>}
                                onChange={(event) => setPassword(event.target.value)}
                                value={password}
                            />
                        </Grid>
                        <Grid item xs={12}
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center">
                            <FormControl>
                                <FormLabel
                                    id="registeredUserRole"
                                    required>
                                    ??Qu?? te trae ac???
                                </FormLabel>
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
                                ??Ya tiene cuenta? Ingrese con su usuario
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}