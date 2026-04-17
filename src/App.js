// ═══════════════════════════════════════════════════════════════════════════
// PropPulse — "Ember" design
// Research-informed rebuild based on PipBack, FundedNext, Tradeify, GoatFunded,
// DamnPropFirms, PropFirm.com patterns. Dark obsidian base + amber primary +
// violet accent. Inter throughout. Multi-page. Data-dense.
// ═══════════════════════════════════════════════════════════════════════════

import { useState, useEffect, useMemo } from "react";
import { createClient } from "@supabase/supabase-js";
import {
  LOGOS, FIRMS, DEALS, BLOG, CHALLENGES,
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

const copyCode = async (code) => {
  try { await navigator.clipboard.writeText(code); } catch {}
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

// ═══════════════════════════════════════════════════════════════════════════
// STYLES — "Ember"
// ═══════════════════════════════════════════════════════════════════════════
const css = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

:root {
  --bg: #0a0a0f;
  --bg1: #111117;
  --bg2: #17171f;
  --bg3: #1e1e28;
  --bg4: #282832;
  --line: rgba(255,255,255,0.06);
  --line2: rgba(255,255,255,0.1);
  --line3: rgba(255,255,255,0.16);
  --txt: #fafafa;
  --txt2: #d4d4d8;
  --txt3: #a1a1aa;
  --txt4: #71717a;
  --txt5: #52525b;
  --amber: #f59e0b;
  --amber-d: #d97706;
  --amber-l: #fbbf24;
  --amber-a: rgba(245,158,11,0.1);
  --amber-a2: rgba(245,158,11,0.18);
  --violet: #a78bfa;
  --violet-d: #8b5cf6;
  --violet-a: rgba(167,139,250,0.1);
  --green: #10b981;
  --green-a: rgba(16,185,129,0.1);
  --red: #ef4444;
  --red-a: rgba(239,68,68,0.1);
  --blue: #3b82f6;
  --font: 'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
}

* { margin: 0; padding: 0; box-sizing: border-box; }
html, body, #root {
  background: var(--bg);
  color: var(--txt);
  font-family: var(--font);
  font-size: 14px;
  line-height: 1.55;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
  font-feature-settings: 'cv11', 'ss01';
}

body::before {
  content: '';
  position: fixed;
  inset: 0;
  background:
    radial-gradient(circle at 15% 10%, rgba(245,158,11,0.04) 0%, transparent 40%),
    radial-gradient(circle at 85% 90%, rgba(167,139,250,0.03) 0%, transparent 40%);
  pointer-events: none;
  z-index: 0;
}

::-webkit-scrollbar { width: 8px; height: 8px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
::-webkit-scrollbar-thumb:hover { background: rgba(245,158,11,0.4); }
::selection { background: var(--amber); color: var(--bg); }

a { color: inherit; text-decoration: none; }
button { cursor: pointer; border: none; background: none; color: inherit; font-family: inherit; }

/* ═══ MARKET TICKER (top) ═══ */
.mkt {
  background: var(--bg1);
  border-bottom: 1px solid var(--line);
  overflow: hidden;
  height: 32px;
  display: flex;
  align-items: center;
  position: relative;
}
.mkt-track {
  display: flex;
  gap: 32px;
  white-space: nowrap;
  animation: mktScroll 60s linear infinite;
  padding-left: 32px;
}
@keyframes mktScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
.mkt-item {
  font-size: 11px;
  font-weight: 600;
  color: var(--txt3);
  letter-spacing: -0.1px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.mkt-item b { color: var(--amber); font-weight: 700; }
.mkt-item .chg { color: var(--green); font-weight: 600; }
.mkt-item .chg.d { color: var(--red); }

/* ═══ NAV ═══ */
.nav {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(10,10,15,0.85);
  backdrop-filter: blur(20px) saturate(1.2);
  border-bottom: 1px solid var(--line);
}
.nav-inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: 14px 32px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 36px;
}
.nav-logo {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: -0.5px;
  color: var(--txt);
}
.nav-logo-mark {
  width: 28px;
  height: 28px;
  background: linear-gradient(135deg, var(--amber), var(--amber-d));
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--bg);
  font-weight: 900;
  font-size: 14px;
  box-shadow: 0 4px 16px rgba(245,158,11,0.35);
}
.nav-logo em { font-style: normal; color: var(--amber); }

.nav-links {
  display: flex;
  gap: 2px;
  justify-self: center;
}
.nav-link {
  padding: 8px 14px;
  font-size: 13.5px;
  font-weight: 500;
  color: var(--txt3);
  border-radius: 6px;
  transition: all 0.15s;
  letter-spacing: -0.1px;
}
.nav-link:hover { color: var(--txt); background: var(--bg2); }
.nav-link.active {
  color: var(--amber);
  background: var(--amber-a);
}

.nav-right { display: flex; gap: 8px; align-items: center; }
.btn-nav {
  padding: 8px 16px;
  border-radius: 7px;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.15s;
  letter-spacing: -0.1px;
}
.btn-nav.ghost {
  color: var(--txt2);
  border: 1px solid var(--line2);
}
.btn-nav.ghost:hover { color: var(--txt); border-color: var(--line3); }
.btn-nav.primary {
  background: var(--amber);
  color: var(--bg);
  font-weight: 700;
}
.btn-nav.primary:hover { background: var(--amber-l); }
.nav-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--bg3);
  background-size: cover;
  background-position: center;
  cursor: pointer;
  border: 1px solid var(--line2);
  transition: border 0.15s;
}
.nav-avatar:hover { border-color: var(--amber); }
.nav-mob { display: none; font-size: 22px; color: var(--txt); background: transparent; }
.nav-mob-menu { display: none; }

/* ═══ LAYOUT ═══ */
.wrap { max-width: 1400px; margin: 0 auto; padding: 0 32px; position: relative; z-index: 1; }

/* ═══ BUTTONS ═══ */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 13px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.18s;
  letter-spacing: -0.1px;
  white-space: nowrap;
}
.btn-primary {
  background: var(--amber);
  color: var(--bg);
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(245,158,11,0.3), inset 0 1px 0 rgba(255,255,255,0.15);
}
.btn-primary:hover {
  background: var(--amber-l);
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(245,158,11,0.4), inset 0 1px 0 rgba(255,255,255,0.2);
}
.btn-ghost {
  background: transparent;
  color: var(--txt);
  border: 1px solid var(--line2);
}
.btn-ghost:hover { border-color: var(--line3); background: var(--bg2); }
.btn-arr { transition: transform 0.2s; }
.btn:hover .btn-arr { transform: translateX(3px); }

/* ═══ PAGE HEADER ═══ */
.ph {
  padding: 60px 0 40px;
  max-width: 800px;
}
.ph-eye {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 700;
  color: var(--amber);
  letter-spacing: 1.4px;
  text-transform: uppercase;
  padding: 5px 10px;
  border: 1px solid var(--amber-a2);
  background: var(--amber-a);
  border-radius: 4px;
  margin-bottom: 18px;
}
.ph-eye::before { content: '●'; color: var(--amber); animation: pulse 2s ease-in-out infinite; }
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
.ph-t {
  font-size: clamp(34px, 5vw, 56px);
  font-weight: 800;
  letter-spacing: -1.8px;
  line-height: 1.05;
  color: var(--txt);
  margin-bottom: 14px;
}
.ph-t em {
  font-style: normal;
  color: var(--amber);
  position: relative;
}
.ph-d {
  font-size: 16px;
  color: var(--txt3);
  max-width: 640px;
  line-height: 1.6;
  font-weight: 400;
}

