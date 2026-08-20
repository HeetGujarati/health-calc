import type { Messages } from '../../lib/i18n';

/** Brazilian Portuguese UI catalog. */
export const ptBR: Messages = {
  'nav.main': 'Principal',
  'nav.calculators': 'Calculadoras',
  'nav.charts': 'Tabelas',
  'nav.guides': 'Guias',
  'nav.skipToContent': 'Ir para o conteúdo',
  'nav.breadcrumb': 'Trilha de navegação',
  'nav.home': 'Início',
  'nav.useDarkTheme': 'Usar tema escuro',
  'nav.useLightTheme': 'Usar tema claro',
  'nav.language': 'Idioma',
  'nav.chooseLanguage': 'Escolher idioma',

  'footer.calculators': 'Calculadoras',
  'footer.about': 'Informações',
  'footer.legal': 'Jurídico',
  'footer.allCalculators': 'Todas as calculadoras',
  'footer.referenceCharts': 'Tabelas de referência',
  'footer.guides': 'Guias',
  'footer.caloriesByActivity': 'Calorias por atividade',
  'footer.oneRepMaxByLift': 'Uma repetição máxima por exercício',
  'footer.paceByDistance': 'Ritmo por distância',
  'footer.search': 'Buscar',
  'footer.aboutLink': 'Sobre',
  'footer.editorialPolicy': 'Política editorial',
  'footer.accessibility': 'Acessibilidade',
  'footer.contact': 'Contato',
  'footer.privacy': 'Privacidade',
  'footer.terms': 'Termos',
  'footer.cookies': 'Cookies',
  'footer.disclaimer':
    'O {site} fornece estimativas a partir de equações publicadas de nível populacional. As necessidades individuais variam, e isto não é orientação médica. Se você tem preocupações com alimentação, peso ou imagem corporal, um médico ou profissional qualificado é o lugar certo para levá-las.',
  'footer.copyright':
    '© {year} {site}. As fórmulas são citadas em todas as páginas; veja a política editorial.',
  'footer.copyrightLink': 'política editorial',

  'translation.notice':
    'Esta página foi traduzida do original em inglês. As equações, as fontes e os números são idênticos; se alguma frase soar mal, a página em inglês é a versão de referência.',
  'translation.viewEnglish': 'Ver o original em inglês',

  'home.title': 'Calculadoras de saúde e condicionamento físico',
  'home.description':
    'Calculadoras gratuitas de saúde e condicionamento físico baseadas em equações publicadas, cada uma com a fonte citada para você conferir e ver como o número foi obtido.',
  'home.intro':
    'Toda calculadora aqui usa uma equação publicada, indica sua fonte e mostra o que a equação pressupõe. Sistema métrico e imperial, sem cadastro.',

  'category.body-composition': 'Composição corporal',
  'category.energy': 'Energia e ingestão',
  'category.training': 'Treino',
  'category.weight-reference': 'Referência de peso',
  'category.cycle': 'Ciclo menstrual',

  'hub.calculators.title': 'Todas as calculadoras',
  'hub.calculators.description':
    'Todas as calculadoras do site, agrupadas por categoria. Cada uma usa uma equação publicada, indica sua fonte e funciona em sistema métrico ou imperial.',
  'hub.calculators.intro':
    '{count} calculadoras, cada uma construída sobre uma equação publicada com a fonte citada na página. Sistema métrico e imperial em todas elas.',

  'hub.guides.title': 'Guias',
  'hub.guides.description':
    'Explicações das equações por trás das calculadoras: de onde vieram, o que pressupõem, onde falham e quanta confiança os números merecem.',
  'hub.guides.intro':
    '{count} explicações do que está por trás das calculadoras: de onde veio cada equação, o que ela pressupõe e quanta confiança seu resultado merece.',
  'hub.guides.readingTime': '{count} minutos de leitura',

  'hub.charts.title': 'Tabelas de referência',
  'hub.charts.description':
    'Tabelas de referência imprimíveis de IMC, peso saudável, gordura corporal, valores MET, percentuais de treino, zonas de frequência cardíaca, proteína, ritmo e mais.',
  'hub.charts.intro':
    '{count} tabelas de referência, cada uma calculada com as mesmas equações da calculadora à qual pertence — de modo que as duas nunca possam divergir. Toda tabela traz dados reais com uma explicação de como lê-la e funciona com o JavaScript desativado.',

  'hub.activities.title': 'Calorias gastas por atividade',
  'hub.activities.description':
    'Energia gasta em {count} atividades, cada uma com seu valor MET publicado e código do Compendium, calculada para o seu peso corporal e sua duração.',
  'hub.activities.intro':
    '{count} atividades, cada uma com o valor MET e o código de cinco dígitos do Compendium of Physical Activities para adultos de 2024. Todos os valores foram tirados da fonte publicada, não de outra calculadora.',
  'hub.activities.tableCaption': 'Atividades de {category} e seus valores MET',
  'hub.activities.columnActivity': 'Atividade',
  'hub.activities.columnMet': 'MET',
  'hub.activities.columnCode': 'Código',
  'hub.activities.source':
    'Fonte: Herrmann SD, Willis EA, Ainsworth BE, et al. "2024 Adult Compendium of Physical Activities". Journal of Sport and Health Science 13(1), 2024, pp. 6–12. Os valores MET são médias populacionais; cerca de 18% das entradas do Compendium são estimadas, e não medidas.',

  'hub.lifts.title': 'Uma repetição máxima por exercício',
  'hub.lifts.description':
    'Estimativas de uma repetição máxima para {count} exercícios, cada um com uma nota honesta sobre como as cinco equações se comportam naquele movimento específico.',
  'hub.lifts.intro':
    'As cinco equações de 1RM foram derivadas em grande parte de dados de supino e agachamento, e não se transferem igualmente bem para todos os movimentos. Cada página abaixo diz como elas se comportam naquele exercício.',

  'hub.distances.title': 'Tabelas de ritmo por distância de prova',
  'hub.distances.description':
    'Tabelas de ritmo e de parciais para {count} distâncias de prova, de 100 metros a 50 km, com conversões entre ritmo, velocidade e tempo final.',
  'hub.distances.intro':
    '{count} distâncias, cada uma com uma tabela de ritmo completa, uma tabela de parciais e uma nota sobre o que limita o desempenho nela. As distâncias da maratona e da meia maratona são as fixadas pela World Athletics.',

  'calc.enterDetails': 'Informe seus dados',
  'calc.result': 'Resultado',
  'calc.calculate': 'Calcular',
  'calc.noscript':
    'Resultados ao vivo exigem JavaScript. A tabela de referência mais abaixo nesta página é pré-calculada e funciona sem ele.',
  'calc.howItWorks': 'Como isto é calculado',
  'calc.default': 'padrão',
  'calc.source': 'Fonte',
  'calc.assumes': 'Pressupõe',
  'calc.accuracy': 'Precisão',
  'calc.whichFormula': 'Qual fórmula você deve usar',
  'calc.defaultsTo': 'Esta página usa por padrão {formula}. {accuracy}',
  'calc.questions': 'Perguntas',
  'calc.related': 'Relacionados',
  'calc.relatedCalculators': 'Calculadoras',
  'calc.relatedGuides': 'Guias',
  'calc.lastReviewed': 'Última revisão: {date}. Categoria: {category}.',
  'calc.units': 'Unidades',
  'calc.metric': 'Métrico',
  'calc.imperial': 'Imperial',

  'guide.relatedCalculators': 'Calculadoras',
  'guide.relatedGuides': 'Guias relacionados',
  'guide.meta': '{date} · {count} minutos de leitura',

  'search.title': 'Buscar',
  'search.description': 'Busque nas calculadoras, nos guias e nas páginas de referência do site.',
  'search.label': 'Buscar calculadoras e guias',
  'search.submit': 'Buscar',
  'search.browse': 'Ou navegue por tudo',
  'search.allGuides': 'Todos os guias',
  'search.noResults': 'Nenhum resultado para "{query}".',
  'search.resultCount': '{count} resultados para "{query}".',
  'search.resultCountOne': '1 resultado para "{query}".',
  'search.prompt': 'Digite para buscar.',

  'notFound.title': 'Página não encontrada',
  'notFound.description':
    'Essa página não existe. Todas as calculadoras do site estão listadas abaixo.',
  'notFound.label': 'Erro 404',
  'notFound.heading': 'Essa página não existe',
  'notFound.intro':
    'O endereço pode estar digitado errado, ou a página pode ter sido movida. Tudo o que o site tem está listado abaixo.',
  'notFound.allCalculators': 'Todas as calculadoras',
  'notFound.search': 'Buscar',
  'notFound.guides': 'Guias',
  'notFound.charts': 'Tabelas',
  'notFound.reportBrokenLink': 'Relatar um link quebrado',

  'disclaimer.heading': 'O que isto não é',
  'disclaimer.body':
    'São estimativas de equações de nível populacional, não uma medição de você e não orientação médica. Os resultados individuais variam muito. Converse com um médico ou nutricionista antes de fazer mudanças significativas em como você come ou treina.',

  'chart.howToRead': 'Como ler esta tabela',
  'chart.relatedCalculator': 'Calculadora',
  'chart.source': 'Fonte',

  'activity.metValue': 'Valor MET',
  'activity.compendiumCode': 'Código do Compendium',
  'activity.referenceTable': 'Calorias gastas por peso corporal e duração',
  'activity.compare': 'Comparação com atividades relacionadas',
  'activity.columnWeight': 'Peso corporal',

  'lift.percentageTable': 'Percentuais de treino',
  'lift.repMaxTable': 'Conversões de repetições máximas',
  'lift.notes': 'Notas sobre este exercício',

  'distance.paceChart': 'Tabela de ritmo',
  'distance.splits': 'Tempos parciais',
  'distance.notes': 'Notas sobre esta distância',

  'consent.heading': 'Cookies',
  'consent.body':
    'Este site não usa cookies de publicidade nem de análise. Se isso mudar algum dia, este aviso perguntará antes.',
  'consent.accept': 'Aceitar',
  'consent.reject': 'Recusar',

  'about.title': 'Sobre',
  'about.description':
    'O que é este site, como as calculadoras são construídas e o que os números podem e não podem dizer a você.',
  'about.p1':
    'Este site existe porque a maioria das calculadoras de fitness não diz de onde vêm seus números. Você informa altura e peso, um valor aparece, e não há como saber qual equação o produziu, de que população ela foi derivada ou o quanto ela pode errar para alguém como você.',
  'about.p2':
    'Toda calculadora aqui indica a equação que usa, cita o artigo de onde ela veio, declara o que essa equação pressupõe sobre a pessoa a quem é aplicada e diz o quão precisa é em relação às alternativas. Onde várias equações publicadas divergem — e para gordura corporal e taxa metabólica basal elas divergem bastante —, a página mostra a divergência em vez de escondê-la atrás de um único número.',
  'about.p3':
    'Os cálculos rodam no seu navegador. Nada do que você digita é enviado a lugar algum, armazenado em servidor ou registrado. Não há conta, captura de e-mail nem script de rastreamento.',
  'about.h2Limits': 'O que estes números não são',
  'about.p4':
    'Toda equação aqui foi obtida ajustando uma curva a medições de um grupo específico de pessoas. Esse ajuste é bom na média e pode ser ruim para qualquer indivíduo: uma equação com erro padrão de 4 pontos percentuais erra por mais do que isso para uma minoria considerável das pessoas. As equações de composição corporal, em particular, foram derivadas sobretudo de amostras pequenas, jovens e majoritariamente brancas, e se transferem de forma imperfeita para todo o resto.',
  'about.p5':
    'Nada disto é orientação médica, nem diagnóstico, nem substitui uma conversa com um profissional de saúde que possa de fato medir você.',

  'contact.title': 'Contato',
  'contact.description':
    'Como relatar um erro em uma fórmula, um link quebrado ou um problema de acessibilidade.',
  'contact.p1':
    'Se uma fórmula estiver errada, uma citação não corresponder à fonte, um link estiver quebrado ou algo no site for inutilizável com teclado ou leitor de tela, por favor avise. Correções às equações são a coisa mais valiosa que alguém pode enviar.',
  'contact.emailLabel': 'E-mail',
  'contact.p2':
    'Inclua o endereço da página e, para uma correção de fórmula, a fonte publicada com que você está trabalhando. Isso torna a correção verificável, em vez de uma questão de opinião.',
  'contact.h2Response': 'O que esperar',
  'contact.p3':
    'Este é um site pequeno tocado por uma pessoa só. Correções de fórmulas e problemas de acessibilidade têm prioridade sobre todo o resto.',

  'a11y.title': 'Acessibilidade',
  'a11y.description':
    'O padrão de acessibilidade que este site busca atender, como ele foi testado e como relatar um problema.',
  'a11y.p1':
    'Este site busca o nível AA da WCAG 2.2. Isso é um compromisso sobre como ele é construído, não uma certificação emitida por alguém.',
  'a11y.h2What': 'O que isso significa na prática',
  'a11y.li1':
    'Toda página funciona apenas com teclado, em ordem lógica e com um indicador de foco visível.',
  'a11y.li2':
    'Todo controle de formulário tem um rótulo real, não um texto de espaço reservado fazendo as vezes de rótulo.',
  'a11y.li3':
    'Os resultados das calculadoras são anunciados de forma educada ao leitor de tela conforme mudam, sem tirar o foco do campo em que você está digitando.',
  'a11y.li4':
    'O contraste do texto é de pelo menos 4,5:1, e o das bordas de interface de pelo menos 3:1, nos dois temas.',
  'a11y.li5': 'Os alvos de toque têm pelo menos 44 por 44 pixels.',
  'a11y.li6': 'A animação é suprimida quando o sistema pede movimento reduzido.',
  'a11y.li7':
    'Toda tabela de referência é renderizada como HTML real com células de cabeçalho adequadas, não como imagem.',
  'a11y.h2Testing': 'Como foi testado',
  'a11y.p2':
    'Verificações automáticas rodam a cada build: validação de HTML incluindo regras específicas da WCAG e uma auditoria de acessibilidade do Lighthouse que reprova o build abaixo de 95. As razões de contraste são recalculadas a partir dos tokens de design por um teste unitário, de modo que uma mudança de cor que quebre o contraste falha em vez de ir ao ar. A operação por teclado das calculadoras é coberta por testes de ponta a ponta.',
  'a11y.p3':
    'Testes automáticos capturam uma minoria dos problemas de acessibilidade. Se você esbarrar em algo que essas verificações não pegaram, por favor relate.',
  'a11y.h2Known': 'Limitações conhecidas',
  'a11y.p4':
    'As três tipografias hospedadas no próprio site cobrem apenas a escrita latina. As páginas em híndi, japonês e árabe recorrem à pilha de fontes do sistema para essas escritas, o que exibe corretamente mas não combina tipograficamente com as páginas latinas.',

  'editorial.title': 'Política editorial',
  'editorial.description':
    'Como as fórmulas são escolhidas, como as fontes são citadas, o que é recusado e com que frequência as páginas são revisadas.',
  'editorial.h2Selection': 'Como as fórmulas são escolhidas',
  'editorial.p1':
    'Uma calculadora só vai ao ar se sua equação for publicada, atribuível e verificável. Isso significa um artigo com nome, uma norma com nome ou um padrão institucional com nome — não outro site, não um aplicativo de fitness e não uma equação que circula sem origem.',
  'editorial.p2':
    'Onde existem várias equações para a mesma grandeza, a página implementa mais de uma e mostra em que elas divergem. A padrão é aquela com a validação mais bem documentada na população adulta geral, e a página diz por que ela é a padrão.',
  'editorial.h2Citation': 'Como as fontes são citadas',
  'editorial.p3':
    'Toda fórmula do site traz sua citação completa na página que a usa: autores, título, periódico, ano. A citação é a publicação original, não uma fonte secundária que a reproduziu. Onde um valor vem de uma tabela de referência em vez de uma equação — os valores MET, por exemplo —, o código específico e a edição são informados para que a entrada possa ser consultada.',
  'editorial.h2Refused': 'O que este site não vai fazer',
  'editorial.li1':
    'Não vai recomendar uma ingestão abaixo de 1.500 kcal para homens ou 1.200 kcal para mulheres, nem um déficit maior que 25% da manutenção ou 1.000 kcal por dia, o que for menor.',
  'editorial.li2':
    'Não vai produzir um plano rumo a um peso-alvo com IMC abaixo de 18,5, e diz por quê em vez de recusar em silêncio.',
  'editorial.li3':
    'Não vai devolver metas de calorias ou de gordura corporal para menores de 18 anos.',
  'editorial.li4':
    'Não vai descrever um corpo como bom, ruim, ideal ou precisando de conserto. As categorias são nomeadas como o padrão publicado as nomeia, e nada além disso.',
  'editorial.li5':
    'Não vai inventar um autor, um revisor médico, uma avaliação ou uma contagem de resenhas. Nada neste site é atribuído a uma pessoa que não o escreveu.',
  'editorial.h2Review': 'Frequência de revisão',
  'editorial.p4':
    'Toda página traz a data real da última revisão de seu conteúdo. Essa data muda quando o conteúdo muda, e não em outra ocasião — uma página cuja data de revisão se move a cada build não está lhe dizendo nada. As páginas de fórmulas são reconferidas com suas fontes quando uma fonte é revisada; o padrão de composição corporal do Exército dos EUA, por exemplo, mudou em 2026, e a página mudou junto.',
  'editorial.h2Corrections': 'Correções',
  'editorial.p5':
    'Se uma fórmula aqui não corresponder à fonte citada, isso é um defeito e será corrigido. Relate pela página de contato indicando a fonte com que você está trabalhando.',

  'privacy.title': 'Privacidade',
  'privacy.description':
    'O que este site coleta, que é quase nada, e quais são seus direitos sob a LGPD, o GDPR e a CCPA.',
  'privacy.lastUpdated': 'Última atualização: {date}.',
  'privacy.p1':
    'Todos os cálculos deste site rodam no seu navegador. A altura, o peso, a idade e os demais valores que você informa nunca são transmitidos, nunca são armazenados em servidor e nunca são registrados. Fechar a aba descarta tudo.',
  'privacy.h2Collect': 'O que é coletado',
  'privacy.p2':
    'Sem análise de dados, sem publicidade, sem pixels de rastreamento e sem scripts de terceiros de qualquer tipo. O site não faz requisições de rede para nenhum domínio além do que o serve.',
  'privacy.p3':
    'Duas coisas ficam guardadas localmente no seu navegador, usando localStorage, e nunca saem do seu dispositivo: sua preferência de tema claro ou escuro e sua preferência de unidades métricas ou imperiais. Você pode apagar ambas nas configurações do navegador.',
  'privacy.h2Server': 'Registros do servidor',
  'privacy.p4':
    'O provedor de hospedagem estática registra requisições padrão — endereço IP, marca de tempo, caminho solicitado, agente de usuário —, como faz todo servidor web. Esses são registros do provedor, mantidos conforme a política dele, e este site não os lê nem os processa.',
  'privacy.h2Future': 'Se houver publicidade',
  'privacy.p5':
    'A publicidade não está ativada. Se for adicionada no futuro, um aviso de consentimento perguntará antes de qualquer cookie publicitário ser gravado, esta página será atualizada primeiro e a mudança ficará datada aqui.',
  'privacy.h2Rights': 'Seus direitos',
  'privacy.p6':
    'Sob a LGPD, o GDPR e a CCPA você tem direitos de acesso, correção, exclusão, portabilidade e oposição sobre os dados pessoais que um site mantenha a seu respeito. Este site não mantém nenhum, então não há nada a acessar ou apagar — mas, se você achar o contrário, escreva para o endereço de contato e o caso será investigado.',
  'privacy.h2Children': 'Privacidade de crianças',
  'privacy.p7':
    'Este site não é direcionado a crianças menores de 13 anos e não coleta nada de ninguém. As calculadoras que produzem metas de calorias ou de gordura corporal recusam-se a fazê-lo para menores de 18 anos.',
  'privacy.h2Changes': 'Mudanças',
  'privacy.p8':
    'Mudanças relevantes nesta política serão refletidas na data acima e descritas no registro de alterações.',
  'privacy.ownerNotice':
    'MARCADOR DO PROPRIETÁRIO: antes do lançamento, acrescente o nome da entidade legal, o endereço postal e o contato de proteção de dados exigidos pelo artigo 13 do GDPR. Veja a lista de verificação em DEPLOY.md.',

  'terms.title': 'Termos',
  'terms.description':
    'Os termos sob os quais este site é oferecido, incluindo os limites do que suas estimativas podem ser usadas para fazer.',
  'terms.h2Use': 'Uso do site',
  'terms.p1':
    'Este site é gratuito. Você pode usar os números que ele produz para seus próprios fins. Você não pode raspá-lo a uma taxa que o degrade para os demais, nem republicar seu conteúdo em bloco como se fosse seu.',
  'terms.h2NotAdvice': 'Não é orientação médica',
  'terms.p2':
    'Tudo aqui é uma estimativa produzida por uma equação publicada aplicada aos números que você forneceu. Não é orientação médica, nem diagnóstico, nem plano de tratamento, nem substituto de um profissional qualificado que possa examinar você. Não use isto para tomar uma decisão médica.',
  'terms.p3':
    'Se você tem ou suspeita ter um transtorno alimentar, ou está grávida, amamentando, com menos de 18 anos ou convivendo com uma condição médica, os números aqui não se aplicam à sua situação, e a orientação de um profissional de saúde, sim.',
  'terms.h2Accuracy': 'Exatidão',
  'terms.p4':
    'As equações são implementadas fielmente e testadas contra exemplos resolvidos de suas publicações de origem. As equações em si são médias populacionais com margens de erro reais, informadas em cada página. Uma equação implementada corretamente ainda pode errar bastante no seu caso.',
  'terms.h2Liability': 'Responsabilidade',
  'terms.p5':
    'O site é oferecido no estado em que se encontra, sem garantia de qualquer tipo. Na máxima extensão permitida por lei, não se aceita responsabilidade por qualquer perda ou dano decorrente do uso do site ou da confiança em seus resultados.',
  'terms.h2Ip': 'Conteúdo',
  'terms.p6':
    'O texto, o layout e o código deste site pertencem a quem o opera. As equações, não — elas pertencem à literatura publicada e são citadas como tal. Os valores de referência reproduzidos de fontes publicadas continuam sendo propriedade de seus editores e são usados aqui com atribuição.',
  'terms.h2Law': 'Legislação aplicável',
  'terms.ownerNotice':
    'MARCADOR DO PROPRIETÁRIO: antes do lançamento, indique a entidade legal e a jurisdição aplicável a estes termos. Veja a lista de verificação em DEPLOY.md.',

  'cookies.title': 'Cookies',
  'cookies.description':
    'Quais cookies este site grava, que são nenhum, e o que mudaria se a publicidade fosse ativada.',
  'cookies.p1': 'Este site não grava nenhum cookie.',
  'cookies.h2Storage': 'O que é guardado no lugar',
  'cookies.p2':
    'Duas preferências ficam no localStorage, que não é um cookie e nunca é transmitido a servidor algum:',
  'cookies.li1':
    'Sua preferência de tema claro ou escuro, para que a página não pisque com o tema errado.',
  'cookies.li2':
    'Sua preferência de unidades métricas ou imperiais, para que você não precise reajustá-la em cada página.',
  'cookies.p3':
    'Ambas podem ser removidas nas configurações de dados de site do seu navegador. Removê-las não custa nada além da preferência.',
  'cookies.h2Third': 'Cookies de terceiros',
  'cookies.p4':
    'Não há nenhum, porque não há scripts, incorporações, tipografias ou imagens de terceiros. Todo recurso que o site carrega vem do domínio do próprio site.',
  'cookies.h2Ads': 'Se a publicidade for ativada',
  'cookies.p5':
    'A publicidade não está ativada. O código para exibi-la existe e reserva seu espaço no layout, mas não mostra nada. Se for ligada, os parceiros de publicidade gravariam seus próprios cookies, um aviso de consentimento perguntaria antes de qualquer um deles ser gravado, e esta página os listaria antes que isso acontecesse.',

  // --- Chart, activity, lift and distance page templates ---
  'common.related': 'Relacionados',
  'common.lastReviewed': 'Última revisão: {date}.',
  'common.category': 'Categoria',
  'common.weight': 'Peso',
  'common.duration': 'Duração',
  'chart.workItOut': 'Calcule com os seus próprios números',
  'chart.workItOutBody':
    'Esta tabela é calculada com as mesmas equações da calculadora, então as duas sempre concordam.',
  'chart.relatedGuides': 'Guias relacionados',
  'activity.h1': 'Calorias gastas {activity}',
  'activity.metSection': 'O valor MET e de onde ele vem',
  'activity.listedAs': 'Consta como',
  'activity.referenceNote':
    'Energia bruta em quilocalorias. Leia na horizontal a partir do seu peso e na vertical a partir da sua duração. Uma pessoa de 70 kg gasta cerca de {gross} kcal por hora, das quais aproximadamente {net} estão acima do que o repouso teria custado.',
  'activity.compareNote':
    'Energia gasta em trinta minutos a 70 kg, para que as atividades sejam diretamente comparáveis.',
  'activity.compareCaption': 'Comparação com atividades relacionadas',
  'activity.columnKcal30': 'kcal / 30 min',
  'activity.noscript':
    'Resultados ao vivo exigem JavaScript. A tabela abaixo é pré-calculada e funciona sem ele.',
  'activity.allActivities': 'Todas as atividades',
  'activity.metaDescription':
    'Quantas calorias se gasta {activity}, por peso corporal e duração. Usa o valor MET publicado de {met} do Compendium para adultos de 2024.',
  'lift.enterSet': 'Informe sua série',
  'lift.typicalReps': 'Repetições habituais',
  'lift.percentageTableCaption': 'Percentual da repetição máxima com as repetições esperadas',
  'lift.repMaxCaption': 'Repetição máxima estimada por peso levantado e repetições',
  'lift.comparisonHeading': 'Conversão de repetições máximas e comparação de fórmulas',
  'lift.comparisonCaption': 'As cinco equações comparadas para 100 kg por cinco repetições',
  'distance.enterTime': 'Informe um tempo final',
  'search.typeCalculator': 'Calculadora',
  'search.typeGuide': 'Guia',
  'search.typePage': 'Página',
  'search.unavailable':
    'A busca está indisponível no momento. O diretório de calculadoras lista tudo.',

  // --- Chart, activity, lift and distance page templates ---
  'metBand.light': 'na faixa mais leve',
  'metBand.moderate': 'na faixa moderada',
  'metBand.vigorous': 'na faixa vigorosa',
  'metBand.demanding': 'na faixa mais exigente',
  'netShare.none': 'nada',
  'netShare.percent': '{value} por cento',

  // --- Programmatic page copy ---
  'activity.appName': 'Calculadora de calorias gastas {activity}',
  'activity.howToName': 'Como calcular as calorias gastas {activity}',
  'activity.step1.name': 'Informe seu peso e sua duração',
  'activity.step1.text':
    'Escolha o sistema métrico ou o imperial e informe seu peso corporal e quanto tempo você passou {activity}.',
  'activity.step2.name': 'Leia o resultado',
  'activity.step2.text':
    'O resultado é atualizado enquanto você digita, mostrando a energia bruta e o valor acima do repouso.',
  'activity.step3.name': 'Confira o valor MET e sua fonte',
  'activity.step3.text':
    'O código do Compendium e a descrição por trás do valor de {met} MET aparecem abaixo da calculadora.',
  'activity.faq.q1': 'Quantas calorias se gasta {activity}?',
  'activity.faq.a1':
    'Com {met} MET, uma pessoa de 70 kg gasta cerca de {kcal30} kcal em trinta minutos. O gasto energético acompanha o peso corporal, então uma pessoa de 90 kg gasta aproximadamente um terço a mais na mesma sessão.',
  'activity.faq.q2': 'Qual é o valor MET de {activity}?',
  'activity.faq.a2':
    '{met} MET, sob o código {code} do Compendium. Um MET é um múltiplo da taxa metabólica de repouso.',
  'activity.faq.q3': 'Devo subtrair meu metabolismo de repouso?',
  'activity.faq.a3':
    'Se você for somar isto a um valor de manutenção que já inclui o repouso, sim. O valor líquido remove o aproximadamente um MET-hora por hora que seu corpo gastaria de qualquer forma, o que para {activity} deixa cerca de {netShare} do total bruto.',
  'activity.faq.q4': 'Por que o peso corporal muda a resposta?',
  'activity.faq.a4':
    'Um valor MET é energia por quilograma de massa corporal, então a mesma atividade custa mais para um corpo mais pesado. É por isso que o peso é um dado informado e não um pressuposto, e por isso números genéricos de calorias gastas sem um peso são quase inúteis.',
  'activity.faq.q5': 'Qual a precisão deste número?',
  'activity.faq.a5':
    'É uma estimativa a partir de uma média populacional. Comparações publicadas com calorimetria indireta encontram discrepâncias individuais de vinte a trinta por cento, então use-o para comparar atividades e não como uma conta a recuperar comendo.',
  'lift.h1': 'Calculadora de repetição máxima no {lift}',
  'lift.metaDescription':
    'Estime sua repetição máxima no {liftLower} a partir de uma série, com as cinco equações publicadas comparadas e uma tabela de percentuais para as cargas de treino.',
  'lift.howToName': 'Como estimar uma repetição máxima no {liftLower}',
  'lift.step1.name': 'Informe o peso e as repetições',
  'lift.step1.text':
    'Informe o peso que você levantou no {liftLower} e quantas repetições completou.',
  'lift.step2.name': 'Leia a estimativa',
  'lift.step2.text':
    'As cinco equações são mostradas, junto com a média delas e uma tabela de percentuais.',
  'lift.step3.name': 'Veja como as equações se comportam neste exercício',
  'lift.step3.text':
    'As notas abaixo explicam como essas equações se transferem para este movimento especificamente.',
  'lift.faq.q1': 'Como estimo meu máximo no {liftLower}?',
  'lift.faq.a1':
    'Faça uma série até ou perto da falha, informe o peso e as repetições, e as equações fazem o resto. Um triplo pesado dá uma estimativa muito mais confiável do que uma série de doze, porque as cinco equações foram validadas na faixa de duas a dez repetições.',
  'lift.faq.q2': 'As estimativas de 1RM são precisas para o {liftLower}?',
  'lift.faq.q3': 'Qual fórmula devo usar?',
  'lift.faq.a3':
    'Wathan e Epley acompanham os dados medidos na faixa mais ampla; Brzycki é a mais conservadora e é exata em uma única repetição. A média das cinco é um número único mais defensável do que qualquer uma delas, e a dispersão entre elas diz quanta confiança a estimativa merece.',
  'lift.faq.q4': 'Qual faixa de repetições combina com o {liftLower}?',
  'lift.faq.a4':
    'Este exercício costuma ser treinado na faixa de {reps} repetições. Estimativas tiradas dentro dessa faixa são as mais confiáveis, porque ficam mais perto de onde as equações foram ajustadas.',
  'lift.faq.q5': 'Devo testar um máximo real em vez disso?',
  'lift.faq.a5':
    'Só se você precisar do número para competição, e então com alguém dando segurança e um aquecimento completo. Para programar, uma estimativa a partir de um triplo pesado é quase tão útil e custa muito menos recuperação e risco.',
  'distance.h1': 'Calculadora de ritmo para {distance}',
  'distance.metaDescription':
    'Tabela de ritmo e calculadora para {distance}: converta entre ritmo, velocidade e tempo final, com parciais e uma nota honesta sobre projeções de prova.',
  'distance.howToName': 'Como calcular o ritmo de {distanceLower}',
  'distance.step1.name': 'Informe um tempo final',
  'distance.step1.text': 'Informe um tempo-alvo ou real de {distanceLower} como h:mm:ss ou m:ss.',
  'distance.step2.name': 'Leia o ritmo',
  'distance.step2.text':
    'O ritmo por quilômetro e por milha, a velocidade e os parciais são atualizados enquanto você digita.',
  'distance.step3.name': 'Consulte a tabela de ritmo',
  'distance.step3.text': 'A tabela abaixo associa cada ritmo da faixa habitual a um tempo final.',
  'distance.faq.q1': 'Que ritmo preciso para um dado tempo de {short}?',
  'distance.faq.a1':
    'Divida o tempo-alvo pela distância em quilômetros. Para {distance}, {midPace} por quilômetro dá {midTime}. A tabela abaixo cobre a faixa em que a maioria compete.',
  'distance.faq.q2': 'Como devo dosar um {short}?',
  'distance.faq.q3': 'O que limita o desempenho na {short}?',
  'distance.faq.q4': 'As projeções para outras distâncias são confiáveis?',
  'distance.faq.a4':
    'Não, e a página diz isso. Elas pressupõem que o mesmo ritmo se mantém em uma distância diferente, o que não acontece: o ritmo cai à medida que a distância aumenta. A fórmula de Riegel aplica um expoente de fadiga e é a ferramenta certa para previsão de verdade.',
  'distance.faq.q5': 'Por que a tabela de parciais tem um trecho final incompleto?',
  'distance.faq.a5':
    'Porque {distance} são {km} km, o que não é um número inteiro de intervalos de parcial. O último trecho parcial é mostrado em vez de omitido, já que uma tabela que termina antes da linha de chegada erra exatamente onde importa.',

  // --- Lift and distance page chrome ---
  'lift.weightLifted': 'Peso levantado',
  'lift.reps': 'Repetições',
  'lift.repsUnit': 'reps',
  'lift.formula': 'Fórmula',
  'lift.noscript':
    'Resultados ao vivo exigem JavaScript. As tabelas abaixo são pré-calculadas e funcionam sem ele.',
  'lift.specificHeading': 'O {lift} especificamente',
  'lift.estimateHeading': 'Máximo estimado no {lift} por peso e repetições',
  'lift.estimateNote':
    'Estimativas de Epley em quilogramas. Leia na horizontal a partir do peso que você levantou e na vertical a partir das repetições que conseguiu. As colunas acima de dez repetições aparecem, mas são as menos confiáveis.',
  'lift.percentageHeading': 'Tabela de percentuais',
  'lift.percentageNote':
    'Cargas de treino como fração de um máximo de 100 kg, com as repetições que cada percentual costuma permitir. Escale proporcionalmente à sua própria estimativa.',
  'lift.columnPercentage': 'Percentual',
  'lift.columnLoad100': 'Carga a partir de 100 kg',
  'lift.columnApproxReps': 'Repetições aproximadas',
  'lift.conversionHeading': 'Conversão de repetições máximas',
  'lift.conversionNote':
    'A que corresponde um máximo estimado de 100 kg em cada número de repetições, e como as cinco equações se comparam para uma série de cinco com 100 kg.',
  'lift.columnLoadFor100': 'Carga para um máximo de 100 kg',
  'lift.column100x5': '100 kg × 5 reps',
  'lift.otherLifts': 'Outros exercícios',
  'lift.formulasGuide': 'Como as fórmulas de 1RM diferem',
  'distance.finishTime': 'Tempo final',
  'distance.noscript':
    'Resultados ao vivo exigem JavaScript. A tabela de ritmo abaixo é pré-calculada e funciona sem ele.',
  'distance.aboutHeading': 'A {distance}',
  'distance.length': 'Distância: {km} km ({metres} m).',
  'distance.fixedByRules': 'Fixada pela Regra 55 de Competição da World Athletics.',
  'distance.chartHeading': 'Tabela de ritmo da {distance}',
  'distance.chartNote':
    'Tempo final, ritmo por milha e velocidade para cada ritmo por quilômetro. Tudo é calculado em metros e segundos e convertido uma única vez, então nenhum arredondamento se acumula ao longo da tabela.',
  'distance.columnPaceKm': 'Ritmo / km',
  'distance.columnPaceMile': 'Ritmo / milha',
  'distance.columnSpeed': 'Velocidade',
  'distance.columnDistance': 'Distância',
  'distance.columnElapsed': 'Decorrido',
  'distance.otherDistances': 'Outras distâncias',
  'distance.paceChartGuide': 'Como ler uma tabela de ritmo',

  // --- Prose page detail ---
  'about.h2Absent': 'O que falta de propósito',
  'about.pAbsent':
    'Algumas calculadoras estão ausentes de propósito. Função renal, superfície corporal para dosagem de quimioterapia e teor alcoólico no sangue produzem números que alimentam decisões reais, e cabem a um profissional de saúde. Calculadoras de data provável do parto, ovulação e concepção são a categoria de maior escrutínio em saúde e são bem atendidas por editoras médicas consolidadas. Projetar datas de menstruação a partir da duração do ciclo é aritmética, e isso é publicado aqui.',
  'about.h2Built': 'Como é construído',
  'about.pBuilt':
    'Páginas estáticas, sem contas e sem banco de dados. Os cálculos rodam no seu navegador e não há servidor para onde enviá-los. Toda fórmula é conferida contra exemplos resolvidos do artigo de origem em uma suíte de testes automatizada, que é o que pega os erros de transcrição que deixam uma calculadora silenciosamente errada.',
  'contact.h2NoForm': 'Por que não há formulário de contato',
  'contact.pNoForm':
    'Um formulário precisa de algum lugar para enviar o que você escreve, o que significa um servidor, o que significa um lugar onde sua mensagem fica guardada e mais uma coisa para proteger. Este site são arquivos estáticos sem backend, e mantê-lo assim é a razão pela qual nada do que você digita numa calculadora pode sair do seu dispositivo. Um endereço de e-mail é uma troca justa por isso.',
  'contact.ownerNotice':
    'MARCADOR DO PROPRIETÁRIO: substitua o endereço de contato em src/config/site.ts antes do lançamento. Ele aparece aqui, na política de privacidade, nos termos e no security.txt, e mudar esse único arquivo atualiza todos eles.',

  // --- Short meta title, distinct from the H1 ---
  'lift.metaTitle': 'Calculadora de 1RM: {lift}',

  // --- Short meta title for activity pages ---
  'activity.metaTitle': 'Calorias: {activity}',

  // --- Imperial height sub-fields, which need their own labels ---
  'calc.heightFeet': 'Altura, pés',
  'calc.heightInches': 'Altura, polegadas',
};
