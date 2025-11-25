import { useEffect, useState } from 'react';
import { MeshBridgeService } from '../services/MeshBridgeService';

/**
 * Hook React pour le scan MyMesh
 * @param {boolean} autoScan - Si true, lance le scan au mount
 * @returns {Array} [nodes, setNodes] - Liste des nodes detectes
 */
export function useMeshBridge(autoScan = false) {
  const [nodes, setNodes] = useState([]);
  useEffect(()=>{
    if (autoScan) {
      // MeshBridgeService.scan().then(setNodes);
    }
  }, [autoScan]);
  return [nodes, setNodes];
}
