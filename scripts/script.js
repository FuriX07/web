// Funciones de la calculadora
function sumar() {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const resultado = num1 + num2;
    document.getElementById('resultado').value = resultado;
    agregarAlHistorial(`${num1} + ${num2}`, resultado);
}

function restar() {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const resultado = num1 - num2;
    document.getElementById('resultado').value = resultado;
    agregarAlHistorial(`${num1} - ${num2}`, resultado);
}

function multiplicar() {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const resultado = num1 * num2;
    document.getElementById('resultado').value = resultado;
    agregarAlHistorial(`${num1} * ${num2}`, resultado);
}

function dividir() {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const resultado = num2 !== 0 ? num1 / num2 : 'Error';
    document.getElementById('resultado').value = resultado;
    agregarAlHistorial(`${num1} / ${num2}`, resultado);
}

function agregarAlHistorial(operacion, resultado) {
    const li = document.createElement('li');
    li.textContent = `${operacion} = ${resultado}`;
    document.getElementById('historial').appendChild(li);
}

// Funciones de la lista de tareas
function agregarTarea() {
    const tarea = document.getElementById('tarea').value;
    if (tarea) {
        const li = document.createElement('li');
        li.textContent = tarea;
        li.onclick = function() {
            this.classList.toggle('completada');
        };
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.onclick = function() {
            this.parentElement.remove();
        };
        li.appendChild(btnEliminar);
        document.getElementById('lista-tareas').appendChild(li);
        document.getElementById('tarea').value = '';
    }
}

// Funciones del conversor de unidades
function convertir() {
    const valor = parseFloat(document.getElementById('valor').value);
    const unidad = document.getElementById('unidad').value;
    let resultado;

    if (unidad === 'metros') {
        resultado = valor / 1000; // Convertir metros a kilómetros
        document.getElementById('resultado-conversor').textContent = `${valor} metros son ${resultado} kilómetros.`;
    } else {
        resultado = valor * 1000; // Convertir kilómetros a metros
        document.getElementById('resultado-conversor').textContent = `${valor} kilómetros son ${resultado} metros.`;
    }
}

// Función para iniciar el temporizador de Pomodoro
function iniciarPomodoro() {
    const duracion = parseInt(document.getElementById('duracion').value);
    let display = document.getElementById('pomodoro-display');
    let tiempoRestante = duracion * 60; // Convertir minutos a segundos

    // Limpiar el display antes de iniciar
    display.textContent = `Tiempo restante: ${duracion} minutos`;

    const interval = setInterval(() => {
        if (tiempoRestante <= 0) {
            clearInterval(interval);
            display.textContent = "¡Tiempo de trabajo terminado! Tómate un descanso.";
            alert("¡Tiempo de trabajo terminado! Tómate un descanso.");
        } else {
            const minutos = Math.floor(tiempoRestante / 60);
            const segundos = tiempoRestante % 60;
            display.textContent = `Tiempo restante: ${minutos} minutos y ${segundos} segundos`;
            tiempoRestante--;
        }
    }, 1000);
}

// Funciones de recordatorios
function agregarRecordatorio() {
    const recordatorio = document.getElementById('recordatorio').value;
    const tiempo = parseInt(document.getElementById('tiempo-recordatorio').value);

    if (recordatorio && tiempo) {
        const li = document.createElement('li');
        li.textContent = `${recordatorio} - Recordatorio en ${tiempo} minutos`;
        document.getElementById('lista-recordatorios').appendChild(li);
        document.getElementById('recordatorio').value = '';
        document.getElementById('tiempo-recordatorio').value = '';

        setTimeout(() => {
            alert(`¡Recordatorio! ${recordatorio}`);
        }, tiempo * 60000); // Convertir minutos a milisegundos
    }
}

// Funciones de integración con API de clima
async function obtenerClima() {
    const ciudad = document.getElementById('ciudad').value;
    const apiKey = '421b28edc58bd48c8b4ce2229e68cb0e'; // Reemplaza con tu API Key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Ciudad no encontrada');
        const data = await response.json();
        const temperatura = data.main.temp;
        const descripcion = data.weather[0].description;
        document.getElementById('resultado-clima').textContent = `Temperatura en ${ciudad}: ${temperatura}°C, ${descripcion}`;
    } catch (error) {
        document.getElementById('resultado-clima').textContent = error.message;
    }
}

// Función para calcular la propina
function calcularPropina() {
    const total = parseFloat(document.getElementById('total').value);
    const porcentaje = parseFloat(document.getElementById('porcentaje').value);

    if (isNaN(total) || isNaN(porcentaje)) {
        document.getElementById('resultado-propina').textContent = "Por favor, ingresa valores válidos.";
        return;
    }

    const propina = (total * porcentaje) / 100;
    const totalConPropina = total + propina;

    document.getElementById('resultado-propina').textContent = `Propina: $${propina.toFixed(2)}, Total con propina: $${totalConPropina.toFixed(2)}`;
}

