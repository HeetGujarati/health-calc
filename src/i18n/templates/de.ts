import type { TemplateSet } from './index';

/** German sentence-variation templates. */
export const deTemplates: TemplateSet = {
  activityIntro: [
    'Berechnen Sie, wie viel Energie {activity} bei Ihrem Körpergewicht und Ihrer Dauer verbraucht. Die Zahl stammt aus dem metabolischen Äquivalent der Aktivität, veröffentlicht im Compendium of Physical Activities.',
    '{Activity} ist mit {met} MET bewertet, kostet also pro Minute rund {met} mal so viel Energie wie stilles Sitzen. Tragen Sie Gewicht und Dauer ein, um daraus Kilokalorien zu machen.',
    'Diese Seite rechnet den veröffentlichten MET-Wert für {activity} in eine Energiezahl für Ihr Körpergewicht um. Schwerere Körper verbrauchen bei derselben Aktivität mehr, und deshalb ist Gewicht eine Eingabe und keine Annahme.',
    'Energieverbrauch bei {activity}, berechnet aus dem metabolischen Äquivalent von {met}. Die Tabelle unten deckt übliche Gewichte und Dauern ab, falls Sie nichts eintragen möchten.',
  ],
  activityMet: [
    'Ein MET ist ein Vielfaches des Ruheumsatzes, definiert als Sauerstoffaufnahme von 3,5 Millilitern pro Kilogramm und Minute. Bei {met} MET kostet {activity} etwa das {met}-Fache dessen, was Ihr Körper in Ruhe verbraucht.',
    'Das Compendium weist {activity} einen Wert von {met} MET zu. Ein MET ist das, was ruhiges Sitzen kostet, diese Aktivität liegt also pro Minute bei ungefähr dem {met}-Fachen davon.',
    'Metabolische Äquivalente drücken den Energieaufwand relativ zur Ruhe aus. {Activity} liegt bei {met} und damit {comparison} in dem Bereich, den das Compendium abdeckt.',
    'Mit {met} MET liegt {activity} {comparison} gemessen an der gesamten Spanne der im Compendium gelisteten Aktivitäten, die von 1,0 für ruhiges Sitzen bis über 20 für Spitzensport reicht.',
  ],
  activityAccuracy: [
    'Der Wert von {met} MET für {activity} ist ein Bevölkerungsmittel. Das Compendium selbst weist darauf hin, dass der individuelle Energieaufwand mit Fitness, Technik, Gelände und Körperzusammensetzung schwankt — nehmen Sie ihn als Größenordnung, nicht als Messung.',
    'Diese Zahl ist eine Schätzung auf Basis eines Mittelwerts. Zwei Personen, die {activity} mit nominell gleicher Intensität ausüben, können sich um zwanzig Prozent oder mehr unterscheiden, und keine Gleichung, die nur Gewicht und Zeit kennt, sieht das.',
    'Die Genauigkeit ist dadurch begrenzt, was ein MET-Wert überhaupt abbilden kann. Er ist eine einzige Zahl für alle, die {activity} ausüben, und der tatsächliche Aufwand verschiebt sich mit Anstrengung, Effizienz und Bedingungen.',
    'Lesen Sie das Ergebnis als Näherung. Veröffentlichte Vergleiche MET-basierter Schätzungen mit indirekter Kalorimetrie finden regelmäßig individuelle Abweichungen von zwanzig bis dreißig Prozent, und {activity} ist da keine Ausnahme.',
  ],
  activityNet: [
    'Die Zahl oben ist Bruttoenergie — alles, was während der Einheit verbraucht wurde, einschließlich des Ruheumsatzes, den Sie ohnehin gehabt hätten. Ein MET-Stunde pro Stunde abzuziehen ergibt das, was {activity} tatsächlich hinzugefügt hat.',
    'Ihr Körper verbraucht Energie, ob Sie {activity} ausüben oder nicht. Die Nettozahl entfernt diese Grundlinie und ist die ehrliche Zahl, wenn Sie dies zu einer Erhaltungsschätzung addieren.',
    'Brutto und netto unterscheiden sich um rund ein MET pro Stunde. Für {activity} bei {met} MET heißt das, dass etwa {netShare} der Gesamtmenge wirklich der Aktivität zuzurechnen sind.',
    'Wenn Sie bereits einen Aktivitätsfaktor gewählt haben, der Training voraussetzt, zählt diese Zahl obendrauf {activity} doppelt. Nehmen Sie die Nettozahl, oder setzen Sie Ihr Aktivitätsniveau auf sitzend und addieren Sie Einheiten separat.',
  ],
  liftIntro: [
    'Schätzen Sie Ihr Einwiederholungsmaximum beim {lift} aus einem Satz, den Sie bereits gemacht haben. Alle fünf veröffentlichten Gleichungen werden gezeigt, weil sie bei wenigen Wiederholungen übereinstimmen und oberhalb von zehn auseinanderlaufen.',
    'Tragen Sie ein Gewicht und die beim {lift} geschafften Wiederholungen ein. Die fünf Gleichungen unten wurden an unterschiedliche Daten angepasst und liefern unterschiedliche Antworten; die Spanne zwischen ihnen sagt, wie sehr der Schätzung zu trauen ist.',
    'Eine Schätzung des Einwiederholungsmaximums für den {lift}, aus jedem Satz zwischen einer und zwanzig Wiederholungen. Am zuverlässigsten ist sie aus einem schweren Dreier, am unzuverlässigsten aus einem Satz bis zum Muskelversagen bei zwölf.',
    'Ermitteln Sie ein geschätztes Maximum für den {lift}, ohne es zu testen. Die Prozenttabelle unten übersetzt diese Schätzung in Trainingsgewichte.',
  ],
  liftAccuracy: [
    'Die fünf Gleichungen wurden überwiegend an Bankdrück- und Kniebeugedaten validiert. {biasNote}',
    'Schätzungen lassen sich nur unvollkommen zwischen Übungen übertragen. {biasNote}',
    'Wie gut diese Gleichungen funktionieren, hängt von der Übung ab. {biasNote}',
    'Ein Vorbehalt speziell für diese Bewegung: {biasNote}',
  ],
  distanceIntro: [
    'Rechnen Sie eine {distance}-Zielzeit in Pace pro Kilometer und pro Meile um, mit Zwischenzeiten und dem, was dieselbe Pace über andere Distanzen ergäbe.',
    'Pace, Geschwindigkeit und Zwischenzeiten für {distance}. Tragen Sie eine Zielzeit ein, um die nötige Pace zu sehen, oder eine Pace, um die daraus folgende Zielzeit zu sehen.',
    'Alles rund um die Pace über {distance}: die Umrechnung zwischen Pace und Zielzeit, eine vollständige Zwischenzeittabelle und eine ehrliche Anmerkung dazu, warum Hochrechnungen auf andere Distanzen in die Irre führen.',
    'Ermitteln Sie die {distance}-Pace aus einer Zielzeit oder eine Zielzeit aus einer Pace. Die Tabelle unten deckt den Bereich ab, in dem die meisten Läuferinnen und Läufer antreten.',
  ],
  distanceDemands: [
    'Was die Leistung hier begrenzt: {demands}',
    'Physiologisch wird {distance} begrenzt durch {demandsLower}',
    'Die Beschränkung auf dieser Distanz: {demandsLower}',
    '{demands}',
  ],
};
