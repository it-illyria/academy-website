"use client";

import { useLocale } from "next-intl";

const content = {
  en: {
    title: "Terms of Service",
    lastUpdated: "Last updated: April 2026",
    intro:
      "Please read these Terms of Service carefully before using Lika Academy's website or enrolling in any of our courses. By accessing our services, you agree to be bound by these terms.",

    sections: [
      {
        heading: "1. Acceptance of Terms",
        body: [
          "By visiting our website, submitting an enrollment application, or participating in any Lika Academy course or program, you confirm that you have read, understood, and agreed to these Terms of Service.",
          "If you do not agree with any part of these terms, please do not use our services.",
        ],
      },
      {
        heading: "2. Services Description",
        body: [
          "Lika Academy provides coding education services including but not limited to:",
          "• Short-form coding courses (2-month programs) for children, teenagers, and adults",
          "• Online, in-person, and hybrid (blended) learning formats",
          "• AI-integrated curriculum and project-based learning",
          "• Portfolio development and career preparation support",
          "We reserve the right to modify, suspend, or discontinue any service at any time with reasonable notice.",
        ],
      },
      {
        heading: "3. Enrollment & Payment",
        body: [
          "To enroll in a Lika Academy program, you must submit an application through our website and receive a confirmation from our team.",
          "• Course prices: 99€ (launch price) for Pro Tracks. Pricing for Web Development is coming soon.",
          "• Payment must be completed in full before the course start date.",
          "• We accept bank transfers and online payment methods.",
          "• Course duration is 2 months (6 weeks of lessons + 4 weeks of projects), with 2 sessions per week of 2 hours each (12 lesson sessions total).",
          "• Enrollment is confirmed only after payment is received.",
        ],
      },
      {
        heading: "4. Refund Policy",
        body: [
          "We want every student to feel confident enrolling with us. Our refund policy is as follows:",
          "• Full refund: You are entitled to a full refund if you withdraw within the first week (7 days) of the course start date.",
          "• No refund: After the first week, no refunds will be issued regardless of the reason for withdrawal.",
          "• Exceptional circumstances: Refund requests outside the above policy (e.g., medical emergencies) will be considered on a case-by-case basis at Lika Academy's discretion.",
          "To request a refund, contact us at info@likaacademy.al with your name, enrolled program, and reason for withdrawal.",
        ],
      },
      {
        heading: "5. Intellectual Property",
        body: [
          "All course materials, including videos, slides, code samples, written content, and branding, are the intellectual property of Lika Academy.",
          "• Students may use course materials for personal learning and portfolio development.",
          "• Reproducing, distributing, or selling course materials without written permission is strictly prohibited.",
          "• Student-created projects remain the property of the student.",
        ],
      },
      {
        heading: "6. Code of Conduct",
        body: [
          "All students are expected to maintain a respectful and professional learning environment. The following behavior will not be tolerated:",
          "• Harassment, discrimination, or disrespectful conduct toward instructors or fellow students",
          "• Academic dishonesty or plagiarism",
          "• Disruption of classes or course activities",
          "• Sharing or distributing course materials without authorization",
          "Violations may result in suspension or permanent removal from the program without refund.",
        ],
      },
      {
        heading: "7. Limitation of Liability",
        body: [
          "Lika Academy provides its services 'as is' and makes no guarantees regarding employment outcomes, salary expectations, or career placement after course completion.",
          "To the maximum extent permitted by law, Lika Academy shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services.",
          "Our total liability to any student shall not exceed the amount paid for the course in question.",
        ],
      },
      {
        heading: "8. Changes to Terms",
        body: [
          "We reserve the right to update these Terms of Service at any time. Changes will be published on this page with an updated date.",
          "Continued use of our services after changes are posted constitutes your acceptance of the updated terms. We encourage you to review this page periodically.",
        ],
      },
      {
        heading: "9. Governing Law",
        body: [
          "These Terms of Service are governed by and construed in accordance with the laws of the Republic of Albania.",
          "Any disputes arising from these terms or your use of our services shall be subject to the exclusive jurisdiction of the courts of Tirana, Albania.",
        ],
      },
      {
        heading: "10. Contact Us",
        body: [
          "If you have any questions about these terms, please contact:",
          "Email: info@likaacademy.al",
          "Lika Academy — Kamëz, Tirana, Albania",
        ],
      },
    ],
  },

  sq: {
    title: "Kushtet e Shërbimit",
    lastUpdated: "Përditësuar: Prill 2026",
    intro:
      "Ju lutemi lexoni me kujdes këto Kushte Shërbimi para se të përdorni faqen e Lika Academy ose të regjistroheni në ndonjërin nga kurset tona. Duke aksesuar shërbimet tona, pranoni të jeni të detyruar nga këto kushte.",

    sections: [
      {
        heading: "1. Pranimi i Kushteve",
        body: [
          "Duke vizituar faqen tonë, duke dërguar një aplikim regjistrimi ose duke marrë pjesë në çdo kurs ose program të Lika Academy, konfirmoni që keni lexuar, kuptuar dhe pranuar këto Kushte Shërbimi.",
          "Nëse nuk jeni dakord me ndonjë pjesë të këtyre kushteve, ju lutemi mos i përdorni shërbimet tona.",
        ],
      },
      {
        heading: "2. Përshkrimi i Shërbimeve",
        body: [
          "Lika Academy ofron shërbime edukimi në kodim duke përfshirë:",
          "• Kurse kodimi afatshkurtra (programe 2-mujore) për fëmijë, të rinj dhe të rritur",
          "• Formate mësimi online, fizik dhe hibrid",
          "• Kurrikul me AI të integruar dhe mësim bazuar në projekte",
          "• Mbështetje për zhvillimin e portfolios dhe përgatitjen e karrierës",
          "Ne rezervojmë të drejtën të modifikojmë, pezullojmë ose ndërpresim çdo shërbim në çdo kohë me njoftim të arsyeshëm.",
        ],
      },
      {
        heading: "3. Regjistrimi dhe Pagesa",
        body: [
          "Për t'u regjistruar në një program të Lika Academy, duhet të dërgoni një aplikim nëpërmjet faqes sonë dhe të merrni konfirmim nga ekipi ynë.",
          "• Çmimet e kurseve: 99€ (çmim lansimi) për Pro Tracks. Çmimi për Web Development do të njoftohet së shpejti.",
          "• Pagesa duhet të përfundojë plotësisht para datës së fillimit të kursit.",
          "• Pranojmë transfertë bankare dhe metoda pagese online.",
          "• Kohëzgjatja e kursit është 2 muaj (6 javë mësimi + 4 javë projekte), me 2 seanca në javë nga 2 orë secila (12 seanca mësimi gjithsej).",
          "• Regjistrimi konfirmohet vetëm pasi pagesa është marrë.",
        ],
      },
      {
        heading: "4. Politika e Rimbursimit",
        body: [
          "Dëshirojmë që çdo student të ndihet i sigurt duke u regjistruar me ne. Politika jonë e rimbursimit është si vijon:",
          "• Rimbursim i plotë: Keni të drejtë të rimbursimit të plotë nëse tërhiqeni brenda javës së parë (7 ditëve) nga data e fillimit të kursit.",
          "• Pa rimbursim: Pas javës së parë, nuk do të lëshohet asnjë rimbursim, pavarësisht nga arsyeja e tërheqjes.",
          "• Rrethana të jashtëzakonshme: Kërkesat e rimbursimit jashtë politikës së mësipërme (p.sh. emergjenca mjekësore) do të shqyrtohen rast pas rasti sipas gjykimit të Lika Academy.",
          "Për të kërkuar rimbursim, na kontaktoni në info@likaacademy.al me emrin tuaj, programin e regjistruar dhe arsyen e tërheqjes.",
        ],
      },
      {
        heading: "5. Prona Intelektuale",
        body: [
          "Të gjitha materialet e kursit, duke përfshirë video, slide, shembuj kodi, përmbajtje të shkruar dhe markën, janë pronë intelektuale e Lika Academy.",
          "• Studentët mund t'i përdorin materialet e kursit për mësim personal dhe zhvillim portfolioje.",
          "• Riprodhimi, shpërndarja ose shitja e materialeve të kursit pa leje me shkrim është rreptësisht e ndaluar.",
          "• Projektet e krijuara nga studentët mbeten pronë e studentit.",
        ],
      },
      {
        heading: "6. Kodi i Sjelljes",
        body: [
          "Të gjithë studentët pritet të ruajnë një mjedis mësimi respektues dhe profesional. Sjellja e mëposhtme nuk do të tolerohet:",
          "• Ngacmim, diskriminim ose sjellje jorespektuese ndaj instruktorëve ose studentëve të tjerë",
          "• Pasinqeritet akademik ose plagjiaturë",
          "• Ndërprerje e mësimeve ose aktiviteteve të kursit",
          "• Ndarja ose shpërndarja e materialeve të kursit pa autorizim",
          "Shkeljet mund të rezultojnë në pezullim ose largim të përhershëm nga programi pa rimbursim.",
        ],
      },
      {
        heading: "7. Kufizimi i Përgjegjësisë",
        body: [
          "Lika Academy ofron shërbimet e saj 'siç janë' dhe nuk jep garanci rreth rezultateve të punësimit, pritshmërive të pagave ose vendosjes në karrierë pas përfundimit të kursit.",
          "Deri në masën maksimale të lejuar nga ligji, Lika Academy nuk do të jetë përgjegjëse për ndonjë dëm indirekt, rastësor ose pasojë që lind nga përdorimi i shërbimeve tona.",
          "Përgjegjësia jonë totale ndaj çdo studenti nuk do të kalojë shumën e paguar për kursin në fjalë.",
        ],
      },
      {
        heading: "8. Ndryshimet në Kushte",
        body: [
          "Ne rezervojmë të drejtën të përditësojmë këto Kushte Shërbimi në çdo kohë. Ndryshimet do të publikohen në këtë faqe me një datë të përditësuar.",
          "Përdorimi i vazhdueshëm i shërbimeve tona pas publikimit të ndryshimeve përbën pranim tuajin të kushteve të përditësuara. Ju inkurajojmë të rishikoni periodikisht këtë faqe.",
        ],
      },
      {
        heading: "9. Ligji i Zbatueshëm",
        body: [
          "Këto Kushte Shërbimi rregullohen dhe interpretohen në përputhje me ligjet e Republikës së Shqipërisë.",
          "Çdo mosmarrëveshje që lind nga këto kushte ose përdorimi juaj i shërbimeve tona do t'i nënshtrohet juridiksionit ekskluziv të gjykatave të Tiranës, Shqipëri.",
        ],
      },
      {
        heading: "10. Na Kontaktoni",
        body: [
          "Nëse keni ndonjë pyetje rreth këtyre kushteve, ju lutemi kontaktoni:",
          "Email: info@likaacademy.al",
          "Lika Academy — Kamëz, Tiranë, Shqipëri",
        ],
      },
    ],
  },
};

export function TermsPage() {
  const locale = useLocale();
  const c = locale === "sq" ? content.sq : content.en;

  return (
    <main className="min-h-screen overflow-hidden bg-background">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 border-b border-border/50 pb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {c.title}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">{c.lastUpdated}</p>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            {c.intro}
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {c.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                {section.heading}
              </h2>
              <div className="space-y-2">
                {section.body.map((line, i) => (
                  <p
                    key={i}
                    className={
                      line.startsWith("•")
                        ? "text-sm text-muted-foreground pl-4"
                        : "text-sm text-muted-foreground leading-relaxed"
                    }
                  >
                    {line}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