// Funciones para alternar el modo oscuro
function toggleModoOscuro() {
    const body = document.body;
    const header = document.querySelector('header');
    const links = document.querySelectorAll('nav ul li a');
    const buttons = document.querySelectorAll('button');

    body.classList.toggle('modo-oscuro');
    header.classList.toggle('modo-oscuro');

    links.forEach(link => link.classList.toggle('modo-oscuro'));
    buttons.forEach(button => button.classList.toggle('modo-oscuro'));
}

// Función para guardar la nota
function guardarNota() {
    const titulo = document.getElementById('titulo').value;
    const nota = document.getElementById('nota').value;

    if (titulo && nota) {
        const li = document.createElement('li');
        li.textContent = `${titulo}: ${nota}`;
        document.getElementById('notas-lista').appendChild(li);
        document.getElementById('titulo').value = ''; // Limpiar el campo de título
        document.getElementById('nota').value = ''; // Limpiar el campo de nota
    } else {
        alert("Por favor, completa tanto el título como la nota.");
    }
}

// Inicializar la lista de la compra
let shoppingList = [];

// Función para agregar un artículo a la lista
function addItem(item, quantity) {
    shoppingList.push({ item: item, quantity: quantity });
    displayList();
}

// Función para mostrar la lista de la compra
function displayList() {
    const listDiv = document.getElementById('shoppingList');
    listDiv.innerHTML = ''; // Limpiar la lista actual

    shoppingList.forEach(entry => {
        const li = document.createElement('li');
        li.textContent = `${entry.quantity} x ${entry.item}`;

        // Botón para eliminar el artículo
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.onclick = function() {
            shoppingList = shoppingList.filter(i => i.item !== entry.item); // Eliminar el artículo de la lista
            displayList(); // Actualizar la lista
        };

        li.appendChild(btnEliminar);
        listDiv.appendChild(li);
    });
}

// Función para manejar el envío del formulario
document.getElementById('addButton').addEventListener('click', function() {
    const itemInput = document.getElementById('itemInput');
    const quantityInput = document.getElementById('quantityInput');
    
    const item = itemInput.value;
    const quantity = quantityInput.value;

    if (item.trim() !== '' && quantity > 0) {
        addItem(item, quantity);
        itemInput.value = ''; // Limpiar el campo de entrada
        quantityInput.value = ''; // Limpiar el campo de cantidad
    } else {
        alert("Por favor, ingresa un artículo y una cantidad válida.");
    }
});

// Función para iniciar el temporizador
function iniciarTemporizador() {
    const duracion = parseInt(document.getElementById('duracion').value);
    let display = document.getElementById('temporizador-display');
    let tiempoRestante = duracion * 60; // convertir a segundos

    const intervalo = setInterval(() => {
        const minutos = Math.floor(tiempoRestante / 60);
        const segundos = tiempoRestante % 60;
        display.textContent = `${minutos} minutos y ${segundos} segundos restantes`;

        if (tiempoRestante <= 0) {
            clearInterval(intervalo);
            display.textContent = "¡Tiempo terminado!";
            alert("¡El tiempo ha terminado!");
        }
        tiempoRestante--;
    }, 1000);
}





// Función para enviar el mensaje del usuario
function sendMessage() {
    const inputBox = document.getElementById('input-box');
    const chatWindow = document.getElementById('chat-window');
    const userMessage = inputBox.value;

    if (userMessage.trim() === '') return;

    // Agregar el mensaje del usuario al chat
    const userMessageElement = document.createElement('div');
    userMessageElement.textContent = 'Tú: ' + userMessage;
    chatWindow.appendChild(userMessageElement);

    // Limpiar el input
    inputBox.value = '';

    // Simular respuesta de la IA
    setTimeout(() => {
        const botMessageElement = document.createElement('div');
        botMessageElement.textContent = 'IA: ' + getBotResponse(userMessage);
        chatWindow.appendChild(botMessageElement);
        chatWindow.scrollTop = chatWindow.scrollHeight; // Desplazar hacia abajo
    }, 1000);
}

// Función para obtener una respuesta simulada de la IA
function getBotResponse(userMessage) {
    // Aquí puedes agregar lógica para respuestas más complejas
    // Por ejemplo, puedes integrar una API de IA aquí
    return "No estoy seguro de cómo responder a eso.";
}

// Agregar evento al botón de enviar
document.getElementById('send-button').addEventListener('click', sendMessage);

// Agregar evento al presionar Enter
document.getElementById('input-box').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});






async function getBotResponse(userMessage) {
    const apiKey = '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'; // Reemplaza con tu API Key real
    const url = 'https://api.openai.com/v1/chat/completions';

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo', // O el modelo que estés utilizando
            messages: [{ role: 'user', content: userMessage }]
        })
    });

    if (!response.ok) {
        return "Lo siento, no puedo responder en este momento.";
    }

    const data = await response.json();
    return data.choices[0].message.content;
}


