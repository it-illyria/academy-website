"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, RotateCcw, ChevronLeft, ChevronRight, CheckCircle2, Code2, Eye, Sparkles } from "lucide-react";

// ----- lesson data -----

const STEP_HTML = [
  // Step 1
  `<h1>Hello World!</h1>
<p>Welcome to Lika Academy</p>
<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
</ul>`,
  // Step 2 (same HTML)
  `<h1>Hello World!</h1>
<p>Welcome to Lika Academy</p>
<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
</ul>`,
  // Step 3 (same HTML)
  `<h1>Hello World!</h1>
<p>Welcome to Lika Academy</p>
<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
</ul>`,
];

const STEP_CSS = [
  // Step 1 — no CSS
  ``,
  // Step 2
  `body {
  background-color: #1a1a2e;
  color: #e0e0e0;
  font-family: Arial, sans-serif;
}

h1 {
  color: #ee3533;
}`,
  // Step 3
  `body {
  background-color: #1a1a2e;
  color: #e0e0e0;
  font-family: Arial, sans-serif;
  padding: 40px;
  max-width: 600px;
  margin: 0 auto;
}

h1 {
  color: #ee3533;
  font-size: 2.5em;
  border-bottom: 2px solid #22d3ee;
  padding-bottom: 10px;
}

p {
  font-size: 1.2em;
  line-height: 1.6;
}

li {
  padding: 8px 0;
  border-bottom: 1px solid #333;
}`,
];

// ----- helpers -----