/* ═══ HERO (home) ═══ */
.hero {
  padding: 72px 0 80px;
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 60px;
  align-items: center;
}
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 600;
  color: var(--amber);
  padding: 6px 12px;
  background: var(--amber-a);
  border: 1px solid var(--amber-a2);
  border-radius: 20px;
  letter-spacing: -0.1px;
  margin-bottom: 24px;
}
.hero-badge::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--amber);
  box-shadow: 0 0 8px var(--amber);
  animation: pulse 2s ease-in-out infinite;
}
.hero-h1 {
  font-size: clamp(44px, 6vw, 78px);
  font-weight: 800;
  letter-spacing: -2.5px;
  line-height: 1.02;
  color: var(--txt);
  margin-bottom: 22px;
}
.hero-h1 em {
  font-style: normal;
  background: linear-gradient(135deg, var(--amber) 0%, var(--amber-l) 50%, var(--violet) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.hero-lead {
  font-size: 17px;
  color: var(--txt3);
  max-width: 560px;
  line-height: 1.55;
  margin-bottom: 32px;
  font-weight: 400;
}
.hero-cta {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 36px;
}
.hero-trust {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  padding-top: 24px;
  border-top: 1px solid var(--line);
  font-size: 12px;
  color: var(--txt4);
  font-weight: 500;
}
.hero-trust b { color: var(--txt); font-weight: 700; }

/* Hero preview card */
.hero-preview {
  background: linear-gradient(180deg, var(--bg1), var(--bg2));
  border: 1px solid var(--line2);
  border-radius: 14px;
  padding: 24px;
  box-shadow: 0 24px 64px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.05) inset;
  position: relative;
}
.hero-preview::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--amber), var(--violet), transparent);
  opacity: 0.5;
}
.hero-preview-hd {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--line);
}
.hero-preview-tt {
  font-size: 11px;
  font-weight: 700;
  color: var(--amber);
  letter-spacing: 1px;
  text-transform: uppercase;
}
.hero-preview-st {
  font-size: 10px;
  font-weight: 600;
  color: var(--green);
  display: inline-flex;
  align-items: center;
  gap: 5px;
}
.hero-preview-st::before {
  content: '';
  width: 6px;
  height: 6px;
  background: var(--green);
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}
.hp-row {
  display: grid;
  grid-template-columns: 28px 36px 1fr auto auto;
  gap: 12px;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid var(--line);
  cursor: pointer;
  transition: all 0.15s;
}
.hp-row:last-child { border-bottom: none; }
.hp-row:hover { transform: translateX(2px); }
.hp-rank {
  font-size: 11px;
  font-weight: 700;
  color: var(--txt5);
  letter-spacing: -0.1px;
}
.hp-logo {
  width: 32px;
  height: 32px;
  border-radius: 7px;
  background: var(--bg3);
  border: 1px solid var(--line);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hp-logo img { width: 100%; height: 100%; object-fit: contain; padding: 3px; }
.hp-nm { font-size: 13.5px; font-weight: 600; color: var(--txt); letter-spacing: -0.2px; }
.hp-meta { font-size: 10px; color: var(--txt4); font-weight: 500; margin-top: 2px; }
.hp-pulse {
  font-size: 15px;
  font-weight: 800;
  color: var(--amber);
  letter-spacing: -0.3px;
}
.hp-deal {
  font-size: 10px;
  font-weight: 700;
  color: var(--amber);
  padding: 3px 8px;
  background: var(--amber-a);
  border: 1px solid var(--amber-a2);
  border-radius: 4px;
  letter-spacing: -0.1px;
}

/* ═══ STAT STRIP ═══ */
.stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  padding: 28px 0 60px;
}
.stat {
  background: var(--bg1);
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 22px 24px;
  position: relative;
  overflow: hidden;
}
.stat::before {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 40px;
  height: 1.5px;
  background: var(--amber);
}
.stat-k {
  font-size: 11px;
  font-weight: 600;
  color: var(--txt4);
  letter-spacing: -0.1px;
  margin-bottom: 8px;
}
.stat-v {
  font-size: 32px;
  font-weight: 800;
  letter-spacing: -1.2px;
  line-height: 1;
  color: var(--txt);
}
.stat-v em { font-style: normal; color: var(--amber); font-weight: 800; }
.stat-v small {
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  color: var(--green);
  margin-left: 6px;
  letter-spacing: 0;
}

/* ═══ SECTION HEADER ═══ */
.sec {
  padding: 48px 0 64px;
  border-top: 1px solid var(--line);
}
.sec-hd {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 16px;
}
.sec-t {
  font-size: 32px;
  font-weight: 800;
  letter-spacing: -1.2px;
  line-height: 1;
  color: var(--txt);
}
.sec-t em { font-style: normal; color: var(--amber); }
.sec-d {
  font-size: 13px;
  color: var(--txt4);
  font-weight: 500;
  margin-top: 6px;
  letter-spacing: -0.1px;
}
.sec-link {
  font-size: 13px;
  font-weight: 600;
  color: var(--amber);
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border: 1px solid var(--amber-a2);
  border-radius: 6px;
  background: var(--amber-a);
  transition: all 0.15s;
  letter-spacing: -0.1px;
}
.sec-link:hover { background: var(--amber-a2); border-color: var(--amber); }

/* ═══ FIRM CARD ═══ */
.firm-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}
.fc {
  background: var(--bg1);
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.fc::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1.5px;
  background: var(--fc-color, var(--amber));
  opacity: 0.7;
}
.fc:hover {
  background: var(--bg2);
  border-color: var(--line2);
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(0,0,0,0.3);
}
.fc-hd {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}
.fc-logo {
  width: 42px;
  height: 42px;
  border-radius: 9px;
  background: var(--bg3);
  border: 1px solid var(--line);
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.fc-logo img { width: 100%; height: 100%; object-fit: contain; padding: 4px; }
.fc-logo-fb { font-size: 12px; font-weight: 700; color: var(--txt3); }
.fc-nm {
  font-size: 17px;
  font-weight: 700;
  letter-spacing: -0.3px;
  color: var(--txt);
  line-height: 1.15;
  margin-bottom: 3px;
}
.fc-meta {
  font-size: 11px;
  color: var(--txt4);
  font-weight: 500;
  letter-spacing: -0.1px;
}
.fc-tag {
  position: absolute;
  top: 18px;
  right: 18px;
  font-size: 9px;
  font-weight: 700;
  color: var(--amber);
  padding: 3px 7px;
  background: var(--amber-a);
  border: 1px solid var(--amber-a2);
  border-radius: 4px;
  letter-spacing: 0.4px;
  text-transform: uppercase;
}
.fc-kpis {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  padding: 14px 0;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  margin-bottom: 16px;
}
.fc-kpi {
  text-align: center;
  border-right: 1px solid var(--line);
}
.fc-kpi:last-child { border-right: none; }
.fc-kpi-v {
  font-size: 20px;
  font-weight: 800;
  letter-spacing: -0.5px;
  color: var(--amber);
  line-height: 1;
  margin-bottom: 4px;
}
.fc-kpi-l {
  font-size: 9px;
  font-weight: 700;
  color: var(--txt4);
  text-transform: uppercase;
  letter-spacing: 0.8px;
}
.fc-desc {
  font-size: 12.5px;
  color: var(--txt3);
  line-height: 1.55;
  margin-bottom: 18px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}
.fc-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding-top: 14px;
  border-top: 1px solid var(--line);
}
.fc-deal {
  font-size: 12px;
  font-weight: 700;
  color: var(--amber);
  background: var(--amber-a);
  border: 1px solid var(--amber-a2);
  padding: 5px 10px;
  border-radius: 5px;
  letter-spacing: -0.1px;
}
.fc-view {
  font-size: 12px;
  font-weight: 600;
  color: var(--txt2);
  display: inline-flex;
  align-items: center;
  gap: 4px;
  transition: color 0.15s;
}
.fc:hover .fc-view { color: var(--amber); }
.fc-view-arr { transition: transform 0.2s; }
.fc:hover .fc-view-arr { transform: translateX(3px); }

/* ═══ DEAL CARD ═══ */
.deal-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}
.dc {
  background: var(--bg1);
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  overflow: hidden;
  text-align: left;
}
.dc::before {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 3px;
  height: 100%;
  background: var(--amber);
}
.dc:hover {
  background: var(--bg2);
  border-color: var(--line2);
  transform: translateY(-2px);
}
.dc-tag {
  position: absolute;
  top: 16px;
  right: 16px;
  font-size: 9px;
  font-weight: 700;
  color: var(--violet);
  padding: 3px 7px;
  background: var(--violet-a);
  border: 1px solid rgba(167,139,250,0.2);
  border-radius: 4px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}
.dc-hd {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
}
.dc-nm { font-size: 14px; font-weight: 700; color: var(--txt); letter-spacing: -0.3px; }
.dc-pct {
  font-size: 42px;
  font-weight: 900;
  color: var(--amber);
  line-height: 1;
  letter-spacing: -1.8px;
  margin-bottom: 6px;
}
.dc-pct em {
  font-style: normal;
  font-size: 14px;
  font-weight: 700;
  color: var(--txt4);
  vertical-align: top;
  margin-left: 4px;
  letter-spacing: -0.2px;
}
.dc-d {
  font-size: 12px;
  color: var(--txt3);
  line-height: 1.5;
  margin-bottom: 16px;
  min-height: 36px;
}
.dc-code-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 14px;
  border-top: 1px solid var(--line);
}
.dc-code-l {
  font-size: 10px;
  font-weight: 700;
  color: var(--txt4);
  letter-spacing: 1px;
  text-transform: uppercase;
}
.dc-code {
  font-size: 13px;
  font-weight: 800;
  color: var(--amber);
  padding: 5px 12px;
  background: var(--bg3);
  border: 1px dashed var(--amber);
  border-radius: 5px;
  letter-spacing: -0.2px;
  cursor: pointer;
}

