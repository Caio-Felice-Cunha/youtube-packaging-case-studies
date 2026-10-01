/** @type {import('./cases.mjs').CaseStudy[]} */
export const englishCases = [
  {
    id: 'start-before-ready', language: 'en', channel: 'Kyle Di Felice',
    topic: 'Start before you feel ready', videoUrl: 'https://www.youtube.com/watch?v=dGCgbkmr69k',
    original: {
      title: 'Give me 104 seconds... I’ll DELETE your need to feel ready', image: './assets/cases/start-before-ready/original.webp',
      alt: 'Kyle in a starting stance beside a glowing battery marked 1% and STILL START text.',
      issues: [
        { label: 'Energy, not the obstacle', detail: 'The battery makes low energy the headline; the video focuses on taking a first step before feeling ready.', arrow: { origin: [1200, 100], bend: [1100, 105], target: [1040, 185] } },
        { label: 'Advice without a method', detail: '“STILL START” gives the instruction without showing the cue or small action that makes starting easier.', arrow: { origin: [1210, 650], bend: [1170, 610], target: [1100, 575] } },
        { label: 'An athletic detour', detail: 'The sprinting pose suggests a fitness challenge, while the advice applies to everyday tasks.', arrow: { origin: [65, 610], bend: [110, 540], target: [165, 490] } }
      ]
    },
    whatChanged: 'A low-battery metaphor became three ways into the same problem: familiar excuses, the gap between hesitation and action, and one small first move.',
    why: 'Kyle’s advice is to begin before motivation arrives. Each pair makes that decision visible while the title gives viewers a personal reason to care.',
    variants: [
      {
        id: 'a', revision: 'R05 A', title: 'Are You Giving Your Mood Control Over You?',
        image: './assets/cases/start-before-ready/a.webp',
        alt: 'Kyle looks up beneath NOT READY, surrounded by handwritten excuses including later, tomorrow and more energy.',
        angle: 'Recognize the waiting loop', annotation: 'familiar excuses',
        annotationPath: 'M1140 620 Q1240 620 1180 570 M1170 600 L1180 570 L1207 584',
        change: 'A close face and familiar inner dialogue turn an abstract energy problem into a recognizable moment of hesitation.',
        reason: 'The image supplies the excuses; the title asks who is in control. Together they connect directly to starting before the mood changes.', arrowSide: 'right'
      },
      {
        id: 'b', revision: 'R05 B', title: "What If You Don't Have To Feel Ready To Start?",
        image: './assets/cases/start-before-ready/b.webp',
        alt: 'Kyle’s side profile on orange, split by a jagged gap with small figures bridging it and START below.',
        angle: 'Cross the mental gap', annotation: 'hesitation becomes a gap',
        change: 'An orange field, a single profile and a bridged fissure make the distance between thinking and starting the central image.',
        reason: 'The title challenges waiting for readiness, while the visual gives that internal obstacle a clear physical shape.', arrowSide: 'left'
      },
      {
        id: 'c', revision: 'R05 C', title: "Can't Get Started? Do This Before You Begin",
        image: './assets/cases/start-before-ready/c.webp',
        alt: 'Kyle’s portrait beside trees and a pale blue sky with ONE SAFE MOVE in large letters.',
        angle: 'Shrink the first step', annotation: 'one manageable move',
        change: 'A quieter composition replaces a full-effort start with one safe move.',
        reason: 'Kyle describes choosing a cue and a small first action, such as putting shoes on. The pair makes that practical entry point the reason to watch.', arrowSide: 'left'
      }
    ]
  },
  {
    id: 'cost-of-overtime', language: 'en', channel: 'Nurses to Riches',
    topic: 'The cost of one more shift', videoUrl: 'https://www.youtube.com/watch?v=Pma2Yg1vTfo',
    original: {
      title: 'I Stopped Working OVERTIME As a NURSE Once I Learned This', image: './assets/cases/cost-of-overtime/original.webp',
      alt: 'Jason lies on a hospital corridor floor under large 2 HOURS text, with OF SLEEP across the bottom.',
      issues: [
        { label: 'One cost, little context', detail: '“2 HOURS” leads with sleep loss without showing why overtime once felt worth it.', arrow: { origin: [90, 365], bend: [85, 330], target: [100, 295] } },
        { label: 'The reversal is missing', detail: 'The corridor conveys exhaustion but leaves out the debt payoff that makes his decision to stop surprising.', arrow: { origin: [1190, 420], bend: [1120, 445], target: [1010, 470] } },
        { label: 'The text outweighs the story', detail: 'The second oversized line completes the sleep statement instead of making room for the financial or family stakes.', arrow: { origin: [1170, 660], bend: [1140, 600], target: [1090, 600] } }
      ]
    },
    whatChanged: 'The sleep-loss headline became three fuller tensions: paying off debt and then stopping, the personal cost of extra shifts, and how fatherhood changes the value of time.',
    why: 'Jason describes overtime helping clear roughly $128K of debt, then explains its effects on sleep and family life. The concepts each isolate one reason his priorities changed.',
    variants: [
      {
        id: 'a', revision: 'A R20 / titles R17', title: 'Nurse Overtime Paid Off $128K Of Debt. Then I Stopped.',
        image: './assets/cases/cost-of-overtime/a.webp',
        alt: 'Jason lies awake on a bed beside bundles of cash, with WHY STOP? across the lower edge.',
        angle: 'Success creates a question', annotation: 'money meets a stopping point',
        change: 'Cash and a sleepless face put the benefit and the cost of overtime in the same frame.',
        reason: 'The title establishes the debt payoff; WHY STOP? opens the question the rest of Jason’s story answers.', arrowSide: 'left'
      },
      {
        id: 'b', revision: 'B R22 / titles R17', title: 'What Nurse Overtime Was Really Costing Me',
        image: './assets/cases/cost-of-overtime/b.webp',
        alt: 'Jason stands in scrubs at the center of a hospital corridor while blurred staff move around him.',
        angle: 'The person inside the workload', annotation: 'one still figure, a busy shift',
        change: 'A centered nurse and moving surroundings replace a written sleep statistic with a sense of strain.',
        reason: 'The image establishes the work environment; the title opens the wider personal cost discussed in the video.', arrowSide: 'right'
      },
      {
        id: 'c', revision: 'C R15 / titles R17', title: 'Becoming A Dad Changed What Overtime Was Worth',
        image: './assets/cases/cost-of-overtime/c.webp',
        alt: 'Jason rests his head on folded scrubs at a nurses’ station, beside a small toy car.',
        angle: 'Time has another value', annotation: 'a small cue to family life',
        change: 'The tired face and toy car bring work and fatherhood into one composition.',
        reason: 'Jason says being present for his son mattered more than reaching a financial target. The title gives the small family cue its meaning.', arrowSide: 'left'
      }
    ]
  },
  {
    id: 'halloween-at-home', language: 'en', channel: 'Miller Family Vibes',
    topic: 'When Halloween takes over', videoUrl: 'https://www.youtube.com/watch?v=ttuye8C0Uss',
    original: {
      title: 'NEW 2026 Halloween Decorate With Me! Fall Halloween Decorating Ideas! Decorate and Bake', image: './assets/cases/halloween-at-home/original.webp',
      alt: 'A collage of Tricia, Halloween decorations, light-up ghosts and brownies beneath Halloween decorate with me text.',
      issues: [
        { label: 'A category, no question', detail: '“Halloween decorate with me” describes the format without surfacing a specific decorating dilemma.', arrow: { origin: [1160, 300], bend: [1050, 300], target: [940, 290] } },
        { label: 'Too many small scenes', detail: 'The ghosts, kitchen and brownies compete across separate panels, with no single project leading.', arrow: { origin: [780, 665], bend: [850, 630], target: [940, 580] } },
        { label: 'The host gets lost', detail: 'Tricia occupies a small corner, making her reaction harder to read on a phone.', arrow: { origin: [75, 90], bend: [130, 95], target: [155, 135] } }
      ]
    },
    whatChanged: 'A multi-scene seasonal collage became three focused stories: adapting fall decor, fitting oversized ghosts on an island, and keeping ghost brownie toppers in shape.',
    why: 'These are specific projects and decisions shown in Tricia’s video. Giving each its own frame makes the practical question easier to see.',
    variants: [
      {
        id: 'a', revision: 'R03 A / titles R15', title: 'Can I Make My Fall Decor Work for Halloween?',
        image: './assets/cases/halloween-at-home/a.webp',
        alt: 'Tricia points between autumn decorations and a glowing ghost, beneath Fall and howloween lettering linked by an arrow.',
        angle: 'Make the season change visible', annotation: 'fall decor becomes Halloween',
        change: 'One large presenter connects two seasonal arrangements instead of appearing inside a collage.',
        reason: 'The title turns the decorating sequence into a question about reusing fall decor, a recurring choice in the video.', arrowSide: 'right'
      },
      {
        id: 'b', revision: 'R03 B-final-r02 / titles R15', title: 'Are These Ghosts Too Big for My Kitchen Island?',
        image: './assets/cases/halloween-at-home/b.webp',
        alt: 'Tricia studies two large glowing ghosts on her kitchen island beneath Bad Idea? and an arrow toward the taller ghost.',
        angle: 'Let the object create the dilemma', annotation: 'the size is the story',
        change: 'Two oversized ghosts and one assessing expression give the image a single obvious subject.',
        reason: 'The decorations arrived larger than expected. The title names the fit problem while the image lets viewers judge it for themselves.', arrowSide: 'right'
      },
      {
        id: 'c', revision: 'C R14 / titles R15', title: 'The Trick to Ghost Brownies That Hold Their Shape',
        image: './assets/cases/halloween-at-home/c.webp',
        alt: 'Tricia holds a ghost-shaped marshmallow above a brownie tray, with DON’T BAKE IT and an arrow to the topping.',
        angle: 'Make one useful step the hook', annotation: 'the arrow singles out the topping',
        change: 'A close view of the marshmallow and a direct instruction replace a small finished-brownie panel.',
        reason: 'Tricia adds the marshmallows after the brownies bake, while they are still hot. The image points to the item affected by that timing.', arrowSide: 'right'
      }
    ]
  },
  {
    id: 'autumn-colour-plan', language: 'en', channel: 'The Yorkshire Sew Girl',
    topic: 'A wardrobe that feels like you', videoUrl: 'https://www.youtube.com/watch?v=DsvzOEyi3RQ',
    original: {
      title: 'Can I SEW An Autumn CAPSULE Wardrobe? || Episode One: Colour Pallette',
      image: './assets/cases/autumn-colour-plan/original.webp',
      alt: 'Ruan beside four outfit photos and the large question CAN I SEW AN AUTUMN CAPSULE WARDROBE?, with a smaller colour-palette subtitle.',
      issues: [
        { label: 'The broad question dominates', detail: 'The large wardrobe headline takes attention from this episode’s first decision: choosing colours.', arrow: { origin: [620, 65], bend: [750, 55], target: [810, 115] } },
        { label: 'The actual topic is small', detail: 'The colour-palette subtitle is smaller than the general capsule question and sits low in the hierarchy.', arrow: { origin: [700, 660], bend: [730, 620], target: [740, 585] } },
        { label: 'Many outfits, no clear choice', detail: 'Four fashion photos add separate focal points without showing which fabrics Ruan needs to bring together.', arrow: { origin: [440, 650], bend: [430, 600], target: [360, 540] } }
      ]
    },
    whatChanged: 'The broad capsule-wardrobe question became three visible choices: prints versus basics, coordination versus personality, and the first three colours.',
    why: 'This episode is the start of Ruan’s autumn plan. The designs bring her fabric decisions forward and connect a coherent wardrobe to the question of personal style.',
    variants: [
      {
        id: 'a', revision: 'R04 recording room A', title: "My Handmade Clothes Don't Always Match | My Autumn Colour Plan",
        image: './assets/cases/autumn-colour-plan/a.webp',
        alt: 'Ruan holds floral and navy fabrics beneath TOO MANY PRINTS? in a simple sewing room.',
        angle: 'Show why the plan is needed', annotation: 'two fabrics, one coordination problem',
        change: 'Two fabric choices replace the four-outfit collage.',
        reason: 'The title introduces clothes that do not always work together, while the print-versus-solid comparison makes the colour-planning problem visible.', arrowSide: 'left'
      },
      {
        id: 'b', revision: 'R04 recording room B', title: 'My Autumn Capsule Colour Plan: Will It Still Feel Like Me?',
        image: './assets/cases/autumn-colour-plan/b.webp',
        alt: 'Ruan compares navy and leopard-print fabrics beneath a large handwritten TOO BORING? question.',
        angle: 'Keep personality in the plan', annotation: 'coordination has an emotional cost',
        change: 'A simple solid fabric and a bold print set up a choice between restraint and personality.',
        reason: 'Ruan wants a more coherent wardrobe while keeping the patterns she enjoys. The title and question capture that tension.', arrowSide: 'left'
      },
      {
        id: 'c', revision: 'R04 recording room C', title: 'Starting Over: The First Step in My Autumn Capsule',
        image: './assets/cases/autumn-colour-plan/c.webp',
        alt: 'Ruan holds navy, olive and burgundy swatches beneath WHICH COLOURS?',
        angle: 'Start with a concrete decision', annotation: 'three colours to build around',
        change: 'Three swatches make the episode’s first planning step the central object.',
        reason: 'Choosing the palette starts the capsule project. The title supplies that sequence while the thumbnail shows the decision at hand.', arrowSide: 'right'
      }
    ]
  },
  {
    id: 'florida-seed-starts', language: 'en', channel: 'The Urban Harvest',
    topic: 'Florida’s February gamble', videoUrl: 'https://www.youtube.com/watch?v=JtfzeCdHTRE',
    original: {
      title: '6 Veggies You Can Start in February', image: './assets/cases/florida-seed-starts/original.webp',
      alt: 'Elise holds seed packets beside PLANT IN FEB text and a pink arrow pointing to the packets.',
      issues: [
        { label: 'A date without a place', detail: '“PLANT IN FEB” gives a month but leaves out the Florida climate that makes the advice relevant.', arrow: { origin: [380, 390], bend: [400, 340], target: [385, 300] } },
        { label: 'The choice is too small', detail: 'The seed packets are visible, but their tiny labels do not explain which crops are in the guide.', arrow: { origin: [1210, 100], bend: [1135, 115], target: [1080, 200] } },
        { label: 'The planting risk is absent', detail: 'The garden backdrop gives no visible clue to the cold-weather risk or failed cucumber discussed in the video.', arrow: { origin: [80, 630], bend: [165, 590], target: [220, 550] } }
      ]
    },
    whatChanged: 'A general February planting message became a Florida-specific decision: accept the winter risk, learn from a failed cucumber, or take a closer look at plant number five.',
    why: 'The video covers six seed starts and the uncertainty of Florida’s late winter. Each pair turns a point from that guide into a clear question.',
    variants: [
      {
        id: 'a', revision: 'R09 A', title: 'Florida Can Still Freeze. Why Start These 6 Seeds In February?',
        image: './assets/cases/florida-seed-starts/a.webp',
        alt: 'Elise stands between a frost-covered pot and a lush plant, labelled WINTER RISK and SPRING GOAL.',
        angle: 'Show the seasonal trade-off', annotation: 'the risk and the goal',
        change: 'A risk-to-goal comparison gives February planting an immediate visual tension.',
        reason: 'The title specifies Florida, six seeds and the freeze risk, linking the seasonal contrast to the practical guide.', arrowSide: 'right'
      },
      {
        id: 'b', revision: 'R09 B', title: '6 Florida February Plants—Why Did One Cucumber Die?',
        image: './assets/cases/florida-seed-starts/b.webp',
        alt: 'Elise reacts beside a large wilted cucumber plant, with NO WAY and an arrow pointing at a damaged leaf.',
        angle: 'Lead with a concrete setback', annotation: 'one failed plant opens the guide',
        change: 'A damaged leaf replaces the seed packet as the main object, with the presenter’s reaction beside it.',
        reason: 'The cucumber failure is a specific moment in the video. The title preserves the wider six-plant guide around that question.', arrowSide: 'left'
      },
      {
        id: 'c', revision: 'R10 C', title: 'Would You Risk Starting Plant #5 In Florida This February?',
        image: './assets/cases/florida-seed-starts/c.webp',
        alt: 'Elise holds the plant labelled #5 in front of four numbered background plants, with I HOPE IT WORKS above.',
        angle: 'Single out one uncertain choice', annotation: 'one plant gets the attention',
        change: 'A foreground plant and its number establish a focal point against the other starts.',
        reason: 'The title supplies the place and timing, while the image isolates one choice within the video’s planting list.', arrowSide: 'right'
      }
    ]
  }
];
