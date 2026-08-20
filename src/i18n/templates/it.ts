import type { TemplateSet } from './index';

/** Italian sentence-variation templates. */
export const itTemplates: TemplateSet = {
  activityIntro: [
    "Calcola quanta energia consuma {activity} in base al tuo peso corporeo e a quanto tempo le dedichi. Il valore viene dall'equivalente metabolico dell'attività, pubblicato nel Compendium of Physical Activities.",
    '{Activity} è valutata {met} MET, cioè costa circa {met} volte più energia al minuto rispetto allo stare seduti fermi. Inserisci peso e durata per convertirlo in chilocalorie.',
    'Questa pagina converte il valore MET pubblicato di {activity} in un dato energetico per il tuo peso corporeo. I corpi più pesanti consumano di più a parità di attività, ed è per questo che il peso è un dato da inserire e non un presupposto.',
    'Energia consumata durante {activity}, calcolata dal suo equivalente metabolico di {met}. La tabella qui sotto copre pesi e durate comuni se preferisci non inserire nulla.',
  ],
  activityMet: [
    "Un MET è un multiplo del metabolismo a riposo, definito come un consumo di ossigeno di 3,5 millilitri per chilogrammo al minuto. A {met} MET, {activity} costa all'incirca {met} volte quello che il tuo corpo spende a riposo.",
    'Il Compendium assegna a {activity} un valore di {met} MET. Un MET è quanto costa stare seduti tranquilli, quindi questa attività è circa {met} volte tanto per ogni minuto in cui la pratichi.',
    'Gli equivalenti metabolici esprimono il costo energetico rispetto al riposo. {Activity} si colloca a {met}, il che la mette {comparison} nell’intervallo coperto dal Compendium.',
    'A {met} MET, {activity} risulta {comparison} rispetto all’intera gamma di attività elencate dal Compendium, che va da 1,0 per stare seduti tranquilli a oltre 20 per la competizione di alto livello.',
  ],
  activityAccuracy: [
    'Il valore di {met} MET per {activity} è una media di popolazione. Lo stesso Compendium segnala che il costo energetico individuale varia con la forma fisica, la tecnica, il terreno e la composizione corporea: trattalo come un ordine di grandezza, non come una misurazione.',
    'Questo valore è una stima costruita su una media. Due persone che praticano {activity} alla stessa intensità nominale possono differire del venti per cento o più, e nessuna equazione che usi solo peso e tempo può accorgersene.',
    "L'accuratezza è limitata da ciò che un valore MET può rappresentare. È un numero solo che sta al posto di chiunque pratichi {activity}, e il costo reale cambia con quanto ti impegni, quanto sei efficiente e le condizioni.",
    'Leggi il risultato come approssimativo. I confronti pubblicati tra stime derivate dai MET e calorimetria indiretta trovano comunemente discrepanze individuali dal venti al trenta per cento, e {activity} non fa eccezione.',
  ],
  activityNet: [
    'Il valore qui sopra è energia lorda: tutto ciò che è stato speso durante la sessione, compreso il metabolismo a riposo che avresti comunque consumato. Sottrarre un MET-ora per ora dà ciò che {activity} ha davvero aggiunto.',
    'Il tuo corpo consuma energia che tu pratichi {activity} o no. Il valore netto toglie quella base, ed è il numero onesto se stai sommando questo a una stima di mantenimento.',
    "Lordo e netto differiscono di circa un MET all'ora. Per {activity} a {met} MET, significa che all'incirca {netShare} del totale è genuinamente attribuibile all'attività.",
    'Se hai già scelto un moltiplicatore di attività che presuppone che ti alleni, sommare questo valore sopra conta {activity} due volte. Usa il valore netto, oppure imposta il tuo livello di attività su sedentario e aggiungi le sessioni a parte.',
  ],
  liftIntro: [
    'Stima il tuo massimale nella {lift} a partire da una serie che hai già fatto. Sono mostrate tutte e cinque le equazioni pubblicate, perché concordano a poche ripetizioni e divergono sopra le dieci.',
    'Inserisci un peso e le ripetizioni che hai gestito nella {lift}. Le cinque equazioni qui sotto sono state adattate a dati diversi e danno risposte diverse; la dispersione tra loro dice quanto fidarsi della stima.',
    'Una stima del massimale per la {lift}, da qualsiasi serie tra una e venti ripetizioni. La stima è più affidabile da una tripla pesante e meno affidabile da una serie a cedimento a dodici.',
    'Ricava un massimale stimato per la {lift} senza testarlo. La tabella delle percentuali qui sotto converte quella stima in carichi di allenamento.',
  ],
  liftAccuracy: [
    'Le cinque equazioni sono state validate soprattutto su dati di panca piana e squat. {biasNote}',
    'Le stime si trasferiscono in modo imperfetto tra gli esercizi. {biasNote}',
    "Quanto bene funzionino queste equazioni dipende dall'esercizio. {biasNote}",
    'Un avvertimento specifico di questo movimento: {biasNote}',
  ],
  distanceIntro: [
    'Converti un tempo finale sulla {distance} in passo al chilometro e al miglio, con i parziali e ciò che lo stesso passo darebbe su altre distanze.',
    'Passo, velocità e parziali per la {distance}. Inserisci un tempo obiettivo per vedere quale passo richiede, o un passo per vedere il tempo finale che produce.',
    'Tutto ciò che riguarda il passo sulla {distance}: la conversione tra passo e tempo finale, una tabella completa dei parziali e una nota onesta sul perché le proiezioni verso altre distanze traggano in inganno.',
    'Ricava il passo sulla {distance} da un tempo finale, o un tempo finale da un passo. La tabella qui sotto copre la fascia in cui gareggia la maggior parte dei podisti.',
  ],
  distanceDemands: [
    'Che cosa limita la prestazione qui: {demands}',
    'Fisiologicamente, la {distance} è vincolata da {demandsLower}',
    'Il vincolo a questa distanza: {demandsLower}',
    '{demands}',
  ],
};
