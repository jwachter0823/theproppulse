// ═══════════════════════════════════════════════════════════════════════════
// PropPulse — clean-slate rebuild
// Design: "Prime Terminal" — black & phosphor-green monospace terminal
// aesthetic meets modern typography. Single-page scroll. Command-palette
// navigation. Everything drawn fresh.
// ═══════════════════════════════════════════════════════════════════════════

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";
import {
  LOGOS, FIRMS, DEALS, BLOG, VIDEOS, CHALLENGES, FUNDED_OVERRIDES,
  PULSE_SCORES, AFFILIATE_LINKS, FIRM_PROFILES, FIRM_FAQ,
  QUIZ_QUESTIONS, DD_SCENARIOS, FIRM_DD_CONFIG,
  SCORECARD_DATA, LOYALTY_TIERS
} from "./data";

// ─── SUPABASE (unchanged from old site) ────────────────────────────────────
const supabase = createClient(
  "https://lwwtosuwfdliahoyqakx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3d3Rvc3V3ZmRsaWFob3lxYWt4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3NDM0NDYsImV4cCI6MjA5MTMxOTQ0Nn0.RCcNmkTsgjInRlL3PwK2AP5bUUTx5G3f2XqYu0OrquU"
);

// ─── AFFILIATE TRACKING (ported) ───────────────────────────────────────────
const trackClick = async (firmName) => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      await supabase.from("click_tracking").insert({ user_id: session.user.id, firm: firmName });
    }
  } catch {}
  const url = AFFILIATE_LINKS[firmName];
  if (url) window.open(url, "_blank");
};

const copyToClipboard = (text) => {
  if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.cssText = "position:fixed;left:-9999px";
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand("copy"); } catch(e) {}
  document.body.removeChild(ta);
  return Promise.resolve();
};

