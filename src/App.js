// ═══════════════════════════════════════════════════════════════════════════
// PropPulse — multi-page rebuild
// Design: "Paper & Ink" — warm light theme, deep navy text, coral accent
// Multi-page hash routing. Each section is its own page.
// Typography: Manrope (primary) with Fraunces for selective display serif
// ═══════════════════════════════════════════════════════════════════════════

import { useState, useEffect, useMemo } from "react";
import { createClient } from "@supabase/supabase-js";
import {
  LOGOS, FIRMS, DEALS, BLOG, CHALLENGES, FUNDED_OVERRIDES,
  PULSE_SCORES, AFFILIATE_LINKS, FIRM_PROFILES, FIRM_FAQ,
  QUIZ_QUESTIONS, DD_SCENARIOS, FIRM_DD_CONFIG,
  SCORECARD_DATA
} from "./data";

// ── SUPABASE (unchanged) ────────────────────────────────────────────────────
const supabase = createClient(
  "https://lwwtosuwfdliahoyqakx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3d3Rvc3V3ZmRsaWFob3lxYWt4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3NDM0NDYsImV4cCI6MjA5MTMxOTQ0Nn0.RCcNmkTsgjInRlL3PwK2AP5bUUTx5G3f2XqYu0OrquU"
);

const trackClick = async (firmName) => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) await supabase.from("click_tracking").insert({ user_id: session.user.id, firm: firmName });
  } catch {}
  const url = AFFILIATE_LINKS[firmName];
  if (url) window.open(url, "_blank");
};

// ── HASH ROUTER ─────────────────────────────────────────────────────────────
const useRoute = () => {
  const [route, setRoute] = useState(() => window.location.hash.slice(1) || "/");
  useEffect(() => {
    const h = () => setRoute(window.location.hash.slice(1) || "/");
    window.addEventListener("hashchange", h);
    return () => window.removeEventListener("hashchange", h);
  }, []);
  return route;
};

const navigate = (path) => {
  window.location.hash = path;
  window.scrollTo({ top: 0, behavior: "instant" });
};

