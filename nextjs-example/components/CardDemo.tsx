"use client";

import { useState } from "react";
import ToolTip from "react-portal-tooltip-upgraded";

// ─── Mock data ───────────────────────────────────────────────────────────────

const USERS = [
  { id: 1,  username: "alex_rivers",   screenname: "Alex Rivers",    videos: 84,  followers: 12400 },
  { id: 2,  username: "sara_bloom",    screenname: "Sara Bloom",     videos: 37,  followers: 8900  },
  { id: 3,  username: "mike_chen",     screenname: "Mike Chen",      videos: 120, followers: 31000 },
  { id: 4,  username: "lena_kroft",    screenname: "Lena Kroft",     videos: 56,  followers: 4200  },
  { id: 5,  username: "tom_hazard",    screenname: "Tom Hazard",     videos: 19,  followers: 980   },
  { id: 6,  username: "priya_sharma",  screenname: "Priya Sharma",   videos: 203, followers: 55100 },
  { id: 7,  username: "jake_w",        screenname: "Jake Wilson",    videos: 41,  followers: 7700  },
  { id: 8,  username: "nina_fox",      screenname: "Nina Fox",       videos: 68,  followers: 15300 },
  { id: 9,  username: "carlos_v",      screenname: "Carlos Vega",    videos: 92,  followers: 22600 },
  { id: 10, username: "mei_zhang",     screenname: "Mei Zhang",      videos: 11,  followers: 460   },
  { id: 11, username: "dan_oakes",     screenname: "Dan Oakes",      videos: 77,  followers: 9800  },
  { id: 12, username: "ava_sterling",  screenname: "Ava Sterling",   videos: 150, followers: 43000 },
];

const fmt = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);

// ─── User card tooltip content ───────────────────────────────────────────────

