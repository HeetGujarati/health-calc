import type { Messages } from '../../lib/i18n';

/** German UI catalog. */
export const de: Messages = {
  'nav.main': 'Haupt',
  'nav.calculators': 'Rechner',
  'nav.charts': 'Tabellen',
  'nav.guides': 'Ratgeber',
  'nav.skipToContent': 'Zum Inhalt springen',
  'nav.breadcrumb': 'Brotkrumennavigation',
  'nav.home': 'Start',
  'nav.useDarkTheme': 'Dunkles Design verwenden',
  'nav.useLightTheme': 'Helles Design verwenden',
  'nav.language': 'Sprache',
  'nav.chooseLanguage': 'Sprache wählen',

  'footer.calculators': 'Rechner',
  'footer.about': 'Über',
  'footer.legal': 'Rechtliches',
  'footer.allCalculators': 'Alle Rechner',
  'footer.referenceCharts': 'Referenztabellen',
  'footer.guides': 'Ratgeber',
  'footer.caloriesByActivity': 'Kalorien nach Aktivität',
  'footer.oneRepMaxByLift': 'Maximalgewicht nach Übung',
  'footer.paceByDistance': 'Pace nach Distanz',
  'footer.search': 'Suche',
  'footer.aboutLink': 'Über diese Seite',
  'footer.editorialPolicy': 'Redaktionelle Grundsätze',
  'footer.accessibility': 'Barrierefreiheit',
  'footer.contact': 'Kontakt',
  'footer.privacy': 'Datenschutz',
  'footer.terms': 'Nutzungsbedingungen',
  'footer.cookies': 'Cookies',
  'footer.disclaimer':
    '{site} liefert Schätzwerte aus veröffentlichten Gleichungen, die auf Bevölkerungsebene ermittelt wurden. Der individuelle Bedarf schwankt, und dies ist keine medizinische Beratung. Wenn Sie sich Sorgen um Ihr Essverhalten, Ihr Gewicht oder Ihr Körperbild machen, sind eine Ärztin oder eine qualifizierte Fachkraft die richtige Anlaufstelle.',
  'footer.copyright':
    '© {year} {site}. Die Formeln sind auf jeder Seite belegt; siehe die redaktionellen Grundsätze.',
  'footer.copyrightLink': 'redaktionellen Grundsätze',

  'translation.notice':
    'Diese Seite wurde aus dem englischen Original übersetzt. Gleichungen, Quellen und Zahlen sind identisch; wenn eine Formulierung holprig klingt, ist die englische Seite maßgeblich.',
  'translation.viewEnglish': 'Englisches Original ansehen',

  'home.title': 'Rechner für Gesundheit und Fitness',
  'home.description':
    'Kostenlose Rechner für Gesundheit und Fitness auf Basis veröffentlichter Gleichungen, jede mit Quellenangabe, damit Sie sie überprüfen und nachvollziehen können, wie die Zahl zustande kam.',
  'home.intro':
    'Jeder Rechner hier verwendet eine veröffentlichte Gleichung, nennt ihre Quelle und zeigt, was die Gleichung voraussetzt. Metrisch und imperial, ohne Anmeldung.',

  'category.body-composition': 'Körperzusammensetzung',
  'category.energy': 'Energie und Zufuhr',
  'category.training': 'Training',
  'category.weight-reference': 'Gewichtsreferenz',

  'hub.calculators.title': 'Alle Rechner',
  'hub.calculators.description':
    'Alle Rechner der Website, nach Kategorie gruppiert. Jeder nutzt eine veröffentlichte Gleichung, nennt ihre Quelle und funktioniert metrisch wie imperial.',
  'hub.calculators.intro':
    '{count} Rechner, jeder auf einer veröffentlichten Gleichung aufgebaut, deren Quelle auf der Seite angegeben ist. Metrisch und imperial durchgehend.',

  'hub.guides.title': 'Ratgeber',
  'hub.guides.description':
    'Erklärungen zu den Gleichungen hinter den Rechnern: woher sie stammen, was sie voraussetzen, wo sie versagen und wie viel Vertrauen die Zahlen verdienen.',
  'hub.guides.intro':
    '{count} Erklärungen dazu, was hinter den Rechnern steckt — woher jede Gleichung kommt, was sie voraussetzt und wie viel Vertrauen ihr Ergebnis verdient.',
  'hub.guides.readingTime': '{count} Minuten Lesezeit',

  'hub.charts.title': 'Referenztabellen',
  'hub.charts.description':
    'Druckbare Referenztabellen für BMI, gesundes Gewicht, Körperfett, MET-Werte, Trainingsprozente, Herzfrequenzzonen, Protein, Pace und mehr.',
  'hub.charts.intro':
    '{count} Referenztabellen, jede aus denselben Gleichungen berechnet wie der zugehörige Rechner — beide können sich also nie widersprechen. Jede Tabelle enthält echte Daten samt Erklärung, wie sie zu lesen ist, und funktioniert ohne JavaScript.',

  'hub.activities.title': 'Kalorienverbrauch nach Aktivität',
  'hub.activities.description':
    'Energieverbrauch bei {count} Aktivitäten, jeweils mit veröffentlichtem MET-Wert und Compendium-Code, berechnet für Ihr Körpergewicht und Ihre Dauer.',
  'hub.activities.intro':
    '{count} Aktivitäten, jede mit dem MET-Wert und dem fünfstelligen Code aus dem Adult Compendium of Physical Activities 2024. Jeder Wert stammt aus der veröffentlichten Quelle und nicht aus einem anderen Rechner.',
  'hub.activities.tableCaption': 'Aktivitäten der Kategorie {category} und ihre MET-Werte',
  'hub.activities.columnActivity': 'Aktivität',
  'hub.activities.columnMet': 'MET',
  'hub.activities.columnCode': 'Code',
  'hub.activities.source':
    'Quelle: Herrmann SD, Willis EA, Ainsworth BE, et al. „2024 Adult Compendium of Physical Activities“. Journal of Sport and Health Science 13(1), 2024, S. 6–12. MET-Werte sind Bevölkerungsmittel; rund 18 % der Compendium-Einträge sind geschätzt statt gemessen.',

  'hub.lifts.title': 'Maximalgewicht nach Übung',
  'hub.lifts.description':
    'Schätzungen des Einwiederholungsmaximums für {count} Übungen, jeweils mit einer ehrlichen Anmerkung dazu, wie sich die fünf Gleichungen bei genau dieser Bewegung verhalten.',
  'hub.lifts.intro':
    'Die fünf 1RM-Gleichungen wurden überwiegend aus Daten zu Bankdrücken und Kniebeuge abgeleitet und lassen sich nicht auf jede Bewegung gleich gut übertragen. Jede Seite unten sagt, wie sie sich bei dieser Übung verhalten.',

  'hub.distances.title': 'Pace-Tabellen nach Wettkampfdistanz',
  'hub.distances.description':
    'Pace- und Zwischenzeittabellen für {count} Wettkampfdistanzen, von 100 Metern bis 50 km, mit Umrechnungen zwischen Pace, Geschwindigkeit und Zielzeit.',
  'hub.distances.intro':
    '{count} Distanzen, jede mit vollständiger Pace-Tabelle, Zwischenzeittabelle und einer Anmerkung dazu, was die Leistung dort begrenzt. Marathon- und Halbmarathonlängen sind die von World Athletics festgelegten.',

  'calc.enterDetails': 'Ihre Angaben eintragen',
  'calc.result': 'Ergebnis',
  'calc.calculate': 'Berechnen',
  'calc.noscript':
    'Live-Ergebnisse brauchen JavaScript. Die Referenztabelle weiter unten auf dieser Seite ist vorberechnet und funktioniert auch ohne.',
  'calc.howItWorks': 'So wird gerechnet',
  'calc.default': 'Standard',
  'calc.source': 'Quelle',
  'calc.assumes': 'Setzt voraus',
  'calc.accuracy': 'Genauigkeit',
  'calc.whichFormula': 'Welche Formel Sie nehmen sollten',
  'calc.defaultsTo': 'Diese Seite verwendet standardmäßig {formula}. {accuracy}',
  'calc.questions': 'Fragen',
  'calc.related': 'Verwandtes',
  'calc.relatedCalculators': 'Rechner',
  'calc.relatedGuides': 'Ratgeber',
  'calc.lastReviewed': 'Zuletzt geprüft am {date}. Kategorie: {category}.',
  'calc.units': 'Einheiten',
  'calc.metric': 'Metrisch',
  'calc.imperial': 'Imperial',

  'guide.relatedCalculators': 'Rechner',
  'guide.relatedGuides': 'Verwandte Ratgeber',
  'guide.meta': '{date} · {count} Minuten Lesezeit',

  'search.title': 'Suche',
  'search.description': 'Durchsuchen Sie die Rechner, Ratgeber und Referenzseiten dieser Website.',
  'search.label': 'Rechner und Ratgeber durchsuchen',
  'search.submit': 'Suchen',
  'search.browse': 'Oder alles durchstöbern',
  'search.allGuides': 'Alle Ratgeber',
  'search.noResults': 'Keine Treffer für „{query}“.',
  'search.resultCount': '{count} Treffer für „{query}“.',
  'search.resultCountOne': '1 Treffer für „{query}“.',
  'search.prompt': 'Tippen, um zu suchen.',

  'notFound.title': 'Seite nicht gefunden',
  'notFound.description':
    'Diese Seite gibt es nicht. Alle Rechner der Website sind unten aufgeführt.',
  'notFound.label': 'Fehler 404',
  'notFound.heading': 'Diese Seite gibt es nicht',
  'notFound.intro':
    'Die Adresse ist möglicherweise vertippt, oder die Seite wurde verschoben. Alles, was die Website hat, steht unten.',
  'notFound.allCalculators': 'Alle Rechner',
  'notFound.search': 'Suche',
  'notFound.guides': 'Ratgeber',
  'notFound.charts': 'Tabellen',
  'notFound.reportBrokenLink': 'Defekten Link melden',

  'disclaimer.heading': 'Was das hier nicht ist',
  'disclaimer.body':
    'Das sind Schätzwerte aus Gleichungen auf Bevölkerungsebene, keine Messung an Ihnen und keine medizinische Beratung. Individuelle Ergebnisse schwanken stark. Sprechen Sie mit einer Ärztin oder einer Ernährungsfachkraft, bevor Sie wesentlich ändern, wie Sie essen oder trainieren.',

  'chart.howToRead': 'So lesen Sie diese Tabelle',
  'chart.relatedCalculator': 'Rechner',
  'chart.source': 'Quelle',

  'activity.metValue': 'MET-Wert',
  'activity.compendiumCode': 'Compendium-Code',
  'activity.referenceTable': 'Kalorienverbrauch nach Körpergewicht und Dauer',
  'activity.compare': 'Vergleich mit verwandten Aktivitäten',
  'activity.columnWeight': 'Körpergewicht',

  'lift.percentageTable': 'Trainingsprozente',
  'lift.repMaxTable': 'Umrechnung von Wiederholungsmaxima',
  'lift.notes': 'Hinweise zu dieser Übung',

  'distance.paceChart': 'Pace-Tabelle',
  'distance.splits': 'Zwischenzeiten',
  'distance.notes': 'Hinweise zu dieser Distanz',

  'consent.heading': 'Cookies',
  'consent.body':
    'Diese Website verwendet keine Werbe- oder Analyse-Cookies. Sollte sich das je ändern, fragt dieser Hinweis vorher.',
  'consent.accept': 'Annehmen',
  'consent.reject': 'Ablehnen',

  'about.title': 'Über diese Seite',
  'about.description':
    'Was diese Website ist, wie die Rechner gebaut sind und was die Zahlen Ihnen sagen können und was nicht.',
  'about.p1':
    'Diese Website gibt es, weil die meisten Fitnessrechner nicht sagen, woher ihre Zahlen kommen. Sie geben Größe und Gewicht ein, eine Zahl erscheint, und es gibt keine Möglichkeit zu erfahren, welche Gleichung sie erzeugt hat, aus welcher Bevölkerung sie abgeleitet wurde oder wie weit sie bei jemandem wie Ihnen danebenliegen kann.',
  'about.p2':
    'Jeder Rechner hier nennt die verwendete Gleichung, zitiert die Arbeit, aus der sie stammt, benennt, was diese Gleichung über die Person voraussetzt, auf die sie angewendet wird, und sagt, wie genau sie im Vergleich zu den Alternativen ist. Wo mehrere veröffentlichte Gleichungen uneins sind — und bei Körperfett und Grundumsatz sind sie es deutlich —, zeigt die Seite die Uneinigkeit, statt sie hinter einer einzigen Zahl zu verstecken.',
  'about.p3':
    'Die Berechnungen laufen in Ihrem Browser. Nichts von dem, was Sie eintippen, wird irgendwohin gesendet, auf einem Server gespeichert oder protokolliert. Es gibt kein Konto, keine E-Mail-Erfassung und kein Tracking-Skript.',
  'about.h2Limits': 'Was diese Zahlen nicht sind',
  'about.p4':
    'Jede Gleichung hier entstand, indem eine Kurve an Messungen einer bestimmten Personengruppe angepasst wurde. Diese Anpassung ist im Mittel gut und kann für jede einzelne Person schlecht sein: Eine Gleichung mit einem Standardfehler von 4 Prozentpunkten liegt bei einer erheblichen Minderheit um mehr als das daneben. Gerade Gleichungen zur Körperzusammensetzung wurden überwiegend aus kleinen, jungen, mehrheitlich weißen Stichproben abgeleitet und lassen sich nur unvollkommen auf alle anderen übertragen.',
  'about.p5':
    'Nichts davon ist medizinische Beratung, nichts davon ist eine Diagnose, und nichts davon ersetzt ein Gespräch mit einer Fachkraft, die Sie tatsächlich untersuchen kann.',

  'contact.title': 'Kontakt',
  'contact.description':
    'Wie Sie einen Fehler in einer Formel, einen defekten Link oder ein Problem mit der Barrierefreiheit melden.',
  'contact.p1':
    'Wenn eine Formel falsch ist, eine Quellenangabe nicht zur Quelle passt, ein Link defekt ist oder etwas auf der Seite mit Tastatur oder Screenreader unbenutzbar ist, sagen Sie es bitte. Korrekturen an den Gleichungen sind das Wertvollste, was man schicken kann.',
  'contact.emailLabel': 'E-Mail',
  'contact.p2':
    'Bitte nennen Sie die Seitenadresse und, bei einer Formelkorrektur, die veröffentlichte Quelle, auf die Sie sich stützen. Das macht die Korrektur überprüfbar statt zur Meinungsfrage.',
  'contact.h2Response': 'Was Sie erwarten können',
  'contact.p3':
    'Dies ist eine kleine Website, die von einer einzelnen Person betrieben wird. Formelkorrekturen und Probleme der Barrierefreiheit haben Vorrang vor allem anderen.',

  'a11y.title': 'Barrierefreiheit',
  'a11y.description':
    'Der Barrierefreiheitsstandard, den diese Website anstrebt, wie sie geprüft wurde und wie Sie ein Problem melden.',
  'a11y.p1':
    'Diese Website strebt WCAG 2.2 Stufe AA an. Das ist eine Zusage darüber, wie sie gebaut ist, keine von irgendjemandem ausgestellte Zertifizierung.',
  'a11y.h2What': 'Was das praktisch bedeutet',
  'a11y.li1':
    'Jede Seite funktioniert allein mit der Tastatur, in logischer Reihenfolge, mit sichtbarer Fokusanzeige.',
  'a11y.li2':
    'Jedes Formularfeld hat eine echte Beschriftung, keinen Platzhaltertext, der als solche herhält.',
  'a11y.li3':
    'Rechnerergebnisse werden dem Screenreader beim Ändern höflich angesagt, ohne den Fokus aus dem Feld zu nehmen, in das gerade getippt wird.',
  'a11y.li4':
    'Der Textkontrast beträgt in beiden Designs mindestens 4,5:1, der von Bedienelementrändern mindestens 3:1.',
  'a11y.li5': 'Touch-Ziele sind mindestens 44 mal 44 Pixel groß.',
  'a11y.li6': 'Animation wird unterdrückt, wenn das System reduzierte Bewegung anfordert.',
  'a11y.li7':
    'Jede Referenztabelle wird als echtes HTML mit ordentlichen Kopfzellen ausgegeben, nicht als Bild.',
  'a11y.h2Testing': 'Wie geprüft wurde',
  'a11y.p2':
    'Bei jedem Build laufen automatische Prüfungen: HTML-Validierung samt WCAG-spezifischer Regeln und ein Lighthouse-Audit zur Barrierefreiheit, das den Build unter 95 scheitern lässt. Kontrastverhältnisse werden von einem Unit-Test aus den Design-Tokens neu berechnet, sodass eine Farbänderung, die den Kontrast bricht, scheitert statt in Produktion zu gehen. Die Tastaturbedienung der Rechner ist durch End-to-End-Tests abgedeckt.',
  'a11y.p3':
    'Automatische Tests finden nur einen Teil der Barrierefreiheitsprobleme. Wenn Sie auf etwas stoßen, das diese Prüfungen übersehen haben, melden Sie es bitte.',
  'a11y.h2Known': 'Bekannte Einschränkungen',
  'a11y.p4':
    'Die drei selbst gehosteten Schriften decken nur lateinische Schriftzeichen ab. Seiten auf Hindi, Japanisch und Arabisch greifen für diese Schriften auf die Systemschriften zurück, was korrekt dargestellt wird, typografisch aber nicht zu den lateinischen Seiten passt.',

  'editorial.title': 'Redaktionelle Grundsätze',
  'editorial.description':
    'Wie Formeln ausgewählt werden, wie Quellen belegt werden, was abgelehnt wird und wie oft Seiten überprüft werden.',
  'editorial.h2Selection': 'Wie Formeln ausgewählt werden',
  'editorial.p1':
    'Ein Rechner geht nur online, wenn seine Gleichung veröffentlicht, zuordenbar und überprüfbar ist. Das heißt: eine benannte Arbeit, eine benannte Vorschrift oder ein benannter institutioneller Standard — keine andere Website, keine Fitness-App und keine Gleichung, die ohne Herkunft kursiert.',
  'editorial.p2':
    'Wo mehrere Gleichungen für dieselbe Größe existieren, setzt die Seite mehr als eine um und zeigt, worin sie sich unterscheiden. Der Standard ist diejenige mit der am besten dokumentierten Validierung in der erwachsenen Allgemeinbevölkerung, und die Seite sagt, warum sie der Standard ist.',
  'editorial.h2Citation': 'Wie Quellen belegt werden',
  'editorial.p3':
    'Jede Formel auf der Website trägt ihre vollständige Quellenangabe auf der Seite, die sie verwendet: Autoren, Titel, Zeitschrift, Jahr. Zitiert wird die Originalveröffentlichung, nicht eine Sekundärquelle, die sie wiedergegeben hat. Wo ein Wert aus einer Referenztabelle statt aus einer Gleichung stammt — etwa MET-Werte —, werden der konkrete Code und die Ausgabe genannt, damit der Eintrag nachgeschlagen werden kann.',
  'editorial.h2Refused': 'Was diese Website nicht tut',
  'editorial.li1':
    'Sie empfiehlt keine Zufuhr unter 1.500 kcal für Männer oder 1.200 kcal für Frauen und kein Defizit über 25 % des Erhaltungsbedarfs oder 1.000 kcal pro Tag, je nachdem, was kleiner ist.',
  'editorial.li2':
    'Sie erstellt keinen Plan hin zu einem Zielgewicht unter einem BMI von 18,5 und sagt warum, statt still zu verweigern.',
  'editorial.li3':
    'Sie gibt keine Kalorien- oder Körperfettziele für Personen unter 18 Jahren aus.',
  'editorial.li4':
    'Sie beschreibt keinen Körper als gut, schlecht, ideal oder reparaturbedürftig. Kategorien heißen so, wie der veröffentlichte Standard sie benennt, und nicht mehr.',
  'editorial.li5':
    'Sie erfindet weder Autoren noch medizinische Prüfer, weder Bewertungen noch Rezensionszahlen. Nichts auf dieser Website wird einer Person zugeschrieben, die es nicht geschrieben hat.',
  'editorial.h2Review': 'Prüfrhythmus',
  'editorial.p4':
    'Jede Seite trägt das echte Datum ihrer letzten inhaltlichen Prüfung. Dieses Datum ändert sich, wenn sich der Inhalt ändert, und sonst nicht — eine Seite, deren Prüfdatum bei jedem Build weiterspringt, sagt Ihnen nichts. Formelseiten werden erneut gegen ihre Quellen geprüft, wenn eine Quelle überarbeitet wird; der Körperzusammensetzungsstandard der US-Armee etwa änderte sich 2026, und die Seite änderte sich mit.',
  'editorial.h2Corrections': 'Korrekturen',
  'editorial.p5':
    'Wenn eine Formel hier nicht zu ihrer angegebenen Quelle passt, ist das ein Fehler und wird behoben. Melden Sie es über die Kontaktseite und nennen Sie die Quelle, auf die Sie sich stützen.',

  'privacy.title': 'Datenschutz',
  'privacy.description':
    'Was diese Website erhebt, nämlich fast nichts, und welche Rechte Sie nach DSGVO und CCPA haben.',
  'privacy.lastUpdated': 'Zuletzt aktualisiert am {date}.',
  'privacy.p1':
    'Jede Berechnung auf dieser Website läuft in Ihrem Browser. Größe, Gewicht, Alter und die übrigen Zahlen, die Sie eingeben, werden nie übertragen, nie auf einem Server gespeichert und nie protokolliert. Das Schließen des Tabs verwirft sie.',
  'privacy.h2Collect': 'Was erhoben wird',
  'privacy.p2':
    'Keine Analyse, keine Werbung, keine Tracking-Pixel, keinerlei Skripte Dritter. Die Website stellt keine Netzwerkanfragen an eine andere Domain als die, die sie ausliefert.',
  'privacy.p3':
    'Zwei Dinge werden lokal in Ihrem Browser über localStorage gespeichert und verlassen Ihr Gerät nie: Ihre Vorliebe für helles oder dunkles Design und Ihre Vorliebe für metrische oder imperiale Einheiten. Beide können Sie über die Browsereinstellungen löschen.',
  'privacy.h2Server': 'Serverprotokolle',
  'privacy.p4':
    'Der Anbieter des statischen Hostings zeichnet übliche Zugriffsprotokolle auf — IP-Adresse, Zeitstempel, angefragter Pfad, User-Agent —, wie es jeder Webserver tut. Das sind die Aufzeichnungen des Anbieters, aufbewahrt nach dessen Richtlinie; diese Website liest und verarbeitet sie nicht.',
  'privacy.h2Future': 'Falls Werbung hinzukommt',
  'privacy.p5':
    'Werbung ist nicht aktiviert. Käme sie künftig hinzu, würde ein Einwilligungsbanner fragen, bevor ein Werbe-Cookie gesetzt wird, diese Seite würde vorher aktualisiert, und die Änderung wäre hier datiert.',
  'privacy.h2Rights': 'Ihre Rechte',
  'privacy.p6':
    'Nach DSGVO und CCPA haben Sie Rechte auf Auskunft, Berichtigung, Löschung, Datenübertragbarkeit und Widerspruch bezüglich personenbezogener Daten, die eine Website über Sie hält. Diese Website hält keine, es gibt also nichts abzurufen oder zu löschen — sollten Sie das anders sehen, schreiben Sie an die Kontaktadresse, und es wird geprüft.',
  'privacy.h2Children': 'Datenschutz für Kinder',
  'privacy.p7':
    'Diese Website richtet sich nicht an Kinder unter 13 Jahren und erhebt von niemandem etwas. Rechner, die Kalorien- oder Körperfettziele erzeugen, verweigern dies für Personen unter 18 Jahren.',
  'privacy.h2Changes': 'Änderungen',
  'privacy.p8':
    'Wesentliche Änderungen dieser Erklärung schlagen sich im Datum oben nieder und werden im Änderungsprotokoll beschrieben.',
  'privacy.ownerNotice':
    'PLATZHALTER FÜR DEN BETREIBER: Vor dem Start Name der juristischen Person, Postanschrift und Datenschutzkontakt nach Art. 13 DSGVO ergänzen. Siehe die Checkliste in DEPLOY.md.',

  'terms.title': 'Nutzungsbedingungen',
  'terms.description':
    'Die Bedingungen, unter denen diese Website bereitgestellt wird, einschließlich der Grenzen dessen, wofür ihre Schätzwerte verwendet werden dürfen.',
  'terms.h2Use': 'Nutzung der Website',
  'terms.p1':
    'Diese Website ist kostenlos nutzbar. Sie dürfen die erzeugten Zahlen für eigene Zwecke verwenden. Sie dürfen sie nicht in einem Tempo abgreifen, das sie für andere beeinträchtigt, und ihre Inhalte nicht in großem Umfang als eigene weiterveröffentlichen.',
  'terms.h2NotAdvice': 'Keine medizinische Beratung',
  'terms.p2':
    'Alles hier ist ein Schätzwert, den eine veröffentlichte Gleichung aus den von Ihnen eingegebenen Zahlen erzeugt hat. Es ist keine medizinische Beratung, keine Diagnose, kein Behandlungsplan und kein Ersatz für eine qualifizierte Fachkraft, die Sie untersuchen kann. Treffen Sie damit keine medizinische Entscheidung.',
  'terms.p3':
    'Wenn Sie eine Essstörung haben oder vermuten, oder wenn Sie schwanger sind, stillen, unter 18 sind oder eine Erkrankung managen, gelten die Zahlen hier nicht für Ihre Situation — die Einschätzung einer Fachkraft schon.',
  'terms.h2Accuracy': 'Genauigkeit',
  'terms.p4':
    'Die Gleichungen sind originalgetreu umgesetzt und gegen durchgerechnete Beispiele aus ihren Quellveröffentlichungen getestet. Die Gleichungen selbst sind Bevölkerungsmittel mit realen Fehlerspannen, die auf jeder Seite angegeben sind. Eine korrekt umgesetzte Gleichung kann bei Ihnen trotzdem deutlich danebenliegen.',
  'terms.h2Liability': 'Haftung',
  'terms.p5':
    'Die Website wird wie besehen bereitgestellt, ohne Gewährleistung jeder Art. Soweit gesetzlich zulässig, wird keine Haftung für Verluste oder Schäden übernommen, die aus der Nutzung der Website oder dem Vertrauen auf ihre Ausgaben entstehen.',
  'terms.h2Ip': 'Inhalte',
  'terms.p6':
    'Text, Layout und Code dieser Website gehören ihrem Betreiber. Die Gleichungen nicht — sie gehören der veröffentlichten Literatur und werden entsprechend zitiert. Aus veröffentlichten Quellen übernommene Referenzwerte bleiben Eigentum ihrer Herausgeber und werden hier mit Quellenangabe verwendet.',
  'terms.h2Law': 'Anwendbares Recht',
  'terms.ownerNotice':
    'PLATZHALTER FÜR DEN BETREIBER: Vor dem Start die juristische Person und den Gerichtsstand für diese Bedingungen benennen. Siehe die Checkliste in DEPLOY.md.',

  'cookies.title': 'Cookies',
  'cookies.description':
    'Welche Cookies diese Website setzt, nämlich keine, und was sich ändern würde, wenn Werbung aktiviert würde.',
  'cookies.p1': 'Diese Website setzt keine Cookies.',
  'cookies.h2Storage': 'Was stattdessen gespeichert wird',
  'cookies.p2':
    'Zwei Einstellungen liegen im localStorage, der kein Cookie ist und nie an einen Server übertragen wird:',
  'cookies.li1':
    'Ihre Vorliebe für helles oder dunkles Design, damit die Seite nicht kurz im falschen Design aufblitzt.',
  'cookies.li2':
    'Ihre Vorliebe für metrische oder imperiale Einheiten, damit Sie sie nicht auf jeder Seite neu setzen müssen.',
  'cookies.p3':
    'Beide lassen sich über die Website-Daten-Einstellungen Ihres Browsers entfernen. Das kostet Sie nichts außer der Einstellung.',
  'cookies.h2Third': 'Cookies Dritter',
  'cookies.p4':
    'Es gibt keine, weil es keine Skripte, Einbettungen, Schriften oder Bilder Dritter gibt. Jede Ressource, die die Website lädt, kommt von ihrer eigenen Domain.',
  'cookies.h2Ads': 'Falls Werbung aktiviert wird',
  'cookies.p5':
    'Werbung ist nicht aktiviert. Der Code zur Anzeige existiert und reserviert seinen Platz im Layout, zeigt aber nichts an. Würde er eingeschaltet, würden Werbepartner eigene Cookies setzen, ein Einwilligungsbanner würde vorher fragen, und diese Seite würde sie auflisten, bevor das geschieht.',

  // --- Chart, activity, lift and distance page templates ---
  'common.related': 'Verwandtes',
  'common.lastReviewed': 'Zuletzt geprüft am {date}.',
  'common.category': 'Kategorie',
  'common.weight': 'Gewicht',
  'common.duration': 'Dauer',
  'chart.workItOut': 'Mit Ihren eigenen Zahlen rechnen',
  'chart.workItOutBody':
    'Diese Tabelle ist aus denselben Gleichungen berechnet wie der Rechner, beide stimmen also immer überein.',
  'chart.relatedGuides': 'Verwandte Ratgeber',
  'activity.h1': 'Kalorienverbrauch: {activity}',
  'activity.metSection': 'Der MET-Wert und woher er stammt',
  'activity.listedAs': 'Geführt als',
  'activity.referenceNote':
    'Bruttoenergie in Kilokalorien. Lesen Sie waagerecht von Ihrem Gewicht und senkrecht von Ihrer Dauer. Eine Person mit 70 kg verbraucht etwa {gross} kcal pro Stunde, davon rund {net} über dem, was Ruhe gekostet hätte.',
  'activity.compareNote':
    'Energieverbrauch in dreißig Minuten bei 70 kg, damit die Aktivitäten direkt vergleichbar sind.',
  'activity.compareCaption': 'Vergleich mit verwandten Aktivitäten',
  'activity.columnKcal30': 'kcal / 30 min',
  'activity.noscript':
    'Live-Ergebnisse brauchen JavaScript. Die Tabelle unten ist vorberechnet und funktioniert auch ohne.',
  'activity.allActivities': 'Alle Aktivitäten',
  'activity.metaDescription':
    'Wie viele Kalorien {activity} verbraucht, nach Körpergewicht und Dauer. Verwendet den veröffentlichten MET-Wert von {met} aus dem Adult Compendium 2024.',
  'lift.enterSet': 'Ihren Satz eintragen',
  'lift.typicalReps': 'Übliche Wiederholungen',
  'lift.percentageTableCaption':
    'Prozentsatz des Einwiederholungsmaximums mit den erwarteten Wiederholungen',
  'lift.repMaxCaption':
    'Geschätztes Einwiederholungsmaximum nach bewegtem Gewicht und Wiederholungen',
  'lift.comparisonHeading': 'Umrechnung von Wiederholungsmaxima und Formelvergleich',
  'lift.comparisonCaption': 'Die fünf Gleichungen im Vergleich für 100 kg mal fünf',
  'distance.enterTime': 'Eine Zielzeit eintragen',
  'search.typeCalculator': 'Rechner',
  'search.typeGuide': 'Ratgeber',
  'search.typePage': 'Seite',
  'search.unavailable':
    'Die Suche ist gerade nicht verfügbar. Das Rechnerverzeichnis listet alles auf.',

  // --- Chart, activity, lift and distance page templates ---
  'metBand.light': 'am leichten Ende',
  'metBand.moderate': 'im moderaten Bereich',
  'metBand.vigorous': 'im intensiven Bereich',
  'metBand.demanding': 'am fordernden Ende',
  'netShare.none': 'nichts',
  'netShare.percent': '{value} Prozent',

  // --- Programmatic page copy ---
  'activity.appName': 'Rechner für den Kalorienverbrauch: {activity}',
  'activity.howToName': 'So ermitteln Sie den Kalorienverbrauch bei {activity}',
  'activity.step1.name': 'Gewicht und Dauer eintragen',
  'activity.step1.text':
    'Wählen Sie metrisch oder imperial und tragen Sie dann Ihr Körpergewicht ein sowie die Zeit, die Sie mit {activity} verbracht haben.',
  'activity.step2.name': 'Ergebnis ablesen',
  'activity.step2.text':
    'Das Ergebnis aktualisiert sich beim Tippen und zeigt die Bruttoenergie sowie den Wert über dem Ruheumsatz.',
  'activity.step3.name': 'MET-Wert und Quelle prüfen',
  'activity.step3.text':
    'Der Compendium-Code und die Beschreibung hinter dem Wert von {met} MET stehen unter dem Rechner.',
  'activity.faq.q1': 'Wie viele Kalorien verbraucht {activity}?',
  'activity.faq.a1':
    'Bei {met} MET verbraucht eine Person mit 70 kg in dreißig Minuten etwa {kcal30} kcal. Der Verbrauch skaliert mit dem Körpergewicht, eine Person mit 90 kg verbraucht bei derselben Einheit also rund ein Drittel mehr.',
  'activity.faq.q2': 'Welchen MET-Wert hat {activity}?',
  'activity.faq.a2':
    '{met} MET, geführt unter dem Compendium-Code {code}. Ein MET ist ein Vielfaches des Ruheumsatzes.',
  'activity.faq.q3': 'Soll ich meinen Ruheumsatz abziehen?',
  'activity.faq.a3':
    'Wenn Sie dies zu einem Erhaltungswert addieren, der die Ruhe bereits enthält, ja. Die Nettozahl entfernt die rund eine MET-Stunde pro Stunde, die Ihr Körper ohnehin verbraucht hätte, womit bei {activity} etwa {netShare} der Bruttomenge übrig bleiben.',
  'activity.faq.q4': 'Warum ändert das Körpergewicht das Ergebnis?',
  'activity.faq.a4':
    'Ein MET-Wert ist Energie pro Kilogramm Körpermasse, dieselbe Aktivität kostet einen schwereren Körper also mehr. Deshalb ist Gewicht eine Eingabe und keine Annahme, und deshalb sind pauschale Kalorienangaben ohne Gewicht nahezu bedeutungslos.',
  'activity.faq.q5': 'Wie genau ist diese Zahl?',
  'activity.faq.a5':
    'Sie ist eine Schätzung aus einem Bevölkerungsmittel. Veröffentlichte Vergleiche mit indirekter Kalorimetrie finden individuelle Abweichungen von zwanzig bis dreißig Prozent — nutzen Sie sie zum Vergleich von Aktivitäten, nicht als Konto, das man nachisst.',
  'lift.h1': '1RM-Rechner für {lift}',
  'lift.metaDescription':
    'Schätzen Sie Ihr Einwiederholungsmaximum beim {liftLower} aus einem Satz, mit allen fünf veröffentlichten Gleichungen im Vergleich und einer Prozenttabelle für Trainingsgewichte.',
  'lift.howToName': 'So schätzen Sie ein Einwiederholungsmaximum beim {liftLower}',
  'lift.step1.name': 'Gewicht und Wiederholungen eintragen',
  'lift.step1.text':
    'Tragen Sie das beim {liftLower} bewegte Gewicht und die Zahl der geschafften Wiederholungen ein.',
  'lift.step2.name': 'Schätzung ablesen',
  'lift.step2.text':
    'Alle fünf Gleichungen werden angezeigt, dazu ihr Mittelwert und eine Prozenttabelle.',
  'lift.step3.name': 'Prüfen, wie sich die Gleichungen bei dieser Übung verhalten',
  'lift.step3.text':
    'Die Anmerkungen unten erklären, wie sich diese Gleichungen auf genau diese Bewegung übertragen.',
  'lift.faq.q1': 'Wie schätze ich mein Maximum beim {liftLower}?',
  'lift.faq.a1':
    'Machen Sie einen Satz bis zum oder nahe ans Muskelversagen, tragen Sie Gewicht und Wiederholungen ein, den Rest erledigen die Gleichungen. Ein schwerer Dreier liefert eine weit verlässlichere Schätzung als ein Satz mit zwölf, denn alle fünf Gleichungen wurden im Bereich von zwei bis zehn Wiederholungen validiert.',
  'lift.faq.q2': 'Sind 1RM-Schätzungen beim {liftLower} genau?',
  'lift.faq.q3': 'Welche Formel soll ich nehmen?',
  'lift.faq.a3':
    'Wathan und Epley folgen den gemessenen Daten über den weitesten Bereich; Brzycki ist die konservativste und bei einer einzigen Wiederholung exakt. Der Mittelwert aller fünf ist als Einzelzahl besser begründbar als jede für sich, und die Spanne zwischen ihnen sagt, wie viel Vertrauen die Schätzung verdient.',
  'lift.faq.q4': 'Welcher Wiederholungsbereich passt zum {liftLower}?',
  'lift.faq.a4':
    'Diese Übung wird üblicherweise im Bereich von {reps} Wiederholungen trainiert. Schätzungen aus diesem Bereich sind am verlässlichsten, weil sie dem Bereich am nächsten liegen, in dem die Gleichungen angepasst wurden.',
  'lift.faq.q5': 'Sollte ich stattdessen ein echtes Maximum testen?',
  'lift.faq.a5':
    'Nur wenn Sie die Zahl für einen Wettkampf brauchen, und dann mit Sicherheitsstellung und vollem Aufwärmen. Fürs Programmieren ist eine Schätzung aus einem schweren Dreier fast ebenso nützlich und kostet deutlich weniger Erholung und Risiko.',
  'distance.h1': 'Pace-Rechner für {distance}',
  'distance.metaDescription':
    'Pace-Tabelle und Rechner für {distance}: Umrechnung zwischen Pace, Geschwindigkeit und Zielzeit, mit Zwischenzeiten und einer ehrlichen Anmerkung zu Wettkampfprognosen.',
  'distance.howToName': 'So ermitteln Sie die Pace über {distanceLower}',
  'distance.step1.name': 'Eine Zielzeit eintragen',
  'distance.step1.text':
    'Tragen Sie eine angestrebte oder tatsächliche {distanceLower}-Zeit als h:mm:ss oder m:ss ein.',
  'distance.step2.name': 'Pace ablesen',
  'distance.step2.text':
    'Pace pro Kilometer und pro Meile, Geschwindigkeit und Zwischenzeiten aktualisieren sich beim Tippen.',
  'distance.step3.name': 'Pace-Tabelle prüfen',
  'distance.step3.text':
    'Die Tabelle unten ordnet jeder Pace im üblichen Bereich eine Zielzeit zu.',
  'distance.faq.q1': 'Welche Pace brauche ich für eine bestimmte {short}-Zeit?',
  'distance.faq.a1':
    'Teilen Sie die Zielzeit durch die Distanz in Kilometern. Für {distance} ergibt {midPace} pro Kilometer eine Zeit von {midTime}. Die Tabelle unten deckt den Bereich ab, in dem die meisten antreten.',
  'distance.faq.q2': 'Wie sollte ich einen {short} einteilen?',
  'distance.faq.q3': 'Was begrenzt die Leistung über {short}?',
  'distance.faq.q4': 'Sind die Hochrechnungen auf andere Distanzen verlässlich?',
  'distance.faq.a4':
    'Nein, und die Seite sagt das auch. Sie setzen voraus, dass dieselbe Pace über eine andere Distanz hält, was nicht stimmt: Die Pace sinkt, wenn die Distanz steigt. Riegels Formel wendet einen Ermüdungsexponenten an und ist das richtige Werkzeug für echte Prognosen.',
  'distance.faq.q5': 'Warum hat die Zwischenzeittabelle einen unvollständigen letzten Abschnitt?',
  'distance.faq.a5':
    'Weil {distance} {km} km lang ist, was keine ganze Zahl an Split-Intervallen ergibt. Der letzte Teilabschnitt wird gezeigt statt weggelassen, denn eine Tabelle, die vor der Ziellinie endet, ist genau dort falsch, wo es zählt.',

  // --- Lift and distance page chrome ---
  'lift.weightLifted': 'Bewegtes Gewicht',
  'lift.reps': 'Wiederholungen',
  'lift.repsUnit': 'Wdh.',
  'lift.formula': 'Formel',
  'lift.noscript':
    'Live-Ergebnisse brauchen JavaScript. Die Tabellen unten sind vorberechnet und funktionieren auch ohne.',
  'lift.specificHeading': 'Speziell zum {lift}',
  'lift.estimateHeading': 'Geschätztes Maximum beim {lift} nach Gewicht und Wiederholungen',
  'lift.estimateNote':
    'Epley-Schätzungen in Kilogramm. Lesen Sie waagerecht vom bewegten Gewicht und senkrecht von den geschafften Wiederholungen. Spalten jenseits von zehn Wiederholungen werden gezeigt, sind aber am unzuverlässigsten.',
  'lift.percentageHeading': 'Prozenttabelle',
  'lift.percentageNote':
    'Trainingsgewichte als Anteil eines Maximums von 100 kg, mit den Wiederholungen, die jeder Prozentsatz üblicherweise zulässt. Rechnen Sie proportional auf Ihre eigene Schätzung um.',
  'lift.columnPercentage': 'Prozent',
  'lift.columnLoad100': 'Gewicht bei 100 kg',
  'lift.columnApproxReps': 'Ungefähre Wiederholungen',
  'lift.conversionHeading': 'Umrechnung von Wiederholungsmaxima',
  'lift.conversionNote':
    'Wofür ein geschätztes Maximum von 100 kg bei jeder Wiederholungszahl steht, und wie die fünf Gleichungen bei einem Satz von 100 kg mal fünf abschneiden.',
  'lift.columnLoadFor100': 'Gewicht für ein Maximum von 100 kg',
  'lift.column100x5': '100 kg × 5 Wdh.',
  'lift.otherLifts': 'Andere Übungen',
  'lift.formulasGuide': 'Worin sich die 1RM-Formeln unterscheiden',
  'distance.finishTime': 'Zielzeit',
  'distance.noscript':
    'Live-Ergebnisse brauchen JavaScript. Die Pace-Tabelle unten ist vorberechnet und funktioniert auch ohne.',
  'distance.aboutHeading': 'Der {distance}',
  'distance.length': 'Distanz: {km} km ({metres} m).',
  'distance.fixedByRules': 'Festgelegt durch World Athletics Competition Rule 55.',
  'distance.chartHeading': 'Pace-Tabelle für {distance}',
  'distance.chartNote':
    'Zielzeit, Pace pro Meile und Geschwindigkeit für jede Pace pro Kilometer. Alles wird in Metern und Sekunden gerechnet und einmal umgerechnet, sodass sich über die Tabelle hinweg keine Rundungsfehler summieren.',
  'distance.columnPaceKm': 'Pace / km',
  'distance.columnPaceMile': 'Pace / Meile',
  'distance.columnSpeed': 'Geschwindigkeit',
  'distance.columnDistance': 'Distanz',
  'distance.columnElapsed': 'Verstrichen',
  'distance.otherDistances': 'Andere Distanzen',
  'distance.paceChartGuide': 'So lesen Sie eine Pace-Tabelle',

  // --- Prose page detail ---
  'about.h2Absent': 'Was bewusst fehlt',
  'about.pAbsent':
    'Manche Rechner fehlen mit Absicht. Nierenfunktion, Körperoberfläche für die Chemotherapiedosierung und Blutalkoholkonzentration liefern Zahlen, die in echte Entscheidungen einfließen, und gehören in ärztliche Hand. Schwangerschafts- und Fruchtbarkeitsrechner sind die am strengsten geprüfte Kategorie im Gesundheitsbereich und werden von etablierten medizinischen Verlagen gut abgedeckt.',
  'about.h2Built': 'Wie die Website gebaut ist',
  'about.pBuilt':
    'Statische Seiten, keine Konten, keine Datenbank. Die Berechnungen laufen in Ihrem Browser, und es gibt keinen Server, an den sie gehen könnten. Jede Formel wird in einer automatisierten Testsuite gegen durchgerechnete Beispiele aus ihrer Quellarbeit geprüft — das fängt die Übertragungsfehler ab, die einen Rechner still und leise falsch machen.',
  'contact.h2NoForm': 'Warum es kein Kontaktformular gibt',
  'contact.pNoForm':
    'Ein Formular braucht ein Ziel für die Übermittlung, also einen Server, also einen Ort, an dem Ihre Nachricht liegt, und noch etwas, das abgesichert werden muss. Diese Website besteht aus statischen Dateien ohne Backend, und genau deshalb kann nichts, was Sie in einen Rechner eintippen, Ihr Gerät verlassen. Eine E-Mail-Adresse ist dafür ein fairer Tausch.',
  'contact.ownerNotice':
    'PLATZHALTER FÜR DEN BETREIBER: Ersetzen Sie die Kontaktadresse in src/config/site.ts vor dem Start. Sie erscheint hier, in der Datenschutzerklärung, in den Nutzungsbedingungen und in security.txt — eine Änderung in dieser einen Datei aktualisiert alle.',

  // --- Short meta title, distinct from the H1 ---
  'lift.metaTitle': '1RM-Rechner: {lift}',

  // --- Short meta title for activity pages ---
  'activity.metaTitle': 'Kalorien: {activity}',
};
