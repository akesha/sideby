// All workbook content lives here. Pulled directly from the source workbook.

const PANELISTS = [
  {
    id: "akesha",
    name: "Akesha Horton, PhD",
    role: "Director of Academic Engagement and Learning",
    where: "Indiana University Bloomington — Luddy School of Informatics, Computing, and Engineering",
    initials: "AH",
  },
  {
    id: "yousuf",
    name: "Yousuf Marvi",
    role: "Math Teacher and ELD Coach",
    where: "Sierra Vista Middle School, Irvine Unified School District",
    initials: "YM",
  },
  {
    id: "anne",
    name: "Anne Fensie, PhD",
    role: "Director of the Center for Teaching and Learning",
    where: "University of Maine at Presque Isle",
    initials: "AF",
  },
];

const EXCHANGES = [
  {
    id: "ex1",
    number: "01",
    title: "Why are you doing this?",
    intro:
      "The moderator opened with a deceptively simple question. Each panelist landed somewhere different. None of them led with personal efficiency, which the moderator noticed and named.",
    quotes: [
      {
        speaker: "akesha",
        body:
          "All technology was designed to make a profit. Even Canvas is based on WordPress, which was not designed for teaching or learning. With AI, I like the agency that it provides to educators, to be able to not worry about the cost involved in creating the types of tools that they need. It puts us, as educators, in the design seat.",
        attribution: "Akesha Horton, citing Punya Mishra",
      },
      {
        speaker: "yousuf",
        body:
          "My students are my why. When AI came about, I thought about multimodality. I do not have to wait around for text processing only. How do I understand what my novice language learner is doing in transformations? It completely transformed the way I think about the possibility of every single student.",
        attribution: "Yousuf Marvi",
      },
      {
        speaker: "anne",
        body:
          "I dug into a lot of learning. My chapter was about how to use AI to help and not hinder learning. I really wanted students to understand: how does learning happen? Where do you need that productive struggle? What can you offload? My why is to figure out the potential, but also where the dangers are.",
        attribution: "Anne Fensie",
      },
    ],
    prompt: {
      title: "Reading prompt 1",
      body:
        "Write three sentences. What is your why? If your honest answer is efficiency, write that. If it is professional pressure or institutional expectation, write that. The rest of this workbook will work either way. What matters is that the answer is true.",
      fields: [
        { id: "ex1.why", label: "My why", placeholder: "Three sentences. The honest version.", rows: 6 },
      ],
    },
  },
  {
    id: "ex2",
    number: "02",
    title: "Friction is where learning happens",
    intro:
      "Friction came up early and stayed central. The panel converged on a paradox: AI is engineered to remove friction, but learning depends on the right kind of friction staying in place. The panelists differed on how to handle this.",
    quotes: [
      {
        speaker: "anne",
        body:
          "I like to use Daniel Willingham's quote of memory as the residue of thought. That is what it comes down to. We do not just absorb something and move on. We think about it, and that is what we are remembering.",
        attribution: "Anne Fensie",
      },
      {
        speaker: "akesha",
        body:
          "Whenever the learning really occurs, it is in the failures of AI. When AI fails, that is when you realize you need that human in the loop for expertise. My goal is to make sure we are not erasing that friction students need in order to learn when I am helping faculty develop their lessons.",
        attribution: "Akesha Horton",
      },
      {
        speaker: "yousuf",
        body:
          "AI is designed not to have friction. That is the whole point of it. The big ask of the educator is how to bring that in. I call it effort over output. If your effort over output ratio is close to one, you have learning happening. As soon as it goes way off from one, you have problems on either side.",
        attribution: "Yousuf Marvi",
      },
    ],
    prompt: {
      title: "Reading prompt 2",
      body:
        "Pick one assignment or activity you teach. Write its name, then answer two questions in plain language.",
      fields: [
        { id: "ex2.assignment", label: "Assignment or activity", placeholder: "e.g. Source analysis essay", rows: 1 },
        { id: "ex2.struggle", label: "Where is the productive struggle in this task right now?", placeholder: "Be specific.", rows: 4 },
        { id: "ex2.flatten", label: "What might AI flatten if a student used it without thinking?", placeholder: "Be honest, even if it's the part you were proudest of.", rows: 4 },
      ],
    },
  },
  {
    id: "ex3",
    number: "03",
    title: "Triumphs, disasters, and the human in the loop",
    intro:
      "When the moderator asked about evolved thinking and personal habits, the panelists got specific. Anne told a story that earned a flinch from the room.",
    quotes: [
      {
        speaker: "anne",
        body:
          "I was developing a platform to track all of our online course content. I had a conversation with AI about a quick update to all of the classes. I just followed the steps. It overrode two thirds of the classes with the same information, completely wiping out two thirds of my database. No undo button. No backup. I spent ten hours in my hotel room at AAC&U manually copying and pasting changes back. I am now much more critical of AI output. I am afraid of getting my humanness out.",
        attribution: "Anne Fensie",
      },
      {
        speaker: "akesha",
        body:
          "In the past two months I have made about thirty different apps. Are they good? I do not know. They are in different ranges of quality. But I am learning how. I am meeting people through peer networks who I can ask questions about which tools to use, what I am giving up in terms of privacy, costs, etc... It is not just project-based learning, it is peer-based learning, and it is not being intimidated to ask questions.",
        attribution: "Akesha Horton",
      },
      {
        speaker: "yousuf",
        body:
          "We have an AI Pioneers PLC where teachers are paid to opt in and experiment. There is a teacher on special assignment whose job is to lead and facilitate it. I have been fortunate to be in a district that has thought about what structured peer collaboration looks like. So we are constantly learning from each other.",
        attribution: "Yousuf Marvi",
      },
    ],
    prompt: {
      title: "Reading prompt 3",
      body:
        "Write down one AI triumph and one AI disaster from your own work. They do not have to be dramatic. The point is to name what each one taught you. If you have not had a disaster yet, write the closest near-miss.",
      fields: [
        { id: "ex3.triumph", label: "Triumph", placeholder: "What worked.", rows: 3 },
        { id: "ex3.triumph_rule", label: "What rule did it teach you?", placeholder: "One sentence.", rows: 2 },
        { id: "ex3.disaster", label: "Disaster or near-miss", placeholder: "What broke, or nearly did.", rows: 3 },
        { id: "ex3.disaster_rule", label: "What rule did it teach you?", placeholder: "One sentence.", rows: 2 },
      ],
    },
  },
];

