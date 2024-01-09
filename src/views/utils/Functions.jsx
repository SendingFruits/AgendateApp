import { Dimensions } from 'react-native';
import * as FileSystem from "expo-file-system";



export const getOrientation = () => {
    const { width, height } = Dimensions.get('window');
    var ori =  width > height ? 'landscape' : 'portrait';
    // console.log('ori: ', ori);
    return ori;
};

export const showConfirmationAlert = () => {
    return new Promise((resolve) => {
        Alert.alert(
            'Confirmación',
            '¿Estás seguro de continuar?', [
                {
                    text: 'Cancelar',
                    onPress: () => resolve(false),
                    style: 'cancel',
                },
                {
                    text: 'Aceptar',
                    onPress: () => resolve(true),
                },
            ], { cancelable: false }
        );
    });
};

export const getBase64FromUri = async (uri) => {
    const fileContent = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
    return fileContent;
}

export const loadImageFromBase64 = (base64) => {
    if (base64 !== '') {
        return `data:image/png;base64,${base64}`;
    } else {
        return '';
    }
};


export function formatDate(date) {
    if (date !== undefined && date !== '') {
        const parts = date.split('-');
        if (parts.length !== 3) {
            throw new Error('Formato de fecha no válido');
        }
        const [year, month, day] = parts;
        return `${day}/${month}/${year}`;
    } else {
        return '';
    }
}

export function convertHour(valor, opcion) {
    if (opcion === "toHours") {
        // Conversión de decimal a horas
        if (valor < 0 || valor >= 24) {
            return "Número fuera de rango";
        }

        var horas = Math.floor(valor);
        var minutos = Math.round((valor - horas) * 60);

        var horasFormateadas = (horas < 10 ? "0" : "") + horas;
        var minutosFormateados = (minutos < 10 ? "0" : "") + minutos;

        return horasFormateadas + ":" + minutosFormateados;
    } else if (opcion === "toDecimal") {
        // Conversión de horas a decimal
        var partes = valor.split(":");
        if (partes.length !== 2 || isNaN(partes[0]) || isNaN(partes[1])) {
            return "Formato de hora no válido";
        }

        var horas = parseInt(partes[0], 10);
        var minutos = parseInt(partes[1], 10);

        if (horas < 0 || horas >= 24 || minutos < 0 || minutos >= 60) {
            return "Número fuera de rango";
        }

        return horas + minutos / 60;
    } else {
        return "Opción no válida";
    }
}

export function createDateTimeFromDecimalHour(decimalHour) {
    // Extraer las horas y los minutos del decimal
    const hours = Math.floor(decimalHour);
    const minutes = Math.round((decimalHour - hours) * 60);
    // Obtener la fecha actual
    const currentDate = new Date();
    // Configurar la hora y los minutos en la fecha actual
    currentDate.setHours(hours-24);
    currentDate.setMinutes(minutes);
    currentDate.setSeconds(0);
    currentDate.setMilliseconds(0);
    // Formatear la fecha como una cadena ISO
    const formattedDate = currentDate.toISOString();
    // console.log('formattedDate: ', formattedDate);
    return currentDate;
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

