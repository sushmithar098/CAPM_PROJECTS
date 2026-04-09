const cds = require('@sap/cds')
const { default: axios } = require('axios')
const { GET, POST, PATCH, DELETE, expect } = cds.test(__dirname + '/..')
axios.defaults.auth = { username: 'scott' }
jest.setTimeout(20000)
describe('AdminService User CRUD (Draft Enabled)', () => {
  let userId
  it('Should create User (Draft)', async () => {
    const { status, data } = await POST(`/odata/v4/admin/User`, {
      username: 'TestUser',
      email: 'testuser@example.com',
      role: 'USER',
      status: 'Active'
    })
    userId = data.ID
    expect(status).to.equal(201)
    expect(data.IsActiveEntity).to.be.false
  })
  it('Should activate User draft', async () => {
    const res = await POST(
      `/odata/v4/admin/User(ID=${userId},IsActiveEntity=false)/AdminService.draftActivate`
    )
    expect(res.status).to.equal(201)
    expect(res.data.IsActiveEntity).to.be.true
  })
  it('Should fetch active User', async () => {
    const { status, data } = await GET(
      `/odata/v4/admin/User(ID=${userId},IsActiveEntity=true)`
    )
    expect(status).to.equal(200)
    expect(data.username).to.equal('TestUser')
  })
  it('Should open draft for update', async () => {
    const res = await POST(
      `/odata/v4/admin/User(ID=${userId},IsActiveEntity=true)/AdminService.draftEdit`,
      { PreserveChanges: true }
    )
    expect(res.status).to.equal(201)
  })
  it('Should update User in draft', async () => {
    const { status, data } = await PATCH(
      `/odata/v4/admin/User(ID=${userId},IsActiveEntity=false)`,
      { username: 'UpdatedUser' }
    )
    expect(status).to.equal(200)
    expect(data.username).to.equal('UpdatedUser')
  })
  it('Should activate updated draft', async () => {
    const res = await POST(
      `/odata/v4/admin/User(ID=${userId},IsActiveEntity=false)/AdminService.draftActivate`
    )
    expect(res.status).to.equal(200)
  })
  it('Should verify updated User', async () => {
    const { data } = await GET(
      `/odata/v4/admin/User(ID=${userId},IsActiveEntity=true)`
    )
    expect(data.username).to.equal('UpdatedUser')
  })
  it('Should delete User (draft + active)', async () => {
    try {
      await DELETE(`/odata/v4/admin/User(ID=${userId},IsActiveEntity=false)`)
    } catch (e) {}
    const res = await DELETE(
      `/odata/v4/admin/User(ID=${userId},IsActiveEntity=true)`
    )
    expect(res.status).to.equal(204)
  })
  it('Should confirm deletion', async () => {
    try {
      await GET(`/odata/v4/admin/User(ID=${userId},IsActiveEntity=true)`)
    } catch (error) {
      expect(error.response.status).to.equal(404)
    }
  })

})