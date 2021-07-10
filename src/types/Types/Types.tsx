export type AccessLink = {
  name: string;
  url: string;
  role: string[];
};
export type Access = {
  pack: string;
  links: AccessLink[];
};
export type AccessType = {
  url: string;
  descripcion: string;
  openInNewWindow: boolean;
};
export type NotificationsType = {
  numero: number;
  numCuponesActivables: number;
  descripcion: string;
};
export type configAccessType = {
  pojos?: any;
  error: boolean;
  miCuenta: AccessType[];
  notificacionPojo: NotificationsType;
  ventajas: AccessType[];
  footerLinks: AccessType[];
  locale: string;
};

export type ErrorArgsType = {
  key: string;
  arguments: string[];
};

export type BackErrorType = {
  errorCode?: number;
  errorText?: string;
  title?: ErrorArgsType[];
  userMessage?: ErrorArgsType[];
};
export type ErrorType = {
  message?: string;
  status?: string;
};
export type ErrorProviderType = {
  error?: ErrorType;
  errorBack?: BackErrorType;
  addError: (message: string, status: string) => void;
  addErrorBack: (err: BackErrorType) => void;
  removeError: () => void;
};

export type InfoType = {
  message?: string;
};

export type InfoProviderType = {
  infoMsg?: InfoType;
  addInfo: (message: string) => void;
  removeInfo: () => void;
  setInfoCount: any;
  infoCount: number;
};

export type LoadingProviderType = {
  apiLoading: boolean;
  setApiLoading: (val: boolean) => void;
};

export type Ruta = {
  key: string;
  lng: string;
  value: string;
  default: boolean;
};

export type UserData = {
  username: string;
  email?: string;
  locale?: string;
  userrol: string;
};

export type AuthContextType = {
  userLogin: UserData;
  token: string;
};
