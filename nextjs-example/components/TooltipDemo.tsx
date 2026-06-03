"use client";

import { useState } from "react";
import ToolTip, { StatefulToolTip, TooltipStyle } from "react-portal-tooltip-upgraded";
import CardDemo from "./CardDemo";

// ─── Section wrapper ────────────────────────────────────────────────────────

function Section({ title, description, children }: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{
      background: "#1e293b",
      border: "1px solid #334155",
      borderRadius: 12,
      padding: "32px",
      display: "flex",
      flexDirection: "column",
      gap: 20,
    }}>
      <div>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: "#f1f5f9", margin: 0 }}>{title}</h2>
        <p style={{ fontSize: 14, color: "#94a3b8", margin: "6px 0 0" }}>{description}</p>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", justifyContent: "center", padding: "24px 0" }}>
        {children}
      </div>
    </div>
  );
}

// ─── Trigger button ──────────────────────────────────────────────────────────

function TriggerButton({ id, label, onEnter, onLeave }: {
  id: string;
  label: string;
  onEnter: () => void;
  onLeave: () => void;
}) {
  return (
    <button
      id={id}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        padding: "10px 20px",
        background: "#3b82f6",
        color: "#fff",
        border: "none",
        borderRadius: 8,
        cursor: "pointer",
        fontSize: 14,
        fontWeight: 600,
        transition: "background 0.2s",
      }}
      onMouseOver={e => (e.currentTarget.style.background = "#2563eb")}
      onMouseOut={e => (e.currentTarget.style.background = "#3b82f6")}
    >
      {label}
    </button>
  );
}

// ─── 1. Positions ────────────────────────────────────────────────────────────

function PositionsDemo() {
  const [active, setActive] = useState<string | null>(null);
  const positions = ["top", "right", "bottom", "left"] as const;

  return (
    <Section
      title="Positions"
      description="Tooltip can be placed on any side of the trigger element."
    >
      {positions.map(pos => (
        <div key={pos}>
          <TriggerButton
            id={`pos-${pos}`}
            label={pos.charAt(0).toUpperCase() + pos.slice(1)}
            onEnter={() => setActive(pos)}
            onLeave={() => setActive(null)}
          />
          <ToolTip active={active === pos} position={pos} arrow="center" parent={`#pos-${pos}`}>
            <div style={{ padding: "8px 12px", fontSize: 13, color: "#1e293b", whiteSpace: "nowrap" }}>
              Tooltip on the <strong>{pos}</strong>
            </div>
          </ToolTip>
        </div>
      ))}
    </Section>
  );
}

// ─── 2. Arrow positions ──────────────────────────────────────────────────────

function ArrowDemo() {
  const [active, setActive] = useState<string | null>(null);
  const arrows = [
    { id: "arrow-none",   label: "No Arrow",    arrow: undefined },
    { id: "arrow-center", label: "Center",       arrow: "center" },
    { id: "arrow-left",   label: "Left",         arrow: "left" },
    { id: "arrow-right",  label: "Right",        arrow: "right" },
  ] as const;

  return (
    <Section
      title="Arrow Styles"
      description="Control arrow position or remove it entirely."
    >
      {arrows.map(({ id, label, arrow }) => (
        <div key={id}>
          <TriggerButton
            id={id}
            label={label}
            onEnter={() => setActive(id)}
            onLeave={() => setActive(null)}
          />
          <ToolTip active={active === id} position="top" arrow={arrow ?? null} parent={`#${id}`}>
            <div style={{ padding: "8px 12px", fontSize: 13, color: "#1e293b", whiteSpace: "nowrap" }}>
              Arrow: <strong>{label}</strong>
            </div>
          </ToolTip>
        </div>
      ))}
    </Section>
  );
}

// ─── 3. Custom styles ────────────────────────────────────────────────────────