/* ═══ FIRM DETAIL ═══ */
.detail-back {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 500;
  color: var(--txt3);
  padding: 20px 0 10px;
  transition: color 0.15s;
}
.detail-back:hover { color: var(--amber); }
.detail-hero {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 48px;
  align-items: start;
  padding: 40px 0 56px;
  border-bottom: 1px solid var(--line);
}
.dh-l { padding-top: 8px; }
.dh-logo {
  width: 64px;
  height: 64px;
  border-radius: 14px;
  background: var(--bg1);
  border: 1px solid var(--line2);
  overflow: hidden;
  margin-bottom: 22px;
  padding: 8px;
}
.dh-logo img { width: 100%; height: 100%; object-fit: contain; }
.dh-tags { display: flex; gap: 6px; margin-bottom: 14px; flex-wrap: wrap; }
.dh-tag {
  font-size: 10px;
  font-weight: 700;
  padding: 4px 9px;
  background: var(--bg2);
  border: 1px solid var(--line2);
  border-radius: 4px;
  color: var(--txt2);
  letter-spacing: 0.3px;
  text-transform: uppercase;
}
.dh-tag.amber { color: var(--amber); background: var(--amber-a); border-color: var(--amber-a2); }
.dh-tag.violet { color: var(--violet); background: var(--violet-a); border-color: rgba(167,139,250,0.2); }
.dh-nm {
  font-size: 56px;
  font-weight: 800;
  letter-spacing: -2.2px;
  line-height: 1;
  color: var(--txt);
  margin-bottom: 14px;
}
.dh-tl {
  font-size: 16px;
  color: var(--txt3);
  line-height: 1.55;
  max-width: 520px;
  margin-bottom: 24px;
}
.dh-meta {
  display: flex;
  gap: 18px;
  flex-wrap: wrap;
  font-size: 12px;
  color: var(--txt3);
  font-weight: 500;
  margin-bottom: 28px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--line);
}
.dh-meta b { color: var(--txt); font-weight: 700; }
.dh-cta { display: flex; gap: 10px; flex-wrap: wrap; }

.dh-side {
  background: var(--bg1);
  border: 1px solid var(--line2);
  border-radius: 14px;
  padding: 28px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.3);
  position: sticky;
  top: 100px;
}
.dh-side-pulse {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--line);
  margin-bottom: 20px;
}
.dh-side-pulse-v {
  font-size: 56px;
  font-weight: 900;
  color: var(--amber);
  letter-spacing: -2px;
  line-height: 1;
}
.dh-side-pulse-r {
  text-align: right;
}
.dh-side-pulse-l {
  display: block;
  font-size: 10px;
  font-weight: 700;
  color: var(--txt4);
  text-transform: uppercase;
  letter-spacing: 1px;
}
.dh-side-pulse-s {
  display: block;
  font-size: 11px;
  color: var(--txt3);
  margin-top: 3px;
}
.dh-side-row {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  font-size: 13px;
  border-top: 1px solid var(--line);
}
.dh-side-row:first-of-type { border-top: none; }
.dh-side-row span { color: var(--txt3); font-weight: 500; }
.dh-side-row b { color: var(--txt); font-weight: 600; }
.dh-side-cta {
  margin-top: 20px;
  width: 100%;
  justify-content: center;
  padding: 13px;
}

/* Detail sections */
.dsec {
  padding: 48px 0;
  border-bottom: 1px solid var(--line);
}
.dsec-t {
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.8px;
  color: var(--txt);
  margin-bottom: 20px;
}
.dsec-t em { font-style: normal; color: var(--amber); }

.dstat-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}
.dstat {
  background: var(--bg1);
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 16px 18px;
}
.dstat-k {
  font-size: 10px;
  font-weight: 700;
  color: var(--txt4);
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 8px;
}
.dstat-v {
  font-size: 15px;
  font-weight: 700;
  color: var(--txt);
  letter-spacing: -0.3px;
  line-height: 1.3;
}

.scard {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}
.scard-row {
  display: grid;
  grid-template-columns: 10px 180px 1fr;
  gap: 12px;
  align-items: center;
  padding: 14px 16px;
  background: var(--bg1);
  border: 1px solid var(--line);
  border-radius: 8px;
}
.scard-dot { width: 8px; height: 8px; border-radius: 50%; }
.scard-dot.green { background: var(--green); box-shadow: 0 0 6px rgba(16,185,129,0.5); }
.scard-dot.yellow { background: var(--amber); box-shadow: 0 0 6px rgba(245,158,11,0.5); }
.scard-dot.red { background: var(--red); box-shadow: 0 0 6px rgba(239,68,68,0.5); }
.scard-k {
  font-size: 12px;
  font-weight: 700;
  color: var(--txt);
  letter-spacing: -0.1px;
}
.scard-v {
  font-size: 12px;
  color: var(--txt3);
  line-height: 1.5;
}

.faq-cat {
  margin-bottom: 22px;
  background: var(--bg1);
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 8px 4px;
}
.faq-cat-t {
  font-size: 13px;
  font-weight: 800;
  color: var(--amber);
  letter-spacing: 0.3px;
  text-transform: uppercase;
  padding: 12px 18px;
  border-bottom: 1px solid var(--line);
}
.faq-item {
  padding: 14px 18px;
  border-bottom: 1px solid var(--line);
}
.faq-item:last-child { border-bottom: none; }
.faq-q {
  font-size: 13.5px;
  font-weight: 600;
  color: var(--txt);
  letter-spacing: -0.2px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
}
.faq-q::after {
  content: '+';
  font-size: 18px;
  font-weight: 500;
  color: var(--txt4);
  transition: all 0.2s;
}
.faq-item.open .faq-q::after { content: '−'; color: var(--amber); }
.faq-a {
  display: none;
  font-size: 13px;
  color: var(--txt3);
  line-height: 1.65;
  padding-top: 10px;
}
.faq-item.open .faq-a { display: block; }

/* ═══ QUIZ ═══ */
.quiz-wrap { max-width: 680px; margin: 0 auto; padding: 60px 0 80px; }
.quiz-prog {
  height: 3px;
  background: var(--bg3);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 14px;
}
.quiz-prog span {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, var(--amber), var(--amber-l));
  border-radius: 10px;
  transition: width 0.4s ease;
}
.quiz-step {
  font-size: 11px;
  font-weight: 700;
  color: var(--amber);
  letter-spacing: 1.4px;
  text-transform: uppercase;
  margin-bottom: 16px;
}
.quiz-q {
  font-size: 40px;
  font-weight: 800;
  letter-spacing: -1.5px;
  line-height: 1.08;
  color: var(--txt);
  margin-bottom: 12px;
}
.quiz-sub {
  font-size: 15px;
  color: var(--txt3);
  margin-bottom: 36px;
}
.quiz-opts { display: flex; flex-direction: column; gap: 8px; margin-bottom: 24px; }
.quiz-opt {
  background: var(--bg1);
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 20px 22px;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.16s;
}
.quiz-opt:hover {
  border-color: var(--amber);
  background: var(--bg2);
  transform: translateX(3px);
}
.quiz-opt-letter {
  width: 32px;
  height: 32px;
  border-radius: 7px;
  background: var(--bg3);
  border: 1px solid var(--line2);
  font-size: 12px;
  font-weight: 800;
  color: var(--txt3);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s;
}
.quiz-opt:hover .quiz-opt-letter {
  background: var(--amber);
  color: var(--bg);
  border-color: var(--amber);
}
.quiz-opt-content { flex: 1; min-width: 0; }
.quiz-opt-l {
  font-size: 15px;
  font-weight: 700;
  color: var(--txt);
  letter-spacing: -0.2px;
  margin-bottom: 3px;
}
.quiz-opt-d {
  font-size: 12px;
  color: var(--txt4);
  font-weight: 500;
}
.quiz-opt-arr {
  font-size: 15px;
  color: var(--txt5);
  transition: all 0.2s;
}
.quiz-opt:hover .quiz-opt-arr { color: var(--amber); transform: translateX(3px); }
.quiz-back {
  font-size: 12px;
  font-weight: 600;
  color: var(--txt3);
  padding: 8px 14px;
  border: 1px solid var(--line2);
  border-radius: 6px;
  transition: all 0.15s;
}
.quiz-back:hover { color: var(--amber); border-color: var(--amber); }