const TENSIONS = [
  {
    id: "t1",
    number: "01",
    title: "Frictionless AI vs. productive struggle",
    intro:
      "Yousuf framed this as effort over output. AI is built to drive that ratio toward zero. Learning needs it close to one. How much friction do you preserve, and how much do you let AI flatten?",
    left: "Use AI to remove as much friction as possible",
    right: "Preserve productive struggle even at the cost of efficiency",
    leftShort: "Remove friction",
    rightShort: "Preserve struggle",
  },
  {
    id: "t2",
    number: "02",
    title: "Educator efficiency vs. student-centered orientation",
    intro:
      "The moderator pointed out that none of the panelists led with personal efficiency. That was deliberate or revealing. Where does your why actually live?",
    left: "Primarily about my own time and workload",
    right: "Primarily about what students are learning",
    leftShort: "My workload",
    rightShort: "Student learning",
  },
  {
    id: "t3",
    number: "03",
    title: "AI literacy as a goal vs. AI literacy as part of core skill development",
    intro:
      "Yousuf described a schema: AI literacy, then core skills, then human discernment. He warned that K–12 students are not always developmentally ready to exercise the agency AI requires. Higher ed faces a related question for adult learners with uneven foundations.",
    left: "Teach AI literacy as a stand-alone competency",
    right: "Teach core skills first; AI literacy emerges from that",
    leftShort: "Stand-alone literacy",
    rightShort: "Core skills first",
  },
  {
    id: "t4",
    number: "04",
    title: "Mandate vs. curiosity and skepticism",
    intro:
      "Anne's closing nugget was that she wants to see AI introduced \u201Cnot as a mandate, but an opportunity for curiosity and skepticism, with learners at the center.\u201D Many institutions are headed the opposite direction.",
    left: "AI adoption should be required and standardized",
    right: "AI adoption should be invitational and exploratory",
    leftShort: "Required",
    rightShort: "Invitational",
  },
  {
    id: "t5",
    number: "05",
    title: "Tool-first vs. problem-of-practice-first",
    intro:
      "Yousuf's closing nugget: \u201CI would like to see the problem of practice, and where AI comes in, as the part of that process, and not the starting and the ending part of that conversation.\u201D",
    left: "Start with the AI tool and find a use for it",
    right: "Start with a problem of practice and ask whether AI helps",
    leftShort: "Tool-first",
    rightShort: "Problem-first",
  },
  {
    id: "t6",
    number: "06",
    title: "Adoption urgency vs. ethical and environmental caution",
    intro:
      "Anne opened the panel with urgency: change is too slow in higher ed and faculty need to push. Akesha and Anne later raised the sociotechnical and environmental costs (Noble, Benjamin, the energy footprint of video generation). These are not opposed, but they pull in different directions when the budget is your time and attention.",
    left: "Move fast; the cost of waiting is higher than the cost of getting it wrong",
    right: "Move slowly; the harms of careless adoption are real and unequally distributed",
    leftShort: "Move fast",
    rightShort: "Move slowly",
  },
];

