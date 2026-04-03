import React from 'react';
import '../../styles/confirm-modal.css';

function ConfirmModal({
                          isOpen,
                          title,
                          text,
                          confirmText = 'Да',
                          cancelText = 'Нет',
                          onConfirm,
                          onCancel,
                      }) {
    if (!isOpen) return null;

    return (
        <div className="confirm-modal_overlay">
            <div className="confirm-modal">
                <h2 className="confirm-modal_title">{title}</h2>
                <p className="confirm-modal_text">{text}</p>

                <div className="confirm-modal_actions">
                    <button
                        className="confirm-modal_button confirm-modal_button-danger"
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </button>

                    <button
                        className="confirm-modal_button confirm-modal_button-secondary"
                        onClick={onCancel}
                    >
                        {cancelText}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;