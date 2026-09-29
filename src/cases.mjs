/**
 * @typedef {{
 *   id: 'a' | 'b' | 'c', title: string, image: string, alt: string,
 *   revision: string, angle: string, annotation: string,
 *   change: string, reason: string, arrowSide: 'left' | 'right'
 * }} Variant
 * @typedef {{
 *   id: string, channel: string, topic: string, videoUrl: string,
 *   original: { title: string, image: string, alt: string, note?: string },
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
      alt: 'Original seven-platform thumbnail with the presenter and job-search theme.'
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
        reason: 'It follows the video’s career-experience point without suggesting immigration credit or a job guarantee.',
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
      note: 'Localized title captured at the source snapshot; the original Portuguese wording was not verified.'
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
      alt: 'Captured original first-car thumbnail with the presenter and car-cost theme.'
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
        reason: 'The creator describes calling several insurers before choosing one; the cards are an illustration, not measured quote data.',
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
      alt: 'Captured original starting-over thumbnail with the presenter and multiple advice points.'
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
        reason: 'The opening supports a reflective “what I wish I knew” question without promising a guaranteed outcome.',
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
      alt: 'Captured original Tampa Bay thumbnail featuring the presenter and city-change theme.'
    },
    whatChanged: 'The 18-item overview became a question about future daily life, a moving-to-Tampa guide, and a broader urban-life frame.',
    why: 'The video discusses 18 developments and a five-, ten-, and twenty-year decision lens. Some projects are proposed, so the concepts ask about change without depicting a guaranteed future.',
    variants: [
      {
        id: 'a', revision: 'R02 A-r02',
        title: 'A Tampa onde você vai viver está sendo construída agora',
        image: './assets/cases/tampa-future/a.webp',
        alt: 'Presenter beside a construction scene and E DAQUI A 10 ANOS? question.',
        angle: 'The future-life question', annotation: 'today → ten years?',
        change: 'A time arrow connects today’s building activity to a possible future lived experience.',
        reason: 'The closing asks viewers to consider a five-, ten-, or twenty-year living decision.',
        arrowSide: 'right'
      },
      {
        id: 'b', revision: 'R02 B-r02',
        title: 'Antes de morar em Tampa Bay, entenda estas 18 mudanças',
        image: './assets/cases/tampa-future/b.webp',
        alt: 'Presenter beside a real street scene with O QUE VEM AÍ? in large type.',
        angle: 'The mover’s guide', annotation: 'make the audience explicit',
        change: 'The title speaks to a future resident rather than only listing local news.',
        reason: 'The video’s opening connects the changes to a decision about living in the area.',
        arrowSide: 'left'
      },
      {
        id: 'c', revision: 'R02 C-r03',
        title: 'Tampa Bay: 18 mudanças em bairros, mobilidade e vida urbana',
        image: './assets/cases/tampa-future/c.webp',
        alt: 'Two presenters and real city footage with ALÉM DOS PRÉDIOS? text.',
        angle: 'Beyond the buildings', annotation: 'more than construction',
        change: 'The image and title widen the frame to neighborhoods, mobility and everyday life.',
        reason: 'Those categories appear in the video, while the design avoids treating proposals as finished places.',
        arrowSide: 'right'
      }
    ],
    caveat: 'City footage and presenters come from the source video; the layouts do not document completed future projects.'
  },
  {
    id: 'two-countries',
    channel: 'iConnect Solutions',
    topic: 'Brazil and US tax support',
    videoUrl: 'https://www.youtube.com/watch?v=dA1IchnrMnU',
    original: {
      title: 'PRAZO FINAL 15 DE OUTUBRO: DECLARAÇÃO DE IMPOSTOS NOS EUA — VOCÊ ESTÁ PREPARADO?',
      image: './assets/cases/two-countries/original.webp',
      alt: 'Captured original deadline-led US tax thumbnail with Emerson.'
    },
    whatChanged: 'The deadline-led original became three questions about attention across Brazil and the US, the reported request for one place to ask, and coordination between the two sides.',
    why: 'The presenter describes a client request for simpler support across both countries. The redesigns frame that discussion as questions, not proof of completed service coverage.',
    variants: [
      {
        id: 'a', revision: 'R05 A, carried from R03',
        title: 'Impostos nos EUA: quem está olhando também para o Brasil?',
        image: './assets/cases/two-countries/a.webp',
        alt: 'Emerson beside a Brazil and US attention graphic with E O OUTRO PAÍS? text.',
        angle: 'The overlooked side', annotation: 'shift the attention',
        change: 'The question redirects attention from one country to the other.',
        reason: 'The video introduces a two-country service discussion, while leaving specific tax obligations open.',
        arrowSide: 'right'
      },
      {
        id: 'b', revision: 'R05 B, user-selected artwork',
        title: 'Por que clientes pediram apoio fiscal para Brasil e EUA no mesmo lugar?',
        image: './assets/cases/two-countries/b.webp',
        alt: 'Emerson centered between Brazil and US imagery with DOIS PAÍSES. UM LUGAR? text.',
        angle: 'The client request', annotation: 'two places, one question',
        change: 'A split Brazil/US composition puts the presenter between both contexts.',
        reason: 'The title reflects the reported request for a simpler one-place discussion, not verified current service capacity.',
        arrowSide: 'left'
      },
      {
        id: 'c', revision: 'R05 C, carried from R04',
        title: 'Seus impostos cruzam Brasil e EUA. Seu atendimento também?',
        image: './assets/cases/two-countries/c.webp',
        alt: 'Emerson pointing toward a two-country diagram with QUEM FAZ A PONTE? text.',
        angle: 'The missing bridge', annotation: 'make coordination visible',
        change: 'A simple diagram asks whether support connects the two jurisdictions.',
        reason: 'It illustrates a possible coordination need without asserting that an actual client case failed.',
        arrowSide: 'right'
      }
    ],
    caveat: 'Provisional concept. The publisher has not confirmed present service scope or validated the source video’s tax and deadline statements.'
  }
];