const PATHWAYS = [
  {
    id: "A",
    title: "Redesign an assignment",
    subtitle: "to preserve productive struggle",
    when: "Pick this if you have an assignment that AI is changing whether you like it or not.",
    example: {
      title: "Worked example",
      body:
        "An undergraduate writing course assigns a 1,500-word analysis of a primary source. Students used to spend the first week annotating. AI flattens the annotation step in seconds. The instructor preserved friction by changing the deliverable: students now submit the annotation log itself, with timestamps, alongside the analysis. The struggle moved from \u201Cfind the moves\u201D to \u201Cnotice your own thinking,\u201D which is closer to what the assignment was really teaching.",
    },
    steps: [
      { id: "A1", label: "Name the assignment and the learning outcome it serves.", rows: 4 },
      { id: "A2", label: "Where is the productive struggle in this assignment? Be specific.", rows: 4 },
      { id: "A3", label: "What part of the task does AI flatten? Be honest, even if it is the part you were proudest of.", rows: 4 },
      { id: "A4", label: "Redesign one element so the friction stays. Change the deliverable, the process, or the evaluation criteria. Pick one.", rows: 6 },
      { id: "A5", label: "What will you tell students about why this assignment is structured this way?", rows: 4 },
    ],
  },
  {
    id: "B",
    title: "Draft a course-level AI policy",
    subtitle: "that names the why",
    when: "Pick this if your students do not know what is and is not allowed in your course, or if your current policy is a copy-paste.",
    example: {
      title: "Worked example",
      body:
        "A graduate research methods course allows AI for literature search and brainstorming, requires disclosure for any text used in drafts, and prohibits AI for the final synthesis paper. The policy explains in two sentences that the course is teaching students to develop a defensible argument from messy evidence, that AI is excellent at the messy evidence step and unreliable at the defensible argument step, and that the course design follows that distinction.",
    },
    steps: [
      { id: "B1", label: "What is the central skill or capacity this course is trying to develop?", rows: 4 },
      { id: "B2", label: "Where in the course does AI help students get to that skill faster or more equitably?", rows: 4 },
      { id: "B3", label: "Where in the course would AI short-circuit the development of that skill?", rows: 4 },
      { id: "B4", label: "Draft your policy in three sentences. Sentence one: what is allowed. Sentence two: what is not. Sentence three: why.", rows: 6 },
      { id: "B5", label: "What disclosure or documentation will you ask students to provide, and how will you respond if they do not?", rows: 5 },
    ],
  },
  {
    id: "C",
    title: "Define a problem of practice",
    subtitle: "and identify whether AI is part of the solution",
    when: "Pick this if you suspect AI may be a solution but you have not named the problem yet.",
    example: {
      title: "Worked example",
      body:
        "A faculty developer noticed that adjunct instructors in one program were spending hours per week writing detailed feedback on early drafts and burning out. The problem of practice was not \u201Cwe need an AI feedback tool.\u201D It was \u201Cadjunct workload is unsustainable, and feedback quality is uneven across sections.\u201D Once named, AI showed up as one possible piece (a feedback rubric assistant for instructors) alongside non-AI options (a peer review structure, a reduction in feedback frequency). The decision to use AI followed the problem instead of leading it.",
    },
    steps: [
      { id: "C1", label: "What is the problem of practice in your work right now? State it without mentioning AI.", rows: 5 },
      { id: "C2", label: "Who is affected, and how do you know? Name evidence, not impressions.", rows: 4 },
      { id: "C3", label: "List two or three possible responses. Some should not involve AI. Force yourself to write the non-AI options first.", rows: 6 },
      { id: "C4", label: "If AI is part of the response, what specifically does it do, and what is the human still responsible for?", rows: 5 },
      { id: "C5", label: "What would tell you in three months that the response is working, or that it is not?", rows: 4 },
    ],
  },
];

