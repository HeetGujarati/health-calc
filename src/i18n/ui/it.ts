import type { Messages } from '../../lib/i18n';

/** Italian UI catalog. */
export const it: Messages = {
  'nav.main': 'Principale',
  'nav.calculators': 'Calcolatori',
  'nav.charts': 'Tabelle',
  'nav.guides': 'Guide',
  'nav.skipToContent': 'Vai al contenuto',
  'nav.breadcrumb': 'Percorso di navigazione',
  'nav.home': 'Home',
  'nav.useDarkTheme': 'Usa il tema scuro',
  'nav.useLightTheme': 'Usa il tema chiaro',
  'nav.language': 'Lingua',
  'nav.chooseLanguage': 'Scegli una lingua',

  'footer.calculators': 'Calcolatori',
  'footer.about': 'Informazioni',
  'footer.legal': 'Note legali',
  'footer.allCalculators': 'Tutti i calcolatori',
  'footer.referenceCharts': 'Tabelle di riferimento',
  'footer.guides': 'Guide',
  'footer.caloriesByActivity': 'Calorie per attività',
  'footer.oneRepMaxByLift': 'Massimale per esercizio',
  'footer.paceByDistance': 'Passo per distanza',
  'footer.search': 'Cerca',
  'footer.aboutLink': 'Chi siamo',
  'footer.editorialPolicy': 'Linea editoriale',
  'footer.accessibility': 'Accessibilità',
  'footer.contact': 'Contatti',
  'footer.privacy': 'Privacy',
  'footer.terms': 'Termini',
  'footer.cookies': 'Cookie',
  'footer.disclaimer':
    "{site} fornisce stime ricavate da equazioni pubblicate su base di popolazione. Il fabbisogno individuale varia e questo non è un consiglio medico. Se hai preoccupazioni riguardo all'alimentazione, al peso o all'immagine corporea, un medico o un professionista qualificato è la sede giusta per parlarne.",
  'footer.copyright':
    '© {year} {site}. Le formule sono citate in ogni pagina; vedi la linea editoriale.',
  'footer.copyrightLink': 'linea editoriale',

  'translation.notice':
    "Questa pagina è stata tradotta dall'originale inglese. Equazioni, fonti e numeri sono identici; se una frase suona male, la pagina in inglese fa fede.",
  'translation.viewEnglish': "Vedi l'originale in inglese",

  'home.title': 'Calcolatori di salute e fitness',
  'home.description':
    'Calcolatori gratuiti di salute e fitness basati su equazioni pubblicate, ciascuna citata perché tu possa verificare la fonte e vedere come è stato ottenuto il numero.',
  'home.intro':
    "Ogni calcolatore qui usa un'equazione pubblicata, ne indica la fonte e mostra che cosa l'equazione dà per scontato. Sistema metrico e imperiale, senza registrazione.",

  'category.body-composition': 'Composizione corporea',
  'category.energy': 'Energia e apporto',
  'category.training': 'Allenamento',
  'category.weight-reference': 'Riferimenti di peso',
  'category.cycle': 'Ciclo mestruale',

  'hub.calculators.title': 'Tutti i calcolatori',
  'hub.calculators.description':
    "Tutti i calcolatori del sito, raggruppati per categoria. Ciascuno usa un'equazione pubblicata, ne indica la fonte e funziona in unità metriche o imperiali.",
  'hub.calculators.intro':
    "{count} calcolatori, ciascuno costruito su un'equazione pubblicata con la fonte citata nella pagina. Metrico e imperiale ovunque.",

  'hub.guides.title': 'Guide',
  'hub.guides.description':
    'Spiegazioni delle equazioni dietro i calcolatori: da dove vengono, che cosa danno per scontato, dove falliscono e quanta fiducia meritano i numeri.',
  'hub.guides.intro':
    '{count} spiegazioni di ciò che sta dietro ai calcolatori: da dove viene ogni equazione, che cosa dà per scontato e quanta fiducia merita il suo risultato.',
  'hub.guides.readingTime': '{count} minuti di lettura',

  'hub.charts.title': 'Tabelle di riferimento',
  'hub.charts.description':
    'Tabelle di riferimento stampabili per BMI, peso salutare, massa grassa, valori MET, percentuali di allenamento, zone di frequenza cardiaca, proteine, passo e altro.',
  'hub.charts.intro':
    '{count} tabelle di riferimento, ciascuna calcolata con le stesse equazioni del calcolatore a cui appartiene — così le due non possono mai contraddirsi. Ogni tabella contiene dati reali con una spiegazione di come leggerla e funziona con JavaScript disattivato.',

  'hub.activities.title': 'Calorie bruciate per attività',
  'hub.activities.description':
    'Energia spesa in {count} attività, ciascuna con il proprio valore MET pubblicato e il codice del Compendium, calcolata per il tuo peso corporeo e la tua durata.',
  'hub.activities.intro':
    '{count} attività, ciascuna con il valore MET e il codice a cinque cifre del Compendium of Physical Activities per adulti del 2024. Ogni valore è stato preso dalla fonte pubblicata e non da un altro calcolatore.',
  'hub.activities.tableCaption': 'Attività di {category} e relativi valori MET',
  'hub.activities.columnActivity': 'Attività',
  'hub.activities.columnMet': 'MET',
  'hub.activities.columnCode': 'Codice',
  'hub.activities.source':
    'Fonte: Herrmann SD, Willis EA, Ainsworth BE, et al. «2024 Adult Compendium of Physical Activities». Journal of Sport and Health Science 13(1), 2024, pp. 6–12. I valori MET sono medie di popolazione; circa il 18% delle voci del Compendium è stimato anziché misurato.',

  'hub.lifts.title': 'Massimale per esercizio',
  'hub.lifts.description':
    'Stime del massimale per {count} esercizi, ciascuno con una nota onesta su come si comportano le cinque equazioni su quel movimento specifico.',
  'hub.lifts.intro':
    "Le cinque equazioni del massimale sono state ricavate in gran parte da dati di panca piana e squat e non si trasferiscono altrettanto bene a ogni movimento. Ogni pagina qui sotto dice come si comportano su quell'esercizio.",

  'hub.distances.title': 'Tabelle del passo per distanza di gara',
  'hub.distances.description':
    'Tabelle del passo e dei parziali per {count} distanze di gara, dai 100 metri ai 50 km, con conversioni tra passo, velocità e tempo finale.',
  'hub.distances.intro':
    '{count} distanze, ciascuna con una tabella del passo completa, una tabella dei parziali e una nota su che cosa limita la prestazione. Le lunghezze di maratona e mezza maratona sono quelle fissate da World Athletics.',

  'calc.enterDetails': 'Inserisci i tuoi dati',
  'calc.result': 'Risultato',
  'calc.calculate': 'Calcola',
  'calc.noscript':
    'I risultati in tempo reale richiedono JavaScript. La tabella di riferimento più in basso è precalcolata e funziona anche senza.',
  'calc.howItWorks': 'Come viene calcolato',
  'calc.default': 'predefinita',
  'calc.source': 'Fonte',
  'calc.assumes': 'Presuppone',
  'calc.accuracy': 'Precisione',
  'calc.whichFormula': 'Quale formula usare',
  'calc.defaultsTo': 'Questa pagina usa come predefinita {formula}. {accuracy}',
  'calc.questions': 'Domande',
  'calc.related': 'Correlati',
  'calc.relatedCalculators': 'Calcolatori',
  'calc.relatedGuides': 'Guide',
  'calc.lastReviewed': 'Ultima revisione: {date}. Categoria: {category}.',
  'calc.units': 'Unità',
  'calc.metric': 'Metrico',
  'calc.imperial': 'Imperiale',

  'guide.relatedCalculators': 'Calcolatori',
  'guide.relatedGuides': 'Guide correlate',
  'guide.meta': '{date} · {count} minuti di lettura',

  'search.title': 'Cerca',
  'search.description': 'Cerca tra i calcolatori, le guide e le pagine di riferimento del sito.',
  'search.label': 'Cerca tra calcolatori e guide',
  'search.submit': 'Cerca',
  'search.browse': 'Oppure sfoglia tutto',
  'search.allGuides': 'Tutte le guide',
  'search.noResults': 'Nessun risultato per «{query}».',
  'search.resultCount': '{count} risultati per «{query}».',
  'search.resultCountOne': '1 risultato per «{query}».',
  'search.prompt': 'Scrivi per cercare.',

  'notFound.title': 'Pagina non trovata',
  'notFound.description': 'Quella pagina non esiste. Qui sotto trovi tutti i calcolatori del sito.',
  'notFound.label': 'Errore 404',
  'notFound.heading': 'Quella pagina non esiste',
  'notFound.intro':
    "L'indirizzo potrebbe contenere un errore di battitura, oppure la pagina è stata spostata. Qui sotto c'è tutto ciò che il sito contiene.",
  'notFound.allCalculators': 'Tutti i calcolatori',
  'notFound.search': 'Cerca',
  'notFound.guides': 'Guide',
  'notFound.charts': 'Tabelle',
  'notFound.reportBrokenLink': 'Segnala un link non funzionante',

  'disclaimer.heading': 'Che cosa non è',
  'disclaimer.body':
    'Sono stime ricavate da equazioni su base di popolazione, non una misurazione di te e non un consiglio medico. I risultati individuali variano molto. Parla con un medico o con un dietista prima di cambiare in modo significativo come mangi o come ti alleni.',

  'chart.howToRead': 'Come leggere questa tabella',
  'chart.relatedCalculator': 'Calcolatore',
  'chart.source': 'Fonte',

  'activity.metValue': 'Valore MET',
  'activity.compendiumCode': 'Codice Compendium',
  'activity.referenceTable': 'Calorie bruciate per peso corporeo e durata',
  'activity.compare': 'Confronto con attività correlate',
  'activity.columnWeight': 'Peso corporeo',

  'lift.percentageTable': 'Percentuali di allenamento',
  'lift.repMaxTable': 'Conversioni dei massimali per ripetizioni',
  'lift.notes': 'Note su questo esercizio',

  'distance.paceChart': 'Tabella del passo',
  'distance.splits': 'Tempi parziali',
  'distance.notes': 'Note su questa distanza',

  'consent.heading': 'Cookie',
  'consent.body':
    'Questo sito non usa cookie pubblicitari né analitici. Se un giorno dovesse cambiare, questo avviso lo chiederebbe prima.',
  'consent.accept': 'Accetta',
  'consent.reject': 'Rifiuta',

  'about.title': 'Chi siamo',
  'about.description':
    "Che cos'è questo sito, come sono costruiti i calcolatori e che cosa i numeri possono e non possono dirti.",
  'about.p1':
    "Questo sito esiste perché la maggior parte dei calcolatori di fitness non dice da dove vengono i suoi numeri. Inserisci altezza e peso, compare una cifra, e non c'è modo di sapere quale equazione l'abbia prodotta, da quale popolazione sia stata ricavata o quanto possa sbagliare con qualcuno come te.",
  'about.p2':
    "Ogni calcolatore qui indica l'equazione che usa, cita l'articolo da cui proviene, dichiara che cosa quell'equazione presuppone della persona a cui viene applicata e dice quanto è accurata rispetto alle alternative. Dove più equazioni pubblicate non concordano — e per massa grassa e metabolismo basale non concordano parecchio — la pagina mostra il disaccordo invece di nasconderlo dietro un numero solo.",
  'about.p3':
    "I calcoli girano nel tuo browser. Nulla di ciò che digiti viene inviato altrove, salvato su un server o registrato. Non c'è account, non c'è raccolta di indirizzi e-mail e non ci sono script di tracciamento.",
  'about.h2Limits': 'Che cosa non sono questi numeri',
  'about.p4':
    "Ogni equazione qui è nata adattando una curva a misurazioni fatte su un gruppo specifico di persone. Quell'adattamento è buono in media e può essere pessimo per un singolo individuo: un'equazione con un errore standard di 4 punti percentuali sbaglia di più per una minoranza consistente di persone. Le equazioni di composizione corporea in particolare sono state ricavate soprattutto da campioni piccoli, giovani e prevalentemente bianchi, e si trasferiscono in modo imperfetto a tutti gli altri.",
  'about.p5':
    'Niente di tutto questo è un consiglio medico, niente è una diagnosi e niente sostituisce una conversazione con un clinico che possa misurarti davvero.',

  'contact.title': 'Contatti',
  'contact.description':
    'Come segnalare un errore in una formula, un link non funzionante o un problema di accessibilità.',
  'contact.p1':
    'Se una formula è sbagliata, se una citazione non corrisponde alla fonte, se un link è rotto o se qualcosa nel sito è inutilizzabile con tastiera o screen reader, per favore dillo. Le correzioni alle equazioni sono la cosa più preziosa che si possa inviare.',
  'contact.emailLabel': 'E-mail',
  'contact.p2':
    "Indica l'indirizzo della pagina e, per una correzione di formula, la fonte pubblicata su cui ti basi. Questo rende la correzione verificabile anziché una questione di opinioni.",
  'contact.h2Response': 'Che cosa aspettarsi',
  'contact.p3':
    'Questo è un sito piccolo gestito da una persona sola. Le correzioni alle formule e i problemi di accessibilità hanno la precedenza su tutto il resto.',

  'a11y.title': 'Accessibilità',
  'a11y.description':
    'Lo standard di accessibilità a cui punta questo sito, come è stato verificato e come segnalare un problema.',
  'a11y.p1':
    'Questo sito punta al livello AA delle WCAG 2.2. È un impegno su come è costruito, non una certificazione rilasciata da qualcuno.',
  'a11y.h2What': 'Che cosa significa in pratica',
  'a11y.li1':
    'Ogni pagina funziona con la sola tastiera, in un ordine logico, con un indicatore di focus visibile.',
  'a11y.li2':
    "Ogni controllo di modulo ha un'etichetta vera, non un testo segnaposto che ne fa le veci.",
  'a11y.li3':
    'I risultati dei calcolatori vengono annunciati con cortesia allo screen reader man mano che cambiano, senza togliere il focus dal campo in cui stai scrivendo.',
  'a11y.li4':
    "Il contrasto del testo è almeno 4,5:1, e quello dei bordi dell'interfaccia almeno 3:1, in entrambi i temi.",
  'a11y.li5': 'Le aree toccabili misurano almeno 44 per 44 pixel.',
  'a11y.li6': "L'animazione viene soppressa quando il sistema chiede movimento ridotto.",
  'a11y.li7':
    'Ogni tabella di riferimento è resa come HTML reale con celle di intestazione appropriate, non come immagine.',
  'a11y.h2Testing': 'Come è stato verificato',
  'a11y.p2':
    "A ogni build girano controlli automatici: validazione HTML comprensiva di regole specifiche WCAG e un audit di accessibilità Lighthouse che fa fallire la build sotto 95. I rapporti di contrasto vengono ricalcolati dai token di design da un test unitario, così un cambio di colore che rompe il contrasto fallisce invece di andare in produzione. L'uso da tastiera dei calcolatori è coperto da test end-to-end.",
  'a11y.p3':
    'I test automatici intercettano una minoranza dei problemi di accessibilità. Se incontri qualcosa che questi controlli non hanno visto, segnalalo.',
  'a11y.h2Known': 'Limiti noti',
  'a11y.p4':
    'I tre caratteri ospitati sul sito coprono solo le scritture latine. Le pagine in hindi, giapponese e arabo ricorrono ai caratteri di sistema per quelle scritture: la resa è corretta ma non coincide tipograficamente con le pagine latine.',

  'editorial.title': 'Linea editoriale',
  'editorial.description':
    'Come si scelgono le formule, come si citano le fonti, che cosa viene rifiutato e ogni quanto le pagine vengono riviste.',
  'editorial.h2Selection': 'Come si scelgono le formule',
  'editorial.p1':
    "Un calcolatore viene pubblicato solo se la sua equazione è pubblicata, attribuibile e verificabile. Vuol dire un articolo con un nome, una normativa con un nome o uno standard istituzionale con un nome: non un altro sito, non un'app di fitness e non un'equazione che circola senza origine.",
  'editorial.p2':
    'Dove esistono più equazioni per la stessa grandezza, la pagina ne implementa più di una e mostra in che cosa divergono. Quella predefinita è quella con la validazione meglio documentata nella popolazione adulta generale, e la pagina spiega perché lo è.',
  'editorial.h2Citation': 'Come si citano le fonti',
  'editorial.p3':
    "Ogni formula del sito porta la citazione completa nella pagina che la usa: autori, titolo, rivista, anno. La citazione è la pubblicazione originale, non una fonte secondaria che l'ha riprodotta. Dove un valore viene da una tabella di riferimento anziché da un'equazione — i valori MET, per esempio — si indicano il codice specifico e l'edizione, così la voce può essere cercata.",
  'editorial.h2Refused': 'Che cosa questo sito non farà',
  'editorial.li1':
    'Non consiglierà un apporto sotto le 1.500 kcal per gli uomini o le 1.200 kcal per le donne, né un deficit superiore al 25% del mantenimento o a 1.000 kcal al giorno, a seconda di quale sia minore.',
  'editorial.li2':
    'Non produrrà un piano verso un peso obiettivo con un BMI inferiore a 18,5, e spiega perché invece di rifiutare in silenzio.',
  'editorial.li3':
    'Non restituirà obiettivi di calorie o di massa grassa a chi ha meno di 18 anni.',
  'editorial.li4':
    'Non descriverà un corpo come buono, cattivo, ideale o da sistemare. Le categorie si chiamano come le chiama lo standard pubblicato, e nulla di più.',
  'editorial.li5':
    "Non inventerà un autore, un revisore medico, una valutazione o un numero di recensioni. Nulla su questo sito è attribuito a una persona che non l'ha scritto.",
  'editorial.h2Review': 'Cadenza di revisione',
  'editorial.p4':
    "Ogni pagina riporta la data reale dell'ultima revisione del contenuto. Quella data cambia quando cambia il contenuto e non altrimenti: una pagina la cui data di revisione si sposta a ogni build non ti sta dicendo niente. Le pagine delle formule vengono ricontrollate rispetto alle fonti quando una fonte viene rivista; lo standard di composizione corporea dell'esercito statunitense, per esempio, è cambiato nel 2026 e la pagina è cambiata con esso.",
  'editorial.h2Corrections': 'Correzioni',
  'editorial.p5':
    'Se una formula qui non corrisponde alla fonte citata, è un errore e verrà corretto. Segnalalo dalla pagina dei contatti indicando la fonte su cui ti basi.',

  'privacy.title': 'Privacy',
  'privacy.description':
    'Che cosa raccoglie questo sito, cioè quasi nulla, e quali sono i tuoi diritti secondo il GDPR e il CCPA.',
  'privacy.lastUpdated': 'Ultimo aggiornamento: {date}.',
  'privacy.p1':
    'Ogni calcolo di questo sito gira nel tuo browser. Altezza, peso, età e le altre cifre che inserisci non vengono mai trasmesse, mai salvate su un server e mai registrate. Chiudendo la scheda vengono scartate.',
  'privacy.h2Collect': 'Che cosa viene raccolto',
  'privacy.p2':
    'Nessuna analitica, nessuna pubblicità, nessun pixel di tracciamento, nessuno script di terze parti di alcun tipo. Il sito non effettua richieste di rete verso domini diversi da quello che lo serve.',
  'privacy.p3':
    'Due cose vengono salvate localmente nel tuo browser tramite localStorage e non lasciano mai il tuo dispositivo: la preferenza per il tema chiaro o scuro e la preferenza per le unità metriche o imperiali. Puoi cancellarle entrambe dalle impostazioni del browser.',
  'privacy.h2Server': 'Log del server',
  'privacy.p4':
    'Il fornitore di hosting statico registra i normali log delle richieste — indirizzo IP, marca temporale, percorso richiesto, user agent — come fa qualsiasi server web. Sono registrazioni del fornitore, conservate secondo la sua policy, e questo sito non le legge né le elabora.',
  'privacy.h2Future': 'Se venisse aggiunta la pubblicità',
  'privacy.p5':
    'La pubblicità non è attiva. Se venisse aggiunta in futuro, un banner di consenso chiederebbe prima che venga impostato qualsiasi cookie pubblicitario, questa pagina sarebbe aggiornata prima e la modifica sarebbe datata qui.',
  'privacy.h2Rights': 'I tuoi diritti',
  'privacy.p6':
    "Secondo il GDPR e il CCPA hai diritti di accesso, rettifica, cancellazione, portabilità e opposizione sui dati personali che un sito detiene su di te. Questo sito non ne detiene alcuno, quindi non c'è nulla a cui accedere o da cancellare — ma se ritieni il contrario, scrivi all'indirizzo di contatto e verrà verificato.",
  'privacy.h2Children': 'Privacy dei minori',
  'privacy.p7':
    'Questo sito non è rivolto a bambini sotto i 13 anni e non raccoglie nulla da nessuno. I calcolatori che producono obiettivi di calorie o di massa grassa si rifiutano di farlo per chi ha meno di 18 anni.',
  'privacy.h2Changes': 'Modifiche',
  'privacy.p8':
    'Le modifiche sostanziali a questa informativa si rifletteranno nella data qui sopra e saranno descritte nel registro delle modifiche.',
  'privacy.ownerNotice':
    "SEGNAPOSTO DEL PROPRIETARIO: prima del lancio, aggiungi la denominazione della persona giuridica, l'indirizzo postale e il contatto per la protezione dei dati richiesti dall'articolo 13 del GDPR. Vedi la lista di controllo in DEPLOY.md.",

  'terms.title': 'Termini',
  'terms.description':
    'I termini alle condizioni dei quali questo sito viene fornito, compresi i limiti di ciò per cui le sue stime possono essere usate.',
  'terms.h2Use': 'Uso del sito',
  'terms.p1':
    'Questo sito è gratuito. Puoi usare i numeri che produce per i tuoi scopi. Non puoi estrarne i contenuti a un ritmo che lo degradi per gli altri, né ripubblicarne il contenuto in blocco come se fosse tuo.',
  'terms.h2NotAdvice': 'Non è un consiglio medico',
  'terms.p2':
    "Tutto ciò che si trova qui è una stima prodotta da un'equazione pubblicata applicata ai numeri che hai fornito. Non è un consiglio medico, non è una diagnosi, non è un piano terapeutico e non sostituisce un professionista qualificato che possa visitarti. Non usarlo per prendere una decisione medica.",
  'terms.p3':
    "Se hai o sospetti di avere un disturbo alimentare, oppure sei incinta, stai allattando, hai meno di 18 anni o gestisci una patologia, i numeri qui non si applicano alla tua situazione, mentre l'indicazione di un clinico sì.",
  'terms.h2Accuracy': 'Accuratezza',
  'terms.p4':
    "Le equazioni sono implementate fedelmente e verificate contro esempi svolti tratti dalle pubblicazioni di origine. Le equazioni stesse sono medie di popolazione con margini di errore reali, indicati in ogni pagina. Un'equazione implementata correttamente può comunque sbagliare parecchio nel tuo caso.",
  'terms.h2Liability': 'Responsabilità',
  'terms.p5':
    "Il sito è fornito così com'è, senza garanzie di alcun tipo. Nella misura massima consentita dalla legge, non si accetta alcuna responsabilità per perdite o danni derivanti dall'uso del sito o dall'affidamento sui suoi risultati.",
  'terms.h2Ip': 'Contenuti',
  'terms.p6':
    'Testo, impaginazione e codice di questo sito appartengono a chi lo gestisce. Le equazioni no: appartengono alla letteratura pubblicata e sono citate di conseguenza. I valori di riferimento riprodotti da fonti pubblicate restano proprietà dei rispettivi editori e sono usati qui con attribuzione.',
  'terms.h2Law': 'Legge applicabile',
  'terms.ownerNotice':
    'SEGNAPOSTO DEL PROPRIETARIO: prima del lancio, indica la persona giuridica e il foro competente per questi termini. Vedi la lista di controllo in DEPLOY.md.',

  'cookies.title': 'Cookie',
  'cookies.description':
    'Quali cookie imposta questo sito, cioè nessuno, e che cosa cambierebbe se la pubblicità fosse attivata.',
  'cookies.p1': 'Questo sito non imposta alcun cookie.',
  'cookies.h2Storage': 'Che cosa viene salvato invece',
  'cookies.p2':
    'Due preferenze sono tenute in localStorage, che non è un cookie e non viene mai trasmesso ad alcun server:',
  'cookies.li1':
    'La tua preferenza per il tema chiaro o scuro, così la pagina non mostra un lampo del tema sbagliato.',
  'cookies.li2':
    'La tua preferenza per le unità metriche o imperiali, così non devi reimpostarla a ogni pagina.',
  'cookies.p3':
    'Entrambe si possono rimuovere dalle impostazioni dei dati dei siti del tuo browser. Rimuoverle non ti costa nulla se non la preferenza.',
  'cookies.h2Third': 'Cookie di terze parti',
  'cookies.p4':
    'Non ce ne sono, perché non ci sono script, incorporamenti, caratteri o immagini di terze parti. Ogni risorsa che il sito carica proviene dal dominio del sito stesso.',
  'cookies.h2Ads': 'Se la pubblicità venisse attivata',
  'cookies.p5':
    'La pubblicità non è attiva. Il codice per mostrarla esiste e riserva il suo spazio nel layout, ma non mostra nulla. Se venisse attivata, i partner pubblicitari imposterebbero i propri cookie, un banner di consenso lo chiederebbe prima che ne venisse impostato uno e questa pagina li elencherebbe prima che ciò accadesse.',

  // --- Chart, activity, lift and distance page templates ---
  'common.related': 'Correlati',
  'common.lastReviewed': 'Ultima revisione: {date}.',
  'common.category': 'Categoria',
  'common.weight': 'Peso',
  'common.duration': 'Durata',
  'chart.workItOut': 'Calcolalo con i tuoi numeri',
  'chart.workItOutBody':
    'Questa tabella è calcolata con le stesse equazioni del calcolatore, quindi le due concordano sempre.',
  'chart.relatedGuides': 'Guide correlate',
  'activity.h1': 'Calorie bruciate {activity}',
  'activity.metSection': 'Il valore MET e da dove viene',
  'activity.listedAs': 'Riportato come',
  'activity.referenceNote':
    "Energia lorda in chilocalorie. Leggi in orizzontale dal tuo peso e in verticale dalla tua durata. Una persona di 70 kg consuma circa {gross} kcal all'ora, di cui all'incirca {net} al di sopra di quanto sarebbe costato il riposo.",
  'activity.compareNote':
    'Energia consumata in trenta minuti a 70 kg, così le attività sono direttamente confrontabili.',
  'activity.compareCaption': 'Confronto con attività correlate',
  'activity.columnKcal30': 'kcal / 30 min',
  'activity.noscript':
    'I risultati in tempo reale richiedono JavaScript. La tabella qui sotto è precalcolata e funziona anche senza.',
  'activity.allActivities': 'Tutte le attività',
  'activity.metaDescription':
    'Quante calorie si bruciano {activity}, per peso corporeo e durata. Usa il valore MET pubblicato di {met} del Compendium per adulti del 2024.',
  'lift.enterSet': 'Inserisci la tua serie',
  'lift.typicalReps': 'Ripetizioni tipiche',
  'lift.percentageTableCaption': 'Percentuale del massimale con le ripetizioni attese',
  'lift.repMaxCaption': 'Massimale stimato in base al peso sollevato e alle ripetizioni',
  'lift.comparisonHeading': 'Conversione dei massimali per ripetizioni e confronto tra formule',
  'lift.comparisonCaption': 'Le cinque equazioni a confronto per 100 kg per cinque ripetizioni',
  'distance.enterTime': 'Inserisci un tempo finale',
  'search.typeCalculator': 'Calcolatore',
  'search.typeGuide': 'Guida',
  'search.typePage': 'Pagina',
  'search.unavailable':
    'La ricerca non è disponibile in questo momento. Il catalogo dei calcolatori contiene tutto.',

  // --- Chart, activity, lift and distance page templates ---
  'metBand.light': "verso l'estremo leggero",
  'metBand.moderate': 'nella fascia moderata',
  'metBand.vigorous': 'nella fascia intensa',
  'metBand.demanding': "verso l'estremo impegnativo",
  'netShare.none': 'niente',
  'netShare.percent': 'il {value} per cento',

  // --- Programmatic page copy ---
  'activity.appName': 'Calcolatore delle calorie bruciate {activity}',
  'activity.howToName': 'Come calcolare le calorie bruciate {activity}',
  'activity.step1.name': 'Inserisci peso e durata',
  'activity.step1.text':
    'Scegli il sistema metrico o quello imperiale, poi inserisci il tuo peso corporeo e quanto tempo hai dedicato a {activity}.',
  'activity.step2.name': 'Leggi il risultato',
  'activity.step2.text':
    "Il risultato si aggiorna mentre scrivi e mostra l'energia lorda e il valore al di sopra del riposo.",
  'activity.step3.name': 'Controlla il valore MET e la sua fonte',
  'activity.step3.text':
    'Il codice del Compendium e la descrizione dietro il valore di {met} MET sono sotto il calcolatore.',
  'activity.faq.q1': 'Quante calorie si bruciano {activity}?',
  'activity.faq.a1':
    "A {met} MET, una persona di 70 kg consuma circa {kcal30} kcal in trenta minuti. Il consumo scala con il peso corporeo, quindi una persona di 90 kg ne consuma all'incirca un terzo in più per la stessa sessione.",
  'activity.faq.q2': 'Qual è il valore MET di {activity}?',
  'activity.faq.a2':
    '{met} MET, con il codice {code} del Compendium. Un MET è un multiplo del metabolismo a riposo.',
  'activity.faq.q3': 'Devo sottrarre il metabolismo a riposo?',
  'activity.faq.a3':
    "Se stai sommando questo a un valore di mantenimento che già include il riposo, sì. Il valore netto toglie il circa un MET-ora per ora che il tuo corpo avrebbe comunque speso, il che per {activity} lascia all'incirca {netShare} del totale lordo.",
  'activity.faq.q4': 'Perché il peso corporeo cambia il risultato?',
  'activity.faq.a4':
    'Un valore MET è energia per chilogrammo di massa corporea, quindi la stessa attività costa di più a un corpo più pesante. Ecco perché il peso è un dato da inserire e non un presupposto, ed ecco perché i numeri generici di calorie bruciate senza un peso sono quasi privi di significato.',
  'activity.faq.q5': 'Quanto è accurato questo valore?',
  'activity.faq.a5':
    'È una stima ricavata da una media di popolazione. I confronti pubblicati con la calorimetria indiretta trovano discrepanze individuali dal venti al trenta per cento: usalo per confrontare attività, non come un conto da recuperare mangiando.',
  'lift.h1': 'Calcolatore del massimale nella {lift}',
  'lift.metaDescription':
    'Stima il tuo massimale nella {liftLower} a partire da una serie, con tutte e cinque le equazioni pubblicate a confronto e una tabella di percentuali per i carichi di allenamento.',
  'lift.howToName': 'Come stimare un massimale nella {liftLower}',
  'lift.step1.name': 'Inserisci peso e ripetizioni',
  'lift.step1.text':
    'Inserisci il peso che hai sollevato nella {liftLower} e quante ripetizioni hai completato.',
  'lift.step2.name': 'Leggi la stima',
  'lift.step2.text':
    'Sono mostrate tutte e cinque le equazioni, insieme alla loro media e a una tabella di percentuali.',
  'lift.step3.name': 'Controlla come si comportano le equazioni in questo esercizio',
  'lift.step3.text':
    'Le note qui sotto spiegano come queste equazioni si trasferiscono a questo movimento in particolare.',
  'lift.faq.q1': 'Come stimo il mio massimale nella {liftLower}?',
  'lift.faq.a1':
    "Fai una serie a cedimento o vicino a esso, inserisci il peso e le ripetizioni, e le equazioni fanno il resto. Una tripla pesante dà una stima molto più affidabile di una serie da dodici, perché tutte e cinque le equazioni sono state validate nell'intervallo da due a dieci ripetizioni.",
  'lift.faq.q2': 'Le stime del massimale sono accurate per la {liftLower}?',
  'lift.faq.q3': 'Quale formula dovrei usare?',
  'lift.faq.a3':
    "Wathan ed Epley seguono i dati misurati sull'intervallo più ampio; Brzycki è la più conservativa ed è esatta a una singola ripetizione. La media delle cinque è un numero unico più difendibile di ciascuna presa da sola, e la dispersione tra loro dice quanta fiducia meriti la stima.",
  'lift.faq.q4': 'Quale intervallo di ripetizioni si adatta alla {liftLower}?',
  'lift.faq.a4':
    "Questo esercizio si allena di solito nell'intervallo di {reps} ripetizioni. Le stime prese dentro quell'intervallo sono le più affidabili, perché stanno più vicino a dove le equazioni sono state adattate.",
  'lift.faq.q5': 'Meglio testare un massimale vero?',
  'lift.faq.a5':
    'Solo se ti serve il numero per la gara, e allora con chi ti assiste e un riscaldamento completo. Per programmare, una stima da una tripla pesante è quasi altrettanto utile e costa molto meno in recupero e rischio.',
  'distance.h1': 'Calcolatore del passo per la {distance}',
  'distance.metaDescription':
    'Tabella del passo e calcolatore per la {distance}: converti tra passo, velocità e tempo finale, con i parziali e una nota onesta sulle proiezioni di gara.',
  'distance.howToName': 'Come calcolare il passo sulla {distanceLower}',
  'distance.step1.name': 'Inserisci un tempo finale',
  'distance.step1.text':
    'Inserisci un tempo obiettivo o reale sulla {distanceLower} nel formato h:mm:ss o m:ss.',
  'distance.step2.name': 'Leggi il passo',
  'distance.step2.text':
    'Il passo al chilometro e al miglio, la velocità e i parziali si aggiornano mentre scrivi.',
  'distance.step3.name': 'Consulta la tabella del passo',
  'distance.step3.text':
    "La tabella qui sotto associa ogni passo dell'intervallo abituale a un tempo finale.",
  'distance.faq.q1': 'Che passo mi serve per un dato tempo sulla {short}?',
  'distance.faq.a1':
    "Dividi il tempo obiettivo per la distanza in chilometri. Per la {distance}, {midPace} al chilometro dà {midTime}. La tabella qui sotto copre l'intervallo in cui gareggia la maggior parte dei podisti.",
  'distance.faq.q2': 'Come dovrei gestire il passo su una {short}?',
  'distance.faq.q3': 'Che cosa limita la prestazione sulla {short}?',
  'distance.faq.q4': 'Le proiezioni verso altre distanze sono affidabili?',
  'distance.faq.a4':
    'No, e la pagina lo dice. Presuppongono che lo stesso passo regga su una distanza diversa, il che non accade: il passo cala man mano che la distanza cresce. La formula di Riegel applica un esponente di fatica ed è lo strumento giusto per una previsione vera.',
  'distance.faq.q5': 'Perché la tabella dei parziali ha un ultimo tratto incompleto?',
  'distance.faq.a5':
    "Perché la {distance} misura {km} km, che non è un numero intero di intervalli di parziale. L'ultimo tratto parziale viene mostrato invece che omesso, dato che una tabella che finisce prima del traguardo sbaglia proprio dove conta.",

  // --- Lift and distance page chrome ---
  'lift.weightLifted': 'Peso sollevato',
  'lift.reps': 'Ripetizioni',
  'lift.repsUnit': 'rip.',
  'lift.formula': 'Formula',
  'lift.noscript':
    'I risultati in tempo reale richiedono JavaScript. Le tabelle qui sotto sono precalcolate e funzionano anche senza.',
  'lift.specificHeading': 'La {lift} nello specifico',
  'lift.estimateHeading': 'Massimale stimato nella {lift} per peso e ripetizioni',
  'lift.estimateNote':
    'Stime di Epley in chilogrammi. Leggi in orizzontale dal peso che hai sollevato e in verticale dalle ripetizioni che hai gestito. Le colonne oltre le dieci ripetizioni sono mostrate ma sono le meno affidabili.',
  'lift.percentageHeading': 'Tabella delle percentuali',
  'lift.percentageNote':
    'Carichi di allenamento come quota di un massimale di 100 kg, con le ripetizioni che ogni percentuale di norma consente. Scala proporzionalmente alla tua stima.',
  'lift.columnPercentage': 'Percentuale',
  'lift.columnLoad100': 'Carico da 100 kg',
  'lift.columnApproxReps': 'Ripetizioni approssimative',
  'lift.conversionHeading': 'Conversione dei massimali per ripetizioni',
  'lift.conversionNote':
    'A che cosa corrisponde un massimale stimato di 100 kg a ciascun numero di ripetizioni, e come si confrontano le cinque equazioni per una serie da cinque a 100 kg.',
  'lift.columnLoadFor100': 'Carico per un massimale di 100 kg',
  'lift.column100x5': '100 kg × 5 rip.',
  'lift.otherLifts': 'Altri esercizi',
  'lift.formulasGuide': 'In che cosa differiscono le formule del massimale',
  'distance.finishTime': 'Tempo finale',
  'distance.noscript':
    'I risultati in tempo reale richiedono JavaScript. La tabella del passo qui sotto è precalcolata e funziona anche senza.',
  'distance.aboutHeading': 'La {distance}',
  'distance.length': 'Distanza: {km} km ({metres} m).',
  'distance.fixedByRules': 'Fissata dalla Regola 55 di competizione di World Athletics.',
  'distance.chartHeading': 'Tabella del passo della {distance}',
  'distance.chartNote':
    'Tempo finale, passo al miglio e velocità per ogni passo al chilometro. Tutto è calcolato in metri e secondi e convertito una sola volta, così nessun arrotondamento si accumula lungo la tabella.',
  'distance.columnPaceKm': 'Passo / km',
  'distance.columnPaceMile': 'Passo / miglio',
  'distance.columnSpeed': 'Velocità',
  'distance.columnDistance': 'Distanza',
  'distance.columnElapsed': 'Trascorso',
  'distance.otherDistances': 'Altre distanze',
  'distance.paceChartGuide': 'Come leggere una tabella del passo',

  // --- Prose page detail ---
  'about.h2Absent': 'Che cosa manca di proposito',
  'about.pAbsent':
    'Alcuni calcolatori mancano di proposito. Funzione renale, superficie corporea per il dosaggio della chemioterapia e tasso alcolemico producono numeri che alimentano decisioni reali, e competono a un clinico. I calcolatori di data del parto, ovulazione e concepimento sono la categoria più scrutinata in ambito sanitario e sono ben serviti da editori medici affermati. Proiettare le date delle mestruazioni dalla durata del ciclo è aritmetica, e questo è pubblicato qui.',
  'about.h2Built': 'Come è costruito',
  'about.pBuilt':
    'Pagine statiche, senza account e senza database. I calcoli girano nel tuo browser e non esiste alcun server a cui inviarli. Ogni formula è verificata contro gli esempi svolti del suo articolo di origine in una suite di test automatizzata, ed è questo che intercetta gli errori di trascrizione che rendono un calcolatore silenziosamente sbagliato.',
  'contact.h2NoForm': "Perché non c'è un modulo di contatto",
  'contact.pNoForm':
    "Un modulo ha bisogno di un posto dove inviare quello che scrivi, il che significa un server, il che significa un posto dove il tuo messaggio resta salvato e un'altra cosa da mettere in sicurezza. Questo sito sono file statici senza backend, e tenerlo così è il motivo per cui nulla di ciò che digiti in un calcolatore può lasciare il tuo dispositivo. Un indirizzo e-mail è uno scambio equo.",
  'contact.ownerNotice':
    "SEGNAPOSTO DEL PROPRIETARIO: sostituisci l'indirizzo di contatto in src/config/site.ts prima del lancio. Compare qui, nell'informativa sulla privacy, nei termini e in security.txt, e cambiare quell'unico file li aggiorna tutti.",

  // --- Short meta title, distinct from the H1 ---
  'lift.metaTitle': 'Calcolatore 1RM: {lift}',

  // --- Short meta title for activity pages ---
  'activity.metaTitle': 'Calorie: {activity}',

  // --- Imperial height sub-fields, which need their own labels ---
  'calc.heightFeet': 'Altezza, piedi',
  'calc.heightInches': 'Altezza, pollici',
};
