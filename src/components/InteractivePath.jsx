import React, { useCallback, useState, useEffect } from 'react';
import ReactFlow, { Background, applyNodeChanges } from 'reactflow';
import 'reactflow/dist/style.css';

const InteractivePath = ({ improvements = [] }) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    const initialNodes = improvements.map((imp, index) => ({
      id: `node-${index}`,
      position: { x: index % 2 === 0 ? 50 : 250, y: 50 + index * 120 },
      data: { 
        label: (
          <div style={{ textAlign: 'left' }}>
            <strong style={{ color: 'var(--primary)' }}>{imp.skill}</strong>
            <div style={{ fontSize: '0.75rem', marginTop: '4px', maxWidth: '200px', whiteSpace: 'normal', color: 'var(--text-muted)', lineHeight: '1.4' }}>
              {imp.reason}
            </div>
          </div>
        )
      },
      style: {
        background: 'rgba(30, 41, 59, 0.95)',
        color: 'white',
        border: '1px solid var(--primary)',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
        borderRadius: '8px',
        padding: '12px',
        width: 220,
        fontFamily: 'Outfit, sans-serif'
      }
    }));

    const initialEdges = improvements.map((_, index) => {
      if (index === improvements.length - 1) return null;
      return {
        id: `edge-${index}-${index+1}`,
        source: `node-${index}`,
        target: `node-${index+1}`,
        animated: true,
        style: { stroke: 'var(--success)', strokeWidth: 2 }
      };
    }).filter(Boolean);

    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [improvements]);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  return (
    <div style={{ width: '100%', height: '350px', background: 'rgba(15, 23, 42, 0.5)', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
      <ReactFlow 
        nodes={nodes} 
        edges={edges} 
        onNodesChange={onNodesChange}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#ffffff" gap={16} size={1} opacity={0.05} />
      </ReactFlow>
    </div>
  );
};

export default InteractivePath;