const READING_LIST = [
  {
    section: "On how learning works",
    items: [
      {
        title: "Why Don't Students Like School?",
        author: "Daniel Willingham",
        note: "The \u201Cmemory is the residue of thought\u201D claim Anne quoted comes from this book.",
      },
    ],
  },
  {
    section: "On educators as designers, not consumers, of technology",
    items: [
      {
        title: "TPACK (Technological Pedagogical Content Knowledge)",
        author: "Punya Mishra & Matthew Koehler",
        note: "The foundation Akesha referenced. Mishra's argument that there is no such thing as educational technology, because all technology was designed for profit, is a useful frame for evaluating any tool you adopt.",
      },
    ],
  },
  {
    section: "On the sociotechnical lens",
    items: [
      {
        title: "Algorithms of Oppression: How Search Engines Reinforce Racism",
        author: "Safiya Umoja Noble",
        note: "NYU Press, 2018.",
      },
      {
        title: "Race After Technology: Abolitionist Tools for the New Jim Code",
        author: "Ruha Benjamin",
        note: "Polity, 2019.",
      },
      {
        title: "Viral Justice: How We Grow the World We Want",
        author: "Ruha Benjamin",
        note: "Princeton University Press, 2022. Akesha's working principle (someone benefits from a technology, and someone else is usually being disenfranchised by the same one) is a one-line summary of Benjamin's argument.",
      },
    ],
  },
  {
    section: "On the environmental cost of AI",
    items: [
      {
        title: "what-uses-more.com",
        author: "Referenced by Anne",
        note: "Compares the energy use of an AI task against a familiar baseline like watching Netflix.",
      },
      {
        title: "Public data work on energy",
        author: "Hannah Ritchie",
        note: "",
      },
      {
        title: "Research on the environmental costs of generative AI",
        author: "Sasha Luccioni",
        note: "",
      },
    ],
  },
  {
    section: "On educator self-directed learning",
    items: [
      {
        title: "Generative AI course (GenAI IU)",
        author: "Indiana University",
        note: "Open to anyone. Search for \u201CGenAI IU\u201D or contact Akesha for the current URL.",
      },
      {
        title: "AI Pioneers PLC",
        author: "Irvine Unified",
        note: "Paid, opt-in, structured time for educators to experiment together with a facilitator. Look up your local equivalent.",
      },
    ],
  },
  {
    section: "What is missing here",
    note: "This list reflects the panel. It is not a survey of the field.",
    items: [
      { title: "Design Justice", author: "Sasha Costanza-Chock", note: "" },
      { title: "Edtech history writing", author: "Audrey Watters", note: "" },
      { title: "Annual reports", author: "AI Now Institute", note: "" },
    ],
  },
];

