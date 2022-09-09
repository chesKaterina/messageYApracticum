export class EventBus {
  private readonly listeners: Record<string, Array<() => void>> = {};

  constructor() {
  // Объект для наполнения ожидаемыми событиями
  this.listeners = {};
}
// Подписка на события
  on(event: string, callback: () => void): void {
    // Если свойства с названием события нет, создаём пустой массив для них
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
// Добавляем колбэк в массив соответствующих событий
    this.listeners[event].push(callback);
  }
// Отписка от событий
off(event: string, callback: () => void): void {
  this._checkEvent(event);
  // Отфильтровываем все колбеки кроме совпавшего
  this.listeners[event] = this.listeners[event]
    .filter((listener) => listener !== callback);
}

// Отправка события
emit(event: string, ...args: unknown[]): void {
  this._checkEvent(event);
  this.listeners[event].forEach((listener) => {
    // Вызываем событие, передаём аргументы
    listener(...args);
  });
}

_checkEvent(event: string) {
  // Если событий с таким именем нет, выкидываем ошибку
  if (!this.listeners[event]) {
    throw new Error(`Нет события: ${event}`);
  }
}

}
//  const eventBus = new EventBus();

//  eventBus.on(event: 'event', callback: (data) => {
//   console.log(data);
//  }); // повесили событие

//  // Вызываем событие
//  eventBus.emit(event: 'event', args: {property: 'value'}); // args: {property: 'value'} - передали данные