function UserCard({ user }: { user: typeof USERS[number] }) {
  const cover = `https://picsum.photos/seed/${user.username}/370/80`;
  const avatar = `https://i.pravatar.cc/70?img=${user.id}`;

  return (
    <div style={{ width: 310, fontFamily: "sans-serif" }}>
      {/* cover + avatar */}
      <div style={{ position: "relative", height: 80, borderRadius: "4px 4px 0 0", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={cover} alt="" width={310} height={80}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={avatar} alt={user.screenname} width={52} height={52}
          style={{
            position: "absolute",
            bottom: -20,
            left: 14,
            width: 52,
            height: 52,
            borderRadius: "50%",
            border: "3px solid #fff",
            objectFit: "cover",
          }} />
      </div>

      {/* info row */}
      <div style={{
        padding: "28px 14px 12px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        background: "#fff",
        borderRadius: "0 0 4px 4px",
      }}>
        <span style={{ fontWeight: 700, fontSize: 14, color: "#1e293b" }}>
          {user.screenname}
        </span>
        <span style={{ fontSize: 12, color: "#64748b", textAlign: "right", lineHeight: 1.6 }}>
          <strong style={{ color: "#334155" }}>{user.videos}</strong> videos
          <br />
          <strong style={{ color: "#334155" }}>{fmt(user.followers)}</strong> followers
        </span>
      </div>
    </div>
  );
}

// ─── Single user row item ────────────────────────────────────────────────────

function UserItem({ user, position }: { user: typeof USERS[number]; position: "top" | "right" | "bottom" | "left" }) {
  const [active, setActive] = useState(false);
  const id = `user-${user.id}`;

  return (
    <div style={{ padding: "2px 0" }}>
      <span
        id={id}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        style={{
          cursor: "pointer",
          color: "#60a5fa",
          fontSize: 14,
          fontWeight: 500,
          textDecoration: "underline",
          textUnderlineOffset: 3,
          transition: "color 0.15s",
        }}
        onMouseOver={e => (e.currentTarget.style.color = "#93c5fd")}
        onMouseOut={e => (e.currentTarget.style.color = "#60a5fa")}
      >
        {user.username}
      </span>

      <ToolTip
        active={active}
        parent={`#${id}`}
        position={position}
        arrow="center"
        group={`user-${user.id}`}
        tooltipTimeout={200}
        style={{ style: { padding: 0, boxShadow: "0 8px 24px rgba(0,0,0,.18)", borderRadius: 4 }, arrowStyle: { color: "#fff" } }}
      >
        <UserCard user={user} />
      </ToolTip>
    </div>
  );
}

// ─── Root export ─────────────────────────────────────────────────────────────

const POSITIONS = ["right", "top", "bottom", "left"] as const;

export default function CardDemo({ embedded = false }: { embedded?: boolean }) {
  const [position, setPosition] = useState<typeof POSITIONS[number]>("right");

  const rows: (typeof USERS[number])[][] = [];
  for (let i = 0; i < USERS.length; i += 4) rows.push(USERS.slice(i, i + 4));

  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: embedded ? "0" : "48px 24px" }}>

      {/* header */}
      <div style={{ marginBottom: 32 }}>
        {!embedded && (
          <a href="/" style={{ color: "#60a5fa", fontSize: 13, textDecoration: "none" }}>← Back to demos</a>
        )}
        <h1 style={{ fontSize: embedded ? 22 : 28, fontWeight: 800, color: "#f1f5f9", margin: embedded ? "0 0 6px" : "16px 0 6px" }}>
          Card Tooltip Demo
        </h1>
        <p style={{ fontSize: 14, color: "#94a3b8", margin: 0 }}>
          Hover any username to see a rich card tooltip. Inspired by the original library GIF.
        </p>
      </div>

      {/* position picker */}
      <div style={{
        background: "#1e293b",
        border: "1px solid #334155",
        borderRadius: 10,
        padding: "16px 20px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginBottom: 28,
        flexWrap: "wrap",
      }}>
        <span style={{ fontSize: 13, color: "#94a3b8", fontWeight: 500 }}>Tooltip position:</span>
        {POSITIONS.map(p => (
          <button
            key={p}
            onClick={() => setPosition(p)}
            style={{
              padding: "5px 14px",
              borderRadius: 6,
              border: "none",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 600,
              background: position === p ? "#3b82f6" : "#334155",
              color: "#fff",
              transition: "background 0.15s",
            }}
          >
            {p}
          </button>
        ))}
      </div>

      {/* user list */}
      <div style={{
        background: "#1e293b",
        border: "1px solid #334155",
        borderRadius: 12,
        padding: "24px 28px",
      }}>
        <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 20px" }}>
          Hover the usernames below to display the tooltips
        </p>

        {rows.map((row, ri) => (
          <div key={ri} style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "12px 0",
            marginBottom: ri < rows.length - 1 ? 8 : 0,
          }}>
            {row.map(user => (
              <UserItem key={user.id} user={user} position={position} />
            ))}
          </div>
        ))}
      </div>

      {/* code snippet */}
      <div style={{
        background: "#0f172a",
        border: "1px solid #1e293b",
        borderRadius: 10,
        padding: "20px 24px",
        marginTop: 24,
        fontFamily: "monospace",
        fontSize: 13,
        color: "#94a3b8",
        lineHeight: 1.7,
      }}>
        <div><span style={{ color: "#f472b6" }}>{"<ToolTip"}</span></div>
        <div style={{ paddingLeft: 20 }}>
          <span style={{ color: "#86efac" }}>active</span>
          <span style={{ color: "#fff" }}>=</span>
          <span style={{ color: "#fde68a" }}>{"{active}"}</span>
        </div>
        <div style={{ paddingLeft: 20 }}>
          <span style={{ color: "#86efac" }}>parent</span>
          <span style={{ color: "#fff" }}>=</span>
          <span style={{ color: "#fde68a" }}>{"{`#${id}`}"}</span>
        </div>
        <div style={{ paddingLeft: 20 }}>
          <span style={{ color: "#86efac" }}>position</span>
          <span style={{ color: "#fff" }}>="</span>
          <span style={{ color: "#fde68a" }}>{position}</span>
          <span style={{ color: "#fff" }}>"</span>
        </div>
        <div style={{ paddingLeft: 20 }}>
          <span style={{ color: "#86efac" }}>arrow</span>
          <span style={{ color: "#fff" }}>="</span>
          <span style={{ color: "#fde68a" }}>center</span>
          <span style={{ color: "#fff" }}>"</span>
        </div>
        <div><span style={{ color: "#f472b6" }}>{">"}</span></div>
        <div style={{ paddingLeft: 20 }}><span style={{ color: "#94a3b8" }}>{"<UserCard user={user} />"}</span></div>
        <div><span style={{ color: "#f472b6" }}>{"</ToolTip>"}</span></div>
      </div>
    </div>
  );
}
