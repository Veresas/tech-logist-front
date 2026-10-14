import axios, { type AxiosAdapter, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import { MOCKS_ENABLED, MOCK_NETWORK_DELAY_MS } from './const';

type Service = 'main' | 'analytics';
type MockHandler = (config: InternalAxiosRequestConfig, pathname: string) => unknown;

const locations: Record<string, string> = {
  '1': 'Цех №1 — корпус А',
  '2': 'Цех №2 — корпус А',
  '3': 'Цех №3 — корпус Б',
  '4': 'Склад готовой продукции — корпус Б',
  '5': 'Административный корпус',
};

const cargoTypes: Record<string, string> = {
  '1': 'Сырьё',
  '2': 'Комплектующие',
  '3': 'Готовая продукция',
  '4': 'Оборудование',
};

type MockOrder = {
  id: number;
  cargo_name: string;
  cargo_description: string;
  cargo_type_name: string;
  cargo_weight: number;
  depart_loc_name: string;
  goal_loc_name: string;
  dispatcher_name: string;
  driver_name: string;
  order_status_name: string;
  is_urgent: boolean;
  time: string;
  photo_id?: string;
};

const now = Date.now();
let orders: MockOrder[] = [
  { id: 101, cargo_name: 'Стальные листы', cargo_description: 'Листы 2×1 м, 12 шт.', cargo_type_name: 'Сырьё', cargo_weight: 840, depart_loc_name: locations['1'], goal_loc_name: locations['3'], dispatcher_name: 'Анна Смирнова', driver_name: 'Иван Петров', order_status_name: 'Новый', is_urgent: true, time: new Date(now + 45 * 60_000).toISOString() },
  { id: 102, cargo_name: 'Подшипники', cargo_description: 'Партия для линии сборки', cargo_type_name: 'Комплектующие', cargo_weight: 120, depart_loc_name: locations['2'], goal_loc_name: locations['4'], dispatcher_name: 'Анна Смирнова', driver_name: 'Алексей Волков', order_status_name: 'Принят', is_urgent: false, time: new Date(now + 90 * 60_000).toISOString() },
  { id: 103, cargo_name: 'Насосы серии НК', cargo_description: 'Упаковано на паллетах', cargo_type_name: 'Готовая продукция', cargo_weight: 560, depart_loc_name: locations['3'], goal_loc_name: locations['4'], dispatcher_name: 'Олег Иванов', driver_name: 'Иван Петров', order_status_name: 'Выполнен', is_urgent: false, time: new Date(now - 35 * 60_000).toISOString() },
  { id: 104, cargo_name: 'Электродвигатель', cargo_description: 'Требуется бережная перевозка', cargo_type_name: 'Оборудование', cargo_weight: 230, depart_loc_name: locations['5'], goal_loc_name: locations['1'], dispatcher_name: 'Олег Иванов', driver_name: 'Алексей Волков', order_status_name: 'Новый', is_urgent: false, time: new Date(now + 2 * 60 * 60_000).toISOString() },
];

const bodyOf = (config: InternalAxiosRequestConfig): Record<string, unknown> => {
  if (!config.data) return {};
  if (typeof config.data === 'string') {
    try { return JSON.parse(config.data) as Record<string, unknown>; } catch { return {}; }
  }
  return config.data as Record<string, unknown>;
};

const orderForUpdate = (id: number) => {
  const order = orders.find((item) => item.id === id);
  if (!order) return {};
  return {
    cargo_name: order.cargo_name,
    cargo_description: order.cargo_description,
    cargo_type_id: Object.keys(cargoTypes).find((key) => cargoTypes[key] === order.cargo_type_name),
    cargo_weight: order.cargo_weight,
    depart_loc: Object.keys(locations).find((key) => locations[key] === order.depart_loc_name),
    goal_loc: Object.keys(locations).find((key) => locations[key] === order.goal_loc_name),
    is_urgent: order.is_urgent,
    time: order.time,
    photo_id: order.photo_id,
  };
};

const mainHandlers: Array<[RegExp, MockHandler]> = [
  [/^\/check$/, () => ({ name: 'Демо пользователь', role: 'admin' })],
  [/^\/ref\/dropdown-list-info$/, () => ({ cargo_types: cargoTypes, dep_builds: locations })],
  [/^\/orders\/actual$/, () => ({ count: orders.length, orders })],
  [/^\/orders\/personal\/catalog$/, () => ({
    new: { orders: orders.filter((order) => order.order_status_name === 'Новый'), total: orders.filter((order) => order.order_status_name === 'Новый').length, in_response: 0 },
    in_work: { orders: orders.filter((order) => order.order_status_name === 'Принят'), total: orders.filter((order) => order.order_status_name === 'Принят').length, in_response: 0 },
    completed: { orders: orders.filter((order) => order.order_status_name === 'Выполнен'), total: orders.filter((order) => order.order_status_name === 'Выполнен').length, in_response: 0 },
  })],
  [/^\/public\/auth\/check-login\/[^/]+$/, (_config, pathname) => !['admin', 'driver', 'disp'].includes(decodeURIComponent(pathname.split('/').pop() ?? ''))],
  [/^\/public\/auth\/login$/, () => ({ message: 'Вход выполнен (демо)' })],
  [/^\/public\/auth\/logout$/, () => ({ message: 'Выход выполнен (демо)' })],
  [/^\/public\/auth\/register$/, () => ({ message: 'Регистрация выполнена (демо)' })],
  [/^\/ident\/users\/[^/]+$/, (config, pathname) => {
    if (config.method?.toLowerCase() === 'patch') return { message: 'Профиль обновлён (демо)' };
    const id = decodeURIComponent(pathname.split('/').pop() ?? '');
    return { public_id: id, fio: 'Демо пользователь', login: id || 'demo', phone: '+7 900 000-00-00', role_id: 'admin', role_name: 'Администратор' };
  }],
  [/^\/orders\/create$/, (config) => {
    const body = bodyOf(config);
    const order: MockOrder = {
      id: Math.max(0, ...orders.map((item) => item.id)) + 1,
      cargo_name: String(body.cargo_name ?? 'Новый груз'),
      cargo_description: String(body.cargo_description ?? ''),
      cargo_type_name: cargoTypes[String(body.cargo_type_id)] ?? 'Сырьё',
      cargo_weight: Number(body.cargo_weight ?? 0),
      depart_loc_name: locations[String(body.depart_loc)] ?? locations['1'],
      goal_loc_name: locations[String(body.goal_loc)] ?? locations['2'],
      dispatcher_name: 'Демо диспетчер', driver_name: 'Демо водитель', order_status_name: 'Новый',
      is_urgent: Boolean(body.is_urgent), time: String(body.time ?? new Date().toISOString()), photo_id: String(body.photo_id ?? ''),
    };
    orders = [order, ...orders];
    return { message: 'Заявка создана (демо)', id: order.id };
  }],
  [/^\/orders\/photo\/upload$/, () => ({ message: 'Фото загружено (демо)', photo_id: `mock-photo-${Date.now()}` })],
  [/^\/orders\/photo\/[^/]+$/, (config, pathname) => config.method?.toLowerCase() === 'delete'
    ? { message: 'Фото удалено (демо)' }
    : config.responseType === 'blob'
      ? new Blob(['<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180"><rect width="100%" height="100%" fill="#e5e7eb"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#4b5563">Демо фото</text></svg>'], { type: 'image/svg+xml' })
      : { photo_id: pathname.split('/').pop(), url: '' }],
  [/^\/orders\/update\/\d+$/, (_config, pathname) => ({ order_for_update: orderForUpdate(Number(pathname.split('/').pop())) })],
  [/^\/orders\/\d+$/, (_config, pathname) => {
    const id = Number(pathname.split('/').pop());
    if (_config.method?.toLowerCase() === 'patch') return { message: 'Заявка обновлена (демо)' };
    return orders.find((order) => order.id === id) ?? { id };
  }],
  [/^\/orders\/\d+\/(accept|cancel|complete|reject)$/, (_config, pathname) => {
    const [, action] = pathname.match(/\/(accept|cancel|complete|reject)$/) ?? [];
    const id = Number(pathname.split('/')[2]);
    const nextStatus: Record<string, string> = { accept: 'Принят', cancel: 'Отменен', complete: 'Выполнен', reject: 'Отменен' };
    orders = orders.map((order) => order.id === id ? { ...order, order_status_name: nextStatus[action] ?? order.order_status_name } : order);
    return { message: `Заявка ${action === 'accept' ? 'принята' : action === 'complete' ? 'выполнена' : 'обновлена'} (демо)` };
  }],
];

const analyticsHandlers: Array<[RegExp, MockHandler]> = [
  [/^\/analytics\/drivers\/average-time$/, () => [
    { driverName: 'Иван Петров', averageTimeMinutes: 38 },
    { driverName: 'Алексей Волков', averageTimeMinutes: 52 },
    { driverName: 'Сергей Кузнецов', averageTimeMinutes: 44 },
  ]],
  [/^\/analytics\/drivers\/orders-by-types$/, () => [
    { driverName: 'Иван Петров', cargoTypes: { Сырьё: 8, Комплектующие: 5, 'Готовая продукция': 4, Оборудование: 2 } },
    { driverName: 'Алексей Волков', cargoTypes: { Сырьё: 3, Комплектующие: 7, 'Готовая продукция': 5, Оборудование: 4 } },
  ]],
  [/^\/analytics\/workshops\/incoming(?:-by-buildings)?$/, () => [
    { departName: 'Цех №1', cargoTypes: { Сырьё: 12, Комплектующие: 7, 'Готовая продукция': 3 } },
    { departName: 'Цех №2', cargoTypes: { Сырьё: 5, Комплектующие: 10, 'Готовая продукция': 8 } },
    { departName: 'Корпус А-Цех №1', cargoTypes: { Сырьё: 6, Комплектующие: 4, 'Готовая продукция': 2 } },
    { departName: 'Корпус Б-Цех №3', cargoTypes: { Сырьё: 3, Комплектующие: 5, 'Готовая продукция': 7 } },
  ]],
];

const createMockAdapter = (service: Service): AxiosAdapter => async (config) => {
  if (config.signal?.aborted) throw new axios.CanceledError('Запрос отменён', config);
  await new Promise((resolve) => setTimeout(resolve, MOCK_NETWORK_DELAY_MS));
  if (config.signal?.aborted) throw new axios.CanceledError('Запрос отменён', config);

  const parsedUrl = new URL(config.url ?? '/', config.baseURL ?? window.location.origin);
  const pathname = parsedUrl.pathname.replace(/\/$/, '') || '/';
  const handlers = service === 'main' ? mainHandlers : analyticsHandlers;
  const matched = handlers.find(([pattern]) => pattern.test(pathname));
  if (!matched) {
    return Promise.reject(new axios.AxiosError(`Нет мока для ${config.method?.toUpperCase()} ${pathname}`, 'ERR_MOCK_NOT_FOUND', config, undefined, {
      data: { message: 'Для этого API-запроса не настроен мок' }, status: 404, statusText: 'Not Found', headers: {}, config,
    } as AxiosResponse));
  }

  const data = matched[1](config, pathname);
  return {
    data,
    status: 200,
    statusText: 'OK',
    headers: { 'x-mock-response': 'true' },
    config,
  };
};

/** Подключите к Axios instance как adapter: mockAdapter('main' | 'analytics'). */
export const mockAdapter = (service: Service): AxiosAdapter | undefined =>
  MOCKS_ENABLED ? createMockAdapter(service) : undefined;

export { MOCKS_ENABLED, MOCK_NETWORK_DELAY_MS } from './const';