.results-hd {
  padding: 40px 0 32px;
  text-align: center;
  border-bottom: 1px solid var(--line);
  margin-bottom: 20px;
}
.results-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 700;
  color: var(--amber);
  padding: 5px 12px;
  background: var(--amber-a);
  border: 1px solid var(--amber-a2);
  border-radius: 20px;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  margin-bottom: 18px;
}
.results-t {
  font-size: 36px;
  font-weight: 800;
  letter-spacing: -1.2px;
  line-height: 1.1;
  color: var(--txt);
  margin-bottom: 12px;
}
.results-t em { font-style: normal; color: var(--amber); }
.results-sub { font-size: 14px; color: var(--txt3); }
.result-row {
  display: grid;
  grid-template-columns: 28px 44px 1fr 80px auto;
  gap: 16px;
  align-items: center;
  padding: 18px 22px;
  background: var(--bg1);
  border: 1px solid var(--line);
  border-radius: 10px;
  margin-bottom: 8px;
  transition: all 0.18s;
}
.result-row:hover { background: var(--bg2); transform: translateY(-2px); }
.result-row.top {
  border-color: var(--amber);
  background: linear-gradient(90deg, var(--amber-a), var(--bg1));
}
.result-rank {
  font-size: 12px;
  font-weight: 700;
  color: var(--txt4);
}
.result-logo {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: var(--bg3);
  border: 1px solid var(--line);
  overflow: hidden;
  padding: 4px;
}
.result-logo img { width: 100%; height: 100%; object-fit: contain; }
.result-nm { font-size: 16px; font-weight: 700; color: var(--txt); letter-spacing: -0.3px; margin-bottom: 4px; }
.result-reasons {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 10px;
  font-size: 11px;
  color: var(--txt3);
}
.result-reasons span::before { content: '✓'; color: var(--green); font-weight: 700; margin-right: 4px; }
.result-score {
  font-size: 30px;
  font-weight: 900;
  color: var(--amber);
  letter-spacing: -0.8px;
  line-height: 1;
  text-align: right;
}
.result-score small {
  display: block;
  font-size: 9px;
  color: var(--txt4);
  font-weight: 700;
  letter-spacing: 1px;
  margin-top: 3px;
}
.result-act { display: flex; gap: 6px; }
.result-btn {
  padding: 7px 14px;
  font-size: 11.5px;
  font-weight: 600;
  border-radius: 6px;
  border: 1px solid var(--line2);
  color: var(--txt);
  white-space: nowrap;
  transition: all 0.15s;
}
.result-btn:hover { border-color: var(--amber); color: var(--amber); }
.result-btn.primary { background: var(--amber); color: var(--bg); border-color: var(--amber); font-weight: 700; }

/* ═══ CHALLENGES TABLE ═══ */
.filters {
  display: flex;
  gap: 10px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: center;
}
.filters select {
  padding: 10px 14px;
  font-size: 13px;
  font-weight: 600;
  background: var(--bg1);
  color: var(--txt);
  border: 1px solid var(--line2);
  border-radius: 7px;
  font-family: inherit;
  cursor: pointer;
  outline: none;
  transition: border 0.15s;
}
.filters select:focus, .filters select:hover { border-color: var(--amber); }
.filters button {
  padding: 10px 16px;
  font-size: 13px;
  font-weight: 600;
  background: var(--bg1);
  color: var(--txt3);
  border: 1px solid var(--line2);
  border-radius: 7px;
  transition: all 0.15s;
  letter-spacing: -0.1px;
}
.filters button:hover { color: var(--txt); border-color: var(--line3); }
.filters button.on { background: var(--amber); color: var(--bg); border-color: var(--amber); font-weight: 700; }

.tbl-wrap { overflow: auto; border: 1px solid var(--line); border-radius: 10px; background: var(--bg1); }
.tbl {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-size: 13px;
}
.tbl thead th {
  font-size: 10.5px;
  font-weight: 700;
  color: var(--txt4);
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 14px 16px;
  text-align: left;
  background: var(--bg2);
  border-bottom: 1px solid var(--line);
}
.tbl tbody td {
  padding: 14px 16px;
  border-bottom: 1px solid var(--line);
  color: var(--txt2);
  font-weight: 500;
  vertical-align: middle;
}
.tbl tbody tr:hover td { background: var(--bg2); }
.tbl tbody tr:last-child td { border-bottom: none; }
.tbl-firm {
  display: flex;
  align-items: center;
  gap: 10px;
}
.tbl-firm img {
  width: 26px;
  height: 26px;
  border-radius: 6px;
  background: var(--bg3);
  border: 1px solid var(--line);
  padding: 3px;
}
.tbl-firm b { font-size: 13px; font-weight: 700; color: var(--txt); letter-spacing: -0.2px; }
.tbl-firm .plan { font-size: 11px; color: var(--amber); font-weight: 600; }
.tbl-price {
  font-size: 14px;
  font-weight: 800;
  color: var(--amber);
  letter-spacing: -0.2px;
}

/* ═══ SIMULATOR ═══ */
.sim {
  max-width: 900px;
  margin: 0 auto;
  background: var(--bg1);
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 28px;
}
.sim-ctrls {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-bottom: 20px;
}
.sim-ctrl label {
  display: block;
  font-size: 10px;
  font-weight: 700;
  color: var(--txt4);
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 6px;
}
.sim-ctrl select {
  width: 100%;
  padding: 11px 14px;
  font-size: 13px;
  font-weight: 600;
  background: var(--bg2);
  color: var(--txt);
  border: 1px solid var(--line2);
  border-radius: 7px;
  font-family: inherit;
  cursor: pointer;
  outline: none;
  transition: border 0.15s;
}
.sim-ctrl select:focus, .sim-ctrl select:hover { border-color: var(--amber); }
.sim-chart {
  background: var(--bg2);
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 18px;
  margin-bottom: 16px;
  position: relative;
}
.sim-chart::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
  background-size: 24px 24px;
  pointer-events: none;
  border-radius: 10px;
}
.sim-chart svg { width: 100%; height: auto; display: block; position: relative; }
.sim-verdict {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 18px 22px;
  border-radius: 10px;
  margin-bottom: 14px;
}
.sim-verdict.pass { background: var(--green-a); border: 1px solid rgba(16,185,129,0.3); }
.sim-verdict.fail { background: var(--red-a); border: 1px solid rgba(239,68,68,0.3); }
.sim-verdict-ic {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  font-size: 20px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.sim-verdict.pass .sim-verdict-ic { background: var(--green); color: var(--bg); }
.sim-verdict.fail .sim-verdict-ic { background: var(--red); color: var(--txt); }
.sim-verdict-t { font-size: 17px; font-weight: 800; color: var(--txt); letter-spacing: -0.3px; margin-bottom: 3px; }
.sim-verdict-d { font-size: 12.5px; color: var(--txt3); line-height: 1.55; }
.sim-legend {
  display: flex;
  gap: 18px;
  padding-top: 12px;
  border-top: 1px solid var(--line);
  font-size: 11px;
  color: var(--txt3);
  flex-wrap: wrap;
}
.sim-legend span { display: inline-flex; align-items: center; gap: 6px; font-weight: 500; }
.sim-legend-dot { width: 14px; height: 2px; border-radius: 2px; display: inline-block; }
.sim-legend b { color: var(--txt); font-weight: 700; }

/* ═══ RESEARCH ═══ */
.research-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 14px;
}
.research-main {
  background: var(--bg1);
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 36px;
  cursor: pointer;
  transition: all 0.2s;
}
.research-main:hover { background: var(--bg2); transform: translateY(-3px); }
.research-cat {
  display: inline-block;
  font-size: 10px;
  font-weight: 700;
  color: var(--amber);
  padding: 4px 10px;
  background: var(--amber-a);
  border: 1px solid var(--amber-a2);
  border-radius: 4px;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  margin-bottom: 18px;
}
.research-t {
  font-size: 28px;
  font-weight: 800;
  letter-spacing: -1px;
  line-height: 1.15;
  color: var(--txt);
  margin-bottom: 12px;
}
.research-excerpt {
  font-size: 14px;
  color: var(--txt3);
  line-height: 1.6;
  margin-bottom: 18px;
}
.research-date {
  font-size: 11px;
  color: var(--txt4);
  font-weight: 600;
  letter-spacing: -0.1px;
}
.research-side { display: flex; flex-direction: column; gap: 10px; }
.research-card {
  background: var(--bg1);
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.15s;
}
.research-card:hover { background: var(--bg2); border-color: var(--line2); }
.research-card-t {
  font-size: 14px;
  font-weight: 700;
  color: var(--txt);
  letter-spacing: -0.3px;
  line-height: 1.3;
  margin: 10px 0 8px;
}

/* ═══ REWARDS ═══ */
.rewards-hero {
  background: linear-gradient(135deg, var(--bg1), var(--bg2));
  border: 1px solid var(--line2);
  border-radius: 18px;
  padding: 56px 48px;
  text-align: center;
  margin-bottom: 28px;
  position: relative;
  overflow: hidden;
}
.rewards-hero::before {
  content: '';
  position: absolute;
  top: 0; left: 50%;
  width: 600px;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--amber), var(--violet), transparent);
  transform: translateX(-50%);
}
.rewards-hero-tag {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  color: var(--amber);
  padding: 5px 12px;
  background: var(--amber-a);
  border: 1px solid var(--amber-a2);
  border-radius: 20px;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  margin-bottom: 20px;
}
.rewards-hero-t {
  font-size: 48px;
  font-weight: 800;
  letter-spacing: -1.8px;
  line-height: 1.05;
  color: var(--txt);
  margin-bottom: 18px;
}
.rewards-hero-t em {
  font-style: normal;
  background: linear-gradient(135deg, var(--amber), var(--violet));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.rewards-hero-d {
  font-size: 16px;
  color: var(--txt3);
  max-width: 560px;
  margin: 0 auto 28px;
  line-height: 1.6;
}
.rewards-steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}
.rewards-step {
  background: var(--bg1);
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 22px;
  text-align: left;
}
.rewards-step-n {
  font-size: 24px;
  font-weight: 900;
  color: var(--amber);
  letter-spacing: -0.5px;
  line-height: 1;
  margin-bottom: 12px;
}
.rewards-step-t { font-size: 14px; font-weight: 700; color: var(--txt); letter-spacing: -0.2px; margin-bottom: 5px; }
.rewards-step-d { font-size: 12px; color: var(--txt3); line-height: 1.5; }

