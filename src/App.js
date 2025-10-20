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

  // Sauvegarde automatique
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('carnetEPS', JSON.stringify(formData));
      setSaveMessage('✅ Sauvegardé');
      setTimeout(() => setSaveMessage(''), 2000);
    }, 500);
    return () => clearTimeout(timer);
  }, [formData]);

  const addApsaSession = () => {
    setFormData({
      ...formData,
      apsaSessions: [...formData.apsaSessions, {
        id: Date.now(),
        date: '',
        apsa: '',
        actions: '',
        apprentissages: '',
        bilan: '',
        etatPhysiqueBefore: '',
        etatPhysiqueAfter: '',
        etatPsyBefore: '',
        etatPsyAfter: '',
        borgBefore: '',
        borgAfter: '',
        commentaire: ''
      }]
    });
  };

  const updateApsaSession = (id, field, value) => {
    setFormData({
      ...formData,
      apsaSessions: formData.apsaSessions.map(session =>
        session.id === id ? { ...session, [field]: value } : session
      )
    });
  };

  const removeApsaSession = (id) => {
    setFormData({
      ...formData,
      apsaSessions: formData.apsaSessions.filter(session => session.id !== id)
    });
  };

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };

  const downloadData = () => {
    const dataStr = JSON.stringify(formData, null, 2);
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(dataStr));
    element.setAttribute('download', `Carnet_EPS_${formData.nom || 'donnees'}_${formData.prenom || ''}.json`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const resetForm = () => {
    if (window.confirm('Êtes-vous sûr de vouloir réinitialiser le formulaire ? Cette action est irréversible.')) {
      setFormData({
        nom: '',
        prenom: '',
        classe: '',
        sante: { alimentation: '', sommeil: '', activitePhysique: '', stress: '' },
        minimumPratique: '',
        rapportPratique: { interet: '', quantite: '', sports: '', club: '' },
        problemes: '',
        testsBilan: { pointsFaibles: '', pointsForts: '', objectifs: '', moyens: '' },
        collaboration: '',
        apsaSessions: [],
        preferencesApsa: '',
        bilans: { s1: '', s2: '', s3: '', s4: '', final: '' }
      });
      localStorage.removeItem('carnetEPS');
    }
  };

  const Section = ({ title, section, children }) => (
    <div className="section-container">
      <button
        onClick={() => toggleSection(section)}
        className="section-header"
      >
        <span>{title}</span>
        {expandedSections[section] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {expandedSections[section] && (
        <div className="section-content">
          {children}
        </div>
      )}
    </div>
  );

  const InputField = ({ label, value, onChange, placeholder = '', type = 'text', rows = 1 }) => (
    <div className="input-group">
      <label className="input-label">{label}</label>
      {rows > 1 ? (
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          className="input-field textarea"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="input-field"
        />
      )}
    </div>
  );

  return (
    <div className="app-container">
      <div className="app-wrapper">
        {/* En-tête */}
        <div className="header-card">
          <h1 className="header-title">📚 Carnet de Bord EPS/C2.1</h1>
          <p className="header-subtitle">Suivi des apprentissages et du bien-être physique</p>
          
          <div className="header-grid">
            <InputField
              label="Prénom"
              value={formData.prenom}
              onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
              placeholder="Votre prénom"
            />
            <InputField
              label="Nom"
              value={formData.nom}
              onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
              placeholder="Votre nom"
            />
            <InputField
              label="Classe"
              value={formData.classe}
              onChange={(e) => setFormData({ ...formData, classe: e.target.value })}
              placeholder="Ex: BTSA 1"
            />
          </div>

          <div className="button-group">
            <button onClick={downloadData} className="btn btn-success">
              <Download size={18} /> Télécharger
            </button>
            <button onClick={resetForm} className="btn btn-danger">
              <RotateCcw size={18} /> Réinitialiser
            </button>
            {saveMessage && <span className="save-message">{saveMessage}</span>}
          </div>
        </div>

        {/* Intro */}
        <Section title="📖 Introduction" section="intro">
          <p className="intro-text">
            L'EPS en BTSA vise la construction d'un rapport durable à une bonne santé physique et psychologique. À vous de prendre en mains vos apprentissages !
          </p>
          <p className="intro-link">
            <strong>Ressource:</strong> Consultez le padlet pour des documents et apports théoriques
          </p>
        </Section>

        {/* Santé */}
        <Section title="❤️ Suis-je en bonne santé ?" section="sante">
          <div className="card">
            <p className="card-title">Les 4 piliers de la santé</p>
            <div className="grid-2">
              <InputField
                label="🍎 Alimentation"
                value={formData.sante.alimentation}
                onChange={(e) => setFormData({
                  ...formData,
                  sante: { ...formData.sante, alimentation: e.target.value }
                })}
                placeholder="Commentaire"
              />
              <InputField
                label="😴 Sommeil"
                value={formData.sante.sommeil}
                onChange={(e) => setFormData({
                  ...formData,
                  sante: { ...formData.sante, sommeil: e.target.value }
                })}
                placeholder="Commentaire"
              />
              <InputField
                label="🏃 Activité Physique"
                value={formData.sante.activitePhysique}
                onChange={(e) => setFormData({
                  ...formData,
                  sante: { ...formData.sante, activitePhysique: e.target.value }
                })}
                placeholder="Commentaire"
              />
              <InputField
                label="🧘 Gestion du stress"
                value={formData.sante.stress}
                onChange={(e) => setFormData({
                  ...formData,
                  sante: { ...formData.sante, stress: e.target.value }
                })}
                placeholder="Commentaire"
              />
            </div>
          </div>
          <InputField
            label="Quel est le minimum de pratique physique pour ma santé ?"
            value={formData.minimumPratique}
            onChange={(e) => setFormData({ ...formData, minimumPratique: e.target.value })}
            rows={3}
          />
        </Section>

        {/* Rapport à la pratique */}
        <Section title="⚡ Quel est mon rapport à la pratique physique ?" section="connaissances">
          <InputField
            label="Intérêt / Motivation"
            value={formData.rapportPratique.interet}
            onChange={(e) => setFormData({
              ...formData,
              rapportPratique: { ...formData.rapportPratique, interet: e.target.value }
            })}
            rows={2}
          />
          <InputField
            label="Quantité / Fréquence"
            value={formData.rapportPratique.quantite}
            onChange={(e) => setFormData({
              ...formData,
              rapportPratique: { ...formData.rapportPratique, quantite: e.target.value }
            })}
            rows={2}
          />
          <InputField
            label="Mes sports préférés (pratiqués ou déjà pratiqués)"
            value={formData.rapportPratique.sports}
            onChange={(e) => setFormData({
              ...formData,
              rapportPratique: { ...formData.rapportPratique, sports: e.target.value }
            })}
            rows={2}
          />
          <InputField
            label="Expérience en club"
            value={formData.rapportPratique.club}
            onChange={(e) => setFormData({
              ...formData,
              rapportPratique: { ...formData.rapportPratique, club: e.target.value }
            })}
            rows={2}
          />
          <InputField
            label="⚠️ Problèmes particuliers (blessures, douleurs...)"
            value={formData.problemes}
            onChange={(e) => setFormData({ ...formData, problemes: e.target.value })}
            rows={3}
            placeholder="Joindre un certificat médical si besoin"
          />
        </Section>

        {/* Tests et Bilan */}
        <Section title="📊 Se connaitre / Tests / État de forme" section="collaboration">
          <div className="card">
            <h3 className="card-title">Bilan des tests et perspectives</h3>
            <InputField
              label="Mes points faibles"
              value={formData.testsBilan.pointsFaibles}
              onChange={(e) => setFormData({
                ...formData,
                testsBilan: { ...formData.testsBilan, pointsFaibles: e.target.value }
              })}
              rows={2}
            />
            <InputField
              label="Mes points forts"
              value={formData.testsBilan.pointsForts}
              onChange={(e) => setFormData({
                ...formData,
                testsBilan: { ...formData.testsBilan, pointsForts: e.target.value }
              })}
              rows={2}
            />
            <InputField
              label="Objectifs pour les deux années"
              value={formData.testsBilan.objectifs}
              onChange={(e) => setFormData({
                ...formData,
                testsBilan: { ...formData.testsBilan, objectifs: e.target.value }
              })}
              rows={2}
            />
            <InputField
              label="Moyens pour atteindre ces objectifs"
              value={formData.testsBilan.moyens}
              onChange={(e) => setFormData({
                ...formData,
                testsBilan: { ...formData.testsBilan, moyens: e.target.value }
              })}
              rows={2}
            />
          </div>
          <div className="mt-4">
            <InputField
              label="🤝 Suis-je opérationnel pour collaborer avec mes pairs ?"
              value={formData.collaboration}
              onChange={(e) => setFormData({ ...formData, collaboration: e.target.value })}
              rows={3}
            />
          </div>
        </Section>

        {/* APSA Sessions */}
        <Section title="🏋️ Découvrir / Pratiquer des activités sportives en EPS" section="apsas">
          <div className="add-button-container">
            <button onClick={addApsaSession} className="btn btn-primary">
              + Ajouter une séance APSA
            </button>
          </div>

          {formData.apsaSessions.map((session, idx) => (
            <div key={session.id} className="apsa-card">
              <div className="apsa-header">
                <h3 className="apsa-title">Séance {idx + 1}</h3>
                <button
                  onClick={() => removeApsaSession(session.id)}
                  className="btn-delete"
                >
                  ✕ Supprimer
                </button>
              </div>
              
              <div className="grid-2">
                <InputField
                  label="Date"
                  value={session.date}
                  onChange={(e) => updateApsaSession(session.id, 'date', e.target.value)}
                  type="date"
                />
                <InputField
                  label="APSA (Activité Physique Sportive et Artistique)"
                  value={session.apsa}
                  onChange={(e) => updateApsaSession(session.id, 'apsa', e.target.value)}
                  placeholder="Ex: Escalade, Natation..."
                />
              </div>

              <InputField
                label="Ce que j'ai fait"
                value={session.actions}
                onChange={(e) => updateApsaSession(session.id, 'actions', e.target.value)}
                rows={2}
              />

              <InputField
                label="Ce que je retiens"
                value={session.apprentissages}
                onChange={(e) => updateApsaSession(session.id, 'apprentissages', e.target.value)}
                rows={2}
              />

              <InputField
                label="Bilan, ressentis"
                value={session.bilan}
                onChange={(e) => updateApsaSession(session.id, 'bilan', e.target.value)}
                rows={2}
              />

              <div className="state-section before">
                <p className="state-title">État avant la pratique</p>
                <div className="grid-3">
                  <InputField
                    label="État Physique"
                    value={session.etatPhysiqueBefore}
                    onChange={(e) => updateApsaSession(session.id, 'etatPhysiqueBefore', e.target.value)}
                    placeholder="Forme, fatigue..."
                  />
                  <InputField
                    label="État Psychologique"
                    value={session.etatPsyBefore}
                    onChange={(e) => updateApsaSession(session.id, 'etatPsyBefore', e.target.value)}
                    placeholder="Motivation, stress..."
                  />
                  <InputField
                    label="Effort perçu (Borg 1-10)"
                    value={session.borgBefore}
                    onChange={(e) => updateApsaSession(session.id, 'borgBefore', e.target.value)}
                    type="number"
                    placeholder="1-10"
                  />
                </div>
              </div>

              <div className="state-section after">
                <p className="state-title">État après la pratique</p>
                <div className="grid-3">
                  <InputField
                    label="État Physique"
                    value={session.etatPhysiqueAfter}
                    onChange={(e) => updateApsaSession(session.id, 'etatPhysiqueAfter', e.target.value)}
                    placeholder="Forme, fatigue..."
                  />
                  <InputField
                    label="État Psychologique"
                    value={session.etatPsyAfter}
                    onChange={(e) => updateApsaSession(session.id, 'etatPsyAfter', e.target.value)}
                    placeholder="Satisfaction, énergie..."
                  />
                  <InputField
                    label="Effort perçu (Borg 1-10)"
                    value={session.borgAfter}
                    onChange={(e) => updateApsaSession(session.id, 'borgAfter', e.target.value)}
                    type="number"
                    placeholder="1-10"
                  />
                </div>
              </div>

              <InputField
                label="Commentaire"
                value={session.commentaire}
                onChange={(e) => updateApsaSession(session.id, 'commentaire', e.target.value)}
                rows={2}
              />
            </div>
          ))}

          <div className="card">
            <InputField
              label="💫 Mes préférences, mon choix d'APSA principal (et pourquoi ?)"
              value={formData.preferencesApsa}
              onChange={(e) => setFormData({ ...formData, preferencesApsa: e.target.value })}
              rows={3}
            />
          </div>
        </Section>

        {/* Bilans Semestriels */}
        <Section title="📈 Bilans Semestriels" section="bilans">
          <div className="bilans-space">
            <div className="bilan-card s1">
              <h3 className="bilan-title">📅 Bilan Semestre 1</h3>
              <InputField
                label="EPS, hors EPS, progrès, quantité pratique physique, état de forme, démarches collaboratives..."
                value={formData.bilans.s1}
                onChange={(e) => setFormData({
                  ...formData,
                  bilans: { ...formData.bilans, s1: e.target.value }
                })}
                rows={4}
              />
            </div>

            <div className="bilan-card s2">
              <h3 className="bilan-title">📅 Bilan Semestre 2</h3>
              <InputField
                label="EPS, hors EPS, progrès, quantité pratique physique, état de forme, perspectives pour la 2ème année..."
                value={formData.bilans.s2}
                onChange={(e) => setFormData({
                  ...formData,
                  bilans: { ...formData.bilans, s2: e.target.value }
                })}
                rows={4}
              />
            </div>

            <div className="bilan-card s3">
              <h3 className="bilan-title">📅 Bilan Semestre 3</h3>
              <InputField
                label="EPS, hors EPS, progrès, quantité pratique physique, état de forme, démarches collaboratives..."
                value={formData.bilans.s3}
                onChange={(e) => setFormData({
                  ...formData,
                  bilans: { ...formData.bilans, s3: e.target.value }
                })}
                rows={4}
              />
            </div>

            <div className="bilan-card s4">
              <h3 className="bilan-title">📅 Bilan Semestre 4</h3>
              <InputField
                label="EPS, hors EPS, progrès, quantité pratique physique, état de forme, démarches collaboratives..."
                value={formData.bilans.s4}
                onChange={(e) => setFormData({
                  ...formData,
                  bilans: { ...formData.bilans, s4: e.target.value }
                })}
                rows={4}
              />
            </div>

            <div className="bilan-card final">
              <h3 className="bilan-title">🎓 Bilan Final des deux années</h3>
              <InputField
                label="Évolution de ma pratique physique, ce que je retiens de ma pratique en EPS, ce que m'apporte la pratique physique, perspectives pour ma vie d'adulte, compétences collaboratives développées, évolution de mon rapport à l'autre..."
                value={formData.bilans.final}
                onChange={(e) => setFormData({
                  ...formData,
                  bilans: { ...formData.bilans, final: e.target.value }
                })}
                rows={5}
              />
            </div>
          </div>
        </Section>

        {/* Footer */}
        <div className="footer-card">
          <p className="footer-text">✅ Carnet de bord prêt à être utilisé</p>
          <button
            onClick={downloadData}
            className="btn btn-primary"
          >
            <Download size={18} /> Télécharger mes données
          </button>
        </div>
      </div>
    </div>
  );
}
