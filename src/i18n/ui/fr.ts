import type { Messages } from '../../lib/i18n';

/** French UI catalog. */
export const fr: Messages = {
  'nav.main': 'Principale',
  'nav.calculators': 'Calculateurs',
  'nav.charts': 'Tableaux',
  'nav.guides': 'Guides',
  'nav.skipToContent': 'Aller au contenu',
  'nav.breadcrumb': "Fil d'Ariane",
  'nav.home': 'Accueil',
  'nav.useDarkTheme': 'Utiliser le thème sombre',
  'nav.useLightTheme': 'Utiliser le thème clair',
  'nav.language': 'Langue',
  'nav.chooseLanguage': 'Choisir une langue',

  'footer.calculators': 'Calculateurs',
  'footer.about': 'À propos',
  'footer.legal': 'Mentions légales',
  'footer.allCalculators': 'Tous les calculateurs',
  'footer.referenceCharts': 'Tableaux de référence',
  'footer.guides': 'Guides',
  'footer.caloriesByActivity': 'Calories par activité',
  'footer.oneRepMaxByLift': 'Répétition maximale par mouvement',
  'footer.paceByDistance': 'Allure par distance',
  'footer.search': 'Recherche',
  'footer.aboutLink': 'À propos',
  'footer.editorialPolicy': 'Politique éditoriale',
  'footer.accessibility': 'Accessibilité',
  'footer.contact': 'Contact',
  'footer.privacy': 'Confidentialité',
  'footer.terms': 'Conditions',
  'footer.cookies': 'Cookies',
  'footer.disclaimer':
    "{site} donne des estimations issues d'équations publiées, établies à l'échelle d'une population. Les besoins individuels varient, et ceci n'est pas un avis médical. Si votre alimentation, votre poids ou votre image corporelle vous préoccupent, un médecin ou un professionnel qualifié est la bonne personne à qui en parler.",
  'footer.copyright':
    '© {year} {site}. Les formules sont citées sur chaque page ; voir la politique éditoriale.',
  'footer.copyrightLink': 'politique éditoriale',

  'translation.notice':
    "Cette page a été traduite de l'original anglais. Les équations, les sources et les chiffres sont identiques ; si une formulation vous semble maladroite, la page anglaise fait foi.",
  'translation.viewEnglish': "Voir l'original en anglais",

  'home.title': 'Calculateurs de santé et de forme physique',
  'home.description':
    'Calculateurs gratuits de santé et de forme physique fondés sur des équations publiées, chacune citée pour que vous puissiez vérifier la source et voir comment le chiffre a été obtenu.',
  'home.intro':
    "Chaque calculateur utilise une équation publiée, en nomme la source et indique ce que l'équation présuppose. Système métrique et impérial, sans inscription.",

  'category.body-composition': 'Composition corporelle',
  'category.energy': 'Énergie et apports',
  'category.training': 'Entraînement',
  'category.weight-reference': 'Références de poids',

  'hub.calculators.title': 'Tous les calculateurs',
  'hub.calculators.description':
    'Tous les calculateurs du site, regroupés par catégorie. Chacun utilise une équation publiée, en nomme la source et fonctionne en unités métriques ou impériales.',
  'hub.calculators.intro':
    '{count} calculateurs, chacun bâti sur une équation publiée dont la source est citée sur la page. Métrique et impérial partout.',

  'hub.guides.title': 'Guides',
  'hub.guides.description':
    "Explications des équations derrière les calculateurs : d'où elles viennent, ce qu'elles présupposent, où elles échouent et quelle confiance les chiffres méritent.",
  'hub.guides.intro':
    "{count} explications de ce qui se trouve derrière les calculateurs : d'où vient chaque équation, ce qu'elle présuppose et quelle confiance son résultat mérite.",
  'hub.guides.readingTime': '{count} minutes de lecture',

  'hub.charts.title': 'Tableaux de référence',
  'hub.charts.description':
    "Tableaux de référence imprimables pour l'IMC, le poids sain, la masse grasse, les valeurs MET, les pourcentages d'entraînement, les zones de fréquence cardiaque, les protéines, l'allure et plus encore.",
  'hub.charts.intro':
    '{count} tableaux de référence, chacun calculé à partir des mêmes équations que le calculateur auquel il se rattache — les deux ne peuvent donc jamais se contredire. Chaque tableau contient de vraies données avec une explication de sa lecture, et fonctionne sans JavaScript.',

  'hub.activities.title': 'Calories brûlées par activité',
  'hub.activities.description':
    'Énergie dépensée pour {count} activités, chacune avec sa valeur MET publiée et son code Compendium, calculée pour votre poids et votre durée.',
  'hub.activities.intro':
    "{count} activités, chacune avec la valeur MET et le code à cinq chiffres du Compendium of Physical Activities pour adultes de 2024. Chaque valeur provient de la source publiée et non d'un autre calculateur.",
  'hub.activities.tableCaption': 'Activités de {category} et leurs valeurs MET',
  'hub.activities.columnActivity': 'Activité',
  'hub.activities.columnMet': 'MET',
  'hub.activities.columnCode': 'Code',
  'hub.activities.source':
    'Source : Herrmann SD, Willis EA, Ainsworth BE, et al. « 2024 Adult Compendium of Physical Activities ». Journal of Sport and Health Science 13(1), 2024, p. 6–12. Les valeurs MET sont des moyennes de population ; environ 18 % des entrées du Compendium sont estimées plutôt que mesurées.',

  'hub.lifts.title': 'Répétition maximale par mouvement',
  'hub.lifts.description':
    'Estimations de la répétition maximale pour {count} mouvements, chacun avec une note honnête sur le comportement des cinq équations sur ce mouvement précis.',
  'hub.lifts.intro':
    'Les cinq équations de 1RM ont été établies en grande partie à partir de données de développé couché et de squat, et elles ne se transposent pas aussi bien à tous les mouvements. Chaque page ci-dessous indique leur comportement sur ce mouvement.',

  'hub.distances.title': "Tableaux d'allure par distance de course",
  'hub.distances.description':
    "Tableaux d'allure et de temps de passage pour {count} distances de course, de 100 mètres à 50 km, avec conversions entre allure, vitesse et temps final.",
  'hub.distances.intro':
    "{count} distances, chacune avec un tableau d'allure complet, un tableau de passages et une note sur ce qui limite la performance. Les longueurs du marathon et du semi-marathon sont celles fixées par World Athletics.",

  'calc.enterDetails': 'Saisissez vos données',
  'calc.result': 'Résultat',
  'calc.calculate': 'Calculer',
  'calc.noscript':
    'Les résultats en direct nécessitent JavaScript. Le tableau de référence plus bas sur cette page est précalculé et fonctionne sans lui.',
  'calc.howItWorks': 'Comment ce calcul est fait',
  'calc.default': 'par défaut',
  'calc.source': 'Source',
  'calc.assumes': 'Présuppose',
  'calc.accuracy': 'Précision',
  'calc.whichFormula': 'Quelle formule utiliser',
  'calc.defaultsTo': 'Cette page utilise par défaut {formula}. {accuracy}',
  'calc.questions': 'Questions',
  'calc.related': 'À voir aussi',
  'calc.relatedCalculators': 'Calculateurs',
  'calc.relatedGuides': 'Guides',
  'calc.lastReviewed': 'Dernière révision : {date}. Catégorie : {category}.',
  'calc.units': 'Unités',
  'calc.metric': 'Métrique',
  'calc.imperial': 'Impérial',

  'guide.relatedCalculators': 'Calculateurs',
  'guide.relatedGuides': 'Guides liés',
  'guide.meta': '{date} · {count} minutes de lecture',

  'search.title': 'Recherche',
  'search.description': 'Cherchez parmi les calculateurs, les guides et les pages de référence.',
  'search.label': 'Rechercher parmi les calculateurs et les guides',
  'search.submit': 'Rechercher',
  'search.browse': 'Ou parcourir tout le contenu',
  'search.allGuides': 'Tous les guides',
  'search.noResults': 'Aucun résultat pour « {query} ».',
  'search.resultCount': '{count} résultats pour « {query} ».',
  'search.resultCountOne': '1 résultat pour « {query} ».',
  'search.prompt': 'Saisissez du texte pour rechercher.',

  'notFound.title': 'Page introuvable',
  'notFound.description':
    "Cette page n'existe pas. Tous les calculateurs du site sont listés ci-dessous.",
  'notFound.label': 'Erreur 404',
  'notFound.heading': "Cette page n'existe pas",
  'notFound.intro':
    "L'adresse est peut-être mal saisie, ou la page a peut-être été déplacée. Tout ce que le site contient est listé ci-dessous.",
  'notFound.allCalculators': 'Tous les calculateurs',
  'notFound.search': 'Rechercher',
  'notFound.guides': 'Guides',
  'notFound.charts': 'Tableaux',
  'notFound.reportBrokenLink': 'Signaler un lien mort',

  'disclaimer.heading': "Ce que ceci n'est pas",
  'disclaimer.body':
    "Ce sont des estimations issues d'équations établies à l'échelle d'une population, pas une mesure de vous et pas un avis médical. Les résultats individuels varient beaucoup. Parlez à un médecin ou à un diététicien avant de modifier sensiblement votre alimentation ou votre entraînement.",

  'chart.howToRead': 'Comment lire ce tableau',
  'chart.relatedCalculator': 'Calculateur',
  'chart.source': 'Source',

  'activity.metValue': 'Valeur MET',
  'activity.compendiumCode': 'Code Compendium',
  'activity.referenceTable': 'Calories brûlées selon le poids et la durée',
  'activity.compare': 'Comparaison avec des activités proches',
  'activity.columnWeight': 'Poids corporel',

  'lift.percentageTable': "Pourcentages d'entraînement",
  'lift.repMaxTable': 'Conversions de répétitions maximales',
  'lift.notes': 'Notes sur ce mouvement',

  'distance.paceChart': "Tableau d'allure",
  'distance.splits': 'Temps de passage',
  'distance.notes': 'Notes sur cette distance',

  'consent.heading': 'Cookies',
  'consent.body':
    "Ce site n'utilise aucun cookie publicitaire ni de mesure d'audience. Si cela venait à changer, cet avis vous demanderait d'abord votre accord.",
  'consent.accept': 'Accepter',
  'consent.reject': 'Refuser',

  'about.title': 'À propos',
  'about.description':
    "Ce qu'est ce site, comment les calculateurs sont construits, et ce que les chiffres peuvent ou ne peuvent pas vous dire.",
  'about.p1':
    "Ce site existe parce que la plupart des calculateurs de fitness ne disent pas d'où viennent leurs chiffres. Vous saisissez votre taille et votre poids, un nombre apparaît, et rien ne permet de savoir quelle équation l'a produit, sur quelle population elle a été établie, ni de combien elle peut se tromper pour quelqu'un comme vous.",
  'about.p2':
    "Chaque calculateur ici nomme l'équation qu'il utilise, cite l'article dont elle provient, indique ce que cette équation présuppose de la personne à qui elle s'applique, et dit sa précision par rapport aux autres. Là où plusieurs équations publiées divergent — et pour la masse grasse et le métabolisme de base elles divergent nettement —, la page montre le désaccord au lieu de le masquer derrière un chiffre unique.",
  'about.p3':
    "Les calculs s'exécutent dans votre navigateur. Rien de ce que vous saisissez n'est envoyé ailleurs, stocké sur un serveur ou journalisé. Pas de compte, pas de collecte d'adresse e-mail, pas de script de suivi.",
  'about.h2Limits': 'Ce que ces chiffres ne sont pas',
  'about.p4':
    'Chaque équation ici a été obtenue en ajustant une courbe à des mesures faites sur un groupe précis de personnes. Cet ajustement est bon en moyenne et peut être mauvais pour un individu donné : une équation avec une erreur type de 4 points de pourcentage se trompe de davantage pour une minorité non négligeable de gens. Les équations de composition corporelle en particulier ont surtout été établies sur des échantillons petits, jeunes et majoritairement blancs, et se transposent imparfaitement à tous les autres.',
  'about.p5':
    "Rien de tout cela n'est un avis médical, un diagnostic, ni un substitut à une conversation avec un clinicien capable de vous mesurer réellement.",

  'contact.title': 'Contact',
  'contact.description':
    "Comment signaler une erreur dans une formule, un lien mort ou un problème d'accessibilité.",
  'contact.p1':
    "Si une formule est fausse, si une citation ne correspond pas à sa source, si un lien est mort ou si quelque chose est inutilisable au clavier ou au lecteur d'écran, dites-le. Les corrections apportées aux équations sont ce qu'on peut envoyer de plus précieux.",
  'contact.emailLabel': 'E-mail',
  'contact.p2':
    "Indiquez l'adresse de la page et, pour une correction de formule, la source publiée sur laquelle vous vous appuyez. Cela rend la correction vérifiable plutôt qu'affaire d'opinion.",
  'contact.h2Response': "À quoi s'attendre",
  'contact.p3':
    "C'est un petit site tenu par une seule personne. Les corrections de formules et les problèmes d'accessibilité passent avant tout le reste.",

  'a11y.title': 'Accessibilité',
  'a11y.description':
    "La norme d'accessibilité visée par ce site, la manière dont elle a été testée, et comment signaler un problème.",
  'a11y.p1':
    "Ce site vise le niveau AA des WCAG 2.2. C'est un engagement sur la façon dont il est construit, pas une certification délivrée par qui que ce soit.",
  'a11y.h2What': 'Ce que cela signifie concrètement',
  'a11y.li1':
    'Chaque page fonctionne au clavier seul, dans un ordre logique, avec un indicateur de focus visible.',
  'a11y.li2':
    'Chaque champ de formulaire a une véritable étiquette, et non un texte indicatif qui en tiendrait lieu.',
  'a11y.li3':
    "Les résultats des calculateurs sont annoncés poliment au lecteur d'écran au fil des changements, sans déplacer le focus hors du champ en cours de saisie.",
  'a11y.li4':
    "Le contraste du texte est d'au moins 4,5:1, et celui des bordures d'interface d'au moins 3:1, dans les deux thèmes.",
  'a11y.li5': 'Les cibles tactiles font au moins 44 sur 44 pixels.',
  'a11y.li6': "L'animation est supprimée lorsque le système demande un mouvement réduit.",
  'a11y.li7':
    "Chaque tableau de référence est rendu en HTML réel avec de vraies cellules d'en-tête, pas sous forme d'image.",
  'a11y.h2Testing': 'Comment cela a été testé',
  'a11y.p2':
    "Des vérifications automatiques tournent à chaque build : validation HTML incluant des règles propres aux WCAG, et un audit d'accessibilité Lighthouse qui fait échouer le build en dessous de 95. Les rapports de contraste sont recalculés à partir des jetons de design par un test unitaire, si bien qu'un changement de couleur qui casse le contraste échoue au lieu d'être publié. L'utilisation des calculateurs au clavier est couverte par des tests de bout en bout.",
  'a11y.p3':
    "Les tests automatiques ne détectent qu'une minorité des problèmes d'accessibilité. Si vous butez sur quelque chose que ces contrôles ont manqué, merci de le signaler.",
  'a11y.h2Known': 'Limites connues',
  'a11y.p4':
    "Les trois polices hébergées sur le site ne couvrent que les écritures latines. Les pages en hindi, en japonais et en arabe se rabattent sur les polices système pour ces écritures, ce qui s'affiche correctement mais ne correspond pas typographiquement aux pages latines.",

  'editorial.title': 'Politique éditoriale',
  'editorial.description':
    'Comment les formules sont choisies, comment les sources sont citées, ce qui est refusé, et à quelle fréquence les pages sont révisées.',
  'editorial.h2Selection': 'Comment les formules sont choisies',
  'editorial.p1':
    "Un calculateur n'est publié que si son équation est publiée, attribuable et vérifiable. Cela veut dire un article nommé, une réglementation nommée ou une norme institutionnelle nommée — pas un autre site, pas une application de fitness, et pas une équation qui circule sans origine.",
  'editorial.p2':
    'Lorsque plusieurs équations existent pour la même grandeur, la page en implémente plusieurs et montre en quoi elles divergent. Celle par défaut est celle dont la validation est la mieux documentée dans la population adulte générale, et la page dit pourquoi.',
  'editorial.h2Citation': 'Comment les sources sont citées',
  'editorial.p3':
    "Chaque formule du site porte sa citation complète sur la page qui l'utilise : auteurs, titre, revue, année. La citation renvoie à la publication d'origine, pas à une source secondaire qui l'aurait reprise. Lorsqu'une valeur vient d'une table de référence plutôt que d'une équation — les valeurs MET, par exemple —, le code précis et l'édition sont donnés pour que l'entrée puisse être retrouvée.",
  'editorial.h2Refused': 'Ce que ce site ne fera pas',
  'editorial.li1':
    'Il ne recommandera pas un apport inférieur à 1 500 kcal pour les hommes ou 1 200 kcal pour les femmes, ni un déficit supérieur à 25 % de la maintenance ou 1 000 kcal par jour, selon ce qui est le plus faible.',
  'editorial.li2':
    'Il ne produira pas de plan vers un poids cible correspondant à un IMC inférieur à 18,5, et explique pourquoi au lieu de refuser en silence.',
  'editorial.li3':
    "Il ne renverra pas d'objectifs caloriques ou de masse grasse pour les moins de 18 ans.",
  'editorial.li4':
    'Il ne décrira pas un corps comme bon, mauvais, idéal ou à corriger. Les catégories portent le nom que leur donne la norme publiée, et rien de plus.',
  'editorial.li5':
    "Il n'inventera ni auteur, ni relecteur médical, ni note, ni nombre d'avis. Rien sur ce site n'est attribué à une personne qui ne l'a pas écrit.",
  'editorial.h2Review': 'Rythme de révision',
  'editorial.p4':
    "Chaque page porte la date réelle de sa dernière révision de contenu. Cette date change quand le contenu change, et pas autrement — une page dont la date de révision bouge à chaque build ne vous apprend rien. Les pages de formules sont recontrôlées face à leurs sources quand une source est révisée ; la norme de composition corporelle de l'armée américaine, par exemple, a changé en 2026, et la page a changé avec elle.",
  'editorial.h2Corrections': 'Corrections',
  'editorial.p5':
    "Si une formule ici ne correspond pas à la source citée, c'est un défaut et il sera corrigé. Signalez-le via la page de contact en indiquant la source sur laquelle vous vous appuyez.",

  'privacy.title': 'Confidentialité',
  'privacy.description':
    "Ce que ce site collecte, c'est-à-dire presque rien, et quels sont vos droits au titre du RGPD et du CCPA.",
  'privacy.lastUpdated': 'Dernière mise à jour : {date}.',
  'privacy.p1':
    "Tous les calculs de ce site s'exécutent dans votre navigateur. La taille, le poids, l'âge et les autres chiffres que vous saisissez ne sont jamais transmis, jamais stockés sur un serveur et jamais journalisés. Fermer l'onglet les efface.",
  'privacy.h2Collect': 'Ce qui est collecté',
  'privacy.p2':
    "Pas de mesure d'audience, pas de publicité, pas de pixels de suivi, aucun script tiers d'aucune sorte. Le site n'effectue aucune requête réseau vers un domaine autre que celui qui le sert.",
  'privacy.p3':
    "Deux choses sont conservées localement dans votre navigateur via localStorage et ne quittent jamais votre appareil : votre préférence de thème clair ou sombre, et votre préférence d'unités métriques ou impériales. Vous pouvez effacer les deux depuis les réglages de votre navigateur.",
  'privacy.h2Server': 'Journaux du serveur',
  'privacy.p4':
    "L'hébergeur statique enregistre des journaux de requêtes standard — adresse IP, horodatage, chemin demandé, agent utilisateur —, comme tout serveur web. Ce sont les journaux de l'hébergeur, conservés selon sa politique, et ce site ne les lit ni ne les traite.",
  'privacy.h2Future': 'Si de la publicité est ajoutée',
  'privacy.p5':
    "La publicité n'est pas activée. Si elle l'était un jour, une bannière de consentement demanderait votre accord avant tout dépôt de cookie publicitaire, cette page serait mise à jour au préalable, et le changement serait daté ici.",
  'privacy.h2Rights': 'Vos droits',
  'privacy.p6':
    "Au titre du RGPD et du CCPA, vous disposez de droits d'accès, de rectification, d'effacement, de portabilité et d'opposition sur les données personnelles qu'un site détient à votre sujet. Ce site n'en détient aucune : il n'y a donc rien à consulter ni à effacer — mais si vous pensez le contraire, écrivez à l'adresse de contact et cela sera examiné.",
  'privacy.h2Children': 'Confidentialité des mineurs',
  'privacy.p7':
    "Ce site ne s'adresse pas aux enfants de moins de 13 ans et ne collecte rien de personne. Les calculateurs qui produisent des objectifs caloriques ou de masse grasse refusent de le faire pour les moins de 18 ans.",
  'privacy.h2Changes': 'Modifications',
  'privacy.p8':
    'Les modifications substantielles de cette politique seront reflétées par la date ci-dessus et décrites dans le journal des modifications.',
  'privacy.ownerNotice':
    "MARQUEUR PROPRIÉTAIRE : avant la mise en ligne, ajoutez la raison sociale, l'adresse postale et le contact de protection des données exigés par l'article 13 du RGPD. Voir la liste de contrôle dans DEPLOY.md.",

  'terms.title': 'Conditions',
  'terms.description':
    "Les conditions dans lesquelles ce site est fourni, y compris les limites de l'usage qui peut être fait de ses estimations.",
  'terms.h2Use': 'Utilisation du site',
  'terms.p1':
    "Ce site est gratuit. Vous pouvez utiliser les chiffres qu'il produit pour vos propres besoins. Vous ne pouvez pas l'aspirer à un rythme qui le dégrade pour les autres, ni republier son contenu en bloc comme s'il était le vôtre.",
  'terms.h2NotAdvice': 'Pas un avis médical',
  'terms.p2':
    "Tout ce qui figure ici est une estimation produite par une équation publiée appliquée aux chiffres que vous avez fournis. Ce n'est pas un avis médical, pas un diagnostic, pas un plan de traitement, et pas un substitut à un professionnel qualifié capable de vous examiner. Ne vous en servez pas pour prendre une décision médicale.",
  'terms.p3':
    "Si vous souffrez ou soupçonnez souffrir d'un trouble du comportement alimentaire, ou si vous êtes enceinte, allaitante, mineure ou atteinte d'une pathologie, les chiffres présentés ici ne s'appliquent pas à votre situation, contrairement à l'avis d'un clinicien.",
  'terms.h2Accuracy': 'Exactitude',
  'terms.p4':
    "Les équations sont implémentées fidèlement et testées face à des exemples résolus tirés de leurs publications d'origine. Les équations elles-mêmes sont des moyennes de population assorties de marges d'erreur réelles, indiquées sur chaque page. Une équation correctement implémentée peut malgré tout se tromper nettement pour vous.",
  'terms.h2Liability': 'Responsabilité',
  'terms.p5':
    "Le site est fourni en l'état, sans garantie d'aucune sorte. Dans toute la mesure permise par la loi, aucune responsabilité n'est acceptée pour une perte ou un dommage résultant de l'usage du site ou de la confiance placée dans ses résultats.",
  'terms.h2Ip': 'Contenu',
  'terms.p6':
    'Le texte, la mise en page et le code de ce site appartiennent à son exploitant. Les équations, non : elles appartiennent à la littérature publiée et sont citées en conséquence. Les valeurs de référence reproduites de sources publiées restent la propriété de leurs éditeurs et sont utilisées ici avec attribution.',
  'terms.h2Law': 'Droit applicable',
  'terms.ownerNotice':
    'MARQUEUR PROPRIÉTAIRE : avant la mise en ligne, indiquez la raison sociale et la juridiction compétente pour ces conditions. Voir la liste de contrôle dans DEPLOY.md.',

  'cookies.title': 'Cookies',
  'cookies.description':
    'Quels cookies ce site dépose, à savoir aucun, et ce qui changerait si la publicité était activée.',
  'cookies.p1': 'Ce site ne dépose aucun cookie.',
  'cookies.h2Storage': 'Ce qui est stocké à la place',
  'cookies.p2':
    "Deux préférences sont conservées dans localStorage, qui n'est pas un cookie et n'est jamais transmis à un serveur :",
  'cookies.li1':
    "Votre préférence de thème clair ou sombre, pour que la page n'affiche pas brièvement le mauvais thème.",
  'cookies.li2':
    "Votre préférence d'unités métriques ou impériales, pour ne pas avoir à la régler à chaque page.",
  'cookies.p3':
    'Les deux peuvent être supprimées via les réglages de données de site de votre navigateur. Les supprimer ne vous coûte que la préférence.',
  'cookies.h2Third': 'Cookies tiers',
  'cookies.p4':
    "Il n'y en a aucun, parce qu'il n'y a aucun script, aucune intégration, aucune police ni aucune image tierce. Chaque ressource chargée par le site provient de son propre domaine.",
  'cookies.h2Ads': 'Si la publicité est activée',
  'cookies.p5':
    "La publicité n'est pas activée. Le code qui l'afficherait existe et réserve sa place dans la mise en page, mais n'affiche rien. Si elle était activée, les partenaires publicitaires déposeraient leurs propres cookies, une bannière de consentement demanderait votre accord avant tout dépôt, et cette page les énumérerait avant que cela n'arrive.",
};