function buildSrcdoc(html: string, css: string): string {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<style>${css}</style>
</head>
<body>${html}</body>
</html>`;
}

type EditorTab = "html" | "css" | "preview";

// ----- component -----

export function PlaygroundPage() {
  const t = useTranslations("playground");

  const PLAYGROUND_KEY = "lika-playground-step";

  const [step, setStep] = useState(0); // 0-indexed
  const [html, setHtml] = useState(STEP_HTML[0]);
  const [css, setCss] = useState(STEP_CSS[0]);
  const [activeTab, setActiveTab] = useState<EditorTab>("html");
  const [srcdoc, setSrcdoc] = useState("");
  const [completed, setCompleted] = useState(false);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Rebuild preview with debounce
  const schedulePreview = useCallback((h: string, c: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setSrcdoc(buildSrcdoc(h, c));
    }, 300);
  }, []);

  // Restore step on mount
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(PLAYGROUND_KEY);
      if (saved) {
        const s = parseInt(saved, 10);
        if (!isNaN(s) && s >= 0 && s < STEP_HTML.length) {
          goToStep(s);
        }
      }
    } catch {}
  }, []);

  // Init preview on mount
  useEffect(() => {
    setSrcdoc(buildSrcdoc(html, css));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleHtmlChange = (value: string) => {
    setHtml(value);
    schedulePreview(value, css);
  };

  const handleCssChange = (value: string) => {
    setCss(value);
    schedulePreview(html, value);
  };

  const handleReset = () => {
    const h = STEP_HTML[step];
    const c = STEP_CSS[step];
    setHtml(h);
    setCss(c);
    schedulePreview(h, c);
  };

  const goToStep = (nextStep: number) => {
    setStep(nextStep);
    try { sessionStorage.setItem(PLAYGROUND_KEY, String(nextStep)); } catch {}
    const h = STEP_HTML[nextStep];
    const c = STEP_CSS[nextStep];
    setHtml(h);
    setCss(c);
    setSrcdoc(buildSrcdoc(h, c));
    if (nextStep === STEP_HTML.length - 1) {
      // reaching last step doesn't auto-complete; "Next" from last does
    }
    setActiveTab("html");
  };

  const handleNext = () => {
    if (step < STEP_HTML.length - 1) {
      goToStep(step + 1);
    } else {
      setCompleted(true);
      try { sessionStorage.removeItem(PLAYGROUND_KEY); } catch {}
    }
  };

  const handlePrev = () => {
    if (completed) {
      setCompleted(false);
      return;
    }
    if (step > 0) goToStep(step - 1);
  };

  // Tab key inserts 2 spaces in textareas
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const spaces = "  ";
      const newValue =
        target.value.substring(0, start) + spaces + target.value.substring(end);
      // Use setter based on which textarea
      if (target.dataset.editor === "html") {
        setHtml(newValue);
        schedulePreview(newValue, css);
      } else {
        setCss(newValue);
        schedulePreview(html, newValue);
      }
      // Restore cursor position after React re-render
      requestAnimationFrame(() => {
        target.selectionStart = start + spaces.length;
        target.selectionEnd = start + spaces.length;
      });
    }
  };

  const lessonTitles = [t("lessons.l1_title"), t("lessons.l2_title"), t("lessons.l3_title")];
  const lessonDescs = [t("lessons.l1_desc"), t("lessons.l2_desc"), t("lessons.l3_desc")];

  const tabs: { id: EditorTab; label: string }[] = [
    { id: "html", label: t("html_tab") },
    { id: "css", label: t("css_tab") },
    { id: "preview", label: t("preview_tab") },
  ];

  return (
    <div className="relative overflow-hidden min-h-screen pt-16">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute top-20 -left-20 sm:-left-40 h-[180px] w-[180px] sm:h-[400px] sm:w-[400px] rounded-full bg-primary/8 blur-[150px]" />
      <div className="absolute bottom-20 -right-20 sm:-right-40 h-[180px] w-[180px] sm:h-[400px] sm:w-[400px] rounded-full bg-cyber/8 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-10 text-center">
          <Badge
            variant="outline"
            className="mb-4 border-cyber/30 bg-cyber/5 px-4 py-1.5 text-cyber"
          >
            <Sparkles className="mr-2 h-3 w-3" />
            {t("lesson_title")}
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            <span className="bg-gradient-to-r from-primary via-[oklch(0.7_0.15_320)] to-cyber bg-clip-text text-transparent">
              {t("title")}
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            {t("subtitle")}
          </p>
          <Link
            href="/programs"
            className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            {t("programs_cta")}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Step indicator */}
        <div className="mb-8 flex flex-col items-center gap-4">
          <div className="flex items-center gap-3">
            {STEP_HTML.map((_, i) => (
              <button
                key={i}
                onClick={() => goToStep(i)}
                className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold transition-all duration-200 ${
                  completed
                    ? "border-cyber/50 bg-cyber/20 text-cyber"
                    : i === step
                    ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                    : i < step
                    ? "border-primary/50 bg-primary/20 text-primary"
                    : "border-border/50 bg-card/50 text-muted-foreground"
                }`}
              >
                {i < step || completed ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
              </button>
            ))}
          </div>
          {!completed && (
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">
                {t("step")} {step + 1}/{STEP_HTML.length} — {lessonTitles[step]}
              </p>
              <p className="text-xs text-muted-foreground">{lessonDescs[step]}</p>
            </div>
          )}
          {completed && (
            <p className="text-sm font-semibold text-cyber">{t("complete")}</p>
          )}
        </div>

        {/* Main editor + preview area */}
        {!completed ? (
          <div className="flex flex-col gap-4 lg:flex-row lg:gap-6 lg:min-h-[520px]">

            {/* Editor panel */}
            <div className="flex flex-col rounded-xl border border-border/50 bg-[#0d1117] overflow-hidden lg:w-1/2">
              {/* Tab bar */}
              <div className="flex items-center border-b border-border/30 bg-[#161b22] px-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? "border-b-2 border-primary text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab.id === "html" || tab.id === "css" ? (
                      <Code2 className="h-3.5 w-3.5" />
                    ) : (
                      <Eye className="h-3.5 w-3.5" />
                    )}
                    {tab.label}
                  </button>
                ))}
                <div className="ml-auto">
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                    title={t("reset")}
                  >
                    <RotateCcw className="h-3 w-3" />
                    {t("reset")}
                  </button>
                </div>
              </div>

              {/* Editor content */}
              <div className="flex-1 relative min-h-[250px] sm:min-h-[300px] lg:min-h-[400px]">
                {activeTab === "html" && (
                  <textarea
                    data-editor="html"
                    aria-label="HTML Editor"
                    value={html}
                    onChange={(e) => handleHtmlChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    spellCheck={false}
                    className="absolute inset-0 w-full h-full resize-none bg-transparent p-4 font-mono text-sm text-[#e6edf3] placeholder:text-muted-foreground/40 outline-none leading-relaxed"
                    placeholder="<!-- Write your HTML here -->"
                  />
                )}
                {activeTab === "css" && (
                  <textarea
                    data-editor="css"
                    aria-label="CSS Editor"
                    value={css}
                    onChange={(e) => handleCssChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    spellCheck={false}
                    className="absolute inset-0 w-full h-full resize-none bg-transparent p-4 font-mono text-sm text-[#e6edf3] placeholder:text-muted-foreground/40 outline-none leading-relaxed"
                    placeholder="/* Write your CSS here */"
                  />
                )}
                {activeTab === "preview" && (
                  <iframe
                    srcDoc={srcdoc}
                    title="preview"
                    sandbox=""
                    className="absolute inset-0 w-full h-full rounded-b-xl bg-white"
                  />
                )}
              </div>
            </div>

            {/* Preview panel — always visible on desktop */}
            <div className="hidden flex-col rounded-xl border border-border/50 overflow-hidden lg:flex lg:w-1/2">
              <div className="flex items-center gap-2 border-b border-border/30 bg-[#161b22] px-4 py-3">
                <Eye className="h-4 w-4 text-cyber" />
                <span className="text-sm font-medium text-cyber">{t("preview_tab")}</span>
                <div className="ml-auto flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500/60" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
                  <div className="h-3 w-3 rounded-full bg-green-500/60" />
                </div>
              </div>
              <iframe
                srcDoc={srcdoc}
                title="live-preview"
                sandbox=""
                className="flex-1 w-full bg-white min-h-[250px] sm:min-h-[300px] lg:min-h-[400px]"
              />
            </div>
          </div>
        ) : (
          // Completed state
          <div className="flex flex-col items-center justify-center rounded-2xl border border-cyber/30 bg-cyber/5 px-8 py-20 text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-cyber/30 bg-cyber/10">
              <CheckCircle2 className="h-10 w-10 text-cyber" />
            </div>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              {t("complete")}
            </h2>
            <p className="mt-4 max-w-md text-lg text-muted-foreground">
              {t("enroll_cta")}
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href="/enroll">
                <Button size="lg" className="glow text-base px-8">
                  Regjistrohu / Enroll
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/programs">
                <Button size="lg" variant="outline" className="border-border/50">
                  {t("programs_cta")}
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-border/50"
                onClick={() => { setCompleted(false); goToStep(0); }}
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                {t("reset")}
              </Button>
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="mt-6 flex items-center justify-between">
          <Button
            variant="outline"
            className="border-border/50"
            onClick={handlePrev}
            disabled={step === 0 && !completed}
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            {t("prev_step")}
          </Button>

          <div className="text-center">
            {!completed && (
              <p className="text-xs text-muted-foreground">
                {t("try_it")}
              </p>
            )}
          </div>

          {!completed && (
            <Button
              className="glow"
              onClick={handleNext}
            >
              {step < STEP_HTML.length - 1 ? t("next_step") : t("next_step")}
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          )}
          {completed && <div />}
        </div>
      </div>
    </div>
  );
}
