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
};