// ═══════════════════════════════════════════════════════════════════════════
// STYLES — "Paper & Ink"
// ═══════════════════════════════════════════════════════════════════════════
const css = `
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&display=swap');

:root {
  --paper: #f5f0e6;
  --paper2: #efe9dc;
  --paper3: #e8e1d0;
  --card: #fffdf7;
  --ink: #1a1d29;
  --ink2: #3b3f52;
  --ink3: #6b6f80;
  --ink4: #9b9ea8;
  --ink5: #c7c8cc;
  --line: rgba(26,29,41,0.08);
  --line2: rgba(26,29,41,0.14);
  --accent: #e14b35;
  --accent2: #c63c29;
  --accentA: rgba(225,75,53,0.08);
  --accentA2: rgba(225,75,53,0.14);
  --sage: #4a7c59;
  --gold: #b8893b;
  --shade: 0 1px 2px rgba(26,29,41,0.04), 0 4px 12px rgba(26,29,41,0.04);
  --shade2: 0 2px 4px rgba(26,29,41,0.05), 0 12px 32px rgba(26,29,41,0.08);
  --sans: 'Manrope', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
  --serif: 'Fraunces', Georgia, serif;
}

* { margin: 0; padding: 0; box-sizing: border-box; }
html, body, #root {
  background: var(--paper);
  color: var(--ink);
  font-family: var(--sans);
  font-size: 15px;
  line-height: 1.55;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
  font-feature-settings: 'ss01', 'cv01';
}

/* Subtle paper texture */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image:
    radial-gradient(circle at 1px 1px, rgba(26,29,41,0.025) 1px, transparent 0);
  background-size: 18px 18px;
  pointer-events: none;
  z-index: 0;
}

::-webkit-scrollbar { width: 10px; height: 10px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(26,29,41,0.15); border-radius: 10px; }
::-webkit-scrollbar-thumb:hover { background: rgba(26,29,41,0.3); }
::selection { background: var(--accent); color: var(--card); }

a { color: inherit; text-decoration: none; }
button { cursor: pointer; border: none; background: none; color: inherit; font-family: inherit; }

/* ═══ NAVIGATION ═══ */
.nav {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(245,240,230,0.85);
  backdrop-filter: blur(16px) saturate(1.2);
  border-bottom: 1px solid var(--line);
}
.nav-inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: 18px 40px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 40px;
}
.nav-logo {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 20px;
  font-weight: 800;
  letter-spacing: -0.6px;
  color: var(--ink);
  cursor: pointer;
}
.nav-logo-dot {
  width: 10px;
  height: 10px;
  background: var(--accent);
  border-radius: 3px;
  transform: rotate(45deg);
}
.nav-logo span {
  font-family: var(--serif);
  font-style: italic;
  font-weight: 500;
  color: var(--accent);
}
.nav-links {
  display: flex;
  gap: 4px;
  justify-self: center;
}
.nav-link {
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  color: var(--ink2);
  border-radius: 8px;
  transition: all 0.15s;
  letter-spacing: -0.1px;
}
.nav-link:hover { color: var(--ink); background: var(--paper2); }
.nav-link.active {
  color: var(--accent);
  background: var(--accentA);
}
.nav-right { display: flex; gap: 10px; align-items: center; }
.nav-btn {
  padding: 9px 18px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.15s;
  letter-spacing: -0.1px;
}
.nav-btn.ghost {
  color: var(--ink);
  border: 1px solid var(--line2);
}
.nav-btn.ghost:hover { border-color: var(--ink); }
.nav-btn.primary {
  background: var(--ink);
  color: var(--paper);
}
.nav-btn.primary:hover { background: var(--ink2); transform: translateY(-1px); }
.nav-avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: var(--ink);
  background-size: cover;
  background-position: center;
  cursor: pointer;
  border: 2px solid var(--paper);
  box-shadow: 0 0 0 1px var(--line2);
}

.nav-mob {
  display: none;
  background: transparent;
  font-size: 22px;
  color: var(--ink);
}
.nav-mob-menu {
  display: none;
  padding: 12px 24px 20px;
  border-top: 1px solid var(--line);
  background: rgba(245,240,230,0.95);
}
.nav-mob-menu .nav-link {
  display: block;
  padding: 10px 14px;
  margin-bottom: 2px;
}

/* ═══ LAYOUT ═══ */
.page {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
  position: relative;
  z-index: 1;
}
.page-hd {
  padding: 80px 0 48px;
  max-width: 900px;
}
.page-eye {
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  color: var(--accent);
  letter-spacing: 1.2px;
  text-transform: uppercase;
  margin-bottom: 18px;
  padding: 5px 12px;
  background: var(--accentA);
  border-radius: 20px;
}
.page-t {
  font-family: var(--serif);
  font-size: clamp(40px, 6vw, 72px);
  font-weight: 400;
  letter-spacing: -2px;
  line-height: 1;
  color: var(--ink);
  margin-bottom: 20px;
}
.page-t em {
  font-style: italic;
  color: var(--accent);
  font-weight: 400;
}
.page-d {
  font-size: 18px;
  color: var(--ink3);
  max-width: 640px;
  line-height: 1.55;
  font-weight: 400;
}

/* ═══ HOME HERO ═══ */
.home-hero {
  padding: 100px 0 80px;
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 80px;
  align-items: center;
}
.home-eye {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  color: var(--accent);
  letter-spacing: -0.2px;
  margin-bottom: 28px;
}
.home-eye::before {
  content: '';
  width: 30px;
  height: 1.5px;
  background: var(--accent);
}
.home-h1 {
  font-family: var(--serif);
  font-size: clamp(52px, 7.5vw, 104px);
  font-weight: 400;
  letter-spacing: -3px;
  line-height: 0.96;
  color: var(--ink);
  margin-bottom: 32px;
}
.home-h1 em {
  font-style: italic;
  color: var(--accent);
  font-weight: 400;
}
.home-h1 u {
  text-decoration: none;
  background: linear-gradient(transparent 62%, rgba(225,75,53,0.25) 62%);
  padding: 0 4px;
}
.home-lead {
  font-size: 19px;
  color: var(--ink3);
  max-width: 520px;
  line-height: 1.55;
  margin-bottom: 40px;
  font-weight: 400;
}
.home-cta {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 48px;
}
.btn-pri {
  background: var(--accent);
  color: #fff;
  padding: 16px 32px;
  border-radius: 999px;
  font-size: 15px;
  font-weight: 700;
  transition: all 0.18s;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  letter-spacing: -0.1px;
  box-shadow: 0 4px 14px rgba(225,75,53,0.25);
}
.btn-pri:hover {
  background: var(--accent2);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(225,75,53,0.35);
}
.btn-pri-arrow { transition: transform 0.2s; }
.btn-pri:hover .btn-pri-arrow { transform: translateX(4px); }
.btn-sec {
  background: transparent;
  color: var(--ink);
  padding: 16px 28px;
  border-radius: 999px;
  font-size: 15px;
  font-weight: 600;
  border: 1.5px solid var(--ink);
  transition: all 0.18s;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  letter-spacing: -0.1px;
}
.btn-sec:hover { background: var(--ink); color: var(--paper); transform: translateY(-2px); }
.home-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
  padding-top: 40px;
  border-top: 1px solid var(--line);
}
.home-metric-v {
  font-family: var(--serif);
  font-size: 40px;
  font-weight: 400;
  letter-spacing: -1.2px;
  line-height: 1;
  color: var(--ink);
}
.home-metric-v em { font-style: italic; color: var(--accent); font-weight: 400; }
.home-metric-l {
  font-size: 12px;
  font-weight: 600;
  color: var(--ink3);
  letter-spacing: -0.1px;
  margin-top: 6px;
}

/* Home hero feature image */
.home-feat {
  position: relative;
  aspect-ratio: 3/4;
  max-height: 620px;
}
.home-feat-card {
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 24px;
  padding: 36px 32px;
  box-shadow: var(--shade2);
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 420px;
}
.home-feat-cat {
  font-size: 11px;
  font-weight: 700;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 1.4px;
  margin-bottom: 16px;
}
.home-feat-logo { margin-bottom: 18px; }
.home-feat-nm {
  font-family: var(--serif);
  font-size: 36px;
  font-weight: 400;
  letter-spacing: -1px;
  line-height: 1;
  color: var(--ink);
  margin-bottom: 10px;
}
.home-feat-tag {
  font-size: 13px;
  color: var(--ink3);
  font-weight: 500;
  margin-bottom: 22px;
}
.home-feat-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  padding: 20px 0;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  margin-bottom: 22px;
}
.home-feat-stat b {
  display: block;
  font-family: var(--serif);
  font-size: 26px;
  font-weight: 400;
  color: var(--ink);
  letter-spacing: -0.5px;
  line-height: 1;
}
.home-feat-stat span {
  font-size: 10px;
  font-weight: 600;
  color: var(--ink4);
  text-transform: uppercase;
  letter-spacing: 1.2px;
  margin-top: 5px;
  display: block;
}
.home-feat-deal {
  font-size: 14px;
  color: var(--ink2);
  font-weight: 500;
}
.home-feat-deal b {
  background: var(--accentA);
  color: var(--accent);
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 4px;
  margin: 0 4px;
  letter-spacing: -0.1px;
}
.home-feat-sticker {
  position: absolute;
  bottom: 20px;
  left: 20px;
  background: var(--accent);
  color: #fff;
  padding: 14px 22px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: -0.1px;
  box-shadow: var(--shade2);
  transform: rotate(-6deg);
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.home-feat-sticker::before { content: '★'; }

/* ═══ HOME SECTIONS ═══ */
.home-sec {
  padding: 80px 0;
  border-top: 1px solid var(--line);
}
.home-sec-hd {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 40px;
  flex-wrap: wrap;
  gap: 20px;
}
.home-sec-t {
  font-family: var(--serif);
  font-size: 48px;
  font-weight: 400;
  letter-spacing: -1.5px;
  line-height: 1;
  color: var(--ink);
}
.home-sec-t em { font-style: italic; color: var(--accent); font-weight: 400; }
.home-sec-sub {
  font-size: 14px;
  color: var(--ink3);
  font-weight: 500;
  margin-top: 6px;
}
.home-sec-link {
  color: var(--ink);
  font-size: 14px;
  font-weight: 600;
  padding: 10px 18px;
  border: 1.5px solid var(--line2);
  border-radius: 999px;
  transition: all 0.15s;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  letter-spacing: -0.1px;
}
.home-sec-link:hover {
  background: var(--ink);
  color: var(--paper);
  border-color: var(--ink);
}

/* ═══ FIRM CARDS (home + firms page) ═══ */
.firm-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.firm-card {
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 28px;
  cursor: pointer;
  transition: all 0.22s;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shade);
}
.firm-card:hover {
  border-color: var(--line2);
  transform: translateY(-4px);
  box-shadow: var(--shade2);
}
.firm-card-tag {
  position: absolute;
  top: 16px;
  right: 16px;
  font-size: 10px;
  font-weight: 700;
  color: var(--accent);
  background: var(--accentA);
  padding: 4px 10px;
  border-radius: 999px;
  letter-spacing: 0.4px;
  text-transform: uppercase;
}
.firm-card-hd {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 20px;
}
.firm-logo {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  overflow: hidden;
  background: var(--paper2);
  border: 1px solid var(--line);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.firm-logo img { width: 100%; height: 100%; object-fit: contain; padding: 4px; }
.firm-logo-fb {
  font-size: 13px;
  font-weight: 800;
  color: var(--ink3);
}
.firm-card-nm {
  font-family: var(--serif);
  font-size: 24px;
  font-weight: 500;
  letter-spacing: -0.5px;
  line-height: 1.05;
  color: var(--ink);
  margin-bottom: 2px;
}
.firm-card-meta {
  font-size: 12px;
  color: var(--ink4);
  font-weight: 500;
  letter-spacing: -0.1px;
}
.firm-card-pulse {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 0;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  margin-bottom: 16px;
}
.firm-card-pulse-l {
  font-size: 11px;
  font-weight: 700;
  color: var(--ink4);
  text-transform: uppercase;
  letter-spacing: 1px;
}
.firm-card-pulse-v {
  font-family: var(--serif);
  font-size: 32px;
  font-weight: 400;
  color: var(--accent);
  letter-spacing: -0.8px;
  line-height: 1;
}
.firm-card-rating {
  font-size: 13px;
  color: var(--ink2);
  font-weight: 600;
}
.firm-card-rating em {
  font-style: normal;
  color: var(--ink4);
  font-weight: 500;
  margin-left: 4px;
}
.firm-card-desc {
  font-size: 13.5px;
  color: var(--ink3);
  line-height: 1.55;
  margin-bottom: 22px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}
.firm-card-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}
.firm-card-deal {
  font-size: 12px;
  font-weight: 700;
  color: var(--accent);
  background: var(--accentA);
  padding: 6px 12px;
  border-radius: 6px;
  letter-spacing: -0.1px;
}
.firm-card-view {
  font-size: 13px;
  font-weight: 600;
  color: var(--ink);
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.15s;
}
.firm-card:hover .firm-card-view { color: var(--accent); }
.firm-card-view-arrow { transition: transform 0.2s; }
.firm-card:hover .firm-card-view-arrow { transform: translateX(3px); }

/* ═══ FIRM DETAIL PAGE ═══ */
.detail-back {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--ink3);
  font-size: 14px;
  font-weight: 500;
  padding: 12px 0;
  margin-top: 24px;
  transition: color 0.15s;
}
.detail-back:hover { color: var(--accent); }
.detail-hero {
  padding: 40px 0 60px;
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 60px;
  align-items: center;
  border-bottom: 1px solid var(--line);
}
.detail-eye {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 700;
  color: var(--accent);
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 18px;
}
.detail-logo-lg {
  width: 72px;
  height: 72px;
  border-radius: 18px;
  overflow: hidden;
  background: var(--paper2);
  border: 1px solid var(--line);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}
.detail-logo-lg img { width: 100%; height: 100%; object-fit: contain; padding: 8px; }
.detail-nm {
  font-family: var(--serif);
  font-size: clamp(48px, 6vw, 72px);
  font-weight: 400;
  letter-spacing: -2.5px;
  line-height: 0.95;
  color: var(--ink);
  margin-bottom: 14px;
}
.detail-nm em { font-style: italic; color: var(--accent); font-weight: 400; }
.detail-tagline {
  font-size: 18px;
  color: var(--ink3);
  max-width: 580px;
  line-height: 1.55;
  margin-bottom: 28px;
  font-weight: 400;
}
.detail-meta {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 32px;
  font-size: 13px;
  color: var(--ink3);
  font-weight: 500;
}
.detail-meta b { color: var(--ink); }
.detail-side {
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 20px;
  padding: 30px;
  box-shadow: var(--shade);
}
.detail-side-pulse {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 22px;
  border-bottom: 1px solid var(--line);
  margin-bottom: 22px;
}
.detail-side-pulse-v {
  font-family: var(--serif);
  font-size: 64px;
  font-weight: 400;
  color: var(--accent);
  letter-spacing: -2px;
  line-height: 0.9;
}
.detail-side-pulse-l {
  text-align: right;
}
.detail-side-pulse-l b {
  display: block;
  font-size: 11px;
  font-weight: 700;
  color: var(--ink3);
  text-transform: uppercase;
  letter-spacing: 1.2px;
}
.detail-side-pulse-l span {
  display: block;
  font-size: 12px;
  color: var(--ink4);
  margin-top: 4px;
  font-weight: 500;
}
.detail-side-row {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  font-size: 13px;
  border-top: 1px solid var(--line);
}
.detail-side-row:first-child { border-top: none; }
.detail-side-row span { color: var(--ink3); font-weight: 500; }
.detail-side-row b { color: var(--ink); font-weight: 600; }
.detail-side-cta {
  margin-top: 22px;
  width: 100%;
  padding: 14px;
  text-align: center;
  border-radius: 999px;
  justify-content: center;
}

/* Detail sections */
.detail-sec {
  padding: 60px 0;
  border-bottom: 1px solid var(--line);
}
.detail-sec-t {
  font-family: var(--serif);
  font-size: 32px;
  font-weight: 400;
  letter-spacing: -1px;
  color: var(--ink);
  margin-bottom: 28px;
}
.detail-sec-t em { font-style: italic; color: var(--accent); }

.scorecard-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}
.scorecard-row {
  display: grid;
  grid-template-columns: 14px 160px 1fr;
  gap: 14px;
  align-items: center;
  padding: 14px 18px;
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 10px;
}
.scorecard-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.scorecard-dot.green { background: var(--sage); }
.scorecard-dot.yellow { background: var(--gold); }
.scorecard-dot.red { background: var(--accent); }
.scorecard-k {
  font-size: 13px;
  font-weight: 600;
  color: var(--ink);
  letter-spacing: -0.1px;
}
.scorecard-v {
  font-size: 13px;
  color: var(--ink3);
  line-height: 1.5;
}

.stat-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}
.stat-card {
  padding: 22px 24px;
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 14px;
}
.stat-k {
  font-size: 11px;
  font-weight: 700;
  color: var(--ink4);
  text-transform: uppercase;
  letter-spacing: 1.1px;
  margin-bottom: 10px;
}
.stat-v {
  font-family: var(--serif);
  font-size: 22px;
  font-weight: 500;
  color: var(--ink);
  letter-spacing: -0.4px;
  line-height: 1.25;
}

.faq-cat {
  margin-bottom: 28px;
}
.faq-cat-t {
  font-size: 15px;
  font-weight: 700;
  color: var(--accent);
  margin-bottom: 14px;
  letter-spacing: -0.2px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--line);
}
.faq-item {
  padding: 16px 0;
  border-bottom: 1px solid var(--line);
}
.faq-q {
  font-size: 15px;
  font-weight: 600;
  color: var(--ink);
  margin-bottom: 8px;
  letter-spacing: -0.2px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}
.faq-q::after {
  content: '+';
  font-size: 20px;
  font-weight: 400;
  color: var(--ink4);
  transition: transform 0.2s;
}
.faq-item.open .faq-q::after {
  content: '−';
  color: var(--accent);
}
.faq-a {
  display: none;
  font-size: 14px;
  color: var(--ink3);
  line-height: 1.65;
  padding-top: 8px;
}
.faq-item.open .faq-a { display: block; }

/* ═══ QUIZ PAGE ═══ */
.quiz-wrap {
  max-width: 720px;
  margin: 0 auto;
  padding: 80px 0 100px;
}
.quiz-prog {
  height: 3px;
  background: var(--paper3);
  border-radius: 999px;
  overflow: hidden;
  margin-bottom: 14px;
}
.quiz-prog span {
  display: block;
  height: 100%;
  background: var(--accent);
  transition: width 0.4s ease;
  border-radius: 999px;
}
.quiz-step {
  font-size: 12px;
  font-weight: 700;
  color: var(--accent);
  letter-spacing: 1.2px;
  text-transform: uppercase;
  margin-bottom: 14px;
}
.quiz-q {
  font-family: var(--serif);
  font-size: 52px;
  font-weight: 400;
  letter-spacing: -1.8px;
  line-height: 1.02;
  color: var(--ink);
  margin-bottom: 14px;
}
.quiz-sub {
  font-size: 16px;
  color: var(--ink3);
  margin-bottom: 40px;
  font-weight: 400;
}
.quiz-opts { display: flex; flex-direction: column; gap: 10px; margin-bottom: 32px; }
.quiz-opt {
  background: var(--card);
  border: 1.5px solid var(--line);
  border-radius: 14px;
  padding: 22px 26px;
  text-align: left;
  transition: all 0.18s;
  display: flex;
  align-items: center;
  gap: 20px;
}
.quiz-opt:hover {
  border-color: var(--accent);
  transform: translateX(4px);
  box-shadow: var(--shade);
}
.quiz-opt-letter {
  width: 36px;
  height: 36px;
  border: 1.5px solid var(--line2);
  border-radius: 50%;
  font-size: 13px;
  font-weight: 700;
  color: var(--ink3);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s;
}
.quiz-opt:hover .quiz-opt-letter {
  border-color: var(--accent);
  background: var(--accent);
  color: #fff;
}
.quiz-opt-content { flex: 1; min-width: 0; }
.quiz-opt-l {
  font-size: 17px;
  font-weight: 600;
  color: var(--ink);
  letter-spacing: -0.2px;
}
.quiz-opt-d {
  font-size: 13px;
  color: var(--ink4);
  margin-top: 3px;
  font-weight: 500;
}
.quiz-opt-arr {
  font-size: 18px;
  color: var(--ink5);
  transition: all 0.2s;
}
.quiz-opt:hover .quiz-opt-arr { color: var(--accent); transform: translateX(4px); }
.quiz-back-btn {
  font-size: 13px;
  font-weight: 600;
  color: var(--ink3);
  padding: 10px 18px;
  border-radius: 999px;
  transition: all 0.15s;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.quiz-back-btn:hover { color: var(--accent); }

.results-hd {
  padding: 60px 0 32px;
  text-align: center;
}
.results-tag {
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  color: var(--accent);
  padding: 5px 14px;
  background: var(--accentA);
  border-radius: 20px;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  margin-bottom: 18px;
}
.results-t {
  font-family: var(--serif);
  font-size: 48px;
  font-weight: 400;
  letter-spacing: -1.5px;
  line-height: 1;
  color: var(--ink);
  margin-bottom: 14px;
}
.results-t em { font-style: italic; color: var(--accent); }
.results-sub { font-size: 16px; color: var(--ink3); font-weight: 500; }
.result-row {
  display: grid;
  grid-template-columns: 40px 52px 1fr 80px auto;
  gap: 20px;
  align-items: center;
  padding: 22px 26px;
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 16px;
  margin-bottom: 10px;
  transition: all 0.18s;
  box-shadow: var(--shade);
}
.result-row:hover { transform: translateY(-2px); box-shadow: var(--shade2); }
.result-row.top { border-color: var(--accent); background: linear-gradient(90deg, rgba(225,75,53,0.04), var(--card)); }
.result-rank {
  font-size: 13px;
  font-weight: 700;
  color: var(--ink4);
  letter-spacing: -0.1px;
}
.result-nm {
  font-family: var(--serif);
  font-size: 22px;
  font-weight: 500;
  color: var(--ink);
  letter-spacing: -0.5px;
  line-height: 1.1;
  margin-bottom: 4px;
}
.result-reasons {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 10px;
  font-size: 12px;
  color: var(--ink3);
  font-weight: 500;
}
.result-reasons span::before { content: '✓ '; color: var(--sage); font-weight: 700; }
.result-score {
  font-family: var(--serif);
  font-size: 36px;
  color: var(--accent);
  font-weight: 400;
  letter-spacing: -0.8px;
  line-height: 1;
  text-align: right;
}
.result-score small {
  display: block;
  font-family: var(--sans);
  font-size: 10px;
  color: var(--ink4);
  font-weight: 700;
  letter-spacing: 1px;
  margin-top: 4px;
}
.result-act {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.result-btn {
  padding: 8px 16px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 999px;
  border: 1.5px solid var(--line2);
  color: var(--ink);
  white-space: nowrap;
  transition: all 0.15s;
}
.result-btn:hover { border-color: var(--ink); }
.result-btn.primary { background: var(--accent); color: #fff; border-color: var(--accent); }
.result-btn.primary:hover { background: var(--accent2); }

/* ═══ DEALS PAGE ═══ */
.deals-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}
.deal-card {
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 28px;
  transition: all 0.2s;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  box-shadow: var(--shade);
}
.deal-card:hover { transform: translateY(-3px); box-shadow: var(--shade2); border-color: var(--accent); }
.deal-card-tag {
  position: absolute;
  top: 18px;
  right: 18px;
  font-size: 10px;
  font-weight: 700;
  color: var(--gold);
  background: rgba(184,137,59,0.12);
  padding: 4px 10px;
  border-radius: 999px;
  letter-spacing: 0.4px;
  text-transform: uppercase;
}
.deal-card-hd {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}
.deal-card-nm {
  font-family: var(--serif);
  font-size: 18px;
  font-weight: 500;
  color: var(--ink);
  letter-spacing: -0.3px;
}
.deal-card-pct {
  font-family: var(--serif);
  font-size: 64px;
  font-weight: 400;
  color: var(--accent);
  line-height: 0.9;
  letter-spacing: -2.5px;
  margin-bottom: 6px;
}
.deal-card-pct em {
  font-family: var(--sans);
  font-size: 16px;
  font-weight: 700;
  color: var(--ink4);
  font-style: normal;
  vertical-align: top;
  letter-spacing: -0.2px;
  margin-left: 4px;
}
.deal-card-desc {
  font-size: 13px;
  color: var(--ink3);
  line-height: 1.55;
  margin-bottom: 18px;
}
.deal-card-code {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 18px;
  border-top: 1px solid var(--line);
}
.deal-card-code-l { font-size: 11px; font-weight: 700; color: var(--ink4); text-transform: uppercase; letter-spacing: 1px; }
.deal-card-code-v {
  font-size: 15px;
  font-weight: 800;
  color: var(--ink);
  padding: 6px 14px;
  background: var(--paper2);
  border-radius: 8px;
  border: 1px dashed var(--ink3);
  letter-spacing: -0.2px;
}

/* ═══ CHALLENGES PAGE ═══ */
.chal-filters {
  display: flex;
  gap: 10px;
  margin-bottom: 28px;
  flex-wrap: wrap;
  align-items: center;
}
.chal-filters select {
  padding: 11px 18px;
  border: 1.5px solid var(--line2);
  border-radius: 999px;
  background: var(--card);
  color: var(--ink);
  font-size: 13px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  outline: none;
  transition: border 0.15s;
}
.chal-filters select:focus, .chal-filters select:hover { border-color: var(--accent); }
.chal-filters button {
  padding: 11px 18px;
  border: 1.5px solid var(--line2);
  border-radius: 999px;
  background: var(--card);
  color: var(--ink2);
  font-size: 13px;
  font-weight: 600;
  transition: all 0.15s;
  letter-spacing: -0.1px;
}
.chal-filters button:hover { border-color: var(--ink); }
.chal-filters button.on { background: var(--accent); color: #fff; border-color: var(--accent); }

.chal-tbl {
  width: 100%;
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 16px;
  border-collapse: separate;
  border-spacing: 0;
  overflow: hidden;
  font-size: 13px;
}
.chal-tbl thead th {
  font-size: 11px;
  font-weight: 700;
  color: var(--ink4);
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 16px 18px;
  text-align: left;
  background: var(--paper2);
  border-bottom: 1px solid var(--line);
}
.chal-tbl tbody td {
  padding: 18px;
  border-bottom: 1px solid var(--line);
  vertical-align: middle;
  color: var(--ink2);
  font-weight: 500;
}
.chal-tbl tbody tr:hover td { background: var(--paper2); }
.chal-tbl tbody tr:last-child td { border-bottom: none; }
.chal-tbl-firm {
  display: flex;
  align-items: center;
  gap: 10px;
}
.chal-tbl-firm img {
  width: 24px;
  height: 24px;
  border-radius: 6px;
  border: 1px solid var(--line);
  background: var(--paper2);
  padding: 2px;
}
.chal-tbl-firm b {
  font-family: var(--serif);
  font-size: 15px;
  font-weight: 500;
  color: var(--ink);
  letter-spacing: -0.3px;
}
.chal-tbl-plan {
  font-size: 12px;
  font-weight: 700;
  color: var(--accent);
  margin-top: 2px;
}
.chal-tbl-price {
  font-family: var(--serif);
  font-size: 18px;
  font-weight: 500;
  color: var(--ink);
  letter-spacing: -0.3px;
}

/* ═══ SIMULATOR ═══ */
.sim-wrap {
  max-width: 880px;
  margin: 0 auto;
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 20px;
  padding: 36px;
  box-shadow: var(--shade);
}
.sim-ctrls {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 24px;
}
.sim-ctrl-l {
  display: block;
  font-size: 11px;
  font-weight: 700;
  color: var(--ink4);
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 8px;
}
.sim-ctrl-s {
  width: 100%;
  padding: 13px 16px;
  border: 1.5px solid var(--line2);
  border-radius: 10px;
  background: var(--card);
  color: var(--ink);
  font-size: 14px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  outline: none;
  transition: border 0.15s;
}
.sim-ctrl-s:focus, .sim-ctrl-s:hover { border-color: var(--accent); }
.sim-chart {
  background: var(--paper2);
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 20px;
  margin-bottom: 18px;
}
.sim-chart svg { width: 100%; height: auto; display: block; }
.sim-verdict {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 20px 24px;
  border-radius: 14px;
  margin-bottom: 16px;
}
.sim-verdict.pass { background: rgba(74,124,89,0.08); border: 1px solid rgba(74,124,89,0.3); }
.sim-verdict.fail { background: rgba(225,75,53,0.06); border: 1px solid rgba(225,75,53,0.3); }
.sim-verdict-ic {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  font-size: 24px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.sim-verdict.pass .sim-verdict-ic { background: var(--sage); color: #fff; }
.sim-verdict.fail .sim-verdict-ic { background: var(--accent); color: #fff; }
.sim-verdict-t {
  font-family: var(--serif);
  font-size: 22px;
  font-weight: 500;
  color: var(--ink);
  letter-spacing: -0.4px;
  margin-bottom: 3px;
}
.sim-verdict-d {
  font-size: 13px;
  color: var(--ink3);
  line-height: 1.55;
}
.sim-legend {
  display: flex;
  gap: 20px;
  padding-top: 14px;
  border-top: 1px solid var(--line);
  font-size: 12px;
  color: var(--ink3);
  font-weight: 500;
  flex-wrap: wrap;
}
.sim-legend span { display: inline-flex; align-items: center; gap: 8px; }
.sim-legend-dot { width: 16px; height: 3px; border-radius: 2px; display: inline-block; }
.sim-info { margin-left: auto; }
.sim-info b { color: var(--ink); font-weight: 700; }

/* ═══ RESEARCH ═══ */
.research-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
}
.research-feat {
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 20px;
  padding: 44px;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: var(--shade);
}
.research-feat:hover { transform: translateY(-3px); box-shadow: var(--shade2); }
.research-cat {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  color: var(--accent);
  padding: 4px 10px;
  background: var(--accentA);
  border-radius: 20px;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 20px;
}
.research-t {
  font-family: var(--serif);
  font-size: 40px;
  font-weight: 400;
  letter-spacing: -1.2px;
  line-height: 1.05;
  color: var(--ink);
  margin-bottom: 14px;
}
.research-excerpt {
  font-size: 16px;
  color: var(--ink3);
  line-height: 1.55;
  margin-bottom: 20px;
}
.research-date {
  font-size: 12px;
  color: var(--ink4);
  font-weight: 500;
}
.research-side { display: flex; flex-direction: column; gap: 14px; }
.research-card {
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 16px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: var(--shade);
}
.research-card:hover { transform: translateY(-2px); box-shadow: var(--shade2); }
.research-card .research-cat { margin-bottom: 12px; }
.research-card-t {
  font-family: var(--serif);
  font-size: 19px;
  font-weight: 500;
  letter-spacing: -0.4px;
  line-height: 1.2;
  color: var(--ink);
  margin-bottom: 10px;
}
.research-card-date { font-size: 11px; color: var(--ink4); font-weight: 500; }

/* ═══ REWARDS PAGE ═══ */
.rewards-wrap {
  max-width: 900px;
  margin: 0 auto;
}
.rewards-feature {
  background: linear-gradient(135deg, var(--card) 0%, var(--paper2) 100%);
  border: 1px solid var(--line);
  border-radius: 24px;
  padding: 56px 48px;
  text-align: center;
  margin-bottom: 40px;
  box-shadow: var(--shade);
}
.rewards-feature-tag {
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  color: var(--accent);
  padding: 5px 14px;
  background: var(--accentA);
  border-radius: 20px;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 20px;
}
.rewards-feature-t {
  font-family: var(--serif);
  font-size: 56px;
  font-weight: 400;
  letter-spacing: -2px;
  line-height: 1;
  color: var(--ink);
  margin-bottom: 20px;
}
.rewards-feature-t em { font-style: italic; color: var(--accent); }
.rewards-feature-d {
  font-size: 17px;
  color: var(--ink3);
  max-width: 560px;
  margin: 0 auto 32px;
  line-height: 1.55;
  font-weight: 400;
}
.rewards-steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
.rewards-step {
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 24px 20px;
  text-align: left;
}
.rewards-step-n {
  font-family: var(--serif);
  font-size: 28px;
  font-weight: 400;
  color: var(--accent);
  letter-spacing: -0.5px;
  line-height: 1;
  margin-bottom: 14px;
}
.rewards-step-t {
  font-size: 16px;
  font-weight: 700;
  color: var(--ink);
  letter-spacing: -0.3px;
  margin-bottom: 6px;
}
.rewards-step-d {
  font-size: 13px;
  color: var(--ink3);
  line-height: 1.5;
  font-weight: 500;
}

/* ═══ FOOTER ═══ */
.ftr {
  margin-top: 100px;
  padding: 60px 40px 40px;
  border-top: 1px solid var(--line);
  background: var(--paper2);
}
.ftr-inner {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 48px;
}
.ftr-brand {
  font-size: 22px;
  font-weight: 800;
  color: var(--ink);
  letter-spacing: -0.5px;
  margin-bottom: 14px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
}
.ftr-brand span {
  font-family: var(--serif);
  font-style: italic;
  font-weight: 500;
  color: var(--accent);
}
.ftr-tag {
  font-size: 14px;
  color: var(--ink3);
  line-height: 1.55;
  max-width: 320px;
  margin-bottom: 16px;
  font-weight: 400;
}
.ftr-col h4 {
  font-size: 13px;
  font-weight: 700;
  color: var(--ink);
  margin-bottom: 16px;
  letter-spacing: -0.1px;
}
.ftr-col a, .ftr-col button {
  display: block;
  font-size: 13px;
  color: var(--ink3);
  padding: 5px 0;
  transition: color 0.15s;
  font-weight: 500;
  text-align: left;
}
.ftr-col a:hover, .ftr-col button:hover { color: var(--accent); }
.ftr-btm {
  max-width: 1400px;
  margin: 32px auto 0;
  padding-top: 24px;
  border-top: 1px solid var(--line);
  font-size: 12px;
  color: var(--ink4);
  text-align: center;
  font-weight: 500;
}

/* ═══ AUTH MODAL ═══ */
.auth-bg {
  position: fixed;
  inset: 0;
  z-index: 300;
  background: rgba(26,29,41,0.5);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.auth-box {
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 20px;
  padding: 44px;
  max-width: 420px;
  width: 100%;
  position: relative;
  box-shadow: var(--shade2);
}
.auth-close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--paper2);
  font-size: 14px;
  color: var(--ink3);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;
}
.auth-close:hover { background: var(--line2); color: var(--ink); }
.auth-h {
  font-family: var(--serif);
  font-size: 32px;
  font-weight: 400;
  letter-spacing: -1px;
  color: var(--ink);
  margin-bottom: 6px;
}
.auth-h em { font-style: italic; color: var(--accent); }
.auth-d {
  font-size: 14px;
  color: var(--ink3);
  margin-bottom: 24px;
  font-weight: 400;
}
.auth-tab {
  display: flex;
  background: var(--paper2);
  padding: 3px;
  border-radius: 999px;
  margin-bottom: 22px;
}
.auth-tab button {
  flex: 1;
  padding: 10px;
  font-size: 13px;
  font-weight: 600;
  color: var(--ink3);
  border-radius: 999px;
  transition: all 0.15s;
  letter-spacing: -0.1px;
}
.auth-tab button.on { background: var(--card); color: var(--ink); box-shadow: var(--shade); }
.auth-inp {
  display: block;
  width: 100%;
  padding: 13px 18px;
  background: var(--card);
  color: var(--ink);
  font-size: 14px;
  font-weight: 500;
  border: 1.5px solid var(--line);
  border-radius: 10px;
  margin-bottom: 10px;
  font-family: inherit;
  outline: none;
  transition: border 0.15s;
}
.auth-inp:focus { border-color: var(--accent); }
.auth-inp::placeholder { color: var(--ink4); }
.auth-sub {
  width: 100%;
  padding: 14px;
  background: var(--accent);
  color: #fff;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 700;
  transition: all 0.15s;
  margin-top: 6px;
  letter-spacing: -0.1px;
}
.auth-sub:hover { background: var(--accent2); transform: translateY(-1px); box-shadow: 0 6px 20px rgba(225,75,53,0.3); }
.auth-err {
  font-size: 12px;
  font-weight: 600;
  color: var(--accent);
  padding: 10px 14px;
  background: rgba(225,75,53,0.06);
  border-radius: 8px;
  margin-bottom: 12px;
}

/* ═══ USER PANEL ═══ */
.user-panel {
  position: fixed;
  top: 76px;
  right: 32px;
  width: 280px;
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 16px;
  padding: 20px;
  z-index: 45;
  box-shadow: var(--shade2);
}
.user-panel-hd {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--line);
  margin-bottom: 14px;
}
.user-panel-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--ink);
  background-size: cover;
  background-position: center;
}
.user-panel-nm {
  font-size: 14px;
  font-weight: 700;
  color: var(--ink);
  letter-spacing: -0.2px;
}
.user-panel-em {
  font-size: 11px;
  color: var(--ink4);
  margin-top: 2px;
  font-weight: 500;
}
.user-panel-item {
  display: block;
  width: 100%;
  padding: 9px 10px;
  font-size: 13px;
  color: var(--ink2);
  text-align: left;
  border-radius: 8px;
  transition: background 0.15s;
  font-weight: 500;
}
.user-panel-item:hover { background: var(--paper2); color: var(--ink); }

/* ═══ RESPONSIVE ═══ */
@media (max-width: 980px) {
  .nav-inner { grid-template-columns: auto auto; padding: 14px 20px; }
  .nav-links { display: none; }
  .nav-mob { display: inline-flex; align-items: center; justify-content: center; width: 40px; height: 40px; }
  .nav-mob-menu { display: block; }
  .nav-mob-menu.hidden { display: none; }
  .nav-btn { padding: 8px 12px; font-size: 12px; }
  .page, .ftr-inner { padding-left: 20px; padding-right: 20px; }
  .home-hero { grid-template-columns: 1fr; gap: 40px; padding: 60px 0; }
  .home-h1 { font-size: 52px; }
  .home-feat { aspect-ratio: auto; max-height: none; }
  .home-feat-card { position: relative; max-width: none; }
  .home-feat-sticker { display: none; }
  .firm-grid, .deals-grid { grid-template-columns: 1fr 1fr; gap: 14px; }
  .detail-hero { grid-template-columns: 1fr; gap: 32px; }
  .detail-nm { font-size: 44px; }
  .stat-grid { grid-template-columns: 1fr 1fr; }
  .scorecard-grid { grid-template-columns: 1fr; }
  .quiz-q { font-size: 34px; }
  .research-grid { grid-template-columns: 1fr; }
  .rewards-feature { padding: 40px 28px; }
  .rewards-feature-t { font-size: 40px; }
  .rewards-steps { grid-template-columns: 1fr 1fr; }
  .ftr-inner { grid-template-columns: 1fr 1fr; gap: 28px; }
  .home-metrics { grid-template-columns: 1fr 1fr; gap: 20px; }
  .result-row { grid-template-columns: 30px 44px 1fr auto; gap: 12px; padding: 16px; }
  .result-act { display: none; }
  .result-score { font-size: 28px; }
  .chal-tbl { font-size: 11px; }
  .chal-tbl thead th, .chal-tbl tbody td { padding: 12px 10px; }
  .page-hd { padding: 50px 0 32px; }
  .home-sec { padding: 50px 0; }
  .home-sec-t { font-size: 34px; }
  .user-panel { top: 68px; right: 12px; left: 12px; width: auto; }
  .sim-wrap { padding: 22px; }
  .sim-ctrls { grid-template-columns: 1fr; }
}
@media (max-width: 560px) {
  .firm-grid, .deals-grid { grid-template-columns: 1fr; }
  .rewards-steps { grid-template-columns: 1fr; }
}
`;

