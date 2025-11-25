/**
 * UI de connexion MyMesh (option premium/pro)
 * Bloc affiche UNIQUEMENT si bridge accessible, detecte (check dynamique import package) !
 */
import React, { useEffect, useState } from 'react';
import { MeshBridgeService } from '../services/MeshBridgeService'

export default function MyMeshConnectScreen() {
  const [nodes, setNodes] = useState([]);
  const [connected, setConnected] = useState(null);
  const [stats, setStats] = useState(null);
  const [alertMsg, setAlertMsg] = useState('');

  // Scan au mount
  useEffect(()=>{ 
    // (decommentez ligne suivante a l'integration du vrai bridge)
    // MeshBridgeService.scan().then(setNodes);
  }, []);

  const handleConnect = async nodeId => {
    // const node = await MeshBridgeService.connect(nodeId);
    // setConnected(node);
  };

  const handleDisconnect = async () => {
    // await MeshBridgeService.disconnect();
    // setConnected(null);
  };

  const handleSendAlert = async () => {
    // await MeshBridgeService.sendAlert(alertMsg);
    // setAlertMsg('SOS envoye');
  };

  // Statistiques dynamiques
  // useEffect(()=>{ if (connected) MeshBridgeService.getStats().then(setStats); }, [connected]);

  // Si package non present, n'affiche rien
  // if (!MYMESH_PRESENT) return null;

  return (
    <div>
      <h2>Connexion reseau MyMesh (Premium)</h2>
      {connected
        ? <div>
            <p>Connecte a {connected.name}</p>
            <button onClick={handleDisconnect}>Deconnexion</button>
            {/* Stats, log events, etc. */}
          </div>
        : <>
            <button onClick={()=> MeshBridgeService.scan().then(setNodes)}>Scanner a proximite</button>
            <ul>
              {nodes.map(({id, name}, i) => 
                <li key={id}><button onClick={()=>handleConnect(id)}>Se connecter a {name}</button></li>
              )}
            </ul>
          </>
      }
      <div style={{marginTop: "20px"}}>
        <input value={alertMsg} onChange={e=>setAlertMsg(e.target.value)} placeholder="Alerte/SOS..." />
        <button onClick={handleSendAlert}>Envoyer SOS</button>
      </div>
      {/* Affichage stats si connecte */}
      {/* {stats && <pre>{JSON.stringify(stats,null,2)}</pre>} */}
    </div>
  )
}
