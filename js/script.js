//Base de datos 
const usuarios = [{
    nombre: 'Joaquin',
    mail: 'joaquin@hotmail.com',
    pass: 'coder29'
},
{
    nombre: 'Fernando',
    mail: 'fernando@hotmail.com',
    pass: 'coder943'
},
{
    nombre: 'Micaela',
    mail: 'micaela@hotmail.com',
    pass: 'coder084',
},
]
const productos = [{
    nombre: "glacoXAN E",
    rubro: "fumigacion",
    clase: "hormiguicida",
    precio: 250,
    img: ".\images\1glaco-hormigas.jpg",
},
{
    nombre: 'capXAN I',
    rubro: 'fumigacion',
    clase: 'insecticida',
    precio: '$400',
    img: ".\images\1insecticida.jpg",
},
{
    nombre: 'Bermuda',
    rubro: 'siembra',
    clase: 'puras',
    precio: '$2000',
    img: ".\images\1bolsapicasso.webp",
},
{
    nombre: 'Patagonia',
    rubro: 'siembra',
    clase: 'mexcla',
    precio: '$2500',
    img: ".\images\1bolsapicasso.webp",
}
]

const mailLogin = document.getElementById('usuario'),
    passLogin = document.getElementById('contraseña'),
    btnacceder = document.getElementById('btn_acceder'),
    cards = document.getElementById('card-tienda'),
    recordar = document.getElementById('recordarme'),
    contTarjetas = document.getElementById('card-tienda')



function validarUsuario(usersDB, user, pass) {
    let encontrado = usersDB.find(userDB => userDB.mail == user);

    if (typeof encontrado === 'undefined') {
        return false;
    }
    else {
        if (encontrado.pass != pass) {
            return false;
        }
        else {
            return encontrado;
        }
    }
}
//funciones de guardado y borrado del storage
function guardarDatos(usuarioDB, storage) {
    const usuario = {
        'name': usuarioDB.nombre,
        'user': usuarioDB.user,
        'pass': usuarioDB.pass,
    }
    storage.setItem('usuario', JSON.stringify(usuario));
}

function borrarDatos() {
    localStorage.clear();
    sessionStorage.clear();
}

function recuperarUsuario() {
    let usuarioEnStorage = JSON.parse(storage.getItem('usuario'));
    return usuarioEnStorage;
}


//Bootstrap cards

function mostrarProductos(array) {
    contTarjetas.innerHTML = '';
    array.forEach(element => {
        let html = <div class="card" id="card-tienda">"
            <h3 id="nombre">Nombre: ${element.nombre}</h3>
            <img class="card-img-top" src="${element.img}"></img>
            <div class="card-body">
                <p class="card-text" id="rubro">rubro: ${element.rubro}</p>
                <p class="card-text" id="clase">clase: ${element.clase}</p>
                <p class="card-text" id="precio">precio: ${element.precio} pesos</p>
            </div>
        </div>;
        contTarjetas.innerHTML += html;
    });
}

//Acciones y eventos.
btn_acceder.addEventListener('click', (e) => {
    e.preventDefault();

    
        let data = validarUsuario(usuarios, mailLogin.value, passLogin.value);

        if (!data) {
            alert(`Usuario y/o contraseña erróneos`);
        } else {
            
            if (recordar.checked) {
                guardarDatos(data, localStorage);
                saludar(recuperarUsuario(localStorage));
            } else {
                guardarDatos(data, sessionStorage);
                saludar(recuperarUsuario(sessionStorage));
            }
        }
});

btn_salir.addEventListener('click', () => {
    borrarDatos();
});

window.onload = () => estaLogueado(recuperarUsuario(localStorage));


