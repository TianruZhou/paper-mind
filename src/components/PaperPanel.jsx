export default function PaperPanel({ paper, color, onClose }) {
  if (!paper) return null

  return (
    <div style={{
      position: 'absolute',
      right: 16,
      top: 16,
      bottom: 16,
      width: 340,
      background: '#0f0f1a',
      border: `1.5px solid ${color}`,
      borderRadius: 14,
      padding: 20,
      overflowY: 'auto',
      zIndex: 10,
      boxShadow: `0 0 40px ${color}33`,
      fontFamily: "'IBM Plex Sans', sans-serif",
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontWeight: 700,
            fontSize: 18,
            color,
          }}>
            {paper.name}
          </div>
          <span style={{
            fontSize: 11,
            background: color + '22',
            border: `1px solid ${color}`,
            color,
            borderRadius: 20,
            padding: '2px 10px',
            display: 'inline-block',
            marginTop: 4,
          }}>
            {paper.conf}
          </span>
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: '1px solid #333',
            color: '#666',
            borderRadius: 6,
            width: 28,
            height: 28,
            cursor: 'pointer',
            fontSize: 14,
            flexShrink: 0,
          }}
        >
          ✕
        </button>
      </div>

      {/* Title */}
      <div style={{
        fontSize: 12,
        color: '#9ca3af',
        fontStyle: 'italic',
        marginBottom: 16,
        lineHeight: 1.6,
        borderBottom: '1px solid #1f1f35',
        paddingBottom: 14,
      }}>
        {paper.title}
      </div>

      {/* Contributions */}
      <Section title="🎯 主要贡献" color={color}>
        <ul style={{ paddingLeft: 16, margin: 0 }}>
          {paper.contributions?.map((c, i) => (
            <li key={i} style={{ fontSize: 12.5, color: '#d1d5db', marginBottom: 6, lineHeight: 1.6 }}>
              {c}
            </li>
          ))}
        </ul>
      </Section>

      {/* Diff */}
      <Section title="⚡ 区别于前人工作" color={color}>
        <p style={{ fontSize: 12.5, color: '#d1d5db', lineHeight: 1.7, margin: 0 }}>
          {paper.diff}
        </p>
      </Section>

      {/* Tags */}
      {paper.tags?.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>
            Tags
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {paper.tags.map(tag => (
              <span key={tag} style={{
                fontSize: 10,
                background: '#1a1a2e',
                border: '1px solid #2d2d4e',
                color: '#9ca3af',
                borderRadius: 20,
                padding: '2px 8px',
              }}>
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Link */}
      <a
        href={paper.link}
        target="_blank"
        rel="noreferrer"
        style={{
          display: 'block',
          textAlign: 'center',
          background: color + '22',
          border: `1px solid ${color}`,
          color,
          borderRadius: 8,
          padding: '8px',
          fontSize: 12,
          textDecoration: 'none',
          fontFamily: "'IBM Plex Mono', monospace",
        }}
      >
        → 查看论文
      </a>
    </div>
  )
}

function Section({ title, color, children }) {
  return (
    <div style={{
      marginBottom: 16,
      background: color + '0d',
      border: `1px solid ${color}33`,
      borderRadius: 8,
      padding: '10px 12px',
    }}>
      <div style={{
        fontSize: 10,
        fontWeight: 700,
        color,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        marginBottom: 8,
      }}>
        {title}
      </div>
      {children}
    </div>
  )
}
