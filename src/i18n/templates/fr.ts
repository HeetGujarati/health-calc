import type { TemplateSet } from './index';

/** French sentence-variation templates. */
export const frTemplates: TemplateSet = {
  activityIntro: [
    "Calculez l'énergie que {activity} dépense selon votre poids et le temps que vous y consacrez. Le chiffre provient de l'équivalent métabolique de l'activité, publié dans le Compendium of Physical Activities.",
    "{Activity} est évaluée à {met} MET, c'est-à-dire qu'elle coûte environ {met} fois plus d'énergie par minute que rester assis sans bouger. Saisissez votre poids et votre durée pour convertir cela en kilocalories.",
    "Cette page convertit la valeur MET publiée de {activity} en un chiffre d'énergie adapté à votre poids. Un corps plus lourd dépense davantage pour la même activité, et c'est pourquoi le poids est une donnée saisie et non une hypothèse.",
    'Énergie dépensée pendant {activity}, calculée à partir de son équivalent métabolique de {met}. Le tableau ci-dessous couvre les poids et durées courants si vous préférez ne rien saisir.',
  ],
  activityMet: [
    "Un MET est un multiple du métabolisme de repos, défini comme une consommation d'oxygène de 3,5 millilitres par kilogramme et par minute. À {met} MET, {activity} coûte à peu près {met} fois ce que votre corps dépense au repos.",
    "Le Compendium attribue à {activity} une valeur de {met} MET. Un MET correspond au coût d'être assis tranquillement, donc cette activité représente environ {met} fois cela par minute pratiquée.",
    'Les équivalents métaboliques expriment le coût énergétique par rapport au repos. {Activity} se situe à {met}, ce qui la place {comparison} dans la gamme que couvre le Compendium.',
    "À {met} MET, {activity} se situe {comparison} par rapport à l'ensemble des activités que recense le Compendium, qui va de 1,0 pour rester assis tranquillement à plus de 20 pour la compétition de haut niveau.",
  ],
  activityAccuracy: [
    'Le chiffre de {met} MET pour {activity} est une moyenne de population. Le Compendium note lui-même que le coût énergétique individuel varie avec la condition physique, la technique, le terrain et la composition corporelle : prenez-le comme un ordre de grandeur, pas comme une mesure.',
    "Ce chiffre est une estimation bâtie sur une moyenne. Deux personnes pratiquant {activity} à la même intensité nominale peuvent différer de vingt pour cent ou plus, et aucune équation n'utilisant que le poids et le temps ne peut le voir.",
    "La précision est limitée par ce qu'une valeur MET peut représenter. C'est un seul nombre qui tient lieu de tout le monde pratiquant {activity}, et le coût réel varie selon l'intensité de l'effort, votre efficacité et les conditions.",
    "Lisez le résultat comme approximatif. Les comparaisons publiées entre estimations dérivées des MET et calorimétrie indirecte relèvent couramment des écarts individuels de vingt à trente pour cent, et {activity} n'y échappe pas.",
  ],
  activityNet: [
    "Le chiffre ci-dessus est l'énergie brute — tout ce qui a été dépensé pendant la séance, y compris le métabolisme de repos que vous auriez consommé de toute façon. Retrancher un MET-heure par heure donne ce que {activity} a réellement ajouté.",
    "Votre corps dépense de l'énergie que vous pratiquiez {activity} ou non. Le chiffre net retire cette base, et c'est le nombre honnête si vous ajoutez ceci à une estimation de maintenance.",
    "Le brut et le net diffèrent d'environ un MET par heure. Pour {activity} à {met} MET, cela signifie qu'environ {netShare} du total est véritablement imputable à l'activité.",
    "Si vous avez déjà choisi un coefficient d'activité qui suppose que vous vous entraînez, ajouter ce chiffre par-dessus compte {activity} deux fois. Utilisez le chiffre net, ou réglez votre niveau d'activité sur sédentaire et ajoutez les séances séparément.",
  ],
  liftIntro: [
    "Estimez votre répétition maximale au {lift} à partir d'une série que vous avez déjà réalisée. Les cinq équations publiées sont affichées, car elles concordent à faible nombre de répétitions et divergent au-delà de dix.",
    "Saisissez une charge et le nombre de répétitions réussies au {lift}. Les cinq équations ci-dessous ont été ajustées sur des données différentes et donnent des réponses différentes ; l'écart entre elles indique la confiance à accorder à l'estimation.",
    "Une estimation de la répétition maximale au {lift}, à partir de n'importe quelle série d'une à vingt répétitions. L'estimation est la plus fiable à partir d'un triple lourd et la moins fiable à partir d'une série menée à l'échec à douze.",
    "Calculez un maximum estimé au {lift} sans avoir à le tester. Le tableau de pourcentages ci-dessous convertit cette estimation en charges d'entraînement.",
  ],
  liftAccuracy: [
    'Les cinq équations ont surtout été validées sur des données de développé couché et de squat. {biasNote}',
    'Les estimations se transposent imparfaitement entre les mouvements. {biasNote}',
    'La qualité de ces équations dépend du mouvement. {biasNote}',
    'Une mise en garde propre à ce mouvement : {biasNote}',
  ],
  distanceIntro: [
    "Convertissez un temps final sur {distance} en allure au kilomètre et au mile, avec les temps de passage et ce que la même allure donnerait sur d'autres distances.",
    "Allure, vitesse et temps de passage pour le {distance}. Saisissez un temps cible pour voir l'allure qu'il exige, ou une allure pour voir le temps final qu'elle produit.",
    "Tout ce qui touche à l'allure sur le {distance} : la conversion entre allure et temps final, un tableau complet de passages, et une note honnête sur les raisons pour lesquelles les projections vers d'autres distances induisent en erreur.",
    "Calculez l'allure sur {distance} à partir d'un temps final, ou un temps final à partir d'une allure. Le tableau ci-dessous couvre la plage dans laquelle la plupart des coureurs concourent.",
  ],
  distanceDemands: [
    'Ce qui limite la performance ici : {demands}',
    'Physiologiquement, le {distance} est borné par {demandsLower}',
    'La contrainte à cette distance : {demandsLower}',
    '{demands}',
  ],
};
