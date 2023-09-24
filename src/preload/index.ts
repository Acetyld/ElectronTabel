import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import 'reflect-metadata'
import { Supplier } from '../main/entities/Supplier.entity'
import { IElectronAPI } from './interface'
const api = {
  getSuppliers: (input: string): Promise<Supplier[]> => ipcRenderer.invoke('get-suppliers', input)
} satisfies IElectronAPI

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
