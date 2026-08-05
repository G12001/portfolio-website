"use client";

import { useCallback } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
} from "reactflow";
import "reactflow/dist/style.css";
import { Database, Globe, Server, Smartphone, Cloud, Cpu, Lock } from "lucide-react";

// Mock architecture data for FleetLink
const initialNodes: Node[] = [
  { id: "1", position: { x: 250, y: 5 }, data: { label: <div className="flex items-center gap-2"><Globe size={16}/> Web App (Next.js)</div> }, style: { backgroundColor: "#050816", color: "#fff", borderColor: "#74DF00" } },
  { id: "2", position: { x: 50, y: 5 }, data: { label: <div className="flex items-center gap-2"><Smartphone size={16}/> Mobile App (React Native)</div> }, style: { backgroundColor: "#050816", color: "#fff", borderColor: "#5CE1E6" } },
  { id: "3", position: { x: 150, y: 100 }, data: { label: <div className="flex items-center gap-2"><Server size={16}/> API Gateway</div> }, style: { backgroundColor: "#050816", color: "#fff", borderColor: "#fff" } },
  { id: "4", position: { x: -50, y: 200 }, data: { label: <div className="flex items-center gap-2"><Lock size={16}/> Auth Service</div> }, style: { backgroundColor: "#050816", color: "#fff", borderColor: "#fff" } },
  { id: "5", position: { x: 150, y: 200 }, data: { label: <div className="flex items-center gap-2"><Cpu size={16}/> Core Microservice</div> }, style: { backgroundColor: "#050816", color: "#fff", borderColor: "#fff" } },
  { id: "6", position: { x: 350, y: 200 }, data: { label: <div className="flex items-center gap-2"><Cloud size={16}/> IoT Ingestion</div> }, style: { backgroundColor: "#050816", color: "#fff", borderColor: "#fff" } },
  { id: "7", position: { x: 150, y: 300 }, data: { label: <div className="flex items-center gap-2"><Database size={16}/> PostgreSQL</div> }, style: { backgroundColor: "#050816", color: "#fff", borderColor: "#5CE1E6" } },
  { id: "8", position: { x: 350, y: 300 }, data: { label: <div className="flex items-center gap-2"><Database size={16}/> Redis Cache</div> }, style: { backgroundColor: "#050816", color: "#fff", borderColor: "#74DF00" } },
];

const initialEdges: Edge[] = [
  { id: "e1-3", source: "1", target: "3", animated: true },
  { id: "e2-3", source: "2", target: "3", animated: true },
  { id: "e3-4", source: "3", target: "4" },
  { id: "e3-5", source: "3", target: "5" },
  { id: "e3-6", source: "3", target: "6" },
  { id: "e5-7", source: "5", target: "7" },
  { id: "e5-8", source: "5", target: "8" },
  { id: "e6-8", source: "6", target: "8", animated: true },
];

export default function ArchitectureExplorer() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div className="w-full h-[400px] border border-border/50 rounded-xl overflow-hidden bg-background relative mt-4 shadow-2xl">
      <div className="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur-md border border-border/50 px-3 py-1 rounded-full text-xs font-medium text-white flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        Interactive Architecture
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        className="bg-background"
      >
        <MiniMap 
          nodeColor={(n) => {
            if (n.style?.borderColor) return n.style.borderColor as string;
            return '#fff';
          }}
          maskColor="rgba(5, 8, 22, 0.8)"
        />
        <Controls className="bg-card text-foreground border-border" />
        <Background color="#74DF00" gap={16} size={1} />
      </ReactFlow>
    </div>
  );
}
