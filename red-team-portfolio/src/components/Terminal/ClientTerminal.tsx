'use client';

import dynamic from 'next/dynamic';

const Terminal = dynamic(() => import('./Terminal').then(mod => ({ default: mod.Terminal })), {
  ssr: false,
  loading: () => (
    <div className="bg-black/40 backdrop-blur-sm border border-red-500/20 rounded-lg p-8 text-center" style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div>
        <div className="text-red-400 text-lg mb-2">Loading terminal...</div>
        <div className="text-gray-400 text-sm">Initializing xterm.js</div>
      </div>
    </div>
  ),
});

export default Terminal;

