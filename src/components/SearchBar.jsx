export default function SearchBar({ query, setQuery, allTags, activeTag, setActiveTag }) {
  return (
    <div style={{
      position: 'absolute',
      top: 16,
      left: 16,
      zIndex: 10,
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      width: 280,
    }}>
      {/* Search input */}
      <div style={{ position: 'relative' }}>
        <span style={{
          position: 'absolute',
          left: 10,
          top: '50%',
          transform: 'translateY(-50%)',
          color: '#6b7280',
          fontSize: 13,
          pointerEvents: 'none',
        }}>
          🔍
        </span>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="搜索论文、会议、标签..."
          style={{
            width: '100%',
            background: '#0f0f1a',
            border: '1px solid #2d2d4e',
            borderRadius: 8,
            color: 'white',
            fontSize: 12,
            fontFamily: "'IBM Plex Sans', sans-serif",
            padding: '8px 10px 8px 32px',
            outline: 'none',
          }}
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            style={{
              position: 'absolute',
              right: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              color: '#6b7280',
              cursor: 'pointer',
              fontSize: 12,
            }}
          >✕</button>
        )}
      </div>

      {/* Tag filter pills */}
      {allTags.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {allTags.slice(0, 12).map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              style={{
                fontSize: 10,
                background: activeTag === tag ? '#4338ca' : '#1a1a2e',
                border: `1px solid ${activeTag === tag ? '#818cf8' : '#2d2d4e'}`,
                color: activeTag === tag ? 'white' : '#9ca3af',
                borderRadius: 20,
                padding: '2px 8px',
                cursor: 'pointer',
                fontFamily: "'IBM Plex Mono', monospace",
              }}
            >
              #{tag}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
