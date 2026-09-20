// ── Chatbot Q&A data ──────────────────────────────────────────────────────────

export type QAEntry = { pattern: RegExp; en: string; sq: string };

export const QA: QAEntry[] = [
  {
    pattern: /^(hi|hello|hey|hej|përshëndetje|tungjatjeta|ç'kemi|ckemi|mir[ëe]dita)\b/i,
    en: "Hey there! 👋 I'm Zana. How can I help you today? Ask me about courses, pricing, schedule, or anything else!",
    sq: "Ej, përshëndetje! 👋 Jam Zana. Si mund të të ndihmoj sot? Më pyet për kurset, çmimet, orarin ose çdo gjë tjetër!",
  },
  {
    pattern: /si jeni|si je|how are you|how('| a)re u|ça bën|ca ben|ç'bëni/i,
    en: "I'm doing great, thanks for asking! 😊 Ready to help you find the perfect course. What are you interested in?",
    sq: "Shumë mirë, faleminderit që pyet! 😊 Gati për të të ndihmuar të gjesh kursin perfekt. Çfarë të intereson?",
  },
  {
    pattern: /faleminderit|flm|thanks|thank you|thx|rrofsh/i,
    en: "You're welcome! 😊 Don't hesitate to ask if you have more questions. Good luck with your coding journey!",
    sq: "S'ka përse! 😊 Mos hezito të pyesësh nëse ke pyetje të tjera. Suksese me rrugën e kodimit!",
  },
  {
    pattern: /mir[ëe]upafshim|bye|goodbye|shihemi|mirupafshim/i,
    en: "Goodbye! 👋 Come back anytime. We're here to help!",
    sq: "Mirupafshim! 👋 Kthehu kur të duash. Jemi këtu për ty!",
  },
  {
    pattern: /kush je|cila je|who are you|what are you|ça je/i,
    en: "I'm Zana — Lika Academy's AI assistant! 🧙‍♀️ Named after the magical guardians of Albanian mythology. I'm here to answer your questions about our courses and programs.",
    sq: "Jam Zana — asistentja AI e Lika Academy! 🧙‍♀️ Emri im vjen nga zanat e mitologjisë shqiptare. Jam këtu për t'iu përgjigjur pyetjeve tuaja rreth kurseve dhe programeve tona.",
  },
  {
    pattern: /ndihm[ëe]|help|mund.*ndihm/i,
    en: "Of course! Here's what I can help with:\n• 📚 Course info (Python, JS, Go, .NET, Kids, Teens)\n• 💰 Pricing & discounts\n• 📅 Schedule & cohorts\n• 📋 Enrollment process\n• 🎓 Certificates\n• 🤖 AI integration\nJust ask away!",
    sq: "Sigurisht! Ja ku mund të ndihmoj:\n• 📚 Info për kurset (Python, JS, Go, .NET, Kids, Teens)\n• 💰 Çmimet & zbritjet\n• 📅 Orari & kohortat\n• 📋 Procesi i regjistrimit\n• 🎓 Certifikatat\n• 🤖 Integrimi i AI\nPyet lirisht!",
  },
  {
    pattern: /price|cost|çmim|pag/i,
    en: "Our courses:\n• Web Development: HTML, CSS, JavaScript & Full Stack — pricing coming soon\n• Pro Tracks (19+): 99€ / 2 months (launch price)\nNo hidden fees!",
    sq: "Kurset tona:\n• Web Development: HTML, CSS, JavaScript & Full Stack — çmimi së shpejti\n• Pro Tracks (19+): 99€ / 2 muaj (çmim lansimi)\nPa tarifa të fshehura!",
  },
  {
    pattern: /python/i,
    en: "Our Python Full-Stack course (99€ launch price, 2 months) covers Python fundamentals, Django, AI integration, and 4 portfolio projects. Perfect for beginners interested in AI and data science!",
    sq: "Kursi ynë Python Full-Stack (99€ çmim lansimi, 2 muaj) mbulon bazat e Python, Django, integrimin e AI dhe 4 projekte portfolio. Perfekt për fillestarët e interesuar në AI dhe shkencën e të dhënave!",
  },
  {
    pattern: /javascript|js|mern|react/i,
    en: "Our JavaScript/MERN course (99€ launch price, 2 months) teaches React, Node.js, Express, and MongoDB. You'll build 4 full-stack projects. Great for web development careers!",
    sq: "Kursi ynë JavaScript/MERN (99€ çmim lansimi, 2 muaj) mëson React, Node.js, Express dhe MongoDB. Do të ndërtosh 4 projekte full-stack. Shkëlqyer për karrierë në web development!",
  },
  {
    pattern: /golang|go /i,
    en: "Our Golang course (99€ launch price, 2 months) covers Go fundamentals, concurrency, REST APIs, Docker, and microservices. Ideal for cloud and backend development!",
    sq: "Kursi ynë Golang (99€ çmim lansimi, 2 muaj) mbulon bazat e Go, concurrency, REST API, Docker dhe microservices. Ideal për cloud dhe backend development!",
  },
  {
    pattern: /\.net|c#|csharp/i,
    en: "Our .NET/C# course (99€ launch price, 2 months) teaches C#, ASP.NET Core, Entity Framework, and Azure deployment. Perfect for enterprise development!",
    sq: "Kursi ynë .NET/C# (99€ çmim lansimi, 2 muaj) mëson C#, ASP.NET Core, Entity Framework dhe deployment në Azure. Perfekt për enterprise development!",
  },
  {
    pattern: /kid|fëmij|child/i,
    en: "Our Web Development course teaches HTML, CSS, JavaScript, React, Node.js and MongoDB in a hands-on way — from the fundamentals to a complete web app. Pricing and age details coming soon!",
    sq: "Kursi ynë Web Development mëson HTML, CSS, JavaScript, React, Node.js dhe MongoDB në mënyrë praktike — nga bazat deri te një aplikacion i plotë web. Çmimi dhe detajet e moshës së shpejti!",
  },
  {
    pattern: /future|teen|adolesh/i,
    en: "Our Web Development course is a Full Stack program for ambitious learners. React, Node.js, MongoDB — pricing coming soon!",
    sq: "Kursi ynë Web Development është një program Full Stack për nxënës ambiciozë. React, Node.js, MongoDB — çmimi së shpejti!",
  },
  {
    pattern: /hybrid|online|fizik|format/i,
    en: "All our courses are hybrid! You can attend online or in-person in Kamëz, Tirana. All sessions are recorded and available 24/7.",
    sq: "Të gjitha kurset tona janë hibride! Mund të ndiqni online ose fizikisht në Kamëz, Tiranë. Të gjitha mësimet regjistrohen dhe janë të disponueshme 24/7.",
  },
  {
    pattern: /certif/i,
    en: "Yes! Every student receives a recognized certificate upon successful completion of the course and projects.",
    sq: "Po! Çdo student merr certifikatë të njohur pas përfundimit të suksesshëm të kursit dhe projekteve.",
  },
  {
    pattern: /ai|artificial|inteligjen/i,
    en: "Every course integrates AI tools — from coding with Copilot/Claude to building AI-powered features.",
    sq: "Çdo kurs integron mjetet e AI — nga kodimi me Copilot/Claude deri te ndërtimi i funksionaliteteve me AI.",
  },
  {
    pattern: /schedule|orar|when|kur/i,
    en: "Courses run on weekends — Saturday & Sunday, 08:00-16:00, with 4 time slots each day. Each group meets 2x/week (2 hours per session). Each course spans ~2 months (12 guided sessions + project weeks). First cohort starts May 2026!",
    sq: "Kurset zhvillohen fundjavë — E Shtunë & E Dielë, 08:00-16:00, me 4 slote çdo ditë. Çdo grup takohet 2x/javë (2 orë për seancë). Çdo kurs zgjat ~2 muaj (12 seanca të udhëzuara + javë projektesh). Kohorti i parë fillon në Maj 2026!",
  },
  {
    pattern: /contact|kontakt|email|phone/i,
    en: "You can reach us at:\n📧 info@likaacademy.al\n📱 +355 69 000 0000\nOr visit our Contact page!",
    sq: "Mund të na kontaktoni në:\n📧 info@likaacademy.al\n📱 +355 69 000 0000\nOse vizitoni faqen tonë të Kontaktit!",
  },

  // ── Enrollment & Registration ──────────────────────────────────────────────
  {
    pattern: /regjistro|enroll|sign up|apliko|apply|regist/i,
    en: "To enroll:\n1. Go to our Enroll page\n2. Choose your course\n3. Fill in your details\n4. Submit — we'll contact you within 24 hours!\nIt takes just 2 minutes. No commitment until you pay.",
    sq: "Për tu regjistruar:\n1. Shko te faqja Regjistrohu\n2. Zgjidh kursin\n3. Plotëso të dhënat\n4. Dërgo — do të kontaktohesh brenda 24 orëve!\nZgjat vetëm 2 minuta. Pa detyrim derisa paguan.",
  },
  {
    pattern: /pay|pagesë|paguan|pagesa|bank|transfer|kart[ëe]/i,
    en: "Payment is made before the course starts. We accept:\n• Bank transfer\n• Online payment\nFull amount upfront — no installments for now. It's 99€ per Pro Track (launch price); pricing for Web Development is coming soon!",
    sq: "Pagesa bëhet para fillimit të kursit. Pranojmë:\n• Transfertë bankare\n• Pagesë online\nShuma e plotë — pa këste për momentin. Është 99€ për Pro Track (çmim lansimi); çmimi për Web Development do të njoftohet së shpejti!",
  },
  {
    pattern: /refund|kthim|rimburs|para mbrapa/i,
    en: "Refund policy:\n• Full refund within the first 7 days\n• No refund after the first week\nSee our Terms of Service for details.",
    sq: "Politika e rimbursimit:\n• Rimbursim i plotë brenda 7 ditëve të para\n• Pa rimbursim pas javës së parë\nShiko Kushtet e Shërbimit për detaje.",
  },

  // ── Course Details & Comparison ────────────────────────────────────────────
  {
    pattern: /which course|cil[ëe]n kurs|recommend|rekoman|best course|kursi? m[ëe] i mir/i,
    en: "It depends on your goals:\n• Want web development? → JavaScript/MERN\n• Interested in AI/Data? → Python\n• Like backend/cloud? → Golang\n• Enterprise/corporate? → .NET/C#\n• Complete beginner? → Start with Python or JS\nNot sure? Try our Compare page!",
    sq: "Varet nga qëllimet e tua:\n• Dëshiron web development? → JavaScript/MERN\n• Interesohet për AI/Data? → Python\n• Pëlqen backend/cloud? → Golang\n• Enterprise/korporatë? → .NET/C#\n• Fillestar i plotë? → Fillo me Python ose JS\nS'je i sigurt? Provo faqen Krahaso!",
  },
  {
    pattern: /differ|ndrysh|krahaso|compare|vs/i,
    en: "Check our Compare page to see Python vs JavaScript vs Golang vs .NET side by side — hours, prices, difficulty, career paths, and more!",
    sq: "Shiko faqen Krahaso për të parë Python vs JavaScript vs Golang vs .NET krah për krah — orë, çmime, vështirësi, karrierë dhe më shumë!",
  },
  {
    pattern: /difficult|vësht[ëi]r|easy|leht[ëe]|hard|nivel/i,
    en: "Difficulty levels:\n• Python & JavaScript — Beginner friendly, no experience needed\n• Golang — Intermediate, some programming basics help\n• .NET/C# — Intermediate, suited for structured learners\nAll courses start from fundamentals!",
    sq: "Nivelet e vështirësisë:\n• Python & JavaScript — Për fillestarë, pa përvojë\n• Golang — Mesatar, ndihmon të kesh baza\n• .NET/C# — Mesatar, për ata që duan strukturë\nTë gjitha kurset fillojnë nga bazat!",
  },
  {
    pattern: /prerequisit|parakusht|need.*know|duhet.*di|experience.*need/i,
    en: "No prerequisites needed! All courses start from zero. You just need:\n• A laptop with internet\n• Motivation to learn\n• 2 hours on weekends\nWe provide everything else — tools, materials, mentoring.",
    sq: "Pa parakushte! Të gjitha kurset fillojnë nga zero. Të duhet vetëm:\n• Një laptop me internet\n• Motivim për të mësuar\n• 2 orë fundjavë\nNe ofrojmë gjithçka tjetër — mjete, materiale, mentoring.",
  },

  // ── Projects & Portfolio ───────────────────────────────────────────────────
  {
    pattern: /project|portfog|portfolio|ndërto/i,
    en: "Every student builds 4 real portfolio projects during the course:\n• Project 1: Guided full-stack app\n• Project 2: Independent project of your choice\n• Projects 3 & 4: Advanced builds in the final weeks\nThese go directly on your CV and GitHub!",
    sq: "Çdo student ndërton 4 projekte reale portfolio gjatë kursit:\n• Projekti 1: Aplikacion full-stack i udhëzuar\n• Projekti 2: Projekt i pavarur sipas zgjedhjes\n• Projektet 3 & 4: Ndërtime të avancuara në javët e fundit\nKëto shkojnë direkt në CV-në dhe GitHub-in tënd!",
  },

  // ── Career & Jobs ─────────────────────────────────────────────────────────
  {
    pattern: /job|pun[ëe]|career|karrier|hire|punëso/i,
    en: "We help with career preparation:\n• CV building & optimization\n• Interview practice\n• LinkedIn profile setup\n• Portfolio presentation\n• Connections to partner companies\nCheck our Success Stories page for career paths and salaries!",
    sq: "Ndihmojmë me përgatitjen e karrierës:\n• Ndërtim & optimizim CV-je\n• Praktikë intervistash\n• Setup i profilit LinkedIn\n• Prezantim portfolioje\n• Lidhje me kompani partnere\nShiko faqen Histori Suksesi për rrugët e karrierës dhe pagat!",
  },
  {
    pattern: /salary|pag[ëa]|sa paguhet|rroga|fitim/i,
    en: "Developer salaries in Albania:\n• Junior: 400-900€/month locally\n• Mid: 600-1,500€/month locally\n• Remote work: 2,000-7,000€/month!\nRemote work from Albania is a huge opportunity!",
    sq: "Pagat e developer-ëve në Shqipëri:\n• Junior: 400-900€/muaj lokalisht\n• Mid: 600-1,500€/muaj lokalisht\n• Punë remote: 2,000-7,000€/muaj!\nPuna remote nga Shqipëria është mundësi e madhe!",
  },
  {
    pattern: /remote|freelance|punë.*jashtë|work.*abroad/i,
    en: "Yes! Our courses prepare you for international remote work:\n• English-ready projects\n• Git/GitHub workflow\n• Portfolio for global market\n• Remote job platforms guidance\nAlbania + remote salary = amazing quality of life!",
    sq: "Po! Kurset tona të përgatisin për punë remote ndërkombëtare:\n• Projekte të gatshme për anglisht\n• Git/GitHub workflow\n• Portfolio për tregun global\n• Udhëzim për platformat e punës remote\nShqipëria + pagë remote = cilësi jete fantastike!",
  },

  // ── Location & Logistics ──────────────────────────────────────────────────
  {
    pattern: /ku|where|lokas|adres|location|tiran/i,
    en: "We're located in Kamëz, Tirana, Albania. You can attend in-person or join online — all sessions are hybrid!\nExact address will be shared upon enrollment.",
    sq: "Jemi në Kamëz, Tiranë, Shqipëri. Mund të vish fizikisht ose të ndiqesh online — të gjitha mësimet janë hibride!\nAdresa e saktë ndahet pas regjistrimit.",
  },
  {
    pattern: /park|transport|autobus|arri/i,
    en: "Our location in Kamëz, Tirana is easily accessible. Details about parking and transport will be shared when you enroll. Online option always available!",
    sq: "Lokacioni ynë në Kamëz, Tiranë është lehtësisht i aksesueshëm. Detajet për parkimin dhe transportin ndahen kur regjistrohesh. Opsioni online gjithmonë i disponueshëm!",
  },

  // ── Age Groups & Specifics ────────────────────────────────────────────────
  {
    pattern: /age|mosh[ëa]|sa vje[çt]|i vog[ëe]l|old enough/i,
    en: "We have programs for two groups:\n• Web Development: for younger learners (age details coming soon)\n• Pro Tracks: 19+ (adults)\nNo upper age limit — it's never too late to learn coding!",
    sq: "Kemi programe për dy grupe:\n• Web Development: për nxënës më të vegjël (detajet e moshës së shpejti)\n• Pro Tracks: 19+ (të rritur)\nPa kufi të sipërme moshe — kurrë nuk është vonë për të mësuar kodim!",
  },
  {
    pattern: /parent|prind|fëmij.*regjist|child.*enroll|vajz|djal/i,
    en: "For kids under 18, a parent registers on their behalf. Our Web Development program is designed to be fun and creative!\n• HTML, CSS & JavaScript basics\n• Build real websites\n• Pricing coming soon\nYour child will love it!",
    sq: "Për fëmijë nën 18 vjeç, prindi regjistron në emër të tyre. Programi Web Development është dizajnuar të jetë argëtues dhe kreativ!\n• Bazat e HTML, CSS & JavaScript\n• Ndërtojnë faqe reale\n• Çmimi së shpejti\nFëmija juaj do ta dojë!",
  },

  // ── Teaching & Methods ────────────────────────────────────────────────────
  {
    pattern: /instructor|m[ëe]sues|ligjër|lektor|kush.*m[ëe]son/i,
    en: "Our instructors are experienced developers with real industry experience. Visit our Instructors page to learn more!\nWe're also hiring — if you're an experienced dev who wants to teach, contact us!",
    sq: "Instruktorët tanë janë developer-ë me përvojë reale në industri. Vizito faqen e Instruktorëve për më shumë!\nPo punësojmë gjithashtu — nëse je dev me përvojë dhe dëshiron të mësosh, na kontakto!",
  },
  {
    pattern: /language|gjuh[ëe].*m[ëe]sim|anglisht|english.*class|shqip.*class/i,
    en: "Classes are taught in Albanian with technical terms in English. Course materials include both Albanian and English resources. This prepares you for the international job market!",
    sq: "Mësimet zhvillohen në shqip me terma teknike në anglisht. Materialet përfshijnë burime në shqip dhe anglisht. Kjo të përgatit për tregun ndërkombëtar të punës!",
  },
  {
    pattern: /laptop|kompjuter|computer|pc|mac|pajisje|equip/i,
    en: "You need:\n• Any laptop (Windows, Mac, or Linux)\n• Stable internet connection\nThat's it! We provide all software, tools, and development environments for free.",
    sq: "Të duhet:\n• Çdo laptop (Windows, Mac, ose Linux)\n• Lidhje interneti e qëndrueshme\nKaq! Ne ofrojmë të gjithë softuerin, mjetet dhe mjediset e zhvillimit falas.",
  },

  // ── Discounts & Referrals ─────────────────────────────────────────────────
  {
    pattern: /discount|zbritje|offer|ofert|promo|ulje/i,
    en: "Current offers:\n• Bundle discount: 10% off for 2 courses, 15% off for 3+\n• Referral: Invite a friend, both get 15% off\n• Use our Pricing Calculator to see exact savings!\nPrices are already the lowest in Kamëz, Tirana!",
    sq: "Ofertat aktuale:\n• Zbritje bundle: 10% për 2 kurse, 15% për 3+\n• Referim: Fto një mik, të dy merrni 15% zbritje\n• Përdor Llogaritësin e Çmimeve për kursime!\nÇmimet janë tashmë më të ulëtat në Kamëz, Tiranë!",
  },
  {
    pattern: /referr|refer|fto.*mik|invite.*friend/i,
    en: "Our Referral Program:\n• You get 15% off your next course\n• Your friend gets 15% off their first course\n• No limit on referrals — refer 3 friends = 45% off!\n• Discounts stack up to 100% (free course!)\nVisit our Referral page to send an invitation.",
    sq: "Programi i Referimit:\n• Ti merr 15% zbritje në kursin tjetër\n• Miku yt merr 15% zbritje në kursin e parë\n• Pa limit referimesh — fto 3 miq = 45% zbritje!\n• Zbritjet grumbullohen deri 100% (kurs falas!)\nVizito faqen Referimi për të dërguar ftesë.",
  },

  // ── Quality Standards ────────────────────────────────────────────────────
  {
    pattern: /eu|europe|bashkim|innovation|mbësht/i,
    en: "We follow international quality standards for our curriculum — every syllabus is published online before you enroll, so you can verify exactly what you'll learn. We're building Lika Academy to bring world-class tech education to Albania!",
    sq: "Ndjekim standarde ndërkombëtare cilësie për kurrikulën tonë — çdo syllabus publikohet online para se të regjistrohesh, kështu që mund të verifikosh saktësisht çfarë do të mësosh. Po ndërtojmë Lika Academy për të sjellë edukim teknologjik në nivel botëror në Shqipëri!",
  },

  // ── Duration & Intensity ──────────────────────────────────────────────────
  {
    pattern: /sa zgjat|how long|duration|kohë|muaj|month|jav[ëe]|week/i,
    en: "Each course lasts 2 months (6 weeks of lessons + 4 weeks of projects):\n• 12 sessions total\n• 2 sessions per week per group\n• 2 hours per session\n• Weekends only: Saturday & Sunday\n• Max 8 sessions/week across all groups\nIntensive enough to learn, flexible enough for work/school!",
    sq: "Çdo kurs zgjat 2 muaj (6 javë mësime + 4 javë projekte):\n• 12 seanca totale\n• 2 seanca/javë për grup\n• 2 orë për seancë\n• Vetëm fundjavë: E Shtunë & E Dielë\n• Max 8 seanca/javë për të gjitha grupet\nIntensiv sa duhet për të mësuar, fleksibël sa duhet për punë/shkollë!",
  },

  // ── After Course / What's Next ────────────────────────────────────────────
  {
    pattern: /after|pas kurs|what.*next|çfar.*pastaj|next.*step|vazhdo/i,
    en: "After completing a course you can:\n• Start applying for jobs with your portfolio\n• Take another Pro Track course (with bundle discount!)\n• Do freelance work on Upwork/Fiverr\n• Join our alumni community for ongoing support\n6-month advanced courses are coming soon!",
    sq: "Pas përfundimit të kursit mund të:\n• Fillosh të aplikosh për punë me portfolion\n• Ndjekësh kurs tjetër Pro Track (me zbritje bundle!)\n• Bësh punë freelance në Upwork/Fiverr\n• Bashkohesh me komunitetin alumni për mbështetje\nKurse 6-mujore të avancuara po vijnë së shpejti!",
  },

  // ── Technical Questions ───────────────────────────────────────────────────
  {
    pattern: /git|github/i,
    en: "Yes! Every course includes Git & GitHub training:\n• Version control basics\n• Branching & merging\n• Pull requests\n• Deploying your projects\nYour GitHub profile becomes your professional portfolio!",
    sq: "Po! Çdo kurs përfshin trajnim Git & GitHub:\n• Bazat e version control\n• Branching & merging\n• Pull requests\n• Deployment i projekteve\nProfili yt GitHub bëhet portfolioja jote profesionale!",
  },
  {
    pattern: /deploy|hosting|server|cloud|aws|vercel/i,
    en: "We teach deployment in every course:\n• Python → Railway/AWS\n• JavaScript → Vercel/Netlify\n• Golang → Docker/cloud\n• .NET → Azure\nYour projects go live on the real internet!",
    sq: "Mësojmë deployment në çdo kurs:\n• Python → Railway/AWS\n• JavaScript → Vercel/Netlify\n• Golang → Docker/cloud\n• .NET → Azure\nProjektet tuaja bëhen live në internet!",
  },
  {
    pattern: /database|databaz|sql|mongo|postgres/i,
    en: "Database training is included:\n• Python course: PostgreSQL\n• JavaScript/MERN: MongoDB\n• Golang: PostgreSQL\n• .NET: SQL Server & PostgreSQL\nYou'll learn both SQL and NoSQL!",
    sq: "Trajnimi i database përfshihet:\n• Kursi Python: PostgreSQL\n• JavaScript/MERN: MongoDB\n• Golang: PostgreSQL\n• .NET: SQL Server & PostgreSQL\nDo mësosh si SQL ashtu edhe NoSQL!",
  },

  // ── Fun & Engagement ──────────────────────────────────────────────────────
  {
    pattern: /playground|provo|try.*cod|test.*cod/i,
    en: "Want to try coding right now? Check our Code Playground! 🎮 It's a free mini HTML/CSS lesson right in your browser — no account needed!",
    sq: "Dëshiron ta provosh kodimin tani? Shiko Code Playground-in tonë! 🎮 Një mini mësim HTML/CSS falas direkt në browser — pa llogari!",
  },
  {
    pattern: /blog|artikull|tutorial|mëso.*falas|free.*learn/i,
    en: "Check our Blog for free resources:\n• Coding tutorials\n• Career tips\n• Tech news\n• Language comparisons\nNew articles every week — all in Albanian and English!",
    sq: "Shiko Blog-un tonë për burime falas:\n• Tutoriale kodimi\n• Tips karriere\n• Lajme teknologjie\n• Krahasime gjuhësh\nArtikuj të rinj çdo javë — në shqip dhe anglisht!",
  },
  {
    pattern: /newsletter|email.*list|buletini/i,
    en: "Subscribe to our newsletter and get:\n• Free \"Zero to Developer\" PDF roadmap\n• Weekly coding tips\n• Early access to new courses\n• Exclusive discounts\nSign up on our homepage!",
    sq: "Regjistrohu në newsletter-in tonë dhe merr:\n• PDF falas \"Nga Zero në Developer\"\n• Tips kodimi javore\n• Akses i hershëm në kurse të reja\n• Zbritje ekskluzive\nRegjistrohu në faqen kryesore!",
  },

  // ── Lika Academy Identity ─────────────────────────────────────────────────
  {
    pattern: /pse lika|why lika|what.*special|çfar.*veçant[ëe]|differenc/i,
    en: "What makes Lika Academy different:\n🤖 AI integrated in every course\n💰 Transparent pricing — 99€/course (launch price), no surprises\n📋 Published syllabi — see every module before enrolling\n🎯 4 real portfolio projects\n🌍 Hybrid format — online or in-person\nNo other academy in Kamëz, Tirana offers all of this!",
    sq: "Çfarë e bën Lika Academy ndryshe:\n🤖 AI e integruar në çdo kurs\n💰 Çmime transparente — 99€/kurs (çmim lansimi), pa surpriza\n📋 Syllabi i publikuar — shiko çdo modul para regjistrimit\n🎯 4 projekte reale portfolio\n🌍 Format hibrid — online ose fizik\nAsnjë akademi tjetër në Kamëz, Tiranë nuk ofron gjithë këtë!",
  },
  {
    pattern: /first|i par[ëe]|new|i ri|kur.*hap|when.*open|launch|lansim/i,
    en: "Lika Academy is launching in May 2026! 🚀\nThe first cohort starts soon — spots are limited (8-12 per class).\nEnroll now to secure your spot in the very first cohort!",
    sq: "Lika Academy lansohet në Maj 2026! 🚀\nKohorti i parë fillon së shpejti — vendet janë të kufizuara (8-12 për klasë).\nRegjistrohu tani për të siguruar vendin në kohortin e parë!",
  },

  // ── Catch common misspellings ─────────────────────────────────────────────
  {
    pattern: /ok|okay|dakord|n rregull|mir[ëe]/i,
    en: "Great! 😊 Anything else you'd like to know? I'm here to help!",
    sq: "Shkëlqyeshëm! 😊 Ka diçka tjetër që dëshiron të dish? Jam këtu për të ndihmuar!",
  },
  {
    pattern: /wow|amazing|cool|awesome|bukur|fantastik/i,
    en: "Thank you! 🎉 We're excited to have you interested. Ready to start your coding journey?",
    sq: "Faleminderit! 🎉 Jemi të emocionuar që je i interesuar. Gati të fillosh rrugën e kodimit?",
  },

  // ── Homework & Study Load ─────────────────────────────────────────────────
  {
    pattern: /homework|detyra|practice.*outside|sa.*or[ëe].*jasht[ëe]|practice.*home|stud.*jasht[ëe]/i,
    en: "Plan for about 2-4 hours of practice per week outside class. We assign small exercises after each session to reinforce what you learned. It's manageable alongside a full-time job or school!",
    sq: "Planifiko rreth 2-4 orë praktikë në javë jashtë klasës. Japim ushtrime të vogla pas çdo seance për të përforcuar atë që mësove. Është e menaxhueshme krahas punës ose shkollës!",
  },
  {
    pattern: /miss.*class|miss.*session|humb.*m[ëe]sim|mungoj|absent|nuk.*mund.*vi/i,
    en: "Don't worry! All sessions are recorded and available 24/7. If you miss a class, you can watch the recording and catch up at your own pace. You can also ask questions in our community chat.",
    sq: "Mos u shqetëso! Të gjitha seancat regjistrohen dhe janë të disponueshme 24/7. Nëse humb një mësim, mund të shikosh regjistrimin dhe të arrish në ritmin tënd.",
  },
  {
    pattern: /support.*between|ndihm[ëe].*jasht[ëe]|help.*outside.*class|support.*after.*class/i,
    en: "Yes! You have access to our community chat where instructors and fellow students help each other. You're never alone between sessions. Plus, all course materials are available 24/7.",
    sq: "Po! Ke akses në chat-in e komunitetit ku instruktorët dhe studentët ndihmojnë njëri-tjetrin. Nuk je kurrë vetëm mes seancave. Plus, të gjitha materialet janë të disponueshme 24/7.",
  },

  // ── Group Size & Attention ────────────────────────────────────────────────
  {
    pattern: /how many.*student|group.*size|class.*size|sa.*student|sa.*n[ëe].*klas|madhesi.*grup/i,
    en: "We keep classes small: 8-12 students per cohort. This ensures everyone gets personal attention, can ask questions, and gets meaningful code reviews on their projects.",
    sq: "I mbajmë klasat të vogla: 8-12 studentë për kohort. Kjo siguron që secili merr vëmendje personale, mund të bëjë pyetje dhe merr code review të kuptimplotë për projektet.",
  },
  {
    pattern: /individual.*feedback|personal.*review|code.*review|review.*kodin|feedback.*individual/i,
    en: "Absolutely! Every project gets personalized code review from your instructor. With only 8-12 students per class, there's plenty of time for individual attention and 1-on-1 feedback.",
    sq: "Patjetër! Çdo projekt merr code review të personalizuar nga instruktori. Me vetëm 8-12 studentë për klasë, ka kohë të mjaftueshme për vëmendje individuale dhe feedback 1-me-1.",
  },

  // ── Skepticism & Trust ────────────────────────────────────────────────────
  {
    pattern: /worth.*it|ia.*vlen|waste.*money|humbje.*par[ae]|really.*learn|v[ëe]rtet[ëe].*m[ëe]soj|scam|mashtrim/i,
    en: "Great question! Here's why it's worth it:\n• You build 4 real portfolio projects\n• At 99€ (launch price), it's a fraction of other bootcamps\n• Weekend format — don't quit your job\n• Published syllabi — verify quality before you pay\n• 7-day full refund if it's not for you\nYour portfolio speaks louder than any certificate!",
    sq: "Pyetje e mirë! Ja pse ia vlen:\n• Ndërton 4 projekte reale portfolio\n• Me 99€ (çmim lansimi), është fraksion i kostos së bootcamp-eve\n• Formati fundjavë — nuk lëshon punën\n• Syllabi të publikuara — verifiko cilësinë para se të paguash\n• Rimbursim i plotë 7-ditor\nPortfolioja flet më shumë se çdo certifikatë!",
  },
  {
    pattern: /legit|trust|besoj|prove|deshmi|transparent|vertet/i,
    en: "We believe in full transparency:\n• Complete syllabi published online before you pay\n• Real instructor profiles\n• 7-day money-back guarantee\n• Public pricing — no hidden fees\nCheck our Syllabus page to see exactly what you'll learn!",
    sq: "Besojmë në transparencë të plotë:\n• Syllabi të plota të publikuara online para se të paguash\n• Profile reale instruktorësh\n• Garanci 7-ditore kthim parash\n• Çmime publike — pa tarifa të fshehura\nShiko faqen e Syllabus!",
  },
  {
    pattern: /review|testimonial|koment|p[ëe]rshtypje|experience.*student|feedback.*student/i,
    en: "We're launching our first cohort in May 2026, so no alumni testimonials yet — but they're coming soon! Check our published syllabi and instructor profiles as quality proof.",
    sq: "Po lansojmë kohortin e parë në Maj 2026, nuk kemi ende dëshmi alumni — por do t'i kemi së shpejti! Shiko syllabi të publikuara dhe profilet e instruktorëve si provë cilësie.",
  },
  {
    pattern: /don.*like|nuk.*p[ëe]lqe|change.*mind|ndrysho.*mendje|regret|pendohem|quit.*course|leshoj.*kurs/i,
    en: "No risk! You have a full 7-day refund window after the course starts. If it's not the right fit, you get 100% of your money back. We want you to stay because you love it!",
    sq: "Pa rrezik! Ke dritare rimbursimi 7-ditore pas fillimit të kursit. Nëse nuk të përshtatet, merr 100% të parave mbrapsht. Duam të qëndrosh sepse të pëlqen!",
  },

  // ── Emotional & Motivational ──────────────────────────────────────────────
  {
    pattern: /scared|frik[ëe]|not.*smart|nuk.*jam.*i.*zgjuar|afraid|kam.*frik|anxious|nervous|i.*pa.*aft[ëe]/i,
    en: "That feeling is completely normal — even experienced developers felt this way! 💪 Coding isn't about being 'smart,' it's about persistence. Our courses start from absolute zero, and small classes mean you'll never be left behind. You've got this!",
    sq: "Ky ndjesi është plotësisht normale — edhe developer-ët me përvojë u ndjen kështu! 💪 Kodimi nuk ka të bëjë me të qenit 'i zgjuar,' por me këmbëngulje. Kurset fillojnë nga zero absolut dhe klasat e vogla do të thonë që nuk mbetesh mbrapa. Ti mund!",
  },
  {
    pattern: /too.*old|shum[ëe].*i.*vjet[ëe]r|shum[ëe].*plon|von[ëe].*p[ëe]r|late.*start|never.*too.*late|40.*vje[çt]|50.*vje[çt]/i,
    en: "Absolutely not! Many successful developers started in their 30s, 40s, and beyond. In tech, your skills matter more than your age. There's no age limit at Lika Academy — it's never too late! 🚀",
    sq: "Absolutisht jo! Shumë developer të suksesshëm filluan në moshën 30, 40 e më tej. Në teknologji, aftësitë janë më të rëndësishme se mosha. Nuk ka kufi moshe në Lika Academy — kurrë nuk është vonë! 🚀",
  },
  {
    pattern: /tried.*before|fail|d[ëe]shtov|provov.*m[ëe]par|gave.*up|hoqa.*dor[ëe]|didn.*work|nuk.*funksionoi/i,
    en: "You're not alone — most self-learners hit a wall because they lack structure and support. That's exactly what Lika Academy provides: a clear path, live instruction, small groups, and someone to unstick you. This time is different! 💪",
    sq: "Nuk je vetëm — shumica e atyre që mësojnë vetë hasin në mur sepse u mungon struktura. Kjo është pikërisht ajo që ofron Lika Academy: rrugë e qartë, mësimdhënie live, grupe të vogla dhe dikë që të ndihmon. Këtë herë do jetë ndryshe! 💪",
  },
  {
    pattern: /feel.*lost|behind.*other|compared.*other|ndihem.*humbur|mbrapa.*t[ëe].*tjer/i,
    en: "Everyone starts from the same point — zero! Our courses assume no prior knowledge. And with 8-12 students per class, the instructor paces the material so nobody falls behind. There's no competition, only collaboration! 🤝",
    sq: "Të gjithë fillojnë nga e njëjta pikë — zero! Kurset supozojnë pa njohuri paraprake. Me 8-12 studentë, instruktori e përpjeston materialin që askush të mos mbetet mbrapa. Nuk ka konkurrencë, vetëm bashkëpunim! 🤝",
  },

  // ── Career Changers ───────────────────────────────────────────────────────
  {
    pattern: /full.*time|work.*time|pun[ëe].*plot[ëe]|manage.*work|alongside.*job|krahas.*pun[ëe]s|busy|i.*z[ëe]n[ëe]/i,
    en: "Yes — that's why we designed weekend-only classes! Saturday & Sunday with 4 time slots (08-16). Just 2 hours per session + 2-4 hours practice at home. Perfect for working professionals! ⚡",
    sq: "Po — pikërisht për këtë i dizajnuam mësimet vetëm fundjavë! E Shtunë & E Dielë me 4 slote (08-16). Vetëm 2 orë për seancë + 2-4 orë praktikë në shtëpi. Perfekt për profesionistë që punojnë! ⚡",
  },
  {
    pattern: /change.*career|career.*change|ndrysho.*karrier|enough.*time|mjafton|2.*month.*enough|dy.*muaj.*mjaft/i,
    en: "2 months gives you a strong foundation + 4 portfolio projects. After that you can: apply for junior roles, continue learning with alumni resources, or take another course (with 10% bundle discount). It's the launchpad, not the ceiling! 🚀",
    sq: "2 muaj të japin bazë të fortë + 4 projekte portfolio. Pastaj mund: të aplikosh për role junior, të vazhdosh me burimet alumni, ose të ndjekësh kurs tjetër (me 10% zbritje). Është platforma e nisjes, jo kufiri! 🚀",
  },
  {
    pattern: /non.*tech|background.*differ|nuk.*di.*gj[ëe]|zero.*knowledge/i,
    en: "Our courses are built for exactly this! No tech background needed. Many of the best developers came from completely different fields: teachers, accountants, designers. Your diverse experience is an asset, not a barrier! 🌟",
    sq: "Kurset tona janë ndërtuar pikërisht për këtë! Pa nevojë për sfond teknik. Shumë developer-ë të mirë erdhën nga fusha krejt të ndryshme: mësues, kontabilistë, dizajnerë. Përvoja jote e larmishme është avantazh, jo pengesë! 🌟",
  },

  // ── Learning Experience ───────────────────────────────────────────────────
  {
    pattern: /just.*lecture|hands.*on|praktik|theory.*only|vet[ëe]m.*teori|live.*cod/i,
    en: "It's 70% hands-on coding, 30% guided instruction. Every session includes live coding exercises. You write real code from day one — no death-by-PowerPoint! Plus, you build 4 complete projects. 💻",
    sq: "Është 70% kodim praktik, 30% instruksion i udhëzuar. Çdo seancë përfshin ushtrime live kodimi. Shkruan kod real që nga dita e parë — pa vdekje nga PowerPoint! Plus, ndërton 4 projekte të plota. 💻",
  },
  {
    pattern: /real.*world|bot[ëe].*reale|industry.*tool|mjete.*industri|professional.*tool|VS.*Code|IDE/i,
    en: "We use the exact same tools professionals use daily: VS Code, Git/GitHub, terminal, Docker, cloud platforms, and AI assistants (Copilot, Claude). No toy environments — everything is production-ready! 🛠️",
    sq: "Përdorim të njëjtat mjete që profesionistët përdorin çdo ditë: VS Code, Git/GitHub, terminal, Docker, platforma cloud dhe asistentë AI (Copilot, Claude). Pa mjedise lodrash — gjithçka production-ready! 🛠️",
  },
  {
    pattern: /curriculum.*updat|up.*to.*date|latest.*tech|teknologji.*fundit|kurrikul.*p[ëe]rdit[ëe]s|outdated|e.*vjet[ëe]r/i,
    en: "Our curriculum is reviewed and updated before every cohort. AI moves fast, so staying current isn't optional — it's core to who we are. The syllabus online always reflects the latest version! 🔄",
    sq: "Kurrikula rishikohet dhe përditësohet para çdo kohorti. AI ndryshon shpejt, kështu që të qëndrosh i përditësuar nuk është opsionale — është thelbësore. Syllabi online pasqyron gjithmonë versionin më të fundit! 🔄",
  },
  {
    pattern: /record|regjist|watch.*again|rishik|replay|video.*class|shik.*prap/i,
    en: "Yes! Every session is recorded and available 24/7. You can rewatch any class as many times as you need — great for review before projects! 🎥",
    sq: "Po! Çdo seancë regjistrohet dhe është e disponueshme 24/7. Mund të rishikosh çdo klasë sa herë të duash — shkëlqyer për rishikim para projekteve! 🎥",
  },

  // ── Certificates ──────────────────────────────────────────────────────────
  {
    pattern: /employer.*value|certifikat[ëe].*vler[ëe]|recogni[sz]e.*cert|njoh.*certifikat|cert.*worth/i,
    en: "In tech, employers care more about what you can BUILD than what paper you have. That's why we focus on 4 portfolio projects + GitHub profile. The certificate shows commitment, the projects prove skills! 🎯",
    sq: "Në teknologji, punëdhënësit interesohen më shumë për çfarë mund të NDËRTOSH sesa për letër. Për këtë fokusohemi në 4 projekte portfolio + profil GitHub. Certifikata tregon angazhim, projektet provojnë aftësitë! 🎯",
  },

  // ── Community ─────────────────────────────────────────────────────────────
  {
    pattern: /community|komunitet|discord|slack|chat.*group|grup.*chat/i,
    en: "Every student joins our community where you can ask questions, share projects, network with others, and get announcements. The community stays active even after your course ends! 🤝",
    sq: "Çdo student bashkohet me komunitetin tonë ku mund të bësh pyetje, ndash projekte, lidhesh me të tjerë dhe marrësh njoftime. Komuniteti mbetet aktiv edhe pas përfundimit të kursit! 🤝",
  },
  {
    pattern: /meet.*student|takoj.*student|networking|events|ngjarje|takime/i,
    en: "Yes! We plan coding meetups, demo days (where you present projects), and networking events. The connections you make here can lead to job referrals! 🎉",
    sq: "Po! Planifikojmë coding meetups, demo days (ku prezanton projektet) dhe evente networking. Lidhjet që krijon këtu mund të çojnë në referime pune! 🎉",
  },

  // ── Albanian Market ───────────────────────────────────────────────────────
  {
    pattern: /demand.*albania|k[ëe]rkes.*shqip|treg.*shqip|market.*albania|a.*ka.*pun[ëe]/i,
    en: "IT is the fastest-growing sector in Albania! 4,000+ ICT employers, growing 12.7% annually. Over 50% of Albanian IT companies export services internationally. Demand far outstrips supply! 📈",
    sq: "IT është sektori me rritjen më të shpejtë në Shqipëri! 4,000+ punëdhënëse ICT, rritet me 12.7% në vit. Mbi 50% e kompanive IT eksportojnë shërbime. Kërkesa e tejkalon ofertën! 📈",
  },
  {
    pattern: /other.*academ|akademi.*tjet|compar.*tirana|krahaso.*tiran|konkurrent|competit/i,
    en: "What sets us apart:\n• Published syllabi (most don't!)\n• AI integrated into every course (unique in Albania)\n• 99€/course launch price (others: 500-2,000€+)\n• Weekend-only (work-friendly)\n• Small classes (8-12, not 30+)\nCompare on our Compare page!",
    sq: "Çfarë na dallon:\n• Syllabi të publikuara (shumica nuk i ndajnë!)\n• AI e integruar në çdo kurs (unike në Shqipëri)\n• 99€/kurs çmim lansimi (të tjerët: 500-2,000€+)\n• Vetëm fundjavë\n• Klasa të vogla (8-12, jo 30+)\nKrahaso në faqen tonë!",
  },

  // ── Parents & Kids ────────────────────────────────────────────────────────
  {
    pattern: /screen.*time|koh[ëe].*ekran|too.*much.*screen|shum[ëe].*ekran/i,
    en: "Coding screen time is creative and educational — very different from passive scrolling! Your child will be actively building and problem-solving. It's like comparing reading a book to watching TV. Plus, only 2 hours per session! 📚",
    sq: "Koha e ekranit për kodim është kreative dhe edukative — shumë e ndryshme nga scrollimi pasiv! Fëmija do të ndërtojë dhe zgjidhë probleme aktivisht. Është si të krahasosh leximin me TV. Plus, vetëm 2 orë për seancë! 📚",
  },
  {
    pattern: /child.*build|f[ëe]mij.*nd[ëe]rto|kid.*create|f[ëe]mij.*krijo|what.*build.*kid/i,
    en: "By the end of Web Development, your child will build their own personal website from scratch! They'll know HTML & CSS, understand how the internet works, and have a real project to show. Some kids even build websites for school projects! 🌐",
    sq: "Deri në fund të Web Development, fëmija do të ndërtojë faqen e tij/saj personale nga zero! Do të dijë HTML & CSS, do të kuptojë si funksionon interneti dhe do të ketë projekt real për të treguar. Disa fëmijë ndërtojnë edhe faqe për shkollën! 🌐",
  },
  {
    pattern: /safe.*child|sigurt.*f[ëe]mij|online.*safe|siguri.*online|monitor|mbik[ëe]qyr/i,
    en: "Absolutely! All sessions are supervised by instructors. The learning environment is closed and monitored. For in-person classes, children are in our secure classroom in Kamëz, Tirana. 🔒",
    sq: "Patjetër! Të gjitha seancat mbikëqyren nga instruktorët. Mjedisi i mësimit është i mbyllur dhe i monitoruar. Për klasa fizike, fëmijët janë në hapësirën tonë të sigurt në Kamëz, Tiranë. 🔒",
  },
  {
    pattern: /help.*school|ndihmo.*shkoll|benefit.*school|math|logji|logic/i,
    en: "Yes! Research shows coding improves:\n• Mathematical thinking & logic\n• Problem-solving skills\n• Reading comprehension\n• Creativity & planning\n• Attention to detail\nMany parents report improved school performance! 📊",
    sq: "Po! Kërkimi tregon që kodimi përmirëson:\n• Të menduarit matematik & logjik\n• Aftësitë e zgjidhjes së problemeve\n• Të kuptuarit e leximit\n• Kreativitetin & planifikimin\n• Vëmendjen ndaj detajeve\nShumë prindër raportojnë përmirësim shkollor! 📊",
  },
  {
    pattern: /sit.*in|observe|watch.*class|shiko.*klas|prind.*prezent|parent.*attend/i,
    en: "For the first session, parents are welcome to observe! After that, kids learn better independently. But you'll receive progress updates, and all sessions are recorded so you can see what they're learning. 👨‍👩‍👧",
    sq: "Për seancën e parë, prindërit janë të mirëseardhur! Pastaj, fëmijët mësojnë më mirë në mënyrë të pavarur. Por do të merrni përditësime progresi, dhe seancat regjistrohen. 👨‍👩‍👧",
  },

  // ── Trial & Guarantee ─────────────────────────────────────────────────────
  {
    pattern: /free.*lesson|try.*free|provo.*falas|m[ëe]sim.*falas|trial|demo.*class/i,
    en: "We don't have a free trial class yet, but you can:\n• Try our Code Playground (free mini HTML/CSS lesson)\n• Read our full published syllabi\n• Use the 7-day refund guarantee risk-free\nWe're confident you'll love it from session one! 🎮",
    sq: "Nuk kemi ende klasë provë falas, por mund të:\n• Provosh Code Playground-in (mini mësim falas)\n• Lexosh syllabi të plota të publikuara\n• Përdorësh garancinë 7-ditore pa rrezik\nJemi të bindur që do të të pëlqejë! 🎮",
  },
  {
    pattern: /money.*back|guarantee|garanci|siguri.*par[ae]|risk.*free|pa.*rrezik/i,
    en: "Yes! Full 7-day money-back guarantee. If after your first week you feel it's not right for you — 100% refund, no questions asked. We want happy students, not trapped ones! ✅",
    sq: "Po! Garanci e plotë 7-ditore. Nëse pas javës së parë ndjen që nuk është për ty — rimbursim 100%, pa pyetje. Duam studentë të kënaqur, jo të bllokuar! ✅",
  },

  // ── Technical Concerns ────────────────────────────────────────────────────
  {
    pattern: /powerful.*laptop|expensive.*laptop|laptop.*i.*shtrenjt|what.*laptop|old.*laptop|specs|specifikime/i,
    en: "No expensive hardware needed! Any laptop from the last 5-6 years works fine. Minimum: 4GB RAM, any modern browser. Windows, Mac, or Linux. Unsure? Send us your specs and we'll confirm! 💻",
    sq: "Pa hardware të shtrenjtë! Çdo laptop nga 5-6 vitet e fundit funksionon. Minimumi: 4GB RAM, çdo browser modern. Windows, Mac ose Linux. I pasigurt? Na dërgo specifikimet! 💻",
  },
  {
    pattern: /get.*stuck|stuck|ngec|bllok|can.*solve|nuk.*mund.*zgjidh/i,
    en: "Getting stuck is part of learning! Even senior devs Google things daily. Your safety net:\n1. Rewatch the recording\n2. Ask in community chat\n3. Instructor office hours\n4. AI assistants (we teach you how!)\nYou'll never be stuck for long! 🔧",
    sq: "Të ngecësh është pjesë e mësimit! Edhe seniorët kërkojnë në Google çdo ditë. Rrjeta jote:\n1. Rishiko regjistrimin\n2. Pyet në chat\n3. Orët e konsulencës\n4. Asistentë AI (të mësojmë si!)\nNuk do ngecësh për shumë kohë! 🔧",
  },
  {
    pattern: /chatgpt|copilot|claude.*cod|ai.*tool.*cod|mjete.*ai.*kod/i,
    en: "Yes! AI is integrated into every course. Every course teaches:\n• GitHub Copilot for faster coding\n• Claude/ChatGPT for debugging\n• Building AI-powered features\n• When to trust AI and when NOT to\nThis is the #1 skill employers want in 2026! 🤖",
    sq: "Po! AI është e integruar në çdo kurs. Çdo kurs mëson:\n• GitHub Copilot për kodim më të shpejtë\n• Claude/ChatGPT për debugging\n• Ndërtim funksionalitetesh me AI\n• Kur të besosh AI dhe kur JO\nKjo është aftësia #1 që punëdhënësit duan! 🤖",
  },

  // ── Scheduling Flexibility ────────────────────────────────────────────────
  {
    pattern: /switch.*online|switch.*person|ndrysho.*online|ndrysho.*fizik|flexible.*attend/i,
    en: "Yes! Our hybrid format is fully flexible. Attend in-person one week, online the next. The experience is the same — all sessions are live-streamed and recorded. Life happens, we adapt! 🔄",
    sq: "Po! Formati hibrid është plotësisht fleksibël. Vino fizikisht një javë, online javën tjetër. Përvoja është e njëjtë — seancat transmetohen live dhe regjistrohen. Jeta ndodh, ne përshtasemi! 🔄",
  },
  {
    pattern: /change.*time|change.*slot|ndrysho.*orar|ndrysho.*slot|switch.*time|different.*slot/i,
    en: "We understand schedules change! Contact us and we'll move you to a different time slot if there's space. Our 4 daily slots (08-10, 10-12, 12-14, 14-16) give you options. 📅",
    sq: "Kuptojmë që oraret ndryshojnë! Na kontakto dhe do të përpiqemi të të zhvendosim në slot tjetër nëse ka vend. 4 slotet (08-10, 10-12, 12-14, 14-16) të japin opsione. 📅",
  },

  // ── Albanian Teaching Language ─────────────────────────────────────────────
  {
    pattern: /teach.*albanian|teach.*english|m[ëe]so.*shqip|m[ëe]so.*anglisht|gjuh[ëe].*klase/i,
    en: "Classes are in Albanian with English technical terms. This is intentional — learn concepts in your language while building the English tech vocabulary employers expect. Materials are bilingual! 🌐",
    sq: "Mësimet janë në shqip me terma teknike anglisht. Kjo është e qëllimshme — mëso konceptet në gjuhën tënde duke ndërtuar fjalorin teknik anglisht. Materialet janë dygjuhëshe! 🌐",
  },

  // ── Affordability & Financial ─────────────────────────────────────────────
  {
    pattern: /afford|nuk.*mund.*paguaj|can.*afford|shtrenj|expensive|too.*much|shume.*par/i,
    en: "We designed Lika Academy to be accessible! At 99€ per course (launch price, 2 months), we're the most affordable option in Kamëz, Tirana. Compare: other academies charge 500-2,000€+. Plus, bundle 2+ courses for 10-15% off, or use our referral program for extra savings!",
    sq: "E dizajnuam Lika Academy të jetë e aksesueshme! Me 99€ për kurs (çmim lansimi, 2 muaj), jemi opsioni më i përballueshëm në Kamëz, Tiranë. Krahaso: akademitë e tjera kërkojnë 500-2,000€+. Plus, merr 2+ kurse për 10-15% zbritje, ose përdor programin e referimit!",
  },

  // ── Outcomes & Metrics ────────────────────────────────────────────────────
  {
    pattern: /how many.*student|sa.*student.*trajn|success.*rate|percent|përqind|results|rezultat/i,
    en: "We're launching our first cohort in May 2026 — so we're building our track record right now! What we can guarantee: published, transparent standards, 4 portfolio projects, career preparation support, and the most transparent curriculum in Albania. Be part of the first cohort! 🚀",
    sq: "Po lansojmë kohortin e parë në Maj 2026 — kështu që po ndërtojmë historikun tani! Çfarë garantojmë: standarde të publikuara e transparente, 4 projekte portfolio, mbështetje karriere dhe kurrikulën më transparente në Shqipëri. Bëhu pjesë e kohortit të parë! 🚀",
  },
  {
    pattern: /compan.*hire|kompani.*pun[ëe]s|partner.*compan|who.*hire|kush.*pun[ëe]son/i,
    en: "We're building partnerships with Albanian and international tech companies. Our graduates will be connected to these employers. As a new academy, we're focused on producing developers so good that companies come to us! Check our Stories page for career paths.",
    sq: "Po ndërtojmë partneritete me kompani teknologjike shqiptare dhe ndërkombëtare. Të diplomuarit do të lidhen me këta punëdhënës. Si akademi e re, jemi fokusuar në prodhimin e developer-ëve aq të mirë sa kompanitë vijnë tek ne! Shiko faqen Histori Suksesi.",
  },

  // ── Transfer & Waitlist ───────────────────────────────────────────────────
  {
    pattern: /transfer|delay|vonesa|shty|postpone|wait.*list|list.*prit|next.*cohort|kohort.*tjet/i,
    en: "If you can't make your enrolled cohort, you can transfer to the next one for free (subject to availability). No waitlist currently — just enroll for the cohort that suits you. Contact us if you need to change dates!",
    sq: "Nëse nuk mund ta ndjekësh kohortin ku je regjistruar, mund të transferohesh te i ardhshmi falas (sipas disponibilitetit). Pa listë pritjeje — thjesht regjistrohu për kohortin që të përshtatet. Na kontakto nëse duhet të ndryshosh datat!",
  },

  // ── Study Materials ───────────────────────────────────────────────────────
  {
    pattern: /material|download.*video|shkarko.*video|textbook|libr|resurs.*kurs|course.*mater/i,
    en: "Course materials include:\n• Recorded sessions (available 24/7, even after course ends)\n• Code examples & exercises\n• Slide decks & reference guides\n• Community chat access (lifetime)\nAll materials are bilingual (Albanian + English). No textbooks needed!",
    sq: "Materialet e kursit përfshijnë:\n• Seancat e regjistruara (24/7, edhe pas kursit)\n• Shembuj kodi & ushtrime\n• Slide dhe guida referimi\n• Akses në chat komunitetit (përjetë)\nMaterialet janë dygjuhëshe (shqip + anglisht). Pa libra!",
  },

  // ── Certification Body ────────────────────────────────────────────────────
  {
    pattern: /who.*issue|kush.*leshon|certif.*body|organ.*certif|valid.*cert|linkedin.*cert/i,
    en: "Certificates are issued by Lika Academy. You can:\n• Add it to your LinkedIn profile\n• Include it in your CV\n• Share it with employers\nBut remember — your 4 portfolio projects + GitHub are what truly prove your skills!",
    sq: "Certifikatat lëshohen nga Lika Academy. Mund:\n• Ta shtosh në profilin LinkedIn\n• Ta përfshish në CV\n• Ta ndash me punëdhënës\nPor mbaj mend — 4 projektet portfolio + GitHub janë ato që vërtet provojnë aftësitë!",
  },

  // ── Weekend Support Clarification ─────────────────────────────────────────
  {
    pattern: /weekend.*support|mb[ëe]sht.*fundjavë|support.*saturday|support.*sunday/i,
    en: "Yes! Since courses run on weekends, our instructors are available Saturday & Sunday during class hours (08-16). During the week, you can ask questions in the community chat and get responses within 24 hours.",
    sq: "Po! Meqë kurset zhvillohen fundjavë, instruktorët janë të disponueshëm të Shtunë & Dielë gjatë orareve (08-16). Gjatë javës, mund të bësh pyetje në chat-in e komunitetit dhe merr përgjigje brenda 24 orëve.",
  },

  // ── OS Specific ───────────────────────────────────────────────────────────
  {
    pattern: /windows|mac|linux|operating.*system|sistem.*operativ|apple|macbook/i,
    en: "All operating systems work! Windows, macOS, and Linux are fully supported. We use cross-platform tools (VS Code, Git, browsers) so it doesn't matter which OS you have. 💻",
    sq: "Të gjitha sistemet operative funksionojnë! Windows, macOS dhe Linux mbështeten plotësisht. Përdorim mjete cross-platform (VS Code, Git, browser) kështu që nuk ka rëndësi cili OS ke. 💻",
  },

  // ── Internet Requirements ─────────────────────────────────────────────────
  {
    pattern: /internet|wifi|bandwidth|shpejt[ëe]si|speed|connection|lidhje/i,
    en: "You need a stable internet connection for online sessions. A basic home connection (5+ Mbps) is enough. If you attend in-person, we provide WiFi. Mobile data hotspot works in a pinch but isn't ideal for long sessions.",
    sq: "Duhet lidhje interneti e qëndrueshme për seanca online. Lidhja bazë shtëpiake (5+ Mbps) mjafton. Nëse vjen fizikisht, ne ofrojmë WiFi. Hotspot i të dhënave celulare funksionon por nuk është ideal për seanca të gjata.",
  },

  // ── What Happens Post-Course ──────────────────────────────────────────────
  {
    pattern: /alumni.*benefit|access.*after|akses.*pas|përfit.*alumni|lifetime/i,
    en: "After your course, you keep:\n• Lifetime access to recorded sessions\n• Community chat membership forever\n• Course materials & code examples\n• Alumni networking events\n• 10% discount on future courses\nOnce you're Lika, you're always Lika! 🎓",
    sq: "Pas kursit, mban:\n• Akses përjetë në seancat e regjistruara\n• Anëtarësi në chat komunitetit përgjithmonë\n• Materialet dhe shembujt e kodit\n• Evente networking alumni\n• 10% zbritje në kurse të ardhshme\nNjë herë Lika, gjithmonë Lika! 🎓",
  },

  // ── Specific Course Questions ─────────────────────────────────────────────
  {
    pattern: /web.*design|html.*css|faq.*web/i,
    en: "Web design (HTML & CSS) is where our beginner-friendly Web Development course starts — teaching you to build real websites from scratch, then growing into JavaScript, React, Node.js and MongoDB. It's the perfect starting point! 🌐",
    sq: "Web design (HTML & CSS) është ku fillon kursi ynë Web Development, i përshtatshëm për fillestarë — duke mësuar të ndërtosh faqe reale nga zero dhe më pas duke kaluar te JavaScript, React, Node.js dhe MongoDB. Është pika perfekte e fillimit! 🌐",
  },
  {
    pattern: /data.*science|machine.*learn|ml|deep.*learn|t[ëe].*dh[ëe]na/i,
    en: "Our Python Full-Stack course includes AI integration modules where you learn to work with AI APIs and build data-driven features. For deep machine learning/data science, we recommend starting with Python and then exploring advanced courses (coming in 6-month program)!",
    sq: "Kursi Python Full-Stack përfshin module integrimi AI ku mëson të punosh me AI API dhe të ndërtosh funksionalitete data-driven. Për ML/data science të thellë, rekomandojmë të fillosh me Python dhe pastaj kurse të avancuara (po vijnë në programin 6-mujor)!",
  },

  // ── Group/Pair Programming ────────────────────────────────────────────────
  {
    pattern: /group.*project|work.*together|pun[ëe].*bashk|team|ekip|pair.*program/i,
    en: "Yes! We incorporate collaborative learning:\n• Pair programming exercises\n• Group problem-solving sessions\n• Code reviews from peers and instructors\n• Final project can be individual or in small teams\nReal workplaces use teamwork — we prepare you for that!",
    sq: "Po! Përfshijmë mësim bashkëpunues:\n• Ushtrime pair programming\n• Seanca zgjidhje problemesh në grup\n• Code review nga kolegë dhe instruktorë\n• Projekti final mund të jetë individual ose në ekipe\nVendet reale të punës përdorin punë ekipore — ne të përgasim!",
  },

  // ── Freelancing & Upwork ──────────────────────────────────────────────────
  {
    pattern: /upwork|fiverr|freelanc|pun[ëe].*vetë|self.*employ|vet[ëe]pun[ëe]s/i,
    en: "Many of our graduates go the freelance route! After 2 months you'll have:\n• 4 portfolio projects to show clients\n• Git/GitHub for professional workflow\n• Deployment skills (live websites)\nPlatforms like Upwork, Fiverr & Toptal are great starting points. Albanian developers earn $20-80/hr freelancing! 💸",
    sq: "Shumë të diplomuar ndjekin rrugën freelance! Pas 2 muajve do kesh:\n• 4 projekte portfolio për klientë\n• Git/GitHub për workflow profesional\n• Aftësi deployment (faqe live)\nPlatforma si Upwork, Fiverr & Toptal janë pikënisje të shkëlqyera. Developer-ët shqiptarë fitojnë $20-80/orë freelancing! 💸",
  },

  // ── Startup & Business Ideas ──────────────────────────────────────────────
  {
    pattern: /startup|biznes|business|ide|app.*ime|my.*app|ndërto.*app|build.*app/i,
    en: "Want to build your own app or startup? Our courses teach you exactly that! After a Full-Stack course (Python or MERN), you'll be able to build MVPs, launch products, and iterate. Many founders started by learning to code themselves. Your idea + our skills = 🚀",
    sq: "Dëshiron të ndërtosh app-in ose startup-in tënd? Kurset tona të mësojnë pikërisht këtë! Pas kursit Full-Stack (Python ose MERN), do mundesh të ndërtosh MVP, lansosh produkte dhe iterosh. Shumë themelues filluan duke mësuar vetë kodim. Ideja jote + aftësitë tona = 🚀",
  },

  // ── Multiple Courses / Learning Path ──────────────────────────────────────
  {
    pattern: /two.*course|dy.*kurs|multiple.*course|shumë.*kurs|second.*course|kurs.*dyt|path|rrugë.*mësim/i,
    en: "Great idea! Here's a recommended learning path:\n1️⃣ Start with Python or JavaScript (your first language)\n2️⃣ Take the other one next (become bilingual!)\n3️⃣ Add Golang or .NET for specialization\nBundle discount: 10% off for 2 courses, 15% for 3+! Use our Pricing Calculator to plan. 📚",
    sq: "Ide e shkëlqyer! Ja rruga e rekomanduar:\n1️⃣ Fillo me Python ose JavaScript (gjuha e parë)\n2️⃣ Merr tjetrën pastaj (bëhu dygjuhësh!)\n3️⃣ Shto Golang ose .NET për specializim\nZbritje bundle: 10% për 2 kurse, 15% për 3+! Përdor Llogaritësin e Çmimeve. 📚",
  },

  // ── Women in Tech ─────────────────────────────────────────────────────────
  {
    pattern: /woman|women|girl|gra|vajza|fem[ëe]r|female|diversity|diversitet/i,
    en: "We strongly encourage women in tech! 💜 The tech industry needs more diversity, and Albania has an incredible pool of talented women. Our inclusive environment, small classes, and supportive community make Lika Academy a great place for everyone regardless of gender.",
    sq: "Inkurajojmë fuqimisht gratë në teknologji! 💜 Industria e teknologjisë ka nevojë për më shumë diversitet, dhe Shqipëria ka një burim të jashtëzakonshëm grash me talent. Mjedisi ynë gjithëpërfshirës, klasat e vogla dhe komuniteti mbështetës e bëjnë Lika Academy vend të shkëlqyer për të gjithë.",
  },

  // ── Disability / Accessibility ────────────────────────────────────────────
  {
    pattern: /disabil|aftësi.*kufizu|handicap|akses|accessible|special.*need|nevoj.*veçant/i,
    en: "We strive to be accessible to everyone! Our hybrid format means you can attend fully online from home. If you have specific accessibility needs, please contact us — we'll do our best to accommodate you. Coding is for everyone! ♿",
    sq: "Përpiqemi të jemi të aksesueshëm për të gjithë! Formati hibrid do të thotë që mund të ndjekësh plotësisht online nga shtëpia. Nëse ke nevoja specifike aksesibiliteti, na kontakto — do bëjmë më të mirën për t'u përshtatur. Kodimi është për të gjithë! ♿",
  },

  // ── Fun Facts / Easter Egg ────────────────────────────────────────────────
  {
    pattern: /fun.*fact|fakt|curiosity|kuriozitet|interesting|interesant|tell.*something|m[ëe].*trego/i,
    en: "Fun fact! 🧠 Did you know:\n• The first programmer was a woman — Ada Lovelace, in 1843!\n• JavaScript was created in just 10 days\n• Python is named after Monty Python, not the snake 🐍\n• Albania's IT sector grows 12.7% per year — faster than most EU countries!\nWant to be part of this growth? 😊",
    sq: "Fakt interesant! 🧠 A e dije:\n• Programistja e parë ishte grua — Ada Lovelace, në 1843!\n• JavaScript u krijua në vetëm 10 ditë\n• Python quhet sipas Monty Python, jo gjarprit 🐍\n• Sektori IT i Shqipërisë rritet 12.7% në vit — më shpejt se shumica e vendeve të BE!\nDëshiron të jesh pjesë e kësaj rritjeje? 😊",
  },

  // ── Zana Identity / Humor ─────────────────────────────────────────────────
  {
    pattern: /zana.*emri|zana.*name|zana.*mean|ça.*do.*thotë.*zana|what.*zana|pse.*zana/i,
    en: "My name Zana comes from Albanian mythology! 🧙‍♀️ Zanat are powerful female mountain spirits who protect and guide people. Just like them, I'm here to protect you from confusion and guide you on your coding journey. Pretty cool, right? ✨",
    sq: "Emri im Zana vjen nga mitologjia shqiptare! 🧙‍♀️ Zanat janë shpirtra të fuqishme femërore të maleve që mbrojnë dhe udhëheqin njerëzit. Njësoj si ato, jam këtu për të të mbrojtur nga konfuzioni dhe të të udhëheq në rrugën e kodimit. Bukur, apo jo? ✨",
  },
];

export const DEFAULT_RESPONSE = {
  en: "I'm not sure about that, but I'd love to help! Try asking about our courses, pricing, format, or schedule. Or visit our Contact page to speak with our team directly.",
  sq: "Nuk jam i sigurt për këtë, por do të doja të ndihmoja! Provo të pyesësh për kurset tona, çmimet, formatin ose orarin. Ose vizito faqen tonë të Kontaktit për të folur drejtpërdrejt me ekipin tonë.",
};

export const WELCOME = {
  en: "Hi! I'm Zana, your AI assistant at Lika Academy. Ask me about our courses, pricing, format, or anything else!",
  sq: "Përshëndetje! Jam Zana, asistentja juaj AI në Lika Academy. Më pyet për kurset tona, çmimet, formatin ose çdo gjë tjetër!",
};

export function getResponse(input: string, locale: string): string {
  const lang = locale === "sq" ? "sq" : "en";
  for (const qa of QA) {
    if (qa.pattern.test(input)) {
      return qa[lang];
    }
  }
  return DEFAULT_RESPONSE[lang];
}
