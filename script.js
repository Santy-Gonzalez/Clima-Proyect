//Api clima
const api = {
  key: '1b742706fc7782b890c5c59222605dca',
  url: `https://api.openweathermap.org/data/2.5/weather`
}

  //Variables Storage
  const welcome = 'bienvenida';
  let saludoStorage = localStorage.getItem(welcome);
  let nameStorage = localStorage.getItem('nombreUsuario');
  let lastNameStorage = localStorage.getItem('apellidoUsuario');
  let emailStorage = localStorage.getItem('emailUsuario');
  let passwordStorage = localStorage.getItem('passwordUsuario');
  let anioNacimientoStorage = localStorage.getItem('anioNacimientoUsuario');
  const contFormulario = document.getElementById("contFormulario");
  const anioNacimiento = document.getElementById('anioNacimiento');

  const YEAR = 2022;
  let edad = (YEAR - anioNacimiento);
  let esMayorDeEdad = edad >= 18; 

  //Variables DOM
  const nothing_1 = document.getElementById("nothing_1");
  const nothing_2 = document.getElementById("nothing_2");
  const nothing_3 = document.getElementById("nothing_3");
  const nothing_4 = document.getElementById("nothing_4");

  const greeting = document.getElementById("greeting");
  
  const reset = document.getElementById("reset");
  const borrar = document.getElementById("borrar");

  const form = document.getElementById("form");
  const contForm = document.getElementById("contForm");
  const modal_container = document.getElementById("modal_container");
  
  const close = document.getElementById('close');
  const send = document.getElementById("send");
  const open = document.getElementById('open');

  const searchform = document.getElementById('search-form');
  const searchbox = document.getElementById('searchbox');

  const otra = document.getElementById('otra');

  const nombre = document.getElementById('nombre');
  const apellido = document.getElementById('apellido');
  const email = document.getElementById('email');
  const password = document.getElementById('password');

  //Formulario para loguearse y verificacios si estan todos los campos 
  form.addEventListener("submit", (e) =>{
    e.preventDefault();

    if (nombre.value !== "" && apellido.value !== "" && email.value !== "" && password.value !== "" && anioNacimiento.value !== "") {
      localStorage.setItem('nombreUsuario', form.children[0].value);
      localStorage.setItem('apellidoUsuario', form.children[1].value);
      localStorage.setItem('emailUsuario', form.children[2].value);
      localStorage.setItem('passwordUsuario', form.children[3].value);
      localStorage.setItem('anioNacimientoUsuario', form.children[4].value);
      nameStorage = form.children[0].value;
      lastNameStorage = form.children[1].value;

      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1200,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Registrado con Éxito'
      })

      setTimeout(() => {
         location.reload();
      }, 1200);

      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algun campo se encuentra vacio.',
        }) 
      }

      checkForm();

  })

  //Checkform crea mensaje de inicio
  const checkForm = () => {
    if (nameStorage && nameStorage !== 'null'){
      const element = document.createElement("div");
      contFormulario.remove();
      element.innerHTML = `<p class="Color">Hola ${nameStorage} ${lastNameStorage} te estabamos esperando</p>`;
      greeting.prepend(element);
      eliminarDatos();
      borrar.remove();
     }else{
       if (checkForm !== null) {
        searchbox.addEventListener("click",()=>{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Debes loguearte primero',
          })
      })
       }

    }
  }

  //funcion eliminarDatos crea un boton que resetea el localStorage
  function eliminarDatos () {
    const otherElement = document.createElement("div");
    otherElement.innerHTML = `
    <div class="logginn">
    <button type="button" class="login" id="resetear">Resetear Datos</button>
    </div>`;
    reset.prepend(otherElement);
    otherElement.addEventListener('click', () =>{
      localStorage.removeItem('nombreUsuario');
      localStorage.removeItem('apellidoUsuario');
      localStorage.removeItem('anioNacimientoUsuario');
      localStorage.removeItem('emailUsuario');
      localStorage.removeItem('passwordUsuario');
      location.reload();
    })
  }

  checkForm();

  //Ventana modal
   open.addEventListener('click', () =>{
    modal_container.classList.add("show");
  })

  close.addEventListener('click', () =>{
    modal_container.classList.remove("show");
  }) 

  //Traigo los elementos id para luego declararles sus respectivos valores
  const card = document.getElementById('card')
  const city = document.getElementById('city');
  const date = document.getElementById('date');
  const tempImg = document.getElementById('temp-img');
  const temp = document.getElementById('temp');
  const weather = document.getElementById('weather');
  const range = document.getElementById('range');
  const rangee = document.getElementById('rangee');
  
  //Funcion coloca imagenes dependiendo de la temp
  function Images(data) {
    const temp = toCelsius(data.main.temp);
    let src = '/images//termometro.png';
    temp > 28 ?  src = 'images/caliente.png' : temp < 20 ? src = 'images/frio.png' : tempImg.src = src;
  }

  //Traigo valores y declaro 
  async function search(query) {
    try {
      const response = await fetch(`${api.url}?q=${query}&appid=${api.key}&lang=es`);
      const data = await response.json();
      card.style.display = 'block';
      city.innerHTML = `${data.name}, ${data.sys.country}`;
      data.innerHTML = (new Date()).toLocaleDateString();
      temp.innerHTML = `${toCelsius(data.main.temp)}°C`;
      weather.innerHTML = data.weather[0].description;
      range.innerHTML = 'Humedad: ' + data.main.humidity + '%';
      rangee.innerHTML = 'Viento: ' + data.wind.speed + 'm/s';
      Images(data);
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingresa otro lugar',
      })
    }
  }

  //Paso los valores de kelvin a centigrados
  function toCelsius(kelvin) {
     return Math.round(kelvin - 273.15);
   } 

  //Funcion de busqueda 
  function onSubmit(event) {
    event.preventDefault();
    search(searchbox.value);
  }
  searchform.addEventListener('submit', onSubmit, true);

  //Fin del proyecto