// ═══════════════════════════════════════════════════════════════════════════
// GLOBAL STYLES — "Prime Terminal"
// ═══════════════════════════════════════════════════════════════════════════
const css = `
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700;800;900&family=Newsreader:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap');

:root {
  --bg: #060606;
  --bg1: #0d0d0e;
  --bg2: #151517;
  --bg3: #1e1e21;
  --line: rgba(255,255,255,0.06);
  --line2: rgba(255,255,255,0.12);
  --line3: rgba(255,255,255,0.2);
  --txt: #f0ede4;
  --txt2: #c4beaf;
  --txt3: #8e887b;
  --txt4: #5c5850;
  --txt5: #3d3a34;
  --prime: #a8ff60;
  --primeA: rgba(168,255,96,0.08);
  --primeA2: rgba(168,255,96,0.18);
  --primeDim: #7fc848;
  --warn: #ffb84d;
  --danger: #ff6b6b;
  --info: #7fb8ff;
  --mono: 'JetBrains Mono', ui-monospace, monospace;
  --sans: 'Inter', system-ui, sans-serif;
  --serif: 'Newsreader', Georgia, serif;
}

* { margin: 0; padding: 0; box-sizing: border-box; }
html, body, #root {
  background: var(--bg);
  color: var(--txt);
  font-family: var(--sans);
  font-size: 14px;
  line-height: 1.55;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

/* CRT scanline & noise overlay */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background:
    repeating-linear-gradient(0deg, transparent 0, transparent 2px, rgba(168,255,96,0.015) 2px, rgba(168,255,96,0.015) 3px);
  pointer-events: none;
  z-index: 100;
  mix-blend-mode: overlay;
}
body::after {
  content: '';
  position: fixed;
  inset: 0;
  background-image:
    radial-gradient(circle at 25% 30%, rgba(168,255,96,0.05) 0%, transparent 45%),
    radial-gradient(circle at 75% 70%, rgba(127,184,255,0.03) 0%, transparent 40%);
  pointer-events: none;
  z-index: 0;
}

::-webkit-scrollbar { width: 8px; height: 8px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(168,255,96,0.15); border-radius: 0; }
::-webkit-scrollbar-thumb:hover { background: rgba(168,255,96,0.3); }
::selection { background: var(--prime); color: var(--bg); }

a, button { font-family: inherit; }
button { cursor: pointer; border: none; background: none; color: inherit; }

/* ═══ TOP BAR ═══ */
.tbar {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(6,6,6,0.85);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--line);
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 24px;
  padding: 14px 32px;
  font-family: var(--mono);
  font-size: 12px;
}
.tbar-left {
  display: flex;
  align-items: center;
  gap: 14px;
}
.tbar-logo {
  font-family: var(--mono);
  font-weight: 700;
  font-size: 13px;
  color: var(--txt);
  letter-spacing: 0.5px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.tbar-logo-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--prime);
  box-shadow: 0 0 10px var(--prime);
  animation: pulse 2s ease-in-out infinite;
}
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
.tbar-logo em {
  font-style: normal;
  color: var(--prime);
}
.tbar-ver {
  color: var(--txt4);
  font-size: 10px;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 3px 8px;
  border: 1px solid var(--line2);
}
.tbar-status {
  display: flex;
  align-items: center;
  gap: 20px;
  justify-self: center;
  color: var(--txt3);
  font-size: 11px;
}
.tbar-status b { color: var(--prime); font-weight: 600; }
.tbar-right {
  display: flex;
  align-items: center;
  gap: 8px;
}
.tbar-btn {
  font-family: var(--mono);
  font-size: 11px;
  font-weight: 500;
  color: var(--txt2);
  padding: 6px 14px;
  border: 1px solid var(--line2);
  transition: all 0.15s;
  letter-spacing: 0.5px;
}
.tbar-btn:hover { border-color: var(--prime); color: var(--prime); }
.tbar-btn.primary {
  background: var(--prime);
  color: var(--bg);
  border-color: var(--prime);
  font-weight: 700;
}
.tbar-btn.primary:hover { background: #b8ff70; }
.tbar-cmd {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border: 1px solid var(--line2);
  color: var(--txt3);
  font-size: 11px;
  transition: all 0.15s;
}
.tbar-cmd:hover { border-color: var(--prime); color: var(--prime); }
.tbar-cmd kbd {
  font-family: var(--mono);
  font-size: 10px;
  padding: 2px 5px;
  background: var(--bg2);
  border: 1px solid var(--line);
  border-radius: 2px;
  color: var(--txt3);
}
.tbar-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid var(--line2);
  background: var(--bg2);
  background-size: cover;
  background-position: center;
  cursor: pointer;
}

/* ═══ LAYOUT ═══ */
.app {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 32px;
  position: relative;
  z-index: 1;
}

.crosshair {
  position: fixed;
  pointer-events: none;
  z-index: 200;
  font-family: var(--mono);
  font-size: 10px;
  color: var(--prime);
  opacity: 0.35;
  letter-spacing: 1px;
}
.crosshair.tl { top: 76px; left: 32px; }
.crosshair.tr { top: 76px; right: 32px; }
.crosshair.bl { bottom: 16px; left: 32px; }
.crosshair.br { bottom: 16px; right: 32px; }

/* ═══ HERO ═══ */
.hero {
  padding: 80px 0 100px;
  position: relative;
}
.hero-meta {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 48px;
  font-family: var(--mono);
  font-size: 11px;
  color: var(--txt3);
  letter-spacing: 1px;
  text-transform: uppercase;
}
.hero-meta-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--prime);
  animation: pulse 2s ease-in-out infinite;
  box-shadow: 0 0 8px var(--prime);
}
.hero-meta-sep { color: var(--txt5); }

.hero-h1 {
  font-family: var(--serif);
  font-size: clamp(56px, 9vw, 136px);
  line-height: 0.92;
  letter-spacing: -3px;
  font-weight: 400;
  color: var(--txt);
  margin-bottom: 32px;
  max-width: 14ch;
}
.hero-h1 em {
  font-style: italic;
  color: var(--prime);
  font-weight: 400;
  position: relative;
}
.hero-h1 em::after {
  content: '_';
  animation: blink 1.1s step-end infinite;
  color: var(--prime);
}
@keyframes blink { 50% { opacity: 0; } }

.hero-lead {
  font-family: var(--serif);
  font-size: 22px;
  font-style: italic;
  color: var(--txt2);
  max-width: 640px;
  line-height: 1.45;
  margin-bottom: 56px;
}

.hero-cta-row {
  display: flex;
  gap: 14px;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 64px;
}
.hero-cta {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: var(--mono);
  font-size: 13px;
  font-weight: 600;
  padding: 16px 28px;
  letter-spacing: 0.5px;
  transition: all 0.18s;
  text-transform: uppercase;
}
.hero-cta.primary {
  background: var(--prime);
  color: var(--bg);
  border: 1px solid var(--prime);
}
.hero-cta.primary:hover {
  background: transparent;
  color: var(--prime);
  box-shadow: 0 0 24px rgba(168,255,96,0.35);
}
.hero-cta.ghost {
  background: transparent;
  color: var(--txt);
  border: 1px solid var(--line2);
}
.hero-cta.ghost:hover {
  border-color: var(--prime);
  color: var(--prime);
}
.hero-cta-arrow {
  transition: transform 0.2s;
}
.hero-cta:hover .hero-cta-arrow { transform: translateX(4px); }

/* Live ticker stats strip below hero */
.tstrip {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  padding: 24px 0;
}
.tstrip-item {
  padding: 0 24px;
  border-right: 1px solid var(--line);
  font-family: var(--mono);
}
.tstrip-item:last-child { border-right: none; }
.tstrip-k {
  font-size: 10px;
  color: var(--txt4);
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin-bottom: 8px;
}
.tstrip-v {
  font-family: var(--serif);
  font-size: 42px;
  font-weight: 400;
  color: var(--txt);
  letter-spacing: -1px;
  line-height: 1;
}
.tstrip-v small {
  font-family: var(--mono);
  font-size: 12px;
  color: var(--prime);
  font-weight: 600;
  margin-left: 6px;
  letter-spacing: 0;
}

/* ═══ SECTION ═══ */
.sec {
  padding: 120px 0 60px;
  position: relative;
}
.sec-hd {
  display: grid;
  grid-template-columns: 80px 1fr auto;
  gap: 32px;
  align-items: baseline;
  padding-bottom: 24px;
  border-bottom: 2px solid var(--txt);
  margin-bottom: 48px;
}
.sec-ix {
  font-family: var(--mono);
  font-size: 13px;
  font-weight: 600;
  color: var(--prime);
  letter-spacing: 2px;
}
.sec-t {
  font-family: var(--serif);
  font-size: clamp(36px, 5vw, 72px);
  font-weight: 400;
  letter-spacing: -1.5px;
  line-height: 0.95;
  color: var(--txt);
}
.sec-t em { font-style: italic; color: var(--prime); font-weight: 400; }
.sec-sub {
  font-family: var(--mono);
  font-size: 11px;
  color: var(--txt3);
  letter-spacing: 1px;
  text-transform: uppercase;
  text-align: right;
}

/* ═══ FIRM TERMINAL TABLE ═══ */
.term {
  border: 1px solid var(--line2);
  background: var(--bg1);
  font-family: var(--mono);
}
.term-ctrl {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  border-bottom: 1px solid var(--line);
  flex-wrap: wrap;
  gap: 16px;
}
.term-filters {
  display: flex;
  gap: 0;
  border: 1px solid var(--line2);
}
.term-filters button {
  padding: 8px 16px;
  font-family: var(--mono);
  font-size: 11px;
  font-weight: 500;
  color: var(--txt3);
  border-right: 1px solid var(--line2);
  background: transparent;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  transition: all 0.15s;
}
.term-filters button:last-child { border-right: none; }
.term-filters button:hover { background: var(--bg2); color: var(--txt); }
.term-filters button.on { background: var(--prime); color: var(--bg); font-weight: 700; }
.term-sort {
  display: flex;
  gap: 14px;
  align-items: center;
  font-size: 11px;
  color: var(--txt3);
}
.term-sort-lbl {
  color: var(--txt4);
  letter-spacing: 1.2px;
  text-transform: uppercase;
}
.term-sort button {
  font-family: var(--mono);
  color: var(--txt3);
  font-size: 11px;
  padding: 4px 0;
  border-bottom: 1px solid transparent;
  transition: all 0.15s;
  letter-spacing: 0.3px;
}
.term-sort button:hover { color: var(--txt); }
.term-sort button.on { color: var(--prime); border-bottom-color: var(--prime); }

.term-colhdr {
  display: grid;
  grid-template-columns: 60px 2fr 100px 120px 100px 120px 90px 40px;
  gap: 16px;
  padding: 12px 20px;
  border-bottom: 1px solid var(--line);
  font-size: 10px;
  font-weight: 600;
  color: var(--txt4);
  letter-spacing: 1.5px;
  text-transform: uppercase;
}
.term-row {
  display: grid;
  grid-template-columns: 60px 2fr 100px 120px 100px 120px 90px 40px;
  gap: 16px;
  padding: 22px 20px;
  border-bottom: 1px solid var(--line);
  align-items: center;
  cursor: pointer;
  transition: background 0.15s;
  width: 100%;
  text-align: left;
}
.term-row:hover { background: var(--bg2); }
.term-row.open { background: var(--bg2); border-bottom-color: var(--prime); }
.term-rank {
  font-family: var(--mono);
  font-size: 12px;
  color: var(--txt4);
  letter-spacing: 1px;
}
.term-rank::before { content: '#'; opacity: 0.4; }
.term-firm {
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
}
.term-firm-lg {
  width: 40px;
  height: 40px;
  border: 1px solid var(--line2);
  overflow: hidden;
  flex-shrink: 0;
  background: var(--bg2);
  display: flex;
  align-items: center;
  justify-content: center;
}
.term-firm-lg img { width: 100%; height: 100%; object-fit: contain; padding: 4px; }
.term-firm-lg-fb {
  font-family: var(--mono);
  font-size: 12px;
  font-weight: 700;
  color: var(--txt3);
}
.term-firm-nm {
  font-family: var(--serif);
  font-size: 22px;
  font-weight: 500;
  color: var(--txt);
  letter-spacing: -0.4px;
  line-height: 1.1;
  margin-bottom: 3px;
}
.term-firm-meta {
  font-family: var(--mono);
  font-size: 10px;
  color: var(--txt4);
  letter-spacing: 0.5px;
}
.term-pulse {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.term-pulse-v {
  font-family: var(--serif);
  font-size: 26px;
  font-weight: 500;
  line-height: 1;
  letter-spacing: -0.5px;
  color: var(--prime);
}
.term-pulse-bar {
  height: 2px;
  background: var(--bg3);
  overflow: hidden;
  max-width: 80px;
}
.term-pulse-bar span {
  display: block;
  height: 100%;
  background: var(--prime);
  box-shadow: 0 0 6px rgba(168,255,96,0.5);
}
.term-rating {
  font-family: var(--mono);
  font-size: 12px;
  color: var(--txt2);
}
.term-rating em {
  display: block;
  font-style: normal;
  font-size: 10px;
  color: var(--txt4);
  margin-top: 2px;
}
.term-alloc { font-family: var(--mono); font-size: 12px; color: var(--txt2); }
.term-tag {
  font-family: var(--mono);
  font-size: 10px;
  font-weight: 600;
  color: var(--txt3);
  letter-spacing: 0.5px;
  text-transform: uppercase;
}
.term-tag.on {
  color: var(--prime);
  padding: 4px 8px;
  border: 1px solid var(--prime);
  background: var(--primeA);
}
.term-deal {
  font-family: var(--mono);
  font-size: 11px;
  font-weight: 700;
  color: var(--prime);
  padding: 4px 8px;
  border: 1px solid var(--prime);
  background: var(--primeA);
  letter-spacing: 0.5px;
  text-align: center;
}
.term-deal.none { border-color: var(--line); color: var(--txt5); background: transparent; }
.term-chev {
  font-family: var(--mono);
  font-size: 18px;
  color: var(--txt4);
  text-align: center;
  transition: all 0.2s;
}
.term-row.open .term-chev { color: var(--prime); transform: rotate(90deg); }

/* EXPANDED ROW */
.term-expand {
  border-bottom: 1px solid var(--line);
  padding: 32px 20px 40px 96px;
  background: var(--bg2);
  animation: slideDown 0.3s ease-out;
}
@keyframes slideDown {
  from { opacity: 0; transform: translateY(-6px); }
  to { opacity: 1; transform: translateY(0); }
}
.term-expand-desc {
  font-family: var(--serif);
  font-style: italic;
  font-size: 17px;
  line-height: 1.5;
  color: var(--txt2);
  margin-bottom: 28px;
  max-width: 720px;
}
.term-expand-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  margin-bottom: 28px;
}
.term-expand-cell {
  padding: 18px 20px;
  border-right: 1px solid var(--line);
}
.term-expand-cell:last-child { border-right: none; }
.term-expand-lbl {
  font-family: var(--mono);
  font-size: 10px;
  color: var(--txt4);
  letter-spacing: 1.2px;
  text-transform: uppercase;
  margin-bottom: 8px;
}
.term-expand-v {
  font-family: var(--mono);
  font-size: 12px;
  color: var(--txt);
  line-height: 1.4;
  font-weight: 500;
}
.term-expand-scorecard {
  margin-bottom: 28px;
}
.term-sc-row {
  display: grid;
  grid-template-columns: 14px 180px 1fr;
  gap: 14px;
  align-items: center;
  padding: 10px 0;
  border-top: 1px solid var(--line);
  font-family: var(--mono);
  font-size: 11px;
}
.term-sc-row:last-child { border-bottom: 1px solid var(--line); }
.term-sc-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.term-sc-dot.green { background: var(--prime); box-shadow: 0 0 8px rgba(168,255,96,0.6); }
.term-sc-dot.yellow { background: var(--warn); box-shadow: 0 0 8px rgba(255,184,77,0.5); }
.term-sc-dot.red { background: var(--danger); box-shadow: 0 0 8px rgba(255,107,107,0.5); }
.term-sc-k { color: var(--txt3); letter-spacing: 0.5px; }
.term-sc-v { color: var(--txt); }
.term-expand-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.term-act {
  font-family: var(--mono);
  font-size: 12px;
  font-weight: 600;
  padding: 11px 20px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  border: 1px solid var(--line2);
  background: transparent;
  color: var(--txt);
  transition: all 0.15s;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.term-act:hover { border-color: var(--prime); color: var(--prime); }
.term-act.primary { background: var(--prime); color: var(--bg); border-color: var(--prime); font-weight: 700; }
.term-act.primary:hover { background: transparent; color: var(--prime); }

/* ═══ QUIZ ═══ */
.quiz {
  border: 1px solid var(--line2);
  background: var(--bg1);
  padding: 48px 56px;
  position: relative;
  overflow: hidden;
}
.quiz::before {
  content: 'RUN DIAGNOSTIC';
  position: absolute;
  top: 14px;
  right: 20px;
  font-family: var(--mono);
  font-size: 10px;
  color: var(--prime);
  letter-spacing: 2px;
}
.quiz-prog {
  font-family: var(--mono);
  font-size: 11px;
  color: var(--prime);
  letter-spacing: 1.5px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 14px;
}
.quiz-prog-track {
  flex: 1;
  max-width: 300px;
  height: 2px;
  background: var(--bg3);
  position: relative;
  overflow: hidden;
}
.quiz-prog-fill {
  height: 100%;
  background: var(--prime);
  box-shadow: 0 0 8px var(--prime);
  transition: width 0.4s ease;
}
.quiz-q {
  font-family: var(--serif);
  font-size: 44px;
  font-weight: 400;
  letter-spacing: -1px;
  line-height: 1.05;
  color: var(--txt);
  margin: 18px 0 8px;
}
.quiz-sub {
  font-family: var(--mono);
  font-size: 12px;
  color: var(--txt3);
  letter-spacing: 0.5px;
  margin-bottom: 32px;
}
.quiz-opts {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2px;
  background: var(--line);
  border: 1px solid var(--line);
}
.quiz-opt {
  background: var(--bg1);
  padding: 22px 28px;
  text-align: left;
  transition: all 0.15s;
  display: grid;
  grid-template-columns: 40px 1fr auto;
  gap: 20px;
  align-items: center;
}
.quiz-opt:hover { background: var(--bg2); }
.quiz-opt-ltr {
  font-family: var(--mono);
  font-size: 11px;
  color: var(--prime);
  letter-spacing: 1px;
  border: 1px solid var(--prime);
  width: 28px;
  height: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.quiz-opt:hover .quiz-opt-ltr {
  background: var(--prime);
  color: var(--bg);
}
.quiz-opt-l {
  font-family: var(--serif);
  font-size: 19px;
  font-weight: 500;
  color: var(--txt);
  letter-spacing: -0.3px;
}
.quiz-opt-d {
  font-family: var(--mono);
  font-size: 11px;
  color: var(--txt3);
  letter-spacing: 0.3px;
  margin-top: 3px;
}
.quiz-opt-arrow {
  font-family: var(--mono);
  font-size: 16px;
  color: var(--txt4);
  transition: all 0.2s;
}
.quiz-opt:hover .quiz-opt-arrow {
  color: var(--prime);
  transform: translateX(4px);
}
.quiz-footer {
  margin-top: 20px;
  display: flex;
  gap: 14px;
  align-items: center;
}
.quiz-back {
  font-family: var(--mono);
  font-size: 11px;
  color: var(--txt3);
  padding: 8px 14px;
  border: 1px solid var(--line2);
  letter-spacing: 0.5px;
  text-transform: uppercase;
  transition: all 0.15s;
}
.quiz-back:hover { border-color: var(--prime); color: var(--prime); }

/* Quiz results */
.quiz-results-hdr {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--line);
}
.quiz-results-tag {
  font-family: var(--mono);
  font-size: 10px;
  color: var(--prime);
  padding: 4px 10px;
  border: 1px solid var(--prime);
  letter-spacing: 1.5px;
  background: var(--primeA);
}
.quiz-results-title {
  font-family: var(--serif);
  font-size: 32px;
  font-weight: 500;
  color: var(--txt);
  letter-spacing: -0.6px;
}
.quiz-results-title em {
  font-style: italic;
  color: var(--prime);
  font-weight: 500;
}
.quiz-result-row {
  display: grid;
  grid-template-columns: 40px 44px 1fr 70px auto;
  gap: 18px;
  align-items: center;
  padding: 18px 0;
  border-bottom: 1px solid var(--line);
}
.quiz-result-rank {
  font-family: var(--mono);
  font-size: 11px;
  color: var(--txt4);
  letter-spacing: 1px;
}
.quiz-result-rank::before { content: '#'; opacity: 0.4; }
.quiz-result-info { min-width: 0; }
.quiz-result-nm {
  font-family: var(--serif);
  font-size: 20px;
  font-weight: 500;
  color: var(--txt);
  margin-bottom: 4px;
  letter-spacing: -0.3px;
}
.quiz-result-reasons {
  font-family: var(--mono);
  font-size: 10px;
  color: var(--txt3);
  letter-spacing: 0.3px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.quiz-result-reasons span::before { content: '+ '; color: var(--prime); }
.quiz-result-score {
  font-family: var(--serif);
  font-size: 28px;
  color: var(--prime);
  font-weight: 500;
  text-align: right;
  letter-spacing: -0.5px;
  line-height: 1;
}
.quiz-result-score small {
  display: block;
  font-family: var(--mono);
  font-size: 9px;
  color: var(--txt4);
  font-weight: 500;
  letter-spacing: 1px;
  margin-top: 3px;
}
.quiz-result-actions {
  display: flex;
  gap: 6px;
}
.quiz-result-btn {
  font-family: var(--mono);
  font-size: 10px;
  font-weight: 600;
  padding: 7px 12px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  border: 1px solid var(--line2);
  color: var(--txt);
  transition: all 0.15s;
}
.quiz-result-btn:hover { border-color: var(--prime); color: var(--prime); }
.quiz-result-btn.primary { background: var(--prime); color: var(--bg); border-color: var(--prime); font-weight: 700; }

/* ═══ DEALS STRIP ═══ */
.deals {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  border: 1px solid var(--line2);
  background: var(--bg1);
}
.deals-row {
  padding: 28px 24px;
  border-right: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  text-align: left;
  transition: background 0.15s;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
}
.deals-row:hover { background: var(--bg2); }
.deals-row:hover::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--prime);
}
.deals-row-firm {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--serif);
  font-size: 18px;
  font-weight: 500;
  color: var(--txt);
  letter-spacing: -0.3px;
}
.deals-row-logo {
  width: 26px;
  height: 26px;
  border: 1px solid var(--line2);
  overflow: hidden;
  background: var(--bg2);
  display: flex;
  align-items: center;
  justify-content: center;
}
.deals-row-logo img { width: 100%; height: 100%; object-fit: contain; padding: 3px; }
.deals-row-pct {
  font-family: var(--serif);
  font-size: 56px;
  font-weight: 500;
  color: var(--prime);
  line-height: 1;
  letter-spacing: -2px;
}
.deals-row-pct em { font-family: var(--mono); font-size: 14px; font-weight: 600; font-style: normal; vertical-align: top; }
.deals-row-code {
  font-family: var(--mono);
  font-size: 11px;
  color: var(--txt3);
  letter-spacing: 1px;
  margin-top: auto;
}
.deals-row-code b { color: var(--txt); background: var(--bg3); padding: 3px 6px; margin-left: 4px; }
.deals-row-desc {
  font-family: var(--mono);
  font-size: 10px;
  color: var(--txt4);
  line-height: 1.4;
  letter-spacing: 0.2px;
}

/* ═══ CHALLENGES ═══ */
.chal-ctrl {
  display: flex;
  gap: 8px;
  margin-bottom: 28px;
  flex-wrap: wrap;
}
.chal-ctrl select {
  font-family: var(--mono);
  font-size: 11px;
  padding: 10px 14px;
  background: var(--bg1);
  color: var(--txt);
  border: 1px solid var(--line2);
  letter-spacing: 0.5px;
  text-transform: uppercase;
  cursor: pointer;
  outline: none;
}
.chal-ctrl select:focus { border-color: var(--prime); }
.chal-ctrl button {
  font-family: var(--mono);
  font-size: 11px;
  padding: 10px 16px;
  background: var(--bg1);
  color: var(--txt3);
  border: 1px solid var(--line2);
  letter-spacing: 0.5px;
  text-transform: uppercase;
  transition: all 0.15s;
}
.chal-ctrl button:hover { color: var(--txt); }
.chal-ctrl button.on { background: var(--prime); color: var(--bg); border-color: var(--prime); font-weight: 700; }
.chal-table {
  width: 100%;
  border: 1px solid var(--line2);
  background: var(--bg1);
  border-collapse: collapse;
  font-family: var(--mono);
  font-size: 12px;
}
.chal-table thead th {
  font-size: 10px;
  color: var(--txt4);
  letter-spacing: 1.2px;
  text-transform: uppercase;
  padding: 14px 16px;
  text-align: left;
  border-bottom: 1px solid var(--line);
  background: var(--bg2);
  font-weight: 600;
}
.chal-table tbody td {
  padding: 16px;
  border-bottom: 1px solid var(--line);
  vertical-align: middle;
  color: var(--txt2);
}
.chal-table tbody tr:hover td { background: var(--bg2); }
.chal-table tbody tr:last-child td { border-bottom: none; }
.chal-cell-firm {
  display: flex;
  align-items: center;
  gap: 10px;
}
.chal-cell-firm img { width: 22px; height: 22px; border: 1px solid var(--line2); padding: 2px; background: var(--bg2); }
.chal-cell-firm b {
  font-family: var(--serif);
  font-size: 16px;
  font-weight: 500;
  color: var(--txt);
  letter-spacing: -0.3px;
}
.chal-cell-plan {
  font-family: var(--mono);
  font-size: 12px;
  color: var(--prime);
  font-weight: 600;
}
.chal-cell-price {
  font-family: var(--serif);
  font-size: 18px;
  font-weight: 500;
  color: var(--prime);
  letter-spacing: -0.3px;
}

/* ═══ SIMULATOR ═══ */
.sim {
  border: 1px solid var(--line2);
  background: var(--bg1);
  padding: 32px;
}
.sim-ctrl {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 24px;
}
.sim-ctrl label {
  display: block;
  font-family: var(--mono);
  font-size: 10px;
  color: var(--txt4);
  letter-spacing: 1.2px;
  text-transform: uppercase;
  margin-bottom: 6px;
}
.sim-ctrl select {
  width: 100%;
  font-family: var(--mono);
  font-size: 12px;
  padding: 12px 14px;
  background: var(--bg2);
  color: var(--txt);
  border: 1px solid var(--line2);
  letter-spacing: 0.4px;
  cursor: pointer;
  outline: none;
}
.sim-ctrl select:focus { border-color: var(--prime); }
.sim-chart-wrap {
  background: var(--bg2);
  border: 1px solid var(--line);
  padding: 20px;
  position: relative;
  overflow: hidden;
  margin-bottom: 20px;
}
.sim-chart-wrap::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(168,255,96,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(168,255,96,0.03) 1px, transparent 1px);
  background-size: 24px 24px;
  pointer-events: none;
}
.sim-chart { width: 100%; height: auto; display: block; position: relative; }
.sim-verdict {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px 24px;
  border: 1px solid;
  margin-bottom: 16px;
  font-family: var(--mono);
}
.sim-verdict.pass { border-color: var(--prime); background: var(--primeA); }
.sim-verdict.fail { border-color: var(--danger); background: rgba(255,107,107,0.06); }
.sim-verdict-mark {
  font-family: var(--serif);
  font-size: 42px;
  line-height: 1;
  font-weight: 500;
}
.sim-verdict.pass .sim-verdict-mark { color: var(--prime); }
.sim-verdict.fail .sim-verdict-mark { color: var(--danger); }
.sim-verdict-t {
  font-family: var(--serif);
  font-size: 22px;
  font-weight: 500;
  color: var(--txt);
  letter-spacing: -0.3px;
  margin-bottom: 4px;
}
.sim-verdict-d {
  font-family: var(--mono);
  font-size: 11px;
  color: var(--txt3);
  line-height: 1.5;
  letter-spacing: 0.3px;
}
.sim-legend {
  display: flex;
  gap: 24px;
  padding-top: 14px;
  border-top: 1px solid var(--line);
  font-family: var(--mono);
  font-size: 10px;
  color: var(--txt3);
  letter-spacing: 0.5px;
  flex-wrap: wrap;
}
.sim-legend span { display: inline-flex; align-items: center; gap: 6px; }
.sim-legend-dot { width: 12px; height: 2px; display: inline-block; }

/* ═══ RESEARCH ═══ */
.rsearch {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 0;
  border: 1px solid var(--line2);
  background: var(--bg1);
}
.rsearch-main {
  padding: 40px 44px;
  border-right: 1px solid var(--line);
  cursor: pointer;
  transition: background 0.2s;
  grid-row: span 2;
}
.rsearch-main:hover { background: var(--bg2); }
.rsearch-cat {
  font-family: var(--mono);
  font-size: 10px;
  color: var(--prime);
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin-bottom: 20px;
}
.rsearch-h {
  font-family: var(--serif);
  font-size: 38px;
  font-weight: 500;
  letter-spacing: -1px;
  line-height: 1.1;
  color: var(--txt);
  margin-bottom: 16px;
}
.rsearch-excerpt {
  font-family: var(--serif);
  font-size: 15px;
  font-style: italic;
  color: var(--txt3);
  line-height: 1.55;
  margin-bottom: 18px;
}
.rsearch-date {
  font-family: var(--mono);
  font-size: 11px;
  color: var(--txt4);
  letter-spacing: 0.5px;
}
.rsearch-sub {
  padding: 28px 32px;
  border-bottom: 1px solid var(--line);
  cursor: pointer;
  transition: background 0.2s;
}
.rsearch-sub:hover { background: var(--bg2); }
.rsearch-sub:last-child { border-bottom: none; }
.rsearch-sub-cat {
  font-family: var(--mono);
  font-size: 9px;
  color: var(--prime);
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin-bottom: 10px;
}
.rsearch-sub-h {
  font-family: var(--serif);
  font-size: 18px;
  font-weight: 500;
  color: var(--txt);
  line-height: 1.25;
  letter-spacing: -0.3px;
  margin-bottom: 8px;
}
.rsearch-sub-date {
  font-family: var(--mono);
  font-size: 10px;
  color: var(--txt4);
  letter-spacing: 0.5px;
}

/* ═══ REWARDS CARD ═══ */
.rw {
  border: 1px solid var(--line2);
  background: var(--bg1);
  padding: 48px 56px;
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 56px;
  align-items: center;
}
.rw-eye {
  font-family: var(--mono);
  font-size: 10px;
  color: var(--prime);
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 16px;
}
.rw-h {
  font-family: var(--serif);
  font-size: 48px;
  font-weight: 500;
  letter-spacing: -1.2px;
  line-height: 1.05;
  color: var(--txt);
  margin-bottom: 18px;
}
.rw-h em { font-style: italic; color: var(--prime); }
.rw-d {
  font-family: var(--serif);
  font-style: italic;
  font-size: 17px;
  color: var(--txt3);
  line-height: 1.5;
  margin-bottom: 28px;
  max-width: 480px;
}
.rw-steps {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.rw-step {
  display: grid;
  grid-template-columns: 42px 1fr;
  gap: 14px;
  align-items: center;
  padding: 14px 18px;
  border: 1px solid var(--line);
  background: var(--bg2);
  transition: all 0.15s;
}
.rw-step:hover { border-color: var(--prime); }
.rw-step-n {
  font-family: var(--mono);
  font-size: 11px;
  color: var(--prime);
  font-weight: 700;
  letter-spacing: 1px;
  border: 1px solid var(--prime);
  width: 30px;
  height: 30px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.rw-step-t {
  font-family: var(--serif);
  font-size: 16px;
  color: var(--txt);
  letter-spacing: -0.3px;
  margin-bottom: 3px;
}
.rw-step-s {
  font-family: var(--mono);
  font-size: 10px;
  color: var(--txt4);
  letter-spacing: 0.4px;
}

/* ═══ FOOTER ═══ */
.ftr {
  margin-top: 140px;
  padding: 60px 0 40px;
  border-top: 2px solid var(--txt);
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 48px;
}
.ftr-brand {
  font-family: var(--serif);
  font-size: 28px;
  font-weight: 500;
  color: var(--txt);
  letter-spacing: -0.5px;
  margin-bottom: 14px;
}
.ftr-brand em { font-style: italic; color: var(--prime); }
.ftr-tag {
  font-family: var(--serif);
  font-style: italic;
  font-size: 14px;
  color: var(--txt3);
  max-width: 320px;
  line-height: 1.55;
  margin-bottom: 20px;
}
.ftr-mono {
  font-family: var(--mono);
  font-size: 10px;
  color: var(--txt4);
  letter-spacing: 0.5px;
}
.ftr-col h4 {
  font-family: var(--mono);
  font-size: 10px;
  color: var(--prime);
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin-bottom: 20px;
  font-weight: 600;
}
.ftr-col a, .ftr-col button {
  display: block;
  font-family: var(--mono);
  font-size: 12px;
  color: var(--txt2);
  padding: 5px 0;
  transition: color 0.15s;
  letter-spacing: 0.3px;
  text-decoration: none;
  text-align: left;
}
.ftr-col a:hover, .ftr-col button:hover { color: var(--prime); }
.ftr-btm {
  grid-column: 1 / -1;
  padding-top: 32px;
  margin-top: 24px;
  border-top: 1px solid var(--line);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: var(--mono);
  font-size: 10px;
  color: var(--txt4);
  letter-spacing: 0.5px;
  flex-wrap: wrap;
  gap: 16px;
}

/* ═══ SIDEBAR (user panel) ═══ */
.user-panel {
  position: fixed;
  top: 60px;
  right: 16px;
  width: 280px;
  background: var(--bg1);
  border: 1px solid var(--line2);
  padding: 20px;
  z-index: 40;
  box-shadow: 0 8px 32px rgba(0,0,0,0.5);
}
.user-panel-hdr {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--line);
  margin-bottom: 16px;
}
.user-panel-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid var(--line2);
  background: var(--bg2);
  background-size: cover;
  background-position: center;
}
.user-panel-name {
  font-family: var(--serif);
  font-size: 16px;
  color: var(--txt);
  letter-spacing: -0.3px;
  line-height: 1.2;
}
.user-panel-email {
  font-family: var(--mono);
  font-size: 10px;
  color: var(--txt4);
  letter-spacing: 0.3px;
  margin-top: 3px;
}
.user-panel-item {
  display: block;
  width: 100%;
  font-family: var(--mono);
  font-size: 12px;
  padding: 10px 0;
  color: var(--txt2);
  text-align: left;
  border-top: 1px solid var(--line);
  transition: color 0.15s;
  letter-spacing: 0.4px;
}
.user-panel-item:hover { color: var(--prime); }
.user-panel-item:first-of-type { border-top: none; }

/* ═══ AUTH MODAL ═══ */
.auth-bg {
  position: fixed;
  inset: 0;
  z-index: 300;
  background: rgba(0,0,0,0.85);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.auth-box {
  background: var(--bg1);
  border: 1px solid var(--line2);
  padding: 48px;
  max-width: 420px;
  width: 100%;
  position: relative;
}
.auth-box::before {
  content: 'TERMINAL.LOGIN';
  position: absolute;
  top: 16px;
  right: 20px;
  font-family: var(--mono);
  font-size: 10px;
  color: var(--prime);
  letter-spacing: 1.5px;
}
.auth-h {
  font-family: var(--serif);
  font-size: 32px;
  font-weight: 500;
  color: var(--txt);
  letter-spacing: -0.5px;
  margin-bottom: 6px;
}
.auth-d {
  font-family: var(--mono);
  font-size: 11px;
  color: var(--txt3);
  letter-spacing: 0.4px;
  margin-bottom: 28px;
}
.auth-tab {
  display: flex;
  border: 1px solid var(--line2);
  margin-bottom: 20px;
}
.auth-tab button {
  flex: 1;
  font-family: var(--mono);
  font-size: 11px;
  padding: 10px;
  color: var(--txt3);
  letter-spacing: 0.5px;
  text-transform: uppercase;
  transition: all 0.15s;
}
.auth-tab button.on { background: var(--prime); color: var(--bg); font-weight: 700; }
.auth-inp {
  display: block;
  width: 100%;
  font-family: var(--mono);
  font-size: 13px;
  padding: 13px 16px;
  background: var(--bg2);
  color: var(--txt);
  border: 1px solid var(--line2);
  margin-bottom: 12px;
  letter-spacing: 0.3px;
  outline: none;
  transition: border 0.15s;
}
.auth-inp:focus { border-color: var(--prime); }
.auth-inp::placeholder { color: var(--txt4); }
.auth-sub {
  width: 100%;
  font-family: var(--mono);
  font-size: 12px;
  font-weight: 700;
  padding: 14px;
  background: var(--prime);
  color: var(--bg);
  border: 1px solid var(--prime);
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: all 0.15s;
}
.auth-sub:hover { background: transparent; color: var(--prime); }
.auth-close {
  position: absolute;
  top: 14px;
  left: 18px;
  font-family: var(--mono);
  font-size: 14px;
  color: var(--txt4);
}
.auth-close:hover { color: var(--prime); }
.auth-err {
  font-family: var(--mono);
  font-size: 11px;
  color: var(--danger);
  padding: 8px 12px;
  border: 1px solid var(--danger);
  background: rgba(255,107,107,0.06);
  margin-bottom: 12px;
  letter-spacing: 0.3px;
}

/* ═══ COMPARE TRAY ═══ */
.cmp-tray {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--bg1);
  border: 1px solid var(--prime);
  padding: 14px 20px;
  display: flex;
  gap: 14px;
  align-items: center;
  z-index: 60;
  box-shadow: 0 0 40px rgba(168,255,96,0.15);
}
.cmp-tray-firms { display: flex; gap: 8px; }
.cmp-tray-chip {
  font-family: var(--mono);
  font-size: 11px;
  color: var(--prime);
  padding: 5px 10px;
  border: 1px solid var(--prime);
  background: var(--primeA);
  letter-spacing: 0.3px;
}
.cmp-tray-go {
  font-family: var(--mono);
  font-size: 11px;
  font-weight: 700;
  padding: 8px 16px;
  background: var(--prime);
  color: var(--bg);
  letter-spacing: 0.8px;
  text-transform: uppercase;
}
.cmp-tray-clear {
  font-family: var(--mono);
  font-size: 11px;
  color: var(--txt3);
  padding: 8px 12px;
  border: 1px solid var(--line2);
  letter-spacing: 0.5px;
  text-transform: uppercase;
}
.cmp-tray-clear:hover { color: var(--danger); border-color: var(--danger); }

/* ═══ RESPONSIVE ═══ */
@media (max-width: 900px) {
  .tbar { grid-template-columns: auto 1fr auto; gap: 12px; padding: 12px 16px; }
  .tbar-status, .tbar-cmd { display: none; }
  .app { padding: 0 16px; }
  .crosshair { display: none; }
  .tstrip { grid-template-columns: repeat(2, 1fr); }
  .tstrip-item:nth-child(2) { border-right: none; }
  .tstrip-item:nth-child(1), .tstrip-item:nth-child(2) { border-bottom: 1px solid var(--line); padding-bottom: 20px; margin-bottom: 20px; }
  .sec-hd { grid-template-columns: 1fr; gap: 12px; }
  .sec-sub { text-align: left; }
  .term-colhdr, .term-row { grid-template-columns: 40px 1fr 70px 50px; gap: 10px; padding: 16px; }
  .term-colhdr > span:nth-child(4), .term-colhdr > span:nth-child(5), .term-colhdr > span:nth-child(6) { display: none; }
  .term-row > *:nth-child(4), .term-row > *:nth-child(5), .term-row > *:nth-child(6) { display: none; }
  .term-expand { padding: 20px 16px; }
  .term-expand-grid { grid-template-columns: 1fr 1fr; }
  .term-expand-cell:nth-child(odd) { border-right: 1px solid var(--line); }
  .term-expand-cell:nth-child(even) { border-right: none; }
  .deals { grid-template-columns: 1fr 1fr; }
  .rsearch { grid-template-columns: 1fr; }
  .rsearch-main { grid-row: auto; border-right: none; }
  .quiz { padding: 28px 24px; }
  .quiz-q { font-size: 28px; }
  .rw { grid-template-columns: 1fr; gap: 32px; padding: 28px; }
  .rw-h { font-size: 32px; }
  .ftr { grid-template-columns: 1fr 1fr; gap: 32px; }
  .chal-table { font-size: 11px; }
  .chal-table thead th, .chal-table tbody td { padding: 10px; }
}
`;

