import { Injectable, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {}

  public async setToken<T>(tokenKey: string, tokenValue: T): Promise<void> {
    this._storage = await this.storage.create();

    const strngfToken = JSON.stringify(tokenValue);

    return await this._storage.set(tokenKey, strngfToken);
  }

  public async fetchToken<T>(tokenKey: string): Promise<T> {
    this._storage = await this.storage.create();

    const tokenJson = await this._storage.get(tokenKey);

    const tokenValue = JSON.parse(tokenJson);

    return tokenValue;
  }

  public async deleteToken(tokenKey: string): Promise<void> {
    this._storage = await this.storage.create();

    return await this._storage.remove(tokenKey);
  }

  public async deleteBulk(): Promise<void> {
    this._storage = await this.storage.create();

    return await this._storage.clear();
  }
}