const FACILITATE = [
  {
    id: "f1",
    title: "Format 1 — A 75-minute live workshop",
    when: "Best for a department meeting, a faculty learning community, or a half-day teaching retreat where you have one block.",
    steps: [
      { time: "5 min", label: "Opening", body: "Read the panelist quotes from Exchange 1 aloud. Ask people to write their why on a sticky note." },
      { time: "15 min", label: "Where you stand", body: "Use Section 2 as a values-mapping activity. Tape the six tensions on the walls and ask people to physically stand on the continuum." },
      { time: "35 min", label: "Apply it", body: "Break into three small groups by pathway (A, B, or C). Each group works through the prompts together with a designated scribe." },
      { time: "15 min", label: "Commit", body: "Each person fills in their own Section 4. Pair people up to share their three changes." },
      { time: "5 min", label: "Close", body: "Ask the room: what do you want to see more of regarding educator learning about AI?" },
    ],
  },
  {
    id: "f2",
    title: "Format 2 — A four-week department series",
    when: "Best for a CTL or program with a regular meeting cadence.",
    steps: [
      { time: "Week 1", label: "Section 1", body: "Plus a shared reading from the reading list. Discussion-based." },
      { time: "Week 2", label: "Section 2", body: "As a live values-mapping activity. Surface where the department actually disagrees." },
      { time: "Week 3", label: "Section 3", body: "Each person brings one assignment, policy, or problem of practice. Workshop in pairs." },
      { time: "Week 4", label: "Section 4", body: "Plus a peer-accountability structure. Pair people up; they meet again in 60 days to compare what actually changed." },
    ],
  },
  {
    id: "f3",
    title: "Format 3 — A 25-minute warm-up at a larger event",
    when: "Best for a faculty development day where this is one session among many. Use only Section 2. Skip the rest.",
    steps: [],
  },
];

