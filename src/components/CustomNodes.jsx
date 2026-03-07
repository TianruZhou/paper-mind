import { Handle, Position } from 'reactflow'

const handleStyle = { background: 'transparent', border: 'none', width: 1, height: 1 }

export function RootNode({ data }) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #1e1b4b, #4338ca)',
      color: 'white',
      borderRadius: 12,
      padding: '10px 18px',
      width: 180,
      textAlign: 'center',
      boxShadow: '0 4px 24px rgba(99,102,241,0.4)',
      cursor: 'default',
    }}>
      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700, fontSize: 13 }}>
        {data.label}
      </div>
      <Handle type="source" position={Position.Right} style={handleStyle} />
    </div>
  )
}

export function BranchNode({ data }) {
  return (
    <div style={{
      background: data.color + '22',
      border: `2px solid ${data.color}`,
      borderRadius: 10,
      padding: '8px 14px',
      width: 180,
      cursor: 'default',
    }}>
      <div style={{
        fontFamily: "'IBM Plex Mono', monospace",
        fontWeight: 700,
        fontSize: 12,
        color: data.color,
      }}>
        {data.label}
      </div>
      <Handle type="target" position={Position.Left} style={handleStyle} />
      <Handle type="source" position={Position.Right} style={handleStyle} />
    </div>
  )
}

export function SubBranchNode({ data }) {
  return (
    <div style={{
      background: '#1a1a2e',
      border: `1.5px dashed ${data.color}`,
      borderRadius: 8,
      padding: '6px 12px',
      width: 180,
      cursor: 'default',
    }}>
      <div style={{
        fontFamily: "'IBM Plex Mono', monospace",
        fontWeight: 600,
        fontSize: 11,
        color: data.color,
      }}>
        {data.label}
      </div>
      <Handle type="target" position={Position.Left} style={handleStyle} />
      <Handle type="source" position={Position.Right} style={handleStyle} />
    </div>
  )
}

export function PaperNode({ data, selected }) {
  const { paper, color } = data
  return (
    <div
      style={{
        background: selected ? color + '22' : '#12121f',
        border: `1.5px solid ${selected ? color : color + '55'}`,
        borderRadius: 8,
        padding: '6px 12px',
        width: 160,
        cursor: 'pointer',
        transition: 'all 0.15s',
        boxShadow: selected ? `0 0 12px ${color}66` : 'none',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontWeight: 700,
          fontSize: 12,
          color,
        }}>
          {paper.name}
        </span>
        <span style={{
          fontSize: 9,
          background: color + '33',
          color: color,
          borderRadius: 10,
          padding: '1px 6px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: 90,
        }}>
          {paper.conf}
        </span>
      </div>
      <Handle type="target" position={Position.Left} style={handleStyle} />
    </div>
  )
}
