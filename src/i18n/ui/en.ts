/**
 * English UI strings — the source of truth for the key space.
 *
 * Flat, not nested. A nested catalog lets a locale drift structurally: an
 * object where a string was expected, an array one element short, a branch
 * quietly missing. Flat keys make every locale file exactly the same shape, so
 * `Record<MessageKey, string>` is a complete and sufficient contract, and the
 * compiler rejects a locale the moment a key is missing or misspelled.
 *
 * Placeholders are `{name}` and are substituted by `t()`. A placeholder that a
 * translation drops or invents fails `i18n.test.ts`, because a missing count in
 * a sentence is a bug the compiler cannot see.
 *
 * Prose that belongs to a *page* rather than the chrome — the legal pages, the
 * editorial policy — lives here too. Keeping it in the catalog rather than in
 * the .astro file is what makes those pages translatable at all.
 */
export const en = {
  // --- Chrome ---------------------------------------------------------------
  'nav.main': 'Main',
  'nav.calculators': 'Calculators',
  'nav.charts': 'Charts',
  'nav.guides': 'Guides',
  'nav.skipToContent': 'Skip to content',
  'nav.breadcrumb': 'Breadcrumb',
  'nav.home': 'Home',
  'nav.useDarkTheme': 'Use dark theme',
  'nav.useLightTheme': 'Use light theme',
  'nav.language': 'Language',
  'nav.chooseLanguage': 'Choose a language',

  'footer.calculators': 'Calculators',
  'footer.about': 'About',
  'footer.legal': 'Legal',
  'footer.allCalculators': 'All calculators',
  'footer.referenceCharts': 'Reference charts',
  'footer.guides': 'Guides',
  'footer.caloriesByActivity': 'Calories by activity',
  'footer.oneRepMaxByLift': 'One rep max by lift',
  'footer.paceByDistance': 'Pace by distance',
  'footer.search': 'Search',
  'footer.aboutLink': 'About',
  'footer.editorialPolicy': 'Editorial policy',
  'footer.accessibility': 'Accessibility',
  'footer.contact': 'Contact',
  'footer.privacy': 'Privacy',
  'footer.terms': 'Terms',
  'footer.cookies': 'Cookies',
  'footer.disclaimer':
    '{site} gives estimates from published, population-level equations. Individual needs vary, and this is not medical advice. If you have concerns about eating, weight or body image, a doctor or a qualified professional is the right place to take them.',
  'footer.copyright':
    '© {year} {site}. Formulas are cited on every page; see the editorial policy.',
  'footer.copyrightLink': 'editorial policy',

  // --- Translation provenance ----------------------------------------------
  'translation.notice':
    'This page was translated from the English original. The equations, sources and numbers are identical; if a phrase reads badly, the English page is authoritative.',
  'translation.viewEnglish': 'View the English original',

  // --- Home -----------------------------------------------------------------
  'home.title': 'Health and fitness calculators',
  'home.description':
    'Free health and fitness calculators built on published equations, each one cited so you can check the source and see how the number was reached.',
  'home.intro':
    'Every calculator here uses a published equation, names its source, and shows what the equation assumes. Metric and imperial, no sign-up.',

  // --- Calculator categories ------------------------------------------------
  'category.body-composition': 'Body composition',
  'category.energy': 'Energy and intake',
  'category.training': 'Training',
  'category.weight-reference': 'Weight reference',
  'category.cycle': 'Menstrual cycle',

  // --- Calculators hub ------------------------------------------------------
  'hub.calculators.title': 'All calculators',
  'hub.calculators.description':
    'Every calculator on the site, grouped by category. Each one uses a published equation, names its source, and works in metric or imperial.',
  'hub.calculators.intro':
    '{count} calculators, each built on a published equation with its source cited on the page. Metric and imperial throughout.',

  // --- Guides hub -----------------------------------------------------------
  'hub.guides.title': 'Guides',
  'hub.guides.description':
    'Explanations of the equations behind the calculators: where they came from, what they assume, where they fail, and how much confidence the numbers deserve.',
  'hub.guides.intro':
    '{count} explanations of what sits behind the calculators — where each equation came from, what it assumes, and how much confidence its output deserves.',
  'hub.guides.readingTime': '{count} minute read',

  // --- Charts hub -----------------------------------------------------------
  'hub.charts.title': 'Reference charts',
  'hub.charts.description':
    'Printable reference tables for BMI, healthy weight, body fat, MET values, training percentages, heart rate zones, protein, pace and more.',
  'hub.charts.intro':
    '{count} reference tables, each computed from the same equations as the calculator it belongs to — so the two can never disagree. Every chart is real rendered data with an explanation of how to read it, and works with JavaScript disabled.',

  // --- Calories burned hub --------------------------------------------------
  'hub.activities.title': 'Calories burned by activity',
  'hub.activities.description':
    'Energy used by {count} activities, each with its published MET value and Compendium code, computed for your body weight and duration.',
  'hub.activities.intro':
    '{count} activities, each with the MET value and five-digit code from the 2024 Adult Compendium of Physical Activities. Every value was taken from the published source rather than from another calculator.',
  'hub.activities.tableCaption': '{category} activities and their MET values',
  'hub.activities.columnActivity': 'Activity',
  'hub.activities.columnMet': 'METs',
  'hub.activities.columnCode': 'Code',
  'hub.activities.source':
    'Source: Herrmann SD, Willis EA, Ainsworth BE, et al. "2024 Adult Compendium of Physical Activities." Journal of Sport and Health Science 13(1), 2024, pp. 6–12. MET values are population averages; roughly 18% of Compendium entries are estimated rather than measured.',

  // --- One rep max hub ------------------------------------------------------
  'hub.lifts.title': 'One rep max by lift',
  'hub.lifts.description':
    'One rep max estimates for {count} lifts, each with an honest note on how the five equations behave on that specific movement.',
  'hub.lifts.intro':
    'The five 1RM equations were derived largely from bench press and squat data, and they do not transfer equally to every movement. Each page below says how they behave on that lift.',

  // --- Pace hub -------------------------------------------------------------
  'hub.distances.title': 'Pace charts by race distance',
  'hub.distances.description':
    'Pace charts and split tables for {count} race distances, from 100 metres to 50 km, with conversions between pace, speed and finish time.',
  'hub.distances.intro':
    '{count} distances, each with a full pace chart, a split table and a note on what limits performance there. Marathon and half marathon lengths are the ones fixed by World Athletics.',

  // --- Calculator page chrome ----------------------------------------------
  'calc.enterDetails': 'Enter your details',
  'calc.result': 'Result',
  'calc.calculate': 'Calculate',
  'calc.noscript':
    'Live results need JavaScript. The reference table further down this page is precomputed and works without it.',
  'calc.howItWorks': 'How this is calculated',
  'calc.default': 'default',
  'calc.source': 'Source',
  'calc.assumes': 'Assumes',
  'calc.accuracy': 'Accuracy',
  'calc.whichFormula': 'Which formula should you use',
  'calc.defaultsTo': 'This page defaults to {formula}. {accuracy}',
  'calc.questions': 'Questions',
  'calc.related': 'Related',
  'calc.relatedCalculators': 'Calculators',
  'calc.relatedGuides': 'Guides',
  'calc.lastReviewed': 'Last reviewed {date}. Category: {category}.',
  'calc.units': 'Units',
  'calc.metric': 'Metric',
  'calc.imperial': 'Imperial',

  // --- Guide page -----------------------------------------------------------
  'guide.relatedCalculators': 'Calculators',
  'guide.relatedGuides': 'Related guides',
  'guide.meta': '{date} · {count} minute read',

  // --- Search ---------------------------------------------------------------
  'search.title': 'Search',
  'search.description': 'Search the calculators, guides and reference pages on this site.',
  'search.label': 'Search calculators and guides',
  'search.submit': 'Search',
  'search.browse': 'Or browse everything',
  'search.allGuides': 'All guides',
  'search.noResults': 'No results for "{query}". Try a shorter or more general term.',
  'search.resultCount': '{count} results for "{query}".',
  'search.resultCountOne': '1 result for "{query}".',
  'search.prompt': 'Type to search.',

  // --- 404 ------------------------------------------------------------------
  'notFound.title': 'Page not found',
  'notFound.description': 'That page does not exist. Every calculator on the site is listed below.',
  'notFound.label': 'Error 404',
  'notFound.heading': 'That page does not exist',
  'notFound.intro':
    'The address may be mistyped, or the page may have moved. Everything the site has is listed below.',
  'notFound.allCalculators': 'All calculators',
  'notFound.search': 'Search',
  'notFound.guides': 'Guides',
  'notFound.charts': 'Charts',
  'notFound.reportBrokenLink': 'Report a broken link',

  // --- Disclaimer -----------------------------------------------------------
  'disclaimer.heading': 'What this is not',
  'disclaimer.body':
    'These are estimates from population-level equations, not a measurement of you and not medical advice. Individual results vary widely. Talk to a doctor or a registered dietitian before making significant changes to how you eat or train.',

  // --- Charts ---------------------------------------------------------------
  'chart.howToRead': 'How to read this chart',
  'chart.relatedCalculator': 'Calculator',
  'chart.source': 'Source',

  // --- Activity pages -------------------------------------------------------
  'activity.metValue': 'MET value',
  'activity.compendiumCode': 'Compendium code',
  'activity.referenceTable': 'Calories burned by body weight and duration',
  'activity.compare': 'Compared with related activities',
  'activity.columnWeight': 'Body weight',

  // --- Lift pages -----------------------------------------------------------
  'lift.percentageTable': 'Training percentages',
  'lift.repMaxTable': 'Rep max conversions',
  'lift.notes': 'Notes on this lift',

  // --- Distance pages -------------------------------------------------------
  'distance.paceChart': 'Pace chart',
  'distance.splits': 'Split times',
  'distance.notes': 'Notes on this distance',

  // --- Consent banner -------------------------------------------------------
  'consent.heading': 'Cookies',
  'consent.body':
    'This site uses no advertising or analytics cookies. If that ever changes, this notice will ask first.',
  'consent.accept': 'Accept',
  'consent.reject': 'Reject',

  // --- About ----------------------------------------------------------------
  'about.title': 'About',
  'about.description':
    'What this site is, how the calculators are built, and what the numbers can and cannot tell you.',
  'about.p1':
    'This site exists because most fitness calculators do not tell you where their numbers come from. You enter your height and weight, a figure appears, and there is no way to know which equation produced it, what population it was derived from, or how far off it might be for someone like you.',
  'about.p2':
    'Every calculator here names the equation it uses, cites the paper it came from, states what that equation assumes about the person it is applied to, and says how accurate it is relative to the alternatives. Where several published equations disagree — and for body fat and basal metabolic rate they disagree substantially — the page shows the disagreement rather than hiding it behind one number.',
  'about.p3':
    'The calculations run in your browser. Nothing you type is sent anywhere, stored on a server, or logged. There is no account, no email capture and no tracking script.',
  'about.h2Limits': 'What these numbers are not',
  'about.p4':
    'Every equation here was derived by fitting a curve to measurements from a specific group of people. That fit is good on average and can be poor for any given individual — an equation with a standard error of 4 percentage points is off by more than that for a substantial minority of people. Body composition equations in particular were mostly derived from small, young, mostly white samples, and they transfer imperfectly to everyone else.',
  'about.p5':
    'None of this is medical advice, none of it is a diagnosis, and none of it replaces a conversation with a clinician who can actually measure you.',

  // --- Contact --------------------------------------------------------------
  'contact.title': 'Contact',
  'contact.description':
    'How to report an error in a formula, a broken link or an accessibility problem.',
  'contact.p1':
    'If a formula is wrong, a citation does not match its source, a link is broken or something on the site is unusable with a keyboard or a screen reader, please say so. Corrections to the equations are the most valuable thing anyone can send.',
  'contact.emailLabel': 'Email',
  'contact.p2':
    'Please include the page address and, for a formula correction, the published source you are working from. That makes the fix verifiable rather than a matter of opinion.',
  'contact.h2Response': 'What to expect',
  'contact.p3':
    'This is a small site run by one person. Corrections to formulas and accessibility problems are prioritised over everything else.',

  // --- Accessibility --------------------------------------------------------
  'a11y.title': 'Accessibility',
  'a11y.description':
    'The accessibility standard this site targets, how it was tested, and how to report a problem.',
  'a11y.p1':
    'This site targets WCAG 2.2 Level AA. That is a commitment about how it is built, not a certification anyone issued.',
  'a11y.h2What': 'What that means in practice',
  'a11y.li1':
    'Every page works with a keyboard alone, in a logical order, with a focus indicator you can see.',
  'a11y.li2': 'Every form control has a real label, not a placeholder standing in for one.',
  'a11y.li3':
    'Calculator results are announced politely to a screen reader as they change, without moving focus away from the field being typed into.',
  'a11y.li4':
    'Text contrast is at least 4.5:1, and interface borders at least 3:1, in both themes.',
  'a11y.li5': 'Touch targets are at least 44 by 44 pixels.',
  'a11y.li6': 'Animation is suppressed when the system asks for reduced motion.',
  'a11y.li7':
    'Every reference table is rendered as real HTML with proper header cells, not as an image.',
  'a11y.h2Testing': 'How it was tested',
  'a11y.p2':
    'Automated checks run on every build: HTML validation including WCAG-specific rules, and a Lighthouse accessibility audit that fails the build below 95. Contrast ratios are recomputed from the design tokens by a unit test, so a colour change that breaks contrast fails rather than shipping. Keyboard operation of the calculators is covered by end-to-end tests.',
  'a11y.p3':
    'Automated testing catches a minority of accessibility problems. If you hit something these checks missed, please report it.',
  'a11y.h2Known': 'Known limitations',
  'a11y.p4':
    'The three self-hosted typefaces cover Latin scripts only. Pages in Hindi, Japanese and Arabic fall back to the system font stack for those scripts, which renders correctly but does not match the Latin pages typographically.',

  // --- Editorial policy -----------------------------------------------------
  'editorial.title': 'Editorial policy',
  'editorial.description':
    'How formulas are chosen, how sources are cited, what gets refused, and how often pages are reviewed.',
  'editorial.h2Selection': 'How formulas are chosen',
  'editorial.p1':
    'A calculator ships only if its equation is published, attributable and checkable. That means a named paper, a named regulation or a named institutional standard — not another website, not a fitness app, and not an equation that circulates without an origin.',
  'editorial.p2':
    'Where several equations exist for the same quantity, the page implements more than one and shows how they disagree. The default is the one with the best-documented validation in the general adult population, and the page says why it is the default.',
  'editorial.h2Citation': 'How sources are cited',
  'editorial.p3':
    'Every formula on the site carries its full citation on the page that uses it: authors, title, journal, year. The citation is the original publication, not a secondary source that reproduced it. Where a value comes from a reference table rather than an equation — MET values, for instance — the specific code and edition are given so the entry can be looked up.',
  'editorial.h2Refused': 'What this site will not do',
  'editorial.li1':
    'It will not recommend an intake below 1,500 kcal for men or 1,200 kcal for women, or a deficit larger than 25% of maintenance or 1,000 kcal per day, whichever is smaller.',
  'editorial.li2':
    'It will not produce a plan towards a goal weight below a BMI of 18.5, and says why rather than silently refusing.',
  'editorial.li3': 'It will not return calorie or body-fat targets for anyone under 18.',
  'editorial.li4':
    'It will not describe a body as good, bad, ideal or in need of fixing. Categories are named as the published standard names them and nothing more.',
  'editorial.li5':
    'It will not invent an author, a medical reviewer, a rating or a review count. Nothing on this site is attributed to a person who did not write it.',
  'editorial.h2Review': 'Review cadence',
  'editorial.p4':
    'Every page carries the real date its content was last reviewed. That date changes when the content changes and not otherwise — a page whose last-reviewed date moves on every build is telling you nothing. Formula pages are re-checked against their sources when a source is revised; the Army body composition standard, for instance, changed in 2026 and the page changed with it.',
  'editorial.h2Corrections': 'Corrections',
  'editorial.p5':
    'If a formula here does not match its cited source, that is a bug and it will be fixed. Report it through the contact page with the source you are working from.',

  // --- Privacy --------------------------------------------------------------
  'privacy.title': 'Privacy',
  'privacy.description':
    'What this site collects, which is almost nothing, and what your rights are under GDPR and CCPA.',
  'privacy.lastUpdated': 'Last updated {date}.',
  'privacy.p1':
    'Every calculation on this site runs in your browser. The height, weight, age and other figures you enter are never transmitted, never stored on a server and never logged. Closing the tab discards them.',
  'privacy.h2Collect': 'What is collected',
  'privacy.p2':
    'No analytics, no advertising, no tracking pixels, no third-party scripts of any kind. The site makes no network requests to any domain other than the one serving it.',
  'privacy.p3':
    'Two things are stored locally in your browser, using localStorage, and never leave your device: your light or dark theme preference, and your metric or imperial unit preference. You can clear both through your browser settings.',
  'privacy.h2Server': 'Server logs',
  'privacy.p4':
    "The static hosting provider records standard request logs — IP address, timestamp, requested path, user agent — as every web server does. These are the host's records, retained under their policy, and this site neither reads nor processes them.",
  'privacy.h2Future': 'If advertising is added',
  'privacy.p5':
    'Advertising is not enabled. If it is added in future, a consent banner will ask before any advertising cookie is set, this page will be updated first, and the change will be dated here.',
  'privacy.h2Rights': 'Your rights',
  'privacy.p6':
    'Under the GDPR and the CCPA you have rights of access, correction, deletion, portability and objection over personal data a site holds about you. This site holds none, so there is nothing to access or delete — but if you believe otherwise, write to the contact address and it will be investigated.',
  'privacy.h2Children': "Children's privacy",
  'privacy.p7':
    'This site is not directed at children under 13 and collects nothing from anyone. Calculators that produce calorie or body-fat targets decline to do so for anyone under 18.',
  'privacy.h2Changes': 'Changes',
  'privacy.p8':
    'Material changes to this policy will be reflected in the date above and described in the changelog.',
  'privacy.ownerNotice':
    'OWNER PLACEHOLDER: before launch, add the legal entity name, postal address and data-protection contact required by GDPR Article 13. See the checklist in DEPLOY.md.',

  // --- Terms ----------------------------------------------------------------
  'terms.title': 'Terms',
  'terms.description':
    'The terms under which this site is provided, including the limits of what its estimates can be used for.',
  'terms.h2Use': 'Use of the site',
  'terms.p1':
    'This site is free to use. You may use the numbers it produces for your own purposes. You may not scrape it at a rate that degrades it for others, or republish its content wholesale as your own.',
  'terms.h2NotAdvice': 'Not medical advice',
  'terms.p2':
    'Everything here is an estimate produced by a published equation applied to numbers you supplied. It is not medical advice, not a diagnosis, not a treatment plan, and not a substitute for a qualified professional who can examine you. Do not use it to make a medical decision.',
  'terms.p3':
    "If you have or suspect an eating disorder, or you are pregnant, breastfeeding, under 18, or managing a medical condition, the numbers here do not apply to your situation and a clinician's guidance does.",
  'terms.h2Accuracy': 'Accuracy',
  'terms.p4':
    'The equations are implemented faithfully and tested against worked examples from their source publications. The equations themselves are population averages with real error margins, stated on each page. A correctly implemented equation can still be substantially wrong for you.',
  'terms.h2Liability': 'Liability',
  'terms.p5':
    'The site is provided as is, without warranty of any kind. To the fullest extent permitted by law, no liability is accepted for any loss or harm arising from use of the site or reliance on its output.',
  'terms.h2Ip': 'Content',
  'terms.p6':
    'The text, layout and code of this site belong to its operator. The equations do not — they belong to the published literature and are cited accordingly. Reference values reproduced from published sources remain the property of their publishers and are used here with attribution.',
  'terms.h2Law': 'Governing law',
  'terms.ownerNotice':
    'OWNER PLACEHOLDER: before launch, name the legal entity and the governing jurisdiction for these terms. See the checklist in DEPLOY.md.',

  // --- Cookies --------------------------------------------------------------
  'cookies.title': 'Cookies',
  'cookies.description':
    'Which cookies this site sets, which is none, and what would change if advertising were enabled.',
  'cookies.p1': 'This site sets no cookies.',
  'cookies.h2Storage': 'What is stored instead',
  'cookies.p2':
    'Two preferences are kept in localStorage, which is not a cookie and is never transmitted to any server:',
  'cookies.li1': 'Your light or dark theme preference, so the page does not flash the wrong theme.',
  'cookies.li2': 'Your metric or imperial unit preference, so you do not reset it on every page.',
  'cookies.p3':
    "Both are removable through your browser's site-data settings. Removing them costs you nothing but the preference.",
  'cookies.h2Third': 'Third-party cookies',
  'cookies.p4':
    "There are none, because there are no third-party scripts, embeds, fonts or images. Every asset the site loads comes from the site's own domain.",
  'cookies.h2Ads': 'If advertising is enabled',
  'cookies.p5':
    'Advertising is not enabled. The code to display it exists and reserves its space in the layout, but renders nothing. If it is switched on, advertising partners would set their own cookies, a consent banner would ask before any of them were set, and this page would list them before that happened.',

  // --- Chart, activity, lift and distance page templates ---
  'common.related': 'Related',
  'common.lastReviewed': 'Last reviewed {date}.',
  'common.category': 'Category',
  'common.weight': 'Weight',
  'common.duration': 'Duration',
  'chart.workItOut': 'Work it out for your own numbers',
  'chart.workItOutBody':
    'This chart is computed from the same equations as the calculator, so the two always agree.',
  'chart.relatedGuides': 'Related guides',
  'activity.h1': 'Calories burned {activity}',
  'activity.metSection': 'The MET value and where it comes from',
  'activity.listedAs': 'Listed as',
  'activity.referenceNote':
    'Gross energy in kilocalories. Read across from your weight and down from your duration. A 70 kg person uses about {gross} kcal an hour, of which roughly {net} is above what resting would have cost.',
  'activity.compareNote':
    'Energy used per thirty minutes at 70 kg, so the activities are directly comparable.',
  'activity.compareCaption': 'Comparison with related activities',
  'activity.columnKcal30': 'kcal / 30 min',
  'activity.noscript':
    'Live results need JavaScript. The table below is precomputed and works without it.',
  'activity.allActivities': 'All activities',
  'activity.metaDescription':
    'How many calories {activity} burns, by body weight and duration. Uses the published MET value of {met} from the 2024 Adult Compendium.',
  'lift.enterSet': 'Enter your set',
  'lift.typicalReps': 'Typical reps',
  'lift.percentageTableCaption': 'Percentage of one rep max with expected repetitions',
  'lift.repMaxCaption': 'Estimated one rep max by weight lifted and repetitions',
  'lift.comparisonHeading': 'Rep max conversion and formula comparison',
  'lift.comparisonCaption': 'The five equations compared for 100 kg times five',
  'distance.enterTime': 'Enter a finish time',
  'search.typeCalculator': 'Calculator',
  'search.typeGuide': 'Guide',
  'search.typePage': 'Page',
  'search.unavailable':
    'Search is unavailable right now. The calculator directory lists everything.',

  // --- Chart, activity, lift and distance page templates ---
  'metBand.light': 'toward the light end',
  'metBand.moderate': 'in the moderate band',
  'metBand.vigorous': 'in the vigorous band',
  'metBand.demanding': 'toward the demanding end',
  'netShare.none': 'none',
  'netShare.percent': '{value} per cent',

  // --- Programmatic page copy ---
  'activity.appName': 'Calories burned {activity} calculator',
  'activity.howToName': 'How to work out calories burned {activity}',
  'activity.step1.name': 'Enter your weight and duration',
  'activity.step1.text':
    'Choose metric or imperial, then enter your body weight and how long you spent {activity}.',
  'activity.step2.name': 'Read the result',
  'activity.step2.text':
    'The result updates as you type, showing gross energy and the figure above resting.',
  'activity.step3.name': 'Check the MET value and its source',
  'activity.step3.text':
    'The Compendium code and description behind the {met} MET value are shown below the calculator.',
  'activity.faq.q1': 'How many calories does {activity} burn?',
  'activity.faq.a1':
    'At {met} METs, a 70 kg person uses about {kcal30} kcal in thirty minutes. Energy use scales with body weight, so a 90 kg person uses roughly a third more for the same session.',
  'activity.faq.q2': 'What is the MET value for {activity}?',
  'activity.faq.a2':
    '{met} METs, listed under Compendium code {code}. A MET is a multiple of resting metabolic rate.',
  'activity.faq.q3': 'Should I subtract my resting metabolism?',
  'activity.faq.a3':
    'If you are adding this to a maintenance figure that already includes rest, yes. The net figure removes the roughly one MET-hour per hour your body would have spent anyway, which for {activity} leaves about {netShare} of the gross total.',
  'activity.faq.q4': 'Why does body weight change the answer?',
  'activity.faq.a4':
    'A MET value is energy per kilogram of body mass, so the same activity costs more for a heavier body. That is why weight is an input rather than an assumption, and why generic calories-burned figures without a weight are close to meaningless.',
  'activity.faq.q5': 'How accurate is this figure?',
  'activity.faq.a5':
    'It is an estimate from a population average. Published comparisons against indirect calorimetry find individual discrepancies of twenty to thirty per cent, so use it to compare activities rather than as a ledger to eat back.',
  'lift.h1': '{lift} one rep max calculator',
  'lift.metaDescription':
    'Estimate your {liftLower} one rep max from a set, with all five published equations compared and a percentage table for training loads.',
  'lift.howToName': 'How to estimate a {liftLower} one rep max',
  'lift.step1.name': 'Enter the weight and repetitions',
  'lift.step1.text':
    'Enter the weight you lifted on the {liftLower} and how many repetitions you completed.',
  'lift.step2.name': 'Read the estimate',
  'lift.step2.text':
    'All five equations are shown, along with their average and a percentage table.',
  'lift.step3.name': 'Check how the equations behave on this lift',
  'lift.step3.text':
    'The notes below explain how these equations transfer to this movement specifically.',
  'lift.faq.q1': 'How do I estimate my {liftLower} max?',
  'lift.faq.a1':
    'Take a set to or near failure, enter the weight and the repetitions, and the equations do the rest. A heavy triple gives a far more reliable estimate than a set of twelve, because all five equations were validated in the two to ten repetition range.',
  'lift.faq.q2': 'Are 1RM estimates accurate for the {liftLower}?',
  'lift.faq.q3': 'Which formula should I use?',
  'lift.faq.a3':
    'Wathan and Epley track measured data across the widest range; Brzycki is the most conservative and is exact at a single repetition. The average of all five is a more defensible single number than any one of them, and the spread between them tells you how much confidence the estimate deserves.',
  'lift.faq.q4': 'What repetition range suits the {liftLower}?',
  'lift.faq.a4':
    'This lift is usually trained in the {reps} repetition range. Estimates taken from within that range are the most trustworthy, because they sit closest to where the equations were fitted.',
  'lift.faq.q5': 'Should I test a true maximum instead?',
  'lift.faq.a5':
    'Only if you need the number for competition, and then with a spotter and a full warm-up. For programming, an estimate from a heavy triple is nearly as useful and costs far less recovery and risk.',
  'distance.h1': '{distance} pace calculator',
  'distance.metaDescription':
    '{distance} pace chart and calculator: convert between pace, speed and finish time, with splits and an honest note on race projections.',
  'distance.howToName': 'How to work out {distanceLower} pace',
  'distance.step1.name': 'Enter a finish time',
  'distance.step1.text': 'Enter a target or actual {distanceLower} time as h:mm:ss or m:ss.',
  'distance.step2.name': 'Read the pace',
  'distance.step2.text': 'Pace per kilometre and per mile, speed, and splits update as you type.',
  'distance.step3.name': 'Check the pace chart',
  'distance.step3.text': 'The chart below maps every pace in the usual range to a finish time.',
  'distance.faq.q1': 'What pace do I need for a given {short} time?',
  'distance.faq.a1':
    'Divide the target time by the distance in kilometres. For the {distance}, {midPace} per kilometre gives {midTime}. The chart below covers the range most runners race in.',
  'distance.faq.q2': 'How should I pace a {short}?',
  'distance.faq.q3': 'What limits performance over the {short}?',
  'distance.faq.q4': 'Are the projections to other distances reliable?',
  'distance.faq.a4':
    "No, and the page says so. They assume the same pace holds over a different distance, which it does not — pace falls as distance rises. Riegel's formula applies a fatigue exponent and is the right tool for actual prediction.",
  'distance.faq.q5': 'Why does the split table have a partial final segment?',
  'distance.faq.a5':
    'Because {distance} is {km} km, which is not a whole number of split intervals. The final partial segment is shown rather than dropped, since a table that ends before the finish line is wrong exactly where it matters.',

  // --- Lift and distance page chrome ---
  'lift.weightLifted': 'Weight lifted',
  'lift.reps': 'Repetitions',
  'lift.repsUnit': 'reps',
  'lift.formula': 'Formula',
  'lift.noscript':
    'Live results need JavaScript. The tables below are precomputed and work without it.',
  'lift.specificHeading': 'The {lift} specifically',
  'lift.estimateHeading': 'Estimated {lift} max by weight and reps',
  'lift.estimateNote':
    'Epley estimates in kilograms. Read across from the weight you lifted and down from the repetitions you managed. Columns beyond ten repetitions are shown but are the least reliable.',
  'lift.percentageHeading': 'Percentage table',
  'lift.percentageNote':
    'Training loads as a share of a 100 kg maximum, with the repetitions each percentage typically allows. Scale proportionally to your own estimate.',
  'lift.columnPercentage': 'Percentage',
  'lift.columnLoad100': 'Load from 100 kg',
  'lift.columnApproxReps': 'Approximate reps',
  'lift.conversionHeading': 'Rep-max conversion',
  'lift.conversionNote':
    'What a 100 kg estimated maximum corresponds to at each repetition count, and how the five equations compare for a 100 kg set of five.',
  'lift.columnLoadFor100': 'Load for a 100 kg max',
  'lift.column100x5': '100 kg × 5 reps',
  'lift.otherLifts': 'Other lifts',
  'lift.formulasGuide': 'How 1RM formulas differ',
  'distance.finishTime': 'Finish time',
  'distance.noscript':
    'Live results need JavaScript. The pace chart below is precomputed and works without it.',
  'distance.aboutHeading': 'The {distance}',
  'distance.length': 'Distance: {km} km ({metres} m).',
  'distance.fixedByRules': 'Fixed by World Athletics Competition Rule 55.',
  'distance.chartHeading': '{distance} pace chart',
  'distance.chartNote':
    'Finish time, pace per mile and speed for each pace per kilometre. Everything is computed in metres and seconds and converted once, so no rounding accumulates down the table.',
  'distance.columnPaceKm': 'Pace / km',
  'distance.columnPaceMile': 'Pace / mile',
  'distance.columnSpeed': 'Speed',
  'distance.columnDistance': 'Distance',
  'distance.columnElapsed': 'Elapsed',
  'distance.otherDistances': 'Other distances',
  'distance.paceChartGuide': 'How to read a pace chart',

  // --- Prose page detail ---
  'about.h2Absent': 'What is deliberately missing',
  'about.pAbsent':
    'Some calculators are absent on purpose. Kidney function, body surface area for chemotherapy dosing and blood alcohol content all produce numbers that feed real decisions, and they belong with a clinician. Due date, ovulation and conception calculators are the highest-scrutiny category in health and are properly served by established medical publishers. Projecting period dates from a cycle length is arithmetic and is published here.',
  'about.h2Built': 'How it is built',
  'about.pBuilt':
    'Static pages, no accounts, no database. The calculations run in your browser and there is no server to send them to. Every formula is checked against worked examples from its source paper in an automated test suite, which is what catches the transcription errors that quietly make a calculator wrong.',
  'contact.h2NoForm': 'Why there is no contact form',
  'contact.pNoForm':
    'A form needs somewhere to send the submission, which means a server, which means somewhere your message is stored and something else to secure. This site is static files with no backend, and keeping it that way is the reason nothing you type into a calculator can leave your device. An email address is a fair trade for that.',
  'contact.ownerNotice':
    'OWNER PLACEHOLDER: replace the contact address in src/config/site.ts before launch. It appears here, in the privacy policy, in the terms and in security.txt, and changing that one file updates all of them.',

  // --- Short meta title, distinct from the H1 ---
  'lift.metaTitle': '{lift} one rep max calculator',

  // --- Short meta title for activity pages ---
  'activity.metaTitle': 'Calories burned {activity}',

  // --- Imperial height sub-fields, which need their own labels ---
  'calc.heightFeet': 'Height, feet',
  'calc.heightInches': 'Height, inches',
} as const;
