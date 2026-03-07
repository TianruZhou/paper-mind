import { useState, useCallback, useMemo } from 'react'
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow'
import 'reactflow/dist/style.css'

import papersData from './data/papers.json'
import { buildGraphElements } from './hooks/useMindMapLayout.js'
import { RootNode, BranchNode, SubBranchNode, PaperNode } from './components/CustomNodes.jsx'
import PaperPanel from './components/PaperPanel.jsx'
import SearchBar from './components/SearchBar.jsx'

const nodeTypes = {
  rootNode: RootNode,
  branchNode: BranchNode,
  subBranchNode: SubBranchNode,
  paperNode: PaperNode,
}

// Build a flat lookup: paperId -> { paper, color }
function buildPaperLookup(data) {
  const map = {}
  data.branches.forEach(branch => {
    const addPaper = (paper, color) => { map[paper.id] = { paper, color } }
    if (branch.papers) {
      branch.papers.forEach(p => addPaper(p, branch.color))
    }
    branch.subBranches?.forEach(sub => {
      sub.papers.forEach(p => addPaper(p, sub.color))
    })
  })
  return map
}

// Collect all unique tags
function getAllTags(data) {
  const tags = new Set()
  data.branches.forEach(branch => {
    const addTags = (paper) => paper.tags?.forEach(t => tags.add(t))
    branch.papers?.forEach(addTags)
    branch.subBranches?.forEach(sub => sub.papers.forEach(addTags))
  })
  return [...tags].sort()
}

const paperLookup = buildPaperLookup(papersData)
const allTags = getAllTags(papersData)

export default function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTag, setActiveTag] = useState(null)
  const [selectedPaper, setSelectedPaper] = useState(null)
  const [selectedColor, setSelectedColor] = useState('#7c3aed')

  const { nodes: layoutedNodes, edges: layoutedEdges } = useMemo(
    () => buildGraphElements(papersData, searchQuery, activeTag),
    [searchQuery, activeTag]
  )

  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges)

  // Sync when filter changes
  useMemo(() => {
    setNodes(layoutedNodes)
    setEdges(layoutedEdges)
  }, [layoutedNodes, layoutedEdges])

  const onNodeClick = useCallback((_, node) => {
    if (node.type === 'paperNode') {
      const entry = paperLookup[node.id]
      if (entry) {
        setSelectedPaper(entry.paper)
        setSelectedColor(entry.color)
      }
    }
  }, [])

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', background: '#0a0a14' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.15 }}
        minZoom={0.2}
        maxZoom={2}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#1a1a2e" gap={24} size={1} />
        <Controls
          style={{
            bottom: 16,
            left: 16,
            background: '#0f0f1a',
            border: '1px solid #2d2d4e',
            borderRadius: 10,
          }}
        />
        <MiniMap
          style={{
            background: '#0f0f1a',
            border: '1px solid #2d2d4e',
            borderRadius: 10,
            bottom: 16,
            right: selectedPaper ? 372 : 16,
          }}
          nodeColor={(node) => {
            if (node.type === 'rootNode') return '#4338ca'
            if (node.type === 'paperNode') return node.data.color
            return node.data.color + '66'
          }}
        />
      </ReactFlow>

      <SearchBar
        query={searchQuery}
        setQuery={setSearchQuery}
        allTags={allTags}
        activeTag={activeTag}
        setActiveTag={setActiveTag}
      />

      <PaperPanel
        paper={selectedPaper}
        color={selectedColor}
        onClose={() => setSelectedPaper(null)}
      />

      {/* Title bar */}
      <div style={{
        position: 'absolute',
        top: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        background: '#0f0f1acc',
        backdropFilter: 'blur(10px)',
        border: '1px solid #2d2d4e',
        borderRadius: 20,
        padding: '6px 16px',
        color: '#9ca3af',
        fontSize: 11,
        fontFamily: "'IBM Plex Mono', monospace",
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
      }}>
        World Planner · VLA Papers · 点击论文节点查看详情
      </div>
    </div>
  )
}