function StylesDemo() {
  const [active, setActive] = useState<string | null>(null);

  const darkStyle: TooltipStyle = {
    style: { background: "#0f172a", border: "1px solid #334155", padding: "10px 14px" },
    arrowStyle: { color: "#0f172a", borderColor: "#334155" },
  };

  const successStyle: TooltipStyle = {
    style: { background: "#16a34a", padding: "10px 14px" },
    arrowStyle: { color: "#16a34a", borderColor: false },
  };

  const warningStyle: TooltipStyle = {
    style: { background: "#d97706", padding: "10px 14px" },
    arrowStyle: { color: "#d97706", borderColor: false },
  };

  const styles = [
    { id: "style-dark",    label: "Dark",    style: darkStyle,    textColor: "#f1f5f9" },
    { id: "style-success", label: "Success", style: successStyle, textColor: "#fff" },
    { id: "style-warning", label: "Warning", style: warningStyle, textColor: "#fff" },
  ];

  return (
    <Section
      title="Custom Styles"
      description="Pass a style prop to fully customise the tooltip and arrow colours."
    >
      {styles.map(({ id, label, style, textColor }) => (
        <div key={id}>
          <TriggerButton
            id={id}
            label={label}
            onEnter={() => setActive(id)}
            onLeave={() => setActive(null)}
          />
          <ToolTip active={active === id} position="bottom" arrow="center" parent={`#${id}`} style={style}>
            <div style={{ fontSize: 13, color: textColor, whiteSpace: "nowrap" }}>
              Custom <strong>{label.toLowerCase()}</strong> tooltip
            </div>
          </ToolTip>
        </div>
      ))}
    </Section>
  );
}

// ─── 4. StatefulToolTip ──────────────────────────────────────────────────────

function StatefulDemo() {
  return (
    <Section
      title="StatefulToolTip"
      description="No state management needed — hover behaviour is handled internally."
    >
      <StatefulToolTip
        parent={
          <button style={{
            padding: "10px 20px",
            background: "#8b5cf6",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            fontSize: 14,
            fontWeight: 600,
          }}>
            Hover me (stateful)
          </button>
        }
        position="top"
        arrow="center"
      >
        <div style={{ padding: "8px 12px", fontSize: 13, color: "#1e293b" }}>
          No <code style={{ background: "#e2e8f0", padding: "1px 5px", borderRadius: 3 }}>useState</code> needed!
        </div>
      </StatefulToolTip>

      <StatefulToolTip
        parent={
          <button style={{
            padding: "10px 20px",
            background: "#8b5cf6",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            fontSize: 14,
            fontWeight: 600,
          }}>
            Rich content
          </button>
        }
        position="right"
        arrow="center"
        tooltipTimeout={300}
      >
        <div style={{ padding: "12px 16px", fontSize: 13, color: "#1e293b", maxWidth: 180 }}>
          <strong style={{ display: "block", marginBottom: 4 }}>Rich tooltip</strong>
          <span style={{ color: "#64748b" }}>Supports any React content inside.</span>
        </div>
      </StatefulToolTip>
    </Section>
  );
}

// ─── 5. useHover ─────────────────────────────────────────────────────────────

