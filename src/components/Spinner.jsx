import React from 'react'

const Spinner = () => (
  <div style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "60vh",
    gap: "1rem",
  }}>
    <style>{`
      @keyframes spin { to { transform: rotate(360deg); } }
      @keyframes pulse-logo { 0%,100%{opacity:.6;transform:scale(1)} 50%{opacity:1;transform:scale(1.08)} }
    `}</style>

    <div style={{ position: "relative", width: 52, height: 52 }}>
      <div style={{
        position: "absolute",
        inset: 0,
        border: "3.5px solid #e5e7eb",
        borderTopColor: "#15256E",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }} />
      <div style={{
        position: "absolute",
        inset: "10px",
        border: "2.5px solid #e5e7eb",
        borderTopColor: "#3b5bdb",
        borderRadius: "50%",
        animation: "spin 1.3s linear infinite reverse",
      }} />
    </div>

    <p style={{
      color: "#15256E",
      fontWeight: 600,
      fontSize: ".82rem",
      letterSpacing: ".08em",
      textTransform: "uppercase"
    }}>
      Loading…
    </p>
  </div>
);

export default Spinner