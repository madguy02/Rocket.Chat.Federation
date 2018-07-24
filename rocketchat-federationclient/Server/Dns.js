var discovery = require('dns-discovery')
 
var disc = discovery(
    {
        server: 'discovery.example.com:9090',
        multicast: true,
        domain: 'my-domain.com',
        loopback: false
      }
)
disc.on('peer', function (name, peer) {
    console.log(name, peer)
  })


 disc.announce('test',8181);