const BONUS = [
  {
    speaker: "akesha",
    status: "published",
    title: "What I'd add now, with the time I didn't have on stage.",
    deck: "Notes after the panel.",
    sections: [
      {
        heading: "The vendor capture problem nobody is naming",
        body: [
          "Most institutional AI rollouts I've seen copy the model we use for everything else. An expert disseminates. Faculty sit. Certificates get issued. That model assumes there is a stable best practice somewhere upstream that we just need to push downstream. There isn't one. Not yet. Probably not for a while.",
          "What that mismatch produces, in practice, is vendor capture. Institutions adopt tools because peer institutions did, with thin or nonexistent research on outcomes, equity, or labor implications. Procurement happens before pedagogy. Then the pedagogy bends to fit the tool. We owe our students more than that, and the cost of getting it wrong falls hardest on the people with the least leverage in the room (which is almost always the same set of students, for the same set of reasons).",
          "The places I've watched real fluency build don't look like that. They look like communities of practice. Educators experimenting in groups, in public, with explicit permission to try things that don't work. The faculty I work with who've moved the furthest aren't the ones who attended the best webinar. They're the ones who found a peer group.",
          "If I had a budget line item to write, it would say: unstructured peer learning. Time. Space. Permission to fail in your own classroom before we expect you to scale anything. That's not a workshop. That's not a vendor contract. That's the thing."
        ]
      },
      {
        heading: "The friction question, sharper",
        body: [
          "We talked on the panel about friction. AI is designed to remove it. Learning depends on it. You've heard some version of this argument by now. Here's the part I didn't get to.",
          "When I work with faculty, the question I'm modeling for them isn't \u201Cwhere can I save time.\u201D It's \u201Cwhere am I designing friction out that students actually need?\u201D That distinction matters because faculty are watching. What I do in my own practice ripples into theirs. If I optimize my own workflow without naming what I gave up to do it, I'm teaching them to do the same.",
          "Every failure of AI is showing where human expertise is needed. Which means, uncomfortably, that you can't recognize what AI got wrong unless you've already done the foundational work. That's an argument for slowing down on automating the parts of learning that build the expertise in the first place. We risk optimizing away the conditions under which the next generation of educators learns to evaluate AI. That's a long-game problem, and we are mostly not making long-game decisions."
        ]
      },
      {
        heading: "The \u201Cwhy\u201D I should have led with",
        body: [
          "Asked on the panel why I'm doing this, I gave a Punya Mishra answer. There's no such thing as ed tech, the market doesn't pay to build for educators, AI puts us in the design seat. All true. But the cleaner version, the one I've been thinking about since, is one word."
        ],
        callout: "Agency.",
        bodyAfter: [
          "For the first time in my career I can originate a tool instead of adapting someone else's. Build something for a specific learning problem I see, on my own time, without a vendor or a procurement cycle in the way. The reason that matters isn't novelty. It's that the people closest to a learning problem finally have the means to design for it. If you've spent any time in instructional design, you know how rare that is."
        ]
      },
      {
        heading: "What's actually working in my own practice",
        body: ["Three things I didn't get to say."],
        list: [
          {
            label: "I learn by writing about it.",
            body: "I publish a Substack called Spilled and Studied, and the writing is the forcing function. If I can't explain what I just learned, I haven't actually learned it. Putting words on the page is where the half-formed ideas either harden or fall apart, and either outcome is useful."
          },
          {
            label: "I run a calibration test every couple of weeks.",
            body: "I take a real piece of work I'm doing and run it through a tool I haven't used yet. Not to find a winner. To stay honest about what's changed in the field. The tools that were best six months ago are not the tools that are best now, and the only way I know that is because I keep checking."
          },
          {
            label: "The peer network I rely on is heterogeneous on purpose.",
            body: "The people who've taught me the most aren't the ones giving keynotes. They're using AI in contexts I don't sit in. A K-12 ELD coach. A community college instructional designer. A first-gen doctoral student translating academic norms for the first time in her family. I get more from a 20-minute conversation with someone whose problems aren't mine than from another tutorial on prompt engineering."
          }
        ]
      },
      {
        heading: "The thinking shift I didn't get to articulate",
        body: [
          "When the moderator asked how my thinking on opportunities and risks has evolved, I gave the Safiya Noble and Ruha Benjamin answer. I stand by it. What I didn't get to say is that my position hasn't actually reversed. It's gotten more disciplined.",
          "Three years ago, what I had was an instinct: pay attention to costs alongside benefits. What I have now is a question I run on every adoption decision. Who is paying for this? Who is benefiting? Where is it being used as a social good versus where is it just extracting value from people who have no leverage in the design? That isn't a softer question than I was asking before. It's a more specific one.",
          "The big debate in education isn't whether to use AI. That ship is gone. The debate is what we're embracing and what we're giving up, and we have to be willing to answer the second half. Someone at the conference said efficiency erases authenticity, and I scribbled it down, because that's the trade I see being made constantly. Faster drafts. Less voice. A response that sounds professional and means nothing."
        ]
      },
      {
        heading: "For the colleague who feels behind",
        body: [
          "A version of this came up in audience Q&A, and I want to redo it."
        ],
        callout: "Stop trying to learn AI. Pick one thing you actually need to do this week and ask AI to help you do it. That's the whole curriculum.",
        bodyAfter: [
          "You don't have to read the white paper. You don't have to know what a transformer is. You have to drop in on something small, see what happens, and pay attention. The fluency builds from there.",
          "And if you're feeling behind, you're not. There is no behind. The field is being built right now, by people who showed up and started practicing. You can be one of them."
        ]
      },
      {
        heading: "Lines I keep coming back to, for the next room I'm in",
        kicker: true,
        items: [
          { tag: "On equity", body: "The cost of getting AI integration wrong falls hardest on the students who already have the least leverage. That has to be the first question, not the last." },
          { tag: "On faculty resistance", body: "Resistance isn't always wrong. Sometimes it's the only signal we have that something we care about is at stake. The job isn't to overcome it. It's to listen to what it's telling us." },
          { tag: "On where to start", body: "Start with a problem you actually have. Not the problem AI is good at. The one keeping you up at night. Then ask whether AI can help." },
          { tag: "On efficiency vs. authenticity", body: "Efficiency is not the same as quality. A faster draft is not a better draft. We have to be honest about what we're trading." },
          { tag: "On hype vs. reality", body: "Most of what gets sold as AI in education is the same old PD model with a new logo. The real work is unstructured, peer-led, project-based, and slow." }
        ]
      }
    ]
  },
  {
    speaker: "yousuf",
    status: "pending",
    placeholder: "Yousuf is still writing his afterword. When it lands, it goes here \u2014 unedited, in his voice, with the part of the panel he didn't get to."
  },
  {
    speaker: "anne",
    status: "pending",
    placeholder: "Anne is still writing her afterword. When it lands, it goes here \u2014 unedited, in her voice, with the part of the panel she didn't get to."
  }
];

