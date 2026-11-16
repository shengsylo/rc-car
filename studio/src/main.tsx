import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { connect } from './api';
import './styles.css';
connect();
import { useP } from './project/pstore';
(window as any).rcStudio = { useP };   // 调试用
createRoot(document.getElementById('root')!).render(<App />);