// ═══════════════════════════════════════════════════════════════════════════
// FIRM LOGO (simple component)
// ═══════════════════════════════════════════════════════════════════════════
const FirmLogo = ({ firm, size = 40 }) => {
  const logo = LOGOS[firm.name];
  return (
    <div className="term-firm-lg" style={{ width: size, height: size }}>
      {logo ? <img src={logo} alt={firm.name} /> : <span className="term-firm-lg-fb">{firm.initials}</span>}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// QUIZ SCORING
// ═══════════════════════════════════════════════════════════════════════════
const scoreQuiz = (firm, answers) => {
  let s = 50;
  const reasons = [];
  const n = firm.name;
  if (answers.style === "swing") {
    if (n === "Goat Funded Futures") { s += 8; reasons.push("Express allows overnight"); }
    else s -= 5;
  }
  if (answers.style === "scalp" || answers.style === "intraday") {
    if (n === "Tradeify") { s += 10; reasons.push("~1hr payouts"); }
    if (n === "My Funded Futures") { s += 8; reasons.push("Rapid = 90/10 split"); }
  }
  if (answers.budget === "low") {
    if (n === "Top One Futures") { s += 10; reasons.push("$39/mo Elite plan"); }
    if (n === "Tradeify") { s += 8; reasons.push("Growth 25K = $99"); }
    if (n === "FundedNext Futures") { s += 6; reasons.push("25K Rapid = $99"); }
  }
  if (answers.budget === "high") {
    if (n === "Apex Trader Funding") { s += 6; reasons.push("20 accounts, $3M total"); }
  }
  if (answers.dd === "eod") {
    if (["Tradeify","Alpha Futures","Bulenox","FundedNext Futures"].includes(n)) {
      s += 10; reasons.push("EOD trailing DD");
    }
  }
  if (answers.dd === "static") {
    if (n === "Goat Funded Futures") { s += 12; reasons.push("Static DD = fixed floor"); }
    else s -= 3;
  }
  if (answers.news === "yes") {
    if (["Apex Trader Funding","Tradeify","Bulenox","FundedNext Futures","Top One Futures"].includes(n)) {
      s += 8; reasons.push("News trading allowed");
    }
    if (["My Funded Futures","Goat Funded Futures"].includes(n)) s -= 4;
  }
  if (answers.speed === "fast") {
    if (n === "Tradeify") { s += 10; reasons.push("~1hr payouts"); }
    if (["FundedNext Futures","Goat Funded Futures"].includes(n)) { s += 7; reasons.push("24hr guaranteed"); }
  }
  if (answers.consistency === "none") {
    if (n === "FundedNext Futures") { s += 10; reasons.push("No consistency rule"); }
    if (n === "My Funded Futures") { s += 8; reasons.push("Rapid = no consistency"); }
  }
  const ps = PULSE_SCORES[n] || 75;
  s += (ps - 85) * 0.3;
  return { score: Math.max(0, Math.min(100, Math.round(s))), reasons: reasons.slice(0, 3) };
};

// ═══════════════════════════════════════════════════════════════════════════
// SIMULATE DRAWDOWN
// ═══════════════════════════════════════════════════════════════════════════
const simDD = (points, cfg) => {
  const { type, maxDD, lockAt } = cfg;
  let peak = 0, locked = false, blownAt = -1;
  const floors = [];
  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    let floor;
    if (type === "Static") {
      floor = -maxDD;
    } else {
      if (p > peak) peak = p;
      floor = peak - maxDD;
      if (lockAt !== null && peak >= maxDD + lockAt && !locked) { locked = true; floor = lockAt; }
    }
    floors.push(floor);
    if (p <= floor && blownAt === -1) blownAt = i;
  }
  return { floors, blownAt, peak };
};

// ═══════════════════════════════════════════════════════════════════════════
// FIRM ROW (THE TERMINAL TABLE)
// ═══════════════════════════════════════════════════════════════════════════
const FirmRow = ({ firm, rank, open, onToggle, onDetail, toggleCompare, comparing }) => {
  const ps = PULSE_SCORES[firm.name] || 75;
  const deal = DEALS.find(d => d.firm === firm.name);
  const scorecard = SCORECARD_DATA[firm.name] || [];
  return (
    <>
      <button className={`term-row ${open ? 'open' : ''}`} onClick={onToggle}>
        <span className="term-rank">{String(rank).padStart(2, '0')}</span>
        <span className="term-firm">
          <FirmLogo firm={firm} />
          <span>
            <span className="term-firm-nm">{firm.name}</span>
            <span className="term-firm-meta">{firm.flag} {firm.hq.split(',')[0].toUpperCase()} · EST. {firm.founded}</span>
          </span>
        </span>
        <span className="term-pulse">
          <span className="term-pulse-v">{ps}</span>
          <span className="term-pulse-bar"><span style={{ width: ps + '%' }} /></span>
        </span>
        <span className="term-rating">★{firm.rating}<em>{firm.reviews.toLocaleString()} REV</em></span>
        <span className="term-alloc">{firm.maxAlloc}</span>
        <span className={`term-tag ${firm.instantFund ? 'on' : ''}`}>{firm.instantFund ? 'INSTANT' : 'EVAL'}</span>
        <span className={`term-deal ${!deal ? 'none' : ''}`}>{deal ? deal.pct : '—'}</span>
        <span className="term-chev">›</span>
      </button>
      {open && (
        <div className="term-expand">
          <p className="term-expand-desc">"{firm.desc}"</p>
          <div className="term-expand-grid">
            <div className="term-expand-cell">
              <div className="term-expand-lbl">Split</div>
              <div className="term-expand-v">{firm.split}</div>
            </div>
            <div className="term-expand-cell">
              <div className="term-expand-lbl">Target</div>
              <div className="term-expand-v">{firm.target}</div>
            </div>
            <div className="term-expand-cell">
              <div className="term-expand-lbl">Max DD</div>
              <div className="term-expand-v">{firm.maxDD}</div>
            </div>
            <div className="term-expand-cell">
              <div className="term-expand-lbl">Payout</div>
              <div className="term-expand-v">{firm.paySpeed}</div>
            </div>
            <div className="term-expand-cell">
              <div className="term-expand-lbl">Drawdown</div>
              <div className="term-expand-v">{firm.drawdownType}</div>
            </div>
            <div className="term-expand-cell">
              <div className="term-expand-lbl">Consistency</div>
              <div className="term-expand-v">{firm.hasConsistency ? firm.consistencyPct : 'None'}</div>
            </div>
            <div className="term-expand-cell">
              <div className="term-expand-lbl">Platforms</div>
              <div className="term-expand-v">{firm.platforms.slice(0, 3).join(', ')}{firm.platforms.length > 3 ? ` +${firm.platforms.length - 3}` : ''}</div>
            </div>
            <div className="term-expand-cell">
              <div className="term-expand-lbl">Min Payout</div>
              <div className="term-expand-v">{firm.minPayout}</div>
            </div>
          </div>
          {scorecard.length > 0 && (
            <div className="term-expand-scorecard">
              {scorecard.slice(0, 5).map((r, i) => (
                <div key={i} className="term-sc-row">
                  <div className={`term-sc-dot ${r.tone}`} />
                  <div className="term-sc-k">{r.k}</div>
                  <div className="term-sc-v">{r.v}</div>
                </div>
              ))}
            </div>
          )}
          <div className="term-expand-actions">
            <button className="term-act primary" onClick={(e) => { e.stopPropagation(); trackClick(firm.name); }}>
              {deal ? `Claim ${deal.pct} →` : 'Visit Site →'}
            </button>
            <button className="term-act" onClick={(e) => { e.stopPropagation(); onDetail(firm); }}>Full Profile</button>
            {toggleCompare && (
              <button className="term-act" onClick={(e) => { e.stopPropagation(); toggleCompare(firm); }}>
                {comparing ? '✓ Comparing' : '+ Compare'}
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// QUIZ COMPONENT
// ═══════════════════════════════════════════════════════════════════════════
const Quiz = ({ onDetail }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [done, setDone] = useState(false);
  const total = QUIZ_QUESTIONS.length;

  if (done) {
    const ranked = FIRMS.map(f => ({ ...f, ...scoreQuiz(f, answers) })).sort((a, b) => b.score - a.score);
    return (
      <div className="quiz">
        <div className="quiz-results-hdr">
          <span className="quiz-results-tag">MATCH FOUND</span>
          <span className="quiz-results-title">Your best fit is <em>{ranked[0].name}</em></span>
          <button className="quiz-back" onClick={() => { setDone(false); setStep(0); setAnswers({}); }} style={{ marginLeft: 'auto' }}>↻ Re-run</button>
        </div>
        {ranked.map((f, i) => {
          const deal = DEALS.find(d => d.firm === f.name);
          return (
            <div key={f.id} className="quiz-result-row">
              <div className="quiz-result-rank">{String(i + 1).padStart(2, '0')}</div>
              <FirmLogo firm={f} size={40} />
              <div className="quiz-result-info">
                <div className="quiz-result-nm">{f.name}</div>
                <div className="quiz-result-reasons">
                  {f.reasons.length > 0 ? f.reasons.map((r, j) => <span key={j}>{r}</span>) : <span style={{ fontStyle: 'italic' }}>Baseline match</span>}
                </div>
              </div>
              <div className="quiz-result-score">{f.score}<small>MATCH</small></div>
              <div className="quiz-result-actions">
                <button className="quiz-result-btn" onClick={() => onDetail(f)}>View</button>
                {deal && <button className="quiz-result-btn primary" onClick={() => trackClick(f.name)}>{deal.pct}</button>}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  const q = QUIZ_QUESTIONS[step];
  const prog = Math.round((step / total) * 100);

  const pick = (v) => {
    const na = { ...answers, [q.id]: v };
    setAnswers(na);
    if (step < total - 1) setStep(step + 1);
    else setDone(true);
  };

  return (
    <div className="quiz">
      <div className="quiz-prog">
        Q.{step + 1} / {total}
        <div className="quiz-prog-track"><div className="quiz-prog-fill" style={{ width: prog + '%' }} /></div>
      </div>
      <h3 className="quiz-q">{q.q}</h3>
      <p className="quiz-sub">{q.sub.toUpperCase()}</p>
      <div className="quiz-opts">
        {q.opts.map((o, i) => (
          <button key={o.v} className="quiz-opt" onClick={() => pick(o.v)}>
            <span className="quiz-opt-ltr">{String.fromCharCode(65 + i)}</span>
            <span>
              <span className="quiz-opt-l">{o.l}</span>
              <span className="quiz-opt-d">{o.d}</span>
            </span>
            <span className="quiz-opt-arrow">→</span>
          </button>
        ))}
      </div>
      {step > 0 && (
        <div className="quiz-footer">
          <button className="quiz-back" onClick={() => setStep(step - 1)}>← Back</button>
        </div>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// DRAWDOWN SIMULATOR
// ═══════════════════════════════════════════════════════════════════════════
const Sim = () => {
  const [sce, setSce] = useState("spike-give-back");
  const [firm, setFirm] = useState("Tradeify");
  const scenario = DD_SCENARIOS[sce];
  const cfg = FIRM_DD_CONFIG[firm];
  const f = FIRMS.find(x => x.name === firm);
  const sim = simDD(scenario.points, cfg);

  const W = 720, H = 260, P = 36;
  const all = [...scenario.points, ...sim.floors];
  const minY = Math.min(...all) - 200;
  const maxY = Math.max(...all) + 200;
  const xs = i => P + (i / (scenario.points.length - 1)) * (W - P * 2);
  const ys = v => H - P - ((v - minY) / (maxY - minY)) * (H - P * 2);
  const pnlPath = scenario.points.map((p, i) => `${i === 0 ? 'M' : 'L'}${xs(i)},${ys(p)}`).join(' ');
  const floorPath = sim.floors.map((p, i) => `${i === 0 ? 'M' : 'L'}${xs(i)},${ys(p)}`).join(' ');

  return (
    <div className="sim">
      <div className="sim-ctrl">
        <div>
          <label>FIRM</label>
          <select value={firm} onChange={e => setFirm(e.target.value)}>
            {FIRMS.map(ff => <option key={ff.id} value={ff.name}>{FIRM_DD_CONFIG[ff.name]?.label || ff.name}</option>)}
          </select>
        </div>
        <div>
          <label>SCENARIO</label>
          <select value={sce} onChange={e => setSce(e.target.value)}>
            {Object.entries(DD_SCENARIOS).map(([k, v]) => <option key={k} value={k}>{v.name}</option>)}
          </select>
        </div>
      </div>
      <div className="sim-chart-wrap">
        <svg viewBox={`0 0 ${W} ${H}`} className="sim-chart">
          <line x1={P} y1={ys(0)} x2={W - P} y2={ys(0)} stroke="rgba(255,255,255,0.1)" strokeDasharray="4 4" />
          <path d={`${floorPath} L${xs(scenario.points.length - 1)},${H - P} L${P},${H - P} Z`} fill="rgba(255,107,107,0.06)" />
          <path d={floorPath} fill="none" stroke="#ff6b6b" strokeWidth="1.5" strokeDasharray="6 4" />
          <path d={pnlPath} fill="none" stroke={f?.color || '#a8ff60'} strokeWidth="2.5" />
          {sim.blownAt >= 0 && (
            <g>
              <circle cx={xs(sim.blownAt)} cy={ys(scenario.points[sim.blownAt])} r="6" fill="#ff6b6b" />
              <text x={xs(sim.blownAt)} y={ys(scenario.points[sim.blownAt]) - 14} fill="#ff6b6b" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="var(--mono)">BLOWN</text>
            </g>
          )}
        </svg>
      </div>
      <div className={`sim-verdict ${sim.blownAt >= 0 ? 'fail' : 'pass'}`}>
        <span className="sim-verdict-mark">{sim.blownAt >= 0 ? '✗' : '✓'}</span>
        <div>
          <div className="sim-verdict-t">{sim.blownAt >= 0 ? 'Account Terminated' : 'Account Survived'}</div>
          <div className="sim-verdict-d">
            {sim.blownAt >= 0
              ? `Balance hit the drawdown floor on day ${sim.blownAt + 1}. This is how ${firm}'s ${cfg.type.toLowerCase()} trailing drawdown bites.`
              : `Peak: $${sim.peak.toLocaleString()} · Final floor: $${sim.floors[sim.floors.length - 1].toLocaleString()}`}
          </div>
        </div>
      </div>
      <div className="sim-legend">
        <span><i className="sim-legend-dot" style={{ background: f?.color || 'var(--prime)' }} />EQUITY (P&L)</span>
        <span><i className="sim-legend-dot" style={{ background: '#ff6b6b' }} />DRAWDOWN FLOOR</span>
        <span style={{ marginLeft: 'auto' }}>TYPE: <b style={{ color: 'var(--prime)' }}>{cfg.type.toUpperCase()}</b> · MAX: <b style={{ color: 'var(--prime)' }}>${cfg.maxDD.toLocaleString()}</b></span>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// AUTH MODAL
// ═══════════════════════════════════════════════════════════════════════════
const Auth = ({ onClose, onAuth }) => {
  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true); setErr(null);
    try {
      if (mode === "signin") {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        onAuth(data.user);
      } else {
        const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { username } } });
        if (error) throw error;
        if (data.user) onAuth(data.user);
      }
    } catch (e) {
      setErr(e.message || "Something went wrong.");
    }
    setBusy(false);
  };

  return (
    <div className="auth-bg" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="auth-box">
        <button className="auth-close" onClick={onClose}>✕</button>
        <h2 className="auth-h">{mode === "signin" ? "Welcome Back" : "Create Account"}</h2>
        <p className="auth-d">{mode === "signin" ? "Sign in to track your picks and earn PulsePoints." : "Join the community. Earn points. Get deals."}</p>
        <div className="auth-tab">
          <button className={mode === "signin" ? "on" : ""} onClick={() => setMode("signin")}>Sign In</button>
          <button className={mode === "signup" ? "on" : ""} onClick={() => setMode("signup")}>Sign Up</button>
        </div>
        <form onSubmit={submit}>
          {err && <div className="auth-err">{err}</div>}
          {mode === "signup" && (
            <input className="auth-inp" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
          )}
          <input className="auth-inp" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input className="auth-inp" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
          <button type="submit" className="auth-sub" disabled={busy}>
            {busy ? "Loading..." : (mode === "signin" ? "Access Terminal" : "Create Account")}
          </button>
        </form>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// CHALLENGES TABLE (compact)
// ═══════════════════════════════════════════════════════════════════════════
const ChallengesTable = () => {
  const [firm, setFirm] = useState("");
  const [size, setSize] = useState("");
  const [instant, setInstant] = useState(false);

  const filtered = CHALLENGES.filter(c => {
    if (firm && c.firm !== firm) return false;
    if (size && c.size !== size) return false;
    if (instant && !c.instant) return false;
    return true;
  });

  const firms = [...new Set(CHALLENGES.map(c => c.firm))];
  const sizes = [...new Set(CHALLENGES.map(c => c.size))].sort((a, b) => parseInt(a) - parseInt(b));

  return (
    <>
      <div className="chal-ctrl">
        <select value={firm} onChange={e => setFirm(e.target.value)}>
          <option value="">ALL FIRMS</option>
          {firms.map(f => <option key={f} value={f}>{f}</option>)}
        </select>
        <select value={size} onChange={e => setSize(e.target.value)}>
          <option value="">ALL SIZES</option>
          {sizes.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <button className={instant ? "on" : ""} onClick={() => setInstant(!instant)}>Instant Only</button>
      </div>
      <div style={{ overflow: 'auto' }}>
        <table className="chal-table">
          <thead>
            <tr>
              <th>Firm / Plan</th>
              <th>Size</th>
              <th>Target</th>
              <th>Max Loss</th>
              <th>DLL</th>
              <th>Drawdown</th>
              <th>Split</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {filtered.slice(0, 40).map((c, i) => {
              const f = FIRMS.find(ff => ff.name === c.firm);
              return (
                <tr key={i}>
                  <td>
                    <div className="chal-cell-firm">
                      {f && <img src={LOGOS[f.name]} alt="" />}
                      <div>
                        <b>{c.firm}</b>
                        <div className="chal-cell-plan">{c.plan}</div>
                      </div>
                    </div>
                  </td>
                  <td>{c.size}</td>
                  <td>{c.target}</td>
                  <td>{c.maxLoss}</td>
                  <td>{c.dll}</td>
                  <td>{c.drawdown}</td>
                  <td>{c.split}</td>
                  <td className="chal-cell-price">{c.price}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {filtered.length > 40 && (
        <p style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--txt4)', textAlign: 'center', padding: 16, letterSpacing: 0.5 }}>
          SHOWING 40 OF {filtered.length} RESULTS · REFINE FILTERS FOR MORE
        </p>
      )}
    </>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════════════════
export default function App() {
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [openFirm, setOpenFirm] = useState(null);
  const [compareFirms, setCompareFirms] = useState([]);
  const [sort, setSort] = useState("pulse");
  const [filter, setFilter] = useState("all");
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setUser(session?.user || null));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => setUser(session?.user || null));
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const logout = async () => { await supabase.auth.signOut(); setUser(null); setShowPanel(false); };

  const toggleCompare = (f) => {
    setCompareFirms(prev =>
      prev.find(x => x.id === f.id) ? prev.filter(x => x.id !== f.id) :
      prev.length < 4 ? [...prev, f] : prev
    );
  };

  const filtered = FIRMS.filter(f => {
    if (filter === "instant") return f.instantFund;
    if (filter === "noDLL") return !f.hasDLL;
    if (filter === "noConsistency") return !f.hasConsistency;
    return true;
  });

  const sorted = useMemo(() => {
    const a = [...filtered];
    if (sort === "pulse") a.sort((x, y) => (PULSE_SCORES[y.name] || 0) - (PULSE_SCORES[x.name] || 0));
    if (sort === "rating") a.sort((x, y) => y.rating - x.rating);
    if (sort === "newest") a.sort((x, y) => y.founded - x.founded);
    if (sort === "alloc") a.sort((x, y) => {
      const n = s => { const v = parseFloat(s.replace(/[^0-9.]/g, '')); return s.includes('M') ? v * 1000 : v; };
      return n(y.maxAlloc) - n(x.maxAlloc);
    });
    return a;
  }, [sort, filter]);

  const onDetail = (f) => {
    setOpenFirm(openFirm === f.id ? null : f.id);
    setTimeout(() => {
      const el = document.querySelector('.term-row.open');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 50);
  };

  const fmt = (d) => d.toTimeString().slice(0, 8) + " UTC";

  const topDeal = DEALS.reduce((best, d) => {
    const pct = parseInt(d.pct);
    return pct > best.pct ? { pct, firm: d.firm } : best;
  }, { pct: 0, firm: '' });

  return (
    <>
      <style>{css}</style>

      {/* CROSSHAIRS (decorative terminal markers) */}
      <div className="crosshair tl">[TOP.L]</div>
      <div className="crosshair tr">[TOP.R]</div>
      <div className="crosshair bl">[BTM.L]</div>
      <div className="crosshair br">[BTM.R]</div>

      {/* TOP BAR */}
      <div className="tbar">
        <div className="tbar-left">
          <div className="tbar-logo">
            <span className="tbar-logo-dot" />
            PROPPULSE<em>//</em>TERMINAL
          </div>
          <span className="tbar-ver">v2026.4</span>
        </div>
        <div className="tbar-status">
          <span>FIRMS <b>{FIRMS.length}</b></span>
          <span>DEALS <b>{DEALS.length}</b></span>
          <span>MAX_DISCOUNT <b>{topDeal.pct}%</b></span>
          <span>{fmt(time)}</span>
        </div>
        <div className="tbar-right">
          <button className="tbar-btn" onClick={() => document.getElementById('sec-quiz').scrollIntoView({ behavior: 'smooth' })}>QUIZ</button>
          <button className="tbar-btn" onClick={() => document.getElementById('sec-firms').scrollIntoView({ behavior: 'smooth' })}>INDEX</button>
          <button className="tbar-btn" onClick={() => document.getElementById('sec-deals').scrollIntoView({ behavior: 'smooth' })}>DEALS</button>
          {user ? (
            <div
              className="tbar-avatar"
              style={{ backgroundImage: user.user_metadata?.avatar_url ? `url(${user.user_metadata.avatar_url})` : undefined }}
              onClick={() => setShowPanel(!showPanel)}
            />
          ) : (
            <button className="tbar-btn primary" onClick={() => setShowAuth(true)}>SIGN IN</button>
          )}
        </div>
      </div>

      {/* USER PANEL */}
      {user && showPanel && (
        <div className="user-panel">
          <div className="user-panel-hdr">
            <div
              className="user-panel-avatar"
              style={{ backgroundImage: user.user_metadata?.avatar_url ? `url(${user.user_metadata.avatar_url})` : undefined }}
            />
            <div>
              <div className="user-panel-name">{user.user_metadata?.username || user.email?.split('@')[0]}</div>
              <div className="user-panel-email">{user.email}</div>
            </div>
          </div>
          <button className="user-panel-item">MY DASHBOARD</button>
          <button className="user-panel-item">SUBMIT PURCHASE</button>
          <button className="user-panel-item">REWARDS STORE</button>
          <button className="user-panel-item" onClick={logout}>SIGN OUT</button>
        </div>
      )}

      <div className="app">
        {/* HERO */}
        <section className="hero">
          <div className="hero-meta">
            <span className="hero-meta-dot" />
            <span>SYSTEM STATUS: ONLINE</span>
            <span className="hero-meta-sep">·</span>
            <span>BROADCAST {fmt(time)}</span>
            <span className="hero-meta-sep">·</span>
            <span>Q2.2026</span>
          </div>
          <h1 className="hero-h1">
            The prop firm<br />
            <em>terminal.</em>
          </h1>
          <p className="hero-lead">
            Stop guessing. Pick the right futures prop firm with a six-question match quiz, an interactive drawdown simulator, and honest scorecards on every rule that matters.
          </p>
          <div className="hero-cta-row">
            <button className="hero-cta primary" onClick={() => document.getElementById('sec-quiz').scrollIntoView({ behavior: 'smooth' })}>
              RUN DIAGNOSTIC <span className="hero-cta-arrow">→</span>
            </button>
            <button className="hero-cta ghost" onClick={() => document.getElementById('sec-firms').scrollIntoView({ behavior: 'smooth' })}>
              BROWSE INDEX
            </button>
          </div>

          <div className="tstrip">
            <div className="tstrip-item">
              <div className="tstrip-k">FIRMS TRACKED</div>
              <div className="tstrip-v">{FIRMS.length}<small>LIVE</small></div>
            </div>
            <div className="tstrip-item">
              <div className="tstrip-k">ACTIVE DEALS</div>
              <div className="tstrip-v">{DEALS.length}<small>↑{topDeal.pct}% MAX</small></div>
            </div>
            <div className="tstrip-item">
              <div className="tstrip-k">TOP PULSE</div>
              <div className="tstrip-v">{Math.max(...Object.values(PULSE_SCORES))}<small>TRADEIFY</small></div>
            </div>
            <div className="tstrip-item">
              <div className="tstrip-k">UNIVERSAL CODE</div>
              <div className="tstrip-v" style={{ fontFamily: 'var(--mono)' }}>TPP<small>-10–90%</small></div>
            </div>
          </div>
        </section>

        {/* QUIZ SECTION */}
        <section className="sec" id="sec-quiz">
          <div className="sec-hd">
            <div className="sec-ix">01 / DIAGNOSTIC</div>
            <h2 className="sec-t">The <em>match quiz</em></h2>
            <div className="sec-sub">6 QUESTIONS · 30 SECONDS · NO SIGNUP</div>
          </div>
          <Quiz onDetail={f => setOpenFirm(f.id)} />
        </section>

        {/* FIRMS INDEX */}
        <section className="sec" id="sec-firms">
          <div className="sec-hd">
            <div className="sec-ix">02 / THE INDEX</div>
            <h2 className="sec-t">All <em>{FIRMS.length} firms</em>, ranked.</h2>
            <div className="sec-sub">CLICK ANY ROW TO EXPAND</div>
          </div>
          <div className="term">
            <div className="term-ctrl">
              <div className="term-filters">
                <button className={filter === 'all' ? 'on' : ''} onClick={() => setFilter('all')}>ALL</button>
                <button className={filter === 'instant' ? 'on' : ''} onClick={() => setFilter('instant')}>INSTANT</button>
                <button className={filter === 'noDLL' ? 'on' : ''} onClick={() => setFilter('noDLL')}>NO DLL</button>
                <button className={filter === 'noConsistency' ? 'on' : ''} onClick={() => setFilter('noConsistency')}>NO CONSISTENCY</button>
              </div>
              <div className="term-sort">
                <span className="term-sort-lbl">SORT</span>
                {[["pulse", "Pulse"], ["rating", "Rating"], ["newest", "Newest"], ["alloc", "Alloc"]].map(([k, l]) => (
                  <button key={k} className={sort === k ? 'on' : ''} onClick={() => setSort(k)}>{l}</button>
                ))}
              </div>
            </div>
            <div className="term-colhdr">
              <span>RANK</span>
              <span>FIRM</span>
              <span>PULSE</span>
              <span>RATING</span>
              <span>MAX ALLOC</span>
              <span>TYPE</span>
              <span>DEAL</span>
              <span></span>
            </div>
            {sorted.map((f, i) => (
              <FirmRow
                key={f.id}
                firm={f}
                rank={i + 1}
                open={openFirm === f.id}
                onToggle={() => setOpenFirm(openFirm === f.id ? null : f.id)}
                onDetail={() => {}}
                toggleCompare={toggleCompare}
                comparing={compareFirms.some(x => x.id === f.id)}
              />
            ))}
          </div>
        </section>

        {/* DEALS */}
        <section className="sec" id="sec-deals">
          <div className="sec-hd">
            <div className="sec-ix">03 / OFFERS</div>
            <h2 className="sec-t">Active <em>discount codes</em></h2>
            <div className="sec-sub">{DEALS.length} DEALS · COPY CODE AT CHECKOUT</div>
          </div>
          <div className="deals">
            {DEALS.map((d, i) => {
              const f = FIRMS.find(ff => ff.name === d.firm);
              return (
                <button key={i} className="deals-row" onClick={() => f && trackClick(f.name)}>
                  <div className="deals-row-firm">
                    {f && (
                      <div className="deals-row-logo"><img src={LOGOS[f.name]} alt="" /></div>
                    )}
                    {d.firm}
                  </div>
                  <div className="deals-row-pct">{d.pct.split('%')[0]}<em>%OFF</em></div>
                  <div className="deals-row-desc">{d.desc}</div>
                  <div className="deals-row-code">CODE: <b>{d.code}</b></div>
                </button>
              );
            })}
          </div>
        </section>

        {/* CHALLENGES */}
        <section className="sec" id="sec-challenges">
          <div className="sec-hd">
            <div className="sec-ix">04 / MATRIX</div>
            <h2 className="sec-t">Challenge <em>comparison</em></h2>
            <div className="sec-sub">ALL PLANS · FILTER BY FIRM / SIZE</div>
          </div>
          <ChallengesTable />
        </section>

        {/* SIMULATOR */}
        <section className="sec" id="sec-sim">
          <div className="sec-hd">
            <div className="sec-ix">05 / SIMULATOR</div>
            <h2 className="sec-t">Drawdown <em>simulator</em></h2>
            <div className="sec-sub">SEE WHERE YOUR FLOOR MOVES</div>
          </div>
          <Sim />
        </section>

        {/* RESEARCH */}
        <section className="sec" id="sec-research">
          <div className="sec-hd">
            <div className="sec-ix">06 / DISPATCH</div>
            <h2 className="sec-t">Research <em>&amp; analysis</em></h2>
            <div className="sec-sub">DATA-DRIVEN INSIGHTS FOR PROP TRADERS</div>
          </div>
          <div className="rsearch">
            {BLOG.slice(0, 1).map(p => (
              <div key={p.id} className="rsearch-main" onClick={() => window.open('#', '_self')}>
                <div className="rsearch-cat">{p.cat.toUpperCase()}</div>
                <h3 className="rsearch-h">{p.title}</h3>
                <p className="rsearch-excerpt">{p.excerpt}</p>
                <div className="rsearch-date">{p.date.toUpperCase()} · {p.time}</div>
              </div>
            ))}
            {BLOG.slice(1, 3).map(p => (
              <div key={p.id} className="rsearch-sub">
                <div className="rsearch-sub-cat">{p.cat.toUpperCase()}</div>
                <h4 className="rsearch-sub-h">{p.title}</h4>
                <div className="rsearch-sub-date">{p.date.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </section>

        {/* REWARDS */}
        <section className="sec" id="sec-rewards">
          <div className="sec-hd">
            <div className="sec-ix">07 / LOYALTY</div>
            <h2 className="sec-t">Earn <em>PulsePoints</em></h2>
            <div className="sec-sub">BUY · SUBMIT · REDEEM</div>
          </div>
          <div className="rw">
            <div>
              <div className="rw-eye">THE PULSEPOINTS PROGRAM</div>
              <h3 className="rw-h">Get <em>paid</em> to pick the right firm.</h3>
              <p className="rw-d">Every purchase you make with code TPP earns PulsePoints. Redeem them for free prop accounts, exclusive discounts, and community perks.</p>
              <button className="hero-cta primary" onClick={() => user ? setShowPanel(true) : setShowAuth(true)}>
                {user ? 'VIEW DASHBOARD' : 'JOIN THE PROGRAM'} <span className="hero-cta-arrow">→</span>
              </button>
            </div>
            <div className="rw-steps">
              <div className="rw-step">
                <div className="rw-step-n">01</div>
                <div>
                  <div className="rw-step-t">Sign up</div>
                  <div className="rw-step-s">FREE · 30 SECONDS</div>
                </div>
              </div>
              <div className="rw-step">
                <div className="rw-step-n">02</div>
                <div>
                  <div className="rw-step-t">Buy with TPP</div>
                  <div className="rw-step-s">SAVE 10–90% AT CHECKOUT</div>
                </div>
              </div>
              <div className="rw-step">
                <div className="rw-step-n">03</div>
                <div>
                  <div className="rw-step-t">Submit proof</div>
                  <div className="rw-step-s">RECEIPT SCREENSHOT</div>
                </div>
              </div>
              <div className="rw-step">
                <div className="rw-step-n">04</div>
                <div>
                  <div className="rw-step-t">Earn &amp; redeem</div>
                  <div className="rw-step-s">FREE ACCOUNTS + PERKS</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="ftr">
          <div>
            <div className="ftr-brand">The <em>PropPulse</em></div>
            <p className="ftr-tag">"A trader's guide to futures prop firms. Quiz-matched recommendations, interactive drawdown sims, and honest scorecards."</p>
            <div className="ftr-mono">© 2026 PROPPULSE MEDIA · ALL RIGHTS RESERVED</div>
          </div>
          <div className="ftr-col">
            <h4>Navigate</h4>
            <button onClick={() => document.getElementById('sec-firms').scrollIntoView({ behavior: 'smooth' })}>The Index</button>
            <button onClick={() => document.getElementById('sec-quiz').scrollIntoView({ behavior: 'smooth' })}>Match Quiz</button>
            <button onClick={() => document.getElementById('sec-sim').scrollIntoView({ behavior: 'smooth' })}>Simulator</button>
            <button onClick={() => document.getElementById('sec-deals').scrollIntoView({ behavior: 'smooth' })}>Deals</button>
            <button onClick={() => document.getElementById('sec-challenges').scrollIntoView({ behavior: 'smooth' })}>Challenges</button>
          </div>
          <div className="ftr-col">
            <h4>Resources</h4>
            <button onClick={() => document.getElementById('sec-research').scrollIntoView({ behavior: 'smooth' })}>Research</button>
            <button onClick={() => document.getElementById('sec-rewards').scrollIntoView({ behavior: 'smooth' })}>PulsePoints</button>
            <a href="https://discord.gg/pP9vfJ7WqK" target="_blank" rel="noreferrer">Discord</a>
            <a href="https://x.com/PropPulseMedia" target="_blank" rel="noreferrer">Twitter / X</a>
            <a href="https://www.youtube.com/@ThePropPulse" target="_blank" rel="noreferrer">YouTube</a>
          </div>
          <div className="ftr-col">
            <h4>Disclosure</h4>
            <p style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--txt4)', lineHeight: 1.55, letterSpacing: 0.3 }}>
              PropPulse may earn a commission on partner firms. We never rank by commission — only by trader outcome. See methodology.
            </p>
          </div>
          <div className="ftr-btm">
            <span>BUILT FOR FUTURES TRADERS · NO AFFILIATION WITHOUT DISCLOSURE</span>
            <span>{fmt(time)}</span>
          </div>
        </footer>
      </div>

      {/* COMPARE TRAY */}
      {compareFirms.length >= 2 && (
        <div className="cmp-tray">
          <div className="cmp-tray-firms">
            {compareFirms.map(f => <div key={f.id} className="cmp-tray-chip">{f.name}</div>)}
          </div>
          <button className="cmp-tray-go">COMPARE {compareFirms.length}</button>
          <button className="cmp-tray-clear" onClick={() => setCompareFirms([])}>CLEAR</button>
        </div>
      )}

      {/* AUTH MODAL */}
      {showAuth && <Auth onClose={() => setShowAuth(false)} onAuth={u => { setUser(u); setShowAuth(false); }} />}
    </>
  );
}
