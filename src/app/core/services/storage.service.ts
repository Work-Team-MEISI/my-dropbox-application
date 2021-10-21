import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage;

  constructor(private readonly _storageService: Storage) {
    this._initStorage();
  }

  private async _initStorage() {
    const storage = await this._storageService.create();
    this._storage = storage;
  }

  public async setToken<T>(tokenKey: string, tokenValue: T): Promise<void> {
    const strngfToken = JSON.stringify(tokenValue);

    return await this._storage.set(tokenKey, strngfToken);
  }

  public async fetchToken<T>(tokenKey: string): Promise<T> {
    const tokenValue = await this._storage.get(tokenKey);
    const parsedToken = JSON.parse(tokenValue);

    return parsedToken;
  }

  public async deleteToken(tokenKey: string): Promise<void> {
    return await this._storage.remove(tokenKey);
  }

  public async deleteBulk(): Promise<void> {
    return await this._storage.clear();
  }
}
