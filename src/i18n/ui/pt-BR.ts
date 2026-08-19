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
};
