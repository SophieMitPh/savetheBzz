const { db } = require('../commonJest')
describe('insert', () => {
  it('should insert a doc into collection', async done => {
    const users = db.collection('subscribers')
    const userName = "John"
    const userLastname = "Test"
    const userEmail = "test@example.com"
    const userPassoword = "vr64gvf2t4"
    const mockUser = { name: userName, lastname: userLastname, email: userEmail, password: userPassoword }
    await users.insertOne(mockUser)

    const insertedUser = await users.findOne({ name: userName })
    expect(insertedUser).toEqual(mockUser)
    done()
  })
})