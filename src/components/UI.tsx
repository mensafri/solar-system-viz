import { useStore } from '../store';
import { motion, AnimatePresence } from 'framer-motion';
import { planets } from '../data/planets';

export const UI = () => {
  const { 
    language, setLanguage, 
    selectedPlanet, setSelectedPlanet,
    isPaused, togglePause,
    speedFactor, setSpeedFactor,
    isTourActive, startTour, stopTour, tourStep, setTourStep
  } = useStore();

  const t = {
    title: language === 'en' ? 'Solar System Visualization' : 'Visualisasi Tata Surya',
    pause: language === 'en' ? 'Pause' : 'Jeda',
    play: language === 'en' ? 'Play' : 'Mainkan',
    speed: language === 'en' ? 'Speed' : 'Kecepatan',
    close: language === 'en' ? 'Close' : 'Tutup',
    startTour: language === 'en' ? 'Start Tour' : 'Mulai Tur',
    stopTour: language === 'en' ? 'Stop Tour' : 'Hentikan Tur',
    previous: language === 'en' ? 'Previous' : 'Sebelumnya',
    next: language === 'en' ? 'Next' : 'Berikutnya',
    rotationPeriod: language === 'en' ? 'Day Length' : 'Lama Hari',
    temperature: language === 'en' ? 'Avg. Temperature' : 'Suhu Rata-rata',
    moons: language === 'en' ? 'Moons' : 'Bulan',
    mass: language === 'en' ? 'Mass' : 'Massa',
    diameter: language === 'en' ? 'Diameter' : 'Diameter',
    orbitalPeriod: language === 'en' ? 'Orbital Period' : 'Periode Orbit',
    gravity: language === 'en' ? 'Gravity' : 'Gravitasi',
  };

  const handlePreviousPlanet = () => {
    const prevStep = tourStep - 1;
    if (prevStep >= 0) {
      setTourStep(prevStep);
      setSelectedPlanet(planets[prevStep]);
    }
  };

  const handleNextPlanet = () => {
    const nextStep = tourStep + 1;
    if (nextStep < planets.length) {
      setTourStep(nextStep);
      setSelectedPlanet(planets[nextStep]);
    }
  };

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
      {/* Header & Controls */}
      <div style={{ 
        position: 'absolute', 
        top: 20, 
        left: 20, 
        color: 'white', 
        pointerEvents: 'auto',
        background: 'rgba(20, 20, 30, 0.6)',
        padding: '24px',
        borderRadius: '16px',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        minWidth: '200px'
      }}>
        <h1 style={{ margin: '0 0 16px 0', fontSize: '24px', fontWeight: '300', letterSpacing: '1px' }}>{t.title}</h1>
        
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
          <button 
            onClick={() => setLanguage('en')} 
            style={{ 
              flex: 1,
              background: language === 'en' ? 'rgba(255,255,255,0.2)' : 'transparent',
              border: '1px solid rgba(255,255,255,0.2)'
            }}
          >
            EN
          </button>
          <button 
            onClick={() => setLanguage('id')} 
            style={{ 
              flex: 1,
              background: language === 'id' ? 'rgba(255,255,255,0.2)' : 'transparent',
              border: '1px solid rgba(255,255,255,0.2)'
            }}
          >
            ID
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <button 
            onClick={togglePause}
            style={{ 
              background: isPaused ? 'rgba(255, 100, 100, 0.3)' : 'rgba(100, 255, 100, 0.3)',
              border: '1px solid rgba(255,255,255,0.2)'
            }}
          >
            {isPaused ? t.play : t.pause}
          </button>
          
          <button 
            onClick={isTourActive ? stopTour : startTour}
            style={{ 
              background: isTourActive ? 'rgba(255, 200, 100, 0.3)' : 'rgba(100, 200, 255, 0.3)',
              border: '1px solid rgba(255,255,255,0.2)'
            }}
          >
            {isTourActive ? t.stopTour : t.startTour}
          </button>

          {/* Tour Navigation */}
          {isTourActive && (
            <div style={{ display: 'flex', gap: '8px' }}>
              <button 
                onClick={handlePreviousPlanet}
                disabled={tourStep === 0}
                style={{ 
                  flex: 1,
                  background: 'rgba(150, 150, 255, 0.3)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  opacity: tourStep === 0 ? 0.5 : 1,
                  cursor: tourStep === 0 ? 'not-allowed' : 'pointer'
                }}
              >
                ← {t.previous}
              </button>
              <button 
                onClick={handleNextPlanet}
                disabled={tourStep === planets.length - 1}
                style={{ 
                  flex: 1,
                  background: 'rgba(150, 150, 255, 0.3)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  opacity: tourStep === planets.length - 1 ? 0.5 : 1,
                  cursor: tourStep === planets.length - 1 ? 'not-allowed' : 'pointer'
                }}
              >
                {t.next} →
              </button>
            </div>
          )}
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', opacity: 0.8 }}>
              <label>{t.speed}</label>
              <span>{speedFactor.toFixed(1)}x</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="5" 
              step="0.1" 
              value={speedFactor} 
              onChange={(e) => setSpeedFactor(parseFloat(e.target.value))}
              style={{ width: '100%', cursor: 'pointer' }}
            />
          </div>
        </div>
      </div>

      {/* Planet Info Panel */}
      <AnimatePresence>
        {selectedPlanet && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            style={{
              position: 'absolute',
              top: 20,
              right: 20,
              width: '360px',
              maxHeight: '90vh',
              overflowY: 'auto',
              background: 'rgba(20, 20, 30, 0.8)',
              color: 'white',
              padding: '24px',
              borderRadius: '16px',
              pointerEvents: 'auto',
              border: `1px solid ${selectedPlanet.color}`,
              backdropFilter: 'blur(12px)',
              boxShadow: `0 0 30px ${selectedPlanet.color}40`
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h2 style={{ margin: 0, color: selectedPlanet.color }}>{selectedPlanet.name[language]}</h2>
              <button 
                onClick={() => {
                  setSelectedPlanet(null);
                  if (isTourActive) stopTour();
                }} 
                style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', fontSize: '20px' }}
              >
                ✕
              </button>
            </div>
            
            <p style={{ lineHeight: '1.5', marginBottom: '20px', fontSize: '14px' }}>{selectedPlanet.description[language]}</p>
            
            <div style={{ fontSize: '13px', color: '#ccc' }}>
              <div style={{ display: 'grid', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <span style={{ opacity: 0.7 }}>{t.diameter}:</span>
                  <span style={{ fontWeight: '500' }}>{selectedPlanet.details.diameter}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <span style={{ opacity: 0.7 }}>{t.mass}:</span>
                  <span style={{ fontWeight: '500' }}>{selectedPlanet.details.mass}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <span style={{ opacity: 0.7 }}>{t.rotationPeriod}:</span>
                  <span style={{ fontWeight: '500' }}>{selectedPlanet.details.rotationPeriod}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <span style={{ opacity: 0.7 }}>{t.orbitalPeriod}:</span>
                  <span style={{ fontWeight: '500' }}>{selectedPlanet.details.orbitalPeriod}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <span style={{ opacity: 0.7 }}>{t.temperature}:</span>
                  <span style={{ fontWeight: '500' }}>{selectedPlanet.details.temperature}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <span style={{ opacity: 0.7 }}>{t.gravity}:</span>
                  <span style={{ fontWeight: '500' }}>{selectedPlanet.details.gravity}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <span style={{ opacity: 0.7 }}>{t.moons}:</span>
                  <span style={{ fontWeight: '500' }}>{selectedPlanet.details.moons}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