const SPONSOR = {
  text: "This panel was sponsored by Sideby \u2014 where we can learn AI together.",
  url: "https://www.sideby.ai/",
  label: "sideby.ai"
};

const MODERATOR = {
  id: "kippy",
  name: "Kippy Smith",
  role: "Moderator",
  initials: "KS"
};

// Page sequence for navigation
const PAGES = [
  { id: "cover", section: 0, kind: "cover" },
  { id: "about", section: 0, kind: "about" },
  {
    id: "ex1",
    section: 1,
    kind: "exchange",
    exchange: 0,
    preamble: { n: "Section 1", title: "What was said", body: "Three exchanges from the panel are below, each followed by a short reading prompt. Read the exchange first, then write your response. Do not skip the writing step. The writing is the work." }
  },
  { id: "ex2", section: 1, kind: "exchange", exchange: 1 },
  { id: "ex3", section: 1, kind: "exchange", exchange: 2 },
  {
    id: "tensions-a",
    section: 2,
    kind: "tension-group",
    tensions: [0, 1, 2],
    preamble: { n: "Section 2", title: "Where you stand", body: "The panel surfaced six tensions. They are real disagreements, not strawmen. For each one, mark where you sit on the continuum and write one sentence on why. \u201CI don\u2019t know\u201D is allowed but it has to be earned. If you mark the middle, your sentence should explain what you would need to know to commit." }
  },
  { id: "tensions-b", section: 2, kind: "tension-group", tensions: [3, 4, 5] },
  { id: "constellation", section: 2, kind: "constellation" },
  { id: "s3-intro", section: 3, kind: "pathway-pick" },
  { id: "pathway", section: 3, kind: "pathway-work" },
  { id: "s4-commit", section: 4, kind: "commit" },
  { id: "bonus", section: 5, kind: "bonus" },
  { id: "resources", section: 5, kind: "resources" },
];

const SECTIONS = [
  { n: 0, label: "Begin" },
  { n: 1, label: "What was said" },
  { n: 2, label: "Where you stand" },
  { n: 3, label: "Apply it" },
  { n: 4, label: "Commit" },
  { n: 5, label: "After" },
];

Object.assign(window, {
  PANELISTS,
  EXCHANGES,
  TENSIONS,
  PATHWAYS,
  READING_LIST,
  FACILITATE,
  BONUS,
  SPONSOR,
  MODERATOR,
  PAGES,
  SECTIONS,
});
