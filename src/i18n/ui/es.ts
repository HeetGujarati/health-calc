import type { Messages } from '../../lib/i18n';

/**
 * Spanish UI catalog.
 *
 * Typed as `Messages`, so the compiler rejects this file the moment a key is
 * missing, misspelled or removed from English. Placeholder names are part of
 * the contract and must survive translation unchanged.
 */
export const es: Messages = {
  'nav.main': 'Principal',
  'nav.calculators': 'Calculadoras',
  'nav.charts': 'Tablas',
  'nav.guides': 'Guías',
  'nav.skipToContent': 'Saltar al contenido',
  'nav.breadcrumb': 'Ruta de navegación',
  'nav.home': 'Inicio',
  'nav.useDarkTheme': 'Usar tema oscuro',
  'nav.useLightTheme': 'Usar tema claro',
  'nav.language': 'Idioma',
  'nav.chooseLanguage': 'Elegir idioma',

  'footer.calculators': 'Calculadoras',
  'footer.about': 'Información',
  'footer.legal': 'Legal',
  'footer.allCalculators': 'Todas las calculadoras',
  'footer.referenceCharts': 'Tablas de referencia',
  'footer.guides': 'Guías',
  'footer.caloriesByActivity': 'Calorías por actividad',
  'footer.oneRepMaxByLift': 'Una repetición máxima por ejercicio',
  'footer.paceByDistance': 'Ritmo por distancia',
  'footer.search': 'Buscar',
  'footer.aboutLink': 'Acerca de',
  'footer.editorialPolicy': 'Política editorial',
  'footer.accessibility': 'Accesibilidad',
  'footer.contact': 'Contacto',
  'footer.privacy': 'Privacidad',
  'footer.terms': 'Términos',
  'footer.cookies': 'Cookies',
  'footer.disclaimer':
    '{site} ofrece estimaciones basadas en ecuaciones publicadas de nivel poblacional. Las necesidades individuales varían y esto no es consejo médico. Si te preocupa tu alimentación, tu peso o tu imagen corporal, un médico o un profesional cualificado es el lugar adecuado para plantearlo.',
  'footer.copyright':
    '© {year} {site}. Las fórmulas están citadas en cada página; consulta la política editorial.',
  'footer.copyrightLink': 'política editorial',

  'translation.notice':
    'Esta página se tradujo del original en inglés. Las ecuaciones, las fuentes y los números son idénticos; si alguna frase se lee mal, la página en inglés es la versión de referencia.',
  'translation.viewEnglish': 'Ver el original en inglés',

  'home.title': 'Calculadoras de salud y forma física',
  'home.description':
    'Calculadoras gratuitas de salud y forma física basadas en ecuaciones publicadas, cada una con su fuente citada para que puedas comprobarla y ver cómo se obtuvo el número.',
  'home.intro':
    'Cada calculadora usa una ecuación publicada, nombra su fuente y muestra qué da por supuesto esa ecuación. Sistema métrico e imperial, sin registro.',

  'category.body-composition': 'Composición corporal',
  'category.energy': 'Energía e ingesta',
  'category.training': 'Entrenamiento',
  'category.weight-reference': 'Referencia de peso',

  'hub.calculators.title': 'Todas las calculadoras',
  'hub.calculators.description':
    'Todas las calculadoras del sitio, agrupadas por categoría. Cada una usa una ecuación publicada, nombra su fuente y funciona en sistema métrico o imperial.',
  'hub.calculators.intro':
    '{count} calculadoras, cada una construida sobre una ecuación publicada con su fuente citada en la página. Sistema métrico e imperial en todas ellas.',

  'hub.guides.title': 'Guías',
  'hub.guides.description':
    'Explicaciones de las ecuaciones que hay detrás de las calculadoras: de dónde salieron, qué dan por supuesto, dónde fallan y cuánta confianza merecen los números.',
  'hub.guides.intro':
    '{count} explicaciones de lo que hay detrás de las calculadoras: de dónde salió cada ecuación, qué da por supuesto y cuánta confianza merece su resultado.',
  'hub.guides.readingTime': '{count} minutos de lectura',

  'hub.charts.title': 'Tablas de referencia',
  'hub.charts.description':
    'Tablas de referencia imprimibles de IMC, peso saludable, grasa corporal, valores MET, porcentajes de entrenamiento, zonas de frecuencia cardíaca, proteína, ritmo y más.',
  'hub.charts.intro':
    '{count} tablas de referencia, cada una calculada con las mismas ecuaciones que la calculadora a la que pertenece, de modo que nunca puedan contradecirse. Cada tabla contiene datos reales con una explicación de cómo leerla, y funciona con JavaScript desactivado.',

  'hub.activities.title': 'Calorías quemadas por actividad',
  'hub.activities.description':
    'Energía utilizada en {count} actividades, cada una con su valor MET publicado y su código del Compendium, calculada para tu peso corporal y tu duración.',
  'hub.activities.intro':
    '{count} actividades, cada una con el valor MET y el código de cinco dígitos del Compendium of Physical Activities para adultos de 2024. Todos los valores se tomaron de la fuente publicada y no de otra calculadora.',
  'hub.activities.tableCaption': 'Actividades de {category} y sus valores MET',
  'hub.activities.columnActivity': 'Actividad',
  'hub.activities.columnMet': 'MET',
  'hub.activities.columnCode': 'Código',
  'hub.activities.source':
    'Fuente: Herrmann SD, Willis EA, Ainsworth BE, et al. «2024 Adult Compendium of Physical Activities». Journal of Sport and Health Science 13(1), 2024, pp. 6–12. Los valores MET son medias poblacionales; alrededor del 18 % de las entradas del Compendium están estimadas y no medidas.',

  'hub.lifts.title': 'Una repetición máxima por ejercicio',
  'hub.lifts.description':
    'Estimaciones de una repetición máxima para {count} ejercicios, cada uno con una nota honesta sobre cómo se comportan las cinco ecuaciones en ese movimiento concreto.',
  'hub.lifts.intro':
    'Las cinco ecuaciones de 1RM se derivaron en gran medida de datos de press de banca y sentadilla, y no se transfieren igual de bien a todos los movimientos. Cada página indica cómo se comportan en ese ejercicio.',

  'hub.distances.title': 'Tablas de ritmo por distancia de carrera',
  'hub.distances.description':
    'Tablas de ritmo y de parciales para {count} distancias de carrera, de 100 metros a 50 km, con conversiones entre ritmo, velocidad y tiempo final.',
  'hub.distances.intro':
    '{count} distancias, cada una con una tabla de ritmo completa, una tabla de parciales y una nota sobre qué limita el rendimiento en ella. Las distancias de maratón y media maratón son las fijadas por World Athletics.',

  'calc.enterDetails': 'Introduce tus datos',
  'calc.result': 'Resultado',
  'calc.calculate': 'Calcular',
  'calc.noscript':
    'Los resultados en directo necesitan JavaScript. La tabla de referencia que hay más abajo está calculada de antemano y funciona sin él.',
  'calc.howItWorks': 'Cómo se calcula',
  'calc.default': 'por defecto',
  'calc.source': 'Fuente',
  'calc.assumes': 'Supone',
  'calc.accuracy': 'Precisión',
  'calc.whichFormula': 'Qué fórmula deberías usar',
  'calc.defaultsTo': 'Esta página usa por defecto {formula}. {accuracy}',
  'calc.questions': 'Preguntas',
  'calc.related': 'Relacionado',
  'calc.relatedCalculators': 'Calculadoras',
  'calc.relatedGuides': 'Guías',
  'calc.lastReviewed': 'Última revisión: {date}. Categoría: {category}.',
  'calc.units': 'Unidades',
  'calc.metric': 'Métrico',
  'calc.imperial': 'Imperial',

  'guide.relatedCalculators': 'Calculadoras',
  'guide.relatedGuides': 'Guías relacionadas',
  'guide.meta': '{date} · {count} minutos de lectura',

  'search.title': 'Buscar',
  'search.description': 'Busca entre las calculadoras, las guías y las páginas de referencia.',
  'search.label': 'Buscar calculadoras y guías',
  'search.submit': 'Buscar',
  'search.browse': 'O explora todo el contenido',
  'search.allGuides': 'Todas las guías',
  'search.noResults': 'Sin coincidencias para «{query}».',
  'search.resultCount': '{count} resultados para «{query}».',
  'search.resultCountOne': '1 resultado para «{query}».',
  'search.prompt': 'Escribe para buscar.',

  'notFound.title': 'Página no encontrada',
  'notFound.description': 'Esa página no existe. Abajo tienes todas las calculadoras del sitio.',
  'notFound.label': 'Error 404',
  'notFound.heading': 'Esa página no existe',
  'notFound.intro':
    'Puede que la dirección esté mal escrita o que la página se haya movido. Abajo está todo lo que tiene el sitio.',
  'notFound.allCalculators': 'Todas las calculadoras',
  'notFound.search': 'Buscar',
  'notFound.guides': 'Guías',
  'notFound.charts': 'Tablas',
  'notFound.reportBrokenLink': 'Informar de un enlace roto',

  'disclaimer.heading': 'Lo que esto no es',
  'disclaimer.body':
    'Son estimaciones de ecuaciones de nivel poblacional, no una medición tuya ni consejo médico. Los resultados individuales varían mucho. Habla con un médico o un dietista-nutricionista antes de hacer cambios importantes en cómo comes o entrenas.',

  'chart.howToRead': 'Cómo leer esta tabla',
  'chart.relatedCalculator': 'Calculadora',
  'chart.source': 'Fuente',

  'activity.metValue': 'Valor MET',
  'activity.compendiumCode': 'Código del Compendium',
  'activity.referenceTable': 'Calorías quemadas según peso corporal y duración',
  'activity.compare': 'Comparación con actividades relacionadas',
  'activity.columnWeight': 'Peso corporal',

  'lift.percentageTable': 'Porcentajes de entrenamiento',
  'lift.repMaxTable': 'Conversiones de repeticiones máximas',
  'lift.notes': 'Notas sobre este ejercicio',

  'distance.paceChart': 'Tabla de ritmo',
  'distance.splits': 'Tiempos parciales',
  'distance.notes': 'Notas sobre esta distancia',

  'consent.heading': 'Cookies',
  'consent.body':
    'Este sitio no usa cookies de publicidad ni de analítica. Si eso cambiara alguna vez, este aviso lo preguntaría antes.',
  'consent.accept': 'Aceptar',
  'consent.reject': 'Rechazar',

  'about.title': 'Acerca de',
  'about.description':
    'Qué es este sitio, cómo se construyen las calculadoras y qué pueden y no pueden decirte los números.',
  'about.p1':
    'Este sitio existe porque la mayoría de las calculadoras de fitness no dicen de dónde salen sus números. Introduces tu altura y tu peso, aparece una cifra y no hay forma de saber qué ecuación la produjo, de qué población se derivó ni cuánto puede equivocarse con alguien como tú.',
  'about.p2':
    'Cada calculadora de aquí nombra la ecuación que usa, cita el artículo del que procede, indica qué da por supuesto sobre la persona a la que se aplica y dice qué precisión tiene frente a las alternativas. Cuando varias ecuaciones publicadas discrepan —y en grasa corporal y metabolismo basal discrepan bastante—, la página muestra esa discrepancia en lugar de esconderla detrás de un solo número.',
  'about.p3':
    'Los cálculos se ejecutan en tu navegador. Nada de lo que escribes se envía a ninguna parte, se guarda en un servidor ni se registra. No hay cuenta, ni captura de correo, ni scripts de seguimiento.',
  'about.h2Limits': 'Lo que estos números no son',
  'about.p4':
    'Todas las ecuaciones de aquí se obtuvieron ajustando una curva a mediciones de un grupo concreto de personas. Ese ajuste es bueno de media y puede ser malo para cualquier individuo concreto: una ecuación con un error estándar de 4 puntos porcentuales falla por más que eso en una minoría considerable de personas. Las ecuaciones de composición corporal en particular se derivaron sobre todo de muestras pequeñas, jóvenes y mayoritariamente blancas, y se transfieren de forma imperfecta a todos los demás.',
  'about.p5':
    'Nada de esto es consejo médico, ni un diagnóstico, ni sustituye una conversación con un profesional clínico que pueda medirte de verdad.',

  'contact.title': 'Contacto',
  'contact.description':
    'Cómo informar de un error en una fórmula, un enlace roto o un problema de accesibilidad.',
  'contact.p1':
    'Si una fórmula está mal, una cita no coincide con su fuente, un enlace está roto o algo del sitio resulta inutilizable con teclado o lector de pantalla, dilo. Las correcciones a las ecuaciones son lo más valioso que se puede enviar.',
  'contact.emailLabel': 'Correo electrónico',
  'contact.p2':
    'Incluye la dirección de la página y, para una corrección de fórmula, la fuente publicada con la que trabajas. Eso hace que la corrección sea verificable y no una cuestión de opinión.',
  'contact.h2Response': 'Qué esperar',
  'contact.p3':
    'Este es un sitio pequeño gestionado por una sola persona. Las correcciones de fórmulas y los problemas de accesibilidad tienen prioridad sobre todo lo demás.',

  'a11y.title': 'Accesibilidad',
  'a11y.description':
    'El estándar de accesibilidad al que aspira este sitio, cómo se ha comprobado y cómo informar de un problema.',
  'a11y.p1':
    'Este sitio apunta al nivel AA de las WCAG 2.2. Eso es un compromiso sobre cómo está construido, no una certificación emitida por nadie.',
  'a11y.h2What': 'Qué significa eso en la práctica',
  'a11y.li1':
    'Cada página funciona solo con teclado, en un orden lógico y con un indicador de foco visible.',
  'a11y.li2':
    'Cada control de formulario tiene una etiqueta real, no un texto de marcador de posición haciendo de etiqueta.',
  'a11y.li3':
    'Los resultados de las calculadoras se anuncian con cortesía al lector de pantalla según cambian, sin apartar el foco del campo en el que estás escribiendo.',
  'a11y.li4':
    'El contraste del texto es de al menos 4,5:1, y el de los bordes de interfaz de al menos 3:1, en ambos temas.',
  'a11y.li5': 'Los objetivos táctiles miden al menos 44 por 44 píxeles.',
  'a11y.li6': 'La animación se suprime cuando el sistema pide movimiento reducido.',
  'a11y.li7':
    'Cada tabla de referencia se renderiza como HTML real con celdas de encabezado adecuadas, no como una imagen.',
  'a11y.h2Testing': 'Cómo se ha comprobado',
  'a11y.p2':
    'En cada compilación se ejecutan comprobaciones automáticas: validación de HTML con reglas específicas de las WCAG y una auditoría de accesibilidad de Lighthouse que hace fallar la compilación por debajo de 95. Las relaciones de contraste se recalculan a partir de los tokens de diseño mediante una prueba unitaria, de modo que un cambio de color que rompa el contraste falla en lugar de publicarse. El manejo con teclado de las calculadoras está cubierto por pruebas de extremo a extremo.',
  'a11y.p3':
    'Las pruebas automáticas detectan una minoría de los problemas de accesibilidad. Si encuentras algo que estas comprobaciones no vieron, comunícalo.',
  'a11y.h2Known': 'Limitaciones conocidas',
  'a11y.p4':
    'Las tres tipografías alojadas en el propio sitio solo cubren la escritura latina. Las páginas en hindi, japonés y árabe recurren a la pila de fuentes del sistema para esas escrituras, lo que se muestra correctamente pero no coincide tipográficamente con las páginas latinas.',

  'editorial.title': 'Política editorial',
  'editorial.description':
    'Cómo se eligen las fórmulas, cómo se citan las fuentes, qué se rechaza y con qué frecuencia se revisan las páginas.',
  'editorial.h2Selection': 'Cómo se eligen las fórmulas',
  'editorial.p1':
    'Una calculadora se publica solo si su ecuación está publicada, es atribuible y se puede comprobar. Eso significa un artículo con nombre, una normativa con nombre o un estándar institucional con nombre: no otra web, no una aplicación de fitness y no una ecuación que circula sin origen.',
  'editorial.p2':
    'Cuando existen varias ecuaciones para la misma magnitud, la página implementa más de una y muestra en qué discrepan. La predeterminada es la que tiene la validación mejor documentada en la población adulta general, y la página explica por qué lo es.',
  'editorial.h2Citation': 'Cómo se citan las fuentes',
  'editorial.p3':
    'Cada fórmula del sitio lleva su cita completa en la página que la usa: autores, título, revista y año. La cita es la publicación original, no una fuente secundaria que la reprodujo. Cuando un valor procede de una tabla de referencia y no de una ecuación —los valores MET, por ejemplo—, se da el código concreto y la edición para poder consultar la entrada.',
  'editorial.h2Refused': 'Lo que este sitio no hará',
  'editorial.li1':
    'No recomendará una ingesta inferior a 1.500 kcal en hombres o 1.200 kcal en mujeres, ni un déficit mayor que el 25 % del mantenimiento o 1.000 kcal diarias, lo que sea menor.',
  'editorial.li2':
    'No producirá un plan hacia un peso objetivo con un IMC inferior a 18,5, y explica por qué en lugar de negarse en silencio.',
  'editorial.li3': 'No devolverá objetivos de calorías ni de grasa corporal a menores de 18 años.',
  'editorial.li4':
    'No describirá un cuerpo como bueno, malo, ideal o necesitado de arreglo. Las categorías se nombran como las nombra el estándar publicado y nada más.',
  'editorial.li5':
    'No inventará un autor, un revisor médico, una valoración ni un número de reseñas. Nada de este sitio se atribuye a una persona que no lo escribió.',
  'editorial.h2Review': 'Frecuencia de revisión',
  'editorial.p4':
    'Cada página lleva la fecha real de su última revisión de contenido. Esa fecha cambia cuando cambia el contenido y no en otro caso: una página cuya fecha de revisión se mueve en cada compilación no te está diciendo nada. Las páginas de fórmulas se vuelven a contrastar con sus fuentes cuando una fuente se revisa; el estándar de composición corporal del Ejército de EE. UU., por ejemplo, cambió en 2026 y la página cambió con él.',
  'editorial.h2Corrections': 'Correcciones',
  'editorial.p5':
    'Si una fórmula de aquí no coincide con la fuente citada, eso es un error y se corregirá. Comunícalo por la página de contacto indicando la fuente con la que trabajas.',

  'privacy.title': 'Privacidad',
  'privacy.description':
    'Qué recopila este sitio, que es casi nada, y cuáles son tus derechos según el RGPD y la CCPA.',
  'privacy.lastUpdated': 'Última actualización: {date}.',
  'privacy.p1':
    'Todos los cálculos de este sitio se ejecutan en tu navegador. La altura, el peso, la edad y las demás cifras que introduces nunca se transmiten, nunca se guardan en un servidor y nunca se registran. Al cerrar la pestaña se descartan.',
  'privacy.h2Collect': 'Qué se recopila',
  'privacy.p2':
    'Sin analítica, sin publicidad, sin píxeles de seguimiento y sin scripts de terceros de ningún tipo. El sitio no hace peticiones de red a ningún dominio que no sea el que lo sirve.',
  'privacy.p3':
    'Dos cosas se guardan localmente en tu navegador mediante localStorage y nunca salen de tu dispositivo: tu preferencia de tema claro u oscuro y tu preferencia de unidades métricas o imperiales. Puedes borrar ambas desde la configuración del navegador.',
  'privacy.h2Server': 'Registros del servidor',
  'privacy.p4':
    'El proveedor de alojamiento estático registra peticiones estándar —dirección IP, marca de tiempo, ruta solicitada, agente de usuario—, como hace cualquier servidor web. Esos son registros del proveedor, conservados según su política, y este sitio ni los lee ni los procesa.',
  'privacy.h2Future': 'Si se añade publicidad',
  'privacy.p5':
    'La publicidad no está activada. Si se añadiera en el futuro, un aviso de consentimiento preguntaría antes de instalar cualquier cookie publicitaria, esta página se actualizaría primero y el cambio quedaría fechado aquí.',
  'privacy.h2Rights': 'Tus derechos',
  'privacy.p6':
    'Según el RGPD y la CCPA tienes derechos de acceso, rectificación, supresión, portabilidad y oposición sobre los datos personales que un sitio tenga sobre ti. Este sitio no tiene ninguno, así que no hay nada a lo que acceder ni que borrar; pero si crees lo contrario, escribe a la dirección de contacto y se investigará.',
  'privacy.h2Children': 'Privacidad de los menores',
  'privacy.p7':
    'Este sitio no está dirigido a menores de 13 años y no recopila nada de nadie. Las calculadoras que producen objetivos de calorías o de grasa corporal se niegan a hacerlo para menores de 18 años.',
  'privacy.h2Changes': 'Cambios',
  'privacy.p8':
    'Los cambios sustanciales en esta política se reflejarán en la fecha de arriba y se describirán en el registro de cambios.',
  'privacy.ownerNotice':
    'MARCADOR DEL PROPIETARIO: antes del lanzamiento, añade el nombre de la entidad legal, la dirección postal y el contacto de protección de datos que exige el artículo 13 del RGPD. Consulta la lista de comprobación de DEPLOY.md.',

  'terms.title': 'Términos',
  'terms.description':
    'Los términos con los que se ofrece este sitio, incluidos los límites de para qué pueden usarse sus estimaciones.',
  'terms.h2Use': 'Uso del sitio',
  'terms.p1':
    'Este sitio es de uso gratuito. Puedes usar los números que produce para tus propios fines. No puedes extraerlo automáticamente a un ritmo que lo degrade para los demás, ni republicar su contenido en bloque como si fuera tuyo.',
  'terms.h2NotAdvice': 'No es consejo médico',
  'terms.p2':
    'Todo lo que hay aquí es una estimación producida por una ecuación publicada aplicada a los números que has facilitado. No es consejo médico, ni un diagnóstico, ni un plan de tratamiento, ni un sustituto de un profesional cualificado que pueda examinarte. No lo uses para tomar una decisión médica.',
  'terms.p3':
    'Si tienes o sospechas un trastorno de la conducta alimentaria, o estás embarazada, en periodo de lactancia, eres menor de 18 años o gestionas una enfermedad, los números de aquí no se aplican a tu situación y sí lo hace la orientación de un profesional clínico.',
  'terms.h2Accuracy': 'Exactitud',
  'terms.p4':
    'Las ecuaciones están implementadas con fidelidad y comprobadas frente a ejemplos resueltos de sus publicaciones de origen. Las ecuaciones en sí son medias poblacionales con márgenes de error reales, indicados en cada página. Una ecuación implementada correctamente puede seguir equivocándose bastante contigo.',
  'terms.h2Liability': 'Responsabilidad',
  'terms.p5':
    'El sitio se ofrece tal cual, sin garantía de ningún tipo. En la medida máxima que permita la ley, no se acepta responsabilidad alguna por pérdidas o daños derivados del uso del sitio o de la confianza en sus resultados.',
  'terms.h2Ip': 'Contenido',
  'terms.p6':
    'El texto, la maquetación y el código de este sitio pertenecen a quien lo opera. Las ecuaciones no: pertenecen a la literatura publicada y se citan en consecuencia. Los valores de referencia reproducidos de fuentes publicadas siguen siendo propiedad de sus editores y se usan aquí con atribución.',
  'terms.h2Law': 'Legislación aplicable',
  'terms.ownerNotice':
    'MARCADOR DEL PROPIETARIO: antes del lanzamiento, indica la entidad legal y la jurisdicción aplicable a estos términos. Consulta la lista de comprobación de DEPLOY.md.',

  'cookies.title': 'Cookies',
  'cookies.description':
    'Qué cookies instala este sitio, que son ninguna, y qué cambiaría si se activara la publicidad.',
  'cookies.p1': 'Este sitio no instala ninguna cookie.',
  'cookies.h2Storage': 'Qué se guarda en su lugar',
  'cookies.p2':
    'Dos preferencias se conservan en localStorage, que no es una cookie y nunca se transmite a ningún servidor:',
  'cookies.li1':
    'Tu preferencia de tema claro u oscuro, para que la página no muestre un destello con el tema equivocado.',
  'cookies.li2':
    'Tu preferencia de unidades métricas o imperiales, para que no tengas que restablecerla en cada página.',
  'cookies.p3':
    'Ambas se pueden eliminar desde la configuración de datos de sitio de tu navegador. Eliminarlas no te cuesta más que la preferencia.',
  'cookies.h2Third': 'Cookies de terceros',
  'cookies.p4':
    'No hay ninguna, porque no hay scripts, incrustaciones, tipografías ni imágenes de terceros. Todos los recursos que carga el sitio provienen de su propio dominio.',
  'cookies.h2Ads': 'Si se activa la publicidad',
  'cookies.p5':
    'La publicidad no está activada. El código para mostrarla existe y reserva su espacio en la maquetación, pero no muestra nada. Si se activara, los socios publicitarios instalarían sus propias cookies, un aviso de consentimiento preguntaría antes de instalar ninguna y esta página las enumeraría antes de que eso ocurriera.',
};
