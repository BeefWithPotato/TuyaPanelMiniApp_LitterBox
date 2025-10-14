import { SmartStorageAbility } from '@ray-js/panel-sdk';

let storage: SmartStorageAbility | null = null;

/**
 * Storage can only be initialized once
 */
export async function initStorage(): Promise<SmartStorageAbility> {
  try {
    if (!storage) {
      storage = new SmartStorageAbility();
      await storage.init();
      console.log('[SmartStorage] ✅ Initialize success');
    }
    return storage;
  } catch (e) {
    console.error('[SmartStorage] ❌ Failed to initialize:', e);
    throw e;
  }
}

/**
 * Get the initialized storage instance
 */
export function getStorage(): SmartStorageAbility {
  if (!storage) {
    throw new Error('[SmartStorage] ⚠️ Storage not initialized. Call initStorage() first.');
  }
  return storage;
}

export async function setCloudData(key: string, value: any): Promise<boolean> {
  const storage = getStorage();
  try {
    const res = await storage.set(key, value);
    console.log(`[SmartStorage] ✅ Set key "${key}" successfully:`, res);
    return res ? true : false;
  } catch (err) {
    console.error(`[SmartStorage] ❌ Failed to set key "${key}":`, err);
    return false;
  }
}

export async function getCloudData(key: string): Promise<any | null> {
  const storage = getStorage();
  try {
    const res = (await storage.get(key)) as any | null;
    console.log(`[SmartStorage] 📦 Get key "${key}":`, res);
    return res ?? null;
  } catch (err) {
    console.error(`[SmartStorage] ❌ Failed to get key "${key}":`, err);
    return null;
  }
}

type TReturnRes<T = any> = {
  data: { value: T; type: string };
  time: number;
} | null;

type TReturnResData<T = any> = {
  [key: string]: TReturnRes<T>;
};

export async function getAllCloudData(): Promise<TReturnResData> {
  const storage = getStorage();
  try {
    return await storage.getAll((localData: { [key: string]: TReturnRes }) => {
      return localData;
    });
  } catch (err) {
    console.error(`[SmartStorage] ❌ Failed to get all local data`, err);
    return null;
  }
}
