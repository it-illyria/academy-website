export interface BlogPost {
  slug: string;
  category: "tutorials" | "career" | "news" | "tips";
  date: string;
  readTime: number;
  title: { sq: string; en: string };
  excerpt: { sq: string; en: string };
  content: { sq: string; en: string };
}

export const blogPosts: BlogPost[] = [
  {
    slug: "si-te-fillosh-programimin",
    category: "tutorials",
    date: "2026-04-10",
    readTime: 5,
    title: {
      sq: "Si të Fillosh Programimin në 2026",
      en: "How to Start Programming in 2026",
    },
    excerpt: {
      sq: "Guida jonë e plotë për fillestarët që duan të mësojnë kodim. Cilën gjuhë të zgjedhësh dhe ku të fillosh.",
      en: "Our complete guide for beginners who want to learn coding. Which language to choose and where to start.",
    },
    content: {
      sq: `## Pse të mësosh programim në 2026?

Programimi nuk është vetëm një aftësi teknike — është një supërfuqi në botën moderne. Pavarësisht se dëshiron të ndryshosh karrierën, të krijosh biznesin tënd, ose thjesht të kuptosh si funksionojnë gjërat, kodimi të hap dyer të reja.

### Cilën gjuhë të zgjedhësh?

**Për fillestarë absolutë:**
- **HTML & CSS** — Fillo me bazat e web-it. Shiko rezultatin menjëherë në browser.
- **Python** — Sintaksë e thjesht, e lexueshme, perfekte për logjikën e programimit.

**Për ata që duan punë shpejt:**
- **JavaScript** — Gjuha e web-it. Frontend + backend me një gjuhë të vetme.
- **Python** — Data science, AI, web development — shumë mundësi.

### Si të fillosh me Lika Academy?

1. **Zgjidh programin** — Web Development ose Pro Tracks
2. **Apliko online** — Plotëso formularin në faqen tonë
3. **Fillo të mësosh** — Kurse 2-mujore hibride me instruktorë ekspërt

### Këshilla për fillestarët

- **Mos u frikëso nga gabimet** — Çdo developer bën gabime. Kjo është pjesë e procesit.
- **Praktiko çdo ditë** — Edhe 30 minuta në ditë bëjnë ndryshim të madh.
- **Ndërto projekte** — Mësimi më i mirë vjen duke ndërtuar diçka reale.
- **Bëhu pjesë e komunitetit** — Mëso me të tjerë, ndaj problemet dhe zgjidhjet.

### Burime falas për të filluar

Para se të regjistrohesh në një kurs, provo këto burime falas:
- **freeCodeCamp** — Kurse falas interaktive
- **MDN Web Docs** — Dokumentacioni zyrtar i web-it
- **YouTube** — Tutoriale pa fund në çdo gjuhë

Kur të jesh gati për të kaluar në nivelin tjetër, Lika Academy të pret me kurse profesionale, projekte reale dhe mentoring individual.`,

      en: `## Why learn programming in 2026?

Programming isn't just a technical skill — it's a superpower in the modern world. Whether you want to change careers, start your own business, or simply understand how things work, coding opens new doors.

### Which language to choose?

**For absolute beginners:**
- **HTML & CSS** — Start with web basics. See results immediately in the browser.
- **Python** — Simple, readable syntax, perfect for programming logic.

**For those who want a job fast:**
- **JavaScript** — The language of the web. Frontend + backend with a single language.
- **Python** — Data science, AI, web development — many opportunities.

### How to start with Lika Academy?

1. **Choose your program** — Web Development or Pro Tracks
2. **Apply online** — Fill out the form on our website
3. **Start learning** — 2-month hybrid courses with expert instructors

### Tips for beginners

- **Don't be afraid of mistakes** — Every developer makes mistakes. It's part of the process.
- **Practice every day** — Even 30 minutes a day makes a big difference.
- **Build projects** — The best learning comes from building something real.
- **Join the community** — Learn with others, share problems and solutions.

### Free resources to get started

Before enrolling in a course, try these free resources:
- **freeCodeCamp** — Free interactive courses
- **MDN Web Docs** — Official web documentation
- **YouTube** — Endless tutorials in every language

When you're ready to level up, Lika Academy is waiting with professional courses, real projects and individual mentoring.`,
    },
  },
  {
    slug: "pse-python-eshte-perfekt",
    category: "tutorials",
    date: "2026-04-08",
    readTime: 4,
    title: {
      sq: "Pse Python Është Gjuha Perfekte për Fillestarët",
      en: "Why Python Is the Perfect Language for Beginners",
    },
    excerpt: {
      sq: "Python vazhdon të jetë gjuha #1 për fillestarët. Mëso pse dhe si mund ta përdorësh për web, AI dhe data science.",
      en: "Python continues to be the #1 language for beginners. Learn why and how you can use it for web, AI and data science.",
    },
    content: {
      sq: `## Pse Python?

Python ka qenë gjuha #1 për fillestarët për vite me radhë, dhe në 2026 kjo nuk ka ndryshuar. Arsyet janë të thjeshta:

### 1. Sintaksë e lexueshme

Python lexohet pothuajse si anglishte. Krahasoje me gjuhë të tjera:

**Python:**
\`\`\`python
if age >= 18:
    print("Mirë se erdhe!")
\`\`\`

**Java:**
\`\`\`java
if (age >= 18) {
    System.out.println("Mirë se erdhe!");
}
\`\`\`

### 2. Shumëanëshmëri

Me Python mund të bësh:
- **Web Development** me Django ose Flask
- **Data Science** me Pandas dhe NumPy
- **AI & Machine Learning** me TensorFlow dhe PyTorch
- **Automatizim** — skripta që kursejnë orë pune
- **Game Development** me Pygame

### 3. Tregu i punës

Python developers janë ndër më të kërkarit në treg. Pagat mesatare:
- Shqipëri: 600-1,500 EUR/muaj
- Remote ndërkombëtar: 3,000-7,000 EUR/muaj

### Si e mëson Python në Lika Academy?

Kursi ynë **Python Full-Stack** (99€ çmim lansimi, 2 muaj) të mëson:
- Bazat e Python dhe OOP
- Django Framework për web
- Integrimin e AI në projekte
- 4 projekte portfolio të plota

Nuk ke nevojë për përvojë paraprake — fillojmë nga zero!`,

      en: `## Why Python?

Python has been the #1 language for beginners for years, and in 2026 that hasn't changed. The reasons are simple:

### 1. Readable syntax

Python reads almost like English. Compare it to other languages:

**Python:**
\`\`\`python
if age >= 18:
    print("Welcome!")
\`\`\`

**Java:**
\`\`\`java
if (age >= 18) {
    System.out.println("Welcome!");
}
\`\`\`

### 2. Versatility

With Python you can do:
- **Web Development** with Django or Flask
- **Data Science** with Pandas and NumPy
- **AI & Machine Learning** with TensorFlow and PyTorch
- **Automation** — scripts that save hours of work
- **Game Development** with Pygame

### 3. Job market

Python developers are among the most sought-after. Average salaries:
- Albania: 600-1,500 EUR/month
- International remote: 3,000-7,000 EUR/month

### How does Lika Academy teach Python?

Our **Python Full-Stack** course (99€ launch price, 2 months) teaches you:
- Python basics and OOP
- Django Framework for web
- AI integration in projects
- 4 complete portfolio projects

No prior experience needed — we start from zero!`,
    },
  },
  {
    slug: "portfolio-qe-impresionon",
    category: "career",
    date: "2026-04-05",
    readTime: 6,
    title: {
      sq: "Si të Ndërtosh një Portfolio që Impresionon Punëdhënësit",
      en: "How to Build a Portfolio That Impresses Employers",
    },
    excerpt: {
      sq: "Çfarë duhet të përfshijë portfolioja jote, si ta strukturosh dhe gabime që duhet ti shmangësh.",
      en: "What your portfolio should include, how to structure it and mistakes to avoid.",
    },
    content: {
      sq: `## Pse është e rëndësishme portfolioja?

Në industrinë e teknologjisë, portfolioja jote flet më shumë se CV-ja. Punëdhënësit duan të shohin çfarë ke ndërtuar, jo vetëm çfarë ke mësuar.

### Çfarë duhet të përfshijë?

**1. Faqe personale (Portfolio Website)**
- Dizajn i pastër dhe profesional
- Seksion "Rreth Meje" i shkurtër
- Lista e projekteve me screenshot dhe link

**2. Minimum 4 projekte të plota**
- Projekti 1: Aplikacion full-stack (frontend + backend + database)
- Projekti 2: Diçka unike që tregon kreativitetin tënd

**3. GitHub i rregullt**
- Commit mesazhe të qarta
- README për çdo projekt
- Kod i pastër dhe i organizuar

### Gabime që duhet ti shmangësh

- **Projekte tutorial** — Mos kopjo tutoriale. Ndërto diçka tënden.
- **Dizajn i keq** — Portfolioja duhet të duket profesionale.
- **Pa deployment** — Projektet duhet të jenë live, jo vetëm në GitHub.
- **Shumë projekte të vogla** — Më mirë 2-3 projekte cilësore sesa 10 të dobëta.

### Si ndihmon Lika Academy?

Çdo student në Lika Academy ndërton 4 projekte portfolio gjatë kursit. Ne ndihmojmë me:
- Planifikimin e projektit
- Code review nga instruktorë
- Deployment në cloud
- Përgatitjen e portfolios për punësim`,

      en: `## Why is a portfolio important?

In the tech industry, your portfolio speaks louder than your CV. Employers want to see what you've built, not just what you've learned.

### What should it include?

**1. Personal website (Portfolio Website)**
- Clean and professional design
- Short "About Me" section
- Project list with screenshots and links

**2. Minimum 4 complete projects**
- Project 1: Full-stack application (frontend + backend + database)
- Project 2: Something unique that shows your creativity

**3. Clean GitHub**
- Clear commit messages
- README for every project
- Clean and organized code

### Mistakes to avoid

- **Tutorial projects** — Don't copy tutorials. Build something of your own.
- **Bad design** — Your portfolio should look professional.
- **No deployment** — Projects should be live, not just on GitHub.
- **Too many small projects** — Better 2-3 quality projects than 10 weak ones.

### How does Lika Academy help?

Every student at Lika Academy builds 4 portfolio projects during the course. We help with:
- Project planning
- Code review from instructors
- Cloud deployment
- Portfolio preparation for employment`,
    },
  },
  {
    slug: "ai-ne-programim",
    category: "news",
    date: "2026-04-01",
    readTime: 3,
    title: {
      sq: "AI në Programim: Si po Ndryshon Mënyra e Kodimit",
      en: "AI in Programming: How It's Changing the Way We Code",
    },
    excerpt: {
      sq: "Nga Copilot te Claude — si mjetet AI po transformojnë industrinë e software dhe pse duhet ti mësosh tani.",
      en: "From Copilot to Claude — how AI tools are transforming the software industry and why you should learn them now.",
    },
    content: {
      sq: `## Revolucioni i AI në Kodim

2026 është viti ku AI ka bërë hapin e madh në programim. Mjetet si GitHub Copilot, Claude, dhe ChatGPT po ndryshojnë mënyrën si shkruajmë kod.

### Çfarë mund të bëjë AI sot?

- **Gjenerimi i kodit** — Përshkruaj çfarë do dhe AI shkruan kodin
- **Debugging** — Gjen dhe rregullon gabimet automatikisht
- **Refaktorizimi** — Përmirëson kodin ekzistues
- **Dokumentacioni** — Shkruan komente dhe dokumentacion
- **Testimi** — Gjeneron unit tests automatikisht

### A do ta zëvëndësojë AI programistët?

**Jo.** AI është një mjet, jo një zëvëndësim. Programistët që dinë të përdorin AI janë 2-3x më produktivë se ata që nuk e përdorin. Por dikush duhet të:
- Kuptojë problemin
- Dizajnojë zgjidhjen
- Verifikojë kodin e gjeneruar
- Menaxhojë projektin

### Si e integron Lika Academy AI-n?

Çdo kurs në Lika Academy përfshin module AI:
- Si të përdorësh Claude dhe Copilot efektivisht
- Prompt engineering për kodim
- Ndërtimi i features me AI APIs
- Kur të besosh AI-n dhe kur jo

Të jesh i integruar me AI nuk do të thotë që AI bën gjithçka — do të thotë që mëson të punosh me AI si partner.`,

      en: `## The AI Revolution in Coding

2026 is the year AI has taken a giant leap in programming. Tools like GitHub Copilot, Claude, and ChatGPT are changing the way we write code.

### What can AI do today?

- **Code generation** — Describe what you want and AI writes the code
- **Debugging** — Finds and fixes errors automatically
- **Refactoring** — Improves existing code
- **Documentation** — Writes comments and documentation
- **Testing** — Generates unit tests automatically

### Will AI replace programmers?

**No.** AI is a tool, not a replacement. Programmers who know how to use AI are 2-3x more productive than those who don't. But someone still needs to:
- Understand the problem
- Design the solution
- Verify generated code
- Manage the project

### How does Lika Academy integrate AI?

Every course at Lika Academy includes AI modules:
- How to use Claude and Copilot effectively
- Prompt engineering for coding
- Building features with AI APIs
- When to trust AI and when not to

Being AI-integrated doesn't mean AI does everything — it means learning to work with AI as a partner.`,
    },
  },
  {
    slug: "javascript-vs-python",
    category: "tips",
    date: "2026-03-28",
    readTime: 5,
    title: {
      sq: "JavaScript vs Python: Cilën të Zgjedhësh?",
      en: "JavaScript vs Python: Which Should You Choose?",
    },
    excerpt: {
      sq: "Krahasimi i plotë i dy gjuhëve më të populluara. Avantazhet, disavantazhet dhe për kë është secila.",
      en: "A complete comparison of the two most popular languages. Pros, cons and who each one is for.",
    },
    content: {
      sq: `## Krahasimi i Madh: JavaScript vs Python

Dy gjuhët më të populluara të programimit — por cila është më e mira për ty?

### JavaScript

**Avantazhet:**
- Gjuha e vetme që funksionon në browser
- Full-stack me Node.js (frontend + backend)
- Ekosistem i madh (React, Vue, Angular, Next.js)
- Shumë mundësi punësimi

**Disavantazhet:**
- Sintaksë më e ndërlikuar se Python
- Shumë framework-e — mund të jetë konfuze
- Quirks të çuditshme (typeof null === "object")

**Perfekte për:** Web development, aplikacione interaktive, startup-e

### Python

**Avantazhet:**
- Sintaksë shumë e thjesht
- Data science, AI, machine learning
- Automatizim i shkëlqyer
- I mrekullueshëm për fillestarët

**Disavantazhet:**
- Më i ngadaltë se JavaScript
- Nuk funksionon në browser
- Më pak mundësi për frontend

**Perfekte për:** Data science, AI/ML, backend, automatizim, shkencë

### Tabela krahasuese

| Aspekti | JavaScript | Python |
|---------|-----------|--------|
| Vështirësia | Mesatare | E lehtë |
| Web Frontend | Po | Jo |
| Web Backend | Po (Node.js) | Po (Django) |
| AI/ML | Kufizuar | Shkëlqyer |
| Paga (AL) | 500-1,500€ | 600-1,500€ |
| Paga (Remote) | 3,000-8,000€ | 3,000-7,000€ |

### Rekomandimi ynë

- **Dëshiron web development?** → JavaScript (MERN)
- **Dëshiron AI/Data?** → Python
- **Nuk je i sigurt?** → Fillo me Python, pastaj mëso JavaScript

Në Lika Academy ofrojmë të dyja: **JavaScript/MERN** (99€ çmim lansimi) dhe **Python Full-Stack** (99€ çmim lansimi).`,

      en: `## The Big Comparison: JavaScript vs Python

The two most popular programming languages — but which is best for you?

### JavaScript

**Pros:**
- The only language that runs in the browser
- Full-stack with Node.js (frontend + backend)
- Huge ecosystem (React, Vue, Angular, Next.js)
- Many job opportunities

**Cons:**
- More complex syntax than Python
- Too many frameworks — can be confusing
- Weird quirks (typeof null === "object")

**Perfect for:** Web development, interactive apps, startups

### Python

**Pros:**
- Very simple syntax
- Data science, AI, machine learning
- Excellent automation
- Great for beginners

**Cons:**
- Slower than JavaScript
- Doesn't run in the browser
- Fewer frontend opportunities

**Perfect for:** Data science, AI/ML, backend, automation, science

### Comparison table

| Aspect | JavaScript | Python |
|--------|-----------|--------|
| Difficulty | Medium | Easy |
| Web Frontend | Yes | No |
| Web Backend | Yes (Node.js) | Yes (Django) |
| AI/ML | Limited | Excellent |
| Salary (AL) | 500-1,500€ | 600-1,500€ |
| Salary (Remote) | 3,000-8,000€ | 3,000-7,000€ |

### Our recommendation

- **Want web development?** → JavaScript (MERN)
- **Want AI/Data?** → Python
- **Not sure?** → Start with Python, then learn JavaScript

At Lika Academy we offer both: **JavaScript/MERN** (99€ launch price) and **Python Full-Stack** (99€ launch price).`,
    },
  },
  {
    slug: "remote-work-albania",
    category: "career",
    date: "2026-03-25",
    readTime: 4,
    title: {
      sq: "Puna Remote nga Shqipëria: Guida e Plotë",
      en: "Remote Work from Albania: The Complete Guide",
    },
    excerpt: {
      sq: "Si të gjesh punë remote ndërkombëtare si developer nga Shqipëria. Platformat, pagat dhe këshilla praktike.",
      en: "How to find international remote work as a developer from Albania. Platforms, salaries and practical tips.",
    },
    content: {
      sq: `## Puna Remote: Mundësia e Madhe

Shqipëria ka një avantazh të madh për punë remote: kosto e ulët e jetesës + pagat ndërkombëtare = cilësi jete e shkëlqyer.

### Pagat për Developer Remote

- **Junior (0-2 vjet):** 1,500-3,000 EUR/muaj
- **Mid-Level (2-5 vjet):** 3,000-5,000 EUR/muaj
- **Senior (5+ vjet):** 5,000-10,000 EUR/muaj

Krahasoje me pagën mesatare në Shqipëri: 400-600 EUR/muaj. Ndryshimi është i madh.

### Ku të gjesh punë remote?

**Platforma kryesore:**
- **LinkedIn** — Filtro për "Remote" në lokacion
- **We Work Remotely** — Vetëm punë remote
- **Remote OK** — Mijëra pozicione
- **Toptal** — Për developer të avancuar
- **Upwork** — Freelance, ideal për fillim

### Aftësitë që kërkohen

1. **Anglishte e mirë** — Komunikimi është çelësi
2. **Git & GitHub** — Çdo kompani remote përdor version control
3. **Komunikim asinkron** — Slack, email, dokumentacion
4. **Self-management** — Disciplinë pa mbikëqyrje

### Si të përgatitesh me Lika Academy?

Kurset tona të përgatisin jo vetëm teknikisht, por edhe për tregun e punës:
- Projekte portfolio që tregojnë aftësitë tuaja
- Praktikë me Git & GitHub
- Mentoring për CV dhe intervista
- Komunitet alumni për networking

### Këshilla praktike

- **Fillo si freelancer** — Merr përvojë me projekte të vogla në Upwork
- **Ndërto prezencë online** — GitHub aktiv, blog, LinkedIn i plotësuar
- **Specializohu** — Më mirë ekspert në 1 teknologji sesa mesatar në 5
- **Rrjeti** — Lidhu me developer të tjerë shqiptarë që punojnë remote`,

      en: `## Remote Work: The Big Opportunity

Albania has a huge advantage for remote work: low cost of living + international salaries = excellent quality of life.

### Salaries for Remote Developers

- **Junior (0-2 years):** 1,500-3,000 EUR/month
- **Mid-Level (2-5 years):** 3,000-5,000 EUR/month
- **Senior (5+ years):** 5,000-10,000 EUR/month

Compare that to the average salary in Albania: 400-600 EUR/month. The difference is massive.

### Where to find remote work?

**Key platforms:**
- **LinkedIn** — Filter for "Remote" in location
- **We Work Remotely** — Remote jobs only
- **Remote OK** — Thousands of positions
- **Toptal** — For advanced developers
- **Upwork** — Freelance, ideal for starting out

### Skills required

1. **Good English** — Communication is key
2. **Git & GitHub** — Every remote company uses version control
3. **Async communication** — Slack, email, documentation
4. **Self-management** — Discipline without supervision

### How does Lika Academy prepare you?

Our courses prepare you not just technically, but also for the job market:
- Portfolio projects that showcase your skills
- Practice with Git & GitHub
- Mentoring for CV and interviews
- Alumni community for networking

### Practical tips

- **Start as a freelancer** — Get experience with small projects on Upwork
- **Build online presence** — Active GitHub, blog, complete LinkedIn
- **Specialize** — Better to be expert in 1 technology than average in 5
- **Network** — Connect with other Albanian developers who work remotely`,
    },
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
