import { Dimensions } from 'react-native';

export const getOrientation = () => {
    const { width, height } = Dimensions.get('window');
    return width > height ? 'landscape' : 'portrait';
};

export function formatDate(date) {
    const parts = date.split('-');
    if (parts.length !== 3) {
        throw new Error('Formato de fecha no válido');
    }
    const [year, month, day] = parts;
    return `${day}/${month}/${year}`;
}

export function validarRUT(rut) {
    // Verificar que el RUT tenga un formato válido
    if (!/^0*(\d{1,2}(\.?\d{3})*)\-?([\dkK])$/.test(rut)) {
        return false;
    }

    // Remover puntos y guiones y convertir la K a mayúscula si es necesario
    rut = rut.replace(/[^\dkK]/g, '').toUpperCase();

    // Obtener el número y el dígito verificador
    var numero = parseInt(rut.slice(0, -1));
    var dv = rut.slice(-1);

    // Verificar las condiciones de las dos primeras posiciones
    var dosPrimerasPosiciones = parseInt(rut.substr(0, 2));
    if (dosPrimerasPosiciones < 1 || dosPrimerasPosiciones > 21) {
        return false;
    }

    // Verificar que las posiciones 3 a 8 no sean todas cero
    var posicionesTresAOcho = parseInt(rut.substr(2, 6));
    if (posicionesTresAOcho === 0) {
        return false;
    }

    // Verificar que las posiciones 9 y 10 sean cero
    var posicionesNueveYDiez = parseInt(rut.substr(8, 2));
    if (posicionesNueveYDiez !== 0) {
        return false;
    }

    // Definir los factores de multiplicación
    var factores = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4];

    // Calcular la suma de productos
    var suma = 0;
    for (var i = 10; numero > 0; i--) {
        suma += (numero % 10) * factores[i - 1];
        numero = Math.floor(numero / 10);
    }

    // Calcular el probable dígito verificador
    var probableDigitoVerificador = 11 - (suma % 11);

    // Verificar el dígito verificador
    if (probableDigitoVerificador === 10 && dv !== 'K') {
        return false;
    } else if (probableDigitoVerificador === 11 && dv !== '0') {
        return false;
    } else if (probableDigitoVerificador !== parseInt(dv)) {
        return false;
    }

    return true;
}

export function validarCedula(ci) {
    ci = ci.padStart(7, '0'); // Asegurarse de tener 7 dígitos
    // sacar guion
    var suma = 0;
    var coeficientes = [2, 9, 8, 7, 6, 3, 4];
    for (var i = 0; i < 7; i++) {
      suma += parseInt(ci[i]) * coeficientes[i];
    }
    var digitoVerificador = Math.ceil(suma / 10) * 10 - suma;
    // console.log(digitoVerificador);
    return digitoVerificador === parseInt(ci[ci.length - 1]);
}

export function convertImageToBase64(url) {
    return resizeImage(url, 125, 125);
}

function resizeImage(url, width, height) {
    return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.onload = function() {
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL());
        };
        img.src = url;
    });
}