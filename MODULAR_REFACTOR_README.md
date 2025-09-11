# Рефакторинг OrderCreateForm - Модульная архитектура

## Обзор

Компонент `OrderCreateForm` был разбит на переиспользуемые модули для улучшения читаемости, тестируемости и переиспользования кода.

## Структура новых модулей

### 1. Modal (`src/components/Modal/`)
**Базовый переиспользуемый компонент модального окна**

- **Файлы:** `index.tsx`, `Modal.module.css`
- **Функции:** Управление фокусом, accessibility, клавиатурные события
- **Переиспользование:** Можно использовать в любых модальных окнах приложения

**Использование:**
```tsx
import { Modal } from '../components/Modal';

<Modal 
  isOpen={showModal} 
  onClose={() => setShowModal(false)} 
  title="Заголовок"
  footer={<button>Действие</button>}
>
  Содержимое модального окна
</Modal>
```

### 2. UrgentToggle (`src/components/UrgentToggle/`)
**Переключатель срочности заказа**

- **Файлы:** `index.tsx`, `UrgentToggle.module.css`
- **Функции:** Toggle switch с анимацией, accessibility
- **Переиспользование:** В других формах, где нужен переключатель

**Использование:**
```tsx
import { UrgentToggle } from '../components/UrgentToggle';

<UrgentToggle 
  isUrgent={isUrgent} 
  onToggle={() => setIsUrgent(!isUrgent)} 
/>
```

### 3. TimeSelector (`src/components/TimeSelector/`)
**Выбор времени доставки**

- **Файлы:** `index.tsx`, `TimeSelector.module.css`
- **Функции:** Табы даты, сетка времени, accessibility
- **Переиспользование:** В других формах доставки

**Использование:**
```tsx
import { TimeSelector } from '../components/TimeSelector';

<TimeSelector
  selectedDate="today"
  selectedTime="14:30"
  onDateChange={(date) => setSelectedDate(date)}
  onTimeChange={(time) => setSelectedTime(time)}
/>
```

### 4. Хуки

#### useOrderDraft (`src/hooks/useOrderDraft.ts`)
**Управление черновиками заказов**

- **Функции:** Сохранение/загрузка, автосохранение, очистка
- **Переиспользование:** В других формах, где нужны черновики

**Использование:**
```tsx
import { useOrderDraft } from '../hooks/useOrderDraft';

const { draft, saveDraft, clearDraft } = useOrderDraft(
  order, isUrgent, selectedDate, selectedTime, photoPreview, photoId, formData
);
```

#### usePhotoUpload (`src/hooks/usePhotoUpload.ts`)
**Загрузка фотографий**

- **Функции:** Drag & Drop, валидация, превью, загрузка на сервер
- **Переиспользование:** В других формах с загрузкой файлов

**Использование:**
```tsx
import { usePhotoUpload } from '../hooks/usePhotoUpload';

const { 
  photoPreview, 
  isUploading, 
  handlePhotoAreaClick, 
  handleDrop 
} = usePhotoUpload();
```

### 5. Утилиты (`src/utils/orderUtils.ts`)
**Вспомогательные функции для заказов**

- **Функции:** Трансформация данных, форматирование, валидация
- **Переиспользование:** В других компонентах, работающих с заказами

**Использование:**
```tsx
import { 
  transformLocationOptions, 
  formatTimeForAPI,
  getModalTitle 
} from '../utils/orderUtils';

const locationOptions = transformLocationOptions(depBuilds);
const timeString = formatTimeForAPI('today', '14:30');
const title = getModalTitle(!!order);
```

## Преимущества новой архитектуры

### 1. **Переиспользование**
- Modal можно использовать в любых модальных окнах
- UrgentToggle применим в других формах
- TimeSelector подходит для любых форм с выбором времени
- Хуки можно использовать в других компонентах

### 2. **Читаемость**
- Основной компонент стал намного проще
- Каждый модуль отвечает за свою область
- Легче понимать логику каждого компонента

### 3. **Тестируемость**
- Каждый модуль можно тестировать отдельно
- Хуки легко мокать в тестах
- Изолированная логика упрощает unit-тесты

### 4. **Поддержка**
- Легче вносить изменения в конкретные модули
- Меньше конфликтов при merge
- Четкое разделение ответственности

### 5. **Производительность**
- Модули можно lazy-load при необходимости
- Меньше перерендеров основного компонента
- Оптимизация отдельных модулей

## Сокращение объема основного файла

**До рефакторинга:** ~651 строка
**После рефакторинга:** ~200-250 строк (основная логика + композиция)

**Сокращение:** **60-70%**

## Миграция существующего кода

### 1. **Импорты**
```tsx
// Старый способ
import { OrderCreateForm } from '../components/OrderCreateForm';

// Новый способ
import { 
  Modal, 
  UrgentToggle, 
  TimeSelector,
  useOrderDraft,
  usePhotoUpload 
} from '../components';
```

### 2. **Использование Modal**
```tsx
// Старый способ - встроенный модал
<div className={styles.modalOverlay}>
  <div className={styles.modal}>
    {/* содержимое */}
  </div>
</div>

// Новый способ - компонент Modal
<Modal isOpen={true} onClose={onClose} title="Заголовок">
  {/* содержимое */}
</Modal>
```

### 3. **Использование хуков**
```tsx
// Старый способ - inline логика
const [photoPreview, setPhotoPreview] = useState('');
const [isUploading, setIsUploading] = useState(false);
// ... много кода для загрузки фото

// Новый способ - хук
const { photoPreview, isUploading, handlePhotoAreaClick } = usePhotoUpload();
```

## Планы дальнейшего развития

### 1. **Дополнительные модули**
- `OrderFormFields` - поля формы заказа
- `PhotoUpload` - компонент загрузки фото
- `OrderSummary` - сводка заказа

### 2. **Улучшения accessibility**
- ARIA атрибуты для всех компонентов
- Поддержка screen readers
- Клавиатурная навигация

### 3. **Темы и стили**
- CSS переменные для цветов
- Поддержка кастомных тем
- Адаптивный дизайн

### 4. **Тестирование**
- Unit тесты для каждого модуля
- Integration тесты для форм
- E2E тесты для пользовательских сценариев

## Заключение

Модульная архитектура значительно улучшила структуру кода, сделав его более читаемым, тестируемым и переиспользуемым. Основной компонент стал проще, а каждый модуль теперь отвечает за свою конкретную область функциональности.
