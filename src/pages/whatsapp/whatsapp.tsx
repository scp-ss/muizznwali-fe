import { useState } from 'react';
import '././whatsapp.css';

const WhatsAppSection = () => {
  const [showModal, setShowModal] = useState(false);

  const phoneNumber = '923183270790';
  const message = encodeURIComponent("Hey Muizz, I saw your page and wanted to connect!");
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  const handleWhatsAppClick = () => {
    if (isMobile) {
      // Mobile: open WhatsApp app
      window.open(`whatsapp://send?phone=${phoneNumber}&text=${message}`, '_blank');
    } else {
      // Desktop: show modal with choice
      setShowModal(true);
    }
  };

  const openWeb = () => {
    window.open(`https://web.whatsapp.com/send?phone=${phoneNumber}&text=${message}`, '_blank');
    setShowModal(false);
  };

  const openApp = () => {
    window.open(`whatsapp://send?phone=${phoneNumber}&text=${message}`, '_blank');
    setShowModal(false);
  };

  return (
    <section className="whatsapp-section">
      <h2>📱 Contact Muizz on WhatsApp</h2>
      <p>
        Got questions or feedback? Reach out directly and let's talk.
      </p>
      <button onClick={handleWhatsAppClick} className="whatsapp-button">
        Chat with Muizz
      </button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setShowModal(false)}>
              &times;
            </button>
            <h3>Choose WhatsApp Mode</h3>
            <p>Would you like to open WhatsApp Web or launch the desktop app?</p>
            <div className="modal-actions">
              <button onClick={openWeb} className="modal-button">Open Web</button>
              <button onClick={openApp} className="modal-button">Open App</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default WhatsAppSection;
