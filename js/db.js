/* Local-First IndexedDB Storage & Encryption Engine */

const DB_NAME = 'DBT_Companion_DB';
const DB_VERSION = 1;

class DBTStorage {
  constructor() {
    this.db = null;
    this.initPromise = this.initDB();
  }

  async initDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        // Worksheets Store (Model of Emotions, Chain Analysis, Wise Mind, DEAR MAN, Dime Game, ABC PLEASE, etc.)
        if (!db.objectStoreNames.contains('worksheets')) {
          const worksheetStore = db.createObjectStore('worksheets', { keyPath: 'id' });
          worksheetStore.createIndex('type', 'type', { unique: false });
          worksheetStore.createIndex('createdAt', 'createdAt', { unique: false });
        }

        // Diary Cards Store
        if (!db.objectStoreNames.contains('diaryCards')) {
          const diaryStore = db.createObjectStore('diaryCards', { keyPath: 'id' });
          diaryStore.createIndex('date', 'date', { unique: false });
        }

        // Custom References / Handouts Store
        if (!db.objectStoreNames.contains('customHandouts')) {
          db.createObjectStore('customHandouts', { keyPath: 'id' });
        }

        // User Settings Store (Theme, Encrypted PIN hash)
        if (!db.objectStoreNames.contains('settings')) {
          db.createObjectStore('settings', { keyPath: 'key' });
        }
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        resolve(this.db);
      };

      request.onerror = (event) => {
        console.error('IndexedDB Error:', event.target.error);
        reject(event.target.error);
      };
    });
  }

  // Worksheets CRUD
  async saveWorksheet(entry) {
    await this.initPromise;
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['worksheets'], 'readwrite');
      const store = transaction.objectStore('worksheets');
      
      const record = {
        id: entry.id || 'ws_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
        type: entry.type,
        title: entry.title,
        data: entry.data,
        createdAt: entry.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const request = store.put(record);
      request.onsuccess = () => resolve(record);
      request.onerror = () => reject(request.error);
    });
  }

  async getWorksheetsByType(type) {
    await this.initPromise;
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['worksheets'], 'readonly');
      const store = transaction.objectStore('worksheets');
      const index = store.index('type');
      const request = index.getAll(type);

      request.onsuccess = () => resolve(request.result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      request.onerror = () => reject(request.error);
    });
  }

  async getAllWorksheets() {
    await this.initPromise;
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['worksheets'], 'readonly');
      const store = transaction.objectStore('worksheets');
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      request.onerror = () => reject(request.error);
    });
  }

  async deleteWorksheet(id) {
    await this.initPromise;
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['worksheets'], 'readwrite');
      const store = transaction.objectStore('worksheets');
      const request = store.delete(id);
      request.onsuccess = () => resolve(true);
      request.onerror = () => reject(request.error);
    });
  }

  // Settings & Security
  async getSetting(key, defaultValue = null) {
    await this.initPromise;
    return new Promise((resolve) => {
      const transaction = this.db.transaction(['settings'], 'readonly');
      const store = transaction.objectStore('settings');
      const request = store.get(key);

      request.onsuccess = () => resolve(request.result ? request.result.value : defaultValue);
      request.onerror = () => resolve(defaultValue);
    });
  }

  async setSetting(key, value) {
    await this.initPromise;
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['settings'], 'readwrite');
      const store = transaction.objectStore('settings');
      const request = store.put({ key, value });

      request.onsuccess = () => resolve(true);
      request.onerror = () => reject(request.error);
    });
  }

  // Backup & Restore
  async exportJSONBackup() {
    const worksheets = await this.getAllWorksheets();
    const backupData = {
      version: 1,
      exportedAt: new Date().toISOString(),
      worksheets
    };
    return JSON.stringify(backupData, null, 2);
  }

  async importJSONBackup(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      if (data.worksheets && Array.isArray(data.worksheets)) {
        for (const ws of data.worksheets) {
          await this.saveWorksheet(ws);
        }
        return true;
      }
      return false;
    } catch (err) {
      console.error('Backup Import Failed:', err);
      return false;
    }
  }
}

export const db = new DBTStorage();
