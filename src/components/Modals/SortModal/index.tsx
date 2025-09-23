// SortModal.tsx
import React, { useContext } from 'react';
import { Modal } from '../ModalComp/Modal';
import styles from './SortModal.module.css';
import type { SortModalProps } from './types';
import { useDropdown } from "../../../utils/ContextHooks"; // Предполагаем, что хук возвращает { locations, cargoTypes }
import Select from 'react-select';
import { transformLocationOptions, transformCargoTypeOptions } from '../../../utils/orderUtils'; // Импортируем утилиты
import { ThemeContext } from '../../../context/ThemeContext';
import { ThemeList } from '../../../context/ThemeContext/types';

export const SortModal: React.FC<SortModalProps> = ({
    isOpen,
    setIsOpen,
    today,
    setToday,
    isUrgent,
    setIsUrgent,
    departLoc,
    goalLoc,
    cargoType,
    setDepartLoc,
    setGoalLoc,
    setCargoType
}) => {
    const { locs, cargoTypes: availableCargoTypes } = useDropdown(); // Получаем данные из контекста
    const themeContext = useContext(ThemeContext);
    const isDarkTheme = themeContext?.theme === ThemeList.DARK;

    // Функция для обработки изменения локации
    const handleDepartLocationChange = (selectedOption: { value: number; label: string } | null) => {
        setDepartLoc(selectedOption ? selectedOption.label : undefined); // Передаём только ID или undefined
    };
    const handleGoalLocationChange = (selectedOption: { value: number; label: string } | null) => {
        setGoalLoc(selectedOption ? selectedOption.label : undefined); // Передаём только ID или undefined
    };

    // Функция для обработки изменения типа груза
    const handleCargoTypeChange = (selectedOption: { value: number; label: string } | null) => {
        setCargoType(selectedOption ? selectedOption.label : undefined); // Передаём только ID или undefined
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            title="Сортировка"
            titelElement={undefined}
            className={styles.sortModal}
        >
            <div className={styles.sortModalContent}>
                {/* Селект для локаций */}
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Локация отправления</label>
                    <Select
                        value={transformLocationOptions(locs).find(option => option.label === departLoc) || null}
                        onChange={handleDepartLocationChange}
                        options={transformLocationOptions(locs)}
                        placeholder="Выберите локацию"
                        isClearable
                        isSearchable
                        className={styles.reactSelect}
                        classNamePrefix="react-select"
                        styles={{ option: (provided, state) => ({
                            ...provided,
                            backgroundColor: state.isFocused 
                                ? (isDarkTheme ? '#4b5563' : '#f3f4f6')
                                : 'transparent',
                            color: isDarkTheme ? '#f9fafb' : '#374151',
                            '&:hover': {
                                backgroundColor: isDarkTheme ? '#4b5563' : '#f3f4f6'
                            }
                        })}}
                    />
                </div>

                {/* Селект для локаций доставки*/}
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Локация доставки</label>
                    <Select
                        value={transformLocationOptions(locs).find(option => option.label === goalLoc) || null}
                        onChange={handleGoalLocationChange}
                        options={transformLocationOptions(locs)}
                        placeholder="Выберите локацию"
                        isClearable
                        isSearchable
                        className={styles.reactSelect}
                        classNamePrefix="react-select"
                        styles={{ option: (provided, state) => ({
                            ...provided,
                            backgroundColor: state.isFocused 
                                ? (isDarkTheme ? '#4b5563' : '#f3f4f6')
                                : 'transparent',
                            color: isDarkTheme ? '#f9fafb' : '#374151',
                            '&:hover': {
                                backgroundColor: isDarkTheme ? '#4b5563' : '#f3f4f6'
                            }
                        })}}
                    />
                </div>

                {/* Селект для типов груза */}
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Тип груза</label>
                    <Select
                        value={transformCargoTypeOptions(availableCargoTypes).find(option => option.label === cargoType) || null}
                        onChange={handleCargoTypeChange}
                        options={transformCargoTypeOptions(availableCargoTypes)}
                        placeholder="Выберите тип груза"
                        isClearable
                        isSearchable
                        className={styles.reactSelect}
                        classNamePrefix="react-select"
                        styles={{ option: (provided, state) => ({
                            ...provided,
                            backgroundColor: state.isFocused 
                                ? (isDarkTheme ? '#4b5563' : '#f3f4f6')
                                : 'transparent',
                            color: isDarkTheme ? '#f9fafb' : '#374151',
                            '&:hover': {
                                backgroundColor: isDarkTheme ? '#4b5563' : '#f3f4f6'
                            }
                        })}}
                    />
                </div>

                {/* Остальные элементы модалки */}
                <div className={styles.filtersGroup}>
                    <label className={styles.label}>Дата</label>
                    <TripletButtons 
                        value={today} 
                        onChange={setToday}
                        labels={['Не важно', 'Сегодня', 'Завтра']}
                    />
                </div>

                <div className={styles.filtersGroup}>
                    <label className={styles.label}>Срочность</label>
                    <TripletButtons 
                        value={isUrgent} 
                        onChange={setIsUrgent}
                        labels={['Не важно', 'Срочно', 'Не срочно']}
                    />
                </div>
            </div>
        </Modal>
    );
};

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
        <div className={styles.buttonTriplet}>
            {options.map((option, index) => (
                <button
                    key={index}
                    className={`${styles.filterButton} ${value === option ? styles.active : ''}`}
                    onClick={(e) => { e.preventDefault(); onChange(option); }}
                    type="button"
                    aria-pressed={value === option}
                    aria-label={labels[index]}
                >
                    {labels[index]}
                </button>
            ))}
        </div>
    );
};