import dagre from 'dagre'

const NODE_WIDTH = 180
const NODE_HEIGHT = 50
const PAPER_WIDTH = 160
const PAPER_HEIGHT = 44

export function buildGraphElements(data, searchQuery, activeTag) {
  const nodes = []
  const edges = []

  const query = searchQuery.toLowerCase().trim()

  // helper: does a paper match the current filter?
  function paperMatches(paper) {
    if (activeTag && !paper.tags?.includes(activeTag)) return false
    if (!query) return true
    return (
      paper.name.toLowerCase().includes(query) ||
      paper.title.toLowerCase().includes(query) ||
      paper.conf.toLowerCase().includes(query) ||
      paper.contributions?.some(c => c.toLowerCase().includes(query)) ||
      paper.tags?.some(t => t.toLowerCase().includes(query))
    )
  }

  // Root node
  nodes.push({
    id: 'root',
    type: 'rootNode',
    data: { label: data.root.label, description: data.root.description },
    position: { x: 0, y: 0 },
  })

  data.branches.forEach((branch) => {
    // Collect papers for this branch (flat or via subBranches)
    const allPapers = branch.papers
      ? branch.papers
      : branch.subBranches?.flatMap(sb => sb.papers) ?? []

    const matchingPapers = allPapers.filter(paperMatches)
    if (query || activeTag) {
      if (matchingPapers.length === 0) return
    }

    // Branch node
    nodes.push({
      id: branch.id,
      type: 'branchNode',
      data: { label: branch.label, color: branch.color, description: branch.description },
      position: { x: 0, y: 0 },
    })
    edges.push({
      id: `root-${branch.id}`,
      source: 'root',
      target: branch.id,
      style: { stroke: branch.color, strokeWidth: 2 },
      animated: false,
    })

    if (branch.papers) {
      // Flat papers directly under branch
      branch.papers.filter(paperMatches).forEach((paper) => {
        nodes.push(makePaperNode(paper, branch.color))
        edges.push(makePaperEdge(branch.id, paper.id, branch.color))
      })
    } else if (branch.subBranches) {
      branch.subBranches.forEach((sub) => {
        const subPapers = sub.papers.filter(paperMatches)
        if ((query || activeTag) && subPapers.length === 0) return

        nodes.push({
          id: sub.id,
          type: 'subBranchNode',
          data: { label: sub.label, color: sub.color },
          position: { x: 0, y: 0 },
        })
        edges.push({
          id: `${branch.id}-${sub.id}`,
          source: branch.id,
          target: sub.id,
          style: { stroke: sub.color, strokeWidth: 1.5, strokeDasharray: '4 2' },
        })

        subPapers.forEach((paper) => {
          nodes.push(makePaperNode(paper, sub.color))
          edges.push(makePaperEdge(sub.id, paper.id, sub.color))
        })
      })
    }
  })

  return layoutGraph(nodes, edges)
}

function makePaperNode(paper, color) {
  return {
    id: paper.id,
    type: 'paperNode',
    data: { paper, color },
    position: { x: 0, y: 0 },
  }
}

function makePaperEdge(sourceId, paperId, color) {
  return {
    id: `${sourceId}-${paperId}`,
    source: sourceId,
    target: paperId,
    style: { stroke: color + '80', strokeWidth: 1.5 },
  }
}

function layoutGraph(nodes, edges) {
  const g = new dagre.graphlib.Graph()
  g.setDefaultEdgeLabel(() => ({}))
  g.setGraph({ rankdir: 'LR', nodesep: 30, ranksep: 80, marginx: 40, marginy: 40 })

  nodes.forEach((node) => {
    const isPaper = node.type === 'paperNode'
    g.setNode(node.id, {
      width: isPaper ? PAPER_WIDTH : NODE_WIDTH,
      height: isPaper ? PAPER_HEIGHT : NODE_HEIGHT,
    })
  })

  edges.forEach((edge) => {
    if (g.hasNode(edge.source) && g.hasNode(edge.target)) {
      g.setEdge(edge.source, edge.target)
    }
  })

  dagre.layout(g)

  return {
    nodes: nodes.map((node) => {
      const { x, y } = g.node(node.id)
      const isPaper = node.type === 'paperNode'
      return {
        ...node,
        position: {
          x: x - (isPaper ? PAPER_WIDTH : NODE_WIDTH) / 2,
          y: y - (isPaper ? PAPER_HEIGHT : NODE_HEIGHT) / 2,
        },
      }
    }),
    edges,
  }
}
