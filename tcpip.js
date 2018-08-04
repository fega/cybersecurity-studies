const any = require('any-base')
const { mapValues } = require('lodash')
const chalk = require('chalk')
const paquetes = {
  paqueteT1P1: `
0x0000:  4500 010e 008f 2000 4006 9d2e 0a01 0494  E.......@.......		
0x0010:  ac10 0188 0b93 0016 0000 0001 0000 0000  ................		
0x0020:  5002 162e 94d9 0000 726f 6f74 3a78 3a30  P.......root:x:0		
0x0030:  3a30 3a3a 2f72 6f6f 743a 2f62 696e 2f62  :0::/root:/bin/b
0x0040:  6173 680a 6269 6e3a 783a 313a 313a 6269  ash.bin:x:1:1:bi
0x0050:  6e3a                                     n:
`,
  paqueteT1P2: `0x0000:  4500 010e 008f 201f 4006 9d0f 0a01 0494  E.......@.......		
0x0010:  ac10 0188 7362 696e 2f73 6875 7464 6f77  ....sbin/shutdow		
0x0020:  6e0a 6861 6c74 3a78 3a37 3a30 3a68 616c  n.halt:x:7:0:hal		
0x0030:  743a 2f73 6269 6e3a 2f73 6269 6e2f 6861  t:/sbin:/sbin/ha
0x0040:  6c74 0a6d 6169 6c3a 783a 383a 3132 3a6d  lt.mail:x:8:12:m
0x0050:  6169                                     ai`,
  paqueteT1P3: `0x0000:  4500 010e 008f 203e 4006 9cf0 0a01 0494  E......>@.......		
0x0010:  ac10 0188 6c73 650a 6674 703a 783a 3134  ....lse.ftp:x:14		
0x0020:  3a35 303a 3a2f 686f 6d65 2f66 7470 3a2f  :50::/home/ftp:/		
0x0030:  6269 6e2f 6661 6c73 650a 736d 6d73 703a  bin/false.smmsp:
0x0040:  783a 3235 3a32 353a 736d 6d73 703a 2f76  x:25:25:smmsp:/v
0x0050:  6172                                     ar`,
  paqueteT1P4: `0x0000:  4500 010e 008f 205d 4006 9cd1 0a01 0494  E......]@.......		
0x0010:  ac10 0188 680a 6170 6163 6865 3a78 3a38  ....h.apache:x:8		
0x0020:  303a 3830 3a55 7365 7220 666f 7220 4170  0:80:User.for.Ap		
0x0030:  6163 6865 3a2f 7372 762f 6874 7470 643a  ache:/srv/httpd:
0x0040:  2f62 696e 2f66 616c 7365 0a6d 6573 7361  /bin/false.messa
0x0050:  6765                                     ge`,
  paqueteT1P5: `0x0000:  4500 0028 008f 007d 4006 bd97 0a01 0494  E..(...}@.......		
0x0010:  ac10 0188 3a3a 2f68 6f6d 652f 736e 6f72  ....::/home/snor		
0x0020:  743a 2f62 696e 2f66                      t:/bin/f	`,
  paqueteT2P1: `0x0000:  4500 0410 1dd1 0000 4006 9cea 0a01 0494  E.......@.......		
0x0010:  ac10 0188 05bb 0016 0000 0001 0000 0000  ................		
0x0020:  5002 162e 9ab1 0000 726f 6f74 3a78 3a30  P.......root:x:0		
0x0030:  3a30 3a3a 2f72 6f6f 743a 2f62 696e 2f62  :0::/root:/bin/b
0x0040:  6173 680a 6269 6e3a 783a 313a 313a 6269  ash.bin:x:1:1:bi
0x0050:  6e3a                                     n:`,








  paqueteT2P2: `0x0000:  4500 002c 0000 4000 3f06 7f9f ac10 0188  E..,..@.?.......		
0x0010:  0a01 0494 0016 05bb 80af 1f1b 0000 0002  ................		
0x0020:  6012 16d0 1f7c 0000 0204 05b4 0000 0000  ....|..........		
0x0030: 0000..`,
  paqueteT2P3: `0x0000:  4500 0028 0000 4000 4006 7ea3 0a01 0494  E..(..@.@.~.....		
0x0010:  ac10 0188 05bb 0016 0000 0002 0000 0000  ................		
0x0020:  5004 0000 ede0 0000                      P.......`,








  paqueteT3P1: `
0x0000:  45c0 0128 902c 0000 3f01 2dbc ac10 0188  E..(.,..?.-.....		
0x0010:  0a01 0494 0b01 067f 0000 0000 4500 010e  ............E...		
0x0020:  008f 2000 3f06 9e2e 0a01 0494 ac10 0188  ....?...........		
0x0030:  0b93 0016 0000 0001 0000 0000 5002 162e  ............P...
0x0040:  94d9 0000 726f 6f74 3a78 3a30 3a30 3a3a  ....root:x:0:0::
0x0050:  2f72                                     /r`,
  paqueteT3P2: `0x0000:  4500 04c4 00e5 2000 4001 9927 0a01 0494  E.......@..'....		
0x0010:  ac10 0188 0800 c398 e517 0000 5858 5858  ............XXXX		
0x0020:  5858 5858 5858 5858 5858 5858 5858 5858  XXXXXXXXXXXXXXXX		
0x0030:  5858 5858 5858 5858 5858 5858 5858 5858  XXXXXXXXXXXXXXXX
0x0040:  5858 5858 5858 5858 5858 5858 5858 5858  XXXXXXXXXXXXXXXX
0x0050:  5858      `,
  paqueteT3P4: `0x0000:  4500 04c4 00e5 2096 4001 9891 0a01 0494  E.......@.......		
0x0010:  ac10 0188 5858 5858 5858 5858 5858 5858  ....XXXXXXXXXXXX		
0x0020:  5858 5858 5858 5858 5858 5858 5858 5858  XXXXXXXXXXXXXXXX		
0x0030:  5858 5858 5858 5858 5858 5858 5858 5858  XXXXXXXXXXXXXXXX
0x0040:  5858 5858 5858 5858 5858 5858 5858 5858  XXXXXXXXXXXXXXXX
0x0050:  5858                                     XX`,
  paqueteT3P5: `0x0000:  4500 04c4 00e5 212c 4001 97fb 0a01 0494  E.....!,@.......		
0x0010:  ac10 0188 5858 5858 5858 5858 5858 5858  ....XXXXXXXXXXXX		
0x0020:  5858 5858 5858 5858 5858 5858 5858 5858  XXXXXXXXXXXXXXXX		
0x0030:  5858 5858 5858 5858 5858 5858 5858 5858  XXXXXXXXXXXXXXXX
0x0040:  5858 5858 5858 5858 5858 5858 5858 5858  XXXXXXXXXXXXXXXX
0x0050:  5858                                     XX`,
  paqueteT3P6: `0x0000:  4500 04c4 00e5 21c2 4001 9765 0a01 0494  E.....!.@..e....		
0x0010:  ac10 0188 5858 5858 5858 5858 5858 5858  ....XXXXXXXXXXXX		
0x0020:  5858 5858 5858 5858 5858 5858 5858 5858  XXXXXXXXXXXXXXXX		
0x0030:  5858 5858 5858 5858 5858 5858 5858 5858  XXXXXXXXXXXXXXXX
0x0040:  5858 5858 5858 5858 5858 5858 5858 5858  XXXXXXXXXXXXXXXX
0x0050:  5858  `,
  paqueteT3P7: `0x0000:  4500 0144 00e5 0258 4001 ba4f 0a01 0494  E..D...X@..O....		
0x0010:  ac10 0188 5858 5858 5858 5858 5858 5858  ....XXXXXXXXXXXX		
0x0020:  5858 5858 5858 5858 5858 5858 5858 5858  XXXXXXXXXXXXXXXX		
0x0030:  5858 5858 5858 5858 5858 5858 5858 5858  XXXXXXXXXXXXXXXX
0x0040:  5858 5858 5858 5858 5858 5858 5858 5858  XXXXXXXXXXXXXXXX
0x0050:  5858      `,
  paqueteT3P8: `0x0000:  4500 05dc 9044 2000 3f01 09b0 ac10 0188  E....D..?.......		
0x0010:  0a01 0494 0000 cb98 e517 0000 5858 5858  ............XXXX		
0x0020:  5858 5858 5858 5858 5858 5858 5858 5858  XXXXXXXXXXXXXXXX		
0x0030:  5858 5858 5858 5858 5858 5858 5858 5858  XXXXXXXXXXXXXXXX
0x0040:  5858 5858 5858 5858 5858 5858 5858 5858  XXXXXXXXXXXXXXXX
0x0050:  5858                                     XX`,
  paqueteT3P9: `	
0x0000:  4500 05dc 9044 20b9 3f01 08f7 ac10 0188  E....D..?.......		
0x0010:  0a01 0494 5858 5858 5858 5858 5858 5858  ....XXXXXXXXXXXX		
0x0020:  5858 5858 5858 5858 5858 5858 5858 5858  XXXXXXXXXXXXXXXX		
0x0030:  5858 5858 5858 5858 5858 5858 5858 5858  XXXXXXXXXXXXXXXX
0x0040:  5858 5858 5858 5858 5858 5858 5858 5858  XXXXXXXXXXXXXXXX
0x0050:  5858                                     XX`,
  paqueteT3P10: `	
0x0000:  4500 05dc 9044 2172 3f01 083e ac10 0188  E....D!r?..>....		
0x0010:  0a01 0494 5858 5858 5858 5858 5858 5858  ....XXXXXXXXXXXX		
0x0020:  5858 5858 5858 5858 5858 5858 5858 5858  XXXXXXXXXXXXXXXX		
0x0030:  5858 5858 5858 5858 5858 5858 5858 5858  XXXXXXXXXXXXXXXX
0x0040:  5858 5858 5858 5858 5858 5858 5858 5858  XXXXXXXXXXXXXXXX
0x0050:  5858                                     XX`,
  paqueteT3P10: `0x0000:  4500 02ac 9044 022b 3f01 2ab5 ac10 0188  E....D.+?.*.....		
0x0010:  0a01 0494 5858 5858 5858 5858 5858 5858  ....XXXXXXXXXXXX		
0x0020:  5858 5858 5858 5858 5858 5858 5858 5858  XXXXXXXXXXXXXXXX		
0x0030:  5858 5858 5858 5858 5858 5858 5858 5858  XXXXXXXXXXXXXXXX`
}


