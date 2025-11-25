import React, { useEffect, useState } from 'react';
import { MeshBridgeService } from '../services/MeshBridgeService';

/**
 * Widget status MyMesh (affiche sur le dashboard)
 * Montre l'etat de connexion au reseau mesh
 */
export default function MyMeshStatus() {
  const [nodeInfo, setNodeInfo] = useState(null);
  
  useEffect(()=>{
    // Decommentez pour activer le check de status
    // MeshBridgeService.getNodeInfo().then(setNodeInfo);
  }, []);
  
  // Si pas d'info node, ne rien afficher
  if(!nodeInfo) return null;
  
  return (
    <div>
      <p>Vous etes {nodeInfo.connected ? 'connecte au mesh' : 'hors mesh'}.</p>
      <span>IPv6/node: {nodeInfo.ip || '(inconnu)'}</span>
    </div>
  );
}