/* ═══ FOOTER ═══ */
.ftr {
  margin-top: 80px;
  padding: 48px 32px 28px;
  border-top: 1px solid var(--line);
  background: var(--bg1);
}
.ftr-inner {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 40px;
}
.ftr-brand {
  font-size: 18px;
  font-weight: 800;
  color: var(--txt);
  letter-spacing: -0.4px;
  margin-bottom: 12px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
}
.ftr-tag { font-size: 13px; color: var(--txt3); line-height: 1.55; max-width: 320px; margin-bottom: 14px; }
.ftr-col h4 { font-size: 11px; font-weight: 700; color: var(--amber); margin-bottom: 14px; letter-spacing: 0.8px; text-transform: uppercase; }
.ftr-col a, .ftr-col button {
  display: block;
  font-size: 13px;
  color: var(--txt3);
  padding: 5px 0;
  transition: color 0.15s;
  font-weight: 500;
  text-align: left;
}
.ftr-col a:hover, .ftr-col button:hover { color: var(--amber); }
.ftr-btm {
  max-width: 1400px;
  margin: 28px auto 0;
  padding-top: 20px;
  border-top: 1px solid var(--line);
  font-size: 11px;
  color: var(--txt4);
  text-align: center;
}

/* ═══ AUTH MODAL ═══ */
.auth-bg {
  position: fixed; inset: 0; z-index: 300;
  background: rgba(10,10,15,0.85);
  backdrop-filter: blur(8px);
  display: flex; align-items: center; justify-content: center;
  padding: 20px;
}
.auth-box {
  background: var(--bg1);
  border: 1px solid var(--line2);
  border-radius: 14px;
  padding: 40px;
  max-width: 400px;
  width: 100%;
  position: relative;
}
.auth-close {
  position: absolute;
  top: 14px; right: 14px;
  width: 28px; height: 28px;
  border-radius: 6px;
  background: var(--bg3);
  color: var(--txt3);
  font-size: 13px;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.15s;
}
.auth-close:hover { background: var(--bg4); color: var(--txt); }
.auth-h { font-size: 26px; font-weight: 800; letter-spacing: -1px; color: var(--txt); margin-bottom: 6px; }
.auth-h em { font-style: normal; color: var(--amber); }
.auth-d { font-size: 13px; color: var(--txt3); margin-bottom: 22px; }
.auth-tab { display: flex; background: var(--bg2); padding: 3px; border-radius: 8px; margin-bottom: 20px; }
.auth-tab button {
  flex: 1;
  padding: 9px;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--txt3);
  border-radius: 6px;
  transition: all 0.15s;
}
.auth-tab button.on { background: var(--bg3); color: var(--txt); }
.auth-inp {
  display: block;
  width: 100%;
  padding: 12px 14px;
  background: var(--bg2);
  color: var(--txt);
  font-size: 13.5px;
  font-weight: 500;
  border: 1px solid var(--line2);
  border-radius: 8px;
  margin-bottom: 10px;
  font-family: inherit;
  outline: none;
  transition: border 0.15s;
}
.auth-inp:focus { border-color: var(--amber); }
.auth-inp::placeholder { color: var(--txt4); }
.auth-sub {
  width: 100%;
  padding: 13px;
  background: var(--amber);
  color: var(--bg);
  border-radius: 8px;
  font-size: 13px;
  font-weight: 700;
  transition: all 0.15s;
  margin-top: 4px;
  box-shadow: 0 2px 8px rgba(245,158,11,0.3);
}
.auth-sub:hover { background: var(--amber-l); box-shadow: 0 6px 16px rgba(245,158,11,0.4); }
.auth-err {
  font-size: 12px;
  font-weight: 600;
  color: var(--red);
  padding: 10px 12px;
  background: var(--red-a);
  border: 1px solid rgba(239,68,68,0.3);
  border-radius: 7px;
  margin-bottom: 10px;
}

/* ═══ USER PANEL ═══ */
.user-panel {
  position: fixed;
  top: 80px; right: 32px;
  width: 260px;
  background: var(--bg1);
  border: 1px solid var(--line2);
  border-radius: 12px;
  padding: 16px;
  z-index: 45;
  box-shadow: 0 12px 40px rgba(0,0,0,0.5);
}
.user-panel-hd {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--line);
  margin-bottom: 12px;
}
.user-panel-avatar { width: 36px; height: 36px; border-radius: 50%; background: var(--bg3); background-size: cover; }
.user-panel-nm { font-size: 13px; font-weight: 700; color: var(--txt); letter-spacing: -0.2px; }
.user-panel-em { font-size: 11px; color: var(--txt4); margin-top: 2px; font-weight: 500; }
.user-panel-item {
  display: block;
  width: 100%;
  padding: 9px 10px;
  font-size: 12.5px;
  color: var(--txt2);
  text-align: left;
  border-radius: 6px;
  transition: all 0.15s;
  font-weight: 500;
}
.user-panel-item:hover { background: var(--bg2); color: var(--amber); }

/* ═══ RESPONSIVE ═══ */
@media (max-width: 980px) {
  .nav-inner { grid-template-columns: auto auto; gap: 12px; padding: 12px 20px; }
  .nav-links { display: none; }
  .nav-mob { display: inline-flex; align-items: center; justify-content: center; width: 40px; height: 40px; }
  .nav-mob-menu.open { display: block; padding: 12px 20px 20px; border-top: 1px solid var(--line); background: var(--bg1); }
  .wrap, .ftr { padding-left: 20px; padding-right: 20px; }
  .hero { grid-template-columns: 1fr; gap: 40px; padding: 40px 0 50px; }
  .stats { grid-template-columns: 1fr 1fr; }
  .firm-grid, .deal-grid { grid-template-columns: 1fr 1fr; }
  .detail-hero { grid-template-columns: 1fr; gap: 32px; }
  .dh-side { position: static; }
  .dh-nm { font-size: 40px; }
  .dstat-grid { grid-template-columns: 1fr 1fr; }
  .scard { grid-template-columns: 1fr; }
  .quiz-q { font-size: 28px; }
  .research-grid { grid-template-columns: 1fr; }
  .rewards-hero { padding: 40px 24px; }
  .rewards-hero-t { font-size: 34px; }
  .rewards-steps { grid-template-columns: 1fr 1fr; }
  .ftr-inner { grid-template-columns: 1fr 1fr; gap: 28px; }
  .sim-ctrls { grid-template-columns: 1fr; }
  .result-row { grid-template-columns: 24px 40px 1fr auto; gap: 10px; padding: 14px; }
  .result-act { display: none; }
  .result-score { font-size: 24px; }
}
@media (max-width: 560px) {
  .firm-grid, .deal-grid, .rewards-steps { grid-template-columns: 1fr; }
  .stats { grid-template-columns: 1fr; }
}
`;

// ═══════════════════════════════════════════════════════════════════════════
// SHARED COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════
const Logo = ({ firm, size = 42 }) => {
  const logo = LOGOS[firm.name];
  return (
    <div className="fc-logo" style={{ width: size, height: size }}>
      {logo ? <img src={logo} alt={firm.name} /> : <span className="fc-logo-fb">{firm.initials}</span>}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// NAV
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
          <span className="nav-logo-mark">P</span>
          Prop<em>Pulse</em>
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
              <button className="btn-nav ghost" onClick={onSignIn}>Sign In</button>
              <a href="#/quiz" className="btn-nav primary">Find My Firm</a>
            </>
          )}
          <button className="nav-mob" onClick={() => setMob(!mob)}>☰</button>
        </div>
      </div>
      <div className={`nav-mob-menu ${mob ? "open" : ""}`}>
        {links.map(([href, label]) => (
          <a key={href} href={href} className={`nav-link ${isActive(href) ? "active" : ""}`} style={{ display: "block", padding: "10px 14px", marginBottom: 2 }} onClick={() => setMob(false)}>{label}</a>
        ))}
      </div>
    </nav>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// MARKET TICKER
// ═══════════════════════════════════════════════════════════════════════════
const MktTicker = () => {
  const items = [];
  FIRMS.slice(0, 8).forEach(f => {
    const ps = PULSE_SCORES[f.name] || 75;
    const deal = DEALS.find(d => d.firm === f.name);
    items.push({ firm: f.name.split(" ")[0], ps, deal: deal?.pct });
  });
  const all = [...items, ...items, ...items];
  return (
    <div className="mkt">
      <div className="mkt-track">
        {all.map((i, idx) => (
          <span key={idx} className="mkt-item">
            {i.firm} <b>PULSE {i.ps}</b>
            {i.deal && <span className="chg">{i.deal}</span>}
          </span>
        ))}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// FIRM CARD
// ═══════════════════════════════════════════════════════════════════════════
const FirmCard = ({ firm }) => {
  const ps = PULSE_SCORES[firm.name] || 75;
  const deal = DEALS.find(d => d.firm === firm.name);
  return (
    <a href={`#/firm/${firm.id}`} className="fc" style={{ "--fc-color": firm.color }}>
      {firm.bestFor && <span className="fc-tag">{firm.bestFor}</span>}
      <div className="fc-hd">
        <Logo firm={firm} />
        <div>
          <div className="fc-nm">{firm.name}</div>
          <div className="fc-meta">{firm.flag} {firm.hq.split(",")[0]} · Est. {firm.founded}</div>
        </div>
      </div>
      <div className="fc-kpis">
        <div className="fc-kpi">
          <div className="fc-kpi-v">{ps}</div>
          <div className="fc-kpi-l">Pulse</div>
        </div>
        <div className="fc-kpi">
          <div className="fc-kpi-v">★{firm.rating}</div>
          <div className="fc-kpi-l">Rating</div>
        </div>
        <div className="fc-kpi">
          <div className="fc-kpi-v" style={{ fontSize: 14, fontWeight: 700 }}>{firm.maxAlloc.split(" ")[0]}</div>
          <div className="fc-kpi-l">Max</div>
        </div>
      </div>
      <p className="fc-desc">{firm.desc}</p>
      <div className="fc-foot">
        {deal ? <span className="fc-deal">{deal.pct} · {deal.code}</span> : <span />}
        <span className="fc-view">View firm <span className="fc-view-arr">→</span></span>
      </div>
    </a>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// HOME PAGE
