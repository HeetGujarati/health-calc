import type { TemplateSet } from './index';

/** Brazilian Portuguese sentence-variation templates. */
export const ptBRTemplates: TemplateSet = {
  activityIntro: [
    'Descubra quanta energia {activity} consome de acordo com o seu peso corporal e o tempo que você dedica. O número vem do equivalente metabólico da atividade, publicado no Compendium of Physical Activities.',
    '{Activity} é avaliada em {met} MET, ou seja, custa cerca de {met} vezes mais energia por minuto do que ficar sentado parado. Informe seu peso e sua duração para transformar isso em quilocalorias.',
    'Esta página converte o valor MET publicado de {activity} em um número de energia para o seu peso corporal. Corpos mais pesados gastam mais na mesma atividade, e é por isso que o peso é um dado informado e não um pressuposto.',
    'Energia gasta durante {activity}, calculada a partir do seu equivalente metabólico de {met}. A tabela abaixo cobre pesos e durações comuns, caso você prefira não informar nada.',
  ],
  activityMet: [
    'Um MET é um múltiplo da taxa metabólica de repouso, definida como um consumo de oxigênio de 3,5 mililitros por quilograma por minuto. Com {met} MET, {activity} custa aproximadamente {met} vezes o que seu corpo gasta em repouso.',
    'O Compendium atribui a {activity} o valor de {met} MET. Um MET é o que custa ficar sentado em silêncio, então esta atividade fica em torno de {met} vezes isso a cada minuto praticado.',
    'Os equivalentes metabólicos expressam o custo energético em relação ao repouso. {Activity} fica em {met}, o que a coloca {comparison} dentro da faixa que o Compendium cobre.',
    'Com {met} MET, {activity} fica {comparison} em relação à faixa completa de atividades que o Compendium lista, que vai de 1,0 para ficar sentado em silêncio a mais de 20 para a competição de elite.',
  ],
  activityAccuracy: [
    'O valor de {met} MET para {activity} é uma média populacional. O próprio Compendium observa que o custo energético individual varia com condicionamento, técnica, terreno e composição corporal, então trate-o como ordem de grandeza e não como medição.',
    'Este número é uma estimativa construída sobre uma média. Duas pessoas praticando {activity} na mesma intensidade nominal podem diferir em vinte por cento ou mais, e nenhuma equação que use só peso e tempo consegue enxergar isso.',
    'A precisão é limitada pelo que um valor MET consegue representar. É um único número no lugar de todo mundo que pratica {activity}, e o custo real muda conforme o esforço, a eficiência e as condições.',
    'Leia o resultado como aproximado. Comparações publicadas entre estimativas derivadas de MET e calorimetria indireta costumam encontrar discrepâncias individuais de vinte a trinta por cento, e {activity} não é exceção.',
  ],
  activityNet: [
    'O número acima é energia bruta — tudo o que foi gasto durante a sessão, inclusive o metabolismo de repouso que você usaria de qualquer forma. Subtrair um MET-hora por hora dá o que {activity} realmente acrescentou.',
    'Seu corpo gasta energia quer você pratique {activity} ou não. O número líquido remove essa linha de base, e é o valor honesto se você for somar isto a uma estimativa de manutenção.',
    'Bruto e líquido diferem em cerca de um MET por hora. Para {activity} com {met} MET, isso significa que aproximadamente {netShare} do total é genuinamente atribuível à atividade.',
    'Se você já escolheu um multiplicador de atividade que pressupõe que você treina, somar este número por cima conta {activity} duas vezes. Use o número líquido, ou defina seu nível de atividade como sedentário e some as sessões à parte.',
  ],
  liftIntro: [
    'Estime sua repetição máxima no {lift} a partir de uma série que você já fez. As cinco equações publicadas são mostradas, porque elas concordam em poucas repetições e divergem acima de dez.',
    'Informe um peso e as repetições que você conseguiu no {lift}. As cinco equações abaixo foram ajustadas a dados diferentes e dão respostas diferentes; a dispersão entre elas diz o quanto confiar na estimativa.',
    'Uma estimativa de repetição máxima para o {lift}, a partir de qualquer série entre uma e vinte repetições. A estimativa é mais confiável a partir de um triplo pesado e menos confiável a partir de uma série até a falha em doze.',
    'Calcule um máximo estimado para o {lift} sem precisar testá-lo. A tabela de percentuais abaixo converte essa estimativa em cargas de treino.',
  ],
  liftAccuracy: [
    'As cinco equações foram validadas principalmente com dados de supino e agachamento. {biasNote}',
    'As estimativas se transferem de forma imperfeita entre exercícios. {biasNote}',
    'O quanto essas equações funcionam depende do exercício. {biasNote}',
    'Uma ressalva específica deste movimento: {biasNote}',
  ],
  distanceIntro: [
    'Converta um tempo final de {distance} em ritmo por quilômetro e por milha, com parciais e o que o mesmo ritmo daria em outras distâncias.',
    'Ritmo, velocidade e parciais para {distance}. Informe um tempo-alvo para ver que ritmo ele exige, ou um ritmo para ver o tempo final que ele produz.',
    'Tudo o que envolve ritmo em {distance}: a conversão entre ritmo e tempo final, uma tabela completa de parciais e uma nota honesta sobre por que projeções para outras distâncias enganam.',
    'Calcule o ritmo de {distance} a partir de um tempo final, ou um tempo final a partir de um ritmo. A tabela abaixo cobre a faixa em que a maioria compete.',
  ],
  distanceDemands: [
    'O que limita o desempenho aqui: {demands}',
    'Fisiologicamente, {distance} é limitada por {demandsLower}',
    'A restrição nesta distância: {demandsLower}',
    '{demands}',
  ],
};
