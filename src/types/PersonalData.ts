export interface PersonalData {
  nombreCompleto: string;
  fechaNacimiento: string;
  idDocumento: string;
  tipoDocumento: string;
  genero: string;
  prefijoTelefono: string;
  telefono: string;
  prefijoTelefonoSecundario: string;
  telefonoSecundario: string;
  emailContacto: string;
  idiomaComunicacion: string;
  nombre: string;
  apellido1: string;
  apellido2: string;
  carne: string;
  familianumerosa: string;
  fechaCaducidad: string;
}

export interface AccessData {
  emailAcceso: string;
  esVerificacionDosPasos: boolean;
}

export interface Subscripciones {
  infoCorreo: boolean;
  infoEmail: boolean;
  infoTelefono: boolean;
  infoSms: boolean;
}

export interface DirectionData {
  tipoDireccion: number;
  idDireccion: string;
  roadType: string;
  roadTypeDesc: string;
  roadName: string;
  idCalle: number;
  number: string;
  portal: string;
  stairs: string;
  floor: string;
  door: string;
  postalCode: string;
  locality: string;
  directionName: string;
  reception: string;
  flgZonaCoop: boolean;
  flgDireccionHabitual: number;
  listaTipoVias: string[];
  listaMunicipios: string[];
  onlyPostalCode: boolean;
  idFacturacion: number;
  telefono: string;
  telefono1: string;
  telefono2: string;
  cif: string;
  cifFacturacion: string;
  razonSocial: string;
  idPrefTelefono1: number;
  idPrefTelefono2: number;
  glPlaceId: string;
  glPlaceLongitud: string;
  glPlaceLatitud: string;
  glPlaceType: string;
}

export interface PrefijoPais {
  id: number;
  pais: string;
  prefijo: string;
  expresionRegularMovil: string;
  expresionRegularFijo: string;
  tamanioTelefono: number;
}