// ═══════════════════════════════════════════════════════════════════════════
// SHARED COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════
const Logo = ({ firm, size = 48 }) => {
  const logo = LOGOS[firm.name];
  return (
    <div className="firm-logo" style={{ width: size, height: size }}>
      {logo ? <img src={logo} alt={firm.name} /> : <span className="firm-logo-fb">{firm.initials}</span>}
    </div>
  );
};

const pulseColor = s => s >= 92 ? "var(--accent)" : s >= 88 ? "var(--gold)" : "var(--ink3)";

// ═══════════════════════════════════════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════════════════════════════════════
const Nav = ({ route, user, onSignIn, onTogglePanel }) => {
  const [mob, setMob] = useState(false);
  const links = [
    ["#/firms", "Firms"],
    ["#/quiz", "Match Quiz"],
    ["#/deals", "Deals"],
    ["#/challenges", "Challenges"],
    ["#/simulator", "Simulator"],
    ["#/research", "Research"],
    ["#/rewards", "Rewards"],
  ];
  const isActive = (path) => {
    const p = path.replace("#", "");
    if (p === "/firms" && (route.startsWith("/firms") || route.startsWith("/firm/"))) return true;
    return route === p;
  };
  return (
    <nav className="nav">
      <div className="nav-inner">
        <a href="#/" className="nav-logo">
          <span className="nav-logo-dot" />
          The <span>PropPulse</span>
        </a>
        <div className="nav-links">
          {links.map(([href, label]) => (
            <a key={href} href={href} className={`nav-link ${isActive(href) ? "active" : ""}`}>{label}</a>
          ))}
        </div>
        <div className="nav-right">
          {user ? (
            <div
              className="nav-avatar"
              style={{ backgroundImage: user.user_metadata?.avatar_url ? `url(${user.user_metadata.avatar_url})` : undefined }}
              onClick={onTogglePanel}
            />
          ) : (
            <>
              <button className="nav-btn ghost" onClick={onSignIn}>Sign In</button>
              <a href="#/quiz" className="nav-btn primary">Find My Firm</a>
            </>
          )}
          <button className="nav-mob" onClick={() => setMob(!mob)}>☰</button>
        </div>
      </div>
      <div className={`nav-mob-menu ${mob ? "" : "hidden"}`}>
        {links.map(([href, label]) => (
          <a key={href} href={href} className={`nav-link ${isActive(href) ? "active" : ""}`} onClick={() => setMob(false)}>{label}</a>
        ))}
      </div>
    </nav>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// FIRM CARD (used across pages)
// ═══════════════════════════════════════════════════════════════════════════
const FirmCard = ({ firm }) => {
  const ps = PULSE_SCORES[firm.name] || 75;
  const deal = DEALS.find(d => d.firm === firm.name);
  return (
    <a href={`#/firm/${firm.id}`} className="firm-card">
      {firm.bestFor && <span className="firm-card-tag">{firm.bestFor}</span>}
      <div className="firm-card-hd">
        <Logo firm={firm} />
        <div>
          <div className="firm-card-nm">{firm.name}</div>
          <div className="firm-card-meta">{firm.flag} {firm.hq.split(",")[0]} · Est. {firm.founded}</div>
        </div>
      </div>
      <div className="firm-card-pulse">
        <div>
          <div className="firm-card-pulse-l">Pulse Score</div>
          <div className="firm-card-pulse-v">{ps}</div>
        </div>
        <div className="firm-card-rating">★ {firm.rating}<em>({firm.reviews.toLocaleString()})</em></div>
      </div>
      <p className="firm-card-desc">{firm.desc}</p>
      <div className="firm-card-foot">
        {deal && <span className="firm-card-deal">{deal.pct} off · {deal.code}</span>}
        <span className="firm-card-view">View firm <span className="firm-card-view-arrow">→</span></span>
      </div>
    </a>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// HOME PAGE
// ═══════════════════════════════════════════════════════════════════════════
const HomePage = () => {
  const topFirm = [...FIRMS].sort((a, b) => (PULSE_SCORES[b.name] || 0) - (PULSE_SCORES[a.name] || 0))[0];
  const topDeal = DEALS.find(d => d.firm === topFirm.name);
  const sortedFirms = [...FIRMS].sort((a, b) => (PULSE_SCORES[b.name] || 0) - (PULSE_SCORES[a.name] || 0));
  const topDiscount = DEALS.reduce((m, d) => Math.max(m, parseInt(d.pct)), 0);

  return (
    <>
      <div className="page">
        <section className="home-hero">
          <div>
            <div className="home-eye">The futures prop firm index · {FIRMS.length} firms</div>
            <h1 className="home-h1">
              Pick the <em>right</em><br />
              prop firm in<br />
              <u>30 seconds</u>.
            </h1>
            <p className="home-lead">
              Take our 6-question match quiz. We rank every futures prop firm against your trading style, budget, and rule preferences — with live discount codes and honest scorecards.
            </p>
            <div className="home-cta">
              <a href="#/quiz" className="btn-pri">
                Take the Quiz <span className="btn-pri-arrow">→</span>
              </a>
              <a href="#/firms" className="btn-sec">Browse all firms</a>
            </div>
            <div className="home-metrics">
              <div>
                <div className="home-metric-v">{FIRMS.length}<em>.</em></div>
                <div className="home-metric-l">Firms tracked live</div>
              </div>
              <div>
                <div className="home-metric-v">{topDiscount}<em>%</em></div>
                <div className="home-metric-l">Max discount via TPP</div>
              </div>
              <div>
                <div className="home-metric-v">{DEALS.length}<em>.</em></div>
                <div className="home-metric-l">Active deal codes</div>
              </div>
            </div>
          </div>
          <div className="home-feat">
            <a href={`#/firm/${topFirm.id}`} className="home-feat-card">
              <div className="home-feat-cat">Editor's Pick · #1 Pulse</div>
              <div className="home-feat-logo"><Logo firm={topFirm} size={64} /></div>
              <div className="home-feat-nm">{topFirm.name}</div>
              <div className="home-feat-tag">{topFirm.bestFor} · {topFirm.flag} {topFirm.hq.split(",")[0]}</div>
              <div className="home-feat-stats">
                <div className="home-feat-stat">
                  <b>{PULSE_SCORES[topFirm.name]}</b>
                  <span>Pulse</span>
                </div>
                <div className="home-feat-stat">
                  <b>★ {topFirm.rating}</b>
                  <span>Rating</span>
                </div>
                <div className="home-feat-stat">
                  <b>{topFirm.maxAlloc.replace(/\s.*/, "")}</b>
                  <span>Max Alloc</span>
                </div>
              </div>
              {topDeal && (
                <div className="home-feat-deal">
                  Save <b>{topDeal.pct}</b> with code <b>{topDeal.code}</b>
                </div>
              )}
            </a>
            {topDeal && <div className="home-feat-sticker">{topDeal.pct} off this week</div>}
          </div>
        </section>

        <section className="home-sec">
          <div className="home-sec-hd">
            <div>
              <h2 className="home-sec-t">Top <em>ranked</em> firms</h2>
              <div className="home-sec-sub">By Pulse Score · updated weekly</div>
            </div>
            <a href="#/firms" className="home-sec-link">See all firms →</a>
          </div>
          <div className="firm-grid">
            {sortedFirms.slice(0, 6).map(f => <FirmCard key={f.id} firm={f} />)}
          </div>
        </section>

        <section className="home-sec">
          <div className="home-sec-hd">
            <div>
              <h2 className="home-sec-t">Active <em>deal codes</em></h2>
              <div className="home-sec-sub">Copy, paste, save — universal code: TPP</div>
            </div>
            <a href="#/deals" className="home-sec-link">See all deals →</a>
          </div>
          <div className="deals-grid">
            {DEALS.slice(0, 6).map((d, i) => {
              const f = FIRMS.find(ff => ff.name === d.firm);
              return (
                <a key={i} href={f ? `#/firm/${f.id}` : "#/deals"} className="deal-card">
                  {d.tag && <span className="deal-card-tag">{d.tag}</span>}
                  <div className="deal-card-hd">
                    {f && <Logo firm={f} size={36} />}
                    <div className="deal-card-nm">{d.firm}</div>
                  </div>
                  <div className="deal-card-pct">
                    {d.pct.replace("%", "").replace(" OFF", "")}<em>% OFF</em>
                  </div>
                  <div className="deal-card-desc">{d.desc}</div>
                  <div className="deal-card-code">
                    <span className="deal-card-code-l">Code</span>
                    <span className="deal-card-code-v">{d.code}</span>
                  </div>
                </a>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// FIRMS PAGE
// ═══════════════════════════════════════════════════════════════════════════
const FirmsPage = () => {
  const [sort, setSort] = useState("pulse");
  const [filter, setFilter] = useState("all");
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
      const n = s => { const v = parseFloat(s.replace(/[^0-9.]/g, "")); return s.includes("M") ? v * 1000 : v; };
      return n(y.maxAlloc) - n(x.maxAlloc);
    });
    return a;
  }, [sort, filtered]); // eslint-disable-line

  return (
    <div className="page">
      <div className="page-hd">
        <div className="page-eye">The Firms Index</div>
        <h1 className="page-t">All <em>{FIRMS.length} firms</em>, ranked and reviewed.</h1>
        <p className="page-d">Sort by Pulse Score, rating, age, or account size. Filter by rule type. Click any card for the full breakdown.</p>
      </div>
      <div className="chal-filters">
        <button className={filter === "all" ? "on" : ""} onClick={() => setFilter("all")}>All firms</button>
        <button className={filter === "instant" ? "on" : ""} onClick={() => setFilter("instant")}>Instant fund</button>
        <button className={filter === "noDLL" ? "on" : ""} onClick={() => setFilter("noDLL")}>No DLL</button>
        <button className={filter === "noConsistency" ? "on" : ""} onClick={() => setFilter("noConsistency")}>No consistency</button>
        <div style={{ marginLeft: "auto" }}>
          <select value={sort} onChange={e => setSort(e.target.value)}>
            <option value="pulse">Sort by Pulse Score</option>
            <option value="rating">Sort by Rating</option>
            <option value="newest">Sort by Newest</option>
            <option value="alloc">Sort by Max Alloc</option>
          </select>
        </div>
      </div>
      <div className="firm-grid">
        {sorted.map(f => <FirmCard key={f.id} firm={f} />)}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// FIRM DETAIL PAGE
// ═══════════════════════════════════════════════════════════════════════════
const FirmDetailPage = ({ firmId }) => {
  const firm = FIRMS.find(f => String(f.id) === String(firmId));
  const [openFaq, setOpenFaq] = useState(null);
  if (!firm) return <div className="page"><div className="page-hd"><h1 className="page-t">Firm not found.</h1><a href="#/firms" className="btn-sec" style={{ marginTop: 20 }}>← Back to firms</a></div></div>;
  const ps = PULSE_SCORES[firm.name] || 75;
  const deal = DEALS.find(d => d.firm === firm.name);
  const profile = FIRM_PROFILES[firm.name];
  const faq = FIRM_FAQ[firm.name] || [];
  const scorecard = SCORECARD_DATA[firm.name] || [];

  return (
    <div className="page">
      <a href="#/firms" className="detail-back">← Back to all firms</a>

      <section className="detail-hero">
        <div>
          <div className="detail-eye">{firm.bestFor}</div>
          <div className="detail-logo-lg"><Logo firm={firm} size={72} /></div>
          <h1 className="detail-nm">{firm.name}</h1>
          {profile?.tagline && <p className="detail-tagline">"{profile.tagline}"</p>}
          <div className="detail-meta">
            <span>{firm.flag} <b>{firm.hq}</b></span>
            <span>Est. <b>{firm.founded}</b></span>
            <span>★ <b>{firm.rating}</b> ({firm.reviews.toLocaleString()} reviews)</span>
            {profile?.ceo && <span>CEO <b>{profile.ceo}</b></span>}
          </div>
          <div className="home-cta">
            <button className="btn-pri" onClick={() => trackClick(firm.name)}>
              {deal ? `Claim ${deal.pct} →` : "Visit site →"}
            </button>
            <a href="#/quiz" className="btn-sec">Compare in quiz</a>
          </div>
        </div>

        <div className="detail-side">
          <div className="detail-side-pulse">
            <div className="detail-side-pulse-v">{ps}</div>
            <div className="detail-side-pulse-l">
              <b>Pulse Score</b>
              <span>Out of 100</span>
            </div>
          </div>
          <div className="detail-side-row"><span>Max Allocation</span><b>{firm.maxAlloc}</b></div>
          <div className="detail-side-row"><span>Profit Split</span><b>{firm.split.split(" ")[0]}</b></div>
          <div className="detail-side-row"><span>Max Drawdown</span><b>{firm.maxDD}</b></div>
          <div className="detail-side-row"><span>Payout Speed</span><b>{firm.paySpeed.split("(")[0].trim()}</b></div>
          <div className="detail-side-row"><span>Drawdown Type</span><b>{firm.drawdownType.split(" /")[0]}</b></div>
          {deal && (
            <button className="btn-pri detail-side-cta" onClick={() => trackClick(firm.name)}>
              Use code <b style={{ margin: "0 4px", background: "rgba(255,255,255,0.2)", padding: "2px 8px", borderRadius: 4 }}>{deal.code}</b> →
            </button>
          )}
        </div>
      </section>

      <section className="detail-sec">
        <h2 className="detail-sec-t">About <em>{firm.name}</em></h2>
        <p style={{ fontSize: 17, color: "var(--ink2)", lineHeight: 1.6, maxWidth: 820, marginBottom: 24 }}>
          {profile?.description || firm.desc}
        </p>
      </section>

      <section className="detail-sec">
        <h2 className="detail-sec-t">Key <em>metrics</em></h2>
        <div className="stat-grid">
          <div className="stat-card">
            <div className="stat-k">Profit Target</div>
            <div className="stat-v">{firm.target}</div>
          </div>
          <div className="stat-card">
            <div className="stat-k">Daily Drawdown</div>
            <div className="stat-v">{firm.dailyDD}</div>
          </div>
          <div className="stat-card">
            <div className="stat-k">Min Payout</div>
            <div className="stat-v">{firm.minPayout}</div>
          </div>
          <div className="stat-card">
            <div className="stat-k">Reset Fee</div>
            <div className="stat-v">{firm.reset}</div>
          </div>
          <div className="stat-card">
            <div className="stat-k">Platforms</div>
            <div className="stat-v" style={{ fontSize: 14 }}>{firm.platforms.slice(0, 4).join(", ")}</div>
          </div>
          <div className="stat-card">
            <div className="stat-k">Consistency Rule</div>
            <div className="stat-v">{firm.hasConsistency ? firm.consistencyPct : "None"}</div>
          </div>
          <div className="stat-card">
            <div className="stat-k">News Trading</div>
            <div className="stat-v">{firm.newsTrading ? "Allowed" : "Restricted"}</div>
          </div>
          <div className="stat-card">
            <div className="stat-k">EA / Bots</div>
            <div className="stat-v">{firm.eaAllowed ? "Allowed" : "Restricted"}</div>
          </div>
        </div>
      </section>

      {scorecard.length > 0 && (
        <section className="detail-sec">
          <h2 className="detail-sec-t">The <em>fine print</em> scorecard</h2>
          <div className="scorecard-grid">
            {scorecard.map((r, i) => (
              <div key={i} className="scorecard-row">
                <div className={`scorecard-dot ${r.tone}`} />
                <div className="scorecard-k">{r.k}</div>
                <div className="scorecard-v">{r.v}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {faq.length > 0 && (
        <section className="detail-sec">
          <h2 className="detail-sec-t">Frequently <em>asked</em></h2>
          {faq.map((cat, ci) => (
            <div key={ci} className="faq-cat">
              <h3 className="faq-cat-t">{cat.cat}</h3>
              {cat.items.map((item, ii) => {
                const k = `${ci}-${ii}`;
                return (
                  <div key={k} className={`faq-item ${openFaq === k ? "open" : ""}`}>
                    <div className="faq-q" onClick={() => setOpenFaq(openFaq === k ? null : k)}>{item.q}</div>
                    <div className="faq-a">{item.a}</div>
                  </div>
                );
              })}
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// QUIZ PAGE
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
    if (["Tradeify", "Alpha Futures", "Bulenox", "FundedNext Futures"].includes(n)) {
      s += 10; reasons.push("EOD trailing DD");
    }
  }
  if (answers.dd === "static") {
    if (n === "Goat Funded Futures") { s += 12; reasons.push("Static DD = fixed floor"); }
    else s -= 3;
  }
  if (answers.news === "yes") {
    if (["Apex Trader Funding", "Tradeify", "Bulenox", "FundedNext Futures", "Top One Futures"].includes(n)) {
      s += 8; reasons.push("News trading allowed");
    }
  }
  if (answers.speed === "fast") {
    if (n === "Tradeify") { s += 10; reasons.push("~1hr payouts"); }
    if (["FundedNext Futures", "Goat Funded Futures"].includes(n)) { s += 7; reasons.push("24hr guaranteed"); }
  }
  if (answers.consistency === "none") {
    if (n === "FundedNext Futures") { s += 10; reasons.push("No consistency rule"); }
    if (n === "My Funded Futures") { s += 8; reasons.push("Rapid = no consistency"); }
  }
  const ps = PULSE_SCORES[n] || 75;
  s += (ps - 85) * 0.3;
  return { score: Math.max(0, Math.min(100, Math.round(s))), reasons: reasons.slice(0, 3) };
};

const QuizPage = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [done, setDone] = useState(false);
  const total = QUIZ_QUESTIONS.length;

  if (done) {
    const ranked = FIRMS.map(f => ({ ...f, ...scoreQuiz(f, answers) })).sort((a, b) => b.score - a.score);
    return (
      <div className="page">
        <div className="quiz-wrap">
          <div className="results-hd">
            <span className="results-tag">Match found</span>
            <h1 className="results-t">Your best fit is <em>{ranked[0].name}</em></h1>
            <p className="results-sub">Based on your preferences, here's how every firm ranks for you.</p>
          </div>
          {ranked.map((f, i) => {
            const deal = DEALS.find(d => d.firm === f.name);
            return (
              <div key={f.id} className={`result-row ${i === 0 ? "top" : ""}`}>
                <div className="result-rank">#{i + 1}</div>
                <Logo firm={f} size={44} />
                <div>
                  <div className="result-nm">{f.name}</div>
                  <div className="result-reasons">
                    {f.reasons.length > 0 ? f.reasons.map((r, j) => <span key={j}>{r}</span>) : <span>Baseline match</span>}
                  </div>
                </div>
                <div className="result-score">{f.score}<small>MATCH</small></div>
                <div className="result-act">
                  <a href={`#/firm/${f.id}`} className="result-btn">View</a>
                  {deal && <button className="result-btn primary" onClick={() => trackClick(f.name)}>{deal.pct}</button>}
                </div>
              </div>
            );
          })}
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <button className="btn-sec" onClick={() => { setStep(0); setAnswers({}); setDone(false); }}>↻ Retake quiz</button>
          </div>
        </div>
      </div>
    );
  }

  const q = QUIZ_QUESTIONS[step];
  const prog = Math.round(((step + 1) / total) * 100);

  const pick = (v) => {
    const na = { ...answers, [q.id]: v };
    setAnswers(na);
    if (step < total - 1) setStep(step + 1);
    else setDone(true);
  };

  return (
    <div className="page">
      <div className="quiz-wrap">
        <div className="quiz-prog"><span style={{ width: prog + "%" }} /></div>
        <div className="quiz-step">Question {step + 1} of {total}</div>
        <h1 className="quiz-q">{q.q}</h1>
        <p className="quiz-sub">{q.sub}</p>
        <div className="quiz-opts">
          {q.opts.map((o, i) => (
            <button key={o.v} className="quiz-opt" onClick={() => pick(o.v)}>
              <span className="quiz-opt-letter">{String.fromCharCode(65 + i)}</span>
              <span className="quiz-opt-content">
                <div className="quiz-opt-l">{o.l}</div>
                <div className="quiz-opt-d">{o.d}</div>
              </span>
              <span className="quiz-opt-arr">→</span>
            </button>
          ))}
        </div>
        {step > 0 && (
          <button className="quiz-back-btn" onClick={() => setStep(step - 1)}>← Back</button>
        )}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// DEALS PAGE
// ═══════════════════════════════════════════════════════════════════════════
const DealsPage = () => (
  <div className="page">
    <div className="page-hd">
      <div className="page-eye">Live discount codes</div>
      <h1 className="page-t">Active <em>deals</em> · save up to 90%</h1>
      <p className="page-d">Every deal verified fresh. Universal code: <b style={{ color: "var(--accent)" }}>TPP</b> (use <b style={{ color: "var(--accent)" }}>TTPP</b> for Alpha Futures).</p>
    </div>
    <div className="deals-grid">
      {DEALS.map((d, i) => {
        const f = FIRMS.find(ff => ff.name === d.firm);
        return (
          <div key={i} className="deal-card" onClick={() => f && trackClick(f.name)}>
            {d.tag && <span className="deal-card-tag">{d.tag}</span>}
            <div className="deal-card-hd">
              {f && <Logo firm={f} size={36} />}
              <div className="deal-card-nm">{d.firm}</div>
            </div>
            <div className="deal-card-pct">
              {d.pct.replace("%", "").replace(" OFF", "")}<em>% OFF</em>
            </div>
            <div className="deal-card-desc">{d.desc}</div>
            <div className="deal-card-code">
              <span className="deal-card-code-l">Code</span>
              <span className="deal-card-code-v">{d.code}</span>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════
// CHALLENGES PAGE
// ═══════════════════════════════════════════════════════════════════════════
const ChallengesPage = () => {
  const [firmF, setFirmF] = useState("");
  const [sizeF, setSizeF] = useState("");
  const [instantF, setInstantF] = useState(false);
  const firms = [...new Set(CHALLENGES.map(c => c.firm))].sort();
  const sizes = [...new Set(CHALLENGES.map(c => c.size))].sort((a, b) => parseInt(a) - parseInt(b));
  const filtered = CHALLENGES.filter(c => {
    if (firmF && c.firm !== firmF) return false;
    if (sizeF && c.size !== sizeF) return false;
    if (instantF && !c.instant) return false;
    return true;
  });
  return (
    <div className="page">
      <div className="page-hd">
        <div className="page-eye">The challenge matrix</div>
        <h1 className="page-t">Every <em>plan</em>, side by side.</h1>
        <p className="page-d">Filter {CHALLENGES.length}+ evaluation plans across every firm and size. Compare targets, drawdowns, and prices at a glance.</p>
      </div>
      <div className="chal-filters">
        <select value={firmF} onChange={e => setFirmF(e.target.value)}>
          <option value="">All firms</option>
          {firms.map(f => <option key={f} value={f}>{f}</option>)}
        </select>
        <select value={sizeF} onChange={e => setSizeF(e.target.value)}>
          <option value="">All sizes</option>
          {sizes.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <button className={instantF ? "on" : ""} onClick={() => setInstantF(!instantF)}>Instant only</button>
        <span style={{ marginLeft: "auto", fontSize: 13, color: "var(--ink3)", fontWeight: 500 }}>
          Showing <b style={{ color: "var(--ink)" }}>{filtered.length}</b> of {CHALLENGES.length} plans
        </span>
      </div>
      <div style={{ overflow: "auto", marginBottom: 40 }}>
        <table className="chal-tbl">
          <thead>
            <tr>
              <th>Firm / Plan</th><th>Size</th><th>Target</th><th>Max Loss</th>
              <th>DLL</th><th>Drawdown</th><th>Split</th><th>Price</th>
            </tr>
          </thead>
          <tbody>
            {filtered.slice(0, 60).map((c, i) => {
              const f = FIRMS.find(ff => ff.name === c.firm);
              return (
                <tr key={i}>
                  <td>
                    <div className="chal-tbl-firm">
                      {f && <img src={LOGOS[f.name]} alt="" />}
                      <div>
                        <b>{c.firm}</b>
                        <div className="chal-tbl-plan">{c.plan}</div>
                      </div>
                    </div>
                  </td>
                  <td>{c.size}</td>
                  <td>{c.target}</td>
                  <td>{c.maxLoss}</td>
                  <td>{c.dll}</td>
                  <td>{c.drawdown}</td>
                  <td>{c.split}</td>
                  <td className="chal-tbl-price">{c.price}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {filtered.length > 60 && (
        <p style={{ textAlign: "center", fontSize: 13, color: "var(--ink4)", marginBottom: 40 }}>
          Showing first 60 of {filtered.length} results. Narrow filters for more.
        </p>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// SIMULATOR PAGE
// ═══════════════════════════════════════════════════════════════════════════
const simDD = (points, cfg) => {
  const { type, maxDD, lockAt } = cfg;
  let peak = 0, locked = false, blownAt = -1;
  const floors = [];
  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    let floor;
    if (type === "Static") floor = -maxDD;
    else {
      if (p > peak) peak = p;
      floor = peak - maxDD;
      if (lockAt !== null && peak >= maxDD + lockAt && !locked) { locked = true; floor = lockAt; }
    }
    floors.push(floor);
    if (p <= floor && blownAt === -1) blownAt = i;
  }
  return { floors, blownAt, peak };
};

const SimulatorPage = () => {
  const [sce, setSce] = useState("spike-give-back");
  const [firmN, setFirmN] = useState("Tradeify");
  const scenario = DD_SCENARIOS[sce];
  const cfg = FIRM_DD_CONFIG[firmN];
  const firm = FIRMS.find(f => f.name === firmN);
  const sim = simDD(scenario.points, cfg);

  const W = 720, H = 280, P = 36;
  const all = [...scenario.points, ...sim.floors];
  const minY = Math.min(...all) - 200;
  const maxY = Math.max(...all) + 200;
  const xs = i => P + (i / (scenario.points.length - 1)) * (W - P * 2);
  const ys = v => H - P - ((v - minY) / (maxY - minY)) * (H - P * 2);
  const pnlPath = scenario.points.map((p, i) => `${i === 0 ? "M" : "L"}${xs(i)},${ys(p)}`).join(" ");
  const floorPath = sim.floors.map((p, i) => `${i === 0 ? "M" : "L"}${xs(i)},${ys(p)}`).join(" ");

  return (
    <div className="page">
      <div className="page-hd">
        <div className="page-eye">Drawdown Simulator</div>
        <h1 className="page-t">See <em>exactly</em> how you blow an account.</h1>
        <p className="page-d">Pick a firm and a scenario. Watch how the drawdown floor moves against the equity curve. This is why EOD trailing feels different from intraday.</p>
      </div>
      <div className="sim-wrap">
        <div className="sim-ctrls">
          <div>
            <label className="sim-ctrl-l">Firm</label>
            <select className="sim-ctrl-s" value={firmN} onChange={e => setFirmN(e.target.value)}>
              {FIRMS.map(f => <option key={f.id} value={f.name}>{FIRM_DD_CONFIG[f.name]?.label || f.name}</option>)}
            </select>
          </div>
          <div>
            <label className="sim-ctrl-l">Scenario</label>
            <select className="sim-ctrl-s" value={sce} onChange={e => setSce(e.target.value)}>
              {Object.entries(DD_SCENARIOS).map(([k, v]) => <option key={k} value={k}>{v.name}</option>)}
            </select>
          </div>
        </div>
        <div className="sim-chart">
          <svg viewBox={`0 0 ${W} ${H}`}>
            <line x1={P} y1={ys(0)} x2={W - P} y2={ys(0)} stroke="rgba(26,29,41,0.1)" strokeDasharray="4 4" />
            <text x={P - 4} y={ys(0) + 4} fill="rgba(26,29,41,0.3)" fontSize="10" textAnchor="end">$0</text>
            <path d={`${floorPath} L${xs(scenario.points.length - 1)},${H - P} L${P},${H - P} Z`} fill="rgba(225,75,53,0.06)" />
            <path d={floorPath} fill="none" stroke="#e14b35" strokeWidth="1.5" strokeDasharray="6 4" />
            <path d={pnlPath} fill="none" stroke={firm?.color || "#1a1d29"} strokeWidth="2.5" />
            {sim.blownAt >= 0 && (
              <g>
                <circle cx={xs(sim.blownAt)} cy={ys(scenario.points[sim.blownAt])} r="6" fill="#e14b35" />
                <text x={xs(sim.blownAt)} y={ys(scenario.points[sim.blownAt]) - 14} fill="#e14b35" fontSize="11" fontWeight="700" textAnchor="middle">BLOWN</text>
              </g>
            )}
          </svg>
        </div>
        <div className={`sim-verdict ${sim.blownAt >= 0 ? "fail" : "pass"}`}>
          <div className="sim-verdict-ic">{sim.blownAt >= 0 ? "✗" : "✓"}</div>
          <div>
            <div className="sim-verdict-t">{sim.blownAt >= 0 ? "Account blown" : "Account survived"}</div>
            <div className="sim-verdict-d">
              {sim.blownAt >= 0
                ? `Balance hit the drawdown floor on day ${sim.blownAt + 1}. This is how ${firmN}'s ${cfg.type.toLowerCase()} trailing drawdown bites.`
                : `Peak: $${sim.peak.toLocaleString()} · Final floor: $${sim.floors[sim.floors.length - 1].toLocaleString()}`}
            </div>
          </div>
        </div>
        <div className="sim-legend">
          <span><i className="sim-legend-dot" style={{ background: firm?.color || "#1a1d29" }} /> Equity (P&L)</span>
          <span><i className="sim-legend-dot" style={{ background: "#e14b35" }} /> Drawdown floor</span>
          <span className="sim-info">Type: <b>{cfg.type}</b> · Max: <b>${cfg.maxDD.toLocaleString()}</b></span>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// RESEARCH PAGE
// ═══════════════════════════════════════════════════════════════════════════
const ResearchPage = () => {
  const posts = BLOG.slice(0, 9);
  const feature = posts[0];
  const sides = posts.slice(1, 3);
  const rest = posts.slice(3);
  return (
    <div className="page">
      <div className="page-hd">
        <div className="page-eye">Research &amp; analysis</div>
        <h1 className="page-t">Dispatches <em>from the floor</em>.</h1>
        <p className="page-d">Weekly deep-dives on prop firm rules, payout behavior, rule changes, and the state of the industry.</p>
      </div>
      <div className="research-grid">
        {feature && (
          <div className="research-feat">
            <div className="research-cat">{feature.cat}</div>
            <h2 className="research-t">{feature.title}</h2>
            <p className="research-excerpt">{feature.excerpt}</p>
            <div className="research-date">{feature.date} · {feature.time} read</div>
          </div>
        )}
        <div className="research-side">
          {sides.map(p => (
            <div key={p.id} className="research-card">
              <div className="research-cat">{p.cat}</div>
              <div className="research-card-t">{p.title}</div>
              <div className="research-card-date">{p.date} · {p.time} read</div>
            </div>
          ))}
        </div>
      </div>
      {rest.length > 0 && (
        <div className="firm-grid" style={{ marginTop: 40 }}>
          {rest.map(p => (
            <div key={p.id} className="research-card">
              <div className="research-cat">{p.cat}</div>
              <div className="research-card-t">{p.title}</div>
              <div className="research-card-date">{p.date} · {p.time} read</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// REWARDS PAGE
// ═══════════════════════════════════════════════════════════════════════════
const RewardsPage = ({ onSignIn, user }) => (
  <div className="page">
    <div className="rewards-wrap" style={{ padding: "80px 0 60px" }}>
      <div className="rewards-feature">
        <span className="rewards-feature-tag">The PulsePoints Program</span>
        <h1 className="rewards-feature-t">Get <em>paid</em><br />to pick a firm.</h1>
        <p className="rewards-feature-d">
          Every purchase with code TPP earns PulsePoints. Submit a screenshot, redeem for free prop accounts, community perks, and exclusive drops.
        </p>
        <div className="home-cta" style={{ justifyContent: "center", marginBottom: 0 }}>
          <button className="btn-pri" onClick={user ? undefined : onSignIn}>
            {user ? "View Dashboard" : "Join the Program"} <span className="btn-pri-arrow">→</span>
          </button>
        </div>
      </div>
      <div className="rewards-steps">
        {[
          ["01", "Sign Up", "Free · 30 seconds"],
          ["02", "Buy with TPP", "Save 10–90% at checkout"],
          ["03", "Submit Proof", "Receipt screenshot"],
          ["04", "Earn & Redeem", "Free accounts + perks"],
        ].map(([n, t, d]) => (
          <div key={n} className="rewards-step">
            <div className="rewards-step-n">{n}</div>
            <div className="rewards-step-t">{t}</div>
            <div className="rewards-step-d">{d}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════
// AUTH MODAL
// ═══════════════════════════════════════════════════════════════════════════
const AuthModal = ({ onClose, onAuth }) => {
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
    } catch (e) { setErr(e.message || "Something went wrong."); }
    setBusy(false);
  };

  return (
    <div className="auth-bg" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="auth-box">
        <button className="auth-close" onClick={onClose}>✕</button>
        <h2 className="auth-h">{mode === "signin" ? <>Welcome <em>back</em></> : <>Create <em>account</em></>}</h2>
        <p className="auth-d">{mode === "signin" ? "Sign in to earn PulsePoints and track your picks." : "Join the program. Earn points. Get deals."}</p>
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
            {busy ? "Loading..." : (mode === "signin" ? "Sign In" : "Create Account")}
          </button>
        </form>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// FOOTER
// ═══════════════════════════════════════════════════════════════════════════
const Footer = () => (
  <footer className="ftr">
    <div className="ftr-inner">
      <div>
        <div className="ftr-brand">
          <span style={{ display: "inline-block", width: 10, height: 10, background: "var(--accent)", borderRadius: 3, transform: "rotate(45deg)" }} />
          The <span>PropPulse</span>
        </div>
        <p className="ftr-tag">A trader's guide to futures prop firms. Quiz-matched recommendations, interactive drawdown sims, and honest scorecards.</p>
      </div>
      <div className="ftr-col">
        <h4>Explore</h4>
        <a href="#/firms">All Firms</a>
        <a href="#/quiz">Match Quiz</a>
        <a href="#/simulator">Simulator</a>
        <a href="#/challenges">Challenges</a>
      </div>
      <div className="ftr-col">
        <h4>Resources</h4>
        <a href="#/deals">Deals</a>
        <a href="#/research">Research</a>
        <a href="#/rewards">Rewards</a>
      </div>
      <div className="ftr-col">
        <h4>Connect</h4>
        <a href="https://discord.gg/pP9vfJ7WqK" target="_blank" rel="noreferrer">Discord</a>
        <a href="https://x.com/PropPulseMedia" target="_blank" rel="noreferrer">Twitter / X</a>
        <a href="https://www.youtube.com/@ThePropPulse" target="_blank" rel="noreferrer">YouTube</a>
      </div>
    </div>
    <div className="ftr-btm">© 2026 PropPulse Media · Disclosure: We may earn a commission on partner firms. We never rank by commission — only by trader outcome.</div>
  </footer>
);

// ═══════════════════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════════════════
export default function App() {
  const route = useRoute();
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [showPanel, setShowPanel] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setUser(session?.user || null));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => setUser(session?.user || null));
    return () => subscription.unsubscribe();
  }, []);

  const logout = async () => { await supabase.auth.signOut(); setUser(null); setShowPanel(false); };

  // Route matcher
  let page;
  if (route === "/" || route === "") page = <HomePage />;
  else if (route === "/firms") page = <FirmsPage />;
  else if (route.startsWith("/firm/")) page = <FirmDetailPage firmId={route.split("/firm/")[1]} />;
  else if (route === "/quiz") page = <QuizPage />;
  else if (route === "/deals") page = <DealsPage />;
  else if (route === "/challenges") page = <ChallengesPage />;
  else if (route === "/simulator") page = <SimulatorPage />;
  else if (route === "/research") page = <ResearchPage />;
  else if (route === "/rewards") page = <RewardsPage onSignIn={() => setShowAuth(true)} user={user} />;
  else page = <div className="page"><div className="page-hd"><h1 className="page-t">Page not found.</h1><a href="#/" className="btn-sec" style={{ marginTop: 20 }}>← Back home</a></div></div>;

  return (
    <>
      <style>{css}</style>
      <Nav route={route} user={user} onSignIn={() => setShowAuth(true)} onTogglePanel={() => setShowPanel(!showPanel)} />
      {user && showPanel && (
        <div className="user-panel">
          <div className="user-panel-hd">
            <div className="user-panel-avatar" style={{ backgroundImage: user.user_metadata?.avatar_url ? `url(${user.user_metadata.avatar_url})` : undefined }} />
            <div>
              <div className="user-panel-nm">{user.user_metadata?.username || user.email?.split("@")[0]}</div>
              <div className="user-panel-em">{user.email}</div>
            </div>
          </div>
          <a href="#/rewards" className="user-panel-item" onClick={() => setShowPanel(false)}>My Dashboard</a>
          <a href="#/rewards" className="user-panel-item" onClick={() => setShowPanel(false)}>Submit Purchase</a>
          <a href="#/rewards" className="user-panel-item" onClick={() => setShowPanel(false)}>Rewards Store</a>
          <button className="user-panel-item" onClick={logout}>Sign Out</button>
        </div>
      )}
      {page}
      <Footer />
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} onAuth={u => { setUser(u); setShowAuth(false); }} />}
    </>
  );
}
