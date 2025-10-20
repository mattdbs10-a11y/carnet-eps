import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Download, RotateCcw, Save } from 'lucide-react';
import './App.css';

export default function App() {
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('carnetEPS');
    return saved ? JSON.parse(saved) : {
      nom: '',
      prenom: '',
      classe: '',
      sante: {
        alimentation: '',
        sommeil: '',
        activitePhysique: '',
        stress: ''
      },
      minimumPratique: '',
      rapportPratique: {
        interet: '',
        quantite: '',
        sports: '',
        club: ''
      },
      problemes: '',
      testsBilan: {
        pointsFaibles: '',
        pointsForts: '',
        objectifs: '',
        moyens: ''
      },
      collaboration: '',
      apsaSessions: [],
      preferencesApsa: '',
      bilans: {
        s1: '',
        s2: '',
        s3: '',
        s4: '',
        final: ''
      }
    };
  });

  const [expandedSections, setExpandedSections] = useState({
    intro: true,
    sante: true,
    connaissances: true,
    collaboration: false,
    apsas: true,
    bilans: false
  });

  const [saveMessage, setSaveMessage] = useState('');
