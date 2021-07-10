/**
 * Devuevle un json con el mismo contenido de vocabularies pero además le adiciona una nueva
 * entrada con el idioma (nombre del archivo) y el contenido del mismo.
 *
 * @param context
 * @param vocabularies
 * @param filename
 */
function addLocale(context, vocabularies, filename) {
  const locale = filename.slice(2, -5);
  const copy = { ...vocabularies };
  copy[locale] = { translation: context(filename) };
  return copy;
}

/**
 * Devuelve un objeto json donde las llaves son el identificador del idioma (es, en, etc), que
 * a su vez son el nombre de los arhivos con extencion .json y los valores son los contenidos
 * de los archivos
 *
 * @param context Objeto contexto
 * @return Devuelve un objeto json con las traducciones
 */
function loadFromContext(context) {
  return context
    .keys()
    .reduce(
      (vocabularies, filename) => addLocale(context, vocabularies, filename),
      {},
    );
}

/**
 * Carga los archivos json que se ubican en el directorio pasado como primer parametro en la función
 * require.context, (No busca en subdirectorios).
 *
 * @return Devuelve un objeto json con las traducciones
 */
function loadLocales() {
  const context = require.context('./locales/', false, /\.json$/);

  return loadFromContext(context);
}

export default { addLocale, loadFromContext, loadLocales };
