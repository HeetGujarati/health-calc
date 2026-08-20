import type { Messages } from '../../lib/i18n';

/** Japanese UI catalog. */
export const ja: Messages = {
  'nav.main': 'メイン',
  'nav.calculators': '計算ツール',
  'nav.charts': '早見表',
  'nav.guides': '解説',
  'nav.skipToContent': '本文へスキップ',
  'nav.breadcrumb': 'パンくずリスト',
  'nav.home': 'ホーム',
  'nav.useDarkTheme': 'ダークテーマにする',
  'nav.useLightTheme': 'ライトテーマにする',
  'nav.language': '言語',
  'nav.chooseLanguage': '言語を選ぶ',

  'footer.calculators': '計算ツール',
  'footer.about': 'このサイトについて',
  'footer.legal': '法的事項',
  'footer.allCalculators': 'すべての計算ツール',
  'footer.referenceCharts': '早見表',
  'footer.guides': '解説',
  'footer.caloriesByActivity': '活動別の消費カロリー',
  'footer.oneRepMaxByLift': '種目別の最大挙上重量',
  'footer.paceByDistance': '距離別のペース',
  'footer.search': '検索',
  'footer.aboutLink': 'このサイトについて',
  'footer.editorialPolicy': '編集方針',
  'footer.accessibility': 'アクセシビリティ',
  'footer.contact': 'お問い合わせ',
  'footer.privacy': 'プライバシー',
  'footer.terms': '利用規約',
  'footer.cookies': 'クッキー',
  'footer.disclaimer':
    '{site} は、集団レベルで公表された式にもとづく推定値を示します。必要量には個人差があり、これは医学的助言ではありません。食事、体重、身体イメージについて不安がある場合は、医師または有資格の専門家に相談してください。',
  'footer.copyright':
    '© {year} {site}。式の出典は各ページに記載しています。編集方針をご覧ください。',
  'footer.copyrightLink': '編集方針',

  'translation.notice':
    'このページは英語の原文から翻訳したものです。式・出典・数値は同一です。文章が不自然な場合は、英語版が正となります。',
  'translation.viewEnglish': '英語の原文を見る',

  'home.title': '健康とフィットネスの計算ツール',
  'home.description':
    '公表された式にもとづく無料の健康・フィットネス計算ツール。出典を明記しているので、根拠を確かめ、その数値がどう導かれたかを確認できます。',
  'home.intro':
    'ここにある計算ツールはすべて、公表された式を使い、その出典を示し、その式が何を前提にしているかまで表示します。メートル法・ヤード ポンド法の両対応、登録不要です。',

  'category.body-composition': 'body composition（体組成）',
  'category.energy': 'エネルギーと摂取量',
  'category.training': 'トレーニング',
  'category.weight-reference': '体重の目安',
  'category.womens-health': '妊娠と生理周期',
  'category.clinical': '臨床の目安',

  'hub.calculators.title': 'すべての計算ツール',
  'hub.calculators.description':
    'サイト内のすべての計算ツールをカテゴリ別にまとめています。いずれも公表された式を使い、出典を示し、メートル法とヤード・ポンド法の双方で動作します。',
  'hub.calculators.intro':
    '{count} 個の計算ツール。いずれも公表された式にもとづき、出典をページ上に明記しています。すべてメートル法とヤード・ポンド法に対応。',

  'hub.guides.title': '解説',
  'hub.guides.description':
    '計算ツールの背後にある式の解説。どこから来たのか、何を前提にしているのか、どこで破綻するのか、その数値をどこまで信頼してよいのか。',
  'hub.guides.intro':
    '計算ツールの背後にあるものについての {count} 本の解説。各式がどこから来て、何を前提とし、その結果がどれだけ信頼に値するかを扱います。',
  'hub.guides.readingTime': '読了 {count} 分',

  'hub.charts.title': '早見表',
  'hub.charts.description':
    'BMI、健康的な体重、体脂肪率、MET 値、トレーニング percentage、心拍ゾーン、たんぱく質、ペースなどの印刷できる早見表。',
  'hub.charts.intro':
    '{count} 種類の早見表。いずれも対応する計算ツールと同じ式から算出しているため、両者が食い違うことはありません。どの表も実データで、読み方の説明つき、JavaScript を無効にしても機能します。',

  'hub.activities.title': '活動別の消費カロリー',
  'hub.activities.description':
    '{count} 種類の活動の消費エネルギー。公表された MET 値と Compendium コードつきで、あなたの体重と時間に合わせて算出します。',
  'hub.activities.intro':
    '{count} 種類の活動。いずれも 2024 年版 Adult Compendium of Physical Activities の MET 値と 5 桁コードを併記しています。すべての値は他の計算サイトではなく、公表された原典から採りました。',
  'hub.activities.tableCaption': '{category} の活動と MET 値',
  'hub.activities.columnActivity': '活動',
  'hub.activities.columnMet': 'MET',
  'hub.activities.columnCode': 'コード',
  'hub.activities.source':
    '出典: Herrmann SD, Willis EA, Ainsworth BE, et al. "2024 Adult Compendium of Physical Activities." Journal of Sport and Health Science 13(1), 2024, pp. 6–12. MET 値は集団の平均値です。Compendium の項目の約 18% は実測ではなく推定値です。',

  'hub.lifts.title': '種目別の最大挙上重量',
  'hub.lifts.description':
    '{count} 種目の 1RM 推定。各ページで、5 つの式がその動作でどうふるまうかを率直に記しています。',
  'hub.lifts.intro':
    '5 つの 1RM 推定式は主にベンチプレスとスクワットのデータから導かれたもので、どの動作にも同じように当てはまるわけではありません。以下の各ページで、その種目における挙動を説明します。',

  'hub.distances.title': 'レース距離別のペース表',
  'hub.distances.description':
    '100 メートルから 50 km まで、{count} のレース距離のペース表とスプリット表。ペース・速度・ゴールタイムの換算つき。',
  'hub.distances.intro':
    '{count} の距離。それぞれに完全なペース表、スプリット表、そしてその距離で何が記録を左右するかの解説がついています。マラソンとハーフマラソンの距離は World Athletics が定めたものです。',

  'calc.enterDetails': '情報を入力',
  'calc.result': '結果',
  'calc.calculate': '計算する',
  'calc.noscript':
    'リアルタイム計算には JavaScript が必要です。このページの下にある早見表はあらかじめ計算済みで、JavaScript なしでも使えます。',
  'calc.howItWorks': '計算方法',
  'calc.default': '既定',
  'calc.source': '出典',
  'calc.assumes': '前提',
  'calc.accuracy': '精度',
  'calc.whichFormula': 'どの式を使うべきか',
  'calc.defaultsTo': 'このページは既定で {formula} を使います。{accuracy}',
  'calc.questions': 'よくある質問',
  'calc.related': '関連',
  'calc.relatedCalculators': '計算ツール',
  'calc.relatedGuides': '解説',
  'calc.lastReviewed': '最終確認日 {date}。カテゴリ: {category}。',
  'calc.units': '単位',
  'calc.metric': 'メートル法',
  'calc.imperial': 'ヤード・ポンド法',

  'guide.relatedCalculators': '計算ツール',
  'guide.relatedGuides': '関連する解説',
  'guide.meta': '{date} · 読了 {count} 分',

  'search.title': '検索',
  'search.description': 'このサイトの計算ツール、解説、資料ページを検索します。',
  'search.label': '計算ツールと解説を検索',
  'search.submit': '検索',
  'search.browse': 'または一覧から探す',
  'search.allGuides': 'すべての解説',
  'search.noResults': '「{query}」に一致するものはありません。',
  'search.resultCount': '「{query}」の検索結果 {count} 件。',
  'search.resultCountOne': '「{query}」の検索結果 1 件。',
  'search.prompt': '入力すると検索します。',

  'notFound.title': 'ページが見つかりません',
  'notFound.description': 'そのページはありません。サイト内のすべての計算ツールを以下に示します。',
  'notFound.label': 'エラー 404',
  'notFound.heading': 'そのページはありません',
  'notFound.intro':
    'アドレスの入力間違いか、ページが移動した可能性があります。このサイトにあるものはすべて以下に並べてあります。',
  'notFound.allCalculators': 'すべての計算ツール',
  'notFound.search': '検索',
  'notFound.guides': '解説',
  'notFound.charts': '早見表',
  'notFound.reportBrokenLink': 'リンク切れを知らせる',

  'disclaimer.heading': 'これは何ではないか',
  'disclaimer.body':
    'これは集団レベルの式から得た推定値であり、あなたを測定した結果でも医学的助言でもありません。個人差は非常に大きいものです。食事やトレーニングを大きく変える前に、医師または管理栄養士に相談してください。',

  'chart.howToRead': 'この表の読み方',
  'chart.relatedCalculator': '計算ツール',
  'chart.source': '出典',

  'activity.metValue': 'MET 値',
  'activity.compendiumCode': 'Compendium コード',
  'activity.referenceTable': '体重と時間で見る消費カロリー',
  'activity.compare': '関連する活動との比較',
  'activity.columnWeight': '体重',

  'lift.percentageTable': 'トレーニング強度の割合',
  'lift.repMaxTable': 'レップ数と重量の換算',
  'lift.notes': 'この種目についての注記',

  'distance.paceChart': 'ペース表',
  'distance.splits': 'スプリットタイム',
  'distance.notes': 'この距離についての注記',

  'consent.heading': 'クッキー',
  'consent.body':
    'このサイトは広告用・解析用のクッキーを使いません。将来それが変わる場合は、この通知が先に確認します。',
  'consent.accept': '同意する',
  'consent.reject': '拒否する',

  'about.title': 'このサイトについて',
  'about.description':
    'このサイトが何であるか、計算ツールがどう作られているか、そして数値が何を語り、何を語らないか。',
  'about.p1':
    'このサイトがあるのは、たいていのフィットネス計算ツールが数値の出どころを示さないからです。身長と体重を入れると数字が出てくる。しかしどの式が出したのか、どんな集団から導かれたのか、あなたのような人にとってどれだけ外れうるのかを知る手立てがありません。',
  'about.p2':
    'ここにある計算ツールはすべて、使っている式の名前を挙げ、その出典論文を示し、その式が適用対象の人について何を前提としているかを述べ、他の選択肢と比べた精度を明示します。複数の公表された式が食い違う場合 — 体脂肪率と基礎代謝量では実際にかなり食い違います — ページはその不一致を一つの数字の裏に隠さず、そのまま示します。',
  'about.p3':
    '計算はあなたのブラウザ内で実行されます。入力した内容がどこかへ送られたり、サーバーに保存されたり、記録されたりすることはありません。アカウントも、メールアドレスの収集も、トラッキングスクリプトもありません。',
  'about.h2Limits': 'これらの数値が何ではないか',
  'about.p4':
    'ここにあるどの式も、特定の集団から得た測定値に曲線を当てはめて作られたものです。その当てはめは平均的にはよくても、個々人には大きく外れることがあります。標準誤差が 4 パーセントポイントの式は、無視できない割合の人に対してそれ以上に外れます。とりわけ体組成の式は、小規模で若く、白人が大半を占める標本から導かれたものが多く、それ以外の人には不完全にしか当てはまりません。',
  'about.p5':
    'これらはいずれも医学的助言ではなく、診断でもなく、実際にあなたを診察できる臨床家との対話に代わるものでもありません。',

  'contact.title': 'お問い合わせ',
  'contact.description': '式の誤り、リンク切れ、アクセシビリティの問題を知らせる方法。',
  'contact.p1':
    '式が間違っている、引用が出典と一致しない、リンクが切れている、キーボードやスクリーンリーダーで使えない箇所がある — そうしたことがあればぜひお知らせください。式の訂正は、寄せていただけるもののなかで最も価値があります。',
  'contact.emailLabel': 'メール',
  'contact.p2':
    'ページのアドレスを、式の訂正の場合は根拠としている公表資料も添えてください。そうすれば訂正は意見の問題ではなく、検証できるものになります。',
  'contact.h2Response': '対応について',
  'contact.p3':
    'これは一人で運営している小さなサイトです。式の訂正とアクセシビリティの問題を、ほかの何よりも優先して扱います。',

  'a11y.title': 'アクセシビリティ',
  'a11y.description':
    'このサイトが目標とするアクセシビリティ基準、その検証方法、そして問題を報告する方法。',
  'a11y.p1':
    'このサイトは WCAG 2.2 レベル AA を目標としています。これは作り方についての約束であり、第三者が発行した認証ではありません。',
  'a11y.h2What': '具体的には',
  'a11y.li1':
    'すべてのページがキーボードだけで、論理的な順序で、目に見えるフォーカス表示とともに操作できます。',
  'a11y.li2':
    'すべてのフォーム部品に本物のラベルがあります。プレースホルダーでラベルを代用してはいません。',
  'a11y.li3':
    '計算結果は変化に応じてスクリーンリーダーに穏やかに読み上げられ、入力中のフィールドからフォーカスを奪いません。',
  'a11y.li4': 'テキストのコントラスト比は両テーマとも 4.5:1 以上、UI の境界線は 3:1 以上です。',
  'a11y.li5': 'タップ対象は 44 × 44 ピクセル以上です。',
  'a11y.li6': 'システムが「視差効果を減らす」設定のときはアニメーションを抑制します。',
  'a11y.li7':
    'すべての早見表は画像ではなく、適切な見出しセルをもつ本物の HTML として出力されます。',
  'a11y.h2Testing': '検証方法',
  'a11y.p2':
    'ビルドのたびに自動チェックが走ります。WCAG 固有の規則を含む HTML 検証と、95 を下回るとビルドを失敗させる Lighthouse のアクセシビリティ監査です。コントラスト比はユニットテストがデザイントークンから再計算するため、コントラストを壊す色の変更は公開されずに失敗します。計算ツールのキーボード操作はエンドツーエンドテストで確認しています。',
  'a11y.p3':
    '自動テストが見つけられるのはアクセシビリティ問題の一部にすぎません。これらのチェックが見落としたものに出会ったら、ぜひ報告してください。',
  'a11y.h2Known': '既知の制約',
  'a11y.p4':
    'サイトが自前で配信している 3 書体はラテン文字のみに対応しています。ヒンディー語・日本語・アラビア語のページはそれらの文字についてシステムフォントにフォールバックします。表示は正しく行われますが、ラテン文字のページとは組版上そろいません。',

  'editorial.title': '編集方針',
  'editorial.description': '式の選び方、出典の示し方、掲載しないもの、そしてページを見直す頻度。',
  'editorial.h2Selection': '式の選び方',
  'editorial.p1':
    '計算ツールを公開するのは、その式が公表され、帰属が明確で、検証できる場合だけです。すなわち、名前のある論文、名前のある規則、名前のある公的基準であることを意味します。他のウェブサイトでも、フィットネスアプリでも、出どころ不明のまま出回っている式でもありません。',
  'editorial.p2':
    '同じ量に対して複数の式が存在する場合、ページは複数を実装し、それらがどこで食い違うかを示します。既定とするのは、一般成人集団での検証が最もよく文書化されているものであり、なぜそれを既定にしたのかもページに書いてあります。',
  'editorial.h2Citation': '出典の示し方',
  'editorial.p3':
    'サイト上のすべての式は、それを使うページに完全な出典を載せています。著者、表題、掲載誌、年です。引用するのは原著であり、それを再掲した二次資料ではありません。値が式ではなく参照表から来ている場合 — たとえば MET 値 — は、その項目を引けるように具体的なコードと版を示します。',
  'editorial.h2Refused': 'このサイトがしないこと',
  'editorial.li1':
    '男性 1,500 kcal、女性 1,200 kcal を下回る摂取量や、維持量の 25% と 1 日 1,000 kcal のうち小さいほうを超える不足量は提示しません。',
  'editorial.li2':
    'BMI 18.5 を下回る目標体重への計画は作りません。黙って拒むのではなく、その理由を示します。',
  'editorial.li3': '18 歳未満の方にカロリーや体脂肪率の目標値は返しません。',
  'editorial.li4':
    '身体を「よい」「悪い」「理想的」「直すべき」とは表現しません。区分は公表された基準がつけた名称のとおりに呼び、それ以上のことは言いません。',
  'editorial.li5':
    '著者、医学監修者、評価、レビュー件数をでっち上げることはしません。このサイトのどの内容も、それを書いていない人物に帰属させることはありません。',
  'editorial.h2Review': '見直しの頻度',
  'editorial.p4':
    'すべてのページに、その内容を最後に確認した実際の日付を記載しています。この日付は内容が変わったときにだけ変わります。ビルドのたびに日付が動くページは、何も伝えていないのと同じです。式のページは、出典が改訂されたときに原典と照合し直します。たとえば米陸軍の体組成基準は 2026 年に変わり、ページもそれに合わせて変えました。',
  'editorial.h2Corrections': '訂正',
  'editorial.p5':
    'ここにある式が引用元と一致していなければ、それは不具合であり、修正します。根拠としている資料を添えて、お問い合わせページからお知らせください。',

  'privacy.title': 'プライバシー',
  'privacy.description':
    'このサイトが収集するもの — ほぼ何も収集しません — と、GDPR および CCPA のもとでのあなたの権利。',
  'privacy.lastUpdated': '最終更新日 {date}。',
  'privacy.p1':
    'このサイトの計算はすべてあなたのブラウザ内で実行されます。入力した身長、体重、年齢などの数値が送信されることも、サーバーに保存されることも、記録されることもありません。タブを閉じれば消えます。',
  'privacy.h2Collect': '収集しているもの',
  'privacy.p2':
    '解析なし、広告なし、トラッキングピクセルなし、いかなる第三者スクリプトもありません。このサイトは、配信元以外のドメインへネットワーク要求を一切行いません。',
  'privacy.p3':
    '2 つの設定だけが localStorage を使ってブラウザ内に保存され、端末の外に出ることはありません。ライト/ダークテーマの選択と、メートル法/ヤード・ポンド法の選択です。どちらもブラウザの設定から消去できます。',
  'privacy.h2Server': 'サーバーのログ',
  'privacy.p4':
    '静的ホスティング事業者は、どのウェブサーバーとも同じく標準的なリクエストログ — IP アドレス、時刻、要求されたパス、ユーザーエージェント — を記録します。これは事業者の記録であり、事業者の方針のもとで保持されます。このサイトはそれを読むことも処理することもありません。',
  'privacy.h2Future': '広告を導入する場合',
  'privacy.p5':
    '広告は有効になっていません。将来導入する場合は、広告クッキーを 1 つでも設定する前に同意バナーで確認し、このページを先に更新し、その変更をここに日付とともに記載します。',
  'privacy.h2Rights': 'あなたの権利',
  'privacy.p6':
    'GDPR と CCPA のもとで、サイトが保持するあなたの個人データについて、開示・訂正・削除・可搬性・異議の権利があります。このサイトは何も保持していないため、開示や削除の対象はありません。そうではないとお考えの場合は、連絡先までご連絡いただければ調査します。',
  'privacy.h2Children': '子どものプライバシー',
  'privacy.p7':
    'このサイトは 13 歳未満の子どもを対象としておらず、誰からも何も収集しません。カロリーや体脂肪率の目標を出す計算ツールは、18 歳未満の方に対してはその出力を拒否します。',
  'privacy.h2Changes': '変更',
  'privacy.p8': 'この方針の重要な変更は、上記の日付に反映し、変更履歴に記載します。',
  'privacy.ownerNotice':
    '運営者記入欄: 公開前に、GDPR 第 13 条が求める法人名、住所、データ保護窓口を追記してください。DEPLOY.md のチェックリストを参照。',

  'terms.title': '利用規約',
  'terms.description': 'このサイトを提供する条件。推定値をどこまで用いてよいかの制限を含みます。',
  'terms.h2Use': 'サイトの利用',
  'terms.p1':
    'このサイトは無料で利用できます。算出された数値をご自身の目的に使っていただいてかまいません。他の利用者に支障が出るような速度でのスクレイピングや、内容をまるごと自分のものとして再公開することはご遠慮ください。',
  'terms.h2NotAdvice': '医学的助言ではありません',
  'terms.p2':
    'ここにあるものはすべて、あなたが入力した数値に公表された式を当てはめて得た推定値です。医学的助言でも、診断でも、治療計画でもなく、あなたを診察できる有資格の専門家に代わるものでもありません。これをもとに医学的な判断を下さないでください。',
  'terms.p3':
    '摂食障害がある、またはその疑いがある場合、妊娠中・授乳中の場合、18 歳未満の場合、あるいは疾患を管理中の場合、ここにある数値はあなたの状況には当てはまりません。臨床家の指示に従ってください。',
  'terms.h2Accuracy': '正確性',
  'terms.p4':
    '式は忠実に実装し、原典に載っている計算例と照合して検証しています。ただし式そのものは集団の平均であり、実際の誤差幅を伴います。その幅は各ページに記載しています。正しく実装された式であっても、あなたにとっては大きく外れることがあります。',
  'terms.h2Liability': '責任',
  'terms.p5':
    'このサイトは現状のまま、いかなる保証もなく提供されます。法が認める最大限の範囲において、サイトの利用またはその出力への依拠から生じたいかなる損失・損害についても責任を負いません。',
  'terms.h2Ip': 'コンテンツ',
  'terms.p6':
    'このサイトの文章、レイアウト、コードは運営者に帰属します。式は帰属しません。式は公表された文献に属するものであり、それに応じて出典を示しています。公表された資料から転載した参照値は各発行者に権利があり、ここでは出典を示して利用しています。',
  'terms.h2Law': '準拠法',
  'terms.ownerNotice':
    '運営者記入欄: 公開前に、この規約の法人名と準拠する管轄を記載してください。DEPLOY.md のチェックリストを参照。',

  'cookies.title': 'クッキー',
  'cookies.description':
    'このサイトが設定するクッキー — 1 つもありません — と、広告を有効にした場合に変わること。',
  'cookies.p1': 'このサイトはクッキーを一切設定しません。',
  'cookies.h2Storage': '代わりに保存しているもの',
  'cookies.p2':
    '2 つの設定を localStorage に保存しています。これはクッキーではなく、サーバーに送信されることはありません。',
  'cookies.li1':
    'ライト/ダークテーマの選択。ページが誤ったテーマで一瞬表示されるのを防ぐためです。',
  'cookies.li2':
    'メートル法/ヤード・ポンド法の選択。ページごとに設定し直さずに済むようにするためです。',
  'cookies.p3':
    'どちらもブラウザのサイトデータ設定から削除できます。削除しても失われるのは設定だけです。',
  'cookies.h2Third': '第三者クッキー',
  'cookies.p4':
    '1 つもありません。第三者のスクリプト、埋め込み、フォント、画像を一切使っていないからです。サイトが読み込むリソースはすべて、このサイト自身のドメインから配信されます。',
  'cookies.h2Ads': '広告を有効にした場合',
  'cookies.p5':
    '広告は有効になっていません。表示用のコードは存在し、レイアウト上の領域も確保していますが、何も表示しません。有効にした場合、広告パートナーが独自のクッキーを設定することになるため、その前に同意バナーで確認し、さらにその前にこのページで一覧を示します。',

  // --- Chart, activity, lift and distance page templates ---
  'common.related': '関連',
  'common.lastReviewed': '最終確認日 {date}。',
  'common.category': 'カテゴリ',
  'common.weight': '体重',
  'common.duration': '時間',
  'chart.workItOut': '自分の数値で計算する',
  'chart.workItOutBody':
    'この表は計算ツールと同じ式から算出しているので、両者が食い違うことはありません。',
  'chart.relatedGuides': '関連する解説',
  'activity.h1': '{activity}の消費カロリー',
  'activity.metSection': 'MET 値とその出どころ',
  'activity.listedAs': '記載名',
  'activity.referenceNote':
    '総消費エネルギー（kcal）。体重の行と時間の列が交わるところを読んでください。体重 70 kg の人は 1 時間あたり約 {gross} kcal を消費し、そのうちおよそ {net} が安静時を上回る分です。',
  'activity.compareNote':
    '体重 70 kg で 30 分あたりの消費エネルギー。活動どうしを直接比べられます。',
  'activity.compareCaption': '関連する活動との比較',
  'activity.columnKcal30': 'kcal / 30 分',
  'activity.noscript':
    'リアルタイム計算には JavaScript が必要です。下の表はあらかじめ計算済みで、JavaScript なしでも使えます。',
  'activity.allActivities': 'すべての活動',
  'activity.metaDescription':
    '{activity}で消費するカロリーを、体重と時間から算出します。2024 年版 Adult Compendium の公表 MET 値 {met} を使用しています。',
  'lift.enterSet': 'セットを入力',
  'lift.typicalReps': '一般的なレップ数',
  'lift.percentageTableCaption': '1RM に対する割合と、そこで見込まれるレップ数',
  'lift.repMaxCaption': '挙上重量とレップ数から推定した 1RM',
  'lift.comparisonHeading': 'レップ数換算と式の比較',
  'lift.comparisonCaption': '100 kg × 5 レップで比較した 5 つの式',
  'distance.enterTime': 'ゴールタイムを入力',
  'search.typeCalculator': '計算ツール',
  'search.typeGuide': '解説',
  'search.typePage': 'ページ',
  'search.unavailable': '現在検索を利用できません。計算ツールの一覧にすべて載っています。',

  // --- Chart, activity, lift and distance page templates ---
  'metBand.light': '軽い側',
  'metBand.moderate': '中程度の帯',
  'metBand.vigorous': '高強度の帯',
  'metBand.demanding': 'きつい側',
  'netShare.none': 'なし',
  'netShare.percent': '{value} パーセント',

  // --- Programmatic page copy ---
  'activity.appName': '{activity}の消費カロリー計算ツール',
  'activity.howToName': '{activity}の消費カロリーの求め方',
  'activity.step1.name': '体重と時間を入力する',
  'activity.step1.text':
    'メートル法かヤード・ポンド法を選び、体重と{activity}に費やした時間を入力します。',
  'activity.step2.name': '結果を読む',
  'activity.step2.text':
    '入力に応じて結果が更新され、総消費エネルギーと安静時を上回る分の両方が表示されます。',
  'activity.step3.name': 'MET 値と出典を確かめる',
  'activity.step3.text':
    '{met} メッツという値の根拠となる Compendium コードと記載内容は、計算ツールの下に示しています。',
  'activity.faq.q1': '{activity}では何キロカロリー消費しますか。',
  'activity.faq.a1':
    '{met} メッツなら、体重 70 kg の人は 30 分で約 {kcal30} kcal を消費します。消費量は体重に比例するため、体重 90 kg の人は同じ内容でおよそ 3 分の 1 多く消費します。',
  'activity.faq.q2': '{activity}のメッツ値はいくつですか。',
  'activity.faq.a2':
    '{met} メッツで、Compendium コード {code} に収載されています。メッツは安静時代謝の倍数です。',
  'activity.faq.q3': '安静時代謝は差し引くべきですか。',
  'activity.faq.a3':
    'すでに安静時を含む維持カロリーに足すのであれば、差し引いてください。純消費は、運動していなくても消費していた 1 時間あたり約 1 メッツ時を取り除いた値で、{activity}では総量のおよそ {netShare} が残ります。',
  'activity.faq.q4': 'なぜ体重で答えが変わるのですか。',
  'activity.faq.a4':
    'メッツ値は体重 1 kg あたりのエネルギーなので、同じ活動でも体重が重いほど消費は大きくなります。体重を仮定ではなく入力項目にしているのはそのためであり、体重を伴わない一般的な「消費カロリー」の数字がほとんど意味を持たないのもそのためです。',
  'activity.faq.q5': 'この数値はどのくらい正確ですか。',
  'activity.faq.a5':
    '集団の平均から導いた推定値です。間接熱量測定との比較研究では個人差として 20 〜 30 パーセントのずれが報告されているため、活動どうしを比べる目安として使い、食べて取り戻すための帳簿としては扱わないでください。',
  'lift.h1': '{lift}の 1RM 計算ツール',
  'lift.metaDescription':
    '実施済みのセットから{liftLower}の 1RM を推定します。公表されている 5 つの式を比較し、トレーニング重量用のパーセンテージ表も示します。',
  'lift.howToName': '{liftLower}の 1RM を推定する方法',
  'lift.step1.name': '重量とレップ数を入力する',
  'lift.step1.text': '{liftLower}で挙げた重量と、完了したレップ数を入力します。',
  'lift.step2.name': '推定値を読む',
  'lift.step2.text': '5 つの式すべてと、その平均、そしてパーセンテージ表が表示されます。',
  'lift.step3.name': 'この種目での式のふるまいを確かめる',
  'lift.step3.text': '下の注記で、これらの式がこの動作に具体的にどう当てはまるかを説明しています。',
  'lift.faq.q1': '{liftLower}の最大重量はどう推定しますか。',
  'lift.faq.a1':
    '限界かその手前までのセットを行い、重量とレップ数を入力すれば、あとは式が計算します。重い 3 レップからの推定は 12 レップのセットより格段に信頼できます。5 つの式はいずれも 2 〜 10 レップの範囲で検証されているからです。',
  'lift.faq.q2': '{liftLower}で 1RM 推定は正確ですか。',
  'lift.faq.q3': 'どの式を使えばよいですか。',
  'lift.faq.a3':
    'Wathan と Epley は最も広い範囲で実測値をよく追い、Brzycki は最も保守的で 1 レップでは厳密に一致します。5 つの平均はどれか 1 つより根拠のある単一の数値であり、式どうしのばらつきがその推定にどれだけ信頼を置けるかを示します。',
  'lift.faq.q4': '{liftLower}に適したレップ範囲は。',
  'lift.faq.a4':
    'この種目はふつう {reps} レップの範囲で行われます。その範囲内から取った推定が最も信頼でき、式が当てはめられた領域に最も近いからです。',
  'lift.faq.q5': '実際に最大重量を測るべきですか。',
  'lift.faq.a5':
    '競技で数値が必要な場合に限り、補助者をつけて十分にウォームアップしてから行ってください。プログラム作成のためであれば、重い 3 レップからの推定でほぼ同等に役立ち、回復の負担もリスクもはるかに小さくて済みます。',
  'distance.h1': '{distance}のペース計算ツール',
  'distance.metaDescription':
    '{distance}のペース表と計算ツール。ペース・速度・ゴールタイムを相互換算し、スプリットとレース予測についての率直な注記も示します。',
  'distance.howToName': '{distanceLower}のペースの求め方',
  'distance.step1.name': 'ゴールタイムを入力する',
  'distance.step1.text':
    '{distanceLower}の目標タイムまたは実際のタイムを h:mm:ss または m:ss の形式で入力します。',
  'distance.step2.name': 'ペースを読む',
  'distance.step2.text':
    '1 km あたり・1 マイルあたりのペース、速度、スプリットが入力に応じて更新されます。',
  'distance.step3.name': 'ペース表を確かめる',
  'distance.step3.text': '下の表は、一般的な範囲のすべてのペースをゴールタイムに対応づけています。',
  'distance.faq.q1': '{short}で目標タイムを出すには、どのペースが必要ですか。',
  'distance.faq.a1':
    '目標タイムを距離（km）で割ります。{distance}なら 1 km あたり {midPace} で {midTime} になります。下の表は多くのランナーが実際に走る範囲をカバーしています。',
  'distance.faq.q2': '{short}のペース配分はどうすべきですか。',
  'distance.faq.q3': '{short}で記録を左右するものは何ですか。',
  'distance.faq.q4': '他の距離への換算は信頼できますか。',
  'distance.faq.a4':
    'できません。このページでもそう明記しています。換算は同じペースが別の距離でも保てる前提に立っていますが、実際には距離が伸びればペースは落ちます。疲労指数を用いる Riegel の式が、本来の予測に適した道具です。',
  'distance.faq.q5': 'スプリット表の最後の区間が中途半端なのはなぜですか。',
  'distance.faq.a5':
    '{distance}は {km} km で、スプリット間隔の整数倍にならないためです。最後の端数区間は省かずに表示しています。ゴール手前で終わる表は、いちばん肝心なところで間違っていることになるからです。',

  // --- Lift and distance page chrome ---
  'lift.weightLifted': '挙上重量',
  'lift.reps': 'レップ数',
  'lift.repsUnit': 'レップ',
  'lift.formula': '式',
  'lift.noscript':
    'リアルタイム計算には JavaScript が必要です。下の表はあらかじめ計算済みで、JavaScript なしでも使えます。',
  'lift.specificHeading': '{lift}について',
  'lift.estimateHeading': '重量とレップ数から見た{lift}の推定最大重量',
  'lift.estimateNote':
    'Epley 式による推定値（kg）。挙げた重量の行と、こなしたレップ数の列が交わるところを読んでください。10 レップを超える列も示していますが、最も信頼性が低い範囲です。',
  'lift.percentageHeading': 'パーセンテージ表',
  'lift.percentageNote':
    '最大重量 100 kg を基準にしたトレーニング重量と、その割合で通常こなせるレップ数です。ご自身の推定値に比例して換算してください。',
  'lift.columnPercentage': '割合',
  'lift.columnLoad100': '100 kg 基準の重量',
  'lift.columnApproxReps': 'おおよそのレップ数',
  'lift.conversionHeading': 'レップ数換算',
  'lift.conversionNote':
    '推定最大重量 100 kg が各レップ数で何 kg に相当するか、また 100 kg × 5 レップで 5 つの式がどう比較されるかを示します。',
  'lift.columnLoadFor100': '最大 100 kg のときの重量',
  'lift.column100x5': '100 kg × 5 レップ',
  'lift.otherLifts': 'ほかの種目',
  'lift.formulasGuide': '1RM の式はどう違うか',
  'distance.finishTime': 'ゴールタイム',
  'distance.noscript':
    'リアルタイム計算には JavaScript が必要です。下のペース表はあらかじめ計算済みで、JavaScript なしでも使えます。',
  'distance.aboutHeading': '{distance}について',
  'distance.length': '距離: {km} km（{metres} m）。',
  'distance.fixedByRules': 'World Athletics 競技規則第 55 条で定められています。',
  'distance.chartHeading': '{distance}のペース表',
  'distance.chartNote':
    '1 km あたりの各ペースに対する、ゴールタイム・1 マイルあたりのペース・速度です。すべてメートルと秒で計算して一度だけ換算しているため、表を下るにつれて丸め誤差が積み上がることはありません。',
  'distance.columnPaceKm': 'ペース / km',
  'distance.columnPaceMile': 'ペース / マイル',
  'distance.columnSpeed': '速度',
  'distance.columnDistance': '距離',
  'distance.columnElapsed': '経過',
  'distance.otherDistances': 'ほかの距離',
  'distance.paceChartGuide': 'ペース表の読み方',

  // --- Prose page detail ---
  'about.h2Absent': 'あえて置いていないもの',
  'about.pAbsent':
    '一部の計算ツールは意図的に置いていません。腎機能、抗がん剤投与量のための体表面積、血中アルコール濃度は、いずれも実際の判断に直結する数値であり、臨床家の領分です。妊娠・妊よう性の計算ツールは健康分野で最も厳しく精査されるカテゴリであり、確立した医学出版社が適切に担っています。',
  'about.h2Built': 'どう作られているか',
  'about.pBuilt':
    '静的ページで、アカウントもデータベースもありません。計算はブラウザ内で実行され、送信先となるサーバーそのものが存在しません。すべての式は、出典論文に載っている計算例と自動テストで突き合わせて検証しています。計算ツールを静かに間違わせる転記ミスは、これで捕まえます。',
  'contact.h2NoForm': '問い合わせフォームがない理由',
  'contact.pNoForm':
    'フォームには送信先が必要で、つまりサーバーが必要になり、つまりあなたのメッセージが保存される場所と、守るべきものがもう一つ増えます。このサイトはバックエンドのない静的ファイルで、そうしていることこそが、計算ツールに入力した内容が端末の外に出ない理由です。メールアドレスはそれに見合う交換だと考えています。',
  'contact.ownerNotice':
    '運営者記入欄: 公開前に src/config/site.ts の連絡先アドレスを差し替えてください。ここ、プライバシーポリシー、利用規約、security.txt に表示され、そのファイル 1 つを変えればすべて更新されます。',

  // --- Short meta title, distinct from the H1 ---
  'lift.metaTitle': '{lift}の 1RM 計算ツール',

  // --- Short meta title for activity pages ---
  'activity.metaTitle': '消費カロリー: {activity}',

  // --- Imperial height sub-fields, which need their own labels ---
  'calc.heightFeet': '身長（フィート）',
  'calc.heightInches': '身長（インチ）',
};
