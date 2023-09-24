// Custom APIs for renderer
import { Supplier } from '../main/entities/Supplier.entity'

export interface IElectronAPI {
  getSuppliers: (input: string) => Promise<Supplier[]>
}
