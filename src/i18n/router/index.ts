// import rutas from './router.json';
import Cookies from 'js-cookie';
import { Ruta } from '../../types/Types/Types';

const LoadRouterByPath = (path: string, lng: string) => {
  let res = '/';
  if (typeof path !== 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
    const route = require('./router.json');
    // console.log('path ----> ', path, lng);

    const rutaActual = route.rutas.filter(
      (r: Ruta) => r.value.toLowerCase() === path.toLowerCase(),
    );
    if (rutaActual.length > 0) {
      // console.log('actual', rutaActual);
      const rutaActualLng = route.rutas.filter(
        (r: Ruta) => r.key === rutaActual[0].key,
      );
      // console.log('actual lng', rutaActualLng);
      const rutaLng = rutaActualLng.filter((r: Ruta) => r.lng === lng);
      // console.log('ruta lng', rutaLng);
      if (rutaLng.length > 0) {
        res = `/${rutaLng[0].lng}/${rutaLng[0].value}`;
      } else {
        const rutaDefault = rutaActualLng.filter(
          (r: Ruta) => r.default === true,
        );
        // console.log(rutaDefault);
        Cookies.set('i18next', rutaDefault[0].lng);
        res = `/${rutaDefault[0].lng}/${rutaDefault[0].value}`;
      }
    } else {
      res = path;
    }
  }
  // console.log(res);
  return res;
};

const getRutas = (componente: string) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
  const route = require('./router.json');
  const r1 = route.rutas.filter((r: Ruta) => r.key === componente);
  const rutas = r1.map((ru: Ruta) => `/${ru.lng}/${ru.value}`);
  return rutas;
};

export default { LoadRouterByPath, getRutas };
