/**
 * @typedef {{
 *   id: 'a' | 'b' | 'c', title: string, image: string, alt: string,
 *   revision: string, angle: string, annotation: string,
 *   change: string, reason: string, arrowSide: 'left' | 'right'
 * }} Variant
 * @typedef {{ label: string, detail: string, arrow: { origin: [number, number], bend: [number, number], target: [number, number] } }} OriginalIssue
 * @typedef {{
 *   id: string, channel: string, topic: string, videoUrl: string,
 *   original: { title: string, image: string, alt: string, note?: string, issues?: OriginalIssue[] },
 *   whatChanged: string, why: string, variants: Variant[],
 *   caveat?: string
 * }} CaseStudy
 */

/** @type {CaseStudy[]} */
export const cases = [
  {
    id: 'seven-platforms',
    channel: 'Do Brasil ao Canadá',
    topic: 'Finding work from Brazil',
    videoUrl: 'https://www.youtube.com/watch?v=J3O1sJKtykA',
    original: {
      title: '7 Plataformas para você conquistar sua Job Offer estando no Brasil',
      image: './assets/cases/seven-platforms/original.webp',
      alt: 'Original thumbnail with the presenter, a 7 CAMINHOS PARA JOB OFFER headline, and a Canada flag.',
      issues: [
        { label: 'A broad promise', detail: '“7 CAMINHOS” is broader than the seven platforms in the video.', arrow: { origin: [1210, 290], bend: [1150, 255], target: [1080, 220] } },
        { label: 'No first action', detail: '“JOB OFFER” names the goal without showing a search route.', arrow: { origin: [1220, 445], bend: [1160, 430], target: [1050, 410] } },
        { label: 'A generic cue', detail: 'The flag takes space that could show a platform or job search.', arrow: { origin: [1200, 650], bend: [1150, 620], target: [1030, 570] } }
      ]
    },
    whatChanged: 'The broad job-offer promise became three different entry points: a hidden list, the cost of waiting for a recruitment mission, and experience that can start before moving.',
    why: 'The video presents seven platforms and distinguishes remote work, in-person opportunities, and career experience. Each direction uses a different supported part of that discussion.',
    variants: [
      {
        id: 'a', revision: 'R15 A',
        title: '7 plataformas para buscar vagas no Canadá ainda no Brasil',
        image: './assets/cases/seven-platforms/a.webp',
        alt: 'Ricardo beside a platform interface with the words VOCÊ CONHECE AS 7?',
        angle: 'The hidden list', annotation: 'one known, six to discover',
        change: 'One familiar platform cues the topic while the other six stay open.',
        reason: 'The title gives the practical Canada-from-Brazil context; the image leaves a clear question.',
        arrowSide: 'right'
      },
      {
        id: 'b', revision: 'R17 B4-v3',
        title: 'Não espere a próxima missão: 7 plataformas para buscar vagas no Canadá',
        image: './assets/cases/seven-platforms/b.webp',
        alt: 'Ricardo by an open doorway and Toronto skyline with MISSÃO NÃO BASTA in large type.',
        angle: 'The waiting trap', annotation: 'a route beyond the mission',
        change: 'A time-bound recruitment mission becomes the tension; the title offers seven ongoing search routes.',
        reason: 'The video treats missions as occasional and the platforms as options people can explore in between.',
        arrowSide: 'left'
      },
      {
        id: 'c', revision: 'R18 C5, user-selected',
        title: 'Como ganhar experiência com empresas canadenses ainda no Brasil',
        image: './assets/cases/seven-platforms/c.webp',
        alt: 'Ricardo holding a résumé with ISSO CONTA NO CV in large type.',
        angle: 'Progress before arrival', annotation: 'the résumé payoff',
        change: 'The frame moves from finding a vacancy to gaining work experience for a résumé before relocation.',
        reason: 'It connects the video’s career-experience point to building a stronger résumé.',
        arrowSide: 'right'
      }
    ],
    caveat: 'These three directions were selected across separate reviewed revisions; they were not run as one live A/B/C test.'
  },
  {
    id: 'canadian-resume',
    channel: 'Do Brasil ao Canadá',
    topic: 'Canadian résumé mistakes',
    videoUrl: 'https://www.youtube.com/watch?v=CBhkd-rRwGM',
    original: {
      title: 'How to format your resume for the CANADIAN standard.',
      image: './assets/cases/canadian-resume/original.webp',
      alt: 'Captured original résumé thumbnail with the presenter and CURRÍCULO CANADENSE text.',
      note: 'Localized title captured at the source snapshot; the original Portuguese wording was not verified.',
      issues: [
        { label: 'Only the topic', detail: '“CURRÍCULO CANADENSE” does not name any of the five mistakes.', arrow: { origin: [1220, 335], bend: [1150, 320], target: [1040, 305] } },
        { label: 'A flag, not a résumé', detail: 'The flag repeats Canada without showing the document at issue.', arrow: { origin: [1200, 535], bend: [1120, 510], target: [1020, 470] } },
        { label: 'Unrelated backdrop', detail: 'The street scene adds no visible format, wording, or vacancy cue.', arrow: { origin: [1165, 675], bend: [1160, 650], target: [1110, 615] } }
      ]
    },
    whatChanged: 'The general résumé topic became three concrete problems: an overlong document, literal translation, and a résumé that fails to match a vacancy.',
    why: 'The video discusses five mistakes, including length, translation and wording, and tailoring to a job. The designs make one of those ideas visible at a time.',
    variants: [
      {
        id: 'a', revision: 'R08 A',
        title: 'Currículo canadense: 5 erros que podem eliminar sua candidatura',
        image: './assets/cases/canadian-resume/a.webp',
        alt: 'Ricardo with a large one-page résumé cue.',
        angle: 'A visible length problem', annotation: 'make the first error tangible',
        change: 'A simple “1 PÁGINA” cue turns document length into a visible question.',
        reason: 'Length is one of the five issues the video covers; the title keeps the larger list in view.',
        arrowSide: 'left'
      },
      {
        id: 'b', revision: 'R08 B',
        title: 'Traduzir não basta: 5 erros no currículo para o Canadá',
        image: './assets/cases/canadian-resume/b.webp',
        alt: 'Ricardo beside résumé imagery with NÃO BASTA TRADUZIR text.',
        angle: 'Beyond translation', annotation: 'translation is not adaptation',
        change: 'The image challenges the idea that translating a document finishes the job.',
        reason: 'The video explains that format and wording need adaptation beyond a direct translation.',
        arrowSide: 'right'
      },
      {
        id: 'c', revision: 'R08 C, recommended',
        title: 'Como adaptar seu currículo para cada vaga no Canadá: 5 erros a evitar',
        image: './assets/cases/canadian-resume/c.webp',
        alt: 'Ricardo between a vacancy and résumé with SEU CURRÍCULO ESTÁ TE SABOTANDO text.',
        angle: 'Match the vacancy', annotation: 'one clear relationship',
        change: 'The vacancy-to-résumé arrow shows the missing relationship between a role and an application.',
        reason: 'Tailoring the résumé to vacancy keywords is discussed in the video; the title supplies the exact task.',
        arrowSide: 'left'
      }
    ]
  },
  {
    id: 'first-car',
    channel: 'Viver no Canadá',
    topic: 'First-car costs',
    videoUrl: 'https://www.youtube.com/watch?v=bc0uEfQow48',
    original: {
      title: 'COMPREI UM CARRO NO CANADÁ… MAS NÃO ESPERAVA ESSES GASTOS!',
      image: './assets/cases/first-car/original.webp',
      alt: 'Captured original first-car thumbnail with a broad cost headline, six question-mark expense rows, and an É MUITO CARO? tag.',
      issues: [
        { label: 'A broad headline', detail: 'The large cost question hides the specific first-car surprise.', arrow: { origin: [790, 65], bend: [755, 130], target: [690, 190] } },
        { label: 'Too many questions', detail: 'Six expense rows with question marks compete for attention.', arrow: { origin: [905, 70], bend: [945, 160], target: [1020, 270] } },
        { label: 'A second hook', detail: '“É MUITO CARO?” repeats the question instead of adding an answer.', arrow: { origin: [520, 665], bend: [465, 655], target: [380, 625] } }
      ]
    },
    whatChanged: 'A broad surprise about car costs became a precise annual insurance figure, a purchase-to-cost story, and an insurer-comparison decision.',
    why: 'The creator recounts buying a first car, calling several insurers, and paying roughly CAD 2,800–2,900 for the year. Each pair emphasizes a different part of that experience.',
    variants: [
      {
        id: 'a', revision: 'R01 A-r01',
        title: 'O Seguro do Meu Primeiro Carro no Canadá Custou Quase CAD 3 Mil',
        image: './assets/cases/first-car/a.webp',
        alt: 'Creator-led car insurance thumbnail emphasizing an annual cost near CAD 3,000.',
        angle: 'The concrete number', annotation: 'a cost you can grasp',
        change: 'The annual insurance amount replaces a vague “unexpected costs” tease.',
        reason: 'The rounded figure reflects the creator’s account and gives viewers a specific planning question.',
        arrowSide: 'right'
      },
      {
        id: 'b', revision: 'R01 B-r01',
        title: 'Comprei Meu Primeiro Carro no Canadá — e Só Então Vieram Estes Gastos',
        image: './assets/cases/first-car/b.webp',
        alt: 'Creator-led first-car thumbnail showing costs that followed the purchase.',
        angle: 'After the purchase', annotation: 'the next beat of the story',
        change: 'The packaging makes the purchase the start of a cost story rather than the whole story.',
        reason: 'The video moves from getting the car into insurance and registration expenses.',
        arrowSide: 'left'
      },
      {
        id: 'c', revision: 'R01 C-r02, recommended',
        title: 'Comparei Várias Seguradoras no Canadá — Quanto Acabei Pagando',
        image: './assets/cases/first-car/c.webp',
        alt: 'Creator beside stylized insurance comparison cards and a final-choice cue.',
        angle: 'The decision process', annotation: 'several quotes → one choice',
        change: 'Stylized comparison cards replace a single price reveal.',
        reason: 'The comparison cards visualize the creator’s process of calling several insurers before choosing one.',
        arrowSide: 'right'
      }
    ]
  },
  {
    id: 'starting-over',
    channel: 'Viver no Canadá',
    topic: 'What I would change',
    videoUrl: 'https://www.youtube.com/watch?v=j-YDiBzoveI',
    original: {
      title: 'Eu faria tudo isso DIFERENTE se viesse pro Canadá hoje…',
      image: './assets/cases/starting-over/original.webp',
      alt: 'Captured original thumbnail with ERROS QUE EU COMETI, a dense lower-left checklist, and NÃO FAÇA ISSO text.',
      issues: [
        { label: 'A broad warning', detail: '“ERROS” is loud but does not identify the four decisions.', arrow: { origin: [640, 460], bend: [670, 300], target: [620, 175] } },
        { label: 'A crowded list', detail: 'The small checklist asks viewers to read too many topics at once.', arrow: { origin: [345, 460], bend: [315, 510], target: [250, 560] } },
        { label: 'Another vague command', detail: '“NÃO FAÇA ISSO!” adds a second message without naming an action.', arrow: { origin: [1055, 270], bend: [1105, 220], target: [1170, 170] } }
      ]
    },
    whatChanged: 'A crowded list of things to do differently became three cleaner ways into the same personal story: warning, hindsight, and a constructive reset.',
    why: 'The video names four decisions the presenter would change. The alternatives keep that first-person perspective while changing how quickly the viewer understands the promise.',
    variants: [
      {
        id: 'a', revision: 'R01 A-r02',
        title: '4 ERROS que eu NÃO cometeria se viesse pro Canadá hoje',
        image: './assets/cases/starting-over/a.webp',
        alt: 'Presenter with a bold NÃO REPITA warning and four compact topic cues.',
        angle: 'Direct prevention', annotation: 'four mistakes, one warning',
        change: 'A single warning headline replaces the original’s dense checklist.',
        reason: 'It frames the four first-person decisions as mistakes a new arrival can learn from.',
        arrowSide: 'left'
      },
      {
        id: 'b', revision: 'R01 B-r02, recommended',
        title: 'O que eu queria ter sabido ANTES de vir pro Canadá',
        image: './assets/cases/starting-over/b.webp',
        alt: 'Presenter shown across past and present with EU NÃO SABIA text.',
        angle: 'The hindsight gap', annotation: 'past self ↔ present self',
        change: 'The visual makes the presenter’s earlier uncertainty the main story.',
        reason: 'The opening supports a reflective “what I wish I knew” question.',
        arrowSide: 'right'
      },
      {
        id: 'c', revision: 'R01 C-r02',
        title: 'Se eu chegasse no Canadá HOJE, faria estas 4 coisas',
        image: './assets/cases/starting-over/c.webp',
        alt: 'Presenter-led positive reset thumbnail with EU FARIA ASSIM text.',
        angle: 'A practical reset', annotation: 'from regret to a plan',
        change: 'The same four lessons become a forward-looking plan.',
        reason: 'The video’s first-person examples support a constructive hypothetical for a new arrival.',
        arrowSide: 'left'
      }
    ]
  },
  {
    id: 'tampa-future',
    channel: 'MORAR EM TAMPA BAY',
    topic: 'A city in motion',
    videoUrl: 'https://www.youtube.com/watch?v=90oiMU4xRcc',
    original: {
      title: 'Tampa está mudando: 18 novidades que você precisa conhecer',
      image: './assets/cases/tampa-future/original.webp',
      alt: 'Captured YouTube thumbnail with two presenters and the words ANTES DE ESCOLHER ORLANDO, CONHEÇA, and TAMPA 2026.',
      issues: [
        {
          label: 'The wrong lead',
          detail: 'Orlando leads, but this video is about Tampa’s 18 changes.',
          arrow: { origin: [62, 280], bend: [150, 245], target: [185, 208] }
        },
        {
          label: 'A hidden key word',
          detail: '“CONHEÇA” is partly covered by the presenters.',
          arrow: { origin: [550, 490], bend: [650, 452], target: [680, 427] }
        },
        {
          label: 'The missed hook',
          detail: '“TAMPA 2026” dominates while the 18-change hook is missing.',
          arrow: { origin: [524, 677], bend: [662, 658], target: [708, 648] }
        }
      ]
    },
    whatChanged: 'The original leads with Orlando and a broad Tampa 2026 cue. The three selected concepts focus on a prospective mover’s decision, residents’ daily life, and changes beyond construction.',
    why: 'The video surveys 18 developments and asks viewers to consider Tampa Bay over five, ten, and twenty years. The concepts connect those developments to the decisions of prospective movers and current residents.',
    variants: [
      {
        id: 'a', revision: 'User-selected A',
        title: 'Você moraria em Tampa Bay sem conhecer estas 18 mudanças?',
        image: './assets/cases/tampa-future/a.webp',
        alt: 'Selected A concept: presenter beside construction and E DAQUI A 10 ANOS? text.',
        angle: 'The future-life question', annotation: 'a decision across time',
        change: 'The Orlando lead becomes a question about living with Tampa Bay’s changes over time.',
        reason: 'The video closes with a five-, ten-, and twenty-year decision lens; the thumbnail makes that time horizon concrete.',
        arrowSide: 'right'
      },
      {
        id: 'b', revision: 'User-selected B',
        title: 'Tampa Bay está crescendo — mas como fica a vida de quem mora lá?',
        image: './assets/cases/tampa-future/b.webp',
        alt: 'Selected B concept: presenter beside a city crossing and E DEPOIS? text.',
        angle: 'The resident-impact question', annotation: 'what happens to daily life?',
        change: 'Growth becomes the setup for a question about residents’ daily experience.',
        reason: 'The video connects new developments to residents’ daily life.',
        arrowSide: 'left'
      },
      {
        id: 'c', revision: 'User-selected C',
        title: '18 mudanças em Tampa Bay: o que existe além dos novos prédios?',
        image: './assets/cases/tampa-future/c.webp',
        alt: 'Selected C concept: presenter between construction and a city crossing under NOVA FASE? text.',
        angle: 'Beyond the buildings', annotation: 'more than construction',
        change: 'The title shifts from buildings alone to the wider urban-life story.',
        reason: 'The video covers mobility, neighborhoods, and amenities alongside construction.',
        arrowSide: 'right'
      }
    ],
    caveat: 'Selected evaluation concepts. These images contain AI-treated portraits whose likeness has not been verified. They were not creator-endorsed, uploaded, or live-tested; the scenes do not document completed future projects.'
  },
  {
    id: 'two-countries',
    channel: 'iConnect Solutions',
    topic: 'Brazil and US tax support',
    videoUrl: 'https://www.youtube.com/watch?v=dA1IchnrMnU',
    original: {
      title: 'PRAZO FINAL 15 DE OUTUBRO: DECLARAÇÃO DE IMPOSTOS NOS EUA — VOCÊ ESTÁ PREPARADO?',
      image: './assets/cases/two-countries/original.webp',
      alt: 'Captured original deadline-led tax thumbnail with Emerson, outlined ATENÇÃO, red PRAZO, and a large OUT.15 date.',
      issues: [
        { label: 'A vague alarm', detail: '“ATENÇÃO” is large but does not say what viewers will learn.', arrow: { origin: [95, 320], bend: [140, 260], target: [220, 190] } },
        { label: 'Urgency leads', detail: '“PRAZO” foregrounds a deadline over the two-country discussion.', arrow: { origin: [90, 465], bend: [180, 440], target: [275, 415] } },
        { label: 'Date without context', detail: '“OUT.15” dominates without explaining the deadline in the image.', arrow: { origin: [1170, 660], bend: [1100, 630], target: [1000, 600] } }
      ]
    },
    whatChanged: 'The deadline-led original became three questions about attention across Brazil and the US, the reported request for one place to ask, and coordination between the two sides.',
    why: 'The presenter describes a client request for simpler support across both countries. The redesigns turn that request into questions about attention, simplicity, and coordination.',
    variants: [
      {
        id: 'a', revision: 'R05 A, carried from R03',
        title: 'Impostos nos EUA: quem está olhando também para o Brasil?',
        image: './assets/cases/two-countries/a.webp',
        alt: 'Emerson beside a Brazil and US attention graphic with E O OUTRO PAÍS? text.',
        angle: 'The overlooked side', annotation: 'shift the attention',
        change: 'The question redirects attention from one country to the other.',
        reason: 'The video’s two-country discussion gives the thumbnail a clear contrast between Brazil and the US.',
        arrowSide: 'right'
      },
      {
        id: 'b', revision: 'R05 B, user-selected artwork',
        title: 'Por que clientes pediram apoio fiscal para Brasil e EUA no mesmo lugar?',
        image: './assets/cases/two-countries/b.webp',
        alt: 'Emerson centered between Brazil and US imagery with DOIS PAÍSES. UM LUGAR? text.',
        angle: 'The client request', annotation: 'two places, one question',
        change: 'A split Brazil/US composition puts the presenter between both contexts.',
        reason: 'The title reflects the reported request for a simpler one-place discussion.',
        arrowSide: 'left'
      },
      {
        id: 'c', revision: 'R05 C, carried from R04',
        title: 'Seus impostos cruzam Brasil e EUA. Seu atendimento também?',
        image: './assets/cases/two-countries/c.webp',
        alt: 'Emerson pointing toward a two-country diagram with QUEM FAZ A PONTE? text.',
        angle: 'The missing bridge', annotation: 'make coordination visible',
        change: 'A simple diagram asks whether support connects the two jurisdictions.',
        reason: 'The diagram makes the coordination question between Brazil and the US visible.',
        arrowSide: 'right'
      }
    ],
    caveat: 'Provisional concept. The publisher has not confirmed present service scope or validated the source video’s tax and deadline statements.'
  }
];
