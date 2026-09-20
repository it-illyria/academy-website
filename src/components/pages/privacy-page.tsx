"use client";

import { useLocale } from "next-intl";

const content = {
  en: {
    title: "Privacy Policy",
    lastUpdated: "Last updated: April 2026",
    intro:
      "At Lika Academy, we are committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal data when you use our website and services.",

    sections: [
      {
        heading: "1. Data We Collect",
        body: [
          "When you fill out our enrollment, contact, or referral forms, we may collect the following personal information:",
          "• Full name",
          "• Email address",
          "• Phone number",
          "• Date of birth (for age-appropriate program placement)",
          "• Educational background and experience level",
          "We only collect data that is necessary to provide our services.",
        ],
      },
      {
        heading: "2. How We Use Your Data",
        body: [
          "We use your personal data for the following purposes:",
          "• Processing your enrollment application and confirming your registration",
          "• Communicating with you about your course, schedule, and updates",
          "• Sending relevant educational content or newsletters (only with your consent)",
          "• Improving our services based on aggregated, anonymized feedback",
          "We do not sell or rent your personal information to any third party.",
        ],
      },
      {
        heading: "3. Data Storage & Security",
        body: [
          "Your data is stored on secure servers. We implement appropriate technical and organizational measures to protect your information against unauthorized access, loss, or disclosure.",
          "We retain your data for as long as necessary to fulfill the purposes described in this policy, or as required by Albanian law.",
        ],
      },
      {
        heading: "4. Third-Party Services",
        body: [
          "We use the following third-party services that may process your data:",
          "• Analytics tools (e.g., Google Analytics) — to understand how visitors use our website. Data is anonymized and aggregated.",
          "• Form processing services — to receive and store your form submissions securely.",
          "These providers are contractually bound to process your data only on our behalf and in accordance with applicable data protection law.",
        ],
      },
      {
        heading: "5. Cookies",
        body: [
          "Our website uses cookies to enhance your browsing experience. Cookies are small text files stored on your device.",
          "• Essential cookies: Required for the website to function properly.",
          "• Analytics cookies: Help us understand usage patterns. You may opt out via your browser settings.",
          "You can disable cookies in your browser settings at any time, though this may affect certain features of the site.",
        ],
      },
      {
        heading: "6. Your Rights (GDPR)",
        body: [
          "If you are located in the European Union or Albania, you have the following rights under GDPR:",
          "• Right of access — You can request a copy of the personal data we hold about you.",
          "• Right to rectification — You can ask us to correct inaccurate or incomplete data.",
          "• Right to erasure — You can request that we delete your personal data ('right to be forgotten').",
          "• Right to restriction — You can ask us to limit how we use your data.",
          "• Right to portability — You can request your data in a structured, machine-readable format.",
          "• Right to object — You can object to processing based on legitimate interests.",
          "To exercise any of these rights, please contact us at the address below.",
        ],
      },
      {
        heading: "7. Contact Us",
        body: [
          "For any data protection requests or questions about this policy, please contact:",
          "Email: info@likaacademy.al",
          "Lika Academy — Kamëz, Tirana, Albania",
        ],
      },
    ],
  },

  sq: {
    title: "Politika e Privatësisë",
    lastUpdated: "Përditësuar: Prill 2026",
    intro:
      "Në Lika Academy, jemi të angazhuar për mbrojtjen e privatësisë suaj. Kjo politikë shpjegon si mbledhim, përdorim dhe mbrojmë të dhënat tuaja personale kur përdorni faqen tonë dhe shërbimet tona.",

    sections: [
      {
        heading: "1. Të Dhënat që Mbledhim",
        body: [
          "Kur plotësoni formularët tanë të regjistrimit, kontaktit ose referimit, mund të mbledhim informacionet e mëposhtme personale:",
          "• Emri i plotë",
          "• Adresa e email-it",
          "• Numri i telefonit",
          "• Data e lindjes (për vendosjen në programin e duhur sipas moshës)",
          "• Sfondi arsimor dhe niveli i përvojës",
          "Mbledhim vetëm të dhënat që janë të nevojshme për të ofruar shërbimet tona.",
        ],
      },
      {
        heading: "2. Si i Përdorim të Dhënat Tuaja",
        body: [
          "Të dhënat tuaja personale i përdorim për qëllimet e mëposhtme:",
          "• Përpunimi i aplikimit tuaj dhe konfirmimi i regjistrimit",
          "• Komunikimi me ju rreth kursit, orarit dhe përditësimeve",
          "• Dërgimi i përmbajtjes arsimore ose newsletter-it (vetëm me pëlqimin tuaj)",
          "• Përmirësimi i shërbimeve tona bazuar në reagime të anonimizuara",
          "Nuk shesim apo japim me qira informacionin tuaj personal tek asnjë palë e tretë.",
        ],
      },
      {
        heading: "3. Ruajtja dhe Siguria e të Dhënave",
        body: [
          "Të dhënat tuaja ruhen në serverë të sigurt. Zbatojmë masat e duhura teknike dhe organizative për të mbrojtur informacionin tuaj nga aksesi i paautorizuar, humbja ose zbulimi.",
          "Ruajmë të dhënat tuaja për aq kohë sa është e nevojshme për të përmbushur qëllimet e përshkruara në këtë politikë, ose siç kërkohet nga legjislacioni shqiptar.",
        ],
      },
      {
        heading: "4. Shërbimet e Palëve të Treta",
        body: [
          "Përdorim shërbimet e mëposhtme të palëve të treta që mund të përpunojnë të dhënat tuaja:",
          "• Mjete analitike (p.sh. Google Analytics) — për të kuptuar si vizitorët përdorin faqen tonë. Të dhënat janë të anonimizuara.",
          "• Shërbime të përpunimit të formularëve — për të marrë dhe ruajtur aplikacionet tuaja me siguri.",
          "Këta ofrues janë të detyruar me kontratë të përpunojnë të dhënat tuaja vetëm në emrin tonë dhe në përputhje me ligjet e aplikueshme.",
        ],
      },
      {
        heading: "5. Cookies",
        body: [
          "Faqja jonë përdor cookies për të përmirësuar përvojën tuaj të shfletimit. Cookies janë skedarë të vegjël teksti të ruajtur në pajisjen tuaj.",
          "• Cookies esenciale: Të nevojshme për funksionimin e duhur të faqes.",
          "• Cookies analitike: Na ndihmojnë të kuptojmë modelet e përdorimit. Mund të tërhiqeni nëpërmjet cilësimeve të shfletuesit.",
          "Mund të çaktivizoni cookies në cilësimet e shfletuesit tuaj në çdo kohë, megjithëse kjo mund të ndikojë në disa funksione të faqes.",
        ],
      },
      {
        heading: "6. Të Drejtat Tuaja (GDPR)",
        body: [
          "Nëse jeni vendosur në Bashkimin Europian ose Shqipëri, keni të drejtat e mëposhtme sipas GDPR:",
          "• E drejta e aksesit — Mund të kërkoni një kopje të të dhënave personale që mbajmë për ju.",
          "• E drejta e korrigjimit — Mund të na kërkoni të korrigjojmë të dhënat e pasakta.",
          "• E drejta e fshirjes — Mund të kërkoni fshirjen e të dhënave tuaja personale ('e drejta për t'u harruar').",
          "• E drejta e kufizimit — Mund të na kërkoni të kufizojmë mënyrën si përdorim të dhënat tuaja.",
          "• E drejta e portabilitetit — Mund të kërkoni të dhënat tuaja në format të strukturuar, të lexueshëm nga makinat.",
          "• E drejta për të kundërshtuar — Mund të kundërshtoni përpunimin bazuar në interesa legjitime.",
          "Për të ushtruar cilëndo nga këto të drejta, ju lutemi na kontaktoni në adresën e mëposhtme.",
        ],
      },
      {
        heading: "7. Na Kontaktoni",
        body: [
          "Për çdo kërkesë mbrojtjeje të të dhënave ose pyetje rreth kësaj politike, ju lutemi kontaktoni:",
          "Email: info@likaacademy.al",
          "Lika Academy — Kamëz, Tiranë, Shqipëri",
        ],
      },
    ],
  },
};

export function PrivacyPage() {
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
