import type { TemplateSet } from './index';

/**
 * Spanish sentence-variation templates.
 *
 * Same arity as English — four variants per slot — and every variant carries a
 * per-page placeholder, so the anti-duplication property holds here too.
 */
export const esTemplates: TemplateSet = {
  activityIntro: [
    'Calcula cuánta energía gasta {activity} según tu peso corporal y el tiempo que le dediques. La cifra procede del equivalente metabólico de la actividad, publicado en el Compendium of Physical Activities.',
    '{Activity} está valorada en {met} MET, es decir, cuesta unas {met} veces más energía por minuto que estar sentado sin moverse. Introduce tu peso y tu duración para convertir eso en kilocalorías.',
    'Esta página convierte el valor MET publicado de {activity} en una cifra de energía para tu peso corporal. Los cuerpos más pesados gastan más en la misma actividad, y por eso el peso es un dato que introduces y no un supuesto.',
    'Energía gastada durante {activity}, calculada a partir de su equivalente metabólico de {met}. La tabla de abajo cubre pesos y duraciones habituales si prefieres no introducir nada.',
  ],
  activityMet: [
    'Un MET es un múltiplo del metabolismo en reposo, definido como un consumo de oxígeno de 3,5 mililitros por kilogramo y minuto. Con {met} MET, {activity} cuesta aproximadamente {met} veces lo que tu cuerpo gasta en reposo.',
    'El Compendium asigna a {activity} un valor de {met} MET. Un MET es lo que cuesta estar sentado tranquilamente, así que esta actividad ronda las {met} veces eso por cada minuto que la practicas.',
    'Los equivalentes metabólicos expresan el coste energético en relación con el reposo. {Activity} se sitúa en {met}, lo que la coloca {comparison} dentro del rango que abarca el Compendium.',
    'Con {met} MET, {activity} queda {comparison} respecto al rango completo de actividades que enumera el Compendium, que va de 1,0 para estar sentado tranquilamente a más de 20 para la competición de élite.',
  ],
  activityAccuracy: [
    'La cifra de {met} MET para {activity} es una media poblacional. El propio Compendium señala que el coste energético individual varía con la forma física, la técnica, el terreno y la composición corporal, así que tómala como un orden de magnitud y no como una medición.',
    'Esta cifra es una estimación construida sobre una media. Dos personas que practican {activity} con la misma intensidad nominal pueden diferir en un veinte por ciento o más, y ninguna ecuación que use solo peso y tiempo puede detectarlo.',
    'La exactitud está limitada por lo que un valor MET puede representar. Es un único número que sustituye a todas las personas que practican {activity}, y el coste real cambia con lo fuerte que trabajes, lo eficiente que seas y las condiciones.',
    'Lee el resultado como aproximado. Las comparaciones publicadas de estimaciones basadas en MET frente a calorimetría indirecta encuentran habitualmente discrepancias individuales del veinte al treinta por ciento, y {activity} no es una excepción.',
  ],
  activityNet: [
    'La cifra de arriba es energía bruta: todo lo gastado durante la sesión, incluido el metabolismo en reposo que habrías usado de todas formas. Restar un MET-hora por hora da lo que {activity} añadió realmente.',
    'Tu cuerpo gasta energía practiques o no {activity}. La cifra neta elimina esa base, y es el número honesto si vas a sumar esto a una estimación de mantenimiento.',
    'La bruta y la neta se diferencian en aproximadamente un MET por hora. Para {activity} con {met} MET, eso significa que alrededor de {netShare} del total es genuinamente atribuible a la actividad.',
    'Si ya elegiste un multiplicador de actividad que da por hecho que entrenas, sumar esta cifra encima cuenta {activity} dos veces. Usa la cifra neta, o pon tu nivel de actividad en sedentario y suma las sesiones aparte.',
  ],
  liftIntro: [
    'Estima tu una repetición máxima en {lift} a partir de una serie que ya hayas hecho. Se muestran las cinco ecuaciones publicadas, porque coinciden con pocas repeticiones y divergen por encima de diez.',
    'Introduce un peso y las repeticiones que lograste en {lift}. Las cinco ecuaciones de abajo se ajustaron a datos distintos y dan respuestas distintas; la dispersión entre ellas te dice cuánto fiarte de la estimación.',
    'Una estimación de una repetición máxima para {lift}, a partir de cualquier serie de entre una y veinte repeticiones. La estimación es más fiable con un triple pesado y menos fiable con una serie al fallo a doce repeticiones.',
    'Calcula un máximo estimado para {lift} sin llegar a probarlo. La tabla de porcentajes de abajo convierte esa estimación en cargas de entrenamiento.',
  ],
  liftAccuracy: [
    'Las cinco ecuaciones se validaron sobre todo con datos de press de banca y sentadilla. {biasNote}',
    'Las estimaciones se trasladan de forma imperfecta entre ejercicios. {biasNote}',
    'Lo bien que funcionen estas ecuaciones depende del ejercicio. {biasNote}',
    'Una advertencia específica de este movimiento: {biasNote}',
  ],
  distanceIntro: [
    'Convierte un tiempo final de {distance} en ritmo por kilómetro y por milla, con parciales y lo que ese mismo ritmo daría en otras distancias.',
    'Ritmo, velocidad y parciales para {distance}. Introduce un tiempo objetivo para ver qué ritmo exige, o un ritmo para ver el tiempo final que produce.',
    'Todo lo relacionado con el ritmo en {distance}: la conversión entre ritmo y tiempo final, una tabla completa de parciales y una nota honesta sobre por qué las proyecciones a otras distancias engañan.',
    'Calcula el ritmo de {distance} a partir de un tiempo final, o un tiempo final a partir de un ritmo. La tabla de abajo cubre el rango en el que compite la mayoría.',
  ],
  distanceDemands: [
    'Qué limita el rendimiento aquí: {demands}',
    'Fisiológicamente, {distance} está acotada por {demandsLower}',
    'La restricción a esta distancia: {demandsLower}',
    '{demands}',
  ],
};
