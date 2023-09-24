import { DataSource } from 'typeorm'
import { Supplier } from '../entities/Supplier.entity'
import { faker } from '@faker-js/faker'

export const createDatabaseConnection = async () => {
  const dataSource = new DataSource({
    type: 'sqlite',
    database: './database.sqlite',
    synchronize: true,
    entities: [Supplier]
  })

  await dataSource
    .initialize()
    .then(async (d) => {
      console.log('Data Source has been initialized!')
      // Create a repository for the Supplier entity
      const supplierRepository = d.getRepository(Supplier)

      // Create 5 Supplier entities and save them to the database
      // Define the data you want to upsert
      const suppliersToInsert = [
        { id: 1, name: faker.company.name() },
        { id: 2, name: faker.company.name() },
        { id: 3, name: faker.company.name() },
        { id: 4, name: faker.company.name() },
        { id: 5, name: faker.company.name() }
      ]

      await supplierRepository.save(suppliersToInsert)

      console.log('5 Suppliers have been inserted into the database!')
    })
    .catch((err) => {
      console.error('Error during Data Source initialization', err)
    })

  return dataSource
}
