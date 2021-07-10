import * as Moment from 'moment';

import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

export const isNumber = (value: string) => {
  const isValid = !Number.isNaN(Number(value));
  return isValid;
};

export const updateObject = (oldObject: any, updatedProperties: any) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export function getMinsFromTime(datetime: string) {
  let time = '0';
  let totalMinutos = 0;

  if (datetime === null) return totalMinutos;
  if (datetime.split(' ').length > 1) {
    const dateArray = datetime.split(' ');
    time = dateArray[1].toString();
  } else time = datetime;
  try {
    let timeSplit = time.split(':');
    if (timeSplit.length !== 2) {
      timeSplit = time.split('.');
      if (timeSplit.length !== 2) {
        timeSplit = time.split(',');
        if (timeSplit.length !== 2) return totalMinutos;
      }
    }

    const hToMin = parseInt(timeSplit[0], 10) * 60;
    const min = parseInt(timeSplit[1], 10);
    if (hToMin < 0) {
      totalMinutos = hToMin - min;
    } else totalMinutos = hToMin + min;
  } catch (e) {
    console.log(e);

    return 0;
  }
  return totalMinutos;
}

export function getTimeFromMins(mins: number) {
  const horas = parseInt((mins / 60).toString(), 10);
  const minutos = parseInt(Math.abs(mins % 60).toString(), 10);
  let h = '';
  let m = '';
  h = `${parseInt(horas.toString(), 10)}`;
  if (horas.toString().length < 2) {
    h = `0${horas}`;
  }
  m = `${minutos}`;

  if (minutos.toString().length < 2) {
    m = `0${minutos}`;
  }

  return `${h}:${m}`;
}

export const startTime = (inicio: Date | null) => {
  if (inicio === null) {
    const d = new Date();
    d.setHours(0);
    d.setMinutes(1);
    return d;
  }
  return inicio;
};

export const endTime = (final: Date | null) => {
  if (final === null) {
    const d = new Date();
    d.setHours(23);
    d.setMinutes(59);
    return d;
  }
  return final;
};

export const getYear = (date: Date) => {
  return moment(date).year();
};

export const getYearOfPg = (date: Date) => {
  const mes = moment(date).month();
  const anno = mes === 0 ? moment(date).year() + 1 : moment(date).year();
  return anno;
};

export const endDate = (date: any) => {
  if (date === null) {
    const d = new Date();
    const anno = d.getFullYear() + 1;
    const mes = d.getMonth();
    const dia = d.getDate();

    d.setFullYear(anno, mes, dia);
    return d;
  }
  return date;
};

export const getDateFormat = (value: string, formatoFecha: string) => {
  return moment(value).format(formatoFecha);
};

export const getDateFormatByYearWeekDay = (
  year: number,
  week: number,
  day: number,
  formatoFecha: string,
) => {
  return moment().year(year).week(week).day(day).format(formatoFecha);
};

// Obtener la ultima semana del año
export function getLastWeekYear(year: number) {
  return moment().year(year).month(11).date(31).weeks();
}

export function getWeekYear(date: Date) {
  return moment(date).week();
}

export function dayInYearWeekAndDay(
  year: number,
  week: number,
  day: number,
  hora: string,
) {
  let val = hora.replace('.', ':');
  val = val.replace(',', ':');
  const h = parseInt(val.split(':')[0], 10);
  const m = parseInt(val.split(':')[1], 10);
  return moment()
    .year(year)
    .week(week)
    .day(day)
    .hour(h)
    .minutes(m)
    .format('YYYY-MM-DD HH:mm');
}

export function getDayOfWeekNumber(date: Date) {
  return moment(date).day();
}

export function dayOfWeek(date: Date) {
  const dayNumber = moment(date).day();
  let dayString = '';
  switch (dayNumber) {
    case 0: {
      dayString = 'D';
      break;
    }
    case 1: {
      dayString = 'L';
      break;
    }
    case 2: {
      dayString = 'M';
      break;
    }
    case 3: {
      dayString = 'X';
      break;
    }
    case 4: {
      dayString = 'J';
      break;
    }
    case 5: {
      dayString = 'V';
      break;
    }
    case 6: {
      dayString = 'S';
      break;
    }
    default: {
      dayString = 'D';
      break;
    }
  }
  return dayString;
}

// Metodo que devuelve si es la ultima semana de año natural
export function isLastWeekOfYear(year: number, week: number) {
  const lastWeek = getLastWeekYear(year);
  return lastWeek === week;
}

export function isIgualFecha(date1: Date, date2: Date) {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth()
  );
}

export function getCookie(cname: string) {
  const name = `${cname}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

// Obtiene el valor que concatene  dentro de un arreglo de objetos
export function findConcatWithAttr(array: any, attr: any, value: any) {
  let valorQueConcatene = '';
  let primeroQueCoincida = false; // sino son iguales obtener el primer que coincidio
  let found = false;
  for (let i = 0; !found && i < array.length; i += 1) {
    if (array[i][attr] === value) {
      valorQueConcatene = value;
      found = true;
    } else if (
      !primeroQueCoincida &&
      value !== '' &&
      array[i][attr].includes(value)
    ) {
      valorQueConcatene = array[i][attr];
      primeroQueCoincida = true;
    }
  }
  return valorQueConcatene;
}

// Obtiene el indice dentro de un arreglo de objetos
export function findWithAttr(array: any, attr: any, value: any) {
  for (let i = 0; i < array.length; i += 1) {
    if (array[i][attr] === value) {
      return i;
    }
  }
  return -1;
}
