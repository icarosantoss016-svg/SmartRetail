const mqtt = require('mqtt')
const sensorController = require('../controllers/sensorController')

const client = mqtt.connect('mqtt://broker.hivemq.com:1883')

client.on('connect', () => {
    console.log('MQTT conectado ao broker HiveMQ')

    client.subscribe('vitrine/+/presenca', { qos: 1 })
    client.subscribe('vitrine/+/nfc', { qos: 1 })
    client.subscribe('vitrine/+/distancia', { qos: 1 })

    console.log('Inscrito nos tópicos dinâmicos (Multi-Vitrine).')
})

client.on('message', (topico, buffer) => {
    try  {
        const payload = JSON.parse(buffer.toString())
    
        const partes = topico.split('/')
        
        if (partes[0] === 'vitrine' && partes.length === 3) {
            const idVitrine = parseInt(partes[1])
            const evento = partes[2]           

            console.log(`[Mensagem MQTT] Vitrine #${idVitrine} enviou evento: ${evento}`)

            switch (evento) {
                case 'presenca': 
                    sensorController.detectarPresenca(idVitrine, payload); 
                    break;
                case 'nfc': 
                    sensorController.detectarNfc(idVitrine, payload); 
                    break;
                case 'distancia': 
                    sensorController.medirDistancia(idVitrine, payload); 
                    break;
            }
        }
    } catch (err) {
        console.error('Erro ao processar mensagem MQTT:', err.message)
    }
})

module.exports = client