const a = `
0x0000:  4500 010e 008f 2000 4006 9d2e 0a01 0494  E.......@.......		
0x0010:  ac10 0188 0b93 0016 0000 0001 0000 0000  ................		
0x0020:  5002 162e 94d9 0000 726f 6f74 3a78 3a30  P.......root:x:0		
0x0030:  3a30 3a3a 2f72 6f6f 743a 2f62 696e 2f62  :0::/root:/bin/b
0x0040:  6173 680a 6269 6e3a 783a 313a 313a 6269  ash.bin:x:1:1:bi
0x0050:  6e3a                                     n:
`
const protocolo = (str) => {
  if (str === '06') return 'TCP'
  if (str === '01') return 'ICMP'
  return 'unkown'
}
const hd = any(any.HEX, any.DEC)
const hb = any(any.HEX, any.BIN)
const f = (str) => {
  const s = str.split("").reverse()
  const r = []
  if (parseInt(s[0])) r.push('FIN')
  if (parseInt(s[1])) r.push('SYN')
  if (parseInt(s[2])) r.push('RST')
  if (parseInt(s[3])) r.push('PSH')
  if (parseInt(s[4])) r.push('ACK')
  if (parseInt(s[5])) r.push('URG')
  return r
}

const check = (pack) => {
  const parse = pack.trim().split(/\s+/);
  return {
    version: {
      ipv: `ipv4`,
      longitud: 5,
      prioridad: 0,
      demora: 'normal',
      rendimiento: 'normal',
      fiabilidad: 'normal',
    },
    protocolo: protocolo(parse[5][2] + parse[5][3]),
    ipOrigen: `${hd(parse[7][0] + parse[7][1])}.${hd(parse[7][2] + parse[7][3])}.${hd(parse[8][0] + parse[8][1])}.${hd(parse[8][2] + parse[8][3])}`,
    puertoOrigen: hd(parse[13]),
    ipDestino: `${hd(parse[11][0] + parse[11][1])}.${hd(parse[11][2] + parse[11][3])}.${hd(parse[12][0] + parse[12][1])}.${hd(parse[12][2] + parse[12][3])}`,
    puertoDestino: hd(parse[14]),
    banderas: f(hb(parse[21][1] + parse[21][2] + parse[21][3])),
  }
}
// version, puerto origen, puerto destino y banderas

console.log('------------------------------------------------------------')
console.log('------------------------------------------------------------')
console.log('------------------------------------------------------------')
console.log('------------------------------------------------------------')
const resultado = mapValues(paquetes, check)
mapValues(resultado, (v, f) => {
  // console.log(f, v.banderas)
  console.log(chalk.green(f), chalk.yellow(`${v.ipOrigen}:${v.puertoOrigen}`), chalk.yellow(`${v.ipDestino}:${v.puertoDestino}`), chalk.red(v.banderas))
})
// console.log(resultado.paqueteT1P1, resultado.paqueteT2P1)