function UseHoverDemo() {
  const [activeStay, setActiveStay] = useState(false);
  const [activeClose, setActiveClose] = useState(false);

  return (
    <Section
      title="useHover Prop"
      description="Hover the button, then slide your mouse onto the tooltip — with useHover=true it stays open."
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 40, width: "100%", padding: "0 16px" }}>

        {/* useHover=true row */}
        <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ fontSize: 11, color: "#94a3b8", fontFamily: "monospace" }}>useHover=true</span>
            <button
              id="hover-stay"
              onMouseEnter={() => setActiveStay(true)}
              onMouseLeave={() => setActiveStay(false)}
              style={{
                padding: "10px 20px",
                background: "#3b82f6",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              Hover me →
            </button>
          </div>
          <ToolTip active={activeStay} position="right" arrow="center" parent="#hover-stay" useHover={true} group="hover-demo-1" tooltipTimeout={800}>
            <div style={{ padding: "12px 16px", fontSize: 13, color: "#1e293b", maxWidth: 200 }}>
              <strong style={{ display: "block", marginBottom: 4 }}>You made it!</strong>
              <span style={{ color: "#64748b", fontSize: 12 }}>Slide here from the button — I stay open while you hover me.</span>
            </div>
          </ToolTip>
        </div>

        {/* useHover=false row */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 11, color: "#94a3b8", fontFamily: "monospace" }}>useHover=false</span>
          <div style={{ display: "inline-block" }}>
            <button
              id="hover-close"
              onMouseEnter={() => setActiveClose(true)}
              onMouseLeave={() => setActiveClose(false)}
              style={{
                padding: "10px 20px",
                background: "#3b82f6",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              Hover me
            </button>
            <ToolTip active={activeClose} position="right" arrow="center" parent="#hover-close" useHover={false} group="hover-demo-2">
              <div style={{ padding: "10px 14px", fontSize: 13, color: "#1e293b", maxWidth: 180 }}>
                <strong>Closes on leave</strong>
                <br />
                <span style={{ color: "#64748b", fontSize: 12 }}>Hides as soon as you leave the button.</span>
              </div>
            </ToolTip>
          </div>
        </div>

      </div>
    </Section>
  );
}

// ─── Install banner ──────────────────────────────────────────────────────────

function InstallBanner() {
  const [copied, setCopied] = useState(false);
  const cmd = "npm install react-portal-tooltip-upgraded";

  const copy = () => {
    navigator.clipboard.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      background: "#1e293b",
      border: "1px solid #334155",
      borderRadius: 12,
      padding: "20px 28px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: 12,
    }}>
      <code style={{ fontSize: 14, color: "#7dd3fc", fontFamily: "monospace" }}>
        $ {cmd}
      </code>
      <button
        onClick={copy}
        style={{
          padding: "6px 16px",
          background: copied ? "#16a34a" : "#334155",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
          fontSize: 13,
          fontWeight: 600,
          transition: "background 0.2s",
        }}
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}

// ─── Root export ─────────────────────────────────────────────────────────────

export default function TooltipDemo() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px", display: "flex", flexDirection: "column", gap: 24 }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 16 }}>
        <div style={{ display: "inline-block", background: "#1e40af", color: "#bfdbfe", fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 99, marginBottom: 16 }}>
          React 18 · SSR Safe · TypeScript
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: "#f1f5f9", margin: "0 0 12px" }}>
          react-portal-tooltip-upgraded
        </h1>
        <p style={{ fontSize: 16, color: "#94a3b8", maxWidth: 520, margin: "0 auto" }}>
          Tooltip rendered via a React portal — always on top, fully typed, works with Next.js and Remix out of the box.
        </p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 20, flexWrap: "wrap" }}>
          <a href="https://www.npmjs.com/package/react-portal-tooltip-upgraded" target="_blank" rel="noreferrer"
            style={{ color: "#60a5fa", fontSize: 13, textDecoration: "none" }}>npm →</a>
          <span style={{ color: "#334155" }}>|</span>
          <a href="https://github.com/murtaza7799/react-portal-tooltip" target="_blank" rel="noreferrer"
            style={{ color: "#60a5fa", fontSize: 13, textDecoration: "none" }}>GitHub →</a>
          <span style={{ color: "#334155" }}>|</span>
          <a href="#card-demo"
            style={{ color: "#a78bfa", fontSize: 13, textDecoration: "none", fontWeight: 600 }}>Card Demo ↓</a>
        </div>
      </div>

      <InstallBanner />
      <PositionsDemo />
      <ArrowDemo />
      <StylesDemo />
      <StatefulDemo />
      <UseHoverDemo />

      {/* Card Demo */}
      <div id="card-demo" style={{
        background: "#1e293b",
        border: "1px solid #334155",
        borderRadius: 12,
        padding: "32px",
      }}>
        <CardDemo embedded />
      </div>

      {/* Footer */}
      <p style={{ textAlign: "center", fontSize: 13, color: "#475569", marginTop: 16 }}>
        Forked from{" "}
        <a href="https://github.com/romainberger/react-portal-tooltip" target="_blank" rel="noreferrer"
          style={{ color: "#60a5fa", textDecoration: "none" }}>
          react-portal-tooltip
        </a>{" "}
        by Romain Berger · Maintained by{" "}
        <a href="https://github.com/murtaza7799" target="_blank" rel="noreferrer"
          style={{ color: "#60a5fa", textDecoration: "none" }}>
          Muhammad Murtaza
        </a>
      </p>
    </div>
  );
}