// ═══════════════════════════════════════════════════════════════════════════
const HomePage = () => {
  const sorted = [...FIRMS].sort((a, b) => (PULSE_SCORES[b.name] || 0) - (PULSE_SCORES[a.name] || 0));
  const top5 = sorted.slice(0, 5);
  const topDiscount = DEALS.reduce((m, d) => Math.max(m, parseInt(d.pct)), 0);
  return (
    <div>
      <div className="wrap">
        <section className="hero">
          <div>
            <div className="hero-badge">Live Index · {FIRMS.length} futures firms tracked</div>
            <h1 className="hero-h1">Find your edge. <em>Pick the right firm.</em></h1>
            <p className="hero-lead">
              PropPulse ranks every futures prop firm against your trading style, budget, and rules. Take a 6-question quiz, see the live data, unlock our discount code.
            </p>
            <div className="hero-cta">
              <a href="#/quiz" className="btn btn-primary">Take Match Quiz <span className="btn-arr">→</span></a>
              <a href="#/firms" className="btn btn-ghost">Browse all {FIRMS.length} firms</a>
            </div>
            <div className="hero-trust">
              <span>Universal code: <b style={{ color: "var(--amber)" }}>TPP</b></span>
              <span>·</span>
              <span>Up to <b>{topDiscount}%</b> off</span>
              <span>·</span>
              <span><b>{DEALS.length}</b> live deals</span>
            </div>
          </div>
          <div className="hero-preview">
            <div className="hero-preview-hd">
              <span className="hero-preview-tt">Top Ranked · Live</span>
              <span className="hero-preview-st">SYNCED</span>
            </div>
            {top5.map((f, i) => {
              const ps = PULSE_SCORES[f.name] || 75;
              const deal = DEALS.find(d => d.firm === f.name);
              return (
                <a key={f.id} href={`#/firm/${f.id}`} className="hp-row">
                  <span className="hp-rank">#{i + 1}</span>
                  <div className="hp-logo">
                    {LOGOS[f.name] ? <img src={LOGOS[f.name]} alt="" /> : <span style={{ fontSize: 10, fontWeight: 700, color: "var(--txt3)" }}>{f.initials}</span>}
                  </div>
                  <div>
                    <div className="hp-nm">{f.name}</div>
                    <div className="hp-meta">{f.flag} {f.bestFor}</div>
                  </div>
                  <span className="hp-pulse">{ps}</span>
                  {deal && <span className="hp-deal">{deal.pct}</span>}
                </a>
              );
            })}
          </div>
        </section>

        <div className="stats">
          <div className="stat">
            <div className="stat-k">Firms Tracked</div>
            <div className="stat-v"><em>{FIRMS.length}</em><small>LIVE</small></div>
          </div>
          <div className="stat">
            <div className="stat-k">Active Deals</div>
            <div className="stat-v"><em>{DEALS.length}</em><small>↑{topDiscount}%</small></div>
          </div>
          <div className="stat">
            <div className="stat-k">Top Pulse</div>
            <div className="stat-v"><em>{Math.max(...Object.values(PULSE_SCORES))}</em><small>{sorted[0].name.split(" ")[0]}</small></div>
          </div>
          <div className="stat">
            <div className="stat-k">Universal Code</div>
            <div className="stat-v" style={{ fontSize: 28 }}><em>TPP</em></div>
          </div>
        </div>

        <section className="sec">
          <div className="sec-hd">
            <div>
              <h2 className="sec-t">Top <em>ranked</em> firms</h2>
              <div className="sec-d">Sorted by proprietary Pulse Score — updated weekly</div>
            </div>
            <a href="#/firms" className="sec-link">See all {FIRMS.length} firms →</a>
          </div>
          <div className="firm-grid">
            {sorted.slice(0, 6).map(f => <FirmCard key={f.id} firm={f} />)}
          </div>
        </section>

        <section className="sec">
          <div className="sec-hd">
            <div>
              <h2 className="sec-t">Live <em>deals</em></h2>
              <div className="sec-d">Fresh codes — copy at checkout, save instantly</div>
            </div>
            <a href="#/deals" className="sec-link">All {DEALS.length} deals →</a>
          </div>
          <div className="deal-grid">
            {DEALS.slice(0, 6).map((d, i) => {
              const f = FIRMS.find(ff => ff.name === d.firm);
              return (
                <button key={i} className="dc" onClick={() => f && trackClick(f.name)}>
                  {d.tag && <span className="dc-tag">{d.tag}</span>}
                  <div className="dc-hd">
                    {f && <Logo firm={f} size={30} />}
                    <div className="dc-nm">{d.firm}</div>
                  </div>
                  <div className="dc-pct">{d.pct.replace("% OFF", "").replace("%", "")}<em>% OFF</em></div>
                  <div className="dc-d">{d.desc}</div>
                  <div className="dc-code-wrap">
                    <span className="dc-code-l">Code</span>
                    <span className="dc-code" onClick={(e) => { e.stopPropagation(); copyCode(d.code); }}>{d.code}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      </div>
    </div>
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
    <div className="wrap">
      <div className="ph">
        <div className="ph-eye">The Firms Index</div>
        <h1 className="ph-t">All <em>{FIRMS.length} futures firms</em>, ranked.</h1>
        <p className="ph-d">Sort by Pulse Score, rating, age, or allocation. Filter by rule type. Every firm independently reviewed.</p>
      </div>
      <div className="filters">
        <button className={filter === "all" ? "on" : ""} onClick={() => setFilter("all")}>All firms</button>
        <button className={filter === "instant" ? "on" : ""} onClick={() => setFilter("instant")}>Instant fund</button>
        <button className={filter === "noDLL" ? "on" : ""} onClick={() => setFilter("noDLL")}>No DLL</button>
        <button className={filter === "noConsistency" ? "on" : ""} onClick={() => setFilter("noConsistency")}>No consistency</button>
        <div style={{ marginLeft: "auto" }}>
          <select value={sort} onChange={e => setSort(e.target.value)}>
            <option value="pulse">Sort: Pulse Score</option>
            <option value="rating">Sort: Rating</option>
            <option value="newest">Sort: Newest</option>
            <option value="alloc">Sort: Max Allocation</option>
          </select>
        </div>
      </div>
      <div className="firm-grid" style={{ paddingBottom: 60 }}>
        {sorted.map(f => <FirmCard key={f.id} firm={f} />)}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// FIRM DETAIL
// ═══════════════════════════════════════════════════════════════════════════
const FirmDetailPage = ({ firmId }) => {
  const firm = FIRMS.find(f => String(f.id) === String(firmId));
  const [openFaq, setOpenFaq] = useState(null);
  if (!firm) return <div className="wrap"><div className="ph"><h1 className="ph-t">Firm not found.</h1><a href="#/firms" className="btn btn-ghost" style={{ marginTop: 16 }}>← Back to firms</a></div></div>;
  const ps = PULSE_SCORES[firm.name] || 75;
  const deal = DEALS.find(d => d.firm === firm.name);
  const profile = FIRM_PROFILES[firm.name];
  const faq = FIRM_FAQ[firm.name] || [];
  const scorecard = SCORECARD_DATA[firm.name] || [];

  return (
    <div className="wrap">
      <a href="#/firms" className="detail-back">← All firms</a>
      <section className="detail-hero">
        <div className="dh-l">
          <div className="dh-logo">{LOGOS[firm.name] ? <img src={LOGOS[firm.name]} alt="" /> : firm.initials}</div>
          <div className="dh-tags">
            {firm.bestFor && <span className="dh-tag amber">{firm.bestFor}</span>}
            {firm.instantFund && <span className="dh-tag violet">Instant Fund</span>}
            <span className="dh-tag">Est. {firm.founded}</span>
          </div>
          <h1 className="dh-nm">{firm.name}</h1>
          {profile?.tagline && <p className="dh-tl">{profile.tagline}</p>}
          <div className="dh-meta">
            <span>{firm.flag} <b>{firm.hq}</b></span>
            <span>★ <b>{firm.rating}</b> ({firm.reviews.toLocaleString()} reviews)</span>
            {profile?.ceo && <span>CEO <b>{profile.ceo}</b></span>}
            {profile?.totalPayouts && <span>Payouts <b>{profile.totalPayouts}</b></span>}
          </div>
          <div className="dh-cta">
            <button className="btn btn-primary" onClick={() => trackClick(firm.name)}>{deal ? `Claim ${deal.pct}` : "Visit site"} <span className="btn-arr">→</span></button>
            <a href="#/quiz" className="btn btn-ghost">Compare in quiz</a>
          </div>
        </div>
        <div className="dh-side">
          <div className="dh-side-pulse">
            <div className="dh-side-pulse-v">{ps}</div>
            <div className="dh-side-pulse-r">
              <span className="dh-side-pulse-l">Pulse Score</span>
              <span className="dh-side-pulse-s">Out of 100</span>
            </div>
          </div>
          <div className="dh-side-row"><span>Max Allocation</span><b>{firm.maxAlloc}</b></div>
          <div className="dh-side-row"><span>Profit Split</span><b>{firm.split.split(" ")[0]}</b></div>
          <div className="dh-side-row"><span>Max Drawdown</span><b>{firm.maxDD}</b></div>
          <div className="dh-side-row"><span>Payout Speed</span><b>{firm.paySpeed.split("(")[0].trim()}</b></div>
          <div className="dh-side-row"><span>Drawdown Type</span><b>{firm.drawdownType.split(" /")[0]}</b></div>
          <div className="dh-side-row"><span>Min Payout</span><b>{firm.minPayout}</b></div>
          {deal && (
            <button className="btn btn-primary dh-side-cta" onClick={() => trackClick(firm.name)}>
              Code <b style={{ margin: "0 4px", padding: "1px 7px", background: "rgba(0,0,0,0.2)", borderRadius: 3 }}>{deal.code}</b> →
            </button>
          )}
        </div>
      </section>

      <section className="dsec">
        <h2 className="dsec-t">About <em>{firm.name}</em></h2>
        <p style={{ fontSize: 15, color: "var(--txt2)", lineHeight: 1.7, maxWidth: 840 }}>
          {profile?.description || firm.desc}
        </p>
      </section>

      <section className="dsec">
        <h2 className="dsec-t">Key <em>metrics</em></h2>
        <div className="dstat-grid">
          <div className="dstat"><div className="dstat-k">Profit Target</div><div className="dstat-v">{firm.target}</div></div>
          <div className="dstat"><div className="dstat-k">Daily DD</div><div className="dstat-v">{firm.dailyDD}</div></div>
          <div className="dstat"><div className="dstat-k">Min Payout</div><div className="dstat-v">{firm.minPayout}</div></div>
          <div className="dstat"><div className="dstat-k">Reset Fee</div><div className="dstat-v">{firm.reset}</div></div>
          <div className="dstat"><div className="dstat-k">Platforms</div><div className="dstat-v" style={{ fontSize: 12 }}>{firm.platforms.slice(0, 3).join(", ")}</div></div>
          <div className="dstat"><div className="dstat-k">Consistency</div><div className="dstat-v">{firm.hasConsistency ? firm.consistencyPct : "None"}</div></div>
          <div className="dstat"><div className="dstat-k">News</div><div className="dstat-v">{firm.newsTrading ? "Allowed" : "Restricted"}</div></div>
          <div className="dstat"><div className="dstat-k">EAs / Bots</div><div className="dstat-v">{firm.eaAllowed ? "Allowed" : "Restricted"}</div></div>
        </div>
      </section>

      {scorecard.length > 0 && (
        <section className="dsec">
          <h2 className="dsec-t">Fine print <em>scorecard</em></h2>
          <div className="scard">
            {scorecard.map((r, i) => (
              <div key={i} className="scard-row">
                <div className={`scard-dot ${r.tone}`} />
                <div className="scard-k">{r.k}</div>
                <div className="scard-v">{r.v}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {faq.length > 0 && (
        <section className="dsec">
          <h2 className="dsec-t">Frequently <em>asked</em></h2>
          {faq.map((cat, ci) => (
            <div key={ci} className="faq-cat">
              <div className="faq-cat-t">{cat.cat}</div>
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
// QUIZ
// ═══════════════════════════════════════════════════════════════════════════
const scoreQuiz = (firm, answers) => {
  let s = 50;
  const reasons = [];
  const n = firm.name;
  if (answers.style === "swing") {
    if (n === "Goat Funded Futures") { s += 8; reasons.push("Express allows overnight"); } else s -= 5;
  }
  if (answers.style === "scalp" || answers.style === "intraday") {
    if (n === "Tradeify") { s += 10; reasons.push("~1hr payouts"); }
    if (n === "My Funded Futures") { s += 8; reasons.push("Rapid = 90/10 split"); }
  }
  if (answers.budget === "low") {
    if (n === "Top One Futures") { s += 10; reasons.push("$39/mo Elite"); }
    if (n === "Tradeify") { s += 8; reasons.push("Growth 25K = $99"); }
  }
  if (answers.budget === "high") {
    if (n === "Apex Trader Funding") { s += 6; reasons.push("Up to 20 accts"); }
  }
  if (answers.dd === "eod") {
    if (["Tradeify", "Alpha Futures", "Bulenox", "FundedNext Futures"].includes(n)) { s += 10; reasons.push("EOD trailing DD"); }
  }
  if (answers.dd === "static") {
    if (n === "Goat Funded Futures") { s += 12; reasons.push("Static DD"); } else s -= 3;
  }
  if (answers.news === "yes") {
    if (["Apex Trader Funding", "Tradeify", "Bulenox", "FundedNext Futures", "Top One Futures"].includes(n)) { s += 8; reasons.push("News allowed"); }
  }
  if (answers.speed === "fast") {
    if (n === "Tradeify") { s += 10; reasons.push("~1hr payouts"); }
    if (["FundedNext Futures", "Goat Funded Futures"].includes(n)) { s += 7; reasons.push("24hr guaranteed"); }
  }
  if (answers.consistency === "none") {
    if (n === "FundedNext Futures") { s += 10; reasons.push("No consistency"); }
    if (n === "My Funded Futures") { s += 8; reasons.push("Rapid funded = no consistency"); }
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
      <div className="wrap">
        <div className="quiz-wrap">
          <div className="results-hd">
            <span className="results-tag">Match found</span>
            <h1 className="results-t">Your top match: <em>{ranked[0].name}</em></h1>
            <p className="results-sub">Every firm ranked against your preferences — view below.</p>
          </div>
          {ranked.map((f, i) => {
            const deal = DEALS.find(d => d.firm === f.name);
            return (
              <div key={f.id} className={`result-row ${i === 0 ? "top" : ""}`}>
                <div className="result-rank">#{i + 1}</div>
                <div className="result-logo">{LOGOS[f.name] ? <img src={LOGOS[f.name]} alt="" /> : f.initials}</div>
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
          <div style={{ textAlign: "center", marginTop: 28 }}>
            <button className="btn btn-ghost" onClick={() => { setStep(0); setAnswers({}); setDone(false); }}>↻ Retake quiz</button>
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
    <div className="wrap">
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
        {step > 0 && <button className="quiz-back" onClick={() => setStep(step - 1)}>← Back</button>}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// DEALS
// ═══════════════════════════════════════════════════════════════════════════
const DealsPage = () => {
  const topDisc = DEALS.reduce((m, d) => Math.max(m, parseInt(d.pct)), 0);
  return (
    <div className="wrap">
      <div className="ph">
        <div className="ph-eye">Live discount codes</div>
        <h1 className="ph-t">Save up to <em>{topDisc}% off</em></h1>
        <p className="ph-d">Every deal verified fresh. Universal code: <b style={{ color: "var(--amber)" }}>TPP</b> (use <b style={{ color: "var(--amber)" }}>TTPP</b> for Alpha Futures).</p>
      </div>
      <div className="deal-grid" style={{ paddingBottom: 60 }}>
        {DEALS.map((d, i) => {
          const f = FIRMS.find(ff => ff.name === d.firm);
          return (
            <button key={i} className="dc" onClick={() => f && trackClick(f.name)}>
              {d.tag && <span className="dc-tag">{d.tag}</span>}
              <div className="dc-hd">
                {f && <Logo firm={f} size={30} />}
                <div className="dc-nm">{d.firm}</div>
              </div>
              <div className="dc-pct">{d.pct.replace("% OFF", "").replace("%", "")}<em>% OFF</em></div>
              <div className="dc-d">{d.desc}</div>
              <div className="dc-code-wrap">
                <span className="dc-code-l">Code</span>
                <span className="dc-code" onClick={(e) => { e.stopPropagation(); copyCode(d.code); }}>{d.code}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// CHALLENGES
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
    <div className="wrap">
      <div className="ph">
        <div className="ph-eye">The challenge matrix</div>
        <h1 className="ph-t">Every <em>plan</em>, side by side.</h1>
        <p className="ph-d">Filter {CHALLENGES.length}+ evaluation plans across every firm and size. Compare targets, drawdowns, and prices.</p>
      </div>
      <div className="filters">
        <select value={firmF} onChange={e => setFirmF(e.target.value)}>
          <option value="">All firms</option>
          {firms.map(f => <option key={f} value={f}>{f}</option>)}
        </select>
        <select value={sizeF} onChange={e => setSizeF(e.target.value)}>
          <option value="">All sizes</option>
          {sizes.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <button className={instantF ? "on" : ""} onClick={() => setInstantF(!instantF)}>Instant only</button>
        <span style={{ marginLeft: "auto", fontSize: 12, color: "var(--txt4)", fontWeight: 600 }}>
          Showing <b style={{ color: "var(--txt)" }}>{filtered.length}</b> of {CHALLENGES.length}
        </span>
      </div>
      <div className="tbl-wrap" style={{ marginBottom: 60 }}>
        <table className="tbl">
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
                    <div className="tbl-firm">
                      {f && <img src={LOGOS[f.name]} alt="" />}
                      <div>
                        <b>{c.firm}</b>
                        <div className="plan">{c.plan}</div>
                      </div>
                    </div>
                  </td>
                  <td>{c.size}</td><td>{c.target}</td><td>{c.maxLoss}</td>
                  <td>{c.dll}</td><td>{c.drawdown}</td><td>{c.split}</td>
                  <td className="tbl-price">{c.price}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {filtered.length > 60 && (
        <p style={{ textAlign: "center", fontSize: 12, color: "var(--txt4)", paddingBottom: 40 }}>
          Showing first 60 of {filtered.length}. Narrow filters for more.
        </p>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// SIMULATOR
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
    <div className="wrap">
      <div className="ph">
        <div className="ph-eye">Drawdown Simulator</div>
        <h1 className="ph-t">See <em>exactly</em> how you blow an account.</h1>
        <p className="ph-d">Pick a firm and a scenario. Watch the drawdown floor move against the equity curve. This is why EOD trailing feels different from intraday.</p>
      </div>
      <div className="sim">
        <div className="sim-ctrls">
          <div className="sim-ctrl">
            <label>Firm</label>
            <select value={firmN} onChange={e => setFirmN(e.target.value)}>
              {FIRMS.map(f => <option key={f.id} value={f.name}>{FIRM_DD_CONFIG[f.name]?.label || f.name}</option>)}
            </select>
          </div>
          <div className="sim-ctrl">
            <label>Scenario</label>
            <select value={sce} onChange={e => setSce(e.target.value)}>
              {Object.entries(DD_SCENARIOS).map(([k, v]) => <option key={k} value={k}>{v.name}</option>)}
            </select>
          </div>
        </div>
        <div className="sim-chart">
          <svg viewBox={`0 0 ${W} ${H}`}>
            <line x1={P} y1={ys(0)} x2={W - P} y2={ys(0)} stroke="rgba(255,255,255,0.1)" strokeDasharray="4 4" />
            <text x={P - 4} y={ys(0) + 4} fill="rgba(255,255,255,0.4)" fontSize="10" textAnchor="end">$0</text>
            <path d={`${floorPath} L${xs(scenario.points.length - 1)},${H - P} L${P},${H - P} Z`} fill="rgba(239,68,68,0.08)" />
            <path d={floorPath} fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="6 4" />
            <path d={pnlPath} fill="none" stroke={firm?.color || "#f59e0b"} strokeWidth="2.5" />
            {sim.blownAt >= 0 && (
              <g>
                <circle cx={xs(sim.blownAt)} cy={ys(scenario.points[sim.blownAt])} r="6" fill="#ef4444" />
                <text x={xs(sim.blownAt)} y={ys(scenario.points[sim.blownAt]) - 14} fill="#ef4444" fontSize="11" fontWeight="700" textAnchor="middle">BLOWN</text>
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
                ? `Balance hit the floor on day ${sim.blownAt + 1}. This is how ${firmN}'s ${cfg.type.toLowerCase()} trailing drawdown bites.`
                : `Peak: $${sim.peak.toLocaleString()} · Final floor: $${sim.floors[sim.floors.length - 1].toLocaleString()}`}
            </div>
          </div>
        </div>
        <div className="sim-legend">
          <span><i className="sim-legend-dot" style={{ background: firm?.color || "#f59e0b" }} /> Equity (P&L)</span>
          <span><i className="sim-legend-dot" style={{ background: "#ef4444" }} /> Drawdown floor</span>
          <span style={{ marginLeft: "auto" }}>Type: <b>{cfg.type}</b> · Max: <b>${cfg.maxDD.toLocaleString()}</b></span>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// RESEARCH
// ═══════════════════════════════════════════════════════════════════════════
const ResearchPage = () => {
  const posts = BLOG.slice(0, 9);
  const feature = posts[0];
  const sides = posts.slice(1, 5);
  return (
    <div className="wrap">
      <div className="ph">
        <div className="ph-eye">Research &amp; analysis</div>
        <h1 className="ph-t">Dispatches <em>from the floor</em>.</h1>
        <p className="ph-d">Weekly deep-dives on prop firm rules, payout behavior, rule changes, and the state of the industry.</p>
      </div>
      <div className="research-grid" style={{ paddingBottom: 60 }}>
        {feature && (
          <div className="research-main">
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
              <div className="research-date">{p.date}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// REWARDS
// ═══════════════════════════════════════════════════════════════════════════
const RewardsPage = ({ onSignIn, user }) => (
  <div className="wrap">
    <div className="ph">
      <div className="ph-eye">Loyalty program</div>
      <h1 className="ph-t">Earn <em>PulsePoints</em>.</h1>
      <p className="ph-d">Get paid to pick a firm. Every purchase with TPP earns points — redeem for free accounts, perks, and exclusive drops.</p>
    </div>
    <div className="rewards-hero">
      <span className="rewards-hero-tag">The PulsePoints Program</span>
      <h2 className="rewards-hero-t">Get <em>paid</em> to pick a firm.</h2>
      <p className="rewards-hero-d">
        Four steps: sign up, buy with TPP, submit proof, earn points. Redeem them for free evaluations and exclusive community perks.
      </p>
      <div className="hero-cta" style={{ justifyContent: "center", marginBottom: 0 }}>
        <button className="btn btn-primary" onClick={user ? undefined : onSignIn}>
          {user ? "View Dashboard" : "Join the Program"} <span className="btn-arr">→</span>
        </button>
      </div>
    </div>
    <div className="rewards-steps" style={{ paddingBottom: 60 }}>
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
        <h2 className="auth-h">{mode === "signin" ? <>Welcome <em>back</em></> : <>Join <em>PropPulse</em></>}</h2>
        <p className="auth-d">{mode === "signin" ? "Sign in to track picks and earn PulsePoints." : "Create your account. Earn points. Get deals."}</p>
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
        <div className="ftr-brand"><span className="nav-logo-mark">P</span>PropPulse</div>
        <p className="ftr-tag">The futures prop firm index. Quiz-matched picks, live deals, honest scorecards.</p>
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
    <div className="ftr-btm">© 2026 PropPulse Media · We may earn a commission on partner firms. We never rank by commission.</div>
  </footer>
);

// ═══════════════════════════════════════════════════════════════════════════
// MAIN
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
  else page = <div className="wrap"><div className="ph"><h1 className="ph-t">Page not found.</h1><a href="#/" className="btn btn-ghost" style={{ marginTop: 16 }}>← Back home</a></div></div>;

  return (
    <>
      <style>{css}</style>
      <MktTicker />
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
