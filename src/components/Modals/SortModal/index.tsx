import React from 'react';
import { Modal } from '../ModalComp/Modal';
import styles from './SortModal.module.css';
import type { SortModalProps } from './types';

export const SortModal: React.FC<SortModalProps> = ({
    isOpen,
    setIsOpen,
    today,
    setToday,
    isUrgent,
    setIsUrgent
}) => {
    return (
        <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Сортировка"
        titelElement={undefined}
        className={styles.sortModal}
        >
            <div>

                <TripletButtons 
                value={today} 
                onChange={setToday}
                labels={['Не важно', 'Сегодня', 'Завтра']}
                />

                <TripletButtons 
                value={isUrgent} 
                onChange={setIsUrgent}
                labels={['Не важно', 'Срочно', 'Не срочно']}
                />
            </div>
        </Modal>

    )
}

// Универсальный компонент для триплета
const TripletButtons = ({ 
    value, 
    onChange,
    labels = ['Не важно', 'Да', 'Нет']
  }: {
    value: boolean | undefined;
    onChange: (value: boolean | undefined) => void;
    labels?: [string, string, string];
  }) => {
    const options: (boolean | undefined)[] = [undefined, true, false];
    
    return (
      <div className="button-triplet">
        {options.map((option, index) => (
          <button
            key={index}
            className={`filter-button ${value === option ? 'active' : ''}`}
            onClick={() => onChange(option)}
          >
            {labels[index]}
          </button>
        ))}
      </div>
    );
  };