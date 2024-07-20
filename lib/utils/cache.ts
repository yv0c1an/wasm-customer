const projectName = "wasm";

const buildKey = (key: string): string => {
  return `${projectName}:${key}`;
};

const sessionCache = {
  set(key: string, value: string): void {
    if (!sessionStorage) {
      return;
    }
    if (key != null && value != null) {
      sessionStorage.setItem(buildKey(key), value);
    }
  },
  get(key: string): string | null {
    if (!sessionStorage) {
      return null;
    }
    if (key == null) {
      return null;
    }
    return sessionStorage.getItem(buildKey(key));
  },
  setJSON(key: string, jsonValue: any): void {
    if (jsonValue != null) {
      this.set(key, JSON.stringify(jsonValue));
    }
  },
  getJSON<T>(key: string): T | null {
    const value = this.get(buildKey(key));
    if (value != null) {
      return JSON.parse(value) as T;
    }
    return null;
  },
  remove(key: string): void {
    if (key == null) {
      return;
    }
    sessionStorage.removeItem(buildKey(key));
  },
};

const localCache = {
  set(key: string, value: string): void {
    if (!localStorage) {
      return;
    }
    if (key != null && value != null) {
      localStorage.setItem(buildKey(key), value);
    }
  },
  get(key: string): string | null {
    if (!localStorage) {
      return null;
    }
    if (key == null) {
      return null;
    }
    return localStorage.getItem(buildKey(key));
  },
  setJSON(key: string, jsonValue: any): void {
    if (jsonValue != null) {
      this.set(buildKey(key), JSON.stringify(jsonValue));
    }
  },
  getJSON<T>(key: string): T | null {
    const value = this.get(buildKey(key));
    if (value != null) {
      return JSON.parse(value) as T;
    }
    return null;
  },
  remove(key: string): void {
    if (key == null) {
      return;
    }
    localStorage.removeItem(buildKey(key));
  },
};

export default {
  /**
   * 项目名称
   */
  projectName: projectName,
  /**
   * 会话级缓存
   */
  session: sessionCache,
  /**
   * 本地缓存
   */
  local: localCache,
};