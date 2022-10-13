/* eslint-disable no-unused-vars */
const fetchContributors = async (id) => {
  // fetch(id, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'text/plain',
  //     'Accept': 'application/vnd.github.v3+json'
  //   }
  // })
  //   .then(response => response.json()) // Converting the response to a JSON object
  //   .then(data => document.body.append())
  //   .catch(error => console.error(error))

  var r = await fetch(id, {
    method: 'GET',
    headers: {
      'Content-Type': 'text/plain',
      'Accept': 'application/vnd.github.v3+json'
    }
  })
  console.log('Found contributors: ' + r.json())
  return r.json()
}

export const fetchFediverseInfo = async (address) => {
  var json = {}
  var fediverse
  var followers
  json.id = address
  json.name = address
  var r = await fetch(address)
  if (r.ok) {
    fediverse = await r.json().catch(() => {
      console.log(address + ' is not in a valid JSON format')
    })
    json.description = fediverse.summary
    json.name = fediverse.name
    // Fetch followers and following
    var r2 = await fetch(fediverse.followers)
    if (r.ok) {
      followers = await r2.json().catch(() => {
        console.log(fediverse.followers + ' is not in a valid JSON format')
      })
      json.holons = followers.first.orderedItems.map((member, index) => {
        return { 'id': member, label: member }
      })
    }
    // json.holons = [{ 'id': fediverse.followers, 'label': 'followers' },{ 'id': fediverse.following, 'label': 'following' }]
    // if (fediverse.followers) {
    //   console.log('Followers' + fediverse.followers)
    // json.holons = fediverse.followers
    // json.holons = fediverse.followers.map((member, index) => {
    //   return { 'id': member, 'label': member }
    // })
    // }
  }
  return json
}

const fetchProjectInfo = async (address) => {
  // assemble info from package / npm
}

export const fetchEthInfo = async (address) => { // compiles a compatible JSON from blockchain information at address
  var json = {}
  this.web3 = new Web3(new Web3.providers.WebsocketProvider('wss://ropsten.infura.io/ws/v3/966b62ed84c84715bc5970a1afecad29'))
  // check if it is an holon
  const code = await this.web3.eth.getCode(address)
  if (code === '0x') {
    console.log(address + 'is NOT an holon')
    json.id = address
    json.name = address // check ens
    json.description = address
    // json.image = 'https://ipfs.3box.io/profile?address=' + address // check 3box
  } else {
    let holon = new this.web3.eth.Contract(contractdata.abi, address)
    // const totalappreciation = await holon.methods.totalappreciation().call()
    // console.log(totalappreciation)
    // var name = holon.methods.toName(address).call()
    // console.log(name)
    json.id = address
    json.name = await holon.methods.name().call()
    var members = await holon.methods.listMembers().call()
    if (members) {
      json.holons = members.map((member, index) => {
        var name = holon.methods.toName(member).call()
        return { 'id': member, 'label': name }
      })
    }
  }
  return json
  // check if it is a holon from ethereum
  // check if it is a dao from the graph
  // compile jsos